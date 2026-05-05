import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import type { LectureMeta } from './lectures'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

const prettyCodeOptions = {
  theme: 'one-dark-pro',
  keepBackground: false,
  onVisitLine(node: { children: unknown[] }) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
}

// ── Shared MDX options (plugins only, no components) ───────────────
// Components are passed per-call so server pages can inject custom ones.
const MDX_PLUGIN_OPTIONS: Record<string, any> = {
  remarkPlugins: [remarkMath, remarkGfm],
  rehypePlugins: [rehypeKatex, [rehypePrettyCode, prettyCodeOptions]],
}

// ── Core compiler ──────────────────────────────────────────────────

async function compile(
  source: string,
  components: Record<string, any> = {}
) {
  return compileMDX({
    source,
    options: { mdxOptions: MDX_PLUGIN_OPTIONS },
    components,
  })
}

// ── Public helpers ─────────────────────────────────────────────────

export async function getLectureContent(
  slug: string,
  components: Record<string, any> = {}
) {
  const filePath = path.join(CONTENT_ROOT, 'lectures', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(raw)
  const { content: mdxContent } = await compile(content, components)

  return {
    content: mdxContent,
    frontmatter: data as Partial<LectureMeta>,
  }
}

export async function getTopicContent(
  slug: string,
  components: Record<string, any> = {}
) {
  const filePath = path.join(CONTENT_ROOT, 'topics', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(raw)
  const { content: mdxContent } = await compile(content, components)

  return {
    content: mdxContent,
    frontmatter: data,
  }
}

export function getAllLectureSlugs(): string[] {
  const dir = path.join(CONTENT_ROOT, 'lectures')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
}

export function getAllTopicSlugs(): string[] {
  const dir = path.join(CONTENT_ROOT, 'topics')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
}
