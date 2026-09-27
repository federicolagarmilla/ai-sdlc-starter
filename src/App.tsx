import { useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { routes } from './routes';
import { useHashPath } from './useHashPath';

export function App() {
  const path = useHashPath();
  const route = routes.find((r) => r.path === path) ?? routes[0];

  useEffect(() => {
    document.title = `${route.title} · Northside Health`;
  }, [route]);

  return <AppShell activePath={route.path}>{route.render()}</AppShell>;
}
