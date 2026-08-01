function monstersById(adventure) {
  var map = {};
  (adventure.monsters || []).forEach(function (m) { map[m.id] = m; });
  return map;
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
      '<p class="monster-special">' + escapeHtml(m.special) + '</p>' +
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

function renderReadAloud(text) {
  return (
    '<div class="read-aloud"><span class="tag">Read aloud</span>' +
    escapeHtml(text) + '</div>'
  );
}

function renderNotes(notes) {
  return notes.map(function (n) {
    return '<p class="dm-note">' + escapeHtml(n) + '</p>';
  }).join('');
}
