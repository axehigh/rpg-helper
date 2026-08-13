---
name: create-adventure
description: Create a new RPG Helper adventure (synopsis, adventure.md scenes, monsters, registry entry) for the rpg-helper project. Use when the user asks to add, create, or write a new adventure or follow-up adventure in adventures/.
---

# Create Adventure

RPG Helper adventures are markdown data files (`adventures/<slug>/adventure.md`) parsed
at runtime by `js/markdown-loader.js` into adventure objects. Creating one involves four
artifacts: a synopsis, an `adventure.md`, optional new monsters, and a registry entry.
Confirm the story with the user before building `adventure.md`.

## Workflow

### 1. Synopsis (`docs/adventure.md`)
- If `adventures/<slug>/docs/adventure.md` already exists (e.g. written by the
  `draft-adventure-story` skill), read and reuse it instead of rewriting. Only
  adjust it if the user asks.
- Otherwise, create `adventures/<slug>/docs/` and write `adventure.md`.
- Mirror the existing structure: title line, italic tagline (`*A tabletop RPG adventure
  for N players, level X, lasting ... hours.*`, plus follow-up note), `## The Hook`,
  `## The Party's Objectives` (bulleted), `---`, `## The Storyline` (numbered chapters),
  `## Epilogue`.
- Before writing `adventure.md`, get user sign-off on title, theme, and the discovery/payoff.
  Ask targeted questions (e.g. what the players find) instead of inventing everything.

### 2. Data file (`adventure.md`)
- Create `adventures/<slug>/adventure.md` copying the shape of
  `adventures/shadows-of-blackstone-keep/adventure.md` (the reference adventure):
  - `---` frontmatter: `id`, `title`, optional `kind` (`single-scene` for standalone
    adventures), `players`, `level`, `duration`, `monsters` (comma-separated ids).
  - `# Intro` (prose, one sentence per line), `# Objectives` (bullets),
    `# Documents` (`- label -> href`, one per line).
  - One `# Scene: <Title>` block per scene:
    - Leading `- key: value` bullets: `- id:`, `- images:` (nested `- path` bullets,
      placeholder paths under `adventures/<slug>/images/`), optional `- battlemap:`
      (either a physical-book library id from `library/battlemaps/data.js` or a local
      image path), optional `- gallery: true`.
    - Sub-sections as `##` headings: `## Read Aloud`, `## Read Aloud (Norsk)`,
      `## Environment`, `## DM Notes` (bullets), `## Enemies` (bullets: `id xN (optional)`
      → `{id, count, optional}`), `## Tactics & Synergy` (bullets),
      `## Aftermath & Clues`.
- Enemy bullets: `goblin-skirmisher x4`, `goblin-hexer x1 (optional)`; bare `id` = count 1.
- End scenes with a gallery scene (`- id: monster-gallery`, `- gallery: true`).
- Provide `readAloudNo` for every `readAloud`; the DM language toggle falls back to English.
- `kind: 'single-scene'` goes in the frontmatter AND the registry entry for standalone
  scenes (1–3 scenes + gallery).

### 3. Monsters
- Reuse ids from `adventures/monsters.js` (shared library) when they fit.
- New monsters: register in `adventures/monsters.js` EXACTLY ONCE, keyed by id, matching the
  stat format `id, name, role, ac, hp, speed, hit, damage, special` (`special` is string or array).
- Choose monsters thematic to the setting (e.g. underground adventure -> dwarven undead,
  constructs, fire elementals) rather than reusing surface monsters.
- List every monster used in the frontmatter `monsters` list (ids into the library).

### 4. Registry (`adventures/index.js`)
- Push a meta entry: `id, title, blurb ('4 players · Level X · duration'), synopsis, image,
  source: 'adventures/<slug>/adventure.md', status`.
- `status` is one of `ready` (ready to run, rendered normally), `running` (currently being
  played, green highlight on the card), `wip` (still being written, faded `opacity: .45`),
  or `completed` (hidden on index.html behind the "Show completed adventures" toggle).
- The registry entry is the single source of truth for the card; `adventure.md` supplies
  the full object. `status: 'ready'` is typical for standalone scenes, which appear under
  a separate "Standalone Scenes" section with a purple "Scene" badge.

## Conventions
- Keep the same `#`/`##` section names as the reference adventure — the parser maps
  headings by name (`read aloud`/`read aloud norsk`/`environment`/`dm notes`/`enemies`/
  `tactics synergy`/`aftermath clues`).
- Prose blocks (Intro, Read Aloud, Environment, Aftermath) flatten to a single paragraph,
  so put each sentence or fragment on its own line.
- Image paths are placeholders until assets exist: `adventures/<slug>/images/<name>.jpg`.

## Verification
- Before finalizing, run the `grill-me` skill on the finished adventure: Story
  mode for the narrative beats and payoff, Tech mode for the data files.
- Run `node scripts/validate.js` and confirm it ends with `ALL_OK`.
- Smoke-test that all monster pointers resolve:
  ```
  node -e "global.window={RPG_HELPER:{monsters:{}}}; require('./adventures/monsters.js'); var fs=require('fs'),parse=require('./js/markdown-loader.js'); var adv=parse(fs.readFileSync('adventures/<slug>/adventure.md','utf8')); console.log((adv.monsters||[]).filter(id=>!window.RPG_HELPER.monsters[id]));"
  ```
  Expected output: `[]`.
