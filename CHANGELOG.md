# Changelog

## 1.1.0 · 2026-10-25

### Added
- **The Mirror Rule:** fix the instance, reflect the pattern. Added to SKILL.md's core methodology, the system map, the Risk gate, Heimdall's mandates and output, Odin's governance questions, and the worked example.
- `examples/expense-receipts.md`: a full worked run of the chain, from the 5 Gates to handoff and audit.
- Output format for 5. Loki (Flow Designer), so every role now has a defined deliverable.
- `/viking-design shape`, `craft`, and `document` documented in the README.
- Smoke tests (`npm test`) covering the slop detector, the `DESIGN.md` drafter, the CLI, and doc consistency.
- `npm run setup` now copies the skill into `~/.claude/skills/viking-design`.

### Changed
- Gate 2 (Logic) now asks "Is there a clear path to the answer?" A checklist still means use a script; guesswork the AI can't explain now means stop. Matches [Do You Actually Need AI?](https://medium.com/@kartooner/do-you-actually-need-ai-f45ae9e19ccf).
- Odin has guidance for pushing back on AI-for-its-own-sake. Bragi has example language for uncertainty.
- One command name everywhere: `/viking-design`. SKILL.md and the tooling guide used `/vikingdesign`.
- The CLI is Node only. The Python script and the Windows `.cmd` wrapper are gone, so Python is no longer required. The `vikingdesign` bin alias was removed with them.
- SKILL.md: chain listed in order, numbering fixed, Odin's audit moved after the chain.
- Scope guardrails are friendlier. Off-topic requests get redirected in one line instead of a scripted refusal.
- Agents are dispatched with whatever subagent tool the host has, or run in turn when there isn't one.
- `viking-document` scans real files and won't overwrite an existing `DESIGN.md` without `--force`. Before, it wrote the same placeholder tokens every time.

### Fixed
- `viking-detect` now scans folders. `audit .` used to check nothing.
- `viking-detect` no longer misses repeat violations in later files. Its rules used global regexes, which keep state between `.test()` calls.
- Impeccable link points to [pbakaus/impeccable](https://github.com/pbakaus/impeccable).
- Removed references to files that don't ship (`AGENTS.md`) and tools that don't exist (`invoke_agent`).

## 1.0.0 · 2026-05-24

First public release.
