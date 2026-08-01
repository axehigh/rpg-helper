window.RPG_HELPER = window.RPG_HELPER || {adventures: []};

window.RPG_HELPER.adventures = window.RPG_HELPER.adventures.filter(a => a.id !== 'shadows-of-blackstone-keep');

window.RPG_HELPER.adventures.push({
    id: 'shadows-of-blackstone-keep',
    title: 'Shadows of Blackstone Keep',
    meta: {players: 4, level: 3, duration: '3–4 hours'},
    intro:
        'The adventure begins immediately. The players arrive at the edge of Oakhollow. ' +
        'Smoke chokes the sky, throwing the looming sunset into crimson shadows. ' +
        'Houses crackle in flames as villagers flee down the dirt roads.',
    objectives: [
        'Save the remaining villagers and douse critical fires.',
        'Drive off or eliminate the tactical raiders.',
        'Rescue Elder Hadrick or recover the map dropped in the chaos.'
    ],
    documents: [
        {label: 'Adventure (PDF)', href: 'adventures/shadows-of-blackstone-keep/docs/adventure.pdf'},
        {label: 'Adventure – Monsters (PDF)', href: 'adventures/shadows-of-blackstone-keep/docs/adventure-monsters.pdf'},
        {label: 'Adventure (DOCX)', href: 'adventures/shadows-of-blackstone-keep/docs/Shadows over Blackstone Keep.docx'},
        {label: 'Adventure – Monsters (DOCX)', href: 'adventures/shadows-of-blackstone-keep/docs/Shadows over Blackstone Keep - Monsters.docx'}
    ],
    monsters: [
        'goblin-skirmisher',
        'goblin-archer',
        'goblin-hexer',
        'worg',
        'hobgoblin-soldier',
        'bugbear-brute',
        'hobgoblin-captain',
        'kragath-iron-fang'
    ],
    scenes: [
        {
            id: 'scene-1',
            title: 'The Oakhollow Raiders',
            image: 'adventures/shadows-of-blackstone-keep/images/01_Attack_on_Oakhollow.jpg',
            readAloud:
                'Smoke chokes the sky above Oakhollow, ' +
                'throwing the looming sunset into crimson shadows. ' +
                'Houses crackle in flames as villagers flee down the dirt roads. ' +
                'Between the burning storefronts, goblins dart — a raiding party, organized and quick.',
            readAloudNo:
                'Røyk kveler himmelen over Oakhollow og støper den truende solnedgangen i karmosinrøde skygger. ' +
                'Husene spraker i flammer mens landsbyfolket flykter nedover de støvete stiene. ' +
                'Mellom de brennende husfasadene farer gobliner frem – en plyndringshorde, velorganisert og rask.',
            environment:
                'Village square. Burning wooden beams create lines of sight blockage. Choking smoke acts as light cover (+2 AC/Dex saves) if standing inside marked zones. One thatch-roof tavern stands mostly intact but burning at the base.',
            enemies: [
                {id: 'goblin-skirmisher', count: 6},
                {id: 'goblin-archer',count:3},
                {id: 'worg'}
            ],
            notes: [
                'The raiders are not slaughtering blindly — they target specific storehouses to steal supplies, maps of the Blackstone Valley, and an ancient dwarven key.',
                'They have captured Elder Hadrick, the village blacksmith and the only living soul who can decipher the ancient dwarven milestones in the Blackwood Forest.'
            ],
            tactics: [
                'Hit-and-Run: the 3 Goblin Skirmishers dart out from burning storefronts, slash (+4, 1d6+2), then use Nimble Escape as a bonus action to Disengage or Hide behind debris.',
                'Roof Sniper: the Goblin Archer starts on the thatch roof, using Aimed Shot to pressure the backline. If engaged, it jumps across to a low wagon or fence and retreats rather than fight in melee.',
                'Worg Chaos: the Worg surges into the frontline. Bite (+5, 2d6+3); on a hit the target must pass a DC 13 Strength save or be knocked prone. The moment a hero falls, the skirmishers swarm out of the smoke to strike with advantage.'
            ],
            aftermath:
                'Once the raiders fall or scatter, the heroes find a crude map dropped by a fleeing goblin — a path deep into the Blackwood Forest toward "The Broken Bridge". A wounded, soot-stained ranger stumbles forward, coughing: "They dragged Elder Hadrick away... Kragath has already entered the valley. If he reaches the Heartforge with that key... we\'re finished."'
        },
        {
            id: 'scene-2',
            title: 'Through Blackwood Forest',
            image: 'adventures/shadows-of-blackstone-keep/images/02_b_the_forest_english.jpg',
            environment:
                'Dense, dark foliage. The players track fresh bootprints and claw marks of the warband deeper into the woods.',
            notes: [
                'The Torn Wagon: a shattered merchant cart. The wood is splintered not by axes but by massive, crushing jaws — introducing the destructive force of Worgs before the players meet another.',
                'The Fragmented Campfire: remains of a vanguard campsite. Goblin skirmishers were forced to sleep in the mud away from the fire; hobgoblin soldiers took the only dry ground. Discarded marrow bones and polished armor straps reveal a strict, harsh hierarchy.',
                'Hazard — Giant Spider Webs: webs block a narrow ravine shortcut. The party can clear them quietly (Athletics/Sleight of Hand) or take a longer route that ticks down their remaining time before sunset.'
            ]
        },
        {
            id: 'scene-3',
            title: 'Dwarven Milestones',
            image: 'adventures/shadows-of-blackstone-keep/images/02_the_forest_runes.jpg',
            notes: [
                'Deep in the woods stand ancient, mossy stone monoliths carved with dwarven runes.',
                'If a player reads Dwarvish (or checks the recovered village records), they can decipher the runes: "Beware the Heartforge\'s light; it warms the just, but burns the greedy."',
                'This foreshadows the room mechanics of the Forge Locks puzzle and the Heartforge battle.'
            ]
        },
        {
            id: 'scene-4',
            title: 'The Broken Bridge',
            image: 'adventures/shadows-of-blackstone-keep/images/03_brigde.jpg',
            readAloud:
                'The forest path ends at the edge of a massive, rocky gorge. A grand stone dwarven bridge once spanned the gap, but half of it has collapsed into a churning river hundreds of feet below. Across the remaining side waits a heavily armed hobgoblin blockade. Before combat, you overhear a tense argument — a goblin hexer shrilly berating a massive bugbear about the tactical importance of holding the defensive line, while the bugbear growls in frustration, eager to smash things.',
            readAloudNo:
                'Skogsstien ender ved randen av en mektig, klippefylt kløft. En storslått dvergbro av stein spente en gang over gapet, men deler har styrtet ned i en brusende elv, hundrevis av fot under. På motsatt side venter en tungt bevæpnet hobgoblinblokade. Før kampen bryter løs, overhører dere en anspent krangel – en goblinheks som skingrende skjeller ut en diger bugbear om hvor avgjørende det er å holde forsvarslinjen, mens bugbearen knurrer av frustrasjon, ivrig etter å knuse ting.',
            environment:
                'A narrow, stable stone path leading to a 15-foot gap over the gorge. Planks of wood, ropes, and crumbling stone pillars offer ways to cross or swing over. [Party Side] ===[15-ft Gap]=== [Hobgoblin Soldiers] === [Hexer / Bugbear]',
            enemies: [
                {id: 'hobgoblin-soldier', count: 2},
                {id: 'bugbear-brute'},
                {id: 'goblin-hexer'}
            ],
            tactics: [
                'The Phalanx Wall: the 2 Hobgoblin Soldiers advance to the narrowest choke point and lock shields. Shield Wall triggers (AC 18, longsword 1d8+4). They form an impenetrable wall and refuse to budge.',
                'The Bugbear Ambush: the Bugbear Brute hides in the rocky clefts. The moment a player uses a rope, leaps across, or climbs the masonry to bypass the wall, it leaps out — Ambusher adds 2d6 to its first morningstar hit.',
                "The Hexer's Ritual: Round 1 casts Smoke Cloud over the players' landing zone. Round 2 Curses the party's heaviest hitter (disadvantage on next attack). Round 3 uses Battle Chant to give the bugbear an out-of-turn movement or attack.",
                'Alternative: exploit faction tension. A clever illusion or shouted deception mimicking Kragath\'s voice can trick the impatient bugbear into charging across the unstable beams, breaking the hobgoblins\' shield synergy.'
            ],
            aftermath:
                'Once defeated, the heroes find healing potions, an ancient dwarven map detailing the interior of Blackstone Keep, and a heavy iron key meant to open the keep\'s outer perimeter gate.'
        },
        {
            id: 'scene-5',
            title: 'Blackstone Keep — The Collapsed Hall',
            image: 'adventures/shadows-of-blackstone-keep/images/04_1_blackstone_room1.jpg',
            readAloud:
                'The heavy iron doors unlock onto a grand, dusty hall lined with monumental dwarven statues holding stone hammers. The floor is covered in a thick, unnatural layer of white dust left behind by Kragath\'s vanguard.',
            readAloudNo:
                'De tunge jerndørene låses opp til en storslått, støvdekt sal flankert av monumentale dvergstatuer som løfter steinhammere. Gulvet ligger under et tykt, unaturlig lag av hvitt støv, etterlatt av Kragaths fortropp.',
            notes: [
                'Tension builder: torchlight makes the statues appear to lean and shift. They are entirely mundane stone — they do absolutely nothing.',
                'Hidden danger: near the center, the crushed corpse of a Goblin Skirmisher lies pinned under fallen ceiling masonry. Tucked into its armor is a scrap of parchment: "The statues watch, but the floor is what bites."',
                'The note alerts the players to inspect the floor — hidden pressure plates trigger swinging iron chains from the ceiling, turning a stroll into a tense investigation.'
            ]
        },
        {
            id: 'scene-6',
            title: 'Blackstone Keep — The Forge Locks',
            image: 'adventures/shadows-of-blackstone-keep/images/04_2_blackstone_room2.jpg',
            readAloud:
                'The exit is a pair of towering, solid iron doors etched with massive gears. Four ancient dwarven stone wheels are built into the wall beside them, each carved with a glowing, mystical rune. Clues regarding the proper alignment are etched into the surrounding masonry.',
            readAloudNo:
                'Utgangen er et par tårnhøye, massive jerndører, gravert med enorme tannhjul. Fire urgamle dverghjul av stein er murt inn i veggen ved siden av dem, hvert skåret med en glødende, mystisk rune. Ledetråder til riktig stilling er etset inn i den omliggende steinmuren.',
            enemies: [{id: 'goblin-skirmisher', count: 2}],
            notes: [
                'Puzzle — The Forging Order. The four wheels read left to right. Correct order: Bellows (Wind), Flame (Fire), Iron (Earth), Quench (Water).',
                'Clue (lintel inscription): "To wake the Heartforge, mimic the master smith\'s work. First, blast the coals with wind. Second, heat the coals with fire. Third, shape the heavy metal. Fourth, cool it in the deep waters."',
                'Clue (vanguard scratch-mark): a dead goblin scratched a crude arrow pointing from the left wheel to the right (1 -> 2 -> 3 -> 4) — the wheels read left to right.',
                'Mechanics: turning a rusted stone wheel requires a DC 10 Strength (Athletics) check as an Action.',
                'Ambush trigger: the moment the first two wheels are aligned (Bellows, Flame), a grinding mechanism echoes — a hidden side panel slides open and 2 Goblin Skirmishers drop out while the party turns the remaining wheels.',
                'Wrong guess: a small vent hisses boiling steam, dealing 1 fire damage (no roll needed) to the character turning it.',
                'The Choice: the frontline must hold off the agile skirmishers while the rogue or spellcaster focuses on completing the physical puzzle rotations before reinforcements arrive.'
            ]
        },
        {
            id: 'scene-7',
            title: 'Blackstone Keep — The Heartforge',
            image: 'adventures/shadows-of-blackstone-keep/images/04_3_final_battle.jpg',
            readAloud:
                'The vault doors grind open onto a massive, circular chamber. Great stone channels hum with glowing molten lava around a central platform connected by narrow, broken iron bridges and swinging chains. Deep beneath the floor grates, the core of the ancient Heartforge pulses with an angry, blinding orange light. Kragath Iron Fang stands at the central control altar, holding the primary dwarven key as the machinery awakens.',
            readAloudNo:
                'Hvelvdørene skjærer seg åpne mot et mektig, sirkulært kammer. Store steinkanaler brummer av glødende, smeltet lava rundt en sentral plattform, forbundet av smale, knuste jernbroer og svingende kjettinger. Dypt under gitterristene i gulvet pulserer kjernen i det urgamle Heartforge med et rasende, blendende oransje lys. Kragath Iron Fang står ved det sentrale kontrollalteret og holder dvergnøkkelen mens maskineriet våkner.',
            environment:
                'Lava channels surround a central altar. \n' +
                '[Goblin Archer on Crane]' +
                '— [Hobgoblin Soldier]' +
                '- [KRAGATH AT THE ALTAR]' +
                '— [Hobgoblin Soldier]',
            enemies: [
                {id: 'kragath-iron-fang'},
                {id: 'hobgoblin-soldier', count: 2},
                {id: 'goblin-archer'},
                {id: 'goblin-hexer', count: 1, optional: true}
            ],
            notes: [
                'Commander\'s Aura: Kragath\'s passive aura grants all allies within 30 ft a +1 bonus to hit.',
                'Guardian Phalanx: the 2 Hobgoblin Soldiers lock shields directly in front of Kragath (AC 18, Shield Wall) to absorb attacks and block the party from rushing the warlord.',
                'Phase 2 (Second Wind): the exact moment Kragath drops below 42 HP (half of his 85 maximum), he triggers Second Wind as a reaction — the Heartforge pulses and restores 20 HP.',
                'The Heartforge Ember: once during the fight, Kragath slams a glowing crystal into the iron floor grates — a 15-ft cone of fire (DC 13 Dexterity save or 3d6 fire damage). Forces the players to scatter across the dangerous, narrow bridges.',
                'Battlefield Events — Initiative Count 20, each round: R1 The Awakening (violent tremors; the chamber is difficult terrain except solid iron grates and main stone pillars). R2 Steam Eruption (burst pipes — a 10-ft wide line of total concealment). R3 Bridge Collapse / Battle Cry (the eastern iron walkway shears off into the lava; Kragath roars Battle Cry — all surviving goblins and hobgoblins take an out-of-turn movement to pin down the disoriented heroes).',
                'Ending: when Kragath falls, his body slumps over the altar, fracturing the primary key inside the control mechanism. The Heartforge becomes highly volatile and self-destructs as lava channels overflow.',
                'Escape: the party has exactly 5 rounds. Athletics to lift falling iron portcullises; Acrobatics to clear widening lava fissures and pull allies across. They burst through the outer gates just as the towers collapse in a cloud of dust and harmless magical sparks.',
                'Reward: the sky clears and the sun sets peacefully over a saved valley. Elder Hadrick presents their due rewards, and the dwarven forge spirits bless each hero with a small magical gift — a +1 weapon, a protective charm, or a glowing heirloom shield.'
            ]
        }
    ]
});
