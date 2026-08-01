(function () {
  var adventureId = location.hash.slice(1).split('/')[0];
  if (!adventureId) {
    document.getElementById('advTitle').textContent = 'No adventure selected. Open one from index.html.';
    return;
  }

  var adventure = null;
  var sceneIndex = 0;
  var autoSend = true;

  if (location.protocol === 'http:' || location.protocol === 'https:') {
    document.getElementById('syncNote').textContent = 'server sync on — open the printed /player.html URL on the tablet';
  }

  var els = {
    sceneList: document.getElementById('sceneList'),
    sceneImg: document.getElementById('sceneImg'),
    sceneLabels: document.getElementById('sceneLabels'),
    sceneTitle: document.getElementById('sceneTitle'),
    sceneBody: document.getElementById('sceneBody'),
    monsterSearch: document.getElementById('monsterSearch'),
    monsterList: document.getElementById('monsterList'),
    documents: document.getElementById('panelDocuments'),
    counter: document.getElementById('sceneCounter')
  };

  function sendScene() {
    if (!adventure) return;
    Sync.publish(adventure.id, adventure.scenes[sceneIndex].id);
  }

  function renderScene() {
    var scene = adventure.scenes[sceneIndex];
    els.counter.textContent = (sceneIndex + 1) + ' / ' + adventure.scenes.length;
    els.sceneImg.src = scene.image;
    els.sceneImg.alt = scene.title;
    els.sceneLabels.textContent = adventure.title + ' — ' + scene.title;
    els.sceneTitle.textContent = scene.title;

    var html = '';
    if (scene.readAloud) html += renderReadAloud(scene.readAloud);
    if (scene.environment) html += '<h3>Environment</h3><p>' + escapeHtml(scene.environment) + '</p>';
    if (scene.enemies && scene.enemies.length) html += '<h3>Enemies</h3>' + encounterList(adventure, scene.enemies);
    if (scene.notes && scene.notes.length) html += '<h3>DM Notes</h3>' + renderNotes(scene.notes);
    if (scene.tactics && scene.tactics.length) html += '<h3>Tactics & Synergy</h3>' + renderNotes(scene.tactics);
    if (scene.aftermath) html += '<h3>Aftermath & Clues</h3><p>' + escapeHtml(scene.aftermath) + '</p>';
    els.sceneBody.innerHTML = html;

    var items = document.querySelectorAll('#sceneList .scene-item');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('active', i === sceneIndex);
    }
    if (autoSend) sendScene();
  }

  function renderSceneList() {
    els.sceneList.innerHTML = adventure.scenes.map(function (s, i) {
      return (
        '<button class="scene-item" data-i="' + i + '">' +
          '<img src="' + escapeHtml(s.image) + '" alt="">' +
          '<span>' + (i + 1) + '. ' + escapeHtml(s.title) + '</span>' +
        '</button>'
      );
    }).join('');
    els.sceneList.addEventListener('click', function (e) {
      var btn = e.target.closest('.scene-item');
      if (!btn) return;
      sceneIndex = Number(btn.dataset.i);
      renderScene();
    });
  }

  function renderMonsters() {
    var q = (els.monsterSearch.value || '').toLowerCase();
    var list = adventure.monsters.filter(function (m) {
      return !q || m.name.toLowerCase().indexOf(q) !== -1 || m.role.toLowerCase().indexOf(q) !== -1;
    });
    els.monsterList.innerHTML = list.map(monsterCard).join('') || '<p>No monsters match.</p>';
  }

  function renderDocuments() {
    var docs = adventure.documents || [];
    els.documents.innerHTML = docs.map(function (d) {
      return '<a href="' + escapeHtml(d.href) + '">' + escapeHtml(d.label) + '</a>';
    }).join('');
  }

  function showTab(tab) {
    var tabs = document.querySelectorAll('.dm-tabs button');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('active', tabs[i].dataset.tab === tab);
    }
    document.getElementById('panelScene').classList.toggle('hidden', tab !== 'scene');
    document.getElementById('panelMonsters').classList.toggle('hidden', tab !== 'monsters');
    document.getElementById('panelDocuments').classList.toggle('hidden', tab !== 'documents');
    if (tab === 'monsters') renderMonsters();
  }

  document.querySelectorAll('.dm-tabs button').forEach(function (b) {
    b.addEventListener('click', function () { showTab(b.dataset.tab); });
  });

  document.getElementById('prevBtn').addEventListener('click', function () {
    sceneIndex = (sceneIndex - 1 + adventure.scenes.length) % adventure.scenes.length;
    renderScene();
  });
  document.getElementById('nextBtn').addEventListener('click', function () {
    sceneIndex = (sceneIndex + 1) % adventure.scenes.length;
    renderScene();
  });
  document.getElementById('sendBtn').addEventListener('click', sendScene);
  document.getElementById('followBtn').addEventListener('click', function () {
    autoSend = !autoSend;
    document.getElementById('followBtn').classList.toggle('on', autoSend);
  });

  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft') document.getElementById('prevBtn').click();
    if (e.key === 'ArrowRight') document.getElementById('nextBtn').click();
  });

  els.monsterSearch.addEventListener('input', renderMonsters);

  loadScript('adventures/index.js')
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
      renderSceneList();
      renderScene();
      renderDocuments();
    })
    .catch(function (err) {
      els.sceneBody.textContent = err.message;
    });
})();
