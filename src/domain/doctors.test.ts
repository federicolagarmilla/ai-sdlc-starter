import { describe, expect, it } from 'vitest';
import { byLastName, doctorCountLabel } from './doctors';
import type { Doctor } from './types';

const doc = (id: string, name: string): Doctor => ({
  id,
  name,
  specialty: 'Cardiology',
  clinic: 'Clinic',
  languages: ['English'],
  acceptingNewPatients: true,
  telehealth: false,
  yearsOfExperience: 5,
});

describe('byLastName', () => {
  it('sorts by last name, ignoring the "Dr." prefix and first name', () => {
    const doctors = [doc('a', 'Dr. Daniel Weiss'), doc('b', 'Dr. Grace Adeyemi'), doc('c', 'Dr. James Carter')];
    expect(byLastName(doctors).map((d) => d.id)).toEqual(['b', 'c', 'a']);
  });

  it('sorts accented last names alongside their base letter', () => {
    const doctors = [doc('a', 'Dr. Hannah Kim'), doc('b', 'Dr. Lucas Moreau'), doc('c', 'Dr. Laura Méndez')];
    expect(byLastName(doctors).map((d) => d.id)).toEqual(['a', 'c', 'b']);
  });

  it('breaks a tie on last name using the full name', () => {
    const doctors = [doc('a', 'Dr. Zoe Carter'), doc('b', 'Dr. Amy Carter')];
    expect(byLastName(doctors).map((d) => d.id)).toEqual(['b', 'a']);
  });
});

describe('doctorCountLabel', () => {
  it('uses the plural form for zero', () => {
    expect(doctorCountLabel(0)).toBe('0 doctors');
  });

  it('uses the singular form for one', () => {
    expect(doctorCountLabel(1)).toBe('1 doctor');
  });

  it('uses the plural form for many', () => {
    expect(doctorCountLabel(16)).toBe('16 doctors');
  });
});
