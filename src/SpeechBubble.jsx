import React from "react";

export default function SpeechBubble({ text, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: 200,
      background: "#0E0A1C",
      border: "1px solid #6B3FA0",
      borderRadius: 12,
      padding: "8px 12px",
      color: "#C8B4E0",
      fontSize: 12,
      fontFamily: "'Nunito', sans-serif",
      lineHeight: 1.4,
      textAlign: "center",
      pointerEvents: "none",
      zIndex: 10,
      boxShadow: "0 2px 12px rgba(107,63,160,0.4)",
    }}>
      {text}
      {/* Tail pointing down */}
      <div style={{
        position: "absolute",
        bottom: -8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderTop: "8px solid #6B3FA0",
      }} />
    </div>
  );
}
