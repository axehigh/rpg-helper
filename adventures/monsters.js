window.RPG_HELPER = window.RPG_HELPER || { adventures: [], monsters: {} };

window.RPG_HELPER.monsters = {
  'goblin-skirmisher': {
    id: 'goblin-skirmisher',
    name: 'Goblin Skirmisher',
    role: 'Fast melee',
    ac: 15,
    hp: 10,
    speed: '30 ft',
    hit: '+4',
    damage: 'Scimitar 1d6+2',
    special: 'Nimble Escape: can Hide or Disengage as a bonus action. Uses hit-and-run tactics.'
  },
  'goblin-archer': {
    id: 'goblin-archer',
    name: 'Goblin Archer',
    role: 'Artillery',
    ac: 14,
    hp: 12,
    speed: '30 ft',
    hit: '+5',
    damage: 'Longbow 1d8+2',
    special: 'Aimed Shot (5–6): deals an extra 1d6 damage. Stays at range and retreats if threatened.'
  },
  'goblin-hexer': {
    id: 'goblin-hexer',
    name: 'Goblin Hexer',
    role: 'Support',
    ac: 13,
    hp: 18,
    speed: '30 ft',
    hit: '+5',
    damage: 'Hex Bolt 2d6',
    special: 'Once each: Curse (next attack has disadvantage), Battle Chant (ally moves), Smoke Cloud (10-ft obscuring cloud).'
  },
  'worg': {
    id: 'worg',
    name: 'Worg',
    role: 'Beast',
    ac: 13,
    hp: 26,
    speed: '50 ft',
    hit: '+5',
    damage: 'Bite 2d6+3',
    special: 'Knock Down: target makes a DC 13 STR save or falls prone.'
  },
  'hobgoblin-soldier': {
    id: 'hobgoblin-soldier',
    name: 'Hobgoblin Soldier',
    role: 'Front line',
    ac: 16,
    hp: 16,
    speed: '30 ft',
    hit: '+4',
    damage: 'Longsword 1d8+2',
    special: 'Shield Wall: if next to another hobgoblin, +2 AC and deals +2 damage.'
  },
  'bugbear-brute': {
    id: 'bugbear-brute',
    name: 'Bugbear Brute',
    role: 'Heavy hitter',
    ac: 16,
    hp: 30,
    speed: '30 ft',
    hit: '+4',
    damage: 'Morningstar 2d8+2',
    special: 'Ambusher: first attack in combat deals an extra 2d6 damage.'
  },
  'hobgoblin-captain': {
    id: 'hobgoblin-captain',
    name: 'Hobgoblin Captain',
    role: 'Leader',
    ac: 18,
    hp: 45,
    speed: '30 ft',
    hit: '+5',
    damage: 'Longsword 1d8+3 (x2 attacks)',
    special: 'Command (Bonus Action): one ally moves half speed, makes one attack, or gains +2 AC until next turn.'
  },
  'kragath-iron-fang': {
    id: 'kragath-iron-fang',
    name: 'Kragath Iron Fang',
    role: 'Final Boss',
    ac: 18,
    hp: 85,
    speed: '30 ft',
    hit: '+6',
    damage: 'Greatsword 2d6+4 (x2 attacks)',
    special: 'Commander: allies gain +1 to hit. Second Wind: once below half HP, regain 20 HP. Battle Cry: once, all allies move or attack immediately.'
  }
};
