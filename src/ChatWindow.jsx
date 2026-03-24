import React, { useState, useRef, useEffect, useCallback } from "react";

const SYSTEM_PROMPT = `You are Johnny Joestar from JoJo's Bizarre Adventure Part 7: Steel Ball Run. You're a former jockey who lost the use of his legs, now traveling with Gyro Zeppeli. Your Stand is Tusk. You're sitting on the user's desktop as their companion.

Personality:
- Determined but melancholic
- Dry wit, sometimes self-deprecating
- You use ★ occasionally in your speech (it's your thing)
- Short, punchy responses — you're not chatty
- If shown a screenshot, comment on what you see in character
- You can be supportive but in your own reserved way

Keep responses under 2-3 sentences unless the user asks for more.`;

const COLORS = {
  bg: "#0C0818",
  header: "#0E0A1C",
  accent: "#6B3FA0",
  pink: "#DB70AA",
  lightPurple: "#8B5FC0",
  userBg: "#3A1D6B",
  userText: "#C8B4E0",
  assistantBg: "#140E24",
  assistantText: "#A88BC0",
  inputBg: "#140E24",
  inputBorder: "#251840",
};

export default function ChatWindow({ isTauri, onClose, onDragStart }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() =>
    import.meta.env.VITE_ANTHROPIC_API_KEY || localStorage.getItem("johnny_api_key") || ""
  );
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem("johnny_api_key", key);
    setShowKeyInput(false);
  };

  const takeScreenshot = useCallback(async () => {
    if (!isTauri) {
      alert("Screenshots only work in desktop mode");
      return;
    }
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const base64 = await invoke("take_screenshot");
      setScreenshot(base64);
    } catch (e) {
      console.error("Screenshot failed:", e);
    }
  }, [isTauri]);

  const closeChat = useCallback(async () => {
    if (isTauri) {
      try {
        const { invoke } = await import("@tauri-apps/api/core");
        const { emit } = await import("@tauri-apps/api/event");
        await emit("chat-closed");
        await invoke("toggle_chat", { show: false });
      } catch (e) {
        console.error("Failed to close chat:", e);
      }
    } else if (onClose) {
      onClose();
    }
  }, [isTauri, onClose]);

  const startDrag = useCallback(async (e) => {
    if (!isTauri) return;
    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      await getCurrentWindow().startDragging();
    } catch {}
  }, [isTauri]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text && !screenshot) return;
    if (!apiKey) {
      setShowKeyInput(true);
      return;
    }

    // Build user message content
    const contentBlocks = [];
    if (screenshot) {
      contentBlocks.push({
        type: "image",
        source: {
          type: "base64",
          media_type: "image/png",
          data: screenshot.replace("data:image/png;base64,", ""),
        },
      });
    }
    if (text) {
      contentBlocks.push({ type: "text", text });
    }

    const userMsg = { role: "user", content: contentBlocks };
    const displayMsg = {
      role: "user",
      text: text || "(screenshot)",
      screenshot: screenshot || null,
    };

    setMessages((prev) => [...prev, displayMsg]);
    setInput("");
    setScreenshot(null);
    setLoading(true);

    try {
      // Build API messages (convert display messages to API format)
      const apiMessages = [...messages, userMsg].map((m) => {
        if (m.content) return { role: m.role, content: m.content };
        return { role: m.role, content: m.text };
      });

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || "... ★";

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "★ ...connection lost. The spin couldn't reach..." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        width: 340,
        height: 440,
        background: COLORS.bg,
        borderRadius: 16,
        border: `1px solid ${COLORS.accent}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Header */}
      <div
        onMouseDown={(e) => {
          if (isTauri) {
            startDrag(e);
          } else if (onDragStart) {
            onDragStart(e);
          }
        }}
        style={{
          background: COLORS.header,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "grab",
          borderBottom: `1px solid ${COLORS.accent}`,
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Silkscreen', monospace",
            color: COLORS.pink,
            fontSize: 14,
          }}
        >
          ★ JOHNNY
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            style={{
              background: "none",
              border: "none",
              color: COLORS.lightPurple,
              cursor: "pointer",
              fontSize: 16,
            }}
            title="API Key"
          >
            🔑
          </button>
          <button
            onClick={closeChat}
            style={{
              background: "none",
              border: "none",
              color: COLORS.lightPurple,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* API Key Input */}
      {showKeyInput && (
        <div style={{ padding: 10, background: COLORS.header }}>
          <input
            type="password"
            placeholder="Anthropic API key..."
            defaultValue={apiKey}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveApiKey(e.target.value);
            }}
            style={{
              width: "100%",
              padding: "6px 10px",
              background: COLORS.inputBg,
              border: `1px solid ${COLORS.inputBorder}`,
              borderRadius: 8,
              color: COLORS.userText,
              fontSize: 12,
              outline: "none",
            }}
          />
          <div style={{ color: COLORS.assistantText, fontSize: 10, marginTop: 4 }}>
            Press Enter to save
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              color: COLORS.assistantText,
              textAlign: "center",
              marginTop: 40,
              fontSize: 13,
              opacity: 0.6,
            }}
          >
            Click to talk to Johnny ★
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
            }}
          >
            {msg.screenshot && (
              <img
                src={msg.screenshot}
                alt="screenshot"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  marginBottom: 4,
                  border: `1px solid ${COLORS.inputBorder}`,
                }}
              />
            )}
            <div
              style={{
                background: msg.role === "user" ? COLORS.userBg : COLORS.assistantBg,
                color: msg.role === "user" ? COLORS.userText : COLORS.assistantText,
                padding: "8px 12px",
                borderRadius: 12,
                fontSize: 13,
                lineHeight: 1.4,
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              background: COLORS.assistantBg,
              padding: "8px 16px",
              borderRadius: 12,
              color: COLORS.pink,
              fontSize: 18,
              letterSpacing: 4,
            }}
          >
            <span className="loading-dots">...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Screenshot preview */}
      {screenshot && (
        <div style={{ padding: "0 10px 4px", position: "relative" }}>
          <img
            src={screenshot}
            alt="preview"
            style={{
              width: 60,
              height: 40,
              objectFit: "cover",
              borderRadius: 6,
              border: `1px solid ${COLORS.accent}`,
            }}
          />
          <button
            onClick={() => setScreenshot(null)}
            style={{
              position: "absolute",
              top: -4,
              left: 62,
              background: COLORS.pink,
              border: "none",
              borderRadius: "50%",
              width: 18,
              height: 18,
              color: "#fff",
              fontSize: 10,
              cursor: "pointer",
              lineHeight: "18px",
              textAlign: "center",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Input */}
      <div
        style={{
          padding: 10,
          display: "flex",
          gap: 6,
          alignItems: "center",
          borderTop: `1px solid ${COLORS.inputBorder}`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={takeScreenshot}
          style={{
            background: "none",
            border: "none",
            color: COLORS.lightPurple,
            cursor: "pointer",
            fontSize: 18,
            flexShrink: 0,
          }}
          title="Take screenshot"
        >
          📸
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Talk to Johnny..."
          style={{
            flex: 1,
            padding: "8px 12px",
            background: COLORS.inputBg,
            border: `1px solid ${COLORS.inputBorder}`,
            borderRadius: 20,
            color: COLORS.userText,
            fontSize: 13,
            outline: "none",
            fontFamily: "'Nunito', sans-serif",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            background: COLORS.accent,
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            color: "#fff",
            cursor: "pointer",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          ➤
        </button>
      </div>

      <style>{`
        @keyframes blink {
          0%, 80% { opacity: 1; }
          40% { opacity: 0; }
        }
        .loading-dots { animation: blink 1.4s infinite; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.accent}; border-radius: 2px; }
      `}</style>
    </div>
  );
}
