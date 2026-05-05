'use client'

export default function CheatSheetPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest uppercase text-ink-3 mb-3">CS 189</p>
        <h1 className="serif text-4xl font-bold text-ink mb-4" style={{ letterSpacing: '-0.025em' }}>
          Cheat Sheet Builder
        </h1>
        <p className="text-ink-2 text-base max-w-xl leading-relaxed">
          Select the formulas you want. A printable layout generates below.
          Formulas populate as lectures are published.
        </p>
      </div>

      <div
        className="rounded-lg border p-8 text-center"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
      >
        <p className="text-ink-3 text-sm">No formulas yet — check back after lectures are added.</p>
      </div>
    </div>
  )
}
