import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
      ? `${title} — DevOps Handbook`
      : 'DevOps Learning Handbook';
    return () => {
      document.title = 'DevOps Learning Handbook';
    };
  }, [title]);
}
