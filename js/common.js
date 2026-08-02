window.RPG_HELPER = window.RPG_HELPER || { adventures: [] };
window.RPG_HELPER.config = window.RPG_HELPER.config || {
  defaultReadAloudLang: 'no'
};

function sceneImages(scene) {
  return scene.images || [];
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load ' + src));
    document.head.appendChild(s);
  });
}

function getAdventures() {
  return window.RPG_HELPER.adventures;
}

function getAdventure(id) {
  return getAdventures().find(a => a.id === id);
}

function getBattlemaps() {
  return window.RPG_HELPER.battlemaps || [];
}

function getBattlemap(id) {
  return getBattlemaps().find(b => b.id === id);
}

function battlemapInfo(scene) {
  if (!scene || !scene.battlemap) return null;
  const id = typeof scene.battlemap === 'string' ? scene.battlemap : scene.battlemap.id;
  if (!id) return null;
  const entry = getBattlemap(id);
  if (entry) {
    return {
      src: entry.src, book: entry.book, page: entry.page, side: entry.side,
      location: entry.location, filename: entry.filename, folder: entry.folder, grid: entry.grid
    };
  }
  return { src: id };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

var Sync = (function () {
  var KEY = 'rpg-helper-scene';
  var channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('rpg-helper') : null;
  var viaServer = location.protocol === 'http:' || location.protocol === 'https:';

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }

  function serverPublish(adventureId, sceneId, imageIndex) {
    fetch('/api/scene', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adventureId: adventureId, sceneId: sceneId, imageIndex: imageIndex })
    }).catch(function () {});
  }

  function publish(adventureId, sceneId, imageIndex) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), adventureId: adventureId, sceneId: sceneId, imageIndex: imageIndex }));
    } catch (e) { /* storage unavailable */ }
    if (channel) channel.postMessage({ type: 'scene', adventureId: adventureId, sceneId: sceneId, imageIndex: imageIndex });
    if (viaServer) serverPublish(adventureId, sceneId, imageIndex);
  }

  function subscribe(adventureId, onScene) {
    var any = adventureId === undefined || adventureId === null;
    function matches(id) { return any || id === adventureId; }

    if (channel) {
      channel.addEventListener('message', function (e) {
        var m = e.data;
        if (m && m.type === 'scene' && matches(m.adventureId)) onScene(m.sceneId, m.imageIndex, m.adventureId);
      });
    }
    var last = read();
    if (last && matches(last.adventureId)) onScene(last.sceneId, last.imageIndex, last.adventureId);

    var serverLast = null;
    if (viaServer) {
      var pull = function () {
        fetch('/api/scene')
          .then(function (r) { return r.json(); })
          .then(function (s) {
            if (s && matches(s.adventureId)) {
              if (!serverLast || serverLast.sceneId !== s.sceneId || serverLast.t !== s.t) {
                serverLast = s;
                onScene(s.sceneId, s.imageIndex, s.adventureId);
              }
            }
          })
          .catch(function () {});
      };
      pull();
      var serverTimer = setInterval(pull, 800);
    }

    var timer = setInterval(function () {
      var cur = read();
      if (cur && matches(cur.adventureId)) {
        if (!last || last.sceneId !== cur.sceneId || last.t !== cur.t) {
          last = cur;
          onScene(cur.sceneId, cur.imageIndex, cur.adventureId);
        }
      }
    }, 600);

    return function () {
      clearInterval(timer);
      if (serverTimer) clearInterval(serverTimer);
    };
  }

  return { publish: publish, subscribe: subscribe };
})();
