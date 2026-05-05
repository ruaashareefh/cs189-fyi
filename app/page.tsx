import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'cs189.fyi — Intro to Machine Learning',
}

const DependencyGraph = dynamic(
  () => import('@/components/DependencyGraph'),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-full flex items-center justify-center rounded-lg border"
        style={{ background: '#f0ede6', borderColor: '#d4d0c8' }}
      >
        <span className="font-mono text-xs" style={{ color: '#b0aec0' }}>
          loading graph…
        </span>
      </div>
    ),
  }
)

export default function HomePage() {
  return (
    <div
      className="flex flex-col"
      style={{ height: 'calc(100vh - 56px)' }}
    >
      {/* ── Title strip ──────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
        <div>
          <h1
            className="serif font-bold text-ink leading-tight"
            style={{ fontSize: '1.35rem', letterSpacing: '-0.02em' }}
          >
            CS 189 — Intro to Machine Learning
          </h1>
          <p className="text-ink-3 text-sm mt-0.5 max-w-xl">
            everything you need for CS 189, in one place.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 flex-shrink-0 ml-8">
          <Link
            href="/lectures"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all duration-150"
            style={{
              background: 'var(--accent-ghost)',
              border: '1px solid var(--accent-glow)',
              color: 'var(--accent)',
            }}
          >
            Lectures
          </Link>
          <Link
            href="/topics"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all duration-150"
            style={{ color: 'var(--text-2)', border: '1px solid var(--border)' }}
          >
            Topics
          </Link>
        </div>
      </div>

      {/* ── Graph — fills remaining height ───────────── */}
      <div className="flex-1 px-6 pb-6 min-h-0">
        <div className="w-full h-full">
          <DependencyGraph />
        </div>
      </div>
    </div>
  )
}
