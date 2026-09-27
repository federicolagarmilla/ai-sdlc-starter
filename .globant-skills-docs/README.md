# SDLC artifacts

The skills from the ai-sdlc-marketplace write their outputs here. Commit them with the code: they are
the chain from intent to release, and the context the next stage reads.

| Folder | Written by | Holds |
|---|---|---|
| `backlog/` | `g-p-decompose-epic`, `g-p-write-story` | Development-ready stories with acceptance criteria |
| `preventive-analysis/` | `g-qe-preventive-analyzer` | Definition of Ready scorecards |
| `jira-load/` | `g-p-load-jira-tickets` | One ledger per load: the Jira keys created |
| `jira-fetch/` | `g-p-fetch-jira-items`, or the `jira-rest` project skill | Stories brought down from Jira, with every field |
| `asd/` | `g-e-asd-extract`, `g-e-asd-create` | Architecture Specification Document |
| `plans/` | `g-e-implementation-plan` | Implementation plans, approved before coding |
| `test-scenarios/` | `g-qe-test-scenario-designer` | Test scenarios |
| `release/` | `g-e-release-checklist` | Release checklists |
| `telemetry/` | `g-e-telemetry` | Telemetry findings and change requests |

Proposed changes planned with OpenSpec live in `openspec/changes/`, not here.
