import math, random
from brand_marks import CHATGPT_KNOT

def fmt(v): 
    s = f"{v:.1f}"
    return s[:-2] if s.endswith(".0") else s

def cr(pts, closed=False):
    n = len(pts)
    def P(i):
        return pts[i % n] if closed else pts[max(0, min(n - 1, i))]
    d = f"M{fmt(pts[0][0])} {fmt(pts[0][1])}"
    for i in (range(n) if closed else range(n - 1)):
        p0, p1, p2, p3 = P(i - 1), P(i), P(i + 1), P(i + 2)
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f"C{fmt(c1[0])} {fmt(c1[1])} {fmt(c2[0])} {fmt(c2[1])} {fmt(p2[0])} {fmt(p2[1])}"
    return d + ("Z" if closed else "")

def poly(pts, close=True):
    d = "M" + "L".join(f"{fmt(x)} {fmt(y)}" for x, y in pts)
    return d + ("Z" if close else "")

def rot(pts, a):
    c, s = math.cos(a), math.sin(a)
    return [(x * c - y * s, x * s + y * c) for x, y in pts]

# ---- shape library (all centered on 0,0) ----
def ring(r, rnd):
    a0 = rnd.uniform(0, 6.28)
    pts = [(math.cos(a0 + i * 0.75) * r * (1 + rnd.uniform(-.08, .08)), math.sin(a0 + i * 0.75) * r * (1 + rnd.uniform(-.08, .08))) for i in range(9)]
    return cr(pts)

def cloud(r, rnd, bumps=5, sx=1.25):
    ph = rnd.uniform(0, 6.28); n = 30; pts = []
    for i in range(n + 1):
        t = i / n * 2 * math.pi * 1.03
        rad = r * (1 + 0.24 * math.sin(bumps * t + ph) + rnd.uniform(-.03, .03))
        pts.append((math.cos(t) * rad * sx, math.sin(t) * rad))
    return cr(pts)

def blob(r, rnd, sx=1.0, n=10):
    pts = []
    for i in range(n):
        t = i / n * 2 * math.pi
        rad = r * (1 + rnd.uniform(-.2, .2))
        pts.append((math.cos(t) * rad * sx, math.sin(t) * rad))
    return cr(pts, closed=True)

def heart(s, rnd, a=0.0):
    pts = []
    n = 22
    for i in range(n + 1):
        t = -0.35 + i / n * (2 * math.pi + 0.55)
        x = 16 * math.sin(t) ** 3
        y = -(13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t))
        pts.append((x * s / 17 + rnd.uniform(-.015, .015) * s, y * s / 17 + rnd.uniform(-.015, .015) * s))
    return cr(rot(pts, a))

def star5(r, rnd, a=0.0):
    pts = []
    for i in range(11):
        k = i % 10
        rad = r if k % 2 == 0 else r * .47
        ang = -math.pi / 2 + k * math.pi / 5
        j = rnd.uniform(.9, 1.08) if i < 10 else 1.12
        pts.append((math.cos(ang) * rad * j, math.sin(ang) * rad * j))
    return poly(rot(pts, a), close=False)

def sparkle(r, rnd, a=0.0):
    tips = [(0, -r), (r * .8, 0), (0, r), (-r * .8, 0)]
    c = r * .16
    ctrl = [(c, -c), (c, c), (-c, c), (-c, -c)]
    j = lambda p: (p[0] + rnd.uniform(-.04, .04) * r, p[1] + rnd.uniform(-.04, .04) * r)
    tips = [j(t) for t in tips]
    d = f"M{fmt(tips[0][0])} {fmt(tips[0][1])}"
    for i in range(4):
        n = tips[(i + 1) % 4]
        d += f"Q{fmt(ctrl[i][0])} {fmt(ctrl[i][1])} {fmt(n[0])} {fmt(n[1])}"
    return d + "Z"

def curl(length, loops, rr, arch, rnd):
    k = length / (loops * 2 * math.pi)
    rr = k * 1.95  # halkaların net oluşması için yarıçap, adımdan büyük olmalı
    pts = []
    n = int(loops * 16)
    for i in range(n + 1):
        u = i / n * loops * 2 * math.pi
        x = u * k - rr * math.sin(u)
        y = -rr * math.cos(u) * 0.9 - arch * math.sin(math.pi * (u * k) / length)
        pts.append((x + rnd.uniform(-.8, .8), y + rnd.uniform(-.8, .8)))
    mx = (pts[0][0] + pts[-1][0]) / 2
    return cr([(x - mx, y) for x, y in pts])

def spiral(rmax, turns, rnd, tail=26):
    pts = []
    n = int(turns * 12)
    for i in range(1, n + 1):
        t = i / n * turns * 2 * math.pi
        r = rmax * t / (turns * 2 * math.pi)
        pts.append((math.cos(t) * r, math.sin(t) * r))
    pts.append((pts[-1][0] + rmax * .2, pts[-1][1] + tail * .5))
    pts.append((pts[-1][0] + rmax * .3, pts[-1][1] + tail))
    return cr(pts)

def cursor(s, rnd, a=-0.3):
    pts = [(0, 0), (0, 1.0), (.27, .78), (.45, 1.16), (.6, 1.09), (.43, .72), (.78, .72)]
    pts = [((x - .3) * s + rnd.uniform(-.02, .02) * s, (y - .5) * s + rnd.uniform(-.02, .02) * s) for x, y in pts]
    return poly(rot(pts, a))

def pencil(s, rnd):
    L, W = s, s * .22
    body = [(-L / 2, -W / 2), (L * .22, -W / 2), (L / 2, 0), (L * .22, W / 2), (-L / 2, W / 2)]
    body = [(x + rnd.uniform(-.01, .01) * s, y + rnd.uniform(-.01, .01) * s) for x, y in body]
    d = poly(rot(body, -0.7))
    band = rot([(L * .22, -W / 2), (L * .22, W / 2)], -0.7)
    tip = rot([(L * .36, -W * .16), (L * .36, W * .16)], -0.7)
    return d, poly(band, close=False), poly(rot([(-L * .3, -W / 2), (-L * .3, W / 2)], -0.7), close=False)

def phone(w, h, rnd):
    r = w * .22
    x0, y0, x1, y1 = -w / 2, -h / 2, w / 2, h / 2
    d = (f"M{fmt(x0 + r)} {fmt(y0)}L{fmt(x1 - r)} {fmt(y0)}Q{fmt(x1)} {fmt(y0)} {fmt(x1)} {fmt(y0 + r)}"
         f"L{fmt(x1)} {fmt(y1 - r)}Q{fmt(x1)} {fmt(y1)} {fmt(x1 - r)} {fmt(y1)}L{fmt(x0 + r)} {fmt(y1)}"
         f"Q{fmt(x0)} {fmt(y1)} {fmt(x0)} {fmt(y1 - r)}L{fmt(x0)} {fmt(y0 + r)}Q{fmt(x0)} {fmt(y0)} {fmt(x0 + r)} {fmt(y0)}Z")
    notch = f"M{fmt(-w * .14)} {fmt(y0 + h * .07)}L{fmt(w * .14)} {fmt(y0 + h * .07)}"
    return d, notch

def bolt(s, rnd):
    pts = [(.1, -.55), (-.28, .08), (-.02, .08), (-.12, .55), (.3, -.1), (.04, -.1), (.1, -.55)]
    return poly([(x * s, y * s) for x, y in pts], close=False)

def leaf(s, rnd):
    pts = [(0, -s), (s * .55, -s * .3), (s * .5, s * .45), (0, s * .8), (-s * .5, s * .35), (-s * .45, -s * .35)]
    return cr(pts, closed=True)


def apple(s, rnd):
    """Isırık elmalı logo. (0,0) merkez, yükseklik yaklaşık s. Gövde + yaprak döner."""
    k = s / 30.0
    body = [(0, -8), (5, -11.5), (11, -9.5), (13.5, -4.5), (11, -1.2), (8.6, 2), (10.8, 5.2),
            (12.5, 8.5), (8.5, 13.5), (4, 14.5), (0, 12.6), (-4, 14.5), (-9, 13), (-13, 6.5),
            (-13.5, -2), (-9.5, -9), (-4.5, -10.5)]
    leaf = [(1, -11.5), (2.6, -16.5), (7.6, -19.5), (8.4, -14.6), (4.6, -11.2)]
    j = lambda pts: [(x * k + rnd.uniform(-.2, .2), y * k + rnd.uniform(-.2, .2)) for x, y in pts]
    return cr(j(body), closed=True), cr(j(leaf), closed=True)

# ---- JSX helpers ----
def sty(s, k=None, extra=""):
    parts = [f'"--s": "{int(s)}ms"']
    if k is not None: parts.append(f'"--k": {k}')
    return "{ " + ", ".join(parts) + extra + " } as CSSProperties"

def line(d, cls="line draw", extra=""):
    return f'<path className="{cls}" pathLength={{ 1 }} d="{d}"{extra} />'

def fill(d, color):
    return f'<path className="fill f-{color}" d="{d}" />'

counter = [0]
def doodle(x, y, parts, k=1.0, anim="bob", dur=7, delay=0.0, rotate=0, hit=40, base=560, step=70, rotamp=4, scale=1.0, cls=""):
    counter[0] += 1
    s = base + counter[0] * step
    inner = "\n          ".join(parts)
    return f'''      <g transform="translate({fmt(x)} {fmt(y)}) rotate({fmt(rotate)}) scale({scale})">
        <g className="par" style={{ {sty(0, k)} }}>
          <g className="pop{(" " + cls) if cls else ""}" style={{ {sty(s)} }}>
            <rect className="hit" x={{ {-hit} }} y={{ {-hit} }} width={{ {hit * 2} }} height={{ {hit * 2} }} />
            <g className="a-{anim}" style={{ {{ "--dur": "{dur}s", "--dl": "{-delay}s", "--rot": "{rotamp}deg" }} as CSSProperties }}>
          {inner}
            </g>
          </g>
        </g>
      </g>'''

# ---------------- uygulama ikonları (el çizimi) ----------------
def squircle(S, rnd, closed=False, n=4.6, wob=1.5):
    steps = 30
    a0 = rnd.uniform(0, 6.28)
    pts = []
    for i in range(steps + (0 if closed else 1)):
        t = a0 + i / steps * 2 * math.pi * (1.0 if closed else 1.045)
        c, sn = math.cos(t), math.sin(t)
        x = math.copysign(abs(c) ** (2 / n), c) * S / 2
        y = math.copysign(abs(sn) ** (2 / n), sn) * S / 2
        pts.append((x + rnd.uniform(-wob, wob), y + rnd.uniform(-wob, wob)))
    return cr(pts, closed=closed)


def igu_parts(rnd):
    """İstanbul Gelişim Üniversitesi mührünün el çizimi: çift halka, kanatlı anka kuşu, küreli kalkan."""
    parts = [fill(squircle(88, rnd, closed=True, n=2, wob=1.0), "iguwhite").replace('class="fill', 'class="fill tile')]
    parts.append(line(squircle(88, rnd, n=2, wob=1.0)))
    parts.append(f'<path className="line l-igu thin draw" pathLength={{ 1 }} d="{squircle(77, rnd, n=2, wob=0.9)}" />')
    # kuyruk yayı
    parts.append(f'<path className="line l-igu thin draw" pathLength={{ 1 }} d="M-24 -24C-13 -38 13 -38 24 -24" />')
    # kanat tüyleri (sol, sağ yansıması)
    for sx in (-1, 1):
        for d in ("M{a} -3C{b} -5 {c} -13 {d} -25", "M{a} 2C{b} 1 {c} -5 {d} -14", "M{a} 7C{b} 8 {c} 5 {d} -3"):
            vals = {"a": 9 * sx, "b": 19 * sx, "c": 29 * sx, "d": 33 * sx}
            if "-14" in d: vals.update(c=31 * sx, d=37 * sx)
            if "-3 " in d[-4:] or d.endswith("-3"): vals.update(c=31 * sx, d=36 * sx)
            parts.append(f'<path className="line feather l-igu draw" pathLength={{ 1 }} d="{d.format(**vals)}" />')
    # anka kuşu (gövde + baş)
    body = [(-3, -25), (2, -27), (5, -23), (10, -21.5), (4.5, -19.5), (4.5, -12), (8, -4), (-8, -4), (-4.5, -12), (-5, -19)]
    parts.append(fill(cr([(x + rnd.uniform(-.3, .3), y + rnd.uniform(-.3, .3)) for x, y in body], closed=True), "iguink"))
    parts.append(f'<path className="line l-igu thin draw" pathLength={{ 1 }} d="M-3 -25L-8 -29" />')
    # kalkan + küre
    sh = "M-10 -3L10 -3L10 9C10 15 5 19 0 21C-5 19 -10 15 -10 9Z"
    parts.append(fill(sh, "iguwhite"))
    parts.append(f'<path className="line l-igu draw" pathLength={{ 1 }} d="{sh}" />')
    parts.append(f'<path className="line l-igu thin draw" pathLength={{ 1 }} d="{squircle(12, rnd, n=2, wob=0.4)}" transform="translate(0 9)" />')
    parts.append(f'<path className="line l-igu thin draw" pathLength={{ 1 }} d="M-3 3.5C-6 9 -3 14 0 16M3 3.5C6 9 3 14 0 16M-6 9L6 9" />')
    return parts

LETTERS = {
    "ai": ["M-32 20L-19 -16L-6 20", "M-27 7L-11 7", "M12 -2L12 20", "M12 -14L12 -13.2"],
    "ps": ["M-30 20L-30 -16C-10 -20 -6 0 -30 3", "M26 -8C18 -14 6 -10 8 -3C10 4 24 4 25 12C26 20 12 22 4 14"],
    "pr": ["M-30 20L-30 -16C-10 -20 -6 0 -30 3", "M6 20L6 -6M6 4C8 -6 16 -8 24 -3"],
    "ae": ["M-32 20L-19 -16L-6 20", "M-27 7L-11 7", "M8 7H28C28 -8 8 -8 8 7C8 22 22 24 29 15"],
}

def app_icon(kind, rnd, S=88):
    parts = [fill(squircle(S, rnd, closed=True), kind).replace('class="fill', 'class="fill tile')]
    parts.append(line(squircle(S, rnd)))
    if kind == "gp":
        parts.append(f'<path className="fill knot-ink" transform="scale(0.82)" fillRule="evenodd" d="{CHATGPT_KNOT}" />')
    for d in LETTERS[kind]:
        parts.append(f'<path className="line letter l-{kind} draw" pathLength={{ 1 }} d="{d}" />')
    return parts

def _arc(cx, cy, r, a0, a1, n=8):
    return [(cx + r * math.cos(math.radians(a0 + (a1 - a0) * i / n)), cy + r * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]

def _edge(p, q, k=2):
    return [(p[0] + (q[0] - p[0]) * i / (k + 1), p[1] + (q[1] - p[1]) * i / (k + 1)) for i in range(1, k + 1)]

def figma_parts(rnd):
    shapes = []
    tl = [(0, -48)] + _edge((0, -48), (-16, -48)) + _arc(-16, -32, 16, -90, -270) + _edge((-16, -16), (0, -16)) + [(0, -16)] + _edge((0, -16), (0, -48))
    tr = [(0, -48)] + _edge((0, -48), (16, -48)) + _arc(16, -32, 16, -90, 90) + _edge((16, -16), (0, -16)) + [(0, -16)] + _edge((0, -16), (0, -48))
    ml = [(0, -16)] + _edge((0, -16), (-16, -16)) + _arc(-16, 0, 16, -90, -270) + _edge((-16, 16), (0, 16)) + [(0, 16)] + _edge((0, 16), (0, -16))
    mr = _arc(16, 0, 16, 0, 360, 14)
    bl = [(0, 16)] + _edge((0, 16), (-16, 16)) + _arc(-16, 32, 16, -90, -360, 12) + [(0, 32)] + _edge((0, 32), (0, 16))
    spec = [(tl, "fr"), (tr, "fs"), (ml, "fp"), (mr, "fb"), (bl, "fg")]
    parts = []
    jit = lambda pts, w: [(x + rnd.uniform(-w, w), y + rnd.uniform(-w, w)) for x, y in pts]
    for pts, col in spec:
        parts.append(fill(cr(jit(pts, 1.2), closed=True), col).replace('class="fill', 'class="fill tile'))
    for pts, col in spec:
        parts.append(line(cr(jit(pts, 0.9), closed=True)))
    return parts


# ---------------- yeni ikonlar: Claude, ChatGPT, Gemini ----------------
def claude_burst(rnd, R=29, n=12):
    out = []
    for i in range(n):
        a = i / n * 2 * math.pi + rnd.uniform(-.1, .1) - math.pi / 2
        r0 = 6.5 + rnd.uniform(-1, 1)
        r1 = R * (0.58 + 0.42 * abs(math.sin(i * 2.3 + 1.1))) + rnd.uniform(-2, 2)
        out.append(f"M{fmt(math.cos(a) * r0)} {fmt(math.sin(a) * r0)}L{fmt(math.cos(a) * r1)} {fmt(math.sin(a) * r1)}")
    return out

LETTERS["cl"] = claude_burst(random.Random(3))
LETTERS["gp"] = []

def gemini_parts(rnd, gid):
    # Keep the scene's seeded random sequence stable for all other drawings.
    sparkle(40, rnd)
    sparkle(40, rnd)
    outline = "M0.8 -40C5.5 -26 8.1 -17.7 16.8 -10.9C23.1 -5.5 30 -2.9 38.2 0.6C24.7 5.1 16.3 10.2 10.7 19.1C5.5 27 3.1 34.1 0.2 40C-3.9 26.4 -10.1 15.3 -19.6 9C-26 4.9 -32.4 2.4 -39.1 -0.7C-23.9 -6 -15.7 -11.9 -9.7 -20.9C-5.3 -27.5 -2.5 -34 0.8 -40Z"
    colors = [
        ("#f66d60", "M1 -40C6 -25 9 -17 17 -11L1 2L-10 -20C-5 -28 -2 -34 1 -40Z"),
        ("#6a9df5", "M17 -11C24 -5 31 -3 38 1C25 5 17 11 11 20L1 40L-2 1Z"),
        ("#6bbd83", "M1 1L11 20C6 28 3 35 0 40C-4 26 -10 15 -20 9L-24 -1Z"),
        ("#f5c84c", "M-10 -21L2 1L-20 9C-26 5 -32 2 -39 -1C-24 -6 -16 -12 -10 -21Z"),
    ]
    return [f'<g className="gemini-paint">' + ''.join(
        f'<path className="fill" fill="{color}" d="{d}" />' for color, d in colors
    ) + '</g>', line(outline)]

# ---------------- sahne süsleri: bitki, kalem aracı ----------------
def plant_parts(rnd):
    pot = '<path className="line draw" pathLength={ 1 } d="M-24 0L-19 -36L19 -36L24 0Z" />'
    rim = '<path className="line draw" pathLength={ 1 } d="M-27 -36L27 -36" />'
    leaves = []
    for ang, size, col in [(-38, 50, "green"), (0, 62, "green"), (36, 48, "orange")]:
        lf = leaf(size / 2.2, rnd)
        leaves.append(f'<g transform="translate(0 -36) rotate({ang})"><g className="a-sway" style={{ {{ "--dur": "{5 + abs(ang) / 20}s", "--dl": "-{abs(ang) / 30}s" }} as CSSProperties }}>'
                      f'<g transform="translate(0 {fmt(-size / 2.2 * 0.85)})">{fill(lf, col)}{line(lf)}</g></g></g>')
    return [pot, rim] + leaves

def pen_tool(rnd):
    return [
        line("M-44 18C-30 -34 24 -34 44 -6"),
        line("M-44 18L-52 -6M44 -6L56 20"),
        line(poly([(-49, 13), (-39, 13), (-39, 23), (-49, 23)])),
        line(poly([(39, -11), (49, -11), (49, -1), (39, -1)])),
        fill(cr([(-52 + math.cos(a) * 5, -6 + math.sin(a) * 5) for a in [i * 0.72 for i in range(10)]], closed=True), "orange"),
        fill(cr([(56 + math.cos(a) * 5, 20 + math.sin(a) * 5) for a in [i * 0.72 for i in range(10)]], closed=True), "orange"),
    ]

# ---------------- kompozisyon ----------------
# İkon kuşağı: soldan sağa okul, araçlar, yapay zekâ
BELT_ORDER = ["igu", "fg", "ps", "ai", "pr", "ae", "gp", "cl", "gm"]

def belt_y(x):
    return 112 + 20 * math.sin((x - 170) / 137.5 * 0.95 + 0.4)

def icon_parts(kind, rnd, gid):
    if kind == "fg":
        return figma_parts(rnd)
    if kind == "gm":
        return gemini_parts(rnd, gid)
    if kind == "igu":
        return igu_parts(rnd)
    return app_icon(kind, rnd)

def build_doodles(seed, mode):
    rnd = random.Random(seed)
    D = []
    add = D.append
    if mode == "wide":
        rots = [-7, 5, -4, 8, -6, 4, -8, 6, -3]
        anims = ["bob", "sway", "bob", "sway", "bob", "sway", "bob", "sway", "bob"]
        for i, kind in enumerate(BELT_ORDER):
            x = 170 + i * 137.5
            y = belt_y(x)
            sc = 0.82 if kind == "gm" else (0.8 if kind == "igu" else (0.78 if kind == "fg" else 0.74))
            extra = {"cls": "igu-badge"} if kind == "igu" else {}
            add(doodle(x, y, icon_parts(kind, rnd, "gemW"), 1.2 + (i % 3) * 0.3, anims[i], 6.5 + (i % 4) * 0.8, 0.3 * i, rots[i], 56, 700, 90, scale=sc, rotamp=5, **extra))
        # ---- yanlardaki küçük çizimler ----
        add(doodle(172, 322, pen_tool(rnd), 1.4, "bob", 8, 1.0, -10, 56, scale=0.95))
        add(doodle(330, 262, [fill(cursor(48, rnd), "blue"), line(cursor(48, rnd))], 1.6, "cursor", 5.5, 0.5, 0, 44))
        d0, d1, d2 = pencil(96, rnd)
        add(doodle(92, 452, [line(d0), line(d1), line(d2)], 0.8, "bob", 7, 1.6, 0, 52))
        add(doodle(372, 392, [fill(sparkle(26, rnd), "green"), line(sparkle(26, rnd))], 1.7, "twinkle", 3, 1.1))
        add(doodle(96, 235, [line(star5(24, rnd, 0.2))], 1.0, "spin", 16, 0, 0))
        add(doodle(1098, 292, [line(sparkle(26, rnd))], 1.6, "twinkle", 3.2, 0.7))
        add(doodle(1262, 250, [fill(star5(32, rnd, 0.1), "orange"), line(star5(30, rnd, 0.1))], 1.4, "spin", 20, 0, 0))
        add(doodle(1338, 410, [fill(heart(26, rnd, 0.1), "orange"), line(heart(26, rnd, 0.1))], 1.3, "bob", 6, 0.8))
        add(doodle(1186, 462, [line(bolt(50, rnd))], 1.2, "bob", 6.5, 0.4, 0, 36))
        add(doodle(1070, 392, [line(ring(8, rnd))], 1.0, "bob", 6, 3))
        add(doodle(1346, 300, [line(star5(24, rnd, -0.2))], 1.0, "twinkle", 4, 2))
        add(doodle(1000, 232, [f'<circle className="dot" r="4.5" />'], 0.8, "bob", 5, 1))
        add(doodle(394, 332, [f'<circle className="dot" r="4" />'], 0.8, "bob", 5.5, 0))
        # ---- kuşağın aralarındaki parıltılar ----
        add(doodle(306, 176, [line(sparkle(18, rnd))], 1.5, "twinkle", 3.4, 0.3))
        add(doodle(580, 64, [line(sparkle(16, rnd))], 1.4, "twinkle", 3, 1.2))
        add(doodle(850, 176, [line(sparkle(18, rnd))], 1.5, "twinkle", 3.6, 0.6))
        add(doodle(1126, 62, [line(sparkle(16, rnd))], 1.4, "twinkle", 3.2, 1.5))
    else:
        row1 = ["igu", "fg", "ps", "ai", "pr"]
        row2 = ["ae", "gp", "cl", "gm"]
        for i, kind in enumerate(row1):
            sc = 0.5 if kind == "igu" else (0.48 if kind == "gm" else 0.42)
            extra = {"cls": "igu-badge"} if kind == "igu" else {}
            add(doodle(46 + i * 74.5, 34 + (i % 2) * 8, icon_parts(kind, rnd, "gemN"), 1.2, "bob" if i % 2 == 0 else "sway", 7 + i * 0.6, 0.3 * i, [-6, 5, -4, 7, -5][i], 56, 500, 80, scale=sc, **extra))
        for i, kind in enumerate(row2):
            sc = 0.48 if kind == "gm" else 0.42
            add(doodle(84 + i * 74.5, 86 + (i % 2) * 8, icon_parts(kind, rnd, "gemN"), 1.2, "sway" if i % 2 == 0 else "bob", 7 + i * 0.5, 0.2 * i, [5, -6, 4, -5][i], 56, 500, 80, scale=sc))
        for (x, y, parts, k, anim, dur, dl, r) in [
            (24, 128, [line(star5(13, rnd, 0.2))], 0.9, "twinkle", 4, 2, 0),
            (362, 128, [fill(sparkle(14, rnd), "green"), line(sparkle(14, rnd))], 1.4, "twinkle", 3.2, 0.3, 0),
            (352, 176, [fill(star5(15, rnd, 0.1), "orange"), line(star5(14, rnd, 0.1))], 1.2, "spin", 18, 0, 0),
            (44, 188, [line(ring(6, rnd))], 1.0, "bob", 5, 1.2, 0),
        ]:
            add(doodle(x, y, parts, k, anim, dur, dl, r, 24, 500, 70))
    return "\n".join(D)
