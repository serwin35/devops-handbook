export default function PageHeader({
  title,
  subtitle,
  color = 'var(--c-accent)',
}) {
  return (
    <div className="mb-8">
      <h1
        className="font-['Syne'] text-2xl md:text-3xl font-extrabold uppercase tracking-tight flex items-center gap-3 mb-1"
        style={{ color }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-[var(--c-muted)] text-sm tracking-widest uppercase">
          {subtitle}
        </p>
      )}
    </div>
  );
}
