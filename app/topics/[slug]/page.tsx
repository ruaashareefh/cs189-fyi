import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getTopicContent, getAllTopicSlugs } from '@/lib/mdx'
import { TopicChip } from '@/components/TopicChip'
import { MDX_COMPONENTS } from '@/components/mdx/MDXComponents'

export async function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getTopicContent(params.slug, MDX_COMPONENTS)
  if (!data) return {}
  return {
    title: data.frontmatter.title as string,
    description: data.frontmatter.description as string,
  }
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const data = await getTopicContent(params.slug, MDX_COMPONENTS)
  if (!data) notFound()

  const fm = data.frontmatter as {
    title: string
    description: string
    tags?: { label: string; type: 'math' | 'concept' | 'code' | 'proof' }[]
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <nav className="flex items-center gap-2 font-mono text-2xs text-ink-3 mb-8">
        <Link href="/" className="hover:text-ink-2 transition-colors">cs189.fyi</Link>
        <span>/</span>
        <Link href="/topics" className="hover:text-ink-2 transition-colors">topics</Link>
        <span>/</span>
        <span className="text-ink-2">{params.slug}</span>
      </nav>

      <header className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
        <h1 className="serif text-4xl font-bold text-ink mb-3" style={{ letterSpacing: '-0.025em' }}>
          {fm.title}
        </h1>
        <p className="text-ink-2 text-base leading-relaxed mb-4 max-w-2xl">{fm.description}</p>
        {fm.tags && (
          <div className="flex items-center gap-2 flex-wrap">
            {fm.tags.map((tag) => <TopicChip key={tag.label} tag={tag} size="md" />)}
          </div>
        )}
      </header>

      <article className="prose max-w-none">{data.content}</article>

    </div>
  )
}
