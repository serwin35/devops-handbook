const colors = {
  default: { text: 'var(--c-accent)', border: 'rgba(0,229,255,0.15)' },
  green: { text: 'var(--c-green)', border: 'rgba(127,255,107,0.15)' },
  orange: { text: 'var(--c-orange)', border: 'rgba(255,107,53,0.15)' },
  purple: { text: 'var(--c-purple)', border: 'rgba(199,125,255,0.15)' },
  yellow: { text: 'var(--c-yellow)', border: 'rgba(255,190,11,0.15)' },
};

export type CodeTagVariant =
  | 'default'
  | 'green'
  | 'orange'
  | 'purple'
  | 'yellow';

interface CodeTagProps {
  variant?: CodeTagVariant;
  children: React.ReactNode;
}

export default function CodeTag({
  variant = 'default',
  children,
}: CodeTagProps) {
  const c = colors[variant];
  return (
    <code
      className="font-mono bg-[var(--c-dim)] px-1.5 py-0.5 rounded text-xs whitespace-nowrap border"
      style={{ color: c.text, borderColor: c.border }}
    >
      {children}
    </code>
  );
}
