<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function sceneStateFile() {
  $dir = __DIR__ . '/data';
  if ((is_dir($dir) || @mkdir($dir, 0777, true)) && is_writable($dir)) {
    return $dir . '/scene.json';
  }
  return sys_get_temp_dir() . '/rpg-helper-scene.json';
}

function sceneEmptyState() {
  return array('adventureId' => null, 'sceneId' => null, 't' => null, 'imageIndex' => null);
}

$file = sceneStateFile();
$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';

if ($method === 'GET') {
  $state = sceneEmptyState();
  if (is_file($file)) {
    $raw = @file_get_contents($file);
    $parsed = json_decode($raw, true);
    if (is_array($parsed) && isset($parsed['adventureId'], $parsed['sceneId'], $parsed['t'])) {
      $state = $parsed;
    }
  }
  echo json_encode($state);
  exit;
}

if ($method === 'POST') {
  $body = file_get_contents('php://input');
  $data = json_decode($body, true);
  if (!is_array($data) || !isset($data['adventureId'], $data['sceneId']) || !is_string($data['adventureId']) || !is_string($data['sceneId'])) {
    http_response_code(400);
    echo json_encode(array('error' => 'adventureId and sceneId (strings) required'));
    exit;
  }
  $imageIndex = (isset($data['imageIndex']) && is_numeric($data['imageIndex'])) ? (int) $data['imageIndex'] : null;
  $state = array(
    'adventureId' => (string) $data['adventureId'],
    'sceneId' => (string) $data['sceneId'],
    't' => (int) round(microtime(true) * 1000),
    'imageIndex' => $imageIndex
  );
  @file_put_contents($file, json_encode($state), LOCK_EX);
  echo json_encode($state);
  exit;
}

http_response_code(405);
echo json_encode(array('error' => 'Method not allowed'));
