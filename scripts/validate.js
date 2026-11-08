'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..', 'app');
var errors = [];
var warnings = [];

function rel(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function exists(file) {
  return fs.existsSync(path.join(ROOT, file));
}

function error(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// wip adventures legitimately use placeholder image paths until assets exist.
function missingImage(reg, msg) {
  if (reg && reg.status === 'wip') warn(msg);
  else error(msg);
}

function requireFile(relPath, desc) {
  try {
    return require(path.join(ROOT, relPath));
  } catch (e) {
    error(desc + ': failed to load ' + relPath + ' (' + e.message + ')');
    return null;
  }
}

global.window = { adventures: [] };

var registry = requireFile('adventures/index.js') && window.RPG_HELPER.adventures;
var monsters = (requireFile('adventures/monsters.js') && window.RPG_HELPER.monsters) || {};
var battlemaps = (requireFile('library/battlemaps/data.js') && window.RPG_HELPER.battlemaps) || [];
var parseAdventureMarkdown = requireFile('js/markdown-loader.js');

// --- Registry ---
if (registry) {
  var seenIds = {};
  var validStatus = { ready: 1, running: 1, wip: 1, completed: 1 };
  registry.forEach(function (a) {
    if (seenIds[a.id]) error('Registry: duplicate id "' + a.id + '"');
    seenIds[a.id] = true;
    if (a.status && !validStatus[a.status]) warn('Registry: unknown status "' + a.status + '" for "' + a.id + '"');
    if (!a.status) warn('Registry: "' + a.id + '" has no status');
    if (a.image && !exists(a.image)) missingImage(a, 'Registry: image not found for "' + a.id + '": ' + a.image);
    if (a.source && !exists(a.source)) error('Registry: source not found for "' + a.id + '": ' + a.source);
  });
}

// --- Battlemap library ---
(function () {
  var seen = {};
  battlemaps.forEach(function (b) {
    if (seen[b.id]) error('Battlemaps: duplicate id "' + b.id + '"');
    seen[b.id] = true;
    if (!b.src || !exists(b.src)) error('Battlemaps: src not found for "' + b.id + '": ' + (b.src || '(none)'));
  });
})();

// --- Monsters ---
Object.keys(monsters).forEach(function (id) {
  var m = monsters[id];
  if (!m.id || m.id !== id) error('Monsters: key "' + id + '" has id "' + (m && m.id) + '"');
  if (!m.name) warn('Monsters: "' + id + '" has no name');
});

// --- Adventures ---
function loadAdventureObject(reg) {
  if (/\.md$/i.test(reg.source)) {
    if (!parseAdventureMarkdown) { error(reg.id + ': markdown loader missing'); return null; }
    var text;
    try {
      text = fs.readFileSync(path.join(ROOT, reg.source), 'utf8');
    } catch (e) {
      error(reg.id + ': failed to read ' + reg.source + ' (' + e.message + ')');
      return null;
    }
    var adv;
    try {
      adv = parseAdventureMarkdown(text);
    } catch (e) {
      error(reg.id + ': failed to parse ' + reg.source + ' (' + e.message + ')');
      return null;
    }
    if (reg.documents) {
      try {
        require(path.join(ROOT, reg.documents));
      } catch (e) {
        error(reg.id + ': failed to load documents sidecar ' + reg.documents + ' (' + e.message + ')');
      }
    }
    return adv;
  }
  require(path.join(ROOT, reg.source));
  return window.RPG_HELPER.adventures.find(function (a) { return a.id === reg.id; }) || null;
}

function validateAdventure(reg) {
  var adv = loadAdventureObject(reg);
  if (!adv) {
    error(reg.id + ': data file did not register an adventure with id "' + reg.id + '"');
    return;
  }
  if (adv.id !== reg.id) error(reg.id + ': registered under wrong id "' + adv.id + '"');

  var scenes = adv.scenes || [];
  var sceneIds = {};
  scenes.forEach(function (s) {
    if (!s.id) { error(reg.id + ': scene without an id'); return; }
    if (sceneIds[s.id]) error(reg.id + ': duplicate scene id "' + s.id + '"');
    sceneIds[s.id] = true;
    if (!s.title) warn(reg.id + ': scene "' + s.id + '" has no title');

    var imgs = s.images || [];
    if (!imgs.length) warn(reg.id + ': scene "' + s.id + '" has no images');
    imgs.forEach(function (p) {
      if (!exists(p)) missingImage(reg, reg.id + ': scene "' + s.id + '" image not found: ' + p);
    });

    if (s.battlemap) {
      if (typeof s.battlemap === 'string') {
        var bm = battlemaps.find(function (b) { return b.id === s.battlemap; });
        if (bm) {
          if (!exists(bm.src)) error(reg.id + ': scene "' + s.id + '" battlemap "' + s.battlemap + '" src missing: ' + bm.src);
        } else if (!exists(s.battlemap)) {
          error(reg.id + ': scene "' + s.id + '" battlemap unresolved (not a library id and no such file): ' + s.battlemap);
        }
      } else {
        warn(reg.id + ': scene "' + s.id + '" battlemap is not a string; expected a library id or file path');
      }
    }

    (s.enemies || []).forEach(function (e) {
      if (!e.id) { error(reg.id + ': scene "' + s.id + '" has an enemy without an id'); return; }
      if (!monsters[e.id]) error(reg.id + ': scene "' + s.id + '" enemy id "' + e.id + '" is not in the monster library');
    });
  });

  (adv.monsters || []).forEach(function (id) {
    if (!monsters[id]) error(reg.id + ': monsters[] pointer "' + id + '" is not in the monster library');
  });

  var docEntry = window.RPG_HELPER.adventures.find(function (a) { return a.id === reg.id; });
  ((docEntry && docEntry.documents) || []).forEach(function (d) {
    if (d.href && !exists(d.href)) warn(reg.id + ': document href not found: ' + d.href);
  });
}

if (registry) {
  registry.forEach(function (reg) {
    if (!reg.source) return;
    if (exists(reg.source)) validateAdventure(reg);
    else error(reg.id + ': source missing, skipped');
  });
}

// --- Report ---
console.log((errors.length ? 'FAIL — ' : 'ALL_OK — ') +
  errors.length + ' error(s), ' + warnings.length + ' warning(s), ' +
  (registry ? registry.length : 0) + ' adventures, ' +
  Object.keys(monsters).length + ' monsters, ' + battlemaps.length + ' battlemaps');

errors.forEach(function (m) { console.log('ERROR  ' + m); });
warnings.forEach(function (m) { console.log('WARN   ' + m); });

process.exit(errors.length ? 1 : 0);
