import { ReactNode } from 'react';
import CodeTag, { CodeTagVariant } from './CodeTag';

interface RowProps {
  code: string;
  codeVariant?: CodeTagVariant;
  children: ReactNode;
}

export default function Row({ code, codeVariant, children }: RowProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1.5 items-start mb-2.5 last:mb-0">
      <CodeTag variant={codeVariant}>{code}</CodeTag>
      <div className="text-[var(--c-muted)] text-xs leading-relaxed">
        {children}
      </div>
    </div>
  );
}
