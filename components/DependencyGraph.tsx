'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  nodes,
  edges,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type GraphNode,
  type Category,
} from '@/lib/graph-data'

// Logical drawing space — node positions are expressed in these units
const CANVAS_W = 1000
const CANVAS_H = 820
const ASPECT   = CANVAS_W / CANVAS_H
const NODE_RADIUS = 44

// Site palette (light theme)
const BG        = '#f0ede6'
const EDGE_DIM  = '#c0bcb4'
const LABEL_COL = '#1a1824'

function nx(n: GraphNode) { return n.x * CANVAS_W }
function ny(n: GraphNode) { return n.y * CANVAS_H }
function getNode(id: string) { return nodes.find(n => n.id === id) }

function getLinked(id: string): Set<string> {
  const linked = new Set<string>()
  edges.forEach(({ from, to }) => {
    if (from === id) linked.add(to)
    if (to === id) linked.add(from)
  })
  return linked
}

function hexAlpha(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

interface TooltipState {
  visible: boolean
  x: number
  y: number
  node: GraphNode | null
}

export default function DependencyGraph() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const hoveredRef = useRef<string | null>(null)
  const router     = useRouter()

  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, node: null,
  })
  const [infoText, setInfoText] = useState('20 topics across 6 units — hover to explore')

  // ── Draw ──────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Sync buffer to CSS display size × devicePixelRatio for crisp output
    const dpr   = window.devicePixelRatio || 1
    const dispW = canvas.clientWidth
    const dispH = canvas.clientHeight
    if (!dispW || !dispH) return

    const bufW = Math.round(dispW * dpr)
    const bufH = Math.round(dispH * dpr)
    if (canvas.width !== bufW || canvas.height !== bufH) {
      canvas.width  = bufW
      canvas.height = bufH
    }

    // Map logical CANVAS_W × CANVAS_H → buffer pixels
    const scale = bufW / CANVAS_W
    ctx.setTransform(scale, 0, 0, scale, 0, 0)

    // Background
    ctx.fillStyle = BG
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    const hovered = hoveredRef.current
    const linked  = hovered ? getLinked(hovered) : new Set<string>()

    // ── Edges ─────────────────────────────────────────
    edges.forEach(({ from, to }) => {
      const a = getNode(from)
      const b = getNode(to)
      if (!a || !b) return
      const isLinked = hovered ? (from === hovered || to === hovered) : false
      const dim      = hovered ? !isLinked : false

      const x1 = nx(a), y1 = ny(a), x2 = nx(b), y2 = ny(b)
      const dx = x2 - x1, dy = y2 - y1
      const len = Math.sqrt(dx * dx + dy * dy)
      if (len === 0) return
      const r  = NODE_RADIUS + 2
      const sx = x1 + dx / len * r, sy = y1 + dy / len * r
      const ex = x2 - dx / len * r, ey = y2 - dy / len * r

      ctx.save()
      ctx.globalAlpha = dim ? 0.05 : isLinked ? 0.75 : 0.22
      ctx.beginPath()
      ctx.moveTo(sx, sy)
      ctx.lineTo(ex, ey)
      ctx.strokeStyle = isLinked ? CATEGORY_COLORS[a.cat] : EDGE_DIM
      ctx.lineWidth   = isLinked ? 1.75 : 0.9
      if (!isLinked) ctx.setLineDash([4, 5])
      ctx.stroke()
      ctx.setLineDash([])

      if (isLinked) {
        const angle = Math.atan2(ey - sy, ex - sx)
        const al = 8
        ctx.beginPath()
        ctx.moveTo(ex, ey)
        ctx.lineTo(ex - al * Math.cos(angle - 0.42), ey - al * Math.sin(angle - 0.42))
        ctx.moveTo(ex, ey)
        ctx.lineTo(ex - al * Math.cos(angle + 0.42), ey - al * Math.sin(angle + 0.42))
        ctx.strokeStyle = CATEGORY_COLORS[a.cat]
        ctx.lineWidth   = 1.75
        ctx.stroke()
      }
      ctx.restore()
    })

    // ── Nodes ─────────────────────────────────────────
    nodes.forEach(n => {
      const isHov     = n.id === hovered
      const isLinked  = linked.has(n.id)
      const dim       = hovered ? !isHov && !isLinked : false
      const highlight = isHov || isLinked

      const x   = nx(n), y = ny(n)
      const col = CATEGORY_COLORS[n.cat]

      ctx.save()
      ctx.globalAlpha = dim ? 0.13 : 1

      // Glow ring on hover
      if (isHov) {
        ctx.beginPath()
        ctx.arc(x, y, NODE_RADIUS + 8, 0, Math.PI * 2)
        ctx.strokeStyle = hexAlpha(col, 0.18)
        ctx.lineWidth   = 6
        ctx.stroke()
      }
      if (isLinked && !isHov) {
        ctx.beginPath()
        ctx.arc(x, y, NODE_RADIUS + 4, 0, Math.PI * 2)
        ctx.strokeStyle = hexAlpha(col, 0.12)
        ctx.lineWidth   = 3
        ctx.stroke()
      }

      // Fill — radial gradient for subtle depth
      ctx.beginPath()
      ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2)
      const g = ctx.createRadialGradient(x - 6, y - 8, 4, x, y, NODE_RADIUS)
      g.addColorStop(0, hexAlpha(col, highlight ? 0.18 : 0.08))
      g.addColorStop(1, hexAlpha(col, highlight ? 0.08 : 0.03))
      ctx.fillStyle = g
      ctx.fill()

      // Border
      ctx.beginPath()
      ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2)
      ctx.strokeStyle = highlight ? col : hexAlpha(col, 0.45)
      ctx.lineWidth   = highlight ? 1.75 : 0.9
      ctx.stroke()

      // Label
      const lines = n.label.split('\n')
      const fsize = highlight ? 11.5 : 10.5
      ctx.font         = `600 ${fsize}px 'IBM Plex Mono', 'Courier New', monospace`
      ctx.fillStyle    = highlight ? col : LABEL_COL
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      const lh     = fsize * 1.4
      const totalH = lines.length * lh
      lines.forEach((line, i) => {
        ctx.fillText(line, x, y - totalH / 2 + i * lh + lh / 2)
      })
      ctx.restore()
    })
  }, [])

  // ── Resize observer — fit canvas to container ─────────────────────
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const fit = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const { width, height } = wrap.getBoundingClientRect()
      if (!width || !height) return

      // Largest rect with ASPECT ratio that fits in available space
      let w = width
      let h = width / ASPECT
      if (h > height) {
        h = height
        w = height * ASPECT
      }
      canvas.style.width  = `${Math.floor(w)}px`
      canvas.style.height = `${Math.floor(h)}px`
      draw()
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [draw])

  // ── Hit test ──────────────────────────────────────────────────────
  const getHitNode = useCallback((clientX: number, clientY: number): GraphNode | null => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect   = canvas.getBoundingClientRect()
    const scaleX = CANVAS_W / rect.width
    const scaleY = CANVAS_H / rect.height
    const cx = (clientX - rect.left) * scaleX
    const cy = (clientY - rect.top)  * scaleY
    for (const n of nodes) {
      const dx = cx - nx(n), dy = cy - ny(n)
      if (Math.sqrt(dx * dx + dy * dy) < NODE_RADIUS + 6) return n
    }
    return null
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const hit    = getHitNode(e.clientX, e.clientY)
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()

    if (hit) {
      hoveredRef.current = hit.id
      canvas.style.cursor = 'pointer'
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      setTooltip({
        visible: true,
        x: Math.min(px + 16, rect.width - 250),
        y: Math.max(py - 10, 8),
        node: hit,
      })
      const linked = getLinked(hit.id)
      setInfoText(`${hit.label.replace('\n', ' ')} connects to ${linked.size} topic${linked.size !== 1 ? 's' : ''}`)
    } else {
      hoveredRef.current = null
      canvas.style.cursor = 'default'
      setTooltip(prev => ({ ...prev, visible: false }))
      setInfoText('20 topics across 6 units — hover to explore')
    }
    draw()
  }, [getHitNode, draw])

  const handleMouseLeave = useCallback(() => {
    hoveredRef.current = null
    setTooltip(prev => ({ ...prev, visible: false }))
    setInfoText('20 topics across 6 units — hover to explore')
    draw()
  }, [draw])

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const hit = getHitNode(e.clientX, e.clientY)
    if (hit) router.push(`/topics/${hit.id}`)
  }, [getHitNode, router])

  return (
    <div className="graph-container">
      {/* Header */}
      <div className="graph-header">
        <span className="graph-title">CS 189 · topic dependency graph</span>
        <div className="graph-legend">
          {(Object.entries(CATEGORY_COLORS) as [Category, string][]).map(([cat, color]) => (
            <div key={cat} className="legend-item">
              <div className="legend-dot" style={{ background: color }} />
              <span>{CATEGORY_LABELS[cat]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas wrap — fills remaining height, centers the canvas */}
      <div ref={wrapRef} className="canvas-wrap">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        />
        {tooltip.visible && tooltip.node && (
          <div
            className="graph-tooltip"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <div
              className="tt-cat-bar"
              style={{ background: CATEGORY_COLORS[tooltip.node.cat] }}
            />
            <div className="tt-inner">
              <div className="tt-lec">{tooltip.node.lec.toUpperCase()}</div>
              <div className="tt-title">{tooltip.node.label.replace('\n', ' ')}</div>
              <div className="tt-desc">{tooltip.node.desc}</div>
            </div>
          </div>
        )}
      </div>

      {/* Info bar */}
      <div className="graph-info">
        <span dangerouslySetInnerHTML={{ __html: infoText }} />
      </div>

      <style jsx>{`
        .graph-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #f7f6f2;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #d4d0c8;
          box-shadow: 0 1px 4px rgba(26,24,36,0.06), 0 0 0 0.5px rgba(26,24,36,0.04);
        }
        .graph-header {
          padding: 14px 20px 11px;
          border-bottom: 1px solid #dedad4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          flex-shrink: 0;
          background: #f0ede6;
        }
        .graph-title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #7b6fbe;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .graph-legend {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: #8a889a;
          letter-spacing: 0.04em;
        }
        .legend-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.85;
        }
        .canvas-wrap {
          flex: 1;
          min-height: 0;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0ede6;
          overflow: hidden;
          padding: 8px;
        }
        canvas {
          display: block;
          border-radius: 6px;
        }
        .graph-tooltip {
          position: absolute;
          display: flex;
          background: #ffffff;
          border: 1px solid #d4d0c8;
          border-radius: 8px;
          overflow: hidden;
          pointer-events: none;
          max-width: 230px;
          z-index: 10;
          box-shadow: 0 4px 16px rgba(26,24,36,0.10), 0 1px 4px rgba(26,24,36,0.06);
        }
        .tt-cat-bar {
          width: 3px;
          flex-shrink: 0;
        }
        .tt-inner {
          padding: 10px 13px;
        }
        .tt-lec {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9.5px;
          color: #8a889a;
          letter-spacing: 0.1em;
          margin-bottom: 3px;
        }
        .tt-title {
          font-size: 13px;
          color: #1a1824;
          font-weight: 600;
          margin-bottom: 4px;
          line-height: 1.3;
        }
        .tt-desc {
          font-size: 11px;
          color: #4a4860;
          line-height: 1.55;
        }
        .graph-info {
          padding: 9px 20px;
          border-top: 1px solid #dedad4;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          color: #b0aec0;
          letter-spacing: 0.04em;
          flex-shrink: 0;
          background: #f7f6f2;
        }
      `}</style>
    </div>
  )
}
