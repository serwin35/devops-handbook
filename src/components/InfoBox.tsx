export default function InfoBox({ warn = false, children }) {
  return (
    <div
      role="note"
      className={`rounded-md p-2.5 mt-2 text-xs border-l-[3px] border ${
        warn
          ? 'bg-[rgba(255,107,53,0.08)] border-[rgba(255,107,53,0.2)] border-l-[var(--c-orange)]'
          : 'bg-[rgba(0,229,255,0.06)] border-[rgba(0,229,255,0.15)] border-l-[var(--c-accent)]'
      }`}
    >
      <span className="mr-1.5">{warn ? '\u26A0\uFE0F' : '\u2139\uFE0F'}</span>
      {children}
    </div>
  );
}
