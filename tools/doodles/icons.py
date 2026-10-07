import os, random, math
from gen import *

R = random.Random(5)

def L(d, extra=""):
    return ("line", d, extra)

def F(d, color):
    return ("fill", d, color)

wave = []
for i in range(9):
    wave.append((i * 25 + R.uniform(-3, 3), 7 + math.sin(i * 1.3) * 3 + R.uniform(-1.4, 1.4)))

plane_d = [
    "M4 40L114 6L76 82L58 54Z",
    "M114 6L58 54",
    "M58 54L54 78L68 66",
]

DOODLES = {
    "sparkle": ("-30 -30 60 60", [L(sparkle(24, R))]),
    "star": ("-32 -32 64 64", [F(star5(26, R, 0.1), "orange"), L(star5(25, R, 0.1))]),
    "heart": ("-32 -32 64 64", [F(heart(32, R, 0.1), "orange"), L(heart(32, R, 0.1))]),
    "cursor": ("-34 -34 68 68", [F(cursor(46, R), "blue"), L(cursor(46, R))]),
    "phone": ("-30 -46 60 92", [L(phone(44, 76, R)[0]), L(phone(44, 76, R)[1]), L(heart(14, R, 0))]),
    "ring": ("-14 -14 28 28", [L(ring(10, R))]),
    "avatarring": ("-64 -64 128 128", [L(ring(58, R))]),
    "loop": ("-72 -30 144 60", [L(curl(124, 2, 10, 8, R))]),
    "arrow": ("0 0 80 64", [L("M6 10C34 -2 66 18 64 50"), L("M50 42L64 52L72 36")]),
    "underline": ("0 0 200 14", [L(cr(wave))]),
    "plane": ("0 0 270 112", [
        ("trail", "M6 92C40 102 72 72 54 58C38 46 20 64 40 80C66 100 110 62 150 42", ""),
        F("M154 42L264 8L226 84L208 56Z", "blue"),
        L("M154 42L264 8L226 84L208 56Z"),
        L("M264 8L208 56"),
        L("M208 56L204 80L218 68"),
    ]),
}

def jsx_path(kind, d, extra):
    if kind == "line":
        return f'<path className="line draw" pathLength={{ 1 }} d="{d}" />'
    if kind == "fill":
        return f'<path className="fill f-{extra}" d="{d}" />'
    return f'<path className="trail" d="{d}" />'

parts = []
for name, (vb, items) in DOODLES.items():
    body = "\n      ".join(jsx_path(*it) for it in items)
    parts.append(f'  {name}: {{\n    viewBox: "{vb}",\n    body: (\n      <>\n      {body}\n      </>\n    )\n  }}')

out = '''import type { CSSProperties } from "react"

// Küçük el çizimi süsler. Bu dosya tools/doodles/icons.py ile üretilir.
export type DoodleName = "sparkle" | "star" | "heart" | "cursor" | "phone" | "ring" | "avatarring" | "loop" | "arrow" | "underline" | "plane"

const shapes: Record<DoodleName, { viewBox: string, body: React.ReactNode }> = {
''' + ",\n".join(parts) + '''
}

type Props = {
  name: DoodleName
  className?: string
  // CSS genişliği, ör. "2.2rem" veya "120px"
  width?: string
  // Çizilme gecikmesi (ms)
  delay?: number
  // Havada hafifçe süzülsün mü
  float?: boolean
  // Yatayda esneyebilsin (alt çizgi gibi)
  stretch?: boolean
}

export function Doodle({ name, className = "", width, delay = 0, float = false, stretch = false }: Props) {
  const shape = shapes[name]
  const classes = `art dd dd-${ name }${ float ? " float" : "" }${ className ? ` ${ className }` : "" }`

  return (
    <svg
      className={ classes }
      viewBox={ shape.viewBox }
      preserveAspectRatio={ stretch ? "none" : undefined }
      aria-hidden="true"
      focusable="false"
      data-reveal
      style={ { "--w": width, "--s": `${ delay }ms` } as CSSProperties }
    >
      { shape.body }
    </svg>
  )
}
'''
dest = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "src", "components", "Doodles.tsx")
open(dest, "w", encoding="utf-8").write(out)
print("Doodles.tsx yazıldı:", len(out), "bayt")
