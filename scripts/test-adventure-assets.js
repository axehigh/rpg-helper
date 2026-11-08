'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..', 'app');
var errors = [];
var warnings = [];

function exists(file) {
  return fs.existsSync(path.join(ROOT, file));
}

function error(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// wip adventures legitimately use placeholder image paths until assets exist.
function missingFile(reg, msg) {
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

var IMG_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;

if (registry) {
  registry.forEach(function (reg) {
    var slug = reg.id;

    // 1. The documents sidecar data.js must exist.
    var dataJs = reg.documents || 'adventures/' + slug + '/data.js';
    if (!exists(dataJs)) missingFile(reg, slug + ': missing data.js (documents sidecar): ' + dataJs);

    // 2. Every image referenced in adventure.md must exist.
    if (!/\.md$/i.test(reg.source || '')) return;
    var text;
    try {
      text = fs.readFileSync(path.join(ROOT, reg.source), 'utf8');
    } catch (e) {
      error(slug + ': failed to read ' + reg.source + ' (' + e.message + ')');
      return;
    }
    var refs = [];
    var m;
    while ((m = IMG_RE.exec(text)) !== null) refs.push(m[2].trim());
    if (reg.image) refs.push(reg.image);
    var seen = {};
    refs.forEach(function (src) {
      if (seen[src]) return;
      seen[src] = true;
      if (!exists(src)) missingFile(reg, slug + ': image not found: ' + src);
    });
  });
} else {
  error('Registry: failed to load adventures/index.js');
}

console.log((errors.length ? 'FAIL — ' : 'ALL_OK — ') +
  errors.length + ' error(s), ' + warnings.length + ' warning(s), ' +
  (registry ? registry.length : 0) + ' adventures');

errors.forEach(function (m) { console.log('ERROR  ' + m); });
warnings.forEach(function (m) { console.log('WARN   ' + m); });

process.exit(errors.length ? 1 : 0);
