import Link from 'next/link'
import { TopicChip } from './TopicChip'
import { StatusDot } from './StatusDot'
import type { LectureMeta } from '@/lib/lectures'

interface Props {
  lecture: LectureMeta
}

export function LectureCard({ lecture }: Props) {
  const isAvailable = lecture.status === 'published' || lecture.status === 'draft'
  const href = isAvailable ? `/lectures/${lecture.slug}` : '#'

  return (
    <Link
      href={href}
      className={[
        'group relative flex gap-5 p-5 rounded-lg border transition-all duration-200',
        'border-line bg-bg-card',
        isAvailable
          ? 'hover:border-line-3 hover:bg-bg-elevated cursor-pointer'
          : 'opacity-50 cursor-not-allowed pointer-events-none',
      ].join(' ')}
      aria-disabled={!isAvailable}
    >
      {/* Lecture number */}
      <div className="flex-shrink-0 pt-0.5">
        <span className="font-mono text-xs text-ink-3 tabular-nums">
          {String(lecture.lecture).padStart(2, '0')}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="serif text-base font-semibold text-ink leading-snug group-hover:text-violet transition-colors">
            {lecture.title}
          </h3>
          <StatusDot status={lecture.status} />
        </div>

        <p className="text-sm text-ink-2 leading-relaxed mb-3 line-clamp-2">
          {lecture.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {lecture.tags.map((tag) => (
            <TopicChip key={tag.label} tag={tag} />
          ))}
          <span className="ml-auto font-mono text-2xs text-ink-3 flex-shrink-0">
            {lecture.readTime} min
          </span>
        </div>
      </div>

      {/* Right arrow (available lectures only) */}
      {isAvailable && (
        <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity text-ink-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      )}
    </Link>
  )
}
