import type { Patient } from '../domain/types';

// Synthetic data only. Never put real patient information in this repository.
export const patient: Patient = {
  id: 'p-1001',
  firstName: 'Jordan',
  lastName: 'Ellis',
  primaryDoctorId: 'd-06',
};
