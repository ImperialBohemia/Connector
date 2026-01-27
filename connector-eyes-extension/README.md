# Connector Eyes 👁️

**Connector Eyes** is an experimental Chrome Extension that gives AI agents "sight" and "hands" within your browser. It allows you to automate tasks on any website (like Amazon KDP, Medium, Seznam, etc.) using natural language commands.

## Features
- **Visual Understanding:** Uses GPT-4o Vision to see the page.
- **Full Page Map:** Uses "Dual Vision" (Screenshot + DOM Map) to understand the entire page structure, even parts that are not currently visible.
- **Headless Browser Mode:** Turns your logged-in browser into an agent-controlled interface, allowing interaction with sites where you are already authenticated (Google, Amazon, etc.).
- **RAM Optimized:** Uses "Snap & Forget" strategy to minimize memory usage.
- **Ghost Cursor:** Visualizes AI actions so you know what's happening.
- **Secure:** Your OpenAI API Key is stored locally in your browser storage.

## How to Install

1. Open Chrome/Brave/Edge and go to `chrome://extensions`.
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked**.
4. Select the `connector-eyes-extension` folder in this repository.
5. The extension "Connector Eyes" should appear.

## How to Use

1. Click the extension icon (or pin it) to open the **Side Panel**.
2. Enter your **OpenAI API Key** (it must support GPT-4o).
3. Navigate to a website you want to automate (e.g., `medium.com/new-story`).
4. Type a command:
   - *"Write a title about AI Tools"*
   - *"Click the Publish button"*
   - *"Scroll down and check for errors"*
5. Watch the Ghost Cursor move and execute the action.

## Privacy Note
Screenshots are taken *only* when you send a command and are sent directly to OpenAI's API. They are not saved to disk and are cleared from memory immediately after transmission.
