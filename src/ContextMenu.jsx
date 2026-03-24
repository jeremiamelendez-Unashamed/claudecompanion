import React, { useEffect, useRef } from "react";

const COLORS = {
  bg: "#0E0A1C",
  border: "#6B3FA0",
  text: "#C8B4E0",
  hover: "#3A1D6B",
  accent: "#DB70AA",
};

export default function ContextMenu({ visible, x, y, items, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const handler = (e) => {
      if (e.button === 2) return; // right-click handled by contextmenu toggle
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        left: x,
        top: y,
        background: COLORS.bg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 10,
        overflow: "hidden",
        zIndex: 9999,
        minWidth: 170,
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {items.map((item, i) =>
        item.separator ? (
          <div key={i} style={{ height: 1, background: COLORS.border, margin: "2px 0" }} />
        ) : (
          <button
            key={i}
            onClick={() => { item.onClick(); onClose(); }}
            style={{
              display: "block",
              width: "100%",
              padding: "9px 16px",
              background: "none",
              border: "none",
              color: item.danger ? "#ff6b6b" : COLORS.text,
              textAlign: "left",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'Nunito', sans-serif",
            }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.hover}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            {item.label}
          </button>
        )
      )}
    </div>
  );
}
