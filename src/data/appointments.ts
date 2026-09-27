import type { Appointment } from '../domain/types';

type Row = [dayOffset: number, time: string, doctorId: string, reason: string, location: string, type: Appointment['type']];

// Synthetic appointments, placed relative to today so the portal always has upcoming visits.
const ROWS: Row[] = [
  [0, '16:30', 'd-06', 'Annual physical', 'Westgate Family Health', 'In person'],
  [9, '10:00', 'd-01', 'Cardiology follow-up', 'Northside Heart Institute', 'Telehealth'],
  [23, '08:45', 'd-12', 'Knee pain consultation', 'Westgate Specialty Center', 'In person'],
  [-21, '11:15', 'd-06', 'Flu symptoms', 'Westgate Family Health', 'Telehealth'],
  [-64, '09:30', 'd-04', 'Skin check', 'Westgate Specialty Center', 'In person'],
];

const pad = (n: number) => String(n).padStart(2, '0');

export function seedAppointments(today: Date = new Date()): Appointment[] {
  return ROWS.map(([offset, time, doctorId, reason, location, type], i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    return { id: `a-${i + 1}`, doctorId, date, time, reason, location, type };
  });
}
