# Viking Design Framework 🛡️

An **AI-intent-first UX product design methodology** for teams building with AI. Viking gives you a clear, disciplined sequence — from value assessment to engineering handoff — so you build the right thing before you build the thing.

---

## 📖 Methodology

Viking follows a **Systems First, Surfaces Second** philosophy. Five principles, in order, every time:

1. **The 5 Gates** — Determine if AI is the right tool before building anything. Five questions covering Value, Precision, Logic, Risk, and Context.
2. **Things, States, Rules** — Map the logical object model before touching the canvas. No surface without structure.
3. **The High Council** — A sequential 1–7 skill chain that walks you from strategy to engineering handoff.
4. **Generative UI Recipes** — Surfaces assembled from rules and context, not fixed screens.
5. **The AI Slop Test** — A quality audit to reject generic, AI-generated aesthetics in favor of clean, typographically beautiful design.

---

## 🏛️ The High Council

Seven specialized agents. One direction. Nothing ships until every role has signed off.

| # | Agent | Role | Mandate |
|---|---|---|---|
| 1 | **Odin** | Creative Director | Sets the mandate, guards the aesthetic, leads the 5 Gates review |
| 2 | **Mimir** | UX Researcher | Runs the fit assessment, surfaces user vocabulary, audits mental models |
| 3 | **Tyr** | Creative Strategist | Frames the problem, maps user hats, sizes the opportunity |
| 4 | **Heimdall** | Systems Architect | Maps Things, States, and Rules; defines AI placement and HITL moments |
| 5 | **Loki** | Flow Designer | Builds interaction recipes, task flows, and edge case documentation |
| 6 | **Bragi** | Content Designer | Writes the Sandwich Pattern copy — warm, direct, and AI-disclosure-ready |
| 7 | **Thor** | Handoff Specialist | Delivers Component Contracts and normative tokens to Engineering |

---

## 🚀 Installation

```bash
npx skills add kartooner/viking-design
```

Works with **Claude Code CLI** and **Gemini CLI**. Viking auto-detects MCP tools in your environment (Figma, Pencil, Miro) and adapts its output accordingly.

---

## 🛠️ Commands

| Command | Agent | What it does |
|---|---|---|
| `/viking-design` | Orchestrator | Open the Discovery Map. Start here. |
| `/viking-design gate` | Mimir | Run the 5 Gates AI fit assessment |
| `/viking-design frame` | Tyr | Problem framing: brief, user hats, opportunity sizing |
| `/viking-design map` | Heimdall | Logic mapping: Things, States, and Rules |
| `/viking-design chain` | All | Full Council chain from strategy to handoff |
| `/viking-design content` | Bragi | UX copy using the Sandwich Pattern |
| `/viking-design audit` | Odin | Run the AI Slop Test quality audit |

No CLI? Browse the agents and paste any prompt directly into Claude, Copilot, or ChatGPT.

---

## 📚 Intellectual Foundation

Viking is not built in a vacuum. Every agent in the High Council draws from a shared canon of UX, design, and product thinking — applied as working constraints, not decoration.

| Author | Book | What it contributes |
|---|---|---|
| Don Norman | *The Design of Everyday Things* | Affordances, signifiers, feedback loops, conceptual models, and the seven stages of action — the vocabulary for how people understand systems |
| Jesse James Garrett | *The Elements of User Experience* | The five-plane model (Strategy → Scope → Structure → Skeleton → Surface) that governs the Council's work sequence |
| Steve Krug | *Don't Make Me Think* | Self-evident design, scan-pattern thinking, and the ruthless omission of words that don't earn their place |
| Jon Yablonski | *Laws of UX* | Fitts, Hick, Miller, Peak-End Rule, Zeigarnik Effect, Doherty Threshold — psychological laws applied as hard design constraints |
| Laura Klein | *Build Better Products* | Hypothesis-driven design, lean UX research, and defining success before you build |
| Tom Greever | *Articulating Design Decisions* | The three-part rationale structure (what, why, how it's better) that makes design decisions durable |
| Jakob Nielsen | *10 Usability Heuristics* | The baseline quality review at every milestone — visibility of status and user control are blockers on AI features |
| W3C WAI | *WCAG 2.2* | POUR principles baked into every deliverable: contrast, keyboard access, touch targets, screen reader parity |

Full reading list: **[kartooner.com/recommended-books](https://www.kartooner.com/recommended-books/)**

The full canon with role-specific application rules is documented in [`reference/ux-canon.md`](./reference/ux-canon.md).

---

## 📁 Repository structure

```
viking-design/
├── SKILL.md                  # Orchestrator — the framework entry point
├── agents/                   # The High Council — seven specialized agents
│   ├── viking-director.md    # 1. Odin (Creative Director)
│   ├── viking-researcher.md  # 2. Mimir (UX Researcher)
│   ├── viking-strategist.md  # 3. Tyr (Creative Strategist)
│   ├── viking-architect.md   # 4. Heimdall (Systems Architect)
│   ├── viking-flow-designer.md # 5. Loki (Flow Designer)
│   ├── viking-content-designer.md # 6. Bragi (Content Designer)
│   └── viking-handoff-specialist.md # 7. Thor (Handoff Specialist)
├── reference/                # Shared methodology references
│   ├── ux-canon.md           # UX intellectual foundation (all 8 sources)
│   ├── gate.md               # The 5 Gates in full
│   ├── map.md                # Things, States, Rules guide
│   ├── skill-chain.md        # Council sequence and role responsibilities
│   └── tooling.md            # MCP tool detection and strategy
├── bin/                      # CLI installer
├── scripts/                  # Detection and document utilities
└── docs/                     # Distribution and planning docs
```

---

## 📜 Attribution

The **Viking Design Framework** is a synthesis created by **Erik Sagen**. It builds on:

- **[Impeccable Design Framework](https://github.com/impeccable-design)** — visual laws, token-normative standards, and the AI Slop Test methodology
- **[Design with Intent](https://designwithintent.ai/)** — intent-first strategic philosophy and behavioral mapping

The **5 Gates**, **Things, States, Rules** orchestration logic, and the **High Council** agentic chain are original contributions by Erik Sagen.

Methodology draws from the works of Norman, Garrett, Krug, Yablonski, Klein, Greever, and Nielsen. See [`reference/ux-canon.md`](./reference/ux-canon.md) for the full canon with application rules per agent.

## ⚖️ License

MIT — see [`LICENSE`](./LICENSE).
