import type { Doctor } from './types';

function lastName(doctor: Doctor): string {
  return doctor.name.trim().split(/\s+/).at(-1) ?? doctor.name;
}

/** Sorts doctors by last name, locale-aware so accents sort with their base letter. */
export function byLastName(doctors: Doctor[]): Doctor[] {
  return [...doctors].sort(
    (a, b) =>
      lastName(a).localeCompare(lastName(b), 'en', { sensitivity: 'base' }) ||
      a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
  );
}

export function doctorCountLabel(count: number): string {
  return `${count} ${count === 1 ? 'doctor' : 'doctors'}`;
}
