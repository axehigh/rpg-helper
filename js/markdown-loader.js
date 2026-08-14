(function (root) {
  'use strict';

  var PROSE_FIELDS = { readAloud: 1, readAloudNo: 1, environment: 1, aftermath: 1 };

  var FIELD_HEADINGS = {
    'read aloud': 'readAloud',
    'read aloud norsk': 'readAloudNo',
    'environment': 'environment',
    'dm notes': 'notes',
    'enemies': 'enemies',
    'tactics synergy': 'tactics',
    'aftermath clues': 'aftermath'
  };

  var IMG_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;

  function normalizeHeading(name) {
    return name.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
  }

  function isH1(line) { return /^#\s+/.test(line); }
  function isH2(line) { return /^##\s+/.test(line); }
  function headingText(line) { return line.replace(/^#+\s+/, '').trim(); }

  // Pulls every markdown image ![alt](src) out of a line.
  // Returns { text, imgs } where text has the image syntax removed.
  function extractImages(line) {
    var imgs = [];
    var text = line.replace(IMG_RE, function (match, alt, src) {
      imgs.push(src.trim());
      return '';
    });
    return { text: text, imgs: imgs };
  }

  function parseEnemy(line) {
    var id = line;
    var count = 1;
    var optional = false;
    var opt = line.match(/\s*\(optional\)\s*$/i);
    if (opt) {
      optional = true;
      id = id.slice(0, opt.index);
    }
    var x = id.match(/^(.*?)\s+x\s*(\d+)\s*$/i);
    if (x) {
      id = x[1];
      count = parseInt(x[2], 10);
    }
    id = id.trim();
    if (!id) return null;
    var enemy = { id: id };
    if (count > 1) enemy.count = count;
    if (optional) enemy.optional = true;
    return enemy;
  }

  function parseAdventureMarkdown(md) {
    var lines = String(md).replace(/\r\n/g, '\n').split('\n');
    var adv = { scenes: [] };
    var scene = null;
    var sceneField = null;
    var topSection = null;
    var pendingProse = null;
    var i = 0;
    var n = lines.length;

    function flushProse() {
      if (!pendingProse) return;
      var text = pendingProse.raw.filter(function (l) { return l !== ''; }).join(' ');
      if (pendingProse.field === 'intro') adv.intro = text;
      else if (scene) scene[pendingProse.field] = text;
      pendingProse = null;
    }

    // --- Frontmatter ---
    if (lines[0] && lines[0].trim() === '---') {
      var fm = {};
      i = 1;
      for (; i < n; i++) {
        var fl = lines[i].trim();
        if (fl === '---') { i++; break; }
        var sep = fl.indexOf(':');
        if (sep === -1) continue;
        fm[fl.slice(0, sep).trim()] = fl.slice(sep + 1).trim();
      }
      if (fm.id) adv.id = fm.id;
      if (fm.title) adv.title = fm.title;
      if (fm.kind) adv.kind = fm.kind;
      if (fm.players !== undefined || fm.level !== undefined || fm.duration !== undefined) {
        adv.meta = {};
        if (fm.players !== undefined) adv.meta.players = Number(fm.players) || fm.players;
        if (fm.level !== undefined) adv.meta.level = Number(fm.level) || fm.level;
        if (fm.duration !== undefined) adv.meta.duration = fm.duration;
      }
      if (fm.monsters) {
        adv.monsters = fm.monsters.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      }
    }

    // --- Body ---
    for (; i < n; i++) {
      var line = lines[i].trim();
      if (!line) {
        if (pendingProse) pendingProse.raw.push('');
        continue;
      }

      if (isH1(line)) {
        flushProse();
        var h = headingText(line);
        if (/^Scene:/i.test(h)) {
          scene = { title: h.replace(/^Scene:\s*/i, '').trim(), images: [] };
          sceneField = null;
          topSection = null;
          adv.scenes.push(scene);
        } else {
          scene = null;
          sceneField = null;
          topSection = null;
          if (/^intro$/i.test(h)) {
            topSection = 'intro';
            pendingProse = { field: 'intro', raw: [] };
          } else if (/^objectives$/i.test(h)) {
            topSection = 'objectives';
            adv.objectives = [];
          }
        }
        continue;
      }

      if (isH2(line)) {
        if (!scene) continue;
        flushProse();
        var field = FIELD_HEADINGS[normalizeHeading(headingText(line))];
        sceneField = field || null;
        topSection = null;
        if (PROSE_FIELDS[field]) pendingProse = { field: field, raw: [] };
        continue;
      }

      // --- Content lines ---
      if (scene) {
        // Images can live anywhere in a scene block; collect and strip them.
        var ex = extractImages(line);
        if (ex.imgs.length) scene.images = scene.images.concat(ex.imgs);
        line = ex.text.trim();
        if (!line) continue;
      }

      if (pendingProse) {
        pendingProse.raw.push(line);
        continue;
      }

      if (topSection === 'objectives') {
        if (/^- /.test(line)) adv.objectives.push(line.replace(/^-\s+/, '').trim());
        continue;
      }

      if (!scene) continue;

      if (!sceneField) {
        // Scene meta bullets
        if (/^- /.test(line)) {
          var body = line.replace(/^-\s+/, '').trim();
          var sepIdx = body.indexOf(':');
          var key, val;
          if (sepIdx !== -1) {
            key = body.slice(0, sepIdx).trim();
            val = body.slice(sepIdx + 1).trim();
          } else {
            key = body;
            val = '';
          }
          if (key === 'id') {
            scene.id = val;
          } else if (key === 'battlemap') {
            scene.battlemap = val;
          } else if (key === 'gallery') {
            scene.gallery = val !== '' && val !== 'false';
          } else if (key === 'title') {
            scene.title = val;
          }
        }
        continue;
      }

      if (sceneField === 'notes' || sceneField === 'tactics') {
        if (/^- /.test(line)) {
          if (!scene[sceneField]) scene[sceneField] = [];
          scene[sceneField].push(line.replace(/^-\s+/, '').trim());
        }
        continue;
      }

      if (sceneField === 'enemies') {
        if (/^- /.test(line)) {
          if (!scene.enemies) scene.enemies = [];
          var enemy = parseEnemy(line.replace(/^-\s+/, '').trim());
          if (enemy) scene.enemies.push(enemy);
        }
        continue;
      }
    }

    flushProse();
    return adv;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = parseAdventureMarkdown;
  } else {
    root.parseAdventureMarkdown = parseAdventureMarkdown;
  }
})(typeof self !== 'undefined' ? self : this);
