export default function SectionLabel({ children, className = '' }) {
  return (
    <div className={`text-[var(--c-muted)] text-[11px] uppercase tracking-wider mb-1.5 ${className}`}>
      {children}
    </div>
  )
}
