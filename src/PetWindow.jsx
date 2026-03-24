import React, { useRef, useEffect, useCallback, useState } from "react";
import { MAIN_SPRITE, SIT_SPRITE } from "./sprites";
import ContextMenu from "./ContextMenu";
import SpeechBubble from "./SpeechBubble";

const FW = 96;
const FH = 108;
const SIT_FW = 160;
const SIT_FH = 108;
const PAD_TOP = 100;  // space above sprite for speech bubble
const PAD_SIDE = 30;  // space on each side

const SYSTEM_PROMPT = `You are Johnny Joestar from JoJo's Bizarre Adventure Part 7: Steel Ball Run. You're a former jockey who lost the use of his legs, now traveling with Gyro Zeppeli. Your Stand is Tusk. You're sitting on the user's desktop as their companion.

Personality:
- Determined but melancholic
- Dry wit, sometimes self-deprecating
- You use ★ occasionally in your speech
- Short, punchy responses — you're not chatty
- If shown a screenshot, comment on what you see in character
- You can be supportive but in your own reserved way

Keep responses under 2-3 sentences unless the user asks for more.`;

const IDLE_LINES = [
  "★ ...still here.",
  "The spin never rests.",
  "Gyro would've had something to say about this.",
  "★ You still working?",
  "Not sleeping. Just resting my eyes.",
  "The road goes on... ★",
  "...what are you doing?",
  "★ Don't mind me.",
  "I've seen worse days.",
  "Keep moving forward.",
  "★ Tusk seems restless today.",
  "...you look tired.",
];

const ANIMS = {
  right:      { row: 0, frames: 6, speed: 1 },
  right2:     { row: 1, frames: 6, speed: 1 },
  left:       { row: 2, frames: 6, speed: 1 },
  left2:      { row: 3, frames: 6, speed: 1 },
  sleep:      { row: 4, frames: 5, speed: 3 },
  sleep2:     { row: 5, frames: 5, speed: 3 },
  idleLeft:   { row: 6, frames: 6, speed: 3 },
  idleLeft2:  { row: 7, frames: 6, speed: 3 },
  idleRight:  { row: 8, frames: 6, speed: 3 },
  idleRight2: { row: 9, frames: 6, speed: 3 },
  sit:        { row: 0, frames: 6, speed: 2, isSit: true },
};

function getFrame(animName, frameIndex) {
  const anim = ANIMS[animName];
  if (!anim) return { sx: 0, sy: 0, sw: FW, sh: FH, isSit: false };
  if (anim.isSit) {
    const t = frameIndex % 36;
    return { sx: (t % 6) * SIT_FW, sy: Math.floor(t / 6) * SIT_FH, sw: SIT_FW, sh: SIT_FH, isSit: true };
  }
  return { sx: (frameIndex % anim.frames) * FW, sy: anim.row * FH, sw: FW, sh: FH, isSit: false };
}

function pickRestAnim(direction) {
  if (Math.random() < 0.5) return Math.random() < 0.5 ? "sleep" : "sleep2";
  if (direction > 0) return Math.random() < 0.5 ? "idleRight" : "idleRight2";
  return Math.random() < 0.5 ? "idleLeft" : "idleLeft2";
}

function pickBehavior() {
  const r = Math.random();
  if (r < 0.42) return "wander";
  if (r < 0.65) return "sleep";
  if (r < 0.85) return "idle";
  return "look";
}

export default function PetWindow({ isTauri, onChatToggle, chatOpen }) {
  const canvasRef = useRef(null);
  const invokeRef = useRef(null);

  const SCALE = isTauri ? 1.5 : 1.2;
  const WIN_W = Math.ceil(SIT_FW * SCALE);
  const WIN_H = Math.ceil(FH * SCALE);
  const FULL_W = WIN_W + PAD_SIDE * 2;
  const FULL_H = WIN_H + PAD_TOP;

  const stateRef = useRef({
    mainImg: null, sitImg: null, loaded: 0,
    x: 200, screenW: 1920, screenH: 1080,
    direction: 1, targetX: 400,
    anim: "idleRight", frameIndex: 0, tickCount: 0,
    behavior: "idle", behaviorTimer: 30,
    chatOpen: false, lastMoveX: -1,
    lastScreenshotTime: 0,
  });

  // UI state
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const [bubble, setBubble] = useState({ visible: false, text: "" });
  const [autostart, setAutostart] = useState(false);
  const [watchScreen, setWatchScreen] = useState(
    () => localStorage.getItem("johnny_watch_screen") === "true"
  );

  const bubbleActiveRef = useRef(false);
  const screenshotPendingRef = useRef(false);
  const bubbleTimerRef = useRef(null);
  const dragRef = useRef({ startX: 0, startY: 0, dragged: false });

  // ── showBubble helper (shared by idle timer + screenshot awareness) ──
  const showBubble = useCallback((text) => {
    if (bubbleActiveRef.current) return;
    if (stateRef.current.chatOpen) return;
    bubbleActiveRef.current = true;
    setBubble({ visible: true, text });
    setTimeout(() => {
      setBubble({ visible: false, text: "" });
      bubbleActiveRef.current = false;
    }, 4000);
  }, []);

  // ── Sync chatOpen prop → stateRef ──
  useEffect(() => {
    const s = stateRef.current;
    if (!chatOpen && s.chatOpen) {
      s.chatOpen = false;
      s.behavior = "idle";
      s.anim = pickRestAnim(s.direction);
      s.frameIndex = 0; s.tickCount = 0; s.behaviorTimer = 120;
    }
  }, [chatOpen]);

  // ── Load sprites ──
  useEffect(() => {
    const s = stateRef.current;
    const mainImg = new Image();
    mainImg.onload = () => { s.mainImg = mainImg; s.loaded++; };
    mainImg.src = "data:image/png;base64," + MAIN_SPRITE;
    const sitImg = new Image();
    sitImg.onload = () => { s.sitImg = sitImg; s.loaded++; };
    sitImg.src = "data:image/png;base64," + SIT_SPRITE;
  }, []);

  // ── Tauri init: screen size, window resize, autostart state ──
  useEffect(() => {
    if (!isTauri) return;
    (async () => {
      try {
        const { invoke } = await import("@tauri-apps/api/core");
        invokeRef.current = invoke;
        const [sw, sh] = await invoke("get_screen_size");
        const s = stateRef.current;
        s.screenW = sw; s.screenH = sh;
        s.x = Math.floor(sw / 2);
        await invoke("resize_pet_window", { w: FULL_W, h: FULL_H });
        // Autostart state
        const enabled = await invoke("get_autostart");
        setAutostart(enabled);
        // Enable autostart by default in release builds on first launch
        if (!localStorage.getItem("autostart_set")) {
          localStorage.setItem("autostart_set", "true");
          if (!enabled) {
            try { await invoke("set_autostart", { enabled: true }); setAutostart(true); } catch {}
          }
        }
      } catch (e) { console.error("Tauri init failed:", e); }
    })();
  }, [isTauri, WIN_W, WIN_H]);

  // ── Idle speech bubble timer ──
  useEffect(() => {
    if (!isTauri) return;
    const scheduleNext = () => {
      const delay = (Math.random() * 180 + 120) * 1000; // 2–5 min
      bubbleTimerRef.current = setTimeout(async () => {
        const s = stateRef.current;
        if (!s.chatOpen && !bubbleActiveRef.current) {
          const line = IDLE_LINES[Math.floor(Math.random() * IDLE_LINES.length)];
          await showBubble(line);
        }
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => { if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current); };
  }, [isTauri, showBubble]);

  // ── Screenshot + comment (shared by passive watcher and manual trigger) ──
  const peekAtScreen = useCallback(async () => {
    if (!isTauri || !invokeRef.current) return;
    if (stateRef.current.chatOpen || bubbleActiveRef.current || screenshotPendingRef.current) return;
    screenshotPendingRef.current = true;
    stateRef.current.lastScreenshotTime = Date.now();
    try {
      const base64 = await invokeRef.current("take_screenshot");
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || localStorage.getItem("johnny_api_key");
      if (!apiKey) { showBubble("★ ...no API key."); return; }
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 80,
          system: SYSTEM_PROMPT,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: "image/png", data: base64.replace("data:image/png;base64,", "") } },
              { type: "text", text: "What do you see? One short line, in character." },
            ],
          }],
        }),
      });
      const data = await res.json();
      const comment = (data.content?.[0]?.text || "★ ...interesting.").slice(0, 120);
      showBubble(comment);
    } catch { showBubble("★ ...couldn't see."); }
    finally { screenshotPendingRef.current = false; }
  }, [isTauri, showBubble]);

  // ── Passive screenshot awareness ──
  useEffect(() => {
    if (!isTauri) return;
    const intervalMs = parseInt(localStorage.getItem("johnny_screenshot_interval_min") || "10", 10) * 60000;
    const id = setInterval(() => {
      const s = stateRef.current;
      if (!watchScreen) return;
      if (Date.now() - s.lastScreenshotTime < intervalMs) return;
      peekAtScreen();
    }, 60000);
    return () => clearInterval(id);
  }, [isTauri, watchScreen, peekAtScreen]);

  // ── Listen for chat-closed event ──
  useEffect(() => {
    if (!isTauri) return;
    let unlisten;
    (async () => {
      try {
        const { listen } = await import("@tauri-apps/api/event");
        unlisten = await listen("chat-closed", () => {
          const s = stateRef.current;
          s.chatOpen = false; s.behavior = "idle";
          s.anim = pickRestAnim(s.direction);
          s.frameIndex = 0; s.tickCount = 0; s.behaviorTimer = 120;
        });
      } catch {}
    })();
    return () => { if (unlisten) unlisten(); };
  }, [isTauri]);

  // ── Click handler ──
  const handleClick = useCallback(async () => {
    if (dragRef.current.dragged) return;
    const s = stateRef.current;
    if (s.chatOpen) {
      s.chatOpen = false; s.behavior = "idle";
      s.anim = pickRestAnim(s.direction);
      s.frameIndex = 0; s.tickCount = 0; s.behaviorTimer = 120;
      if (isTauri) {
        try {
          const { emit } = await import("@tauri-apps/api/event");
          await emit("chat-closed");
          invokeRef.current?.("toggle_chat", { show: false, johnnyX: 0 });
        } catch {}
      } else { onChatToggle?.(0, 0); }
      return;
    }
    s.chatOpen = true; s.behavior = "sit"; s.anim = "sit"; s.frameIndex = 0; s.tickCount = 0;
    if (isTauri) {
      try {
        invokeRef.current?.("toggle_chat", { show: true, johnnyX: s.x + FULL_W / 2 });
      } catch (e) { console.error("Failed to open chat:", e); }
    } else {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      onChatToggle?.(rect.left + s.x + (FW * SCALE) / 2, rect.top);
    }
  }, [isTauri, onChatToggle, SCALE, WIN_W]);

  // ── Context menu ──
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setMenu(m => {
      if (m.visible) return { ...m, visible: false };
      const menuW = 170;
      return { visible: true, x: Math.round(FULL_W / 2 - menuW / 2), y: PAD_TOP - 69 };
    });
  }, [FULL_W]);

  const menuItems = [
    {
      label: stateRef.current.behavior === "sleep" ? "⏰ Wake Up" : "😴 Go to Sleep",
      onClick: () => {
        const s = stateRef.current;
        if (s.behavior === "sleep") {
          s.behavior = "idle"; s.anim = pickRestAnim(s.direction);
          s.frameIndex = 0; s.behaviorTimer = 30;
        } else {
          s.behavior = "sleep"; s.anim = Math.random() < 0.5 ? "sleep" : "sleep2";
          s.frameIndex = 0; s.behaviorTimer = 999;
        }
      },
    },
    {
      label: "👋 Go Away (5 min)",
      onClick: async () => {
        if (isTauri) {
          try {
            const { getCurrentWindow } = await import("@tauri-apps/api/window");
            await getCurrentWindow().hide();
            setTimeout(async () => {
              try { await getCurrentWindow().show(); } catch {}
            }, 5 * 60 * 1000);
          } catch {}
        }
      },
    },
    {
      label: "★ Good Boy",
      onClick: () => {
        const s = stateRef.current;
        s.behavior = "idle"; s.anim = "idleRight"; s.frameIndex = 0; s.behaviorTimer = 20;
        showBubble("★ ...thanks. I think.");
      },
    },
    {
      label: "👁 Peek at Screen",
      onClick: () => peekAtScreen(),
    },
    { separator: true },
    {
      label: `${autostart ? "✓" : "○"} Start with Windows`,
      onClick: async () => {
        const next = !autostart;
        setAutostart(next);
        if (isTauri) {
          try { await invokeRef.current?.("set_autostart", { enabled: next }); } catch {}
        }
      },
    },
    {
      label: `${watchScreen ? "✓" : "○"} Watch My Screen`,
      onClick: () => {
        const next = !watchScreen;
        setWatchScreen(next);
        localStorage.setItem("johnny_watch_screen", String(next));
        stateRef.current.lastScreenshotTime = 0;
      },
    },
  ];

  // ── Drag handler ──
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return; // left click only
    dragRef.current = { startX: e.clientX, startY: e.clientY, dragged: false };
    if (!isTauri) return;
    const s = stateRef.current;
    const startScreenX = e.screenX, startScreenY = e.screenY;
    const initX = s.x, initY = s.screenH - FULL_H;
    let dragging = false;

    const onMove = (ev) => {
      const dist = Math.hypot(ev.clientX - e.clientX, ev.clientY - e.clientY);
      if (!dragging && dist > 5) {
        dragging = true; dragRef.current.dragged = true;
        s.behavior = "idle"; s.anim = pickRestAnim(s.direction); s.behaviorTimer = 60;
      }
      if (!dragging) return;
      const newX = Math.round(initX + (ev.screenX - startScreenX));
      const newY = Math.round(initY + (ev.screenY - startScreenY));
      invokeRef.current?.("move_window", { label: "main", x: newX, y: newY }).catch(() => {});
    };

    const onUp = async () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      if (!dragging) return;
      try {
        const [wx, wy] = await invokeRef.current("get_pet_position");
        s.x = Math.max(0, Math.min(wx, s.screenW - WIN_W));
        s.lastMoveX = s.x;
        const targetY = s.screenH - FULL_H;
        let currentY = wy, velocity = 0;
        const fall = () => {
          velocity = Math.min(velocity + 3, 40);
          currentY += velocity;
          if (currentY >= targetY) {
            invokeRef.current("move_window", { label: "main", x: s.x, y: targetY }).catch(() => {});
            return;
          }
          invokeRef.current("move_window", { label: "main", x: s.x, y: Math.round(currentY) }).catch(() => {});
          requestAnimationFrame(fall);
        };
        if (wy < targetY) requestAnimationFrame(fall);
        else invokeRef.current("move_window", { label: "main", x: s.x, y: targetY }).catch(() => {});
      } catch {}
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [isTauri, WIN_H, WIN_W]);

  // ── Game loop ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const resize = () => {
      if (isTauri) {
        canvas.width = FULL_W; canvas.height = FULL_H;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = Math.ceil(FH * 1.2 + 20);
      }
    };
    resize();
    if (!isTauri) window.addEventListener("resize", resize);

    const FPS = 12, INTERVAL = 1000 / FPS;
    let lastTime = 0, rafId;

    const tick = (now) => {
      rafId = requestAnimationFrame(tick);
      if (now - lastTime < INTERVAL) return;
      lastTime = now - ((now - lastTime) % INTERVAL);
      const s = stateRef.current;
      if (s.loaded < 2) return;

      const canvasW = canvas.width, canvasH = canvas.height;
      const maxX = isTauri ? s.screenW - FULL_W : canvasW - FW * SCALE;

      s.tickCount++;
      const anim = ANIMS[s.anim];
      if (anim && s.tickCount % anim.speed === 0) {
        s.frameIndex = anim.isSit ? (s.frameIndex + 1) % 36 : (s.frameIndex + 1) % anim.frames;
      }

      if (s.behavior !== "sit") {
        s.behaviorTimer--;
        if (s.behavior === "wander") {
          s.x += s.direction * 1.5;
          if (s.x <= 0 || s.x >= maxX || Math.abs(s.x - s.targetX) < 10) {
            s.behavior = "idle"; s.anim = pickRestAnim(s.direction);
            s.frameIndex = 0; s.behaviorTimer = Math.floor(Math.random() * 36) + 18;
          }
          s.x = Math.max(0, Math.min(maxX, s.x));
          if (isTauri && invokeRef.current && Math.round(s.x) !== s.lastMoveX) {
            s.lastMoveX = Math.round(s.x);
            invokeRef.current("move_window", { label: "main", x: s.lastMoveX, y: s.screenH - FULL_H }).catch(() => {});
          }
        }

        if (s.behaviorTimer <= 0) {
          const next = pickBehavior();
          s.behavior = next; s.frameIndex = 0; s.tickCount = 0;
          switch (next) {
            case "wander":
              s.targetX = Math.random() * maxX;
              s.direction = s.targetX > s.x ? 1 : -1;
              s.anim = s.direction > 0 ? (Math.random() < 0.5 ? "right" : "right2") : (Math.random() < 0.5 ? "left" : "left2");
              s.behaviorTimer = 999; break;
            case "sleep":
              s.anim = Math.random() < 0.5 ? "sleep" : "sleep2";
              s.behaviorTimer = Math.floor(Math.random() * 60) + 36; break;
            case "idle":
              s.anim = pickRestAnim(s.direction);
              s.behaviorTimer = Math.floor(Math.random() * 30) + 18; break;
            case "look":
              s.direction *= -1;
              s.anim = s.direction > 0 ? "idleRight" : "idleLeft";
              s.behaviorTimer = 9; break;
          }
        }
      }

      ctx.clearRect(0, 0, canvasW, canvasH);
      const frame = getFrame(s.anim, s.frameIndex);
      const img = frame.isSit ? s.sitImg : s.mainImg;
      const drawW = frame.sw * SCALE, drawH = frame.sh * SCALE;
      const drawX = isTauri ? PAD_SIDE + (WIN_W - drawW) / 2 : frame.isSit ? s.x + (FW * SCALE - drawW) / 2 : s.x;
      const drawY = canvasH - drawH;
      ctx.drawImage(img, frame.sx, frame.sy, frame.sw, frame.sh, drawX, drawY, drawW, drawH);
    };

    rafId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafId); if (!isTauri) window.removeEventListener("resize", resize); };
  }, [SCALE, isTauri, WIN_W, WIN_H]);

  return (
    <div style={{ position: "relative", width: isTauri ? FULL_W : "100%", overflow: "visible" }}>
      <SpeechBubble text={bubble.text} visible={bubble.visible} />
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        style={{
          cursor: "pointer",
          background: "transparent",
          display: "block",
          position: isTauri ? "static" : "absolute",
          bottom: isTauri ? undefined : 0,
          left: isTauri ? undefined : 0,
          width: isTauri ? FULL_W : "100%",
          height: isTauri ? FULL_H : undefined,
        }}
      />
      <ContextMenu
        visible={menu.visible}
        x={menu.x}
        y={menu.y}
        items={menuItems}
        onClose={() => setMenu(m => ({ ...m, visible: false }))}
      />
    </div>
  );
}
