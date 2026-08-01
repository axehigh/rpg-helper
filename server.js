const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = __dirname;
const PORT = process.env.PORT || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

let sceneState = null;

function sendJson(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}

function sendText(res, status, text) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(text);
}

function handleApi(req, res) {
  if (req.method === 'GET' && req.url === '/api/scene') {
    sendJson(res, 200, sceneState || { adventureId: null, sceneId: null, t: null });
    return;
  }
  if (req.method === 'POST' && req.url === '/api/scene') {
    let body = '';
    req.on('data', function (chunk) { body += chunk; });
    req.on('end', function () {
      try {
        const data = JSON.parse(body);
        if (!data || typeof data.adventureId !== 'string' || typeof data.sceneId !== 'string') {
          sendJson(res, 400, { error: 'adventureId and sceneId (strings) required' });
          return;
        }
        sceneState = { adventureId: data.adventureId, sceneId: data.sceneId, t: Date.now() };
        sendJson(res, 200, sceneState);
      } catch (e) {
        sendJson(res, 400, { error: 'Invalid JSON' });
      }
    });
    return;
  }
  sendText(res, 404, 'Not found');
}

function serveStatic(req, res) {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    sendText(res, 403, 'Forbidden');
    return;
  }
  fs.readFile(filePath, function (err, data) {
    if (err) {
      sendText(res, 404, 'Not found');
      return;
    }
    const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(data);
  });
}

const server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.url.indexOf('/api/scene') === 0) {
    handleApi(req, res);
    return;
  }
  serveStatic(req, res);
});

function lanIps() {
  const out = [];
  const ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach(function (name) {
    ifaces[name].forEach(function (iface) {
      if (iface.family === 'IPv4' && !iface.internal) out.push(iface.address);
    });
  });
  return out;
}

server.listen(PORT, function () {
  console.log('RPG Helper running');
  console.log('  Local (this device):   http://localhost:' + PORT);
  lanIps().forEach(function (ip) {
    console.log('  On your network (use on tablet): http://' + ip + ':' + PORT);
  });
  console.log('DM screen:  /dm.html#shadows-of-blackstone-keep');
  console.log('Player:     /player.html#shadows-of-blackstone-keep');
});
