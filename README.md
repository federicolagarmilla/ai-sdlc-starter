# Northside Health Patient Portal (AI SDLC starter)

A small healthcare web app to practice the AI-native SDLC: take work from a PRD to a merged pull
request with the [ai-sdlc-marketplace](https://github.com/federicolagarmilla/ai-sdlc-marketplace) plugins,
with a person deciding at every gate.

The portal shows a patient their next appointment, their primary care doctor and their appointment
history. It is deliberately unfinished: two epics are waiting in the [PRD](docs/prd/patient-portal-prd.md)
(Find a Doctor and My Test Results), there is a reported bug, and the home screen has tiles marked
"Coming soon".

> Northside Health is a fictional health system and **all data is synthetic**. Never add real patient
> data to this repository, its tests or its tickets.

## Access

This repository and the marketplace are private. To try them, send your email or GitHub username to the
session presenter and you will be given read access to both.

## Prerequisites

- Node 20 or newer
- [Claude Code](https://docs.claude.com/en/docs/claude-code) (or another coding agent, see below)
- The OpenSpec CLI: `npm install -g @fission-ai/openspec`
- For the pull request steps: git and the GitHub CLI, signed in (`gh auth login`)
- Optional, for the Jira steps: a Jira Cloud site where you can create a project (a free site works)

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm test
```

## Connect the SDLC plugins

Open the project in Claude Code. The committed `.claude/settings.json` registers the marketplace and
enables the six stage plugins, so Claude Code offers to install them when you trust the folder.

To install by hand instead:

```
/plugin marketplace add federicolagarmilla/ai-sdlc-marketplace
/plugin install sdlc-plan@ai-sdlc-marketplace
/plugin install sdlc-design@ai-sdlc-marketplace
/plugin install sdlc-build@ai-sdlc-marketplace
/plugin install sdlc-test@ai-sdlc-marketplace
/plugin install sdlc-deploy@ai-sdlc-marketplace
/plugin install sdlc-maintain@ai-sdlc-marketplace
```

**Jira (optional): three roads.** The same agent can reach Jira in three ways; the exercises use road 1.

| Road | What you set up | Auth |
|---|---|---|
| 1. Remote MCP server | Nothing extra: `sdlc-plan` bundles the Atlassian connector. Run `/mcp`, choose the Atlassian server, log in in the browser and approve (tick your site if you have more than one) | OAuth 2.1 in the browser |
| 2. Official CLI + agent skills | Atlassian's Teamwork Graph CLI: `curl -fsSL https://teamwork-graph.atlassian.com/cli/install \| bash`, then `twg setup` (installs its skills for your agent) and `twg doctor` | OAuth 2.1 via `twg setup` |
| 3. Your own skill + script + token | The `jira-rest` skill in `.claude/skills/`: copy `.env.example` to `.env` and add an API token (Jira Cloud) or a PAT (Data Center). `.env` is never committed | A token you store and rotate |

Roads 1 and 2 never need a token: do not paste one into the connector's configuration.

**Other agents.** Copy the skill folders from the marketplace into your agent's skills directory, and run
`openspec init` to add the OpenSpec commands for your agent.

## Exercises

### 1. From PRD to Jira backlog (Plan)

Take the **My Test Results** epic (E2 in the PRD) to a ready backlog in Jira.

| Step | Ask the agent to | Skill | Your gate |
|---|---|---|---|
| 1 | Decompose epic E2 from the PRD into stories | `g-p-decompose-epic` | Is every requirement (FR-08 to FR-13) covered? |
| 2 | Run the Definition of Ready check on the stories | `g-qe-preventive-analyzer` | Which stories are ready? Rewrite the rest |
| 3 | Load the epic and its ready stories into your Jira project | `g-p-load-jira-tickets` | Approve the dry run before anything is created |

No Jira? Stop after step 2 and save the backlog in `.globant-skills-docs/backlog/`.

### 2. From story to pull request (Build, Test, Deploy)

Implement one story of the **Find a Doctor** epic (E1). Start with the one that creates the screen: the doctor list with the specialty filter and the home screen tile (FR-01, FR-02, FR-03, FR-06, FR-07).

| Step | Do | Tool | Your gate |
|---|---|---|---|
| 1 | Bring the story down from Jira (or paste it, or write it with `g-p-write-story`) | `g-p-fetch-jira-items` | Is this the right story? |
| 2 | Propose the change | `/opsx:propose` | Read the proposal, specs, design and tasks. Approve, or ask for changes |
| 3 | Implement it | `/opsx:apply` | |
| 4 | Check it | `npm run typecheck`, `npm test`, the browser | Does it meet every acceptance criterion? |
| 5 | Open the pull request | `g-e-create-pr` | Confirm every commit and push |
| 6 | Review it | `g-e-review-pr` | Merge or not |
| 7 | After merge, update the specs | `/opsx:archive` | |

The proposal lands in `openspec/changes/<change>/`; after archiving, `openspec/specs/` describes the new
behaviour.

### 3. Fix a reported bug

[BUG-001](docs/bugs/bug-001-todays-appointment.md): today's appointment is missing and every visit
shows one day early. Ask the agent to fix it with `g-e-bug-fix`, including a test that fails before the fix.
Hint: it depends on the time zone of the machine running the app.

### 4. Document the architecture

Ask for an Architecture Specification Document with `g-e-asd-extract`. Then review a pull request again
with `g-e-review-pr` and compare: with an ASD in place, the review also checks the architecture.

## Styling

All colours, fonts, spacing and shadows live in [src/styles/tokens.css](src/styles/tokens.css).
Replace the values there to apply a different visual identity; nothing else needs to change.

## Project structure and conventions

See [AGENTS.md](AGENTS.md).
