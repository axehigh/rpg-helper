window.RPG_HELPER = window.RPG_HELPER || {adventures: []};

window.RPG_HELPER.adventures = window.RPG_HELPER.adventures.filter(a => a.id !== 'embers-of-heartforge');

window.RPG_HELPER.adventures.push({
    id: 'embers-of-heartforge',
    title: 'Embers of Heartforge',
    meta: {players: 4, level: '4–5', duration: '3–4 hours'},
    intro:
        'Months after Blackstone Keep fell, the valley trembles. The quakes come at dusk, low and rhythmic — ' +
        'a heartbeat beneath the mountains. In Oakhollow, Elder Hadrick\'s forge blazes with a fire no one stoked, ' +
        'and the heroes\' blessings glow warm against their skin, pulling east toward the ruins.',
    objectives: [
        'Answer the forge spirits\' call and return to the valley.',
        'Descend the sundered mines beneath Blackstone Keep.',
        'Reach the master smith\'s sealed vault before the rival.',
        'Decide the fate of the masterpiece and what the smith\'s testament demands.'
    ],
    documents: [
        {label: 'Adventure (md)', href: 'adventures/embers-of-heartforge/docs/adventure.md'}
    ],
    monsters: [
        'dwarven-shade',
        'mine-crawler',
        'ember-elemental',
        'forge-guardian',
        'keldor-graymantle'
    ],
    scenes: [
        {
            id: 'scene-1',
            title: 'The Ember Summons',
            images: [
                'adventures/embers-of-heartforge/images/01_ember_summons.jpg'
            ],
            readAloud:
                'The valley trembles as dusk falls over Oakhollow. Elder Hadrick\'s forge blazes with a fire ' +
                'no man stoked, and the heroes\' blessings glow warm against their skin. In the ember light, ' +
                'an old warning takes shape: "Beware the Heartforge\'s light; it warms the just, but burns the greedy."',
            readAloudNo:
                'Dalven skjelver mens skumringen faller over Oakhollow. Elder Hadricks smie blusser med en ild ' +
                'ingen har tent, og heltenes velsignelser gløder varme mot huden. I glødeskinnet tar en gammel ' +
                'advarsel form: «Vokt deg for Heartforges lys; det varmer de rettferdige, men brenner de grådige.»',
            environment:
                'Oakhollow village green, evening. Elder Hadrick\'s forge glows from within though no fire is lit. ' +
                'The quakes come at dusk — a DC 12 Dexterity (Acrobatics) check or a hero stumbles as the ground shifts.',
            notes: [
                'The glowing gifts: each hero\'s forged blessing (weapon, charm, shield) glows warm and pulls east toward the ruins — the forge spirits\' summons.',
                'Hadrick found the opening: the Heartforge\'s collapse split the mountain along an old seam, exposing a mine shaft long thought sealed.',
                'The rival: a collector\'s rumor claims the dwarves of Blackstone hid their greatest work beneath the mountain. A relic merchant named Keldor Graymantle has been seen near the ruins with hired help.'
            ],
            aftermath:
                'That night the blessings flare to full brightness, and in the ember light the old warning ' +
                'takes shape: "Beware the Heartforge\'s light; it warms the just, but burns the greedy."'
        },
        {
            id: 'scene-2',
            title: 'The Sundered Descent',
            images: [
                'adventures/embers-of-heartforge/images/02_sundered_descent.jpg'
            ],
            readAloud:
                'The shaft opens into ember-lit galleries: abandoned work halls where tools still hang, ' +
                'ore carts rusted to their tracks, and pillars carved by generations of dwarven hands. ' +
                'The mountain shifts and groans around you — a wound that refuses to heal.',
            readAloudNo:
                'Skaftet åpner seg mot glødebelyste gallerier: forlatte arbeidssaler hvor verktøyene fortsatt ' +
                'henger, malmvogner rustet fast til skinnene, og søyler hugget av generasjoner av dvergehender. ' +
                'Fjellet flytter på seg og stønner rundt dere – et sår som nekter å leges.',
            environment:
                'Ember-lit mine galleries. Rockfall and superheated vents create hazards. The deepest tunnels ' +
                'narrow, and the rock itself radiates warmth.',
            notes: [
                'Sealed from the inside: scorch patterns and barricade marks show the mine was deliberately sealed long ago — something below was meant to stay below.',
                'Hazard — Rockfall: a DC 12 Dexterity save or 1d6 bludgeoning damage from falling stones in the narrow galleries.',
                'Hazard — Superheated Vents: cracks in the rock glow with ember light. A creature ending its turn next to a vent takes 1d4 fire damage; the vents are where ember elementals are born.',
                'The Dwarven Shades: dead miners who never left. They rise from collapsed rubble and drift through the galleries, still working the rock they died in.'
            ],
            enemies: [
                {id: 'dwarven-shade', count: 3}
            ],
            tactics: [
                'Shade Ambush: the shades rise silently from a collapsed gallery, surrounding the party. They ignore difficult terrain in the mine.',
                'Grave-chill: a hit from a shade\'s pick halves the target\'s speed until the end of its next turn — shades use this to separate the backline from the front.',
                'Optional — Mine Crawlers: if the party retreats or rests, 2 mine crawlers drop from the ceiling onto the slowest hero.'
            ],
            aftermath:
                'Beyond the ambush the air grows warmer and the rock glows faintly. The deepest gallery ' +
                'narrows into a low, scorched tunnel that ends at a vault door older than the keep above.'
        },
        {
            id: 'scene-3',
            title: 'The Master Smith\'s Vault',
            images: [
                'adventures/embers-of-heartforge/images/03_master_smiths_vault.jpg'
            ],
            readAloud:
                'At the mine\'s deepest level stands a vault door carved with gear-and-anvil motifs — ' +
                'older than anything in the keep above, and untouched. The seals that barred this place ' +
                'for a thousand years have weakened with the mountain\'s collapse; the mechanism is cracked, ' +
                'and something within begins to stir.',
            readAloudNo:
                'På gruvens dypeste nivå står en hvelvdør utsmykket med tannhjul- og amboltmotiver – ' +
                'eldre enn alt i borgen over, og urørt. Seglene som i tusen år stengte dette stedet, ' +
                'er svekket av fjellets kollaps; mekanismen er sprukket, og noe der inne begynner å røre på seg.',
            environment:
                'The sealed vault chamber: a dark smithy lit only by glowing ember cracks in the floor. ' +
                'The masterpiece rests on a pedestal of black iron. Two iron guardians flank it, dormant.',
            notes: [
                'Opening the vault: the gear-locks were weakened by the collapse. A DC 14 Strength (Athletics) check as an Action, or a DC 14 Dexterity (Thieves\' Tools) check to work the cracked mechanism.',
                'Awakening Guardians: the moment the door opens, the forge guardians activate. They defend the masterpiece, not out of malice but to keep it from thieves.',
                'The Testament: beside the masterpiece lies the smith\'s final testament — the Heartforge was built to finish the greatest work the mountain could hold, and the mine was sealed because that work was never completed. It was meant to be finished by a worthy hand, not hoarded.',
                'The Judgment Begins: as the guardians fall, embers flare from the floor cracks. The chamber is testing who comes to take, and who comes to finish.'
            ],
            enemies: [
                {id: 'forge-guardian', count: 2},
                {id: 'ember-elemental'}
            ],
            tactics: [
                'Guardian Positioning: the two forge guardians stand before the pedestal and pivot to keep the masterpiece behind them, refusing to be flanked.',
                'Ember Core: when a forge guardian is destroyed it explodes in a 10-ft burst of fire (DC 12 Dexterity save or 2d6 fire damage) — clear allies before the killing blow.',
                'The ember elemental drifts between the guardians; its Fiery Form punishes anyone who closes into melee.'
            ],
            aftermath:
                'As the last guardian falls, a voice echoes from the far side of the vault: ' +
                '"A fine performance. Now step aside — the masterpiece belongs to the highest bidder." ' +
                'Keldor Graymantle steps out of the shadows, his eyes fixed on the prize.'
        },
        {
            id: 'scene-4',
            title: 'The Greedy Burn',
            images: [
                'adventures/embers-of-heartforge/images/04_the_greedy_burn.jpg'
            ],
            readAloud:
                'Keldor Graymantle walks toward the pedestal as the embers flare. "You did the heavy lifting. ' +
                'I\'ll take it from here." The masterpiece waits on its pedestal of black iron — ' +
                'and the chamber begins to judge who is worthy, and who will burn.',
            readAloudNo:
                'Keldor Graymantle går mot sokkelen mens glødene blusser opp. «Dere gjorde grovarbeidet. ' +
                'Jeg tar over herfra.» Mesterverket venter på sin sokkel av svart jern – og kammeret ' +
                'begynner å dømme hvem som er verdig, og hvem som vil brenne.',
            environment:
                'The vault chamber, the masterpiece on its black-iron pedestal. Ember cracks flare and darken ' +
                'with the judgment. The mountain trembles as the work awakens.',
            notes: [
                'The Judgment: the smith\'s rune holds true — the work warms the just and burns the greedy. Heroes who reach for the masterpiece with greed in their hearts suffer the backlash; those who come to protect it, finish it, or leave it be find the chamber\'s fire on their side.',
                'Keldor\'s Gambit: he first offers to buy the masterpiece and split the profit. Refused, he attacks — but the chamber\'s embers flare against him, not the heroes.',
                'The Burn: if the party seizes the masterpiece by force without honoring the judgment, the vault erupts — DC 13 Dexterity save or 3d6 fire damage to all within 20 ft of the pedestal.',
                'Reward: the smith\'s masterpiece — a legendary +1 weapon or shield tailored to the party, or the smith\'s tools and unfinished work to complete it by a worthy hand. The forge spirits grant their final blessing.'
            ],
            enemies: [
                {id: 'keldor-graymantle'},
                {id: 'ember-elemental', count: 2, optional: true}
            ],
            tactics: [
                'Greed Unbound: whenever a hero touches or takes the treasure, Keldor makes an out-of-turn attack.',
                'Pickpocket: once during the fight, Keldor uses a bonus action to snatch a small object from a hero and dangles it over the glowing vents, demanding trade.',
                'Relic Merchant: below half HP, Keldor tries to cut a deal — half the treasure, then his life, then the truth of who sent him.',
                'Ember Backlash: if the heroes honored the judgment, the chamber\'s embers flare against Keldor (he takes 1d4 fire damage whenever he strikes a hero).'
            ],
            aftermath:
                'The ending is the heroes\' to write. The masterpiece may be claimed, kept, and used; ' +
                'returned to the mountain and sealed forever; or offered back to the forge spirits. ' +
                'Whatever they choose, the valley settles again — and the embers beneath the mountain finally cool.'
        },
        {
            id: 'monster-gallery',
            title: 'Monster Gallery',
            image: 'adventures/embers-of-heartforge/images/monster-gallery.jpg',
            gallery: true
        }
    ]
});
