window.RPG_HELPER = window.RPG_HELPER || {adventures: []};

window.RPG_HELPER.adventures = window.RPG_HELPER.adventures.filter(a => a.id !== 'the-iron-shackle-mines');

window.RPG_HELPER.adventures.push({
    id: 'the-iron-shackle-mines',
    title: 'The Iron Shackle Mines',
    meta: {players: 4, level: '2', duration: '3 hours'},
    intro:
        'A desperate plea from Rockfall Valley leads the heroes to a dark, jagged canyon. ' +
        'The brutal Iron Shackle cartel has abducted several townspeople, forcing them to ' +
        'labor in a forgotten iron mine. A subterranean slave caravan is arriving at dawn ' +
        'to take them deep into the Underdark. The party has only hours to act.',
    objectives: [
        'Track the raiders through the canyon switchback.',
        'Infiltrate or storm the surface mine camp.',
        'Breach the subterranean slave pens and recover the cage keys.',
        'Defeat Taskmaster Gruul and rescue the captive villagers before dawn.'
    ],
    documents: [
        {label: 'Adventure (md)', href: 'adventures/the-iron-shackle-mines/docs/adventure.md'}
    ],
    monsters: [
        'slaver-scout',
        'slaver-hound',
        'iron-shackle-thug',
        'iron-shackle-enforcer',
        'taskmaster-gruul'
    ],
    scenes: [
        {
            id: 'scene-1',
            title: 'The Canyon Switchback',
            images: [
                'adventures/the-iron-shackle-mines/images/01_canyon_switchback.jpg'
            ],
            battlemap: 'ttlb-p35-l-bridge',
            readAloud:
                'The red dust of the canyon gets in your throat, and the afternoon heat is stifling. ' +
                'Following the trail of iron-rimmed wagon wheels, you climb the narrow switchback. ' +
                'Below you, the gorge drops into a jagged, rocky chasm. Ahead, an ancient stone ' +
                'bridge spans the gap — and a low growl from the shadows warns you that you are not alone.',
            readAloudNo:
                'Det røde støvet fra canyonen setter seg i halsen, og ettermiddagsvarmen er kvelende. ' +
                'Du følger sporene etter jernbeslåtte vognhjul oppover den smale svingen. ' +
                'Under deg stuper kløften ned i en taggete, steinete avgrunn. Foran deg spenner ' +
                'en gammel steinbro over gapet – og en lav knurring fra skyggene advarer om ' +
                'at dere ikke er alene.',
            environment:
                'Narrow, dusty canyon ledge. A 50-foot deep chasm spans the gap, crossed by a sturdy ' +
                'stone bridge. Footprints of heavy boots and iron-rimmed wheels lead over the crossing.',
            notes: [
                'The Slaver Scout: A scout is posted on the opposite ledge behind low boulders. A DC 13 Perception check spots their crossbow glint.',
                'The Slaver Hound: A snarling beast is tethered near the bridge. It growls if anyone approaches within 30 feet, alerting the scout if they weren\'t spotted.',
                'Falling Rocks: If the scout is alerted, they use a bonus action to tip a pile of rocks onto the bridge. Anyone on the bridge must make a DC 12 Dexterity saving throw or take 1d6 bludgeoning damage.'
            ],
            enemies: [
                {id: 'slaver-scout', count: 1},
                {id: 'slaver-hound', count: 1}
            ],
            tactics: [
                'Scout Tactics: The slaver scout stays behind cover (+2 AC) and fires their light crossbow, releasing caltrops onto the bridge approach if melee characters close in.',
                'Hound Pack Tactics: The slaver hound attacks whoever crosses the bridge, trying to keep them pinned while the scout shoots.'
            ],
            aftermath:
                'The guards fall, leaving the bridge clear. Pushing past the canyon lip, the lights of the ' +
                'surface camp gleam through the dusty twilight.'
        },
        {
            id: 'scene-2',
            title: 'The Surface Mine Camp',
            images: [
                'adventures/the-iron-shackle-mines/images/02_surface_mine_camp.jpg'
            ],
            battlemap: 'ttb1-p7-l-village-walls',
            readAloud:
                'At the top of the canyon, a crude wooden palisade blocks the path, reinforced with sharp ' +
                'iron spikes. Behind the logs, you can see watchtowers and the canvas roofs of makeshift tents. ' +
                'Rough laughter and the clink of dice echo from within, where slaver thugs keep watch ' +
                'over the iron mine\'s entrance. The heavy wooden gates are barred shut.',
            readAloudNo:
                'På toppen av canyonen sperrer en grov trepalisade veien, forsterket med skarpe jernpigger. ' +
                'Bak stokkene kan du se vakttårn og teltduktakene til midlertidige telt. ' +
                'Rå latter og klinkingen av terninger ekkoer innenfra, der slavevoktere holder vakt ' +
                'over inngangen til jerngruven. De tunge portene er sperret igjen.',
            environment:
                'The camp perimeter. A 10-foot-high spiked wooden palisade with a single heavy double gate. ' +
                'Two 15-foot watchtowers stand inside the wall, providing high vantage points.',
            notes: [
                'Watchtower Sentry: A slaver scout stands watch on the western tower. If they spot the party, they ring a heavy bronze bell, alert the camp, and double the guards on the gates.',
                'The Palisade Gap: A DC 12 Investigation or Perception check reveals a loose, rotting log on the eastern palisade wall. A DC 13 Strength check can pry it loose quietly, creating a medium-sized gap to sneak through.',
                'The Gambling Thugs: Three iron shackle thugs are gathered around a campfire just inside the gates, distracted by a high-stakes dice game. Their passive Perception is reduced by 2.'
            ],
            enemies: [
                {id: 'iron-shackle-thug', count: 2},
                {id: 'slaver-scout', count: 1, optional: true}
            ],
            tactics: [
                'Camp Alarm: If the alarm bell is rung, the watchtower scout fires on intruders while the thugs form a defensive line at the gate. If stealth is maintained, the thugs can be ambushed or bypassed completely.'
            ],
            aftermath:
                'Beyond the tents and campfires, the yawning black mouth of the iron mine plunges into the rock face. ' +
                'From the depths, you hear the distant, echoing crack of a whip.'
        },
        {
            id: 'scene-3',
            title: 'The Quarry and Slave Pens',
            images: [
                'adventures/the-iron-shackle-mines/images/03_quarry_and_slave_pens.jpg'
            ],
            battlemap: 'ttlb-p27-l-cellar',
            readAloud:
                'Descending into the cool, dark tunnels of the mine, the heavy scent of sulfur and sweat fills your nose. ' +
                'From the gloom ahead comes the rhythmic, metallic clinking of pickaxes, punctuated by the sharp crack ' +
                'of a whip. Iron cages are built directly into the rough cavern walls, holding several pale, ' +
                'exhausted villagers in heavy chains. A pair of brutal enforcers stand over them, laughing as they demand more effort.',
            readAloudNo:
                'Når dere stiger ned i de kjølige, mørke tunnelene i gruven, fylles nesen av den tunge lukten av svovel ' +
                'og svette. Fra mørket foran høres den rytmiske, metalliske klangen av hakker, avbrutt av det skarpe ' +
                'smellet fra en pisk. Jernbur er bygget direkte inn i de grove huleveggene, og rommer flere bleke, ' +
                'utmattede landsbyboere i tunge lenker. Et par brutale vakter står over dem og ler mens de krever mer innsats.',
            environment:
                'Subterranean quarry. Raw iron veins catch the dim light of lanterns hanging from timber beams. ' +
                'The floor is uneven, cluttered with loose rubble and rusty ore carts.',
            notes: [
                'The Captive Miners: Six villagers from Rockfall Valley are locked in two heavy iron cages. They are exhausted (1 level of exhaustion if freed to fight) but can share details about Taskmaster Gruul and the subterranean buyers.',
                'The Cage Key: The iron-shackle enforcer has the heavy ring of cage keys hanging from their belt. A stealthy character can attempt to pickpocket them (DC 14 Sleight of Hand).',
                'Ore Cart Hazard: A player can kick a loaded ore cart down the sloped tracks as an Action. The cart travels in a straight line; any creature in its path must make a DC 12 Dexterity save or take 2d6 bludgeoning damage and be knocked prone.'
            ],
            enemies: [
                {id: 'iron-shackle-thug', count: 2},
                {id: 'iron-shackle-enforcer', count: 1}
            ],
            tactics: [
                'Whip and Strike: The thugs try to knock characters prone with their Whip Lash, allowing the enforcer to move in and strike them with their Greatsword, activating their No Mercy bonus damage.'
            ],
            aftermath:
                'With the enforcers defeated, the keys unlock the rusty cage doors. The freed villagers weep in relief, ' +
                'but warn you that the brother, Thomas, was taken further down to the smelting forge where Taskmaster Gruul is preparing him for transport.'
        },
        {
            id: 'scene-4',
            title: 'The Taskmaster\'s Forge',
            images: [
                'adventures/the-iron-shackle-mines/images/04_taskmasters_forge.jpg'
            ],
            battlemap: 'ttb1-p31-l-underground',
            readAloud:
                'The tunnel opens into a vast subterranean chamber dominated by a roaring stone forge. ' +
                'The heat is intense, and the walls glow red in the firelight. At the center of the hall, ' +
                'a massive, heavily scarred bugbear stands beside a heavy iron cage-wagon. In one hand he holds ' +
                'a massive iron mallet, and in the other, a coiled chain whip. "Pack them in!" he roars to ' +
                'his guards. "The subterranean buyers won\'t wait!"',
            readAloudNo:
                'Tunnelen åpner seg inn i et enormt underjordisk kammer dominert av en brølende steinsmie. ' +
                'Varmen er intens, og veggene gløder rødt i ildskjæret. I sentrum av salen står en massiv, ' +
                'hardt arret bugbear ved siden av en tung jernburvogn. I den ene hånden holder han en massiv ' +
                'jernslegge, og i den andre en kveilet kjettingpisk. «Pakk dem inn!» brøler han til vaktene sine. ' +
                '«De underjordiske kjøperne venter ikke!»',
            environment:
                'Smelting forge room. Large stone basins of molten iron flank the central platform. ' +
                'The air is thick with smoke, granting light obsculement (disadvantage on ranged attacks beyond 30 feet).',
            notes: [
                'The Smelting Basins: A creature pushed into a smelting basin of molten iron takes 3d6 fire damage (DC 13 Strength or Dexterity saving throw to avoid falling in if pushed near the edge).',
                'Thomas in Peril: Thomas is bound and gagged inside the cage-wagon. He can be freed with a DC 12 Dexterity (Sleight of Hand/Thieves\' Tools) check as an Action to unlock the padlock, or by smashing the lock (AC 15, HP 10).',
                'The Slaver Ledger: On Gruul\'s stone desk lies a heavy parchment ledger. It lists payment received from Lord Malakor of the Capital, detailing a contract to supply 50 "strong miners" for an unknown subterranean excavation.'
            ],
            enemies: [
                {id: 'taskmaster-gruul'},
                {id: 'iron-shackle-enforcer', count: 1},
                {id: 'slaver-hound', count: 2, optional: true}
            ],
            tactics: [
                'Gruul\'s Leadership: Gruul uses Get to Work! to command the enforcer to strike key targets. He uses Shackler on the most dangerous-looking melee fighter to restrain them, then focuses on other heroes.',
                'The Hounds: If the optional hounds are active, they rush the backline spellcasters or rangers to disrupt them under the cover of the smoke.'
            ],
            aftermath:
                'Taskmaster Gruul crashes to the stone floor, his iron mallet rolling into the slag. The remaining ' +
                'guards drop their weapons and scatter into the dark side-tunnels. The captives are saved.'
        },
        {
            id: 'monster-gallery',
            title: 'Monster Gallery',
            images: [
                'adventures/the-iron-shackle-mines/images/monster-gallery.jpg'
            ],
            gallery: true
        }
    ]
});
