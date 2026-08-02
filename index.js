(function () {
  var list = document.getElementById('adventureList');
  var toggle = document.getElementById('completedToggle');

  var STATUS_LABEL = { running: 'Running', ready: 'Ready', wip: 'WIP', completed: 'Completed' };
  var showCompleted = false;

  function statusBadge(a) {
    if (!a.status || !STATUS_LABEL[a.status]) return '';
    return '<span class="adventure-status status-' + a.status + '">' + escapeHtml(STATUS_LABEL[a.status]) + '</span>';
  }

  function cardHtml(a) {
    var statusClass = a.status ? ' status-' + a.status : '';
    return (
      '<div class="adventure-card' + statusClass + '">' +
        '<img src="' + escapeHtml(a.image) + '" alt="">' +
        '<div class="adventure-card-body">' +
          '<h2>' + escapeHtml(a.title) + statusBadge(a) + '</h2>' +
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

  function render() {
    var adventures = getAdventures();
    var visible = adventures.filter(function (a) {
      return showCompleted || a.status !== 'completed';
    });
    list.innerHTML = visible.length
      ? visible.map(cardHtml).join('')
      : '<p>' + (adventures.length ? 'No adventures to show here.' : 'No adventures found.') + '</p>';
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
