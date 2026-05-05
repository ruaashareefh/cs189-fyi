import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#f7f6f2',
          card: '#eeeae2',
          elevated: '#e5e1d8',
          hover: '#dedad2',
        },
        ink: {
          DEFAULT: '#1a1824',
          2: '#4a4860',
          3: '#8a889a',
          4: '#b0aec0',
        },
        line: {
          DEFAULT: '#d4d0c8',
          2: '#dedad4',
          3: '#c4c0b8',
        },
        violet: {
          DEFAULT: '#5548b0',
          dim: '#7b6fbe',
          deep: '#3d3490',
          ghost: 'rgba(85, 72, 176, 0.06)',
          glow: 'rgba(85, 72, 176, 0.12)',
        },
        emerald: {
          DEFAULT: '#2d7a56',
          dim: 'rgba(45, 122, 86, 0.12)',
        },
        amber: {
          DEFAULT: '#b08020',
          dim: 'rgba(176, 128, 32, 0.12)',
        },
        rose: {
          DEFAULT: '#c0392b',
          dim: 'rgba(192, 57, 43, 0.10)',
        },
        sky: {
          DEFAULT: '#2878a0',
          dim: 'rgba(40, 120, 160, 0.12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': '0.65rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(200, 191, 255, 0.12)',
        'glow-sm': '0 0 10px rgba(200, 191, 255, 0.08)',
        card: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1a1824',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
