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

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }

  function publish(adventureId, sceneId) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), adventureId: adventureId, sceneId: sceneId }));
    } catch (e) { /* storage unavailable */ }
    if (channel) channel.postMessage({ type: 'scene', adventureId: adventureId, sceneId: sceneId });
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
    var timer = setInterval(function () {
      var cur = read();
      if (cur && cur.adventureId === adventureId) {
        if (!last || last.sceneId !== cur.sceneId || last.t !== cur.t) {
          last = cur;
          onScene(cur.sceneId);
        }
      }
    }, 600);
    return function () { clearInterval(timer); };
  }

  return { publish: publish, subscribe: subscribe };
})();
