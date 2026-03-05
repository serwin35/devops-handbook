export default function InfoBox({ warn = false, children }) {
  return (
    <div className={`rounded-md p-2.5 mt-2 text-xs border ${warn
      ? 'bg-[rgba(255,107,53,0.04)] border-[rgba(255,107,53,0.15)]'
      : 'bg-[rgba(0,229,255,0.04)] border-[rgba(0,229,255,0.12)]'
    }`}>
      {children}
    </div>
  )
}
