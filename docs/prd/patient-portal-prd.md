# PRD: Northside Health Patient Portal, release 2

| | |
|---|---|
| Product | Northside Health Patient Portal (web) |
| Owner | Digital Patient Experience |
| Status | Approved for backlog definition |
| Organization | Northside Health is a fictional health system. All data in this product is synthetic. |

## 1. Overview

The patient portal lets Northside Health patients manage their care online. Release 1 shipped the
home screen and the appointments list. Release 2 adds the two features patients ask for most:
finding a doctor, and seeing their lab results.

## 2. Problem

- Patients call the contact center to ask which doctors accept new patients in a specialty. These calls
  are about 30% of contact-center volume and each takes around 6 minutes.
- Lab results are only shared at the next visit or by phone. Patients wait days for results that are
  already available, and most follow-up calls are "are my results normal?".

## 3. Goals and success metrics

| Goal | Metric | Target |
|---|---|---|
| Patients find a suitable doctor on their own | Share of "find a doctor" contact-center calls | -40% within 3 months |
| Patients see results as soon as they are released | Results viewed in the portal within 7 days | 60% of released results |
| The portal is usable by everyone | WCAG 2.1 AA issues in new screens | 0 |

## 4. Users and jobs to be done

- **JTBD-01:** As a new or existing patient, I want to find a doctor in the specialty I need who accepts new patients, so I can book care without calling.
- **JTBD-02:** As a patient who prefers another language or remote care, I want to know which doctors speak my language or offer telehealth, so I can choose one I can communicate with easily.
- **JTBD-03:** As a patient with recent tests, I want to see my results and whether they are in range, so I know if I need to act.
- **JTBD-04:** As a patient managing a condition, I want to see how a result changed over time, so I can track my progress with my doctor.

## 5. Scope

**In scope:** a Find a Doctor screen over the provider directory; a My Test Results screen over the
patient's lab results; entry points from the home screen.

**Out of scope for release 2:** booking an appointment from the portal, messaging, authentication and
real EHR integration (data comes from the local synthetic datasets), explaining results with AI.

## 6. Functional requirements

### Epic E1: Find a Doctor

| ID | Requirement |
|---|---|
| FR-01 | A Find a Doctor screen lists every doctor in the provider directory, sorted by name. |
| FR-02 | Each doctor shows name, specialty, clinic, languages spoken, whether they accept new patients, and whether they offer telehealth. |
| FR-03 | The patient can filter the list by specialty. |
| FR-04 | The patient can search by doctor name; the search is case-insensitive and ignores accents. |
| FR-05 | The patient can narrow the list to doctors accepting new patients, and to doctors offering telehealth. |
| FR-06 | The screen shows how many doctors match, and a clear empty state with a way to reset filters when none do. |
| FR-07 | The home screen's "Find a doctor" action opens the Find a Doctor screen, and the screen appears in the navigation bar. |

### Epic E2: My Test Results

| ID | Requirement |
|---|---|
| FR-08 | A Test Results screen lists the patient's results, newest first, with test name, date, value and unit. |
| FR-09 | Each result shows its reference range and a status: below range, in range, or above range. |
| FR-10 | Out-of-range results are visually highlighted, and never by colour alone. |
| FR-11 | The patient can open a test to see its history: every value for that test over time, with the trend. |
| FR-12 | The patient can filter the list to out-of-range results only. |
| FR-13 | The home screen's "Test results" action opens the Test Results screen, and the screen appears in the navigation bar. |

## 7. Non-functional requirements

- **Accessibility:** WCAG 2.1 AA; every control reachable and usable with the keyboard; status never conveyed by colour alone.
- **Performance:** each screen renders its full list in under 1 second on a mid-range laptop.
- **Privacy:** synthetic data only. No real patient data, names or identifiers anywhere in code, tests or tickets.
- **Responsive:** usable from 360 px wide.
- **Consistency:** reuse the existing shell, cards and tokens; no new visual language.

## 8. Data

| Dataset | Location | Fields |
|---|---|---|
| Provider directory | `src/data/doctors.ts` | id, name, specialty, clinic, languages, acceptingNewPatients, telehealth, yearsOfExperience |
| Lab results | `src/data/labResults.ts` | id, test, date, value, unit, referenceLow, referenceHigh |

## 9. Dependencies and constraints

- Front-end only; no backend in this release.
- New screens are registered in `src/routes.tsx` and follow the existing screen structure.

## 10. Assumptions and risks

- **Assumption:** the provider directory and lab results are complete for release 2.
- **Risk:** patients may read an out-of-range value as an emergency. Mitigation: show the reference range and a note to contact the care team, without medical advice.

## 11. Open questions

- Should doctors not accepting new patients be hidden by default, or shown with a label? (Proposed: shown with a label.)
- Should the results history show a chart or a table? (Proposed: a table first; chart later.)

## 12. Traceability

| JTBD | Requirements |
|---|---|
| JTBD-01 | FR-01, FR-02, FR-03, FR-05, FR-06, FR-07 |
| JTBD-02 | FR-02, FR-04, FR-05 |
| JTBD-03 | FR-08, FR-09, FR-10, FR-12, FR-13 |
| JTBD-04 | FR-11 |
