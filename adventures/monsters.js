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
    special: [
      'Nimble Escape: can Hide or Disengage as a bonus action. Uses hit-and-run tactics.',
      'If 2 or more, one can use dodge action, while other uses Nimble Escape.'
    ]
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
    special: [
      'Aimed Shot (5–6): deals an extra 1d6 damage.',
      'Stays at range and retreats if threatened.'
    ]
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
    special: [
      'Once each:',
      'Curse (next attack has disadvantage), Battle Chant (ally moves), Smoke Cloud (10-ft obscuring cloud).'
    ]
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
    special: ['Command (Bonus Action): one ally moves half speed, makes one attack, or gains +2 AC until next turn.']
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
    special: [
      'Commander: allies gain +1 to hit.',
      'Second Wind: once below half HP, regain 20 HP.',
      'Battle Cry: once, all allies move or attack immediately.'
    ]
  },
  'dwarven-shade': {
    id: 'dwarven-shade',
    name: 'Dwarven Shade',
    role: 'Undead',
    ac: 13,
    hp: 18,
    speed: '30 ft',
    hit: '+4',
    damage: 'Rusty Pick 1d8+2',
    special: [
      'Grave-chill: on a hit, the target makes a DC 12 Constitution save or its speed is halved until the end of its next turn.',
      'Unburied: rises from collapsed rubble and ignores difficult terrain in the mine galleries.'
    ]
  },
  'mine-crawler': {
    id: 'mine-crawler',
    name: 'Mine Crawler',
    role: 'Beast',
    ac: 13,
    hp: 16,
    speed: '30 ft, climb 20 ft',
    hit: '+5',
    damage: 'Bite 1d10+3',
    special: [
      'Blindsight 30 ft: unaffected by darkness or smoke.',
      'Web Snare: once per combat, hits a target with sticky web (DC 12 Strength save or restrained).'
    ]
  },
  'ember-elemental': {
    id: 'ember-elemental',
    name: 'Ember Elemental',
    role: 'Hazard',
    ac: 12,
    hp: 22,
    speed: '30 ft (hover)',
    hit: '+5',
    damage: 'Burning touch 1d10+3',
    special: [
      'Fiery Form: a creature ending its turn within 5 ft takes 1d4 fire damage.',
      'Born of the vents: spawned from superheated cracks in the rock and cannot leave the chamber where it was born.'
    ]
  },
  'forge-guardian': {
    id: 'forge-guardian',
    name: 'Forge Guardian',
    role: 'Construct',
    ac: 16,
    hp: 40,
    speed: '20 ft',
    hit: '+6',
    damage: 'Anvil Slam 2d6+4',
    special: [
      'Immutable Form: immune to effects that would change its shape or control it.',
      'Ember Core: when destroyed, explodes in a 10-ft burst of fire (DC 12 Dexterity save or 2d6 fire damage).',
      'Dormant until the vault door is opened.'
    ]
  },
  'keldor-graymantle': {
    id: 'keldor-graymantle',
    name: 'Keldor Graymantle',
    role: 'Final Boss (Rival)',
    ac: 17,
    hp: 60,
    speed: '30 ft',
    hit: '+6',
    damage: 'Runic Warhammer 1d10+4 (x2 attacks)',
    special: [
      'Greed Unbound: whenever a hero touches or takes treasure, Keldor makes an out-of-turn attack.',
      'Pickpocket: once per combat, steals a small object from a hero and uses it as a bargaining chip.',
      'Relic Merchant: carries 2 healing potions and a key to the mine\'s back entrance.'
    ]
  },
  'slaver-scout': {
    id: 'slaver-scout',
    name: 'Slaver Scout',
    role: 'Fast ranged',
    ac: 14,
    hp: 13,
    speed: '30 ft',
    hit: '+4',
    damage: 'Light Crossbow 1d8+2 or Shortsword 1d6+2',
    special: [
      'Caltrops: once per combat, scatters caltrops in a 10-ft square (DC 12 Dexterity save or take 1 damage and speed is reduced to 0 until healed/rested).'
    ]
  },
  'slaver-hound': {
    id: 'slaver-hound',
    name: 'Slaver Hound',
    role: 'Beast',
    ac: 12,
    hp: 13,
    speed: '40 ft',
    hit: '+4',
    damage: 'Bite 1d6+2',
    special: 'Pack Tactics: gains advantage on attack rolls against a creature if at least one of the hound\'s allies is within 5 ft of the creature and isn\'t incapacitated.'
  },
  'iron-shackle-thug': {
    id: 'iron-shackle-thug',
    name: 'Iron Shackle Thug',
    role: 'Front line',
    ac: 13,
    hp: 18,
    speed: '30 ft',
    hit: '+4',
    damage: 'Heavy Mace 1d8+2',
    special: [
      'Whip Lash (Recharge 5–6): as a bonus action, lashes a whip at a target within 10 ft (DC 12 Strength save or be knocked prone).'
    ]
  },
  'iron-shackle-enforcer': {
    id: 'iron-shackle-enforcer',
    name: 'Iron Shackle Enforcer',
    role: 'Heavy hitter',
    ac: 15,
    hp: 26,
    speed: '30 ft',
    hit: '+4',
    damage: 'Greatsword 2d6+2',
    special: [
      'No Mercy: deals an extra 1d6 damage to prone or restrained targets.',
      'Threatening Presence: adjacent enemies have disadvantage on ranged attack rolls.'
    ]
  },
  'taskmaster-gruul': {
    id: 'taskmaster-gruul',
    name: 'Taskmaster Gruul',
    role: 'Final Boss',
    ac: 16,
    hp: 55,
    speed: '30 ft',
    hit: '+5',
    damage: 'Iron Mallet 1d10+3 (x2 attacks)',
    special: [
      'Get to Work! (Bonus Action): orders one ally to make an immediate melee attack.',
      'Shackler (once per combat): throws heavy iron shackles at a target within 15 ft (DC 13 Dexterity save or be restrained).',
      'Frightful Whiplash: once, when reduced below half HP, lets out a roar and strikes all adjacent enemies with his chain whip (1d6+3 bludgeoning and pushed 5 ft).'
    ]
  }
};
