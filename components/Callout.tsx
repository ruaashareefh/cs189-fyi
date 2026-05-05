type Variant = 'key' | 'intuition' | 'warning' | 'definition' | 'note'

const VARIANTS: Record<Variant, { bg: string; border: string; accent: string; icon: string; label: string }> = {
  key:        { bg: 'rgba(85,72,176,0.05)',   border: 'rgba(85,72,176,0.18)',   accent: '#5548b0', icon: '◆', label: 'Key Idea'   },
  intuition:  { bg: 'rgba(34,114,170,0.05)',  border: 'rgba(34,114,170,0.18)',  accent: '#2272aa', icon: '◈', label: 'Intuition'  },
  warning:    { bg: 'rgba(192,57,43,0.05)',   border: 'rgba(192,57,43,0.18)',   accent: '#c0392b', icon: '⚠', label: 'Watch Out'  },
  definition: { bg: 'rgba(30,138,101,0.05)',  border: 'rgba(30,138,101,0.18)',  accent: '#1e8a65', icon: '≝', label: 'Definition' },
  note:       { bg: 'rgba(176,128,32,0.05)',  border: 'rgba(176,128,32,0.18)',  accent: '#b08020', icon: '✦', label: 'Note'       },
}

interface Props {
  variant?: Variant
  title?: string
  children: React.ReactNode
}

export function Callout({ variant = 'key', title, children }: Props) {
  const v = VARIANTS[variant]

  return (
    <div
      className="my-6 rounded-lg px-5 py-4"
      style={{
        background: v.bg,
        border: `1px solid ${v.border}`,
        borderLeft: `3px solid ${v.accent}`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm" style={{ color: v.accent }}>{v.icon}</span>
        <span className="font-mono text-2xs tracking-widest uppercase font-semibold" style={{ color: v.accent }}>
          {title ?? v.label}
        </span>
      </div>
      <div className="prose text-sm [&>p]:text-ink-2 [&>p]:mb-0">{children}</div>
    </div>
  )
}
