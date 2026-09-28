## 1. Domain logic

- [x] 1.1 Add `src/domain/doctors.ts` with `byLastName(doctors: Doctor[]): Doctor[]` (locale-aware
      sort by last name, `sensitivity: 'base'`, tie-break on full name) and
      `doctorCountLabel(count: number): string` (singular/plural), per `design.md` - Decisions.
- [x] 1.2 Add `src/domain/doctors.test.ts` covering: sort ignores the "Dr." prefix and sorts by
      last name; accented last names (e.g. "Méndez") sort alongside their base letter, between
      unaccented names (spec: Accented last names sort with their base letter); a tie on last
      name falls back to full name; `doctorCountLabel` for 0, 1 and many. Verify with
      `npm test -- doctors`.

## 2. Screen

- [x] 2.1 Create `src/screens/FindDoctorScreen.tsx`: renders the result count
      (`doctorCountLabel`), and a `.list` of `.card` items (one per doctor from `byLastName`)
      showing name, specialty, clinic, languages (or "Not listed" when empty), an "Accepting new
      patients" / "Not accepting new patients" `.tag`, and a "Telehealth available" `.tag` when
      `telehealth` is true — reusing `DoctorAvatar` and the `doctor-row`/`card`/`list`/`tag`
      classes from `src/styles/app.css`. Verify by rendering the screen locally
      (`npm run dev`) against `src/data/doctors.ts` and visually checking count, sort order and
      all six fields per spec `find-a-doctor` - Doctor details.
- [x] 2.2 Handle the empty-directory state: when the doctor list is empty, show "0 doctors" and a
      message that no doctors are available instead of a blank list, per spec `find-a-doctor` -
      Empty directory. Verify by rendering `FindDoctorScreen` with an empty array prop.
- [x] 2.3 Accept the doctor list as an optional prop defaulting to `doctors` from
      `src/data/doctors.ts`, so tests can pass an empty array or a fixture record without a
      doctor's languages.

## 3. Routing and home screen entry point

- [x] 3.1 Register the new route in `src/routes.tsx`: `{ path: '/find-a-doctor', title: 'Find a
      doctor', render: () => <FindDoctorScreen /> }`. Verify the navigation bar shows "Find a
      doctor" and it opens the screen at `#/find-a-doctor`.
- [x] 3.2 In `src/screens/HomeScreen.tsx`, give the "Find a doctor" quick action
      `href: '#/find-a-doctor'` so it renders as an enabled action instead of "Coming soon".
      Verify by loading the home screen and activating the action.

## 4. Spec sync

- [x] 4.1 Confirm the `home` and `find-a-doctor` delta specs in
      `openspec/changes/browse-provider-directory/specs/` match what was actually built (no
      spec/implementation drift) ahead of `/opsx:archive`.

## 5. Verification

- [x] 5.1 Manual or e2e check: home quick action → screen; navigation bar → screen with current
      page marked; keyboard-only tab order reaches every interactive element with a visible
      focus indicator (spec `find-a-doctor` - Accessible and responsive).
- [x] 5.2 Manual check at a 360px viewport width: all doctor cards render with no horizontal
      scroll and no clipped text.
- [x] 5.3 Run `npm run typecheck` and confirm it passes.
- [x] 5.4 Run `npm test` and confirm the full suite passes, including the new
      `src/domain/doctors.test.ts`.
