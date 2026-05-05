import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Exam Prep' }

const EXAMS = ['Midterm 1', 'Midterm 2', 'Final']

export default function ExamPrepPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest uppercase text-ink-3 mb-3">CS 189</p>
        <h1 className="serif text-4xl font-bold text-ink mb-4" style={{ letterSpacing: '-0.025em' }}>
          Exam Prep
        </h1>
        <p className="text-ink-2 text-base max-w-xl leading-relaxed">
          Topic coverage lists, priority ratings, and past problems grouped by concept.
          Content populates as lectures are published.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EXAMS.map((label) => (
          <div
            key={label}
            className="rounded-lg border p-5 flex flex-col gap-3"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
          >
            <h2 className="serif text-lg font-semibold text-ink">{label}</h2>
            <p className="text-sm text-ink-3">Coming soon.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
