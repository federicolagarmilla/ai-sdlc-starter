import { findDoctor } from '../data/doctors';
import { formatAppointmentDay } from '../domain/appointments';
import type { Appointment } from '../domain/types';
import { DoctorAvatar } from './DoctorAvatar';

export function AppointmentItem({ appointment }: { appointment: Appointment }) {
  const doctor = findDoctor(appointment.doctorId);
  return (
    <li className="appointment">
      {doctor && <DoctorAvatar doctor={doctor} />}
      <div className="appointment-main">
        <strong>{appointment.reason}</strong>
        <span className="muted">{doctor ? `${doctor.name} · ${doctor.specialty}` : 'Doctor to be assigned'}</span>
        <span className="muted">{appointment.location}</span>
      </div>
      <div className="appointment-when">
        <span className="appointment-day">{formatAppointmentDay(appointment)}</span>
        <span className="muted">{appointment.time}</span>
        <span className={appointment.type === 'Telehealth' ? 'tag tag-tele' : 'tag'}>{appointment.type}</span>
      </div>
    </li>
  );
}
