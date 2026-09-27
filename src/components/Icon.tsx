const PATHS = {
  stethoscope: 'M6 3v6a4 4 0 0 0 8 0V3 M10 13v2a5 5 0 0 0 10 0v-2 M20 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  flask: 'M9 3h6 M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3 M7 15h10',
  calendar: 'M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4',
  chat: 'M4 5h16v11H9l-5 4z',
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}
