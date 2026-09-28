## Why

KAN-5 (Epic KAN-4, F01) asks for the first end-to-end slice of "Find a Doctor": today the
provider directory (`src/data/doctors.ts`, 16 synthetic doctors) is only used for the primary-care
card and appointments, and the home screen's "Find a doctor" quick action is permanently disabled
and labelled "Coming soon". Patients cannot see the full directory on their own and have to call
the contact center. This change implements FR-01, FR-02, FR-06 and FR-07: a new screen that lists
every doctor, sorted by last name, with the details a patient needs, reachable from the home
screen and the navigation bar.

## What Changes

- Add a new `FindDoctorScreen` at route `/find-a-doctor`, registered in `src/routes.tsx` (adds it
  to the navigation bar).
- Add a pure domain function that sorts the full doctor list by last name (locale-aware, accents
  sort with their base letter), plus a count-label formatter ("16 doctors" / "1 doctor" / "0 doctors").
- List every doctor as a card: name, specialty, clinic, languages, an "Accepting new patients" /
  "Not accepting new patients" label, and a "Telehealth available" label when it applies — all as
  text, never colour alone.
- Enable the home screen's "Find a doctor" quick action (`href: '#/find-a-doctor'`); it is no
  longer shown as "Coming soon".
- Update the `home` spec's "Coming soon" example, which currently uses Find a doctor.

## Capabilities

### New Capabilities

- `find-a-doctor`: the Find a Doctor screen — lists the full, unfiltered provider directory
  sorted by last name, with per-doctor details and a result count.

### Modified Capabilities

- `home`: the "Feature not yet available" scenario used Find a doctor as its example of a
  disabled quick action; Find a doctor is now available, so the scenario needs a different
  example and a new scenario covers the now-enabled action.

## Impact

- New: `src/screens/FindDoctorScreen.tsx`, a sort/format function in `src/domain/doctors.ts` with
  `src/domain/doctors.test.ts`.
- Changed: `src/routes.tsx` (new route), `src/screens/HomeScreen.tsx` (quick action `href`),
  `openspec/specs/home/spec.md` (delta).
- Reused, unchanged: `src/data/doctors.ts`, `DoctorAvatar`, `.card`/`.list`/`.doctor-row`/`.tag`
  styles in `src/styles/app.css`. No schema change, no new runtime dependency.

## Out of Scope

- Filtering by specialty (FR-03), name search (FR-04), and narrowing by accepting-new-patients or
  telehealth (FR-05) — these are F02 to F04 under the same Epic (KAN-4), not KAN-5.
- The zero-results empty state and filter reset (F05) — there is no filtering yet in this slice.
- Booking an appointment, doctor profile pages, messaging, and showing `yearsOfExperience` — out
  of scope per the PRD and the KAN-5 acceptance criteria.
