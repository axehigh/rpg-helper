(function () {
  var adventureId = location.hash.slice(1).split('/')[0];
  var adventure = null;
  var lang = (window.RPG_HELPER.config && window.RPG_HELPER.config.defaultReadAloudLang === 'no') ? 'no' : 'en';
  var scrollSaveQueued = false;
  var progressKey = 'rpg-helper-reader-position:' + adventureId;
  var els = {
    title: document.getElementById('readerTitle'),
    meta: document.getElementById('readerMeta'),
    index: document.getElementById('readerIndex'),
    content: document.getElementById('readerContent'),
    langBtn: document.getElementById('langBtn'),
    progress: document.getElementById('readerProgress')
  };

  function readProgress() {
    try {
      var value = Number(localStorage.getItem(progressKey));
      return isFinite(value) && value > 0 ? value : 0;
    } catch (e) {
      return 0;
    }
  }

  function saveProgress() {
    scrollSaveQueued = false;
    try { localStorage.setItem(progressKey, String(window.scrollY)); } catch (e) { /* storage unavailable */ }
    els.progress.textContent = window.scrollY > 80 ? 'Reading position saved on this device' : '';
  }

  function queueProgressSave() {
    if (scrollSaveQueued) return;
    scrollSaveQueued = true;
    window.requestAnimationFrame(saveProgress);
  }

  function updateLanguageButton() {
    els.langBtn.textContent = lang === 'en' ? 'Norsk' : 'English';
    els.langBtn.setAttribute('aria-pressed', lang === 'no' ? 'true' : 'false');
  }

  function sceneAnchor(index) {
    return 'reader-scene-' + index;
  }

  function renderSection(title, content, className) {
    if (!content) return '';
    return '<section class="reader-section ' + (className || '') + '"><h3>' + escapeHtml(title) + '</h3>' + content + '</section>';
  }

  function renderObjectives(objectives) {
    if (!objectives || !objectives.length) return '';
    return '<ul class="reader-objectives">' + objectives.map(function (objective) {
      return '<li>' + escapeHtml(objective) + '</li>';
    }).join('') + '</ul>';
  }

  function renderImages(scene) {
    var images = sceneImages(scene);
    if (!images.length) return '';
    return '<div class="reader-artwork">' + images.map(function (src, index) {
      return '<figure><img src="' + escapeHtml(src) + '" alt="' + escapeHtml(scene.title + (images.length > 1 ? ' — image ' + (index + 1) : '')) + '" loading="lazy"><figcaption>' + escapeHtml(scene.title) + '</figcaption></figure>';
    }).join('') + '</div>';
  }

  function renderBattlemap(scene) {
    var info = battlemapInfo(scene);
    if (!info || !info.src) return '';
    var caption = [];
    if (info.book) caption.push(info.book);
    if (info.page) caption.push('p. ' + info.page + (info.side ? ' (' + info.side + ')' : ''));
    if (info.location) caption.push(info.location);
    return '<details class="reader-map"><summary>Show battlemap</summary><div class="reader-map-body">' +
      '<img src="' + escapeHtml(info.src) + '" alt="Battlemap for ' + escapeHtml(scene.title) + '" loading="lazy">' +
      (caption.length ? '<p>' + escapeHtml(caption.join(' · ')) + '</p>' : '') +
      '</div></details>';
  }

  function renderEnemies(enemies) {
    var monsterNames = {};
    (adventure.monsters || []).forEach(function (id) {
      var monster = window.RPG_HELPER.monsters && window.RPG_HELPER.monsters[id];
      if (monster) monsterNames[id] = monster.name;
    });
    return '<ul class="reader-objectives">' + enemies.map(function (enemy) {
      var id = typeof enemy === 'string' ? enemy : enemy.id;
      var count = typeof enemy === 'string' ? 1 : (enemy.count || 1);
      var optional = typeof enemy === 'string' ? false : !!enemy.optional;
      var label = (optional ? 'Optional: ' : '') + (count > 1 ? count + ' × ' : '') + (monsterNames[id] || id);
      return '<li>' + escapeHtml(label) + '</li>';
    }).join('') + '</ul>';
  }

  function renderScene(scene, index) {
    var html = '<article class="reader-scene" id="' + sceneAnchor(index) + '"><h2>' + escapeHtml(scene.title || ('Scene ' + (index + 1))) + '</h2>';
    html += renderImages(scene);
    if (scene.readAloud || scene.readAloudNo) {
      var readAloud = lang === 'no' ? (scene.readAloudNo || scene.readAloud) : (scene.readAloud || scene.readAloudNo);
      html += renderSection(lang === 'no' ? 'Les høyt' : 'Read aloud', '<div class="reader-read-aloud">' + escapeHtml(readAloud) + '</div>');
    }
    if (scene.environment) html += renderSection('Environment', '<p>' + escapeHtml(scene.environment) + '</p>');
    if (scene.puzzle) html += renderSection('Puzzle', '<p>' + escapeHtml(scene.puzzle) + '</p>');
    if (scene.notes && scene.notes.length) html += renderSection('DM Notes', '<div class="reader-dm-notes">' + renderNoteBlocks(scene.notes) + '</div>');
    if (scene.enemies && scene.enemies.length) html += renderSection('Enemies', renderEnemies(scene.enemies));
    if (scene.tactics && scene.tactics.length) html += renderSection('Tactics & Synergy', '<div class="reader-dm-notes">' + renderNoteBlocks(scene.tactics) + '</div>');
    if (scene.aftermath) html += renderSection('Aftermath & Clues', '<p>' + escapeHtml(scene.aftermath) + '</p>');
    html += renderBattlemap(scene) + '</article>';
    return html;
  }

  function renderAdventure() {
    var meta = adventure.meta || {};
    var metaParts = [];
    if (meta.players) metaParts.push(meta.players + ' players');
    if (meta.level) metaParts.push('Level ' + meta.level);
    if (meta.duration) metaParts.push(meta.duration);
    if (metaParts.length) els.meta.textContent = metaParts.join(' · ');
    els.title.textContent = adventure.title;
    document.title = adventure.title + ' — Read adventure';

    var scenes = adventure.scenes || [];
    els.index.innerHTML = scenes.map(function (scene, index) {
      return '<button type="button" data-target="' + sceneAnchor(index) + '">' + escapeHtml((index + 1) + '. ' + scene.title) + '</button>';
    }).join('');

    var html = '';
    if (adventure.synopsis || adventure.intro || (adventure.objectives && adventure.objectives.length)) {
      html += '<section class="reader-overview">' +
        (adventure.synopsis ? '<h2>Synopsis</h2><p>' + escapeHtml(adventure.synopsis) + '</p>' : '') +
        (adventure.intro ? '<h2>Introduction</h2><p>' + escapeHtml(adventure.intro) + '</p>' : '') +
        (adventure.objectives && adventure.objectives.length ? '<h2>Objectives</h2>' + renderObjectives(adventure.objectives) : '') +
        '</section>';
    }
    html += scenes.map(renderScene).join('');
    html += '<button class="reader-top-link" type="button" data-top="readerTop">Back to top ↑</button>';
    els.content.innerHTML = html || '<p>This adventure has no story content yet.</p>';
    updateLanguageButton();
    window.requestAnimationFrame(function () {
      var savedPosition = readProgress();
      if (savedPosition) window.scrollTo(0, savedPosition);
      saveProgress();
    });
  }

  els.langBtn.addEventListener('click', function () {
    saveProgress();
    lang = lang === 'en' ? 'no' : 'en';
    updateLanguageButton();
    if (adventure) renderAdventure();
  });

  document.addEventListener('click', function (event) {
    var topButton = event.target.closest('button[data-top]');
    if (topButton) {
      var topTarget = document.getElementById(topButton.dataset.top);
      if (topTarget) topTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    var button = event.target.closest('#readerIndex button[data-target]');
    if (!button) return;
    var target = document.getElementById(button.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  window.addEventListener('scroll', queueProgressSave, { passive: true });
  window.addEventListener('pagehide', saveProgress);

  if (!adventureId) {
    els.title.textContent = 'Choose an adventure';
    els.content.innerHTML = '<p class="reader-error">Open the reader from an adventure card on the adventure list.</p>';
    els.langBtn.classList.add('hidden');
    return;
  }

  loadScript('js/markdown-loader.js')
    .then(function () { return loadScript('adventures/index.js'); })
    .then(function () { return loadScript('adventures/monsters.js'); })
    .then(function () { return loadScript('library/battlemaps/data.js'); })
    .then(function () {
      var meta = getAdventure(adventureId);
      if (!meta) throw new Error('Unknown adventure: ' + adventureId);
      return loadAdventure(meta);
    })
    .then(function () {
      adventure = getAdventure(adventureId);
      if (!adventure || !adventure.scenes) throw new Error('Adventure failed to load: ' + adventureId);
      renderAdventure();
    })
    .catch(function (err) {
      els.title.textContent = 'Could not load adventure';
      els.content.innerHTML = '<p class="reader-error">' + escapeHtml(err.message) + '</p>';
      els.index.classList.add('hidden');
    });
})();
