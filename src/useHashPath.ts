import { useEffect, useState } from 'react';

const currentPath = () => window.location.hash.replace(/^#/, '') || '/';

/** Current hash path ('#/appointments' -> '/appointments'), updated on navigation. */
export function useHashPath(): string {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const onChange = () => setPath(currentPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}
