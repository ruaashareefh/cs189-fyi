interface Props {
  label?: string
  children: React.ReactNode
  numbered?: boolean
  number?: number
}

export function MathBlock({ label, children, numbered, number }: Props) {
  return (
    <div className="math-block relative my-6">
      {label && (
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-2xs tracking-widest uppercase text-ink-3">
            {label}
          </span>
          {numbered && number !== undefined && (
            <span className="font-mono text-2xs text-ink-3">({number})</span>
          )}
        </div>
      )}
      <div className="katex-container">{children}</div>
    </div>
  )
}
