---
name: create-adventure
description: Create a new RPG Helper adventure (synopsis, data.js scenes, monsters, registry entry) for the rpg-helper project. Use when the user asks to add, create, or write a new adventure or follow-up adventure in adventures/.
---

# Create Adventure

RPG Helper adventures are plain JS data files loaded at runtime by URL hash. Creating one
involves four artifacts: a synopsis, a `data.js`, optional new monsters, and a registry
entry. Confirm the story with the user before building `data.js`.

## Workflow

### 1. Synopsis (`adventure.md`)
- Create `adventures/<slug>/docs/` and write `adventure.md`.
- Mirror the existing structure: title line, italic tagline (`*A tabletop RPG adventure
  for N players, level X, lasting ... hours.*`, plus follow-up note), `## The Hook`,
  `## The Party's Objectives` (bulleted), `---`, `## The Storyline` (numbered chapters),
  `## Epilogue`.
- Before writing `data.js`, get user sign-off on title, theme, and the discovery/payoff.
  Ask targeted questions (e.g. what the players find) instead of inventing everything.

### 2. Data file (`data.js`)
- Create `adventures/<slug>/data.js` copying an existing adventure's shape:
  - Self-filtering re-registration first:
    `window.RPG_HELPER.adventures = window.RPG_HELPER.adventures.filter(a => a.id !== '<slug>');`
  - Fields: `id`, `title`, `meta {players, level, duration}`, `intro`, `objectives[]`,
    `documents[]`, `monsters[]`, `scenes[]`.
- Each scene: `id`, `title`, `images[]` via placeholder paths under
  `adventures/<slug>/images/`, optional `readAloud` + `readAloudNo` (Norwegian), plus
  `environment`, `enemies[]`, `notes[]`, `tactics[]`, `aftermath`. Scenes always use an
  `images[]` array (never a singular `image` field). Combat scenes may add an
  optional `battlemap`: either a physical-book library id string (e.g. `'ttb1-p31-l-underground'`
  from `library/battlemaps/data.js` — prefer these) or a local image path; the DM screen's
  Combat toggle swaps to it (tagged "Map") and hides non-combat details, so scenes without one
  simply keep their scene image.
- Enemy entries: `{id: '<monster-id>', count: n}`; add `optional: true` for optional waves.
- End scenes with `{id: 'monster-gallery', title: 'Monster Gallery', images: [...], gallery: true}`.
- Provide `readAloudNo` for every `readAloud`; the DM language toggle falls back to English.

### 3. Monsters
- Reuse ids from `adventures/monsters.js` (shared library) when they fit.
- New monsters: register in `adventures/monsters.js` EXACTLY ONCE, keyed by id, matching the
  stat format `id, name, role, ac, hp, speed, hit, damage, special` (`special` is string or array).
- Choose monsters thematic to the setting (e.g. underground adventure -> dwarven undead,
  constructs, fire elementals) rather than reusing surface monsters.
- List every monster used in the adventure's `monsters[]` array (pointers into the library).

### 4. Registry (`adventures/index.js`)
- Push a meta entry: `id, title, blurb ('4 players · Level X · duration'), synopsis, image,
  source, status`.
- `status` is one of `ready` (ready to run, rendered normally), `running` (currently being
  played, green highlight on the card), `wip` (still being written, faded `opacity: .45`),
  or `completed` (hidden on index.html behind the "Show completed adventures" toggle).

## Conventions
- ES5-style code, 4-space indentation in data files, single quotes, string concat with `+`.
- Escape dynamic content with `escapeHtml()` in render code; data files only store text.
- Image paths are placeholders until assets exist: `adventures/<slug>/images/<name>.jpg`.

## Verification
- `node --check` on `adventures/<slug>/data.js`, `adventures/monsters.js`, `adventures/index.js`.
- Smoke-test that all monster pointers resolve:
  ```
  node -e "global.window={}; require('./adventures/monsters.js'); require('./adventures/<slug>/data.js'); var adv=window.RPG_HELPER.adventures.find(a=>a.id==='<slug>'); console.log(adv.monsters.filter(id=>!window.RPG_HELPER.monsters[id]));"
  ```
  Expected output: `[]`.
