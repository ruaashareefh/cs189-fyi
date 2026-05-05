import { TAG_COLORS, type TopicTag } from '@/lib/lectures'

interface Props {
  tag: TopicTag
  size?: 'sm' | 'md'
}

export function TopicChip({ tag, size = 'sm' }: Props) {
  const colors = TAG_COLORS[tag.type]

  return (
    <span
      style={{
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
      className={
        size === 'sm'
          ? 'inline-flex items-center font-mono text-2xs tracking-wider uppercase px-2 py-0.5 rounded'
          : 'inline-flex items-center font-mono text-xs tracking-wider uppercase px-2.5 py-1 rounded-md'
      }
    >
      {tag.label}
    </span>
  )
}
