import React, { useState, useEffect, useRef, useCallback } from "react";
import PetWindow from "./PetWindow";
import ChatWindow from "./ChatWindow";

function App() {
  const [windowLabel, setWindowLabel] = useState(null);
  const [isTauri, setIsTauri] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPos, setChatPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  useEffect(() => {
    async function detectWindow() {
      try {
        const { getCurrentWindow } = await import("@tauri-apps/api/window");
        const win = getCurrentWindow();
        setWindowLabel(win.label);
        setIsTauri(true);
      } catch {
        setWindowLabel("browser");
        setIsTauri(false);
      }
    }
    detectWindow();
  }, []);

  const handleDragStart = useCallback((e) => {
    dragRef.current = {
      startX: e.clientX - chatPos.x,
      startY: e.clientY - chatPos.y,
    };
    const onMove = (ev) => {
      if (!dragRef.current) return;
      setChatPos({
        x: ev.clientX - dragRef.current.startX,
        y: ev.clientY - dragRef.current.startY,
      });
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [chatPos]);

  if (!windowLabel) return null;

  if (windowLabel === "chat") {
    return <ChatWindow isTauri={true} />;
  }

  if (windowLabel === "browser") {
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        background: "#1a1a2e",
        position: "relative",
        overflow: "hidden",
      }}>
        <PetWindow
          isTauri={false}
          onChatToggle={(x, y) => {
            if (chatOpen) {
              setChatOpen(false);
            } else {
              setChatPos({
                x: Math.min(Math.max(x - 170, 10), window.innerWidth - 350),
                y: window.innerHeight - Math.ceil(108 * 1.2) - 470,
              });
              setChatOpen(true);
            }
          }}
          chatOpen={chatOpen}
        />
        {chatOpen && (
          <div style={{
            position: "absolute",
            left: chatPos.x,
            top: chatPos.y,
            zIndex: 100,
          }}>
            <ChatWindow
              isTauri={false}
              onClose={() => setChatOpen(false)}
              onDragStart={handleDragStart}
            />
          </div>
        )}
      </div>
    );
  }

  return <PetWindow isTauri={true} />;
}

export default App;
