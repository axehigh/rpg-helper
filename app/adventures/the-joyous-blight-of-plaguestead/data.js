window.RPG_HELPER = window.RPG_HELPER || { adventures: [] };

window.RPG_HELPER.adventures.forEach(function (a) {
  if (a.id !== 'the-joyous-blight-of-plaguestead') return;
  a.documents = [
    { label: 'Adventure (md)', href: 'adventures/the-joyous-blight-of-plaguestead/docs/adventure.md' }
  ];
});
