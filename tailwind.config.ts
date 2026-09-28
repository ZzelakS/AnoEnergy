import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Channels are raw RGB triplets in globals.css so opacity modifiers work.
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        deep: 'rgb(var(--deep) / <alpha-value>)',
        haze: 'rgb(var(--haze) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        flare: 'rgb(var(--flare) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-display)', 'ui-sans-serif', 'sans-serif'],
      },
      keyframes: {
        riseIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        sweep: {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(400%)' },
        },
      },
      animation: {
        riseIn: 'riseIn 520ms cubic-bezier(0.16, 1, 0.3, 1) both',
        sweep: 'sweep 900ms cubic-bezier(0.4, 0, 0.2, 1) both',
      },
    },
  },
  plugins: [],
} satisfies Config
