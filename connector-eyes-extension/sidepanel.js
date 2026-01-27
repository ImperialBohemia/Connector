document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const chatHistory = document.getElementById('chat-history');
  const apiKeyInput = document.getElementById('apikey');
  const homeBaseInput = document.getElementById('homebase');

  // Load Settings from storage
  chrome.storage.local.get(['openai_key', 'home_base_url'], (result) => {
    if (result.openai_key) apiKeyInput.value = result.openai_key;
    if (result.home_base_url) homeBaseInput.value = result.home_base_url;
  });

  // Save Settings on change
  apiKeyInput.addEventListener('change', () => {
    chrome.storage.local.set({ openai_key: apiKeyInput.value });
  });
  homeBaseInput.addEventListener('change', () => {
    chrome.storage.local.set({ home_base_url: homeBaseInput.value });
  });

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.textContent = text;
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  sendBtn.addEventListener('click', async () => {
    const text = userInput.value.trim();
    if (!text) return;

    if (!apiKeyInput.value) {
      addMessage("Please enter your OpenAI API Key first.", "agent");
      return;
    }

    addMessage(text, "user");
    userInput.value = '';
    sendBtn.disabled = true;
    sendBtn.textContent = 'Working...';

    // Send message to background script
    chrome.runtime.sendMessage({
      type: "USER_COMMAND",
      command: text,
      apiKey: apiKeyInput.value,
      homeBaseUrl: homeBaseInput.value
    }, (response) => {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send';

      if (chrome.runtime.lastError) {
        addMessage("Error: " + chrome.runtime.lastError.message, "agent");
      } else if (response && response.status === "processing") {
        addMessage("Thinking... (I took a look)", "agent");
      }
    });
  });

  // Listen for updates from background
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "AGENT_RESPONSE") {
      addMessage(message.text, "agent");
    }
    if (message.type === "AGENT_ERROR") {
      addMessage("Error: " + message.text, "agent");
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send';
    }
  });
});
