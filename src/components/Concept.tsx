export default function Concept({ title, color = 'var(--c-accent)', children }) {
  return (
    <div className="bg-[var(--c-surface2)] border border-[var(--c-border)] rounded-lg p-3 mb-2" style={{ borderLeftWidth: '3px', borderLeftColor: color }}>
      {title && <div className="font-bold text-xs mb-1" style={{ color }}>{title}</div>}
      <div className="text-[#8892aa] text-xs leading-relaxed">{children}</div>
    </div>
  )
}
