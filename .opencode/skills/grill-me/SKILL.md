---
name: grill-me
description: Adversarial review of either a DnD adventure/story draft (hook, objectives, pacing, tropes, encounters, monsters) or a technical feature/code change (correctness, security, conventions, edge cases). Use when the user asks to grill, review, critique, stress-test, or validate an adventure, story draft, feature, or code change — or when invoked as a gate by another skill.
---

# Grill Me

Grill-me is a dual-mode critique skill. It stress-tests a DnD adventure story
**or** a technical feature/code change like a skeptical reviewer — never a
rubber stamp. The output is a severity-ranked report with a clear verdict.

## Workflow

### 1. Detect the mode
- **Story mode** — the target is a DnD story: an adventure premise, plot draft,
  `adventures/<slug>/docs/adventure.md`, scene beats, monsters, or encounters.
- **Tech mode** — the target is code or a feature change: JS/HTML/CSS files,
  DM/player/render logic, the sync API, new tabs/panels, skills, etc.
- If the target is an adventure being built (has both narrative and files),
  grill **both modes**. Ask the user if the mode is ambiguous.

### 2. Understand the target first
- Read the target file(s) and their context before judging.
- Read `AGENTS.md` for project conventions, and the relevant skill
  (`draft-adventure-story`, `create-adventure`) when the target is an adventure.
- For story grills, inventory `adventures/monsters.js` so every monster id can be
  checked against the library.

### 3. Grill — adversarial questioning
Probe with concrete, pointed questions. Challenge assumptions, hunt for holes,
edge cases, and weak spots. No flattery, no hedging. Push back where the work is
vague, unbalanced, or unsafe. Ask before asserting when the draft is genuinely
under-specified.

### 4. Report — severity-ranked findings
For each finding, state: **severity**, what and where, why it matters, and a
suggested fix.

- **Blocking** — must be fixed before proceeding (e.g. broken promise in the
  plot, unescaped user data, unresolvable monster id).
- **Should fix** — worth fixing now; the work is weaker without it.
- **Nice to have** — polish or optional.

End with:
- **Verdict:** ready · ready-with-fixes · rework.
- **Open questions** for the user (things only they can decide).

## Story mode checklist
- **Hook:** concrete and actionable? Can the DM drop the party in with one
  paragraph? Does the party have a reason to care?
- **Objectives:** clear, few, and each one drives at least one scene? No dead ends.
- **Pacing:** escalating stakes, a mid-story twist or complication, a payoff with
  a meaningful choice, an epilogue that closes the loop. Any filler or rushed beats?
- **Tropes:** used freshly, not as lazy clichés? Does the twist land or is it
  telegraphed?
- **Monsters:** every referenced id resolves in `adventures/monsters.js`, or ships
  as a proposed stat block (canonical D&D or invented) in `monsters.js` format for
  `create-adventure` to register; every monster used is listed; encounter
  composition (boss + minions, optional waves) balances against the party level
  using the `role` field.
- **Scene mapping:** each storyline chapter maps cleanly to `data.js` fields —
  `setting` → `environment`, `beat` → `readAloud`/`notes`, plus `enemies`,
  `tactics`, `aftermath`, optional `battlemap`.
- **Localization:** a `readAloudNo` (Norwegian) is present or planned for every
  `readAloud`; the tagline and objectives match project style.
- **Format fit:** `docs/adventure.md` structure matches existing adventures;
  scope (`kind: 'single-scene'` vs full) and slug/registry `status` are right.

## Tech mode checklist
- **Security:** every piece of dynamic content escaped with `escapeHtml()` before
  `innerHTML` — never raw interpolation of user/adventure data.
- **Conventions:** ES5 `var`-based style matching the file being edited; single
  quotes; hash-based routing; scene sync through the `Sync` object — never direct
  `localStorage`/`BroadcastChannel`/`/api/scene` access.
- **Correctness & edge cases:** null/empty/optional data, error paths, event
  listeners cleaned up, no stale DOM references, no unbounded loops on input.
- **UX & accessibility:** sensible keyboard support, `aria-pressed`/`hidden`
  state toggling, no layout regressions.
- **Verification:** concrete check to run (`node --check`, manual flow, smoke
  test) and the expected result.
