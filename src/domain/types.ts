export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  primaryDoctorId: string;
}

export const SPECIALTIES = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Family Medicine',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
] as const;

export type Specialty = (typeof SPECIALTIES)[number];

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  clinic: string;
  languages: string[];
  acceptingNewPatients: boolean;
  telehealth: boolean;
  yearsOfExperience: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  /** Calendar date of the visit, as YYYY-MM-DD. */
  date: string;
  /** Local start time, as HH:mm. */
  time: string;
  reason: string;
  location: string;
  type: 'In person' | 'Telehealth';
}

export interface LabResult {
  id: string;
  test: string;
  /** Calendar date the sample was collected, as YYYY-MM-DD. */
  date: string;
  value: number;
  unit: string;
  referenceLow: number;
  referenceHigh: number;
}
