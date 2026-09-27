import { AppointmentItem } from '../components/AppointmentItem';
import { seedAppointments } from '../data/appointments';
import { pastAppointments, upcomingAppointments } from '../domain/appointments';

export function AppointmentsScreen() {
  const appointments = seedAppointments();
  const upcoming = upcomingAppointments(appointments);
  const past = pastAppointments(appointments);

  return (
    <div className="stack">
      <section className="hero">
        <h1>Appointments</h1>
        <p className="muted">Your upcoming and past visits with Northside Health.</p>
      </section>
      <article className="card">
        <h2>Upcoming</h2>
        {upcoming.length ? (
          <ul className="list">{upcoming.map((a) => <AppointmentItem key={a.id} appointment={a} />)}</ul>
        ) : (
          <p className="muted">No upcoming appointments.</p>
        )}
      </article>
      <article className="card">
        <h2>Past</h2>
        <ul className="list">{past.map((a) => <AppointmentItem key={a.id} appointment={a} />)}</ul>
      </article>
    </div>
  );
}
