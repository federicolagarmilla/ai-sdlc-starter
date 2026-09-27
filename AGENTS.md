# AGENTS.md

Project instructions for AI coding agents working in this repository.

## What this is

Northside Health Patient Portal: a web app where a patient sees their next appointment, their care
team and their appointment history. React 19, TypeScript and Vite. There is no backend: the data
comes from the synthetic datasets in `src/data/`.

Northside Health is a fictional organization. **All data is synthetic.** Never add real patient data,
real names of patients, identifiers or credentials anywhere: code, tests, fixtures, tickets or docs.

## Commands

| Task | Command |
|---|---|
| Install | `npm install` |
| Run locally | `npm run dev` (http://localhost:5173) |
| Unit tests | `npm test` |
| Type check | `npm run typecheck` |
| Production build | `npm run build` |

Run `npm run typecheck` and `npm test` before proposing any change.

## Structure

| Path | Holds |
|---|---|
| `src/routes.tsx` | The list of screens. The navigation bar is built from it: a new screen is registered here. |
| `src/screens/` | One component per screen (`HomeScreen`, `AppointmentsScreen`). |
| `src/components/` | Shared presentation components (shell, cards, avatars, icons). No business logic. |
| `src/domain/` | Pure logic and types. No React, no browser APIs. Every function here has unit tests next to it (`*.test.ts`). |
| `src/data/` | Synthetic datasets: patient, doctors (provider directory), appointments, lab results. |
| `src/styles/tokens.css` | The only place for colours, fonts, spacing, radii and shadows. |
| `src/styles/app.css` | Component styles, written only with the tokens. |
| `docs/prd/` | Product requirements. Epics and stories trace back to requirement ids (FR-xx). |
| `docs/bugs/` | Bug reports. |
| `openspec/` | Specs of current behaviour (`specs/`) and proposed changes (`changes/`). |
| `.globant-skills-docs/` | SDLC artifacts produced by the skills (backlog, reports, plans). Committed with the code. |

## Conventions

- **Dates** are calendar dates stored as `YYYY-MM-DD` strings and must mean the same day in every time zone.
- **Filtering and sorting** logic lives in `src/domain/` as pure functions with unit tests; screens only render.
- **Accessibility:** WCAG 2.1 AA. Every control works with the keyboard, form inputs have labels, and status is never conveyed by colour alone.
- **Styling** uses CSS variables from `tokens.css`; never hard-code a colour or font in components or `app.css`.
- **Dependencies:** do not add a runtime dependency without saying why in the pull request.
- **Branches:** `feature/<JIRA-KEY>-<short-name>` or `fix/<bug-id>`. Commits in the imperative mood, starting with the Jira key when there is one.

## Working agreement

Every change follows the same path, and a person decides at each gate:

1. **Start from a story.** A Jira story with acceptance criteria (fetched with `g-p-fetch-jira-items`, or with the read-only `jira-rest` project skill when asked), a story in `.globant-skills-docs/backlog/`, or a bug report in `docs/bugs/`.
2. **Propose before coding.** Run `/opsx:propose` to create the change in `openspec/changes/<name>/`: proposal, spec delta, design and tasks. Do not write application code during this step.
3. **Gate: a person approves the proposal.** Only then run `/opsx:apply`.
4. **Tests come with the change.** New logic in `src/domain/` gets unit tests; every acceptance criterion is covered by a test or a documented manual check.
5. **Pull request.** Open it with `g-e-create-pr`, using `.github/pull_request_template.md`. Review it with `g-e-review-pr`. A person merges.
6. **After merge,** run `/opsx:archive` so `openspec/specs/` describes the new behaviour.
