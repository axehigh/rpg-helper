window.RPG_HELPER = window.RPG_HELPER || { adventures: [] };

window.RPG_HELPER.adventures.forEach(function (a) {
  if (a.id !== 'shadows-of-blackstone-keep') return;
  a.documents = [
    { label: 'Adventure (md)', href: 'adventures/shadows-of-blackstone-keep/docs/adventure.md' },
    { label: 'Adventure (PDF)', href: 'adventures/shadows-of-blackstone-keep/docs/adventure.pdf' },
    { label: 'Adventure – Monsters (PDF)', href: 'adventures/shadows-of-blackstone-keep/docs/adventure-monsters.pdf' },
    { label: 'Adventure (DOCX)', href: 'adventures/shadows-of-blackstone-keep/docs/Shadows over Blackstone Keep.docx' },
    { label: 'Adventure – Monsters (DOCX)', href: 'adventures/shadows-of-blackstone-keep/docs/Shadows over Blackstone Keep - Monsters.docx' }
  ];
});
