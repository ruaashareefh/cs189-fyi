'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Variant = 'derivation' | 'proof' | 'example' | 'detail'

const VARIANT_STYLES: Record<Variant, { border: string; accent: string; label: string; icon: string }> = {
  derivation: { border: 'rgba(85,72,176,0.2)',   accent: '#5548b0', label: 'Derivation', icon: '∂' },
  proof:      { border: 'rgba(176,128,32,0.2)',   accent: '#b08020', label: 'Proof',      icon: '∎' },
  example:    { border: 'rgba(30,138,101,0.2)',   accent: '#1e8a65', label: 'Example',    icon: '→' },
  detail:     { border: 'rgba(34,114,170,0.2)',   accent: '#2272aa', label: 'Detail',     icon: '◦' },
}

interface Props {
  title: string
  variant?: Variant
  defaultOpen?: boolean
  children: React.ReactNode
}

export function CollapsibleStep({ title, variant = 'derivation', defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const s = VARIANT_STYLES[variant]

  return (
    <div
      className="my-5 rounded-lg overflow-hidden"
      style={{ border: `1px solid ${s.border}`, background: 'var(--bg-card)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left group transition-colors duration-150"
        style={{ background: 'var(--bg-elevated)' }}
      >
        <span className="font-mono text-sm font-semibold" style={{ color: s.accent }}>
          {s.icon}
        </span>
        <span className="font-mono text-2xs tracking-widest uppercase font-semibold mr-2" style={{ color: s.accent }}>
          {s.label}
        </span>
        <span className="text-sm text-ink-2 group-hover:text-ink transition-colors flex-1">
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-ink-3 flex-shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-5 py-4 prose text-sm border-t"
              style={{ borderColor: s.border }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
