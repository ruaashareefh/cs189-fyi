import { CollapsibleStep } from '@/components/CollapsibleStep'
import { Callout } from '@/components/Callout'
import { MathBlock } from '@/components/MathBlock'
import { TopicChip } from '@/components/TopicChip'
import { WeightGrid } from '@/components/WeightGrid'

// Custom components available inside every MDX file
export const MDX_COMPONENTS = {
  // Override default HTML elements
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="serif text-3xl font-bold text-ink mt-10 mb-4 first:mt-0" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="serif text-xl font-semibold text-ink mt-8 mb-3" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="serif text-lg font-semibold text-ink mt-6 mb-2" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="text-ink-2 text-base leading-relaxed mb-4" />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="text-ink font-semibold" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="text-ink-2 italic" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc pl-5 mb-4 space-y-1 text-ink-2" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="list-decimal pl-5 mb-4 space-y-1 text-ink-2" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="text-base leading-relaxed" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      {...props}
      className="border-l-2 pl-4 my-4 text-ink-2 italic text-sm"
      style={{ borderColor: 'var(--accent-dim)' }}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="font-mono text-sm px-1.5 py-0.5 rounded"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        color: 'var(--accent)',
        fontSize: '0.85em',
      }}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="rounded-lg overflow-x-auto text-sm my-5 font-mono leading-relaxed"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '1.2em 1.4em' }}
    />
  ),
  hr: () => <hr className="my-8 border-t" style={{ borderColor: 'var(--border)' }} />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div
      className="overflow-x-auto my-5 rounded-lg border"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
    >
      <table {...props} className="w-full text-sm border-collapse" />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="font-mono text-2xs tracking-widest uppercase text-ink-2 text-left px-4 py-2.5 border-b font-semibold"
      style={{ borderColor: 'var(--border-2)', background: 'var(--bg-elevated)' }}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      className="text-ink-2 px-4 py-2.5 border-b text-sm"
      style={{ borderColor: 'var(--border)' }}
    />
  ),

  // Custom components
  CollapsibleStep,
  Callout,
  MathBlock,
  TopicChip,
  WeightGrid,
}
