import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getLectureContent, getAllLectureSlugs } from '@/lib/mdx'
import { getLectureBySlug, LECTURE_LIST } from '@/lib/lectures'
import { TopicChip } from '@/components/TopicChip'
import { StatusDot } from '@/components/StatusDot'
import { MDX_COMPONENTS } from '@/components/mdx/MDXComponents'


// ── Static params ────────────────────────────────────

export async function generateStaticParams() {
  return getAllLectureSlugs().map((slug) => ({ slug }))
}

// ── Metadata ─────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const meta = getLectureBySlug(params.slug)
  if (!meta) return {}
  return {
    title: `L${meta.lecture} — ${meta.title}`,
    description: meta.description,
  }
}

// ── Page ─────────────────────────────────────────────

export default async function LecturePage({ params }: { params: { slug: string } }) {
  const [mdx, meta] = await Promise.all([
    getLectureContent(params.slug, MDX_COMPONENTS),
    Promise.resolve(getLectureBySlug(params.slug)),
  ])

  if (!mdx || !meta) notFound()

  // Prev / next in list
  const idx = LECTURE_LIST.findIndex((l) => l.slug === params.slug)
  const prev = idx > 0 ? LECTURE_LIST[idx - 1] : null
  const next = idx < LECTURE_LIST.length - 1 ? LECTURE_LIST[idx + 1] : null

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-2xs text-ink-3 mb-8">
        <Link href="/" className="hover:text-ink-2 transition-colors">cs189.fyi</Link>
        <span>/</span>
        <Link href="/lectures" className="hover:text-ink-2 transition-colors">lectures</Link>
        <span>/</span>
        <span className="text-ink-2">L{String(meta.lecture).padStart(2, '0')}</span>
      </nav>

      {/* Header */}
      <header className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className="font-mono text-xs px-2 py-1 rounded"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-3)', border: '1px solid var(--border)' }}
          >
            Lecture {meta.lecture}
          </span>
          <StatusDot status={meta.status} showLabel />
          {meta.date && (
            <span className="font-mono text-2xs text-ink-3">
              {new Date(meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>

        <h1
          className="serif text-4xl font-bold text-ink mb-4"
          style={{ letterSpacing: '-0.025em', lineHeight: 1.2 }}
        >
          {meta.title}
        </h1>

        <p className="text-ink-2 text-base leading-relaxed mb-5 max-w-2xl">
          {meta.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {meta.tags.map((tag) => (
            <TopicChip key={tag.label} tag={tag} size="md" />
          ))}
          <span className="ml-1 font-mono text-2xs text-ink-3">
            ~ {meta.readTime} min read
          </span>
        </div>

        {/* Prereqs */}
        {meta.prereqs && meta.prereqs.length > 0 && (
          <div className="mt-5 flex items-center gap-2">
            <span className="font-mono text-2xs text-ink-3 tracking-wider uppercase">Prereqs:</span>
            {meta.prereqs.map((slug) => {
              const prereq = getLectureBySlug(slug)
              if (!prereq) return null
              return (
                <Link
                  key={slug}
                  href={`/lectures/${slug}`}
                  className="font-mono text-2xs px-2 py-0.5 rounded transition-colors"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--accent-dim)',
                    border: '1px solid var(--border)',
                  }}
                >
                  L{prereq.lecture} · {prereq.title}
                </Link>
              )
            })}
          </div>
        )}

      </header>

      {/* MDX content */}
      <article className="prose max-w-none">
        {mdx.content}
      </article>

      {/* Prev / Next */}
      <nav
        className="mt-16 pt-8 border-t grid grid-cols-2 gap-4"
        style={{ borderColor: 'var(--border)' }}
      >
        {prev && (prev.status === 'published' || prev.status === 'draft') ? (
          <Link
            href={`/lectures/${prev.slug}`}
            className="group p-4 rounded-lg border transition-all duration-150 hover:border-line-3"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
          >
            <p className="font-mono text-2xs text-ink-3 mb-1">← Previous</p>
            <p className="serif text-sm font-semibold text-ink-2 group-hover:text-ink transition-colors">
              L{prev.lecture} · {prev.title}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {next && (next.status === 'published' || next.status === 'draft') ? (
          <Link
            href={`/lectures/${next.slug}`}
            className="group p-4 rounded-lg border transition-all duration-150 hover:border-line-3 text-right"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
          >
            <p className="font-mono text-2xs text-ink-3 mb-1">Next →</p>
            <p className="serif text-sm font-semibold text-ink-2 group-hover:text-ink transition-colors">
              L{next.lecture} · {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </nav>

    </div>
  )
}
