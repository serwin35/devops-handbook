export default function SectionLabel({ children, className = '' }) {
  return (
    <h3
      className={`text-[var(--c-muted)] text-xs uppercase tracking-wider mb-1.5 font-semibold ${className}`}
    >
      {children}
    </h3>
  );
}
