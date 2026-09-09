import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
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
    },
  },
  plugins: [],
} satisfies Config
