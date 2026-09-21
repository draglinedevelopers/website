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

export const accentClass: Record<Accent, { text: string; hoverText: string; hoverTextDirect: string; bg: string; border: string; stroke: string }> = {
  coral: {
    text: 'text-highlight',
    hoverText: 'group-hover:text-highlight',
    hoverTextDirect: 'hover:text-highlight',
    bg: 'bg-highlight',
    border: 'border-highlight',
    stroke: 'stroke-highlight',
  },
  sage: {
    text: 'text-sage-text',
    hoverText: 'group-hover:text-sage-text',
    hoverTextDirect: 'hover:text-sage-text',
    bg: 'bg-sage-text',
    border: 'border-sage-text',
    stroke: 'stroke-sage-text',
  },
}

// Service list shared between the homepage snapshot and the /services practice-areas
// diagram, so both stay in sync without duplicating titles/order by hand.
export const services = [
  { id: 'digital-products', title: 'Digital Products' },
  { id: 'api-integrations', title: 'APIs & Integrations' },
  { id: 'automation-ai', title: 'Automation & AI' },
  { id: 'design', title: 'Design' },
  { id: 'technology-consulting', title: 'Technology Consulting' },
]
