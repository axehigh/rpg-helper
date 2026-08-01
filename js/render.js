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

function specialLines(m) {
  var s = m.special;
  var lines = Array.isArray(s) ? s : [s];
  return lines.map(escapeHtml).join('<br>');
}

function monsterCard(m) {
  return (
    '<div class="monster-card">' +
      '<div class="monster-head">' +
        '<h3>' + escapeHtml(m.name) + '</h3>' +
        '<span class="monster-role">' + escapeHtml(m.role) + '</span>' +
      '</div>' +
      '<div class="monster-stats">' +
        '<span><b>AC</b> ' + escapeHtml(m.ac) + '</span>' +
        '<span><b>HP</b> ' + escapeHtml(m.hp) + '</span>' +
        '<span><b>Spd</b> ' + escapeHtml(m.speed) + '</span>' +
        '<span><b>Hit</b> ' + escapeHtml(m.hit) + '</span>' +
        '<span><b>DMG</b> ' + escapeHtml(m.damage) + '</span>' +
      '</div>' +
      '<p class="monster-special">' + specialLines(m) + '</p>' +
    '</div>'
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
    return monsterCard(m).replace('<h3>', '<h3>' + escapeHtml(prefix));
  }).join('');
}

function renderReadAloud(text, tag) {
  return (
    '<div class="read-aloud"><span class="tag">' + (tag || 'Read aloud') + '</span>' +
    escapeHtml(text) + '</div>'
  );
}

function renderNotes(notes) {
  return notes.map(function (n) {
    return '<p class="dm-note">' + escapeHtml(n) + '</p>';
  }).join('');
}

function renderBox(content) {
  return '<div class="dm-box">' + content + '</div>';
}

function renderOverview(adventure) {
  var html = '';
  if (adventure.intro) {
    html += '<div class="dm-box"><span class="tag">Intro</span><p>' + escapeHtml(adventure.intro) + '</p></div>';
  }
  if (adventure.objectives && adventure.objectives.length) {
    html += '<div class="dm-box"><span class="tag">Objectives</span>' + renderNotes(adventure.objectives) + '</div>';
  }
  return html;
}
