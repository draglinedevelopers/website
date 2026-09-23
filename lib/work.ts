export type CaseStudy = {
  slug: string
  title: string
  category: string
  summary: string
  context: string
  challenge: string
  solution: string
  deliverables: string[]
  credits: string
}

export const cases: CaseStudy[] = [
  {
    slug: 'operations-system-food-business',
    title: 'Operations System for a Food Business',
    category: 'Automation & Business Systems',
    summary:
      'Real-time inventory, multi-channel sales, and automated payment reconciliation in one system.',
    context: 'Internal — Dragline Operational Use',
    challenge:
      'A food business operating across multiple payment channels (cash, card, bank transfer) had no unified view of inventory, sales, or revenue. Everything was managed manually and reconciled by hand.',
    solution:
      'Designed and implemented an integrated operations system covering real-time inventory tracking, multi-channel sales data, and automated payment reconciliation across all payment methods.',
    deliverables: [
      'Real-time inventory tracking',
      'Multi-channel sales data capture (cash, card, bank transfer)',
      'Automated payment reconciliation across all payment methods',
    ],
    credits: 'Built in-house by the Dragline Developers team.',
  },
]

export const categories = Array.from(new Set(cases.map((c) => c.category)))
