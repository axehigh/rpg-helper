(function () {
  var parts = location.hash.slice(1).split('/');
  var adventureId = parts[0];
  var initialSceneId = parts[1] ? decodeURIComponent(parts[1]) : null;

  var els = {
    slide: document.getElementById('playerSlide'),
    empty: document.getElementById('playerEmpty'),
    img: document.getElementById('playerImg'),
    advTitle: document.getElementById('playerAdvTitle'),
    sceneTitle: document.getElementById('playerSceneTitle'),
    status: document.getElementById('playerStatus')
  };

  var adventure = null;
  var sceneIndex = 0;
  var imageIndex = 0;

  if (location.protocol === 'http:' || location.protocol === 'https:') {
    els.status.classList.remove('hidden');
  }

  function show() {
    var scene = adventure.scenes[sceneIndex];
    var images = sceneImages(scene);
    els.img.src = images[imageIndex] || images[0];
    els.img.alt = scene.title;
    els.advTitle.textContent = adventure.title;
    els.sceneTitle.textContent = scene.title;
    els.slide.classList.add('visible');
    els.empty.classList.add('hidden');
    history.replaceState(null, '', '#' + adventure.id + '/' + encodeURIComponent(scene.id));
  }

  function gotoScene(sceneId, syncedImageIndex) {
    if (!adventure) return;
    var idx = adventure.scenes.findIndex(function (s) { return s.id === sceneId; });
    sceneIndex = idx === -1 ? 0 : idx;
    imageIndex = (typeof syncedImageIndex === 'number' && syncedImageIndex >= 0) ? syncedImageIndex : 0;
    show();
  }

  function fail(msg) {
    els.empty.textContent = msg;
    els.empty.classList.remove('hidden');
  }

  if (!adventureId) {
    fail('No adventure selected. Open one from the DM screen.');
    return;
  }

  var wakeLock = null;
  function requestWakeLock() {
    if (!('wakeLock' in navigator)) return;
    navigator.wakeLock.request('screen')
      .then(function (wl) {
        wakeLock = wl;
        wakeLock.addEventListener('release', function () { wakeLock = null; });
      })
      .catch(function () {});
  }
  requestWakeLock();
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') requestWakeLock();
  });

  Sync.subscribe(adventureId, gotoScene);

  document.addEventListener('keydown', function (e) {
    if (!adventure) return;
    if (e.key === 'ArrowLeft') {
      sceneIndex = (sceneIndex - 1 + adventure.scenes.length) % adventure.scenes.length;
      imageIndex = 0;
      show();
    }
    if (e.key === 'ArrowRight') {
      sceneIndex = (sceneIndex + 1) % adventure.scenes.length;
      imageIndex = 0;
      show();
    }
  });

  loadScript('adventures/index.js')
    .then(function () {
      var meta = getAdventure(adventureId);
      if (!meta) throw new Error('Unknown adventure: ' + adventureId);
      return loadScript(meta.source);
    })
    .then(function () {
      adventure = getAdventure(adventureId);
      if (!adventure || !adventure.scenes) throw new Error('Adventure failed to load: ' + adventureId);
      if (initialSceneId) gotoScene(initialSceneId);
      else show();
    })
    .catch(function (err) {
      fail(err.message);
    });
})();
