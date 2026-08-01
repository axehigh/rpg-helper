(function () {
  var list = document.getElementById('adventureList');

  loadScript('adventures/index.js')
    .then(function () {
      var adventures = getAdventures();
      if (!adventures.length) {
        list.innerHTML = '<p>No adventures found.</p>';
        return;
      }
      list.innerHTML = adventures.map(function (a) {
        return (
          '<div class="adventure-card' + (a.active === false ? ' inactive' : '') + '">' +
            '<img src="' + escapeHtml(a.image) + '" alt="">' +
            '<div class="adventure-card-body">' +
              '<h2>' + escapeHtml(a.title) + '</h2>' +
              '<p>' + escapeHtml(a.blurb || '') + '</p>' +
              (a.synopsis ? '<p class="adventure-synopsis">' + escapeHtml(a.synopsis) + '</p>' : '') +
              '<div class="adventure-actions">' +
                '<a class="btn" href="dm.html#' + encodeURIComponent(a.id) + '">DM screen</a>' +
                '<a class="btn" href="player.html#' + encodeURIComponent(a.id) + '">Player screen</a>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }).join('');
    })
    .catch(function (err) {
      list.innerHTML = '<p>Failed to load adventures: ' + escapeHtml(err.message) + '</p>';
    });
})();
