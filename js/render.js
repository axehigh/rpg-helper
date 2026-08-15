function getAdventureMonsters(adventure) {
  return (adventure.monsters || []).map(function (id) {
    return window.RPG_HELPER.monsters[id];
  }).filter(function (m) { return !!m; });
}

function monstersById(adventure) {
  var map = {};
  getAdventureMonsters(adventure).forEach(function (m) { map[m.id] = m; });
  return map;
}

function monsterTraits(m) {
  var s = m.special;
  var lines = Array.isArray(s) ? s : [s];
  return lines.map(function (line) {
    var i = line.indexOf(':');
    if (i === -1) return '<span class="monster-trait"><span class="monster-trait-body">' + escapeHtml(line) + '</span></span>';
    var html = '<span class="monster-trait-tag">' + escapeHtml(line.slice(0, i).trim()) + '</span>';
    var body = line.slice(i + 1).trim();
    if (body) html += ' <span class="monster-trait-body">' + escapeHtml(body) + '</span>';
    return '<span class="monster-trait">' + html + '</span>';
  }).join('');
}

function monsterCard(m, opts) {
  opts = opts || {};
  var prefix = opts.prefix || '';
  var stats = (
    '<div class="monster-stats">' +
      '<span><b>AC</b> ' + escapeHtml(m.ac) + '</span>' +
      '<span><b>HP</b> ' + escapeHtml(m.hp) + '</span>' +
      '<span><b>Spd</b> ' + escapeHtml(m.speed) + '</span>' +
      '<span><b>Hit</b> ' + escapeHtml(m.hit) + '</span>' +
      '<span><b>DMG</b> ' + escapeHtml(m.damage) + '</span>' +
    '</div>'
  );
  var special = (m.special && m.special.length) ? '<div class="monster-special">' + monsterTraits(m) + '</div>' : '';
  return (
    '<details class="monster-card"' + (opts.open ? ' open' : '') + '>' +
      '<summary class="monster-head">' +
        '<h3>' + escapeHtml(prefix + m.name) + '</h3>' +
        '<span class="monster-meta">' +
          '<span class="monster-role">' + escapeHtml(m.role) + '</span>' +
          '<span class="monster-caret" aria-hidden="true">&#9656;</span>' +
        '</span>' +
      '</summary>' +
      stats + special +
    '</details>'
  );
}

function encounterList(adventure, enemies) {
  var map = monstersById(adventure);
  return (enemies || []).map(function (e) {
    var id = typeof e === 'string' ? e : e.id;
    var count = typeof e === 'string' ? 1 : (e.count || 1);
    var optional = typeof e === 'string' ? false : !!e.optional;
    var m = map[id];
    if (!m) return '';
    var prefix = '';
    if (optional) prefix += 'optional ';
    if (count > 1) prefix += count + ' x ';
    return monsterCard(m, { prefix: prefix, open: true });
  }).join('');
}

function sceneSection(title, content) {
  return (
    '<details class="scene-block" open>' +
      '<summary>' + escapeHtml(title) + '</summary>' +
      '<div class="scene-block-body">' + content + '</div>' +
    '</details>'
  );
}

function renderNotes(notes) {
  return notes.map(function (n) {
    return '<p class="dm-note">' + escapeHtml(n) + '</p>';
  }).join('');
}

function renderNoteBlocks(notes) {
  return notes.map(function (n) {
    var i = n.indexOf(':');
    if (i === -1) return '<section class="dm-note-block"><p>' + escapeHtml(n) + '</p></section>';
    var label = n.slice(0, i).trim();
    var body = n.slice(i + 1).trim();
    return '<section class="dm-note-block"><h4>' + escapeHtml(label) + '</h4><p>' + escapeHtml(body) + '</p></section>';
  }).join('');
}

function renderBox(content) {
  return '<div class="dm-box">' + content + '</div>';
}

function renderCombatBody(adventure, scene) {
  var html = '';
  if (scene.enemies && scene.enemies.length) html += sceneSection('Enemies', encounterList(adventure, scene.enemies));
  if (scene.tactics && scene.tactics.length) html += sceneSection('Tactics & Synergy', renderNoteBlocks(scene.tactics));
  if (!html) html += '<p class="no-combat">No combat details for this scene.</p>';
  return html;
}

function battlemapSourceHtml(info) {
  if (!info || !info.book) return '';
  var parts = [];
  if (info.page) parts.push('p. ' + info.page + (info.side ? ' (' + info.side + ')' : ''));
  if (info.location) parts.push(info.location);
  var pathLine = info.folder + '/' + info.filename;
  return (
    '<span class="book-hint" tabindex="0" role="tooltip" aria-label="Battle map book reference">' +
      '<span aria-hidden="true">&#8505;</span>' +
      '<span class="book-tip">' +
        '<strong>Battle map &mdash; find the book</strong>' +
        '<span class="book-loc">' + escapeHtml(info.book) +
          (parts.length ? ' &middot; ' + escapeHtml(parts.join(' &middot; ')) : '') +
        '</span>' +
        '<span class="file-path">' + escapeHtml(pathLine) + '</span>' +
      '</span>' +
    '</span>'
  );
}

function renderOverview(adventure) {
  var html = '';
  var count = (adventure.scenes || []).filter(function (s) { return !s.gallery; }).length;
  var metaParts = [];
  var meta = adventure.meta || {};
  if (meta.players) metaParts.push(meta.players + ' players');
  if (meta.level) metaParts.push('Level ' + meta.level);
  if (meta.duration) metaParts.push(meta.duration);
  if (count) metaParts.push(count + (count === 1 ? ' scene' : ' scenes'));
  if (metaParts.length) {
    html += '<div class="dm-box"><p class="dm-meta">' + escapeHtml(metaParts.join(' \u00b7 ')) + '</p></div>';
  }
  if (adventure.intro) {
    html += '<div class="dm-box"><span class="tag">Intro</span><p>' + escapeHtml(adventure.intro) + '</p></div>';
  }
  if (adventure.objectives && adventure.objectives.length) {
    html += '<div class="dm-box"><span class="tag">Objectives</span>' + renderNotes(adventure.objectives) + '</div>';
  }
  return html;
}
