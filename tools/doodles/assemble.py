import os, random, math
from gen import *

def L(d, extra=""):
    return f'<path className="line draw" pathLength={{ 1 }} d="{d}"{extra} />'

rnd = random.Random(7)
APPLE_BODY, APPLE_LEAF = apple(34, random.Random(3))

# ---------------- karakter: MacBook başında kahve içiyor ----------------
# Orijin = zemin üzerinde alt orta. Çizim sola bakar; sahnede aynalanıp sağa bakar.
FIGURE = f'''
    <g className="figure" style={{ {{ "--s": "300ms" }} as CSSProperties }}>
      <g className="a-nod-body">
        {L("M-104 -20C-106 -52-44 -64 8 -54C52 -46 96 -50 102 -24C104 -2 62 4 0 4C-52 4-102 4-104 -20Z")}
        {L("M-44 -52C-24 -30 20 -20 64 -24")}
        {L("M60 -54C80 -104 74 -150 36 -180")}
        {L("M-6 -168C-20 -134 -30 -96 -42 -60")}
      </g>
      <g className="a-type">
        {L("M38 -168C62 -142 62 -112 46 -92C20 -80-14 -82-46 -86")}
        {L("M16 -152C32 -130 30 -108 22 -98")}
        {L("M-50 -90C-58 -86-58 -78-48 -76")}
      </g>
      <g className="laptop">
        {L("M-168 -150L-62 -142L-58 -64L-164 -62Z")}
        {L("M-170 -62L-52 -62L-38 -48L-176 -46Z")}
        <g transform="translate(-112 -103) scale(-0.74 0.74) rotate(-4)">
          <path className="fill f-ink" d="{APPLE_BODY}" />
          <path className="fill f-ink" d="{APPLE_LEAF}" />
          <path className="line draw" pathLength={{ 1 }} d="{APPLE_BODY}" />
          <path className="line draw" pathLength={{ 1 }} d="{APPLE_LEAF}" />
        </g>
      </g>
      <g className="a-nod">
        <path className="fill f-ink" d="M-46 -230C-50 -284-8 -304 32 -294C68 -284 70 -246 62 -222L48 -232L36 -244L20 -236L6 -246L-8 -236L-22 -248L-36 -234Z" />
        {L("M-40 -226C-44 -282-6 -300 32 -292C66 -282 68 -246 60 -222")}
        {L("M-34 -224C-34 -204-22 -190-2 -186C20 -182 44 -190 52 -210C56 -218 58 -226 58 -230")}
        {L("M-22 -212Q-16 -207-10 -212")}
        {L("M8 -214Q14 -209 20 -214")}
        {L("M-6 -198Q0 -193 6 -198")}
        {L("M-4 -184L-2 -170M30 -186L34 -170")}
      </g>
      <g transform="translate(-10 -128)">
        <g className="a-sip">
          {L("M-2 -14C-20 -26 -36 -38 -48 -52")}
          {L("M8 6C-12 -4 -32 -18 -48 -36")}
          <path className="fill f-orange" d="M-68 -75L-66 -41C-66 -37 -62 -35 -58 -35L-44 -35C-40 -35 -38 -37 -38 -41L-36 -75Z" />
          {L("M-68 -75L-66 -41C-66 -37 -62 -35 -58 -35L-44 -35C-40 -35 -38 -37 -38 -41L-36 -75Z")}
          {L("M-69 -75L-35 -75")}
          {L("M-36 -67C-22 -69 -22 -49 -39 -52")}
          {L("M-62 -62C-56 -65 -52 -60 -46 -63")}
          <g className="steamwrap">
            <path className="steam" d="M-60 -84C-66 -94 -54 -100 -60 -112" />
            <path className="steam" d="M-50 -86C-56 -96 -44 -102 -50 -114" />
            <path className="steam" d="M-40 -84C-46 -94 -34 -100 -40 -112" />
          </g>
        </g>
        {L("M8 -22C-4 -14 -8 -2 -2 8")}
      </g>
    </g>'''

# ---------------- kedi: yüzü sağa bakar, sahnede aynalanıp sola bakar ----------------
CAT = f'''
    <g className="cat" style={{ {{ "--s": "700ms" }} as CSSProperties }}>
      <g className="a-breathe">
        {L("M0 0C-6 -34 24 -58 70 -56C108 -54 130 -40 136 -20")}
        {L("M40 -52L44 -40M62 -54L66 -42M84 -52L87 -40")}
      </g>
      <g className="a-tail">
        {L("M2 -10C-26 -12-36 -32-24 -44C-14 -52-2 -46-8 -36")}
      </g>
      <g className="a-cat-head">
        {L("M126 -22C124 -54 154 -66 176 -50C192 -36 186 -8 160 -4C142 -2 128 -8 126 -22Z")}
        {L("M132 -50L136 -74L154 -60")}
        {L("M168 -58L184 -72L188 -46")}
        {L("M144 -32Q150 -27 156 -32")}
        {L("M166 -32Q172 -27 178 -32")}
        {L("M158 -22Q161 -19 164 -22")}
        {L("M120 -26L136 -24M120 -18L136 -20")}
      </g>
      <g className="zzz" transform="translate(225 0) scale(-1 1) translate(-225 0)">
        {L("M196 -78L210 -78L196 -64L210 -64")}
        {L("M214 -100L230 -100L214 -84L230 -84")}
        {L("M236 -128L254 -128L236 -108L254 -108")}
      </g>
    </g>'''

def hill_y(x):
    return 700 - 20 * math.exp(-((x - 250) / 230) ** 2) - 12 * math.exp(-((x - 1100) / 210) ** 2)

def ground_curve(x0, x1, ypos, rnd, thick=5.5, steps=60):
    top, bot = [], []
    for i in range(steps + 1):
        t = i / steps
        x = x0 + (x1 - x0) * t
        w = thick * (0.35 + 0.65 * math.sin(math.pi * t) ** 0.5) * (1 + rnd.uniform(-.12, .12))
        yy = ypos(x) + math.sin(t * 9) * 1.0 + rnd.uniform(-.35, .35)
        top.append((x, yy - w / 2)); bot.append((x, yy + w / 2))
    pts = top + bot[::-1]
    return "M" + "L".join(f"{fmt(px)} {fmt(py)}" for px, py in pts) + "Z"

def scene_item(x, y, sx, sy, body):
    return f'<g transform="translate({fmt(x)} {fmt(y)}) scale({fmt(sx)} {fmt(sy)})">{body}\n      </g>'

def trail_wide():
    pts = [(x, belt_y(x)) for x in range(70, 1380, 110)]
    return f'<path className="trail belt-trail" d="{cr(pts)}" />'

def plant(x, y, sc):
    return scene_item(x, y, sc, sc, '<g className="plant" style={ { "--s": "1500ms" } as CSSProperties }>' + "".join(plant_parts(random.Random(8))) + "</g>")

def wide():
    counter[0] = 0
    r = random.Random(11)
    return f'''export function HeroArtWide() {{
  return (
    <svg className="art art-wide" viewBox="0 30 1440 700" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      {trail_wide()}
{build_doodles(21, "wide")}
      <path className="ground" d="{ground_curve(60, 1380, hill_y, r, 6)}" />
      {plant(1338, hill_y(1338) - 1, 1.0)}
      {scene_item(252, hill_y(252) - 2, -1, 1, FIGURE)}
      {scene_item(1232, hill_y(1232) - 3, -1.05, 1.05, CAT)}
    </svg>
  )
}}
'''

def narrow():
    counter[0] = 0
    r = random.Random(12)
    return f'''export function HeroArtNarrow() {{
  return (
    <svg className="art art-narrow" viewBox="0 0 390 330" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
{build_doodles(31, "narrow")}
      <path className="ground" d="{ground_curve(20, 370, lambda x: 302 - 5 * math.exp(-((x - 100) / 60) ** 2), r, 4)}" />
      {plant(352, 301, 0.5)}
      {scene_item(112, 298, -0.56, 0.56, FIGURE)}
      {scene_item(300, 299, -0.6, 0.6, CAT)}
    </svg>
  )
}}
'''

def about_scene():
    counter[0] = 0
    r = random.Random(15)
    return f'''export function AboutScene() {{
  return (
    <svg className="art dd art-scene" viewBox="0 0 440 150" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" data-reveal style={{ {{ "--w": "min(100%, 440px)", "--s": "300ms" }} as CSSProperties }}>
      <path className="ground" d="{ground_curve(14, 426, lambda x: 138 - 6 * math.exp(-((x - 150) / 70) ** 2), r, 4.5)}" />
      {plant(52, 137, 1.0)}
      {scene_item(330, 136, -0.9, 0.9, CAT)}
    </svg>
  )
}}
'''

out = '''import type { CSSProperties } from "react"

// El çizimi karalamalar. Bu dosya bir üreteç betiğiyle oluşturuldu (tools/doodles).
// Konum, renk ve hareket için globals.css içindeki .art kurallarına bak.

''' + wide() + "\n" + narrow() + "\n" + about_scene()
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "src", "components", "HeroArt.tsx")
open(OUT, "w", encoding="utf-8").write(out)
print("HeroArt.tsx yazıldı:", len(out), "bayt")
