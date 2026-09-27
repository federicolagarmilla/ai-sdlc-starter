import type { Appointment } from './types';

/** Parses the stored YYYY-MM-DD string into a Date. */
export function appointmentDate(appointment: Appointment): Date {
  return new Date(appointment.date);
}

export function formatAppointmentDay(appointment: Appointment): string {
  return appointmentDate(appointment).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/** An appointment is upcoming from the start of today onwards. */
export function isUpcoming(appointment: Appointment, now: Date = new Date()): boolean {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return appointmentDate(appointment) >= startOfToday;
}

const byDateTime = (a: Appointment, b: Appointment) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);

export function upcomingAppointments(appointments: Appointment[], now: Date = new Date()): Appointment[] {
  return appointments.filter((a) => isUpcoming(a, now)).sort(byDateTime);
}

export function pastAppointments(appointments: Appointment[], now: Date = new Date()): Appointment[] {
  return appointments.filter((a) => !isUpcoming(a, now)).sort((a, b) => byDateTime(b, a));
}

export function nextAppointment(appointments: Appointment[], now: Date = new Date()): Appointment | undefined {
  return upcomingAppointments(appointments, now)[0];
}
