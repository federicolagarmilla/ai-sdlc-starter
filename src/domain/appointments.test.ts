import { describe, expect, it } from 'vitest';
import { nextAppointment, pastAppointments, upcomingAppointments } from './appointments';
import type { Appointment } from './types';

const visit = (id: string, date: string, time = '10:00'): Appointment => ({
  id, date, time, doctorId: 'd-01', reason: 'Check-up', location: 'Clinic', type: 'In person',
});

const now = new Date(2026, 8, 15, 12, 0); // 15 Sep 2026, local time
const list = [visit('a', '2026-09-20'), visit('b', '2026-09-10'), visit('c', '2026-09-18', '09:00'), visit('d', '2026-08-30')];

describe('upcomingAppointments', () => {
  it('returns future visits, soonest first', () => {
    expect(upcomingAppointments(list, now).map((a) => a.id)).toEqual(['c', 'a']);
  });
});

describe('pastAppointments', () => {
  it('returns past visits, most recent first', () => {
    expect(pastAppointments(list, now).map((a) => a.id)).toEqual(['b', 'd']);
  });
});

describe('nextAppointment', () => {
  it('is the soonest upcoming visit', () => {
    expect(nextAppointment(list, now)?.id).toBe('c');
  });
});
