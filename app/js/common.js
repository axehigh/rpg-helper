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

function loadAdventure(meta) {
  const src = meta.source || '';
  if (/\.md$/i.test(src)) {
    return fetch(src)
      .then(res => res.text())
      .then(text => {
        const parsed = parseAdventureMarkdown(text);
        if (!parsed || parsed.id !== meta.id) throw new Error('Adventure failed to load: ' + meta.id);
        const adventures = getAdventures();
        const idx = adventures.findIndex(a => a.id === meta.id);
        const merged = Object.assign({}, adventures[idx] || meta, parsed);
        if (idx === -1) adventures.push(merged);
        else adventures[idx] = merged;
        return merged;
      })
      .then(function (adv) {
        if (!meta.documents) return adv;
        return loadScript(meta.documents).then(function () {
          return getAdventure(meta.id) || adv;
        });
      });
  }
  return loadScript(src);
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
  var serverEndpoint = null;
  var serverProbe = null;
  var serverEndpoints = ['/api/scene', '/api/scene.php'];

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }

  function probeServer() {
    if (!viaServer) return Promise.resolve(null);
    if (serverProbe) return serverProbe;
    serverProbe = serverEndpoints.reduce(function (promise, url) {
      return promise.then(function (found) {
        if (found) return found;
        return fetch(url).then(function (res) {
          if (!res.ok) return null;
          return res.json().then(function (s) {
            if (s && typeof s === 'object' && 'adventureId' in s && 'sceneId' in s && 't' in s) return url;
            return null;
          }).catch(function () { return null; });
        }).catch(function () { return null; });
      });
    }, Promise.resolve(null)).then(function (found) {
      serverEndpoint = found;
      return found;
    });
    return serverProbe;
  }

  function serverPublish(adventureId, sceneId, imageIndex) {
    if (!serverEndpoint) return;
    fetch(serverEndpoint, {
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
    probeServer();
    if (serverEndpoint) serverPublish(adventureId, sceneId, imageIndex);
  }

  function subscribe(adventureId, onScene) {
    var any = adventureId === undefined || adventureId === null;
    function matches(id) { return any || id === adventureId; }
    var closed = false;

    if (channel) {
      channel.addEventListener('message', function (e) {
        var m = e.data;
        if (m && m.type === 'scene' && matches(m.adventureId)) onScene(m.sceneId, m.imageIndex, m.adventureId);
      });
    }
    var last = read();
    if (last && matches(last.adventureId)) onScene(last.sceneId, last.imageIndex, last.adventureId);

    var serverLast = null;
    var serverTimer = null;
    if (viaServer) {
      probeServer().then(function (endpoint) {
        if (!endpoint || closed) return;
        var pull = function () {
          fetch(endpoint)
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
        serverTimer = setInterval(pull, 800);
      });
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
      closed = true;
      clearInterval(timer);
      if (serverTimer) clearInterval(serverTimer);
    };
  }

  return { publish: publish, subscribe: subscribe };
})();
