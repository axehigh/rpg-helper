# AGENTS.md

RPG Helper — a tabletop RPG companion that runs a DM screen and a synced player view for an adventure.

## Project overview

- No frontend framework and no build step. Plain HTML, CSS, and vanilla JavaScript loaded via `<script>` tags.
- Node.js static server with a tiny sync API: `server.js`.
- Adventure content lives as plain JS data files (not a database) and is loaded at runtime by URL hash.

## Commands

- Start the local server: `npm start` (or `node server.js`). Serves on `http://localhost:8080`.
- No lint, typecheck, or test scripts are configured.

## Key pages and flows

- `index.html` — lists adventures from the registry; links to the DM screen.
- `dm.html#<adventure-id>` — DM screen: scenes, monsters, and documents tabs. Publishes the current scene.
- `player.html#<adventure-id>/<scene-id>` — player view; subscribes to scene sync and follows the DM.
- `js/dm.js` — DM screen logic; renders scenes, monsters, documents.
- `js/player.js` — player view logic; listens to `Sync` for scene changes.
- `js/render.js` — shared HTML-string render helpers (`monsterCard`, `encounterList`, `renderReadAloud`, `renderNotes`).
- `js/common.js` — shared globals: `loadScript`, `getAdventures`, `getAdventure`, `escapeHtml`, and the `Sync` pub/sub singleton (localStorage + BroadcastChannel + server polling).

## How adventures work

- `adventures/index.js` is the registry. Add a new adventure by pushing a meta entry with a `source` path and a unique `id`.
- Each adventure is its own data file (e.g. `adventures/<slug>/data.js`) that re-registers its full object on `window.RPG_HELPER.adventures`, filtering out any previous copy of itself first.
- Adventure shape: `id`, `title`, `scenes[]` (with `id`, `title`, `image`, `readAloud`, `environment`, `enemies`, `notes`, `tactics`, `aftermath`), `monsters[]` (with `id`, `name`, `role`, `ac`, `hp`, `speed`, `hit`, `damage`, `special`), `documents[]` (`{ label, href }`), plus optional `intro`/`objectives`.
- Document links render with `target="_blank"` so they open in a new tab.
- Resource files live under `resources/` (images in `resources/images`, documents in `resources/docs`).

## Conventions

- Use ES5-style `var`-based code in the `js/` files to match existing style; `js/common.js` uses modern syntax in helpers. Match the file you are editing.
- Escape all dynamic content with `escapeHtml()` before injecting into `innerHTML` — never interpolate user/adventure data unescaped.
- Hash-based routing: `#<adventure-id>` (DM) and `#<adventure-id>/<scene-id>` (player).
- Scene sync should go through the `Sync` object in `js/common.js`; do not reach into `localStorage`/`BroadcastChannel`/`/api/scene` directly.
- Keep shared render helpers in `js/render.js` and shared utilities in `js/common.js`.
