import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} — DevOps Hub` : 'DevOps Learning Hub'
    return () => { document.title = 'DevOps Learning Hub' }
  }, [title])
}
