(function () {
  var adventureId = location.hash.slice(1).split('/')[0];
  if (!adventureId) {
    document.getElementById('advTitle').textContent = 'No adventure selected. Open one from index.html.';
    return;
  }

  var adventure = null;
  var sceneIndex = 0;
  var imageIndex = 0;
  var autoSend = false;
  var lang = (window.RPG_HELPER.config && window.RPG_HELPER.config.defaultReadAloudLang === 'no') ? 'no' : 'en';
  var combatMode = false;

  if (location.protocol === 'http:' || location.protocol === 'https:') {
    var playerUrl = location.origin + '/player.html#' + adventureId;
    document.getElementById('syncNote').innerHTML =
      '<a href="' + escapeHtml(playerUrl) + '" target="_blank" rel="noopener">player screen</a>';
  }

  var els = {
    sceneList: document.getElementById('sceneList'),
    sceneImg: document.getElementById('sceneImg'),
    sceneLabels: document.getElementById('sceneLabels'),
    sceneTitle: document.getElementById('sceneTitle'),
    sceneBody: document.getElementById('sceneBody'),
    sceneImages: document.getElementById('sceneImages'),
    battlemapSource: document.getElementById('battlemapSource'),
    overview: document.getElementById('panelOverview'),
    monsterSearch: document.getElementById('monsterSearch'),
    monsterList: document.getElementById('monsterList'),
    documents: document.getElementById('panelDocuments'),
    counter: document.getElementById('sceneCounter'),
    combatBtn: document.getElementById('combatBtn')
  };

  function visibleImages(scene) {
    var info = battlemapInfo(scene);
    var images = sceneImages(scene);
    if (info && info.src) images = images.concat([info.src]);
    return images;
  }

  function sendScene() {
    if (!adventure) return;
    var scene = adventure.scenes[sceneIndex];
    var images = visibleImages(scene);
    var sceneIdx = battlemapInfo(scene) ? Math.min(imageIndex, images.length - 2) : imageIndex;
    Sync.publish(adventure.id, scene.id, sceneIdx);
  }

  var pushTimer = null;
  function flashPush() {
    var btn = document.getElementById('sendBtn');
    btn.classList.remove('flash');
    void btn.offsetWidth;
    btn.classList.add('flash');
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () {
      btn.classList.remove('flash');
    }, 900);
  }

  function sceneCount() {
    return adventure.scenes.filter(function (s) { return !s.gallery; }).length;
  }

  function renderScene() {
    var scene = adventure.scenes[sceneIndex];
    var images = visibleImages(scene);
    imageIndex = combatMode ? Math.max(0, images.length - 1) : 0;
    if (scene.gallery) {
      els.counter.textContent = 'Gallery';
    } else {
      var realBefore = adventure.scenes.slice(0, sceneIndex).filter(function (s) { return !s.gallery; }).length;
      els.counter.textContent = (realBefore + 1) + ' / ' + sceneCount();
    }
    els.sceneImg.src = images[imageIndex];
    els.sceneImg.alt = scene.title;
    els.sceneLabels.textContent = adventure.title + ' — ' + scene.title;
    els.sceneTitle.textContent = scene.title;
    renderSceneImages(scene);

    var info = battlemapInfo(scene);
    var sourceHtml = battlemapSourceHtml(info);
    els.battlemapSource.innerHTML = sourceHtml;
    els.battlemapSource.classList.toggle('hidden', !sourceHtml);

    var html = '';
    if (combatMode) {
      html += renderCombatBody(adventure, scene);
    } else {
      if (scene.readAloud || scene.readAloudNo) {
        var readAloud = lang === 'no' ? (scene.readAloudNo || scene.readAloud) : (scene.readAloud || scene.readAloudNo);
        html += renderReadAloud(readAloud, lang === 'no' ? 'Les høyt' : 'Read aloud');
      }
      if (scene.environment) html += '<h3>Environment</h3><p>' + escapeHtml(scene.environment) + '</p>';
      if (scene.notes && scene.notes.length) html += '<h3>DM Notes</h3>' + renderBox(renderNotes(scene.notes));
      if (scene.enemies && scene.enemies.length) html += '<h3>Enemies</h3>' + encounterList(adventure, scene.enemies);
      if (scene.tactics && scene.tactics.length) html += '<h3>Tactics & Synergy</h3>' + renderBox(renderNotes(scene.tactics));
      if (scene.aftermath) html += '<h3>Aftermath & Clues</h3>' + renderBox('<p>' + escapeHtml(scene.aftermath) + '</p>');
    }
    els.sceneBody.innerHTML = html;

    var items = document.querySelectorAll('#sceneList .scene-item');
    for (var i = 0; i < items.length; i++) {
      var isActive = Number(items[i].dataset.i) === sceneIndex;
      items[i].classList.toggle('active', isActive);
      items[i].setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }
    if (autoSend) sendScene();
  }

  function sceneItemHtml(s, i) {
    return (
      '<button class="scene-item" data-i="' + i + '">' +
        '<img src="' + escapeHtml(sceneImages(s)[0]) + '" alt="">' +
        '<span>' + (i + 1) + '. ' + escapeHtml(s.title) + '</span>' +
      '</button>'
    );
  }

  function renderSceneImages(scene) {
    var images = visibleImages(scene);
    var mapIndex = battlemapInfo(scene) ? images.length - 1 : -1;
    var html = '';
    images.forEach(function (src, i) {
      html += (
        '<button class="scene-thumb' + (i === imageIndex ? ' active' : '') + '" data-i="' + i + '" title="' +
        (i === imageIndex ? 'Showing' : 'Show this image') + '">' +
          '<img src="' + escapeHtml(src) + '" alt="">' +
          (i === imageIndex
            ? '<span class="thumb-tag">Showing</span>'
            : i === mapIndex ? '<span class="thumb-tag map">Map</span>' : '') +
        '</button>'
      );
    });
    els.sceneImages.innerHTML = html;
    els.sceneImages.classList.toggle('hidden', images.length < 2);
  }

  function renderSceneList() {
    var html = '';
    adventure.scenes.forEach(function (s, i) {
      if (s.gallery) return;
      html += sceneItemHtml(s, i);
    });
    var galleries = adventure.scenes.filter(function (s) { return s.gallery; });
    if (galleries.length) {
      html += '<div class="scene-group-label">Gallery</div>';
      galleries.forEach(function (s) { html += sceneItemHtml(s, adventure.scenes.indexOf(s)); });
    }
    els.sceneList.innerHTML = html;
    els.sceneList.addEventListener('click', function (e) {
      var btn = e.target.closest('.scene-item');
      if (!btn) return;
      sceneIndex = Number(btn.dataset.i);
      renderScene();
      showTab('scene');
    });
  }

  function renderOverviewTab() {
    els.overview.innerHTML = renderOverview(adventure);
  }

  function renderMonsters() {
    var q = (els.monsterSearch.value || '').toLowerCase();
    var list = getAdventureMonsters(adventure).filter(function (m) {
      return !q || m.name.toLowerCase().indexOf(q) !== -1 || m.role.toLowerCase().indexOf(q) !== -1;
    });
    els.monsterList.innerHTML = list.map(monsterCard).join('') || '<p>No monsters match.</p>';
  }

  function renderDocuments() {
    var docs = adventure.documents || [];
    els.documents.innerHTML = docs.map(function (d) {
      return '<a href="' + escapeHtml(d.href) + '" target="_blank" rel="noopener">' + escapeHtml(d.label) + '</a>';
    }).join('');
  }

  function showTab(tab) {
    var tabs = document.querySelectorAll('.dm-tabs button');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('active', tabs[i].dataset.tab === tab);
      tabs[i].setAttribute('aria-pressed', tabs[i].dataset.tab === tab ? 'true' : 'false');
    }
    document.getElementById('panelOverview').classList.toggle('hidden', tab !== 'overview');
    document.getElementById('panelScene').classList.toggle('hidden', tab !== 'scene');
    document.getElementById('panelMonsters').classList.toggle('hidden', tab !== 'monsters');
    document.getElementById('panelDocuments').classList.toggle('hidden', tab !== 'documents');
    if (tab === 'monsters') renderMonsters();
    if (tab === 'overview') renderOverviewTab();
  }

  document.querySelectorAll('.dm-tabs button').forEach(function (b) {
    b.addEventListener('click', function () { showTab(b.dataset.tab); });
  });

  function stepScene(dir) {
    var total = adventure.scenes.length;
    for (var n = 1; n <= total; n++) {
      var next = (sceneIndex + dir * n + total) % total;
      if (!adventure.scenes[next].gallery) { sceneIndex = next; break; }
    }
    renderScene();
  }

  document.getElementById('prevBtn').addEventListener('click', function () {
    stepScene(-1);
  });
  document.getElementById('nextBtn').addEventListener('click', function () {
    stepScene(1);
  });
  document.getElementById('sendBtn').addEventListener('click', function () {
    sendScene();
    flashPush();
  });
  document.getElementById('followBtn').addEventListener('click', function () {
    autoSend = !autoSend;
    document.getElementById('followBtn').classList.toggle('on', autoSend);
    document.getElementById('followBtn').setAttribute('aria-pressed', autoSend ? 'true' : 'false');
  });

  function updateLangBtn() {
    var btn = document.getElementById('langBtn');
    btn.textContent = lang === 'en' ? 'Norsk' : 'English';
    btn.classList.toggle('on', lang === 'no');
    btn.setAttribute('aria-pressed', lang === 'no' ? 'true' : 'false');
  }

  document.getElementById('langBtn').addEventListener('click', function () {
    lang = lang === 'en' ? 'no' : 'en';
    updateLangBtn();
    renderScene();
  });
  updateLangBtn();

  els.combatBtn.addEventListener('click', function () {
    combatMode = !combatMode;
    els.combatBtn.classList.toggle('on', combatMode);
    els.combatBtn.setAttribute('aria-pressed', combatMode ? 'true' : 'false');
    renderScene();
  });

  els.sceneImages.addEventListener('click', function (e) {
    var btn = e.target.closest('.scene-thumb');
    if (!btn) return;
    imageIndex = Number(btn.dataset.i);
    var scene = adventure.scenes[sceneIndex];
    els.sceneImg.src = visibleImages(scene)[imageIndex];
    renderSceneImages(scene);
    if (autoSend) sendScene();
  });

  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft') document.getElementById('prevBtn').click();
    if (e.key === 'ArrowRight') document.getElementById('nextBtn').click();
  });

  els.monsterSearch.addEventListener('input', renderMonsters);

  loadScript('adventures/index.js')
    .then(function () { return loadScript('adventures/monsters.js'); })
    .then(function () { return loadScript('library/battlemaps/data.js'); })
    .then(function () {
      var meta = getAdventure(adventureId);
      if (!meta) throw new Error('Unknown adventure: ' + adventureId);
      return loadScript(meta.source);
    })
    .then(function () {
      adventure = getAdventure(adventureId);
      if (!adventure || !adventure.scenes) throw new Error('Adventure failed to load: ' + adventureId);
      document.title = 'DM - ' + adventure.title;
      document.getElementById('advTitle').textContent = adventure.title;
      renderOverviewTab();
      renderSceneList();
      renderScene();
      renderDocuments();
    })
    .catch(function (err) {
      els.sceneBody.textContent = err.message;
    });
})();
