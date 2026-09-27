import type { ReactNode } from 'react';
import { patient } from '../data/patient';
import { routes } from '../routes';

export function AppShell({ activePath, children }: { activePath: string; children: ReactNode }) {
  const initials = `${patient.firstName[0]}${patient.lastName[0]}`;
  return (
    <div className="shell">
      <header className="topbar">
        <a className="brand" href="#/">
          <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-9.3-9.6C1.4 7.9 3.6 4.5 7 4.5c2.1 0 3.6 1.1 5 2.9 1.4-1.8 2.9-2.9 5-2.9 3.4 0 5.6 3.4 4.3 6.9C19.5 16.4 12 21 12 21z" fill="currentColor" />
          </svg>
          <span>Northside Health</span>
        </a>
        <nav className="nav" aria-label="Main">
          {routes.map((r) => (
            <a key={r.path} href={`#${r.path}`} className={r.path === activePath ? 'nav-link active' : 'nav-link'} aria-current={r.path === activePath ? 'page' : undefined}>
              {r.title}
            </a>
          ))}
        </nav>
        <span className="avatar" title={`${patient.firstName} ${patient.lastName}`}>{initials}</span>
      </header>
      <main className="content">{children}</main>
      <footer className="footer muted">Patient portal · All data shown is synthetic</footer>
    </div>
  );
}
