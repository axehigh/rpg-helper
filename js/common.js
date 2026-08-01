window.RPG_HELPER = window.RPG_HELPER || { adventures: [] };

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

  function serverPublish(adventureId, sceneId) {
    fetch('/api/scene', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adventureId: adventureId, sceneId: sceneId })
    }).catch(function () {});
  }

  function publish(adventureId, sceneId) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), adventureId: adventureId, sceneId: sceneId }));
    } catch (e) { /* storage unavailable */ }
    if (channel) channel.postMessage({ type: 'scene', adventureId: adventureId, sceneId: sceneId });
    if (viaServer) serverPublish(adventureId, sceneId);
  }

  function subscribe(adventureId, onScene) {
    if (channel) {
      channel.addEventListener('message', function (e) {
        var m = e.data;
        if (m && m.type === 'scene' && m.adventureId === adventureId) onScene(m.sceneId);
      });
    }
    var last = read();
    if (last && last.adventureId === adventureId) onScene(last.sceneId);

    var serverLast = null;
    if (viaServer) {
      var pull = function () {
        fetch('/api/scene')
          .then(function (r) { return r.json(); })
          .then(function (s) {
            if (s && s.adventureId === adventureId) {
              if (!serverLast || serverLast.sceneId !== s.sceneId || serverLast.t !== s.t) {
                serverLast = s;
                onScene(s.sceneId);
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
      if (cur && cur.adventureId === adventureId) {
        if (!last || last.sceneId !== cur.sceneId || last.t !== cur.t) {
          last = cur;
          onScene(cur.sceneId);
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
