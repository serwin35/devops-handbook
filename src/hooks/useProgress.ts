import { useState, useEffect } from 'react'

const STORAGE_KEY = 'devops-hub-progress'

export type ProgressMap = Record<string, boolean>

export function useProgress() {
  const [completed, setCompleted] = useState<ProgressMap>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
  }, [completed])

  function toggle(id: string) {
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function isCompleted(id: string) {
    return !!completed[id]
  }

  return { completed, toggle, isCompleted }
}
