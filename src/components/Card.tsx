export default function Card({ title, color = 'var(--c-accent)', full = false, className = '', children }) {
  return (
    <div className={`bg-[var(--c-surface)] border border-[var(--c-border)] rounded-xl overflow-hidden hover:border-[var(--c-dim)] transition-all hover:-translate-y-0.5 ${full ? 'col-span-full' : ''} ${className}`}>
      {title && (
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[var(--c-border)] bg-[var(--c-surface2)]">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
          <span className="font-['Syne'] text-[13px] font-bold uppercase tracking-wider" style={{ color }}>
            {title}
          </span>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}
