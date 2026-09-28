import { DoctorAvatar } from '../components/DoctorAvatar';
import { doctors as allDoctors } from '../data/doctors';
import { byLastName, doctorCountLabel } from '../domain/doctors';
import type { Doctor } from '../domain/types';

export function FindDoctorScreen({ doctors = allDoctors }: { doctors?: Doctor[] }) {
  const sorted = byLastName(doctors);

  return (
    <div className="stack">
      <section className="hero">
        <h1>Find a doctor</h1>
        <p className="muted">{doctorCountLabel(sorted.length)}</p>
      </section>
      <article className="card">
        {sorted.length ? (
          <ul className="list">
            {sorted.map((doctor) => (
              <li key={doctor.id} className="doctor-row">
                <DoctorAvatar doctor={doctor} />
                <div>
                  <strong>{doctor.name}</strong>
                  <p className="muted">{doctor.specialty} · {doctor.clinic}</p>
                  <p className="muted">Speaks {doctor.languages.length ? doctor.languages.join(', ') : 'Not listed'}</p>
                  <span className="tag">
                    {doctor.acceptingNewPatients ? 'Accepting new patients' : 'Not accepting new patients'}
                  </span>
                  {doctor.telehealth && <span className="tag tag-tele">Telehealth available</span>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">No doctors are available.</p>
        )}
      </article>
    </div>
  );
}
