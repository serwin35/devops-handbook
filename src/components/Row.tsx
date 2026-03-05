import CodeTag from './CodeTag'

export default function Row({ code, codeVariant, children }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1.5 items-start mb-2.5 last:mb-0">
      <CodeTag variant={codeVariant}>{code}</CodeTag>
      <div className="text-[#8892aa] text-xs leading-relaxed">{children}</div>
    </div>
  )
}
