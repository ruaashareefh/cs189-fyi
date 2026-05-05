'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/',            label: 'Graph'       },
  { href: '/lectures',    label: 'Lectures'    },
  { href: '/topics',      label: 'Topics'      },
  { href: '/exam-prep',   label: 'Exam Prep'   },
  { href: '/cheat-sheet', label: 'Cheat Sheet' },
  { href: '/glossary',    label: 'Glossary'    },
]

export function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className="font-mono text-sm font-bold tracking-tight"
            style={{ color: 'var(--accent)' }}
          >
            cs189<span style={{ color: 'var(--text-3)' }}>.fyi</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(({ href, label }) => {
            const active = href === '/' ? path === '/' : path.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded font-mono text-xs tracking-wider uppercase transition-all duration-150"
                style={{
                  color: active ? 'var(--accent)' : 'var(--text-3)',
                  background: active ? 'var(--accent-ghost)' : 'transparent',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-2)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-3)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right: external link + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://cs189.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 font-mono text-xs text-ink-3 hover:text-ink-2 transition-colors"
          >
            Official site
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>

          {/* Mobile burger */}
          <button
            className="md:hidden p-1.5 rounded text-ink-3 hover:text-ink-2 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="md:hidden border-t px-6 py-4 flex flex-col gap-1"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
        >
          {LINKS.map(({ href, label }) => {
            const active = href === '/' ? path === '/' : path.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded font-mono text-xs tracking-wider uppercase"
                style={{
                  color: active ? 'var(--accent)' : 'var(--text-2)',
                  background: active ? 'var(--accent-ghost)' : 'transparent',
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
