# Viking Design Framework: Distribution Guide

How Viking gets from this repo onto someone's machine.

## 1. Repository layout

The repo root is the skill. Anything that installs it copies these folders as-is:

```text
viking-design/
├── SKILL.md       # Orchestrator: the entry point the AI reads
├── agents/        # The seven High Council profiles
├── reference/     # 5 Gates, system mapping, skill chain, tooling, UX canon
├── examples/      # Worked runs of the chain
├── scripts/       # Slop detector, DESIGN.md drafter, context loader
├── bin/           # Node CLI and installer
└── tests/         # Smoke tests (npm test)
```

Node 18 or newer is the only requirement. There is no Python step.

## 2. Install options

### Option A: Skills CLI (recommended)
```bash
npx skills add kartooner/viking-design
```
Pulls the repo from GitHub and registers it as a skill for Claude Code or Gemini CLI.

### Option B: Clone and run the installer
```bash
git clone https://github.com/kartooner/viking-design.git
cd viking-design
npm run setup
```
`bin/install.js` copies the skill into `~/.claude/skills/viking-design`. Run it again to update.

## 3. Usage

Inside Claude Code or Gemini CLI, type `/viking-design` to open the Discovery Map. Every subcommand is listed in `SKILL.md` and the README.

Outside an AI tool, the CLI prints the same map and runs the scripts:

```bash
npx viking-design            # Discovery Map
npx viking-design audit src  # Slop detector on a folder
npx viking-design document . # Draft a DESIGN.md
```

## 4. Before a release

1. Run `npm test`.
2. Bump `version` in `package.json`.
3. Add an entry to `CHANGELOG.md`.
4. Keep the landing page at kartooner.com/frameworks/viking in step with the README.
