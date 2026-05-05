'use client'

import { useEffect, useRef } from 'react'

type PatternFn = (x: number, y: number) => number

const patterns: PatternFn[] = [
  // Class 0: donut - ring of red, blue center
  (x, y) => {
    const r = Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2)
    if (r < 0.15) return -0.8 - Math.random() * 0.2
    if (r < 0.38) return 0.7 + Math.random() * 0.3
    if (r < 0.5)  return 0.2 + Math.random() * 0.3
    return -0.3 - Math.random() * 0.2
  },
  // Class 1: vertical stripe
  (x) => {
    const d = Math.abs(x - 0.5)
    return d < 0.1 ? 0.9 - Math.random() * 0.2 : -0.5 + d * 0.8 + Math.random() * 0.1
  },
  // Class 2: S/Z shape
  (x, y) => {
    const top = y < 0.35 && x > 0.3
    const mid = y > 0.35 && y < 0.65 && Math.abs(x - 0.5) < 0.4
    const bot = y > 0.65 && x < 0.7
    return (top || mid || bot) && Math.random() > 0.3
      ? 0.6 + Math.random() * 0.4
      : -0.4 - Math.random() * 0.3
  },
  // Class 3: C-shape, two bumps on right
  (x, y) => {
    const onTop = y < 0.28 && x > 0.3
    const onMid = Math.abs(y - 0.5) < 0.1 && x > 0.35
    const onBot = y > 0.72 && x > 0.3
    return onTop || onMid || onBot ? 0.7 + Math.random() * 0.3 : -0.4 - Math.random() * 0.2
  },
  // Class 4: angular L with horizontal bar
  (x, y) => {
    const vert = x > 0.6 && x < 0.75
    const horiz = Math.abs(y - 0.5) < 0.1 && x < 0.8
    const leftleg = x < 0.45 && y < 0.55
    return vert || horiz || leftleg ? 0.65 + Math.random() * 0.35 : -0.45 - Math.random() * 0.25
  },
  // Class 5: reverse C on top, C on bottom
  (x, y) => {
    const topPart = y < 0.45 && (x < 0.6 || y < 0.12)
    const midBar = Math.abs(y - 0.45) < 0.1 && x > 0.2
    const botPart = y > 0.45 && (x > 0.4 || y > 0.88)
    return topPart || midBar || botPart ? 0.55 + Math.random() * 0.4 : -0.4 - Math.random() * 0.3
  },
  // Class 6: ring with top-left tail
  (x, y) => {
    const r = Math.sqrt((x - 0.5) ** 2 + (y - 0.62) ** 2)
    const inRing = r > 0.18 && r < 0.36
    const tailTop = y < 0.35 && x < 0.45
    return inRing || tailTop ? 0.65 + Math.random() * 0.3 : -0.4 - Math.random() * 0.2
  },
  // Class 7: diagonal stroke
  (x, y) => {
    const topbar = y < 0.2
    const diag = Math.abs((y - (1 - x)) * 0.7) < 0.12
    return topbar || diag ? 0.7 + Math.random() * 0.3 : -0.4 - Math.random() * 0.25
  },
  // Class 8: two rings stacked
  (x, y) => {
    const rt = Math.sqrt((x - 0.5) ** 2 + (y - 0.28) ** 2)
    const rb = Math.sqrt((x - 0.5) ** 2 + (y - 0.72) ** 2)
    return (rt > 0.15 && rt < 0.28) || (rb > 0.15 && rb < 0.28)
      ? 0.7 + Math.random() * 0.3
      : -0.35 - Math.random() * 0.3
  },
  // Class 9: ring with tail down-right
  (x, y) => {
    const r = Math.sqrt((x - 0.5) ** 2 + (y - 0.38) ** 2)
    const tail = y > 0.55 && x > 0.55
    return (r > 0.17 && r < 0.34) || tail ? 0.65 + Math.random() * 0.3 : -0.4 - Math.random() * 0.25
  },
]

export function WeightGrid() {
  const refs = useRef<(HTMLCanvasElement | null)[]>(Array(10).fill(null))

  useEffect(() => {
    for (let c = 0; c < 10; c++) {
      const canvas = refs.current[c]
      if (!canvas) continue
      const ctx = canvas.getContext('2d')
      if (!ctx) continue
      const imgData = ctx.createImageData(28, 28)
      const fn = patterns[c]
      for (let py = 0; py < 28; py++) {
        for (let px = 0; px < 28; px++) {
          const v = Math.max(-1, Math.min(1, fn(px / 27, py / 27)))
          let r, g, b
          if (v >= 0) {
            r = Math.round(255 - v * 35)
            g = Math.round(255 - v * 195)
            b = Math.round(255 - v * 195)
          } else {
            const nv = -v
            r = Math.round(255 - nv * 195)
            g = Math.round(255 - nv * 155)
            b = Math.round(255 - nv * 55)
          }
          const i = (py * 28 + px) * 4
          imgData.data[i] = r
          imgData.data[i + 1] = g
          imgData.data[i + 2] = b
          imgData.data[i + 3] = 255
        }
      }
      ctx.putImageData(imgData, 0, 0)
    }
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, margin: '24px 0' }}>
      {Array.from({ length: 10 }, (_, c) => (
        <div
          key={c}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          <canvas
            ref={(el) => { refs.current[c] = el }}
            width={28}
            height={28}
            style={{ width: '100%', aspectRatio: '1', display: 'block', imageRendering: 'pixelated' }}
          />
          <div
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--text-3)',
              padding: '5px 0 7px',
            }}
          >
            Class {c}
          </div>
        </div>
      ))}
    </div>
  )
}
