import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Topics' }

const TOPICS = [
  { slug: 'gda',                 title: 'Gaussian Discriminant Analysis' },
  { slug: 'logistic-regression', title: 'Logistic Regression'            },
  { slug: 'linear-regression',   title: 'Linear Regression'              },
  { slug: 'svms',                title: 'Support Vector Machines'        },
  { slug: 'pca',                 title: 'PCA & Dimensionality Reduction' },
  { slug: 'neural-networks',     title: 'Neural Networks'                },
  { slug: 'bias-variance',       title: 'Bias-Variance Tradeoff'        },
  { slug: 'mle-map',             title: 'MLE & MAP Estimation'           },
  { slug: 'kernels',             title: 'Kernel Methods'                 },
  { slug: 'em',                  title: 'EM Algorithm'                   },
]

export default function TopicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest uppercase text-ink-3 mb-3">CS 189</p>
        <h1 className="serif text-4xl font-bold text-ink mb-4" style={{ letterSpacing: '-0.025em' }}>Topics</h1>
        <p className="text-ink-2 text-base max-w-xl leading-relaxed">
          Concept-first deep dives that cut across lectures. Each page has the intuition,
          the math, common mistakes, and practice problems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TOPICS.map(({ slug, title }) => (
          <Link
            key={slug}
            href={`/topics/${slug}`}
            className="group p-5 rounded-lg border transition-all duration-150 hover:border-line-3 hover:bg-bg-elevated"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
          >
            <h3 className="serif text-base font-semibold text-ink group-hover:text-violet transition-colors">
              {title}
            </h3>
            <p className="text-sm text-ink-3 mt-1">Coming soon</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
