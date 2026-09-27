import type { Doctor } from '../domain/types';

// Northside Health provider directory. Synthetic data only.
export const doctors: Doctor[] = [
  { id: 'd-01', name: 'Dr. Maya Chen', specialty: 'Cardiology', clinic: 'Northside Heart Institute', languages: ['English', 'Mandarin'], acceptingNewPatients: true, telehealth: true, yearsOfExperience: 14 },
  { id: 'd-02', name: 'Dr. Samuel Okafor', specialty: 'Cardiology', clinic: 'Northside Heart Institute', languages: ['English'], acceptingNewPatients: false, telehealth: true, yearsOfExperience: 22 },
  { id: 'd-03', name: 'Dr. Laura Méndez', specialty: 'Cardiology', clinic: 'Bayfront Clinic', languages: ['English', 'Spanish'], acceptingNewPatients: true, telehealth: false, yearsOfExperience: 9 },
  { id: 'd-04', name: 'Dr. Priya Raman', specialty: 'Dermatology', clinic: 'Westgate Specialty Center', languages: ['English', 'Tamil'], acceptingNewPatients: true, telehealth: true, yearsOfExperience: 11 },
  { id: 'd-05', name: 'Dr. Daniel Weiss', specialty: 'Dermatology', clinic: 'Bayfront Clinic', languages: ['English', 'German'], acceptingNewPatients: false, telehealth: false, yearsOfExperience: 18 },
  { id: 'd-06', name: 'Dr. Ana Souza', specialty: 'Family Medicine', clinic: 'Westgate Family Health', languages: ['English', 'Portuguese', 'Spanish'], acceptingNewPatients: true, telehealth: true, yearsOfExperience: 12 },
  { id: 'd-07', name: 'Dr. James Carter', specialty: 'Family Medicine', clinic: 'Northside Medical Center', languages: ['English'], acceptingNewPatients: true, telehealth: true, yearsOfExperience: 7 },
  { id: 'd-08', name: 'Dr. Fatima Haddad', specialty: 'Family Medicine', clinic: 'Bayfront Clinic', languages: ['English', 'Arabic', 'French'], acceptingNewPatients: false, telehealth: true, yearsOfExperience: 16 },
  { id: 'd-09', name: 'Dr. Lucas Moreau', specialty: 'Pediatrics', clinic: "Northside Children's Clinic", languages: ['English', 'French'], acceptingNewPatients: true, telehealth: false, yearsOfExperience: 10 },
  { id: 'd-10', name: 'Dr. Emily Novak', specialty: 'Pediatrics', clinic: "Northside Children's Clinic", languages: ['English'], acceptingNewPatients: true, telehealth: true, yearsOfExperience: 5 },
  { id: 'd-11', name: 'Dr. Carlos Ibarra', specialty: 'Pediatrics', clinic: 'Westgate Family Health', languages: ['English', 'Spanish'], acceptingNewPatients: false, telehealth: false, yearsOfExperience: 20 },
  { id: 'd-12', name: 'Dr. Hannah Kim', specialty: 'Orthopedics', clinic: 'Westgate Specialty Center', languages: ['English', 'Korean'], acceptingNewPatients: true, telehealth: false, yearsOfExperience: 13 },
  { id: 'd-13', name: 'Dr. Victor Petrov', specialty: 'Orthopedics', clinic: 'Northside Medical Center', languages: ['English', 'Russian'], acceptingNewPatients: true, telehealth: false, yearsOfExperience: 25 },
  { id: 'd-14', name: 'Dr. Grace Adeyemi', specialty: 'Neurology', clinic: 'Northside Medical Center', languages: ['English', 'Yoruba'], acceptingNewPatients: true, telehealth: true, yearsOfExperience: 15 },
  { id: 'd-15', name: 'Dr. Tomás Rivera', specialty: 'Neurology', clinic: 'Bayfront Clinic', languages: ['English', 'Spanish'], acceptingNewPatients: false, telehealth: true, yearsOfExperience: 19 },
  { id: 'd-16', name: 'Dr. Olivia Brooks', specialty: 'Endocrinology', clinic: 'Westgate Specialty Center', languages: ['English'], acceptingNewPatients: true, telehealth: true, yearsOfExperience: 8 },
];

export function findDoctor(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}
