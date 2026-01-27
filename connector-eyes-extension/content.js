// The Hands (Content Script)

// 1. Create a "Ghost Cursor" element to visualize movement
const cursor = document.createElement('div');
cursor.style.position = 'fixed';
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.borderRadius = '50%';
cursor.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
cursor.style.border = '2px solid red';
cursor.style.pointerEvents = 'none'; // Click through
cursor.style.zIndex = '999999';
cursor.style.transition = 'top 0.5s ease-in-out, left 0.5s ease-in-out';
cursor.style.display = 'none';
document.body.appendChild(cursor);

// 2. Listen for instructions from Background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "EXECUTE_ACTION") {
    performAction(message.action, message.params);
  }
  if (message.type === "GET_DOM") {
    const map = getSimplifiedDOM();
    sendResponse(map);
  }
});

function getSimplifiedDOM() {
  const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], [role="link"]');
  const items = [];

  interactables.forEach((el) => {
    // Skip invisible elements
    if (el.offsetParent === null) return;

    const rect = el.getBoundingClientRect();
    const text = el.innerText || el.placeholder || el.value || el.getAttribute('aria-label') || "";

    // Skip empty non-inputs
    if (!text.trim() && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') return;

    items.push({
      tag: el.tagName.toLowerCase(),
      text: text.slice(0, 50).replace(/\s+/g, ' ').trim(), // Truncate
      id: el.id,
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      w: Math.round(rect.width),
      h: Math.round(rect.height)
    });
  });

  return {
    url: window.location.href,
    width: window.innerWidth,
    height: window.innerHeight,
    title: document.title,
    elements: items.slice(0, 300) // Limit to 300 elements to save context window
  };
}

async function performAction(action, params) {
  console.log("Jules Eyes: Executing", action, params);

  // Show cursor
  cursor.style.display = 'block';

  let targetElement = null;

  // Try to find element by Selector first (Precision)
  if (params.selector) {
    // If it's a generic selector, try to find by text if possible or just query
    // But GPT might send "button:contains('Publish')" pseudo logic, so let's keep it simple for now
    // We assume standard CSS selectors.
    try {
        targetElement = document.querySelector(params.selector);
    } catch (e) {}
  }

  // If no element found by selector, use Coordinates (Vision Fallback)
  // Convert Percentage to Pixels
  const x = (params.x / 100) * window.innerWidth;
  const y = (params.y / 100) * window.innerHeight;

  // 1. Move Cursor Smoothly
  moveCursor(x, y);

  // Wait for movement
  await new Promise(r => setTimeout(r, 600));

  // 2. Perform Click/Type
  if (action === "CLICK") {
    showClickAnimation(x, y);
    if (targetElement) {
      targetElement.click();
    } else {
      // Simulate click at coordinates
      const elem = document.elementFromPoint(x, y);
      if (elem) elem.click();
    }
  }

  if (action === "TYPE") {
    if (targetElement) {
      targetElement.focus();
      // Simulate typing (basic value set for now, can be enhanced to simulate keystrokes)
      // For React/Modern apps, setting value directly often doesn't trigger change events.
      // We need to dispatch input events.
      targetElement.value = params.text;
      targetElement.dispatchEvent(new Event('input', { bubbles: true }));
      targetElement.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  if (action === "SCROLL") {
      window.scrollTo({
          top: document.body.scrollHeight * (params.y / 100),
          behavior: 'smooth'
      });
  }

  // Hide cursor after a while
  setTimeout(() => { cursor.style.display = 'none'; }, 2000);
}

function moveCursor(x, y) {
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
}

function showClickAnimation(x, y) {
  const ripple = document.createElement('div');
  ripple.style.position = 'fixed';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.transform = 'translate(-50%, -50%)';
  ripple.style.width = '0px';
  ripple.style.height = '0px';
  ripple.style.border = '2px solid red';
  ripple.style.borderRadius = '50%';
  ripple.style.zIndex = '999998';
  document.body.appendChild(ripple);

  // Animate
  const animation = ripple.animate([
    { width: '0px', height: '0px', opacity: 1 },
    { width: '50px', height: '50px', opacity: 0 }
  ], {
    duration: 300,
    easing: 'ease-out'
  });

  animation.onfinish = () => ripple.remove();
}
