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
  if (message.type === "EXECUTE_PLAN") {
    executePlan(message.plan);
  }
  if (message.type === "GET_DOM") {
    const map = getSimplifiedDOM();
    sendResponse(map);
  }
});

async function executePlan(plan) {
    console.log("Jules Eyes: Executing Plan", plan);
    for (const step of plan) {
        // Human-like pause between steps
        const pause = Math.random() * 300 + 200; // 200-500ms
        await new Promise(r => setTimeout(r, pause));

        await performAction(step.type, step.params);
    }
}

function getSimplifiedDOM() {
  const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], [role="link"]');
  const items = [];

  interactables.forEach((el) => {
    // Skip invisible elements (basic check)
    if (el.offsetParent === null && el.tagName !== 'OPTION') return;

    const rect = el.getBoundingClientRect();
    let text = el.innerText || el.placeholder || el.value || el.getAttribute('aria-label') || "";

    // Try to find associated label for inputs
    if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') && el.id) {
        const label = document.querySelector(`label[for="${el.id}"]`);
        if (label) text += ` (Label: ${label.innerText})`;
    }

    // Skip empty non-inputs
    if (!text.trim() && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') return;

    items.push({
      tag: el.tagName.toLowerCase(),
      type: el.type || '',
      text: text.slice(0, 100).replace(/\s+/g, ' ').trim(),
      id: el.id || '',
      value: el.value || '',
      checked: el.checked || false,
      disabled: el.disabled || false,
      x: Math.round(rect.x + window.scrollX), // Absolute Page X
      y: Math.round(rect.y + window.scrollY), // Absolute Page Y
      w: Math.round(rect.width),
      h: Math.round(rect.height)
    });
  });

  return {
    url: window.location.href,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    width: window.innerWidth,
    height: window.innerHeight,
    docHeight: document.documentElement.scrollHeight,
    title: document.title,
    elements: items.slice(0, 500) // Limit increased slightly
  };
}

async function performAction(action, params) {
  console.log("Jules Eyes: Executing", action, params);

  // Show cursor
  cursor.style.display = 'block';

  let targetElement = null;
  let useScroll = false;

  // 1. Try to find element by ID/Selector
  if (params.selector) {
    try {
        targetElement = document.querySelector(params.selector);
    } catch (e) {}
  }

  // 2. Determine target coordinates
  // If params has direct X/Y (from Map reasoning), use them as percentage base if sent that way,
  // but if they are pixels from our DOM map logic, we need to be careful.
  // The system prompt says params.x is percentage 0-100.

  let targetX = (params.x / 100) * window.innerWidth;
  let targetY = (params.y / 100) * window.innerHeight;

  // SMART SCROLL:
  // Prioritize Element Scrolling
  if (targetElement) {
      if (!isElementInViewport(targetElement)) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          await new Promise(r => setTimeout(r, 800)); // Wait for scroll
      }

      // Re-calculate coordinates after scroll
      const rect = targetElement.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
  }
  else if (params.y > 100) {
      // Fallback: If no element found but Y > 100%, treat as Percentage of Document Height (rare fallback)
      // This allows blind scrolling to "bottom of page" (Y=100%) or specific sections
      const scrollY = (params.y / 100) * document.documentElement.scrollHeight - (window.innerHeight / 2);
      window.scrollTo({ top: Math.max(0, scrollY), behavior: 'smooth' });
      await new Promise(r => setTimeout(r, 800));

      // After blind scroll, assume interaction is at center of viewport
      targetY = window.innerHeight / 2;
  }

  // 1. Move Cursor Smoothly (Human-like)
  if (action !== "WAIT") {
    await moveCursorHuman(targetX, targetY);
  }

  if (action === "WAIT") {
      await new Promise(r => setTimeout(r, params.duration || 500));
  }

  // 2. Perform Click/Type
  if (action === "CLICK") {
    showClickAnimation(targetX, targetY);
    if (targetElement) {
      targetElement.click();
      targetElement.focus(); // Ensure focus
    } else {
      const elem = document.elementFromPoint(targetX, targetY);
      if (elem) {
          elem.click();
          elem.focus();
      }
    }
  }

  if (action === "TYPE") {
    if (targetElement) {
      targetElement.focus();
      targetElement.value = params.text;
      targetElement.dispatchEvent(new Event('input', { bubbles: true }));
      targetElement.dispatchEvent(new Event('change', { bubbles: true }));
      targetElement.dispatchEvent(new Event('blur', { bubbles: true })); // Some apps validate on blur
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

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

async function moveCursorHuman(targetX, targetY) {
  // Get current position
  const startX = parseInt(cursor.style.left || '0');
  const startY = parseInt(cursor.style.top || '0');

  // Calculate distance
  const dist = Math.hypot(targetX - startX, targetY - startY);
  const duration = Math.min(1000, Math.max(300, dist / 2)); // Speed based on distance

  const startTime = Date.now();

  // Bezier Control Point (randomized for arc)
  const controlX = (startX + targetX) / 2 + (Math.random() - 0.5) * 200;
  const controlY = (startY + targetY) / 2 + (Math.random() - 0.5) * 200;

  return new Promise(resolve => {
      function animate() {
          const now = Date.now();
          const t = Math.min(1, (now - startTime) / duration);

          // Quadratic Bezier: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
          const x = Math.pow(1 - t, 2) * startX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * targetX;
          const y = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * targetY;

          cursor.style.left = x + 'px';
          cursor.style.top = y + 'px';

          if (t < 1) {
              requestAnimationFrame(animate);
          } else {
              resolve();
          }
      }
      animate();
  });
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
