import { AppointmentItem } from '../components/AppointmentItem';
import { Icon, type IconName } from '../components/Icon';
import { DoctorAvatar } from '../components/DoctorAvatar';
import { seedAppointments } from '../data/appointments';
import { findDoctor } from '../data/doctors';
import { patient } from '../data/patient';
import { nextAppointment } from '../domain/appointments';

interface QuickAction {
  title: string;
  description: string;
  icon: IconName;
  /** Hash link to the screen; undefined while the feature is not available yet. */
  href?: string;
}

const quickActions: QuickAction[] = [
  { title: 'Find a doctor', description: 'Search our providers by specialty', icon: 'stethoscope', href: '#/find-a-doctor' },
  { title: 'Test results', description: 'See your latest lab results', icon: 'flask' },
  { title: 'Appointments', description: 'Upcoming and past visits', icon: 'calendar', href: '#/appointments' },
  { title: 'Messages', description: 'Talk to your care team', icon: 'chat' },
];

function greeting(now: Date): string {
  const h = now.getHours();
  return h < 12 ? 'Good morning' : h < 19 ? 'Good afternoon' : 'Good evening';
}

export function HomeScreen() {
  const now = new Date();
  const next = nextAppointment(seedAppointments());
  const primary = findDoctor(patient.primaryDoctorId);

  return (
    <div className="stack">
      <section className="hero">
        <p className="muted">{now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        <h1>{greeting(now)}, {patient.firstName}</h1>
      </section>

      <section className="grid-2">
        <article className="card">
          <h2>Next appointment</h2>
          {next ? (
            <ul className="list"><AppointmentItem appointment={next} /></ul>
          ) : (
            <p className="muted">No upcoming appointments.</p>
          )}
          <a className="text-link" href="#/appointments">View all appointments</a>
        </article>
        <article className="card">
          <h2>Your primary care doctor</h2>
          {primary && (
            <div className="doctor-row">
              <DoctorAvatar doctor={primary} size={56} />
              <div>
                <strong>{primary.name}</strong>
                <p className="muted">{primary.specialty} · {primary.clinic}</p>
                <p className="muted">Speaks {primary.languages.join(', ')}</p>
              </div>
            </div>
          )}
        </article>
      </section>

      <section>
        <h2>What do you need today?</h2>
        <div className="actions">
          {quickActions.map((a) =>
            a.href ? (
              <a key={a.title} className="action" href={a.href}>
                <span className="action-icon"><Icon name={a.icon} /></span>
                <strong>{a.title}</strong>
                <span className="muted">{a.description}</span>
              </a>
            ) : (
              <div key={a.title} className="action action-disabled" aria-disabled="true">
                <span className="action-icon"><Icon name={a.icon} /></span>
                <strong>{a.title}</strong>
                <span className="muted">{a.description}</span>
                <span className="tag">Coming soon</span>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
