(function () {
  const script = document.currentScript;
  const widgetToken = script?.getAttribute("data-token");
  const previewConfigRaw = script?.getAttribute("data-config");
  const apiBase = script?.src ? new URL(script.src).origin : "http://127.0.0.1:8000";

  if (!widgetToken) {
    console.error("Nexus: data-token attribute is required on the widget script tag");
    return;
  }

  let config = {
    title: "Chat with us",
    welcome_message: "Hello! How can I help you today?",
    primary_color: "#000000",
    position: "bottom-right",
    button_size: "medium",
    widget_style: "chat",
    logo_url: null,
  };

  const sizes = { small: 48, medium: 56, large: 64 };

  const styleIcons = {
    chat:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>',
    robot:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M9 18h6"/></svg>',
    assistant:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 14.6 7 18.2l1.9-5.8L4 8.8h6.1z"/></svg>',
    help:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.5 2.5 0 1 1 4.8 1c-.7.8-1.8 1.2-1.8 2.2"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>',
  };

  function getIconColor(hex) {
    if (!hex || hex[0] !== "#" || hex.length < 7) return "#ffffff";
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? "#111111" : "#ffffff";
  }

  function injectStyles() {
    if (document.getElementById("nx-widget-styles")) return;

    const style = document.createElement("style");
    style.id = "nx-widget-styles";
    style.textContent = `
      #nx-widget-root { font-family: "Segoe UI", Arial, sans-serif; }
      #nx-widget-btn {
        position: fixed; z-index: 99999; border: none; border-radius: 50%;
        color: white; cursor: pointer; box-shadow: 0 4px 18px rgba(0,0,0,0.16);
        display: flex; align-items: center; justify-content: center;
        overflow: hidden; transition: transform 0.15s ease;
      }
      #nx-widget-btn:hover { transform: scale(1.04); }
      #nx-widget-btn img { width: 70%; height: 70%; object-fit: contain; }
      #nx-widget-btn .nx-icon { display: flex; align-items: center; justify-content: center; }
      #nx-widget-panel {
        position: fixed; z-index: 99999; width: 360px; max-width: calc(100vw - 32px);
        height: 480px; max-height: calc(100vh - 100px); background: white;
        border: 1px solid #e8e8e8; border-radius: 14px; display: none;
        flex-direction: column; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      }
      #nx-widget-header {
        padding: 14px 16px; border-bottom: 1px solid #eee; font-weight: 600;
        color: #111; background: white; font-size: 14px;
        display: flex; align-items: center; gap: 10px;
      }
      #nx-widget-header img { width: 28px; height: 28px; object-fit: contain; border-radius: 6px; }
      #nx-widget-messages { flex: 1; overflow-y: auto; padding: 16px; background: #fafafa; }
      .nx-msg { margin-bottom: 10px; line-height: 1.5; font-size: 14px; white-space: pre-wrap; }
      .nx-msg-user { text-align: right; }
      .nx-msg-user span {
        display: inline-block; background: #111; color: #fff;
        padding: 8px 12px; border-radius: 12px; max-width: 85%; text-align: left;
      }
      .nx-msg-bot { color: #333; }
      .nx-msg-bot-inner {
        background: white; border: 1px solid #eee;
        padding: 8px 12px; border-radius: 12px; display: inline-block; max-width: 90%;
      }
      .nx-citation {
        margin-top: 8px; padding-top: 8px; border-top: 1px solid #f0f0f0;
        font-size: 11px; color: #666; line-height: 1.6;
      }
      .nx-citation strong { color: #111; font-weight: 600; }
      #nx-widget-input-row {
        display: flex; gap: 8px; padding: 12px; border-top: 1px solid #eee; background: white;
      }
      #nx-widget-input {
        flex: 1; border: 1px solid #ddd; border-radius: 10px; padding: 9px 12px;
        font-size: 14px; outline: none; color: #111;
      }
      #nx-widget-input:focus { border-color: #111; }
      #nx-widget-send {
        color: white; border: none; border-radius: 10px;
        padding: 9px 16px; cursor: pointer; font-size: 13px; font-weight: 500;
      }
      #nx-widget-send:disabled { opacity: 0.5; cursor: not-allowed; }
    `;
    document.head.appendChild(style);
  }

  function positionElements(btn, panel) {
    const isLeft = config.position === "bottom-left";
    const side = isLeft ? "left" : "right";
    btn.style[side] = "24px";
    btn.style.bottom = "24px";
    panel.style[side] = "24px";
    panel.style.bottom = "96px";
  }

  function setButtonContent(btn) {
    btn.innerHTML = "";
    btn.className = "";

    if (config.logo_url) {
      const img = document.createElement("img");
      img.src = config.logo_url;
      img.alt = "Chat";
      btn.appendChild(img);
      return;
    }

    const style = config.widget_style || "chat";
    const iconWrap = document.createElement("span");
    iconWrap.className = "nx-icon";
    iconWrap.style.color = getIconColor(config.primary_color);
    iconWrap.innerHTML = styleIcons[style] || styleIcons.chat;
    btn.appendChild(iconWrap);
  }

  function createWidget() {
    document.getElementById("nx-widget-root")?.remove();

    injectStyles();

    const root = document.createElement("div");
    root.id = "nx-widget-root";
    document.body.appendChild(root);

    const btn = document.createElement("button");
    btn.id = "nx-widget-btn";
    btn.setAttribute("aria-label", "Open chat");
    setButtonContent(btn);

    const panel = document.createElement("div");
    panel.id = "nx-widget-panel";

    const header = document.createElement("div");
    header.id = "nx-widget-header";

    if (config.logo_url) {
      const logo = document.createElement("img");
      logo.src = config.logo_url;
      logo.alt = "";
      header.appendChild(logo);
    }

    const titleEl = document.createElement("span");
    titleEl.textContent = config.title;
    header.appendChild(titleEl);

    const messages = document.createElement("div");
    messages.id = "nx-widget-messages";

    const welcome = document.createElement("div");
    welcome.className = "nx-msg nx-msg-bot";
    const welcomeInner = document.createElement("div");
    welcomeInner.className = "nx-msg-bot-inner";
    welcomeInner.textContent = config.welcome_message;
    welcome.appendChild(welcomeInner);
    messages.appendChild(welcome);

    const inputRow = document.createElement("div");
    inputRow.id = "nx-widget-input-row";

    const input = document.createElement("input");
    input.id = "nx-widget-input";
    input.placeholder = "Ask a question...";

    const sendBtn = document.createElement("button");
    sendBtn.id = "nx-widget-send";
    sendBtn.textContent = "Send";

    inputRow.appendChild(input);
    inputRow.appendChild(sendBtn);
    panel.appendChild(header);
    panel.appendChild(messages);
    panel.appendChild(inputRow);
    root.appendChild(btn);
    root.appendChild(panel);

    const size = sizes[config.button_size] || sizes.medium;
    btn.style.width = size + "px";
    btn.style.height = size + "px";
    btn.style.background = config.primary_color;
    sendBtn.style.background = config.primary_color;

    positionElements(btn, panel);

    btn.addEventListener("click", () => {
      panel.style.display = panel.style.display === "flex" ? "none" : "flex";
    });

    async function sendMessage() {
      const question = input.value.trim();
      if (!question) return;

      input.value = "";
      sendBtn.disabled = true;

      const userMsg = document.createElement("div");
      userMsg.className = "nx-msg nx-msg-user";
      const userSpan = document.createElement("span");
      userSpan.textContent = question;
      userMsg.appendChild(userSpan);
      messages.appendChild(userMsg);

      const loadingMsg = document.createElement("div");
      loadingMsg.className = "nx-msg nx-msg-bot";
      const loadingInner = document.createElement("div");
      loadingInner.className = "nx-msg-bot-inner";
      loadingInner.textContent = "Thinking...";
      loadingMsg.appendChild(loadingInner);
      messages.appendChild(loadingMsg);
      messages.scrollTop = messages.scrollHeight;

      try {
        const res = await fetch(`${apiBase}/chat/token/${widgetToken}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });

        const data = await res.json();
        loadingInner.textContent = data.answer || "Sorry, I could not find an answer.";

        if (data.source) {
          const citation = document.createElement("div");
          citation.className = "nx-citation";
          citation.innerHTML =
            `<strong>Source:</strong> ${data.source.filename}<br>` +
            `<strong>Page:</strong> ${data.source.page}<br>` +
            `<strong>Confidence:</strong> ${data.confidence}%`;
          loadingInner.appendChild(citation);
        }
      } catch {
        loadingInner.textContent = "Unable to connect. Please try again.";
      }

      sendBtn.disabled = false;
      messages.scrollTop = messages.scrollHeight;
    }

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }

  function startWidget() {
    if (previewConfigRaw) {
      try {
        config = { ...config, ...JSON.parse(previewConfigRaw) };
      } catch {
        console.warn("Nexus: invalid data-config JSON on widget script");
      }
      createWidget();
      return;
    }

    fetch(`${apiBase}/widget/token/${widgetToken}/config`)
      .then((res) => res.json())
      .then((data) => {
        config = { ...config, ...data };
        createWidget();
      })
      .catch(() => createWidget());
  }

  startWidget();
})();
