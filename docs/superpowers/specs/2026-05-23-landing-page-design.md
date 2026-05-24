# Viking Design Framework — Landing Page Spec

**Date:** 2026-05-23
**Status:** Approved

---

## Overview

A static landing page for the Viking Design Framework, stored in the project folder and openable directly in a browser. Aimed at UX/product designers who have not yet heard of Viking. The goal is to earn belief first, then convert to install.

---

## Audience

- **Primary:** UX and product designers
- **Secondary:** Product managers, engineers who work closely with design

---

## Conversion Funnel

1. Understand the problem Viking solves
2. Understand how Viking solves it
3. Install it (`npx skills add eriksagen/viking-design`)
4. Share it with their team
5. Reach out to Erik directly

---

## Technical Delivery

- Two files: `index.html` and `style.css`
- No build tools, no dependencies except Google Fonts
- Fonts: **Space Grotesk** (headings) and **Poppins** (body) via Google Fonts
- Openable directly from the filesystem or via a local server

---

## Visual Direction

- **Tone:** Modern, clean, grounded. No AI-isms in aesthetics or copy.
- **Colors:**
  - Primary text: `#1a1a2e` (dark navy)
  - Accent: `#c8773a` (warm amber)
  - Body text: `#555`
  - Muted text: `#666`, `#888`
  - Off-white background (used for alternating sections): `#f7f5f2`
  - Dark CTA background: `#1a1a2e`
- **No:** all-caps text, em dashes, colored card borders, icon cards, gradient backgrounds
- **Heading case:** Sentence case throughout. First word capitalized, rest lowercase except proper nouns (e.g. "The High Council", "The 5 Gates", "Things, States, Rules")
- **Nav items:** Sentence case. "The council" not "The Council" unless it is a proper name
- **Logo:** Clean wordmark — "Viking **Design**" with "Design" in amber. Icon TBD (download Viking ship from Flaticon: flaticon.com/free-icon/viking-ship_2483972)

---

## Page Structure

### Nav
- Wordmark left: `Viking Design` (Space Grotesk, bold, "Design" in amber)
- Links right: Methodology / The Council / Install

---

### Section 1 — Hero

**Badge:** "Intent-first UX methodology"

**Headline:**
> Good intent-first UX  
> starts with thinking,  
> not screens.

**Body:**
> Viking is a design methodology for AI-native products. It gives your team a clear sequence from value assessment to engineering handoff, so you build the right thing before you build the thing.

**CTA row:**
- Dark pill: `npx skills add eriksagen/viking-design`
- Text link: `or learn the methodology ↓`

---

### Section 2 — The Problem

**Background:** White

**Heading:** "Most design frameworks were built before AI existed."

**Body:**
> They assume your product does what you tell it to do. AI products don't work that way. They fail in unexpected ways, require human judgment at odd moments, and need a different kind of design thinking to get right.

**Numbered list (no cards, clean dividers):**

1. **No starting point** — Teams jump straight to screens before asking whether AI is even the right tool for the problem.
2. **No system thinking** — Designers work on surfaces without mapping the logic underneath. The AI's behavior surprises everyone.
3. **No handoff language** — Engineers get wireframes instead of contracts. What the AI should do, and when, gets lost in translation.

---

### Section 3 — The Methodology

**Background:** Off-white (`#f7f5f2`)

**Heading:** "Five steps. In order. Every time."

**Body:**
> Viking is a sequence, not a toolkit. Each step builds on the last. You don't skip to screens until the thinking is done.

**Numbered list with small tag labels:**

1. **The 5 Gates** `Fit assessment` — Before anything else, assess whether AI is the right tool. Five questions covering Value, Precision, Logic, Risk, and Context that save you from building the wrong thing entirely.
2. **Things, States, Rules** `Logic mapping` — Map your product's object model before touching the canvas. What are the things? What states can they be in? What rules govern them?
3. **The High Council** `Design process` — A seven-role skill chain that walks you from strategy to engineering handoff. Each role has a clear mandate and hands off to the next.
4. **Generative UI Recipes** `Interface design` — Think procedural generation in video games. You define the rules and the system assembles the right UI for the moment. No fixed screens. Just surfaces that fit the context they appear in.
5. **The AI Slop Test** `Quality audit` — A quality audit to catch generic, AI-generated aesthetics before they ship. Clean typography and real design judgment. Not pattern soup.

---

### Section 4 — The High Council

**Background:** White

**Heading:** "Seven roles. One sequence."


**Body:**
> Each council member owns a step in the process. Work flows in one direction and nothing ships until every role has signed off.

**Two-column grid (07 Thor spans full width):**

| # | Name | Role | Description |
|---|------|------|-------------|
| 01 | Odin | Creative Director | Sets the creative mandate and business goals. Leads the 5 Gates review. The strategic lead and aesthetic guardian. |
| 02 | Mimir | UX Researcher | Runs the fit assessment. Audits mental models, user vocabulary, and whether the problem is worth solving. |
| 03 | Tyr | Creative Strategist | Translates business goals into user opportunities. Defines the user hats and frames the design problem clearly. |
| 04 | Heimdall | Systems Architect | Maps Things, States, and Rules. Defines where AI lives in the product and where humans stay in the loop. |
| 05 | Loki | Flow Designer | Designs the interaction recipes. Builds flows that account for edge cases, error states, and AI surprises. |
| 06 | Bragi | Content Designer | Writes the UX copy. Warm, direct, and clear. Uses the Sandwich Pattern to frame AI actions in human terms. |
| 07 | Thor | Handoff Specialist | Delivers component contracts and design tokens to engineering. The work doesn't leave design until Thor says it's ready. |

---

### Section 5 — Install CTA

**Background:** `#1a1a2e` (dark)

**Heading:** "Start with thinking. Ship with confidence."

**Body:**
> Add Viking to your Claude Code or Gemini CLI environment. Works with any AI product team, any stack.

**Install block (dark pill):** `npx skills add eriksagen/viking-design` + copy hint

**Links:** Read the methodology / View on GitHub / MIT License

**Attribution (bottom, color `#8888aa` for legibility on dark background):**
> Viking Design is built on Impeccable Design Framework and Design with Intent. The 5 Gates, Things States Rules, and the Nordic Council are original contributions by Erik Sagen. MIT licensed.

---

## File Structure

The landing page lives in two places:

1. **This repo** — as the canonical source
2. **kartooner/kartoonerdotcom** — deployed at `/framework/viking/`

```
Viking design framework/        ← this repo
  index.html
  style.css
  docs/
    superpowers/
      specs/
        2026-05-23-landing-page-design.md

kartooner/kartoonerdotcom       ← destination repo
  framework/
    viking/
      index.html
      style.css
```

All asset paths (fonts, any future images) must be absolute URLs or root-relative paths that work under `/framework/viking/`. No relative paths that assume the page is at the site root.

---

## Out of Scope

- JavaScript interactions (copy-to-clipboard, smooth scroll)
- Mobile responsiveness (can be added later)
- Contact form
- Blog or changelog
