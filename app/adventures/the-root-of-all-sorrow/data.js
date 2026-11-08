window.RPG_HELPER = window.RPG_HELPER || { adventures: [] };

window.RPG_HELPER.adventures.forEach(function (a) {
  if (a.id !== 'the-root-of-all-sorrow') return;
  a.documents = [
    { label: 'Adventure (md)', href: 'adventures/the-root-of-all-sorrow/docs/adventure.md' },
    { label: 'Image Prompts (md)', href: 'adventures/the-root-of-all-sorrow/docs/image_prompts.md' }
  ];
});
