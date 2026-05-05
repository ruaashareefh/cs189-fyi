'use client'

import { useState } from 'react'

export default function GlossaryPage() {
  const [query, setQuery] = useState('')

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest uppercase text-ink-3 mb-3">CS 189</p>
        <h1 className="serif text-4xl font-bold text-ink mb-4" style={{ letterSpacing: '-0.025em' }}>
          Glossary
        </h1>
        <p className="text-ink-2 text-base max-w-xl leading-relaxed mb-6">
          ML terms defined in two sentences or fewer, with links to topic pages.
        </p>

        <div className="relative max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search terms…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-md font-sans text-sm outline-none transition-colors"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(200,191,255,0.3)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>
      </div>

      <div
        className="rounded-lg border p-8 text-center"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
      >
        <p className="text-ink-3 text-sm">Terms will appear here as lectures are published.</p>
      </div>
    </div>
  )
}
