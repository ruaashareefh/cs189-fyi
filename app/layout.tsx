import type { Metadata } from 'next'
import { IBM_Plex_Mono, Lora, DM_Sans } from 'next/font/google'
import { Nav } from '@/components/Nav'
import '@/styles/globals.css'

// ── Google Fonts ────────────────────────────────────

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  display: 'swap',
})

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// ── Metadata ────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: 'cs189.fyi — Machine Learning, Actually Explained',
    template: '%s · cs189.fyi',
  },
  description:
    'A student-built companion to UC Berkeley CS 189. Clear explanations, full derivations, worked examples. Not a replacement for the class — just the thing you wish existed.',
  metadataBase: new URL('https://cs189.fyi'),
  openGraph: {
    title: 'cs189.fyi',
    description: 'Machine Learning, Actually Explained',
    siteName: 'cs189.fyi',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cs189.fyi',
    description: 'Machine Learning, Actually Explained',
  },
}

// ── Root layout ─────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${lora.variable} ${dmSans.variable}`}
    >
      <head>
        {/*
          Load IBM Plex Mono under its real family name so canvas ctx.font
          resolves it correctly — next/font uses an internal generated name
          that canvas can't reference via CSS variables.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-ink antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
