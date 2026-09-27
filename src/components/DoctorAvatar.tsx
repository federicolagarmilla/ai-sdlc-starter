import type { Doctor } from '../domain/types';

/** Round avatar with the doctor's initials, coloured by specialty. */
export function DoctorAvatar({ doctor, size = 44 }: { doctor: Doctor; size?: number }) {
  const initials = doctor.name.replace(/^Dr\.\s*/, '').split(' ').map((p) => p[0]).slice(0, 2).join('');
  const tone = `spec-${doctor.specialty.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <span className={`doctor-avatar ${tone}`} style={{ width: size, height: size }} aria-hidden="true">
      {initials}
    </span>
  );
}
