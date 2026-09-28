## Context

See `proposal.md` - Why. The provider directory (`src/data/doctors.ts`, 16 synthetic doctors) and
`DoctorAvatar` already exist; only the screen, its route, and a sort/format function are new. The
`AppointmentsScreen` + `src/domain/appointments.ts` pair is the closest existing precedent for the
screen/domain split this change follows.

## Goals / Non-Goals

**Goals:**
- Sort the full directory by last name, with accented letters sorting alongside their unaccented
  base letter (see `specs/find-a-doctor/spec.md` - Full directory listing).
- Keep sorting and count-formatting as pure, unit-tested functions in `src/domain/`.

**Non-Goals:**
- Any filtering, search, or narrowing UI (out of scope per `proposal.md`).
- Changing `Doctor` or the dataset shape.

## Decisions

**Sort implementation: `String.prototype.localeCompare` with `{ sensitivity: 'base' }`, not a
manual diacritic-stripping function.**
`localeCompare` with `sensitivity: 'base'` treats "e" and "é" as equal at the base level while
still producing a correct locale ordering, which is exactly the "accent sorts with its base
letter" behavior the story asks for (Scenario 4 / KAN-5). A hand-rolled `normalize('NFD').replace(...)`
approach would work too, but adds a second thing to get right (the Unicode range for combining
marks) for no benefit over a built-in the runtime already provides. No dependency either way.

```ts
// src/domain/doctors.ts
function lastName(doctor: Doctor): string {
  return doctor.name.trim().split(/\s+/).at(-1) ?? doctor.name;
}

export function byLastName(doctors: Doctor[]): Doctor[] {
  return [...doctors].sort((a, b) =>
    lastName(a).localeCompare(lastName(b), 'en', { sensitivity: 'base' }) ||
    a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
  );
}

export function doctorCountLabel(count: number): string {
  return `${count} ${count === 1 ? 'doctor' : 'doctors'}`;
}
```

The `||` tie-break falls back to comparing the full `name` when two last names are equal, per the
story's "ties broken by the full name" assumption.

**Last name extraction: last whitespace-separated token of `name`.**
Matches the `[Assumption]` already recorded on the story: every current record is "Dr. First
Last". No parsing of middle names or suffixes; if the dataset later adds one, this is a follow-up,
not something to speculatively handle now.

**Screen structure: one `.card` per doctor inside `.list`, reusing `doctor-row` and `tag`.**
`AppointmentsScreen` already renders a `.list` of `.card`-based items pulled from a domain
function; `FindDoctorScreen` follows the same shape instead of introducing a new list/grid
pattern. Per-doctor status uses the existing `.tag` class (text label) for "Not accepting new
patients" and "Telehealth available" — no new colour-only indicator.

**Empty languages: render "Not listed" inline in the screen component, not in the domain layer.**
This is presentational text, not business logic, so it does not need a pure function or a unit
test in `src/domain/`; a component-level check is enough (see `tasks.md`).

## Risks / Trade-offs

- [Risk] `localeCompare` ordering can vary slightly across JS engines for edge-case characters.
  → Mitigation: the dataset's names are ordinary Latin-script names (worst case: "Méndez"), well
  within `localeCompare`'s well-supported range; the `en` locale argument fixes the collation
  rules instead of relying on the runtime's default locale.
- [Risk] Hardcoding `'en'` as the locale ignores an eventual i18n need. → Mitigation: out of scope
  — the portal has no locale switching today (see AGENTS.md), so there is nothing to derive a
  locale from yet.

## Migration Plan

No data migration. Rollout is: merge → `FindDoctorScreen` and its route ship together, since the
home quick action's `href` and the route registration land in the same change; there is no
intermediate state where the link exists but the route doesn't (or vice versa).
