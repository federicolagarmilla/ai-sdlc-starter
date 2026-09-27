import type { LabResult } from '../domain/types';

// Synthetic lab results for the patient. Not used by any screen yet (see the PRD, epic "My Test Results").
export const labResults: LabResult[] = [
  { id: 'l-01', test: 'Hemoglobin A1c', date: '2026-03-12', value: 5.9, unit: '%', referenceLow: 4.0, referenceHigh: 5.6 },
  { id: 'l-02', test: 'Hemoglobin A1c', date: '2026-06-18', value: 5.7, unit: '%', referenceLow: 4.0, referenceHigh: 5.6 },
  { id: 'l-03', test: 'Hemoglobin A1c', date: '2026-09-02', value: 5.5, unit: '%', referenceLow: 4.0, referenceHigh: 5.6 },
  { id: 'l-04', test: 'LDL cholesterol', date: '2026-03-12', value: 142, unit: 'mg/dL', referenceLow: 0, referenceHigh: 100 },
  { id: 'l-05', test: 'LDL cholesterol', date: '2026-09-02', value: 118, unit: 'mg/dL', referenceLow: 0, referenceHigh: 100 },
  { id: 'l-06', test: 'HDL cholesterol', date: '2026-09-02', value: 52, unit: 'mg/dL', referenceLow: 40, referenceHigh: 90 },
  { id: 'l-07', test: 'Fasting glucose', date: '2026-06-18', value: 104, unit: 'mg/dL', referenceLow: 70, referenceHigh: 99 },
  { id: 'l-08', test: 'Fasting glucose', date: '2026-09-02', value: 96, unit: 'mg/dL', referenceLow: 70, referenceHigh: 99 },
  { id: 'l-09', test: 'TSH', date: '2026-09-02', value: 2.1, unit: 'mIU/L', referenceLow: 0.4, referenceHigh: 4.0 },
  { id: 'l-10', test: 'Vitamin D (25-OH)', date: '2026-06-18', value: 22, unit: 'ng/mL', referenceLow: 30, referenceHigh: 100 },
  { id: 'l-11', test: 'Hemoglobin', date: '2026-09-02', value: 14.1, unit: 'g/dL', referenceLow: 13.5, referenceHigh: 17.5 },
];
