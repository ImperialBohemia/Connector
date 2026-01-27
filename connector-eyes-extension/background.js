// The Coordinator (Background Script)

// 1. Listen for messages from Side Panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "USER_COMMAND") {
    handleUserCommand(message.command, message.apiKey);
    sendResponse({ status: "processing" }); // Acknowledge receipt
    return true; // Keep channel open for async work
  }
});

async function handleUserCommand(command, apiKey) {
  try {
    // 1. Get the Active Tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) throw new Error("No active tab found.");

    // 2. SNAP: Request a "Memory Snap" from the content script
    // We send a message to the tab to capture itself and send back data
    // This is better than captureVisibleTab here because we can process it there if needed,
    // but actually captureVisibleTab in background is standard for extensions.
    // Let's use chrome.tabs.captureVisibleTab for speed and permission simplicity.

    const screenshotDataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: "jpeg", quality: 50 });

    // 2.1 MAP: Get the Structural Map (Invisible to Screenshot)
    let pageMap = null;
    try {
        pageMap = await chrome.tabs.sendMessage(tab.id, { type: "GET_DOM" });
    } catch (e) {
        console.warn("Could not get Page Map (Content Script maybe not ready):", e);
    }

    // 3. THINK: Send to OpenAI (Jules Brain)
    const analysis = await analyzeWithGPT4o(command, screenshotDataUrl, pageMap, apiKey);

    // 4. CLEANUP: Immediately nullify the image to save RAM
    let ephemeralImage = screenshotDataUrl;
    ephemeralImage = null; // Explicit GC hint

    // 5. ACT: Execute the plan
    if (analysis.action) {
       await chrome.tabs.sendMessage(tab.id, {
         type: "EXECUTE_ACTION",
         action: analysis.action,
         params: analysis.params
       });

       chrome.runtime.sendMessage({ type: "AGENT_RESPONSE", text: `I am executing: ${analysis.explanation}` });
    } else {
       chrome.runtime.sendMessage({ type: "AGENT_RESPONSE", text: `Analysis complete: ${analysis.explanation}` });
    }

  } catch (error) {
    console.error(error);
    chrome.runtime.sendMessage({ type: "AGENT_ERROR", text: error.message });
  }
}

async function analyzeWithGPT4o(userPrompt, base64Image, pageMap, apiKey) {
  const systemPrompt = `
  You are Jules, an AI Browser Agent.
  You have "Dual Vision":
  1. A SCREENSHOT of the visible viewport.
  2. A DOM MAP (JSON) of the entire page's interactive elements (buttons, inputs, links).

  Your goal is to execute the user's command efficiently.
  If the user speaks Czech, reply in Czech (in the explanation).

  If the user asks to "Scan" or "Look" at the page, analyze the DOM MAP and Screenshot and return a summary in the "explanation" with action "DONE".

  You can identify elements by their visual location (Screenshot) or their text/attributes (DOM Map).
  Prefer using the 'pageMap' data to find precise elements (e.g. by text or ID) even if they are currently off-screen (scrolling might be needed, but for now just identify them).

  Output JSON format ONLY:
  {
    "explanation": "Brief text explaining what you see and what you will do.",
    "action": "CLICK" | "TYPE" | "SCROLL" | "DONE",
    "params": {
      "selector": "CSS selector or description of element",
      "text": "Text to type (if TYPE)",
      "x": number (0-100 percentage width),
      "y": number (0-100 percentage height)
    }
  }

  Note: For coordinates, you can use the 'x' and 'y' from the DOM Map (which are pixels) converted to percentages of the window size, or estimate from the screenshot.
  If you can identify a reliable CSS selector (or use text matching), prefer that.
  `;

  // construct user content
  const userContent = [
      { type: "text", text: `User Command: ${userPrompt}` },
      { type: "image_url", image_url: { url: base64Image, detail: "low" } }
  ];

  if (pageMap) {
      userContent.push({ type: "text", text: `Page Map (JSON): ${JSON.stringify(pageMap)}` });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userContent
        }
      ],
      max_tokens: 500,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error("OpenAI API Error: " + err);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  return JSON.parse(content);
}
