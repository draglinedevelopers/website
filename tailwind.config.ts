import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  future: {
    // Gates every `hover:` utility behind @media (hover: hover) and (pointer: fine),
    // so touch taps stop triggering hover states site-wide (animate skill checklist).
    hoverOnlyWhenSupported: true,
  },
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dragline core
        'dragline-black': '#0F0F0F',
        'pure-black': '#000000',
        'dragline-white': '#FFFFFF',
        'off-white': '#F5F5F3',
        // Dragline accents
        sage: '#A5BCB6',
        coral: '#E2766C',
        // Semantic tokens (theme-aware via CSS variables, see globals.css)
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        line: 'var(--line)',
        accent: {
          DEFAULT: 'var(--accent)',
          ink: 'var(--accent-ink)',
        },
        highlight: 'var(--highlight)',
        'sage-text': 'var(--sage-text)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
        xl: '8px',
      },
      maxWidth: {
        container: '1400px',
      },
      letterSpacing: {
        widest: '.18em',
      },
      transitionTimingFunction: {
        // Designed curves (emilkowalski/skills design-eng), not the flat browser defaults.
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
