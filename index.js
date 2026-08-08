(function () {
  var list = document.getElementById('adventureList');
  var toggle = document.getElementById('completedToggle');

  var STATUS_LABEL = { running: 'Running', ready: 'Ready', wip: 'WIP', completed: 'Completed' };
  var showCompleted = false;

  function statusBadge(a) {
    if (!a.status || !STATUS_LABEL[a.status]) return '';
    return '<span class="adventure-status status-' + a.status + '">' + escapeHtml(STATUS_LABEL[a.status]) + '</span>';
  }

  function sceneBadge(a) {
    if (a.kind !== 'single-scene') return '';
    return '<span class="adventure-status status-scene">Scene</span>';
  }

  function cardHtml(a) {
    var statusClass = a.status ? ' status-' + a.status : '';
    var sceneClass = a.kind === 'single-scene' ? ' scene-card' : '';
    return (
      '<div class="adventure-card' + statusClass + sceneClass + '">' +
        '<img src="' + escapeHtml(a.image) + '" alt="">' +
        '<div class="adventure-card-body">' +
          '<h2>' + escapeHtml(a.title) + statusBadge(a) + sceneBadge(a) + '</h2>' +
          '<p>' + escapeHtml(a.blurb || '') + '</p>' +
          (a.synopsis ? '<p class="adventure-synopsis">' + escapeHtml(a.synopsis) + '</p>' : '') +
          '<div class="adventure-actions">' +
            '<a class="btn" href="dm.html#' + encodeURIComponent(a.id) + '">DM screen</a>' +
            '<a class="btn" href="player.html#' + encodeURIComponent(a.id) + '">Player screen</a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function sectionHtml(entries, className) {
    if (!entries.length) return '';
    return '<section class="' + className + '">' +
      (className === 'standalone-section' ? '<h2>Standalone Scenes</h2>' : '') +
      '<div class="adventure-grid">' + entries.map(cardHtml).join('') + '</div>' +
      '</section>';
  }

  function render() {
    var adventures = getAdventures().filter(function (a) {
      return showCompleted || a.status !== 'completed';
    });
    var scenes = adventures.filter(function (a) { return a.kind === 'single-scene'; });
    var full = adventures.filter(function (a) { return a.kind !== 'single-scene'; });
    list.innerHTML = adventures.length
      ? sectionHtml(full, 'adventure-section') + sectionHtml(scenes, 'standalone-section')
      : '<p>' + (getAdventures().length ? 'No adventures to show here.' : 'No adventures found.') + '</p>';
  }

  toggle.addEventListener('click', function () {
    showCompleted = !showCompleted;
    toggle.textContent = showCompleted ? 'Hide completed adventures' : 'Show completed adventures';
    toggle.classList.toggle('on', showCompleted);
    toggle.setAttribute('aria-pressed', showCompleted ? 'true' : 'false');
    render();
  });

  loadScript('adventures/index.js')
    .then(render)
    .catch(function (err) {
      list.innerHTML = '<p>Failed to load adventures: ' + escapeHtml(err.message) + '</p>';
    });
})();
