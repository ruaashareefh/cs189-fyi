import type { Metadata } from 'next'
import { LECTURE_LIST, type Status } from '@/lib/lectures'
import { LectureCard } from '@/components/LectureCard'

export const metadata: Metadata = {
  title: 'Lectures',
  description: 'All CS 189 lectures — annotated, with derivations and examples.',
}

const STATUS_FILTERS: { value: Status | 'all'; label: string }[] = [
  { value: 'all',          label: 'All'         },
  { value: 'published',    label: 'Published'   },
  { value: 'draft',        label: 'In progress' },
  { value: 'coming-soon',  label: 'Coming soon' },
]

// Progress stats
const total = LECTURE_LIST.length
const published = LECTURE_LIST.filter((l) => l.status === 'published').length
const inProgress = LECTURE_LIST.filter((l) => l.status === 'draft').length
const pct = Math.round((published / total) * 100)

export default function LecturesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest uppercase text-ink-3 mb-3">
          CS 189 · Spring 2025
        </p>
        <h1 className="serif text-4xl font-bold text-ink mb-4" style={{ letterSpacing: '-0.025em' }}>
          Lectures
        </h1>
        <p className="text-ink-2 text-base max-w-xl leading-relaxed">
          Each page combines lecture slides, Shewchuk&apos;s notes, and extra intuition into
          one self-contained lesson. Click a lecture to open it.
        </p>

        {/* Progress bar */}
        <div className="mt-6 max-w-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-2xs text-ink-3">
              {published} of {total} lectures published
            </span>
            <span className="font-mono text-2xs text-ink-3">{pct}%</span>
          </div>
          <div
            className="h-1 w-full rounded-full overflow-hidden"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background: 'var(--green)',
                boxShadow: '0 0 8px var(--green)',
              }}
            />
          </div>
          {inProgress > 0 && (
            <p className="font-mono text-2xs text-ink-3 mt-1">
              {inProgress} in progress
            </p>
          )}
        </div>
      </div>

      {/* Filter chips — client-side filter would go here, for now showing all */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {STATUS_FILTERS.map(({ value, label }) => (
          <span
            key={value}
            className="font-mono text-2xs tracking-wider uppercase px-3 py-1 rounded-full border cursor-pointer transition-colors"
            style={{
              background: value === 'all' ? 'var(--accent-ghost)' : 'transparent',
              borderColor: value === 'all' ? 'rgba(200,191,255,0.25)' : 'var(--border)',
              color: value === 'all' ? 'var(--accent)' : 'var(--text-3)',
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Lecture list */}
      <div className="flex flex-col gap-2">
        {LECTURE_LIST.map((lecture) => (
          <LectureCard key={lecture.slug} lecture={lecture} />
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs text-ink-3 max-w-xl leading-relaxed">
          This is a student-made resource and is not affiliated with or endorsed by
          UC Berkeley. Content is based on publicly available course materials.
          Errors? Open an issue on GitHub.
        </p>
      </div>

    </div>
  )
}
