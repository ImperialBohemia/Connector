// The Coordinator (Background Script)

// 1. Listen for messages from Side Panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "USER_COMMAND") {
    handleUserCommand(message.command, message.apiKey, message.homeBaseUrl);
    sendResponse({ status: "processing" }); // Acknowledge receipt
    return true; // Keep channel open for async work
  }
});

async function handleUserCommand(command, apiKey, homeBaseUrl) {
  await logToHomeBase(homeBaseUrl, "INFO", "User sent command: " + command);
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
    // Fetch Remote Brain (System Prompt) if available
    const remoteBrain = await fetchRemoteBrain(homeBaseUrl);
    const analysis = await analyzeWithGPT4o(command, screenshotDataUrl, pageMap, apiKey, remoteBrain);

    // 4. CLEANUP: Immediately nullify the image to save RAM
    let ephemeralImage = screenshotDataUrl;
    ephemeralImage = null; // Explicit GC hint

    // 5. ACT: Execute the plan
    if (analysis.actions && analysis.actions.length > 0) {
       // Send the entire plan to Content Script for smooth execution
       await chrome.tabs.sendMessage(tab.id, {
         type: "EXECUTE_PLAN",
         plan: analysis.actions,
         explanation: analysis.explanation
       });

       chrome.runtime.sendMessage({ type: "AGENT_RESPONSE", text: `I am executing: ${analysis.explanation}` });
    } else if (analysis.action) {
       // Fallback for single action
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
    await logToHomeBase(homeBaseUrl, "ERROR", error.message, { stack: error.stack });
  }
}

async function logToHomeBase(url, level, message, context = {}) {
    if (!url) return; // No home base configured
    try {
        await fetch(`${url}/api/connector/logs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ level, message, context })
        });
    } catch (e) {
        console.warn("Failed to report to Home Base:", e);
    }
}

async function fetchRemoteBrain(homeBaseUrl) {
    if (!homeBaseUrl) return null;
    try {
        const res = await fetch(`${homeBaseUrl}/api/connector/brain`);
        if (res.ok) {
            return await res.json();
        }
    } catch (e) {
        console.warn("Could not fetch remote brain:", e);
    }
    return null;
}

async function analyzeWithGPT4o(userPrompt, base64Image, pageMap, apiKey, remoteBrain) {
  // Use Remote System Prompt if available, otherwise fallback to local hardcoded one
  const systemPrompt = (remoteBrain && remoteBrain.systemPrompt) ? remoteBrain.systemPrompt : `
  You are Jules, an AI Browser Agent with "Dual Vision" (Screenshot + DOM Map).
  Your Mission: Execute the user's command with MAXIMUM PRECISION and Human-Like behavior.

  RESOURCES:
  1. SCREENSHOT (High-Res): Use this for visual layout understanding.
  2. DOM MAP (JSON): Use this for precise element identification (ID, Text, Attributes) and coordinates.

  OUTPUT FORMAT (JSON Only):
  {
    "explanation": "Brief strategy explanation (in Czech if user speaks Czech).",
    "actions": [
      {
        "type": "CLICK" | "TYPE" | "SCROLL" | "WAIT",
        "params": {
          "selector": "CSS selector (Preferred for reliability)",
          "text": "Text to type",
          "x": number (Exact Pixel X or Percentage 0-100),
          "y": number (Exact Pixel Y or Percentage 0-100),
          "duration": number (milliseconds)
        }
      }
    ]
  }

  STRATEGY & BEHAVIOR:
  - **Smart Scroll**: The system can scroll to elements automatically if you provide a selector.
  - **Ghost Cursor**: Your movements are visualized. Plan smooth paths.
  - **Precision**: If you have the DOM Map, prefer using the specific 'x' and 'y' pixels from it over visual estimation.
  - **Chaining**: Return the FULL SEQUENCE of actions (e.g., Scroll -> Wait -> Click -> Wait -> Type).
  - **Wait Times**: Use realistic pauses (300-800ms) between interactions to avoid detection.

  COORDINATES:
  - If using DOM Map 'x'/'y' (pixels), pass them directly.
  - If estimating from Screenshot, use percentages (0-100).
  - Selector is ALWAYS preferred over coordinates.
  `;

  // construct user content
  const userContent = [
      { type: "text", text: `User Command: ${userPrompt}` },
      { type: "image_url", image_url: { url: base64Image, detail: "high" } }
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
      max_tokens: 2000,
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
