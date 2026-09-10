// Each practice area keeps one accent everywhere it appears (home snapshot + /services),
// so the same service never shows a different color in different places.
// Electric Yellow is deliberately excluded here: per the design system it's reserved for
// action moments (buttons, CTA blocks), not spread into content sections.
export type Accent = 'coral' | 'sage'

export const serviceAccent: Record<string, Accent> = {
  'digital-products': 'coral',
  'automation-ai': 'sage',
  design: 'coral',
  'technology-consulting': 'sage',
  'api-integrations': 'sage',
}

export const accentClass: Record<Accent, { text: string; hoverText: string; bg: string; border: string }> = {
  coral: {
    text: 'text-highlight',
    hoverText: 'group-hover:text-highlight',
    bg: 'bg-highlight',
    border: 'border-highlight',
  },
  sage: {
    text: 'text-sage-text',
    hoverText: 'group-hover:text-sage-text',
    bg: 'bg-sage-text',
    border: 'border-sage-text',
  },
}
