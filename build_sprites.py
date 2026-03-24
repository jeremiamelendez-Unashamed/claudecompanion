#!/usr/bin/env python3
"""
Processes raw sprite images into src/sprites.js
Place source images in sprites/ directory before running.
See README for file mapping.
"""
from PIL import Image
import numpy as np
import base64, io, os

TW, TH = 96, 108
SIT_W, SIT_H = 160, 108


def remove_black_bg(img):
    arr = np.array(img.convert("RGBA"))
    brightness = np.sum(arr[:, :, :3].astype(float), axis=2)
    arr[brightness < 40, 3] = 0
    arr[arr[:, :, 3] < 90, 3] = 0
    arr[arr[:, :, 3] >= 90, 3] = 255
    return Image.fromarray(arr)


def extract_frames(path, cols, rows, tw, th, max_frames=None):
    img = remove_black_bg(Image.open(path))
    w, h = img.size
    cw, ch = w // cols, h // rows
    frames = []
    for r in range(rows):
        for c in range(cols):
            f = img.crop((c * cw, r * ch, (c + 1) * cw, (r + 1) * ch))
            f = f.resize((tw, th), Image.LANCZOS)
            fa = np.array(f)
            fa[fa[:, :, 3] < 80, 3] = 0
            fa[fa[:, :, 3] >= 80, 3] = 255
            frames.append(Image.fromarray(fa))
    return frames[:max_frames] if max_frames else frames


def encode_sheet(sheet, colors=96):
    q = sheet.convert("P", palette=Image.ADAPTIVE, colors=colors).convert("RGBA")
    aq = np.array(q)
    ao = np.array(sheet)
    aq[:, :, 3] = ao[:, :, 3]
    q = Image.fromarray(aq)
    buf = io.BytesIO()
    q.save(buf, format="PNG", optimize=True)
    return base64.b64encode(buf.getvalue()).decode()


def build_main_sheet():
    right = extract_frames("sprites/walk-right.png", 6, 6, TW, TH, 12)
    left = [f.transpose(Image.FLIP_LEFT_RIGHT) for f in right]
    sleep = extract_frames("sprites/sleep.png", 5, 6, TW, TH, 10)
    idle_left = extract_frames("sprites/idle-left.png", 6, 6, TW, TH, 12)
    idle_right = extract_frames("sprites/idle-right.png", 6, 6, TW, TH, 12)

    MAXC = 6
    sheet = Image.new("RGBA", (MAXC * TW, 10 * TH), (0, 0, 0, 0))

    def paste(frames, row, start=0):
        for i, f in enumerate(frames[start : start + MAXC]):
            sheet.paste(f, (i * TW, row * TH))

    paste(right, 0, 0)
    paste(right, 1, 6)
    paste(left, 2, 0)
    paste(left, 3, 6)
    paste(sleep, 4, 0)
    paste(sleep, 5, 5)
    paste(idle_left, 6, 0)
    paste(idle_left, 7, 6)
    paste(idle_right, 8, 0)
    paste(idle_right, 9, 6)

    return encode_sheet(sheet, colors=192)


def build_sit_sheet():
    sit_dir = "sprites/sit"
    frames = []
    for i in range(36):
        path = os.path.join(sit_dir, f"frame_{i:03d}.png")
        if not os.path.exists(path):
            print(f"Warning: {path} not found, stopping at {i} frames")
            break
        f = remove_black_bg(Image.open(path))
        w, h = f.size
        prop_w = round(w * SIT_H / h)
        resized = f.resize((prop_w, SIT_H), Image.LANCZOS)
        fa = np.array(resized)
        fa[fa[:, :, 3] < 80, 3] = 0
        fa[fa[:, :, 3] >= 80, 3] = 255
        padded = Image.new("RGBA", (SIT_W, SIT_H), (0, 0, 0, 0))
        padded.paste(Image.fromarray(fa), ((SIT_W - prop_w) // 2, 0))
        frames.append(padded)

    COLS = 6
    rows = (len(frames) + COLS - 1) // COLS
    sheet = Image.new("RGBA", (COLS * SIT_W, rows * SIT_H), (0, 0, 0, 0))
    for i, f in enumerate(frames):
        r, c = divmod(i, COLS)
        sheet.paste(f, (c * SIT_W, r * SIT_H))

    return encode_sheet(sheet, colors=128), len(frames)


if __name__ == "__main__":
    print("Building main sprite sheet...")
    main_b64 = build_main_sheet()
    print(f"  Main: {len(main_b64)} chars")

    print("Building sit sprite sheet...")
    sit_b64, sit_count = build_sit_sheet()
    print(f"  Sit: {len(sit_b64)} chars ({sit_count} frames)")

    with open("src/sprites.js", "w") as f:
        f.write(f'export const MAIN_SPRITE = "{main_b64}";\n')
        f.write(f'export const SIT_SPRITE = "{sit_b64}";\n')

    print(f'Written src/sprites.js ({os.path.getsize("src/sprites.js") // 1024}KB)')
