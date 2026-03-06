import { useRef, useState } from 'react';

const borderColors = {
  default: 'border-l-[var(--c-accent)]',
  green: 'border-l-[var(--c-green)]',
  orange: 'border-l-[var(--c-orange)]',
  purple: 'border-l-[var(--c-purple)]',
  yellow: 'border-l-[var(--c-yellow)]',
};

interface ExampleBlockProps {
  variant?: keyof typeof borderColors;
  children: React.ReactNode;
}

export default function ExampleBlock({
  variant = 'default',
  children,
}: ExampleBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!ref.current) return;
    const text = ref.current.innerText
      .split('\n')
      .filter((line) => !line.startsWith('#'))
      .join('\n')
      .trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      className={`relative group bg-[#0d1117] border border-[var(--c-border)] border-l-[3px] ${borderColors[variant]} rounded-r-md px-3 py-2 mb-2 text-xs whitespace-pre`}
    >
      <button
        onClick={handleCopy}
        className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] px-1.5 py-0.5 rounded bg-[var(--c-surface2)] border border-[var(--c-border)] text-[var(--c-muted)] hover:text-[var(--c-text)] hover:border-[var(--c-accent)]"
      >
        {copied ? 'Skopiowano!' : 'Kopiuj'}
      </button>
      <div ref={ref}>{children}</div>
    </div>
  );
}

export function Cmd({ children }: { children: React.ReactNode }) {
  return <div className="text-[var(--c-text)]">{children}</div>;
}

export function Comment({ children }: { children: React.ReactNode }) {
  return <div className="text-[var(--c-muted)]">{children}</div>;
}

export function H({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--c-green)]">{children}</span>;
}

export function V({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--c-yellow)]">{children}</span>;
}

export function F({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--c-orange)]">{children}</span>;
}
