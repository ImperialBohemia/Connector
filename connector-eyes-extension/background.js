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

    // 3. THINK: Send to OpenAI (Jules Brain)
    const analysis = await analyzeWithGPT4o(command, screenshotDataUrl, apiKey);

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

async function analyzeWithGPT4o(userPrompt, base64Image, apiKey) {
  const systemPrompt = `
  You are Jules, an AI Browser Agent.
  You see the user's browser via a screenshot.
  Your goal is to execute the user's command efficiently.

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

  Note: For coordinates, estimate X/Y percentages based on the screenshot.
  If you can identify a reliable CSS selector, prefer that.
  `;

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
          content: [
            { type: "text", text: userPrompt },
            { type: "image_url", image_url: { url: base64Image, detail: "low" } } // 'low' for speed/cost
          ]
        }
      ],
      max_tokens: 300,
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
