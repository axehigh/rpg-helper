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
  'marsh-hound': {
    id: 'marsh-hound',
    name: 'Marsh Hound',
    role: 'Beast',
    ac: 13,
    hp: 20,
    speed: '40 ft, swim 30 ft',
    hit: '+5',
    damage: 'Bite 1d8+3',
    special: [
      'Muddy Grip: on a hit, the target makes a DC 12 Strength save or is grappled in the sucking mud.',
      'Pack Hunt: gains advantage on attacks against a creature grappled by another marsh hound.'
    ]
  },
  'will-o-wisp': {
    id: 'will-o-wisp',
    name: 'Will-o\'-Wisp',
    role: 'Support',
    ac: 14,
    hp: 20,
    speed: '0 ft, fly 50 ft (hover)',
    hit: '+5',
    damage: 'Shocking Touch 2d6',
    special: [
      'Insubstantial: resistant to nonmagical bludgeoning, piercing, and slashing.',
      'Luring Light: dims and drifts toward the slowest hero, drawing them off the path and into the mire.'
    ]
  },
  'spirit-guardian': {
    id: 'spirit-guardian',
    name: 'Ward Spirit',
    role: 'Undead Guardian',
    ac: 14,
    hp: 25,
    speed: '30 ft, fly 30 ft',
    hit: '+5',
    damage: 'Chill Touch 1d10+3',
    special: [
      'Wardbound: rises where a wrong stone was pressed; ignores difficult terrain and cannot leave the circle.',
      'Grasping Moss: on a hit, the target makes a DC 12 Strength save or is restrained by spectral vines until it saves.'
    ]
  },
  'bark-touched': {
    id: 'bark-touched',
    name: 'Bark-Touched Servant',
    role: 'Brute',
    ac: 14,
    hp: 26,
    speed: '20 ft',
    hit: '+4',
    damage: 'Rooted Slam 1d8+3',
    special: [
      'Bark Hide: resistant to nonmagical bludgeoning and piercing damage.',
      'Slow Steps: speed is halved but it ignores difficult terrain in the swamp.'
    ]
  },
  'zombie': {
    id: 'zombie',
    name: 'Zombie',
    role: 'Undead',
    ac: 8,
    hp: 22,
    speed: '20 ft',
    hit: '+3',
    damage: 'Slam 1d6+1',
    special: [
      'Undead Fortitude: when dropped to 0 HP, makes a DC 12 CON save — on a success it drops to 1 HP instead.',
      'Mindless: ignores fear and difficult terrain; advances in a straight line toward the nearest living creature.'
    ]
  },
  'skeleton': {
    id: 'skeleton',
    name: 'Skeleton',
    role: 'Undead',
    ac: 13,
    hp: 13,
    speed: '30 ft',
    hit: '+4',
    damage: 'Shortbow 1d6+2',
    special: [
      'Fragile Frame: bludgeoning damage is doubled.',
      'Stands at range and shoots from cover; shatters if forced into melee by a bludgeon.'
    ]
  },
  'ghoul': {
    id: 'ghoul',
    name: 'Ghoul',
    role: 'Undead',
    ac: 12,
    hp: 22,
    speed: '30 ft',
    hit: '+4',
    damage: 'Claw 1d6+2',
    special: [
      'Paralyzing Bite: on a hit, the target makes a DC 11 CON save or is paralyzed until the ghoul\'s next turn.',
      'Ravenous: attacks a paralyzed target with advantage.'
    ]
  },
  'cultist': {
    id: 'cultist',
    name: 'Red Skull Cultist',
    role: 'Zealot',
    ac: 12,
    hp: 12,
    speed: '30 ft',
    hit: '+4',
    damage: 'Dagger 1d4+2',
    special: [
      'Ritual Knife: on a hit, marks the target — the abbot\'s undead move toward it.',
      'Skull Chant: once, all cultists and undead within 30 ft gain +1 to hit for a round.'
    ]
  },
  'red-skull-abbot': {
    id: 'red-skull-abbot',
    name: 'Abbot Cael, the Red Skull',
    role: 'Final Boss',
    ac: 15,
    hp: 60,
    speed: '30 ft',
    hit: '+5',
    damage: 'Censer Flail 1d8+3 (x2 attacks)',
    special: [
      'Tithe Bell: once, every undead in the vault takes an immediate turn.',
      'Saint\'s Vigor: once below half HP, regains 15 HP as the saint\'s light bends around him.',
      'Broken Zeal: at 0 HP he does not fall — he kneels, and the choice is offered.'
    ]
  },
  'bog-witch': {
    id: 'bog-witch',
    name: 'Bog Witch',
    role: 'Final Boss',
    ac: 15,
    hp: 55,
    speed: '30 ft',
    hit: '+5',
    damage: 'Necrotic Grasp 2d6+3',
    special: [
      'Curse of Bark: once per turn, a target within 30 ft makes a DC 13 Charisma save or its speed is halved and it takes 1d4 necrotic damage each turn until it succeeds.',
      'Grasping Reeds: as an action, every hero in the lair makes a DC 12 Dexterity save or is restrained until the witch\'s next turn.',
      'Call the Court: once, summons 2 marsh hounds from the mire.',
      'Broken Promise: at 0 HP the witch does not fall — she kneels, and the truth of the curse spills out.'
    ]
  }
};
