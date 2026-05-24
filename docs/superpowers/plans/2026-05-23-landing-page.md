# Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a two-file static landing page for the Viking Design Framework that lives at `/framework/viking/` on kartooner/kartoonerdotcom and in the project root of this repo.

**Architecture:** `index.html` holds all markup and content; `style.css` holds all styles. Google Fonts loaded via `<link>` tags. No JavaScript, no build tools. All paths are absolute URLs or work correctly under a `/framework/viking/` subdirectory.

**Tech Stack:** HTML5, CSS3, Google Fonts (Space Grotesk + Poppins)

---

## File map

| File | Action | Purpose |
|------|--------|---------|
| `.gitignore` | Modify | Add `.superpowers/` |
| `DISTRIBUTION.md` | Move → `docs/DISTRIBUTION.md` | Keep repo root clean |
| `agents/viking-flow-designer.md` | Create | Fill missing agent referenced in skill-chain.md |
| `index.html` | Create | Full page markup — nav, 5 sections, footer |
| `style.css` | Create | All styles — reset, variables, typography, layout, sections |

---

## Task 1: Repository cleanup

**Files:**
- Modify: `.gitignore`
- Move: `DISTRIBUTION.md` → `docs/DISTRIBUTION.md`
- Create: `agents/viking-flow-designer.md`

- [ ] **Step 1: Add `.superpowers/` to `.gitignore`**

Open `.gitignore` and add the entry:

```
node_modules/
.DS_Store
*.log
.gemini/
.claude/
__pycache__/
*.pyc
.superpowers/
usepencil.cmd
```

Note: `usepencil.cmd` is a personal tool — do not move, modify, or delete it. Just keep it out of git.

- [ ] **Step 2: Move DISTRIBUTION.md**

```bash
mkdir -p docs
mv DISTRIBUTION.md docs/DISTRIBUTION.md
```

- [ ] **Step 3: Create the missing flow designer agent**

Create `agents/viking-flow-designer.md`:

```markdown
# Loki — Flow Designer

## Role
Interaction design and wireflows. Step 5 in the High Council chain.

## Mandate
Design the interaction recipes for the product. Build task flows and wireflows
based on the object model Heimdall defined. Account for edge cases, error
states, and moments where AI behavior is uncertain or surprising.

## Inputs
- Systems map from Heimdall (Things, States, Rules)
- AI placement decisions and HITL moments
- User hats from Tyr

## Outputs
- Task flows and wireflows
- Generative UI recipes (bespoke surfaces defined by rules, not fixed screens)
- Edge case and error state documentation

## Principles
- Design for rules, not screens. Define the conditions; let the system
  assemble the surface.
- Every AI action needs a before state, an in-progress state, and an
  after state.
- Unhappy paths are not edge cases. They are primary flows.

## Handoff
Pass flows and recipes to Bragi (Content Designer) with a clear annotation
of every moment that requires copy.
```

- [ ] **Step 4: Verify no broken references remain**

Check that skill-chain.md reference now resolves:

```bash
grep -r "viking-flow-designer" reference/
```

Expected: `reference/skill-chain.md` references `agents/viking-flow-designer.md` — the file now exists.

- [ ] **Step 5: Commit cleanup**

```bash
git add .gitignore docs/DISTRIBUTION.md agents/viking-flow-designer.md
git rm DISTRIBUTION.md
git commit -m "chore: repo cleanup — gitignore superpowers, move DISTRIBUTION.md, add missing flow designer agent"
```

---

## Task 2: CSS foundation

**Files:**
- Create: `style.css`

- [ ] **Step 1: Create style.css with reset, variables, and typography**

```css
/* === Reset === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* === Variables === */
:root {
  --navy:      #1a1a2e;
  --amber:     #c8773a;
  --amber-bg:  #fdf3ec;
  --off-white: #f7f5f2;
  --body:      #555;
  --muted:     #666;
  --quiet:     #888;
  --rule:      #eee;
  --rule-warm: #e2ddd7;

  --font-head: 'Space Grotesk', sans-serif;
  --font-body: 'Poppins', sans-serif;
}

/* === Base === */
html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--font-body);
  color: var(--body);
  background: #fff;
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

/* === Typography === */
h1, h2, h3, h4 {
  font-family: var(--font-head);
  color: var(--navy);
  letter-spacing: -0.04em;
  line-height: 1.15;
}

h1 { font-size: 46px; font-weight: 800; }
h2 { font-size: 34px; font-weight: 800; }
h3 { font-size: 17px; font-weight: 700; }

p {
  font-family: var(--font-body);
  line-height: 1.65;
}

/* === Layout === */
.container {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 48px;
}

section {
  padding: 72px 0;
}

section.off-white {
  background: var(--off-white);
}

section.dark {
  background: var(--navy);
}

/* === Section label (small amber tag above heading) === */
.section-label {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  color: var(--amber);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 16px;
}

/* === Badge (hero pill) === */
.badge {
  display: inline-block;
  background: var(--amber-bg);
  color: var(--amber);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 28px;
}

/* === Numbered list (shared by Problem + Methodology sections) === */
.numbered-list {
  display: flex;
  flex-direction: column;
}

.numbered-item {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 20px;
  align-items: start;
  padding: 28px 0;
  border-top: 1px solid var(--rule);
}

.numbered-item:last-child {
  border-bottom: 1px solid var(--rule);
}

.numbered-item.warm {
  border-top-color: var(--rule-warm);
}

.numbered-item.warm:last-child {
  border-bottom-color: var(--rule-warm);
}

.item-number {
  font-family: var(--font-head);
  font-size: 13px;
  font-weight: 700;
  color: var(--amber);
  padding-top: 3px;
}

.item-title {
  font-family: var(--font-head);
  font-size: 17px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 6px;
}

.item-desc {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--muted);
  line-height: 1.65;
}

.item-tag {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  color: var(--quiet);
  background: #edeae5;
  padding: 2px 8px;
  border-radius: 4px;
  margin-top: 8px;
}

/* === Section intro text === */
.section-intro {
  font-size: 16px;
  color: var(--body);
  line-height: 1.7;
  max-width: 580px;
  margin-bottom: 56px;
}
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "feat: add CSS foundation — variables, typography, shared components"
```

---

## Task 3: HTML scaffold and nav

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html with document head and nav**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Viking Design Framework</title>
  <meta name="description" content="An intent-first UX methodology for AI-native products. Good design starts with thinking, not screens.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header class="site-nav">
    <div class="container nav-inner">
      <div class="nav-logo">Viking <span>Design</span></div>
      <nav class="nav-links">
        <a href="#methodology">Methodology</a>
        <a href="#council">The council</a>
        <a href="#install" class="nav-cta">Install →</a>
      </nav>
    </div>
  </header>

  <!-- sections go here in subsequent tasks -->

</body>
</html>
```

- [ ] **Step 2: Add nav styles to style.css**

Append to `style.css`:

```css
/* === Nav === */
.site-nav {
  border-bottom: 1px solid var(--rule);
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 18px;
  padding-bottom: 18px;
}

.nav-logo {
  font-family: var(--font-head);
  font-weight: 800;
  font-size: 16px;
  color: var(--navy);
  letter-spacing: -0.5px;
}

.nav-logo span {
  color: var(--amber);
}

.nav-links {
  display: flex;
  gap: 28px;
  align-items: center;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--body);
}

.nav-links a {
  color: var(--body);
  transition: color 0.15s;
}

.nav-links a:hover {
  color: var(--navy);
}

.nav-cta {
  color: var(--amber) !important;
  font-weight: 600;
}
```

- [ ] **Step 3: Start local server and verify nav renders**

```bash
python -m http.server 8000
```

Open http://localhost:8000 — expect: sticky nav with "Viking Design" wordmark ("Design" in amber), three nav links on the right, clean white background with bottom border.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add HTML scaffold and sticky nav"
```

---

## Task 4: Hero section

**Files:**
- Modify: `index.html`
- Modify: `style.css`

- [ ] **Step 1: Add hero markup inside `<body>`, after the `<header>`**

Replace the `<!-- sections go here -->` comment with:

```html
  <section class="hero">
    <div class="container">
      <div class="badge">Intent-first UX methodology</div>
      <h1>
        Good intent-first UX<br>
        starts with thinking,<br>
        <span class="accent">not screens.</span>
      </h1>
      <p class="hero-subtext">
        Viking is a design methodology for AI-native products. It gives your team
        a clear sequence from value assessment to engineering handoff, so you build
        the right thing before you build the thing.
      </p>
      <div class="hero-cta">
        <div class="install-cmd">npx skills add eriksagen/viking-design</div>
        <a href="#methodology" class="learn-link">or learn the methodology ↓</a>
      </div>
    </div>
  </section>

  <!-- remaining sections -->
```

- [ ] **Step 2: Add hero styles to style.css**

Append to `style.css`:

```css
/* === Hero === */
.hero {
  padding: 80px 0 72px;
}

.hero h1 {
  margin-bottom: 22px;
  max-width: 560px;
}

.hero h1 .accent {
  color: var(--amber);
}

.hero-subtext {
  font-size: 17px;
  color: var(--body);
  max-width: 520px;
  margin-bottom: 40px;
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.install-cmd {
  background: var(--navy);
  color: #fff;
  font-family: var(--font-head);
  font-size: 13px;
  font-weight: 600;
  padding: 13px 22px;
  border-radius: 6px;
  letter-spacing: 0.2px;
}

.learn-link {
  color: var(--amber);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
}

.learn-link:hover {
  text-decoration: underline;
}
```

- [ ] **Step 3: Verify in browser at http://localhost:8000**

Expect: large headline with "not screens." in amber, body copy, dark install pill, amber learn link below. No em dashes anywhere.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add hero section"
```

---

## Task 5: Problem section

**Files:**
- Modify: `index.html`
- Modify: `style.css`

- [ ] **Step 1: Add problem section markup after the hero section**

Replace `<!-- remaining sections -->` with:

```html
  <section id="problem">
    <div class="container">
      <p class="section-label">The problem</p>
      <h2>Most design frameworks were built before AI existed.</h2>
      <p class="section-intro">
        They assume your product does what you tell it to do. AI products don't
        work that way. They fail in unexpected ways, require human judgment at odd
        moments, and need a different kind of design thinking to get right.
      </p>
      <div class="numbered-list">
        <div class="numbered-item">
          <span class="item-number">01</span>
          <div>
            <div class="item-title">No starting point</div>
            <p class="item-desc">Teams jump straight to screens before asking whether AI is even the right tool for the problem.</p>
          </div>
        </div>
        <div class="numbered-item">
          <span class="item-number">02</span>
          <div>
            <div class="item-title">No system thinking</div>
            <p class="item-desc">Designers work on surfaces without mapping the logic underneath. The AI behavior surprises everyone.</p>
          </div>
        </div>
        <div class="numbered-item">
          <span class="item-number">03</span>
          <div>
            <div class="item-title">No handoff language</div>
            <p class="item-desc">Engineers get wireframes instead of contracts. What the AI should do, and when, gets lost in translation.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- remaining sections -->
```

- [ ] **Step 2: Verify in browser at http://localhost:8000**

Expect: section label "The problem" in amber, h2 heading, body text, three numbered items with clean dividers. No cards, no colored borders.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add problem section"
```

---

## Task 6: Methodology section

**Files:**
- Modify: `index.html`
- Modify: `style.css`

- [ ] **Step 1: Add methodology section markup, replacing `<!-- remaining sections -->`**

```html
  <section id="methodology" class="off-white">
    <div class="container">
      <p class="section-label">The methodology</p>
      <h2>Five steps. In order. Every time.</h2>
      <p class="section-intro">
        Viking is a sequence, not a toolkit. Each step builds on the last.
        You don't skip to screens until the thinking is done.
      </p>
      <div class="numbered-list">
        <div class="numbered-item warm">
          <span class="item-number">01</span>
          <div>
            <div class="item-title">The 5 Gates</div>
            <p class="item-desc">Before anything else, assess whether AI is the right tool. Five questions covering Value, Precision, Logic, Risk, and Context that save you from building the wrong thing entirely.</p>
            <span class="item-tag">Fit assessment</span>
          </div>
        </div>
        <div class="numbered-item warm">
          <span class="item-number">02</span>
          <div>
            <div class="item-title">Things, States, Rules</div>
            <p class="item-desc">Map your product's object model before touching the canvas. What are the things? What states can they be in? What rules govern them?</p>
            <span class="item-tag">Logic mapping</span>
          </div>
        </div>
        <div class="numbered-item warm">
          <span class="item-number">03</span>
          <div>
            <div class="item-title">The High Council</div>
            <p class="item-desc">A seven-role skill chain that walks you from strategy to engineering handoff. Each role has a clear mandate and hands off to the next.</p>
            <span class="item-tag">Design process</span>
          </div>
        </div>
        <div class="numbered-item warm">
          <span class="item-number">04</span>
          <div>
            <div class="item-title">Generative UI Recipes</div>
            <p class="item-desc">Think procedural generation in video games. You define the rules and the system assembles the right UI for the moment. No fixed screens. Just surfaces that fit the context they appear in.</p>
            <span class="item-tag">Interface design</span>
          </div>
        </div>
        <div class="numbered-item warm">
          <span class="item-number">05</span>
          <div>
            <div class="item-title">The AI Slop Test</div>
            <p class="item-desc">A quality audit to catch generic, AI-generated aesthetics before they ship. Clean typography and real design judgment. Not pattern soup.</p>
            <span class="item-tag">Quality audit</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- remaining sections -->
```

- [ ] **Step 2: Verify in browser at http://localhost:8000**

Expect: off-white background section, five numbered items with warm dividers, small gray tags below each description. Background visually separates it from the white Problem section above.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add methodology section"
```

---

## Task 7: Council section

**Files:**
- Modify: `index.html`
- Modify: `style.css`

- [ ] **Step 1: Add council section markup, replacing `<!-- remaining sections -->`**

```html
  <section id="council">
    <div class="container">
      <p class="section-label">The High Council</p>
      <h2>Seven roles. One sequence.</h2>
      <p class="section-intro">
        Each council member owns a step in the process. Work flows in one
        direction and nothing ships until every role has signed off.
      </p>
      <div class="council-grid">
        <div class="council-member">
          <span class="member-number">01</span>
          <div>
            <div class="member-name">Odin</div>
            <div class="member-role">Creative Director</div>
            <p class="item-desc">Sets the creative mandate and business goals. Leads the 5 Gates review. The strategic lead and aesthetic guardian.</p>
          </div>
        </div>
        <div class="council-member">
          <span class="member-number">02</span>
          <div>
            <div class="member-name">Mimir</div>
            <div class="member-role">UX Researcher</div>
            <p class="item-desc">Runs the fit assessment. Audits mental models, user vocabulary, and whether the problem is worth solving.</p>
          </div>
        </div>
        <div class="council-member">
          <span class="member-number">03</span>
          <div>
            <div class="member-name">Tyr</div>
            <div class="member-role">Creative Strategist</div>
            <p class="item-desc">Translates business goals into user opportunities. Defines the user hats and frames the design problem clearly.</p>
          </div>
        </div>
        <div class="council-member">
          <span class="member-number">04</span>
          <div>
            <div class="member-name">Heimdall</div>
            <div class="member-role">Systems Architect</div>
            <p class="item-desc">Maps Things, States, and Rules. Defines where AI lives in the product and where humans stay in the loop.</p>
          </div>
        </div>
        <div class="council-member">
          <span class="member-number">05</span>
          <div>
            <div class="member-name">Loki</div>
            <div class="member-role">Flow Designer</div>
            <p class="item-desc">Designs the interaction recipes. Builds flows that account for edge cases, error states, and AI surprises.</p>
          </div>
        </div>
        <div class="council-member">
          <span class="member-number">06</span>
          <div>
            <div class="member-name">Bragi</div>
            <div class="member-role">Content Designer</div>
            <p class="item-desc">Writes the UX copy. Warm, direct, and clear. Uses the Sandwich Pattern to frame AI actions in human terms.</p>
          </div>
        </div>
        <div class="council-member council-member--full">
          <span class="member-number">07</span>
          <div>
            <div class="member-name">Thor</div>
            <div class="member-role">Handoff Specialist</div>
            <p class="item-desc">Delivers component contracts and design tokens to engineering. The work doesn't leave design until Thor says it's ready.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- remaining sections -->
```

- [ ] **Step 2: Add council styles to style.css**

Append to `style.css`:

```css
/* === Council === */
.council-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.council-member {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 16px;
  align-items: start;
  padding: 24px 0;
  border-top: 1px solid var(--rule);
}

.council-member:nth-child(odd) {
  padding-right: 40px;
}

.council-member:nth-child(even) {
  padding-left: 40px;
  border-left: 1px solid var(--rule);
}

.council-member--full {
  grid-column: 1 / -1;
  padding-right: 0;
  border-bottom: 1px solid var(--rule);
}

.council-member--full:nth-child(odd) {
  padding-right: 0;
}

.member-number {
  font-family: var(--font-head);
  font-size: 13px;
  font-weight: 700;
  color: var(--amber);
  padding-top: 2px;
}

.member-name {
  font-family: var(--font-head);
  font-size: 16px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 2px;
}

.member-role {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  color: var(--amber);
  margin-bottom: 8px;
}
```

- [ ] **Step 3: Verify in browser at http://localhost:8000**

Expect: two-column grid of council members, Thor spanning full width at the bottom. Each member shows number, name, role in amber, description. Clean dividers, no card backgrounds.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add council section"
```

---

## Task 8: Install CTA and footer

**Files:**
- Modify: `index.html`
- Modify: `style.css`

- [ ] **Step 1: Add CTA section and footer, replacing `<!-- remaining sections -->`**

```html
  <section id="install" class="dark">
    <div class="container">
      <h2 class="cta-heading">Start with thinking. Ship with confidence.</h2>
      <p class="cta-subtext">
        Add Viking to your Claude Code or Gemini CLI environment. Works with
        any AI product team, any stack.
      </p>
      <div class="cta-install">
        <span class="cta-cmd">npx skills add eriksagen/viking-design</span>
      </div>
      <div class="cta-links">
        <a href="reference/skill-chain.md">Read the methodology →</a>
        <a href="https://github.com/kartooner/kartoonerdotcom" target="_blank" rel="noopener">View on GitHub →</a>
        <a href="LICENSE">MIT License →</a>
      </div>
      <hr class="cta-divider">
      <p class="cta-attribution">
        Viking Design is built on <a href="https://github.com/impeccable-design" target="_blank" rel="noopener">Impeccable Design Framework</a>
        and <a href="https://designwithintent.ai/" target="_blank" rel="noopener">Design with Intent</a>.
        The 5 Gates, Things States Rules, and the Nordic Council are original contributions by Erik Sagen. MIT licensed.
      </p>
    </div>
  </section>

</body>
</html>
```

- [ ] **Step 2: Add CTA styles to style.css**

Append to `style.css`:

```css
/* === CTA section === */
.dark h2,
.dark p,
.dark a {
  color: #fff;
}

.cta-heading {
  color: #fff;
  max-width: 520px;
  margin-bottom: 16px;
}

.cta-subtext {
  color: #9999bb;
  max-width: 480px;
  font-size: 16px;
  margin-bottom: 36px;
}

.cta-install {
  background: #111122;
  border-radius: 6px;
  padding: 16px 22px;
  display: inline-block;
  margin-bottom: 32px;
}

.cta-cmd {
  font-family: var(--font-head);
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.2px;
}

.cta-links {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.cta-links a {
  font-family: var(--font-body);
  font-size: 14px;
  color: #9999bb;
  font-weight: 500;
  transition: color 0.15s;
}

.cta-links a:hover {
  color: #fff;
}

.cta-divider {
  border: none;
  border-top: 1px solid #2a2a44;
  margin-bottom: 28px;
}

.cta-attribution {
  font-family: var(--font-body);
  font-size: 12px;
  color: #8888aa;
  line-height: 1.7;
}

.cta-attribution a {
  color: #8888aa;
  text-decoration: underline;
}

.cta-attribution a:hover {
  color: #aaaacc;
}
```

- [ ] **Step 3: Verify in browser at http://localhost:8000**

Expect: dark navy section, white heading, muted subtext, dark install block, three links in muted blue-gray, divider, legible attribution text in `#8888aa`. Scroll through the full page — all five sections should be visible and visually distinct.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add install CTA and footer"
```

---

## Task 8b: Commands section

**Files:**
- Modify: `index.html`
- Modify: `style.css`

Add a commands section between The Council and the Install CTA, showing all available CLI commands.

- [ ] **Step 1: Add commands section markup in `index.html`, replacing `<!-- remaining sections -->` after the council section**

```html
  <section id="commands" class="off-white">
    <div class="container">
      <p class="section-label">Usage</p>
      <h2>Five commands. Start anywhere.</h2>
      <p class="section-intro">
        Once installed, run these in your Claude Code or Gemini CLI terminal.
      </p>
      <div class="commands-list">
        <div class="command-item">
          <code class="cmd-name">viking-design</code>
          <p class="cmd-desc">Open the Discovery Map. Start here if you are new to the framework.</p>
        </div>
        <div class="command-item">
          <code class="cmd-name">viking-design gate</code>
          <p class="cmd-desc">Run the 5 Gates assessment. Determines whether AI is the right tool before you build anything.</p>
        </div>
        <div class="command-item">
          <code class="cmd-name">viking-design map</code>
          <p class="cmd-desc">Logic mapping. Walk through Things, States, and Rules for your product.</p>
        </div>
        <div class="command-item">
          <code class="cmd-name">viking-design chain</code>
          <p class="cmd-desc">Activate the full Council chain. Runs all seven roles in sequence from strategy to handoff.</p>
        </div>
        <div class="command-item">
          <code class="cmd-name">viking-design audit</code>
          <p class="cmd-desc">Run the AI Slop Test. Quality audit for aesthetics and design judgment before you ship.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- remaining sections -->
```

- [ ] **Step 2: Append commands styles to style.css**

```css
/* === Commands === */
.commands-list {
  display: flex;
  flex-direction: column;
}

.command-item {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;
  padding: 20px 0;
  border-top: 1px solid var(--rule-warm);
}

.command-item:last-child {
  border-bottom: 1px solid var(--rule-warm);
}

.cmd-name {
  font-family: var(--font-head);
  font-size: 13px;
  font-weight: 600;
  color: var(--navy);
  background: #edeae5;
  padding: 6px 12px;
  border-radius: 4px;
  display: inline-block;
  letter-spacing: 0.1px;
  white-space: nowrap;
}

.cmd-desc {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--muted);
  line-height: 1.65;
  padding-top: 4px;
}
```

- [ ] **Step 3: Verify in browser at http://localhost:8000**

Expect: off-white section, "Usage" label in amber, heading, five command rows each showing the command in a dark pill on the left and a plain description on the right. Clean dividers.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add commands section"
```

---

## Task 9: Final quality pass

**Files:**
- Modify: `index.html` (if issues found)
- Modify: `style.css` (if issues found)

- [ ] **Step 1: Check for em dashes**

```bash
grep -n "\—\|&#8212;\|&mdash;" index.html
```

Expected: no matches. If any found, replace with a period or rewrite the sentence.

- [ ] **Step 2: Check for sentence case on all visible headings**

Scan `index.html` for any `<h1>`, `<h2>`, `<h3>`, section labels, and nav links. Verify each follows sentence case (first word capitalized, rest lowercase unless proper noun). Proper nouns that stay capitalized: "Viking Design", "The 5 Gates", "Things, States, Rules", "The High Council", "The AI Slop Test", "Generative UI Recipes".

- [ ] **Step 3: Check for all-caps text in CSS**

```bash
grep -n "text-transform: uppercase" style.css
```

The only occurrence should be `.section-label` — the small amber label above each section heading. This is acceptable at 11px with letter-spacing. All other text must not use `text-transform: uppercase`.

- [ ] **Step 4: Verify paths work under subdirectory**

All external resources use absolute URLs (Google Fonts). Internal links (`reference/skill-chain.md`, `LICENSE`) are relative and will work correctly whether opened from the project root or from `/framework/viking/` since both `index.html` and its linked files share the same directory.

- [ ] **Step 5: Commit if any fixes were made**

```bash
git add index.html style.css
git commit -m "fix: final quality pass — sentence case, no em dashes"
```

---

## Task 10: Copy to kartooner/kartoonerdotcom

**Files:**
- Create: `framework/viking/index.html` in the kartooner/kartoonerdotcom repo
- Create: `framework/viking/style.css` in the kartooner/kartoonerdotcom repo

- [ ] **Step 1: Locate the kartoonerdotcom repo**

```bash
ls "C:\AI Work\Projects\"
```

Find the `kartoonerdotcom` folder. If it doesn't exist locally, clone it:

```bash
cd "C:\AI Work\Projects"
git clone https://github.com/kartooner/kartoonerdotcom.git
```

- [ ] **Step 2: Create the target directory and copy files**

```bash
mkdir -p "C:\AI Work\Projects\kartoonerdotcom\framework\viking"
cp "C:\AI Work\Projects\Viking design framework\index.html" "C:\AI Work\Projects\kartoonerdotcom\framework\viking\index.html"
cp "C:\AI Work\Projects\Viking design framework\style.css" "C:\AI Work\Projects\kartoonerdotcom\framework\viking\style.css"
```

- [ ] **Step 3: Verify locally**

```bash
cd "C:\AI Work\Projects\kartoonerdotcom"
python -m http.server 8000
```

Open http://localhost:8000/framework/viking/ — page should render identically to the project root version.

- [ ] **Step 4: Commit in kartoonerdotcom**

```bash
cd "C:\AI Work\Projects\kartoonerdotcom"
git add framework/viking/
git commit -m "feat: add Viking Design Framework landing page"
```

- [ ] **Step 5: Push**

```bash
git push
```
