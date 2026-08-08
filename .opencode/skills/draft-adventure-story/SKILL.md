---
name: draft-adventure-story
description: Design the story for a new RPG Helper adventure before building it — premise, DnD tropes, hook, objectives, scene-by-scene beats, and encounters drawn from the shared monster library (plus invented monsters). Use when the user asks to draft, plot, brainstorm, outline, or pitch an adventure story or adventure idea. The story front-end to create-adventure: run this first to craft the narrative, then run create-adventure to build data.js, monsters, and the registry entry.
---

# Draft Adventure Story

This skill writes the **story** — not the JSON. It produces the `docs/adventure.md`
synopsis that the `create-adventure` skill formalizes into `data.js`, monster stat
blocks, and a registry entry. It never touches `data.js`, `adventures/monsters.js`,
or `adventures/index.js`; those are `create-adventure`'s job.

## Workflow

### 1. Load context (read-only)
- Read `adventures/monsters.js` and inventory the monster shelf by theme/role:
  - **Goblinoid pack:** goblin-skirmisher, goblin-archer, goblin-hexer,
    hobgoblin-soldier, hobgoblin-captain, bugbear-brute, worg.
  - **Dwarven ruin:** dwarven-shade, mine-crawler, ember-elemental,
    forge-guardian, keldor-graymantle.
  - **Swamp/undead:** marsh-hound, will-o'-wisp, spirit-guardian, bark-touched,
    bog-witch.
  - New monsters may be invented as the story demands (see Monsters policy).
- Also draw on **common and uncommon D&D monsters** from the wider canon
  (SRD/Monster Manual staples): goblins, kobolds, orcs, hobgoblins, bugbears,
  wolves and dire wolves, giant rats and giant spiders, zombies, skeletons,
  ghouls, shadows, cultists, ogres, and similar low-level picks. Prefer library
  monsters when they fit; canonical monsters are fair game when they suit the
  story better. They ship as proposed stat blocks too (see Monsters policy).
- Optionally scan `library/battlemaps/data.js` ids so scene suggestions can point
  at real maps.
- Match the output contract of `create-adventure` (see its skill).

### 2. Frame the request
Ask a small set of targeted questions; use defaults where the user has no
preference:
- **Scope:** full adventure (3–5 scenes) or standalone scene (1–3 scenes,
  `kind: 'single-scene'`)?
- **Party:** player count and level (default 4 players, level 3).
- **Session length** (default 3–4 hours; 1–1.5 hours for a standalone).
- **Tone** (grimdark, heroic, whimsical, horror…).
- **Preferred trope seed** — or let the skill pitch options.
- **Creatures the user wants included**, if any.
Don't over-question; a session's worth of defaults is fine.

### 3. Pitch 2–3 premises
Each premise pairs a classic DnD trope with the monster cast it can use. Offer a
mix, note which monsters already exist in the library and which would be new, and
let the user pick or combine. Example trope seeds: the sealed evil, the cursed
village, the doomed festival, the heist gone wrong, the missing heir, the rival,
the broken contract, mercy-vs-vengeance, the thing that was once human.

### 4. Draft the story (the deliverable)
Write the full story in the existing `docs/adventure.md` format:
title line, italic tagline (`*A tabletop RPG adventure for N players, level X,
lasting ... hours.*`), `## The Hook`, `## The Party's Objectives` (bulleted),
`---`, `## The Storyline` (numbered chapters), `## Epilogue`.

For every storyline chapter, annotate the scene so `create-adventure` can lift it
into `data.js`:
- `title`
- `setting` — where it happens (→ `environment`)
- `beat` — the trope/dramatic moment (→ `readAloud` seed + `notes`)
- `enemies` — as `{monster, count}` using library ids; mark optional waves
  (`optional: true`)
- `tactics` — how the monsters fight
- `aftermath` — the clue or lead into the next scene
- `battlemap` suggestion — a library id from `library/battlemaps/data.js` when one
  fits, otherwise leave to `create-adventure`
- a `readAloud` sketch, and a note when a Norwegian (`readAloudNo`) translation
  is still needed

Close the story with a `## Monsters Used` section listing every monster: existing
library ids (with their role) and any new monsters as full proposed stat blocks.

### 5. Grill before sign-off
Run the `grill-me` skill in **Story mode** on the draft. Address Blocking and
Should-fix findings before presenting for approval.

### 6. Approval gate
Present the draft in chat and get the user's sign-off on the title, theme, hook,
and payoff. Iterate on feedback. Do not save until approved.

### 7. Save on approval
Create `adventures/<slug>/docs/` and write `adventure.md` with the approved story.
The slug is the kebab-case id (e.g. `the-witchwood-wards`). Do **not** write
`data.js` or touch the monster library.

### 8. Handoff
Tell the user the story is approved and saved, and to run `create-adventure` to
build the data file, monster stat blocks, and registry entry. `create-adventure`
will detect the existing `adventure.md` and reuse it.

## Monsters policy
- Reuse existing library monsters where they fit the theme.
- Draw on common and uncommon D&D monsters from the wider canon (SRD/Monster
  Manual staples) when they fit the story better than the shelf.
- Invent new monsters freely when the story demands them; they ship as proposed
  stat blocks so `create-adventure` registers them exactly once.
- Every creature used appears in `## Monsters Used` — nothing fights unlisted.
- Stat blocks for non-library monsters (canonical or invented) are adapted to the
  library's terse format — not copied verbatim. They match the `monsters.js`
  format: `id, name, role, ac, hp, speed, hit, damage, special` (`special` is a
  string or array of strings).

## Story craft rules
- **Hook:** concrete and actionable — the DM can start in one paragraph.
- **Objectives:** few, clear, and each drives at least one scene.
- **Pacing:** escalating stakes, a mid-story twist or complication, a payoff with
  a meaningful choice, an epilogue that closes the loop.
- **Balance:** use the `role` field for encounter building — bosses ~45–85 HP for
  levels 3–5, minions ~10–30 HP; optional waves and add-ons for pacing.
  Common/uncommon D&D monsters are low-CR staples; keep them in the app's
  level 1–5 range.

## Conventions
- Match the markdown style of existing `adventures/*/docs/adventure.md` files.
- Docs hold prose only; data fields live in `data.js` (written by
  `create-adventure`).
- `readAloud` has an English sketch; a Norwegian translation is expected to be
  added in `create-adventure`.

## Verification
- No JS is written, so `node --check` does not apply.
- Confirm every existing monster id referenced in the draft exists in
  `adventures/monsters.js`; every new id appears as a stat block in
  `## Monsters Used`.
- Confirm the saved `adventure.md` parses into the sections `create-adventure`
  expects (title, tagline, Hook, Objectives, Storyline, Epilogue).
