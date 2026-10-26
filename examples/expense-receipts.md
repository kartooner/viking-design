# Worked example: Receipt to expense line

One feature, run through the full High Council chain. Each step shows the prompt, the role that handled it, and the deliverable it handed to the next role.

The company and numbers are made up. The shape of the work is real.

**The ask:** "Add AI to our expense tool so people can snap a receipt and be done."

---

## Step 1 · Odin (Creative Director)

**Prompt:** `/viking-design chain` with the one-line ask and the expense team's Q3 goal: cut the number of reports Finance sends back.

Odin doesn't start with the camera. He starts with the business goal and what the ask is really betting on.

```
## Initiative
Receipt capture: turn a photo of a receipt into a ready-to-submit expense line.

## Business objective
Cut returned expense reports from 18% to under 8% this year. Today Finance
sends back nearly 1 in 5 reports, mostly for wrong totals, missing
itemized receipts, and wrong categories.

## Creative mandate
Reduce time-to-submit without moving errors downstream to Finance.
Fast is only a win if the report is right the first time.

## What we're directing
UX Researcher runs the fit check first. The ask assumes AI can do the whole
job. It probably can't, and we need to know which parts it can.

## Strategic constraints
Expense data feeds payroll reimbursement. Money amounts are audited.

## Quality bar
Clean, compact, one primary action per screen.
```

**Automation level:** Augmentative. AI recommends; the employee confirms.

---

## Step 2 · Mimir (UX Researcher)

**Prompt:** `/viking-design gate`

Mimir breaks "snap a receipt and be done" into the four jobs hiding inside it, then runs each one through the 5 Gates on its own. This is the step that changes the project.

```
## Research synthesis: Receipt capture

### Key findings
#### 41 of 60 returned reports (68%) came from three causes
- Total typed wrong or tip left out: 19
- Missing itemized receipt over $75: 14
- Wrong category: 8
**Implication:** Two of the top three causes are not reading problems.
They are rule problems.

#### Employees call it "the project code," not "cost center"
**Implication:** Use their word in the UI.

### AI fit assessment (5 Gates)

| Job | Value | Precision | Logic | Risk | Context | Result |
|---|---|---|---|---|---|---|
| Read merchant, date, total from photo | Pass | Fail | Pass | Pass with review | Pass | AI with human check |
| Suggest a category | Pass | Pass | Pass | Pass | Pass | AI |
| Check policy (itemized over $75, no alcohol) | Pass | Fail | Fail | Pass | Pass | Rules engine, not AI |
| Pick the project code | Pass | Fail | Fail | Pass | Fail | Manual, default to last used |

### Recommendations for the Creative Strategist
- Reading the receipt is a good AI job, but the total must be exact.
  The employee confirms it, and we match it against the card feed when
  a card was used.
- Category is the cleanest AI fit: fuzzy, low risk, easy to fix.
- Policy checks are a checklist. Write them as rules. An AI guessing
  at policy is how we'd get to 25% returns.
- Project assignments live in each manager's spreadsheet. The AI has
  nothing to read, so it can't help yet.
```

**What happened:** the ask was "AI does it all." The gates say AI does one job outright, helps with one, and stays out of two. That split is the whole design.

---

## Step 3 · Tyr (Creative Strategist)

**Prompt:** `/viking-design frame`

```
## Context
Employees file expenses from their phones, usually in a parking lot or
an airport, right after paying.

## Gap
Typing a receipt in by hand is slow, so people batch them at month end
and guess. Finance catches the guesses.

## Opportunity
About 2,400 receipts a month. If capture drops from ~2 minutes to
~20 seconds, employees get back about 65 hours a month. If returns fall
from 18% to 8%, Finance does less than half the rework it does today.
Hypothesis: We believe employees file late and wrong because typing is
slow. We'll know we're right when same-day filing goes up and returns
for wrong totals go down.

## User Hats
- The traveler: just paid, phone in one hand, wants it out of their head.
- The month-end filer: has 14 receipts and 10 minutes.
- The Finance reviewer: needs to trust what they approve.

## Guiding principles
- Magic in simplicity: one photo, one confirm.
- Never guess at money.

## Proposed scope
Phase 1: photo capture, field reading, category suggestion, policy rules,
card match. Phase 2: project code suggestion, once assignments move out
of spreadsheets.
```

---

## Step 4 · Heimdall (Systems Architect)

**Prompt:** `/viking-design map`

```
## Things
Receipt, Expense line, Card transaction, Policy rule, Report

## States (per object)
Receipt: Captured | Reading | Read | Unreadable
Expense line: Draft | Needs review | Ready | Flagged | Submitted
Card transaction: Unmatched | Matched | Mismatch

## Rules
- When a Receipt is Read -> create an Expense line in Needs review.
- When the total is confirmed AND a Card transaction matches within
  $0.01 -> mark Matched.
- When the total differs from the card by more than $0.01 -> Mismatch.
  Show both amounts. The employee picks one.
- When total > $75 AND no itemized receipt -> Flagged. Block submit.
- When category confidence < 0.6 -> show category empty, not guessed.
- When reading takes > 3s -> let the employee type it in instead.
- When a card charge has no receipt after 7 days -> draft the Expense line
  from the card feed, marked "No receipt."

## AI Placement
Photo -> AI reads merchant, date, total, category -> Employee confirms
total and category -> Rules engine checks policy -> Expense line Ready

## Mirror
Card charge with no receipt -> line drafted from the card feed ->
3+ in a month -> employee sees it on their next report -> 3 months
running -> shows in the manager's monthly summary

## Technical Constraints
- Reading takes 1-4s. Past the 400ms Doherty threshold, so "Reading"
  is a designed state, not a spinner.
- Card feed lags up to 2 days. Unmatched is normal, not an error.
```

The confidence threshold matters. A wrong category the employee doesn't notice is worse than an empty one they have to fill.

The card-feed rule is where the Mirror Rule earns its place. Drafting the line from the card charge fixes this month's report. It doesn't fix the person who never keeps receipts. Without the mirror, the AI papers over the same gap every month, and nobody owns it.

---

## Step 5 · Loki (Flow Designer)

**Prompt:** `/viking-design shape`

```
## Recipes: Receipt capture

### Task flow
Photo -> Reading -> Review card -> Confirm -> Ready (or Flagged -> Fix -> Ready)

### Recipe: Review card
**Appears when:** Expense line is Needs review
**Shows:** Total (large, editable), merchant, date, category, receipt thumbnail
**Hides:** Project code until the employee taps "Add details." Most people
use their last one.
**Primary action:** Confirm
**AI states:** Before (photo) | In progress (fields fill in as read) |
After (all fields, total highlighted to check) | Failed (empty form,
photo stays visible)

### Recipe: Mismatch
**Appears when:** Card transaction is Mismatch
**Shows:** Both amounts side by side. Nothing else.
**Primary action:** Pick the right amount

### Edge cases
| Case | What the user sees | Recovery |
|---|---|---|
| Photo unreadable | Empty form with photo beside it | Type it in |
| Low-confidence category | Category empty, not guessed | Pick from recent 5 |
| Card not posted yet | "Card match pending" note | Nothing; matches later |
| Over $75, no itemized | Submit blocked, reason shown | Add a second photo |
| 3+ charges with no receipt this month | "3 charges this month had no receipt" on the report | Add photos, or submit as is |

### Copy moments
Reading state, review heading, total check, mismatch, unreadable,
policy flag, card pending
```

Keyboard path: total field gets focus first, Enter confirms. Tip and total are separate fields because "tip left out" was the top return cause.

---

## Step 6 · Bragi (Content Designer)

**Prompt:** `/viking-design content`

```
## Content Spec: Receipt capture

### Voice & Tone
Calm and quick. The person is busy. Say what happened and what to do.

### Content Inventory
| Surface | Element | Recommended Copy | Rationale |
|---|---|---|---|
| Reading | Status | Reading your receipt... | Names the thing, not the tech |
| Review card | Heading | Check the total | The one field that must be right |
| Review card | Button | Looks right | Confirms a check, not a form |
| Mismatch | Heading | These don't match | Plain and specific |
| Mismatch | Body | Your receipt says $48.20. Your card was charged $56.20. Which one is right? | Both numbers, one question |
| Unreadable | Body | We couldn't read this one. Type it in below; the photo stays attached. | Problem, fix, reassurance |
| Policy flag | Body | Receipts over $75 need the itemized copy. Add a photo of it to submit. | Rule and fix in two lines |
| Card pending | Note | Card match pending. Usually 1-2 days. | Not an error, so no red |

### The Sandwich Frame (AI)
- **Top:** "We filled this in from your photo." (deterministic)
- **AI Body:** Merchant, date, total, category. Max one line each. No
  adjectives. Empty beats wrong.
- **Bottom:** "Check the total" + Looks right / Edit (deterministic)
```

No "smart," no "magic," no "AI-powered." The employee doesn't need to know a model read the receipt. They need to know to check the total.

---

## Step 7 · Thor (Handoff Specialist)

**Prompt:** `/viking-design craft`

```
## Spec: Receipt capture

### States
#### Needs review
**Trigger:** Receipt is Read
**Components:** ReviewCard, MoneyField (total, focused), MoneyField (tip),
CategoryPicker, ReceiptThumb, PrimaryButton
**Tokens:** geist-sans; total 28px/600; body 16px/400; spacing 16px

#### Reading
**Trigger:** Photo captured
**Components:** ReceiptThumb, StatusLine (aria-live="polite"), FieldSkeleton x4
**Rule:** After 3s, show "Type it in instead" link

#### Mismatch
**Trigger:** |receipt total - card amount| > 0.01
**Components:** AmountChoice x2, PrimaryButton (disabled until picked)

### Acceptance Criteria
- [ ] Total from photo is never submitted without the employee confirming it -> Pass/Fail
- [ ] Category with confidence < 0.6 renders empty -> Pass/Fail
- [ ] Total > $75 without itemized receipt blocks submit -> Pass/Fail
- [ ] Unreadable photo shows the empty form within 4s, photo still attached -> Pass/Fail

### QA Checklist
- [ ] Reading state announces via aria-live
- [ ] Total field has focus when Review card opens; Enter confirms
- [ ] Mismatch shows both amounts as text, not color alone
- [ ] All touch targets >= 44x44px
- [ ] Body text contrast >= 4.5:1
```

---

## After the chain · Odin's audit

**Prompt:** `/viking-design audit src/receipts`

The slop detector runs first:

```
🛡️  EYE OF MIMIR: Design Slop Detected
------------------------------------
[Generic AI Purple Gradient] src/receipts/review-card.css: REJECT: Found generic AI-marketing purple/blue gradient. ...
[Gradient Text] src/receipts/review-card.css: REJECT: Gradient text is decorative slop. ...
```

Someone styled the "We filled this in" banner like an AI product launch. Odin's critique: the banner is the deterministic top of the sandwich. It should look like the rest of the app, because it *is* the app talking, not the model. Solid surface, regular weight, same type as the form.

Fix, rerun, pass.

---

## What the chain changed

The ask was "AI does it all." What shipped:

- **AI** reads the receipt and suggests a category.
- **The employee** confirms the total, every time.
- **Rules** handle policy. No model guessing at what's allowed.
- **Nothing** suggests the project code yet. The data isn't there.
- **A mirror** shows the pattern when the AI keeps filling the same gap, so missing receipts become a habit someone owns instead of a fix nobody sees.

That's the point of running the gates first. The best AI feature here is smaller than the ask, and it's the one that hits the 8% goal.
