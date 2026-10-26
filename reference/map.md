# Viking Design Framework: System Mapping

Use the **Things, States, Rules** framework to define the logic before designing the UI.

## 1. Things
What are the main objects in the system?
- User, Project, Message, Task, Document, Session.

## 2. States
What conditions can each thing be in?
- Loading, Empty, Error, Ready, Done, Locked, Pending.

## 3. Rules
What causes a change? What happens next? Who needs to know?
- "When a Task moves to Done, notify the User."
- "When a Session times out, clear the context."

## 4. AI-Specific Logic
- **Where** does the AI step in?
- **Where** does it hand back to the human?
- **What** happens when it's slow, wrong, or unsure?
- **What** can stay invisible (Blackbox) vs. what must be seen (Glassbox)?
- **What** is the AI filling in that a person was supposed to do? Who sees the pattern, and when?

## 5. The Mirror
Fix the instance. Reflect the pattern.
Background: [Why Predictive UX Needs a Reflective Mirror](https://medium.com/@kartooner/why-predictive-ux-needs-a-reflective-mirror-1056743438d6).

For every gap the AI fills, map:
- **The gap:** what was missing, and whose job it was.
- **The pattern:** when one fix becomes a habit (e.g., 3 missing punches in 2 weeks).
- **The mirror:** who sees it first (the person), then who is accountable (their manager).
- "When a missing punch is filled from the schedule, mark it as filled. When one employee has 3 in 2 weeks, show them first, then include it in their manager's weekly summary."
