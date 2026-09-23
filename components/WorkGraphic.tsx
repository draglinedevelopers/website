export default function WorkGraphic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" className="fill-paper" />
      <g className="stroke-line" strokeWidth="1">
        <line x1="0" y1="75" x2="400" y2="75" />
        <line x1="0" y1="150" x2="400" y2="150" />
        <line x1="0" y1="225" x2="400" y2="225" />
        <line x1="100" y1="0" x2="100" y2="300" />
        <line x1="200" y1="0" x2="200" y2="300" />
        <line x1="300" y1="0" x2="300" y2="300" />
      </g>
      <rect x="40" y="180" width="40" height="70" className="fill-accent" />
      <rect x="120" y="120" width="40" height="130" className="fill-sage" />
      <rect x="200" y="150" width="40" height="100" className="fill-ink-muted" />
      <rect x="280" y="90" width="40" height="160" className="fill-highlight" />
    </svg>
  )
}
