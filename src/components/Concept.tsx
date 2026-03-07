interface ConceptProps {
  title?: string;
  color?: string;
  children: React.ReactNode;
}

export default function Concept({
  title,
  color = 'var(--c-accent)',
  children,
}: ConceptProps) {
  return (
    <div
      className="bg-[var(--c-surface2)] border border-[var(--c-border)] rounded-lg p-3 mb-2"
      style={{ borderLeftWidth: '3px', borderLeftColor: color }}
    >
      {title && (
        <div className="font-bold text-xs mb-1" style={{ color }}>
          {title}
        </div>
      )}
      <div className="text-[var(--c-muted)] text-xs leading-relaxed">
        {children}
      </div>
    </div>
  );
}
