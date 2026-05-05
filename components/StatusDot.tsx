import { STATUS_META, type Status } from '@/lib/lectures'

interface Props {
  status: Status
  showLabel?: boolean
}

export function StatusDot({ status, showLabel = false }: Props) {
  const meta = STATUS_META[status]

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block rounded-full flex-shrink-0"
        style={{
          width: 7,
          height: 7,
          background: meta.color,
          boxShadow: status === 'published' ? `0 0 6px ${meta.color}` : 'none',
        }}
      />
      {showLabel && (
        <span
          className="font-mono text-2xs tracking-wider uppercase"
          style={{ color: meta.color }}
        >
          {meta.label}
        </span>
      )}
    </span>
  )
}
