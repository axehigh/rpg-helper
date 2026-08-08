window.RPG_HELPER = window.RPG_HELPER || {adventures: []};

window.RPG_HELPER.adventures = window.RPG_HELPER.adventures.filter(a => a.id !== 'the-tolling-bell');

window.RPG_HELPER.adventures.push({
    id: 'the-tolling-bell',
    title: 'The Tolling Bell',
    kind: 'single-scene',
    blurb: '4 players · Level 3 · 1.5–2 hours',
    synopsis: 'Shelter in a flooded chapel and still its drowning bell',
    meta: {players: 4, level: 3, duration: '1.5–2 hours'},
    intro:
        'A standalone scene of combat and one small puzzle: a half-flooded chapel on the marsh road. ' +
        'At dusk its sunken bell tolls of its own accord, and the mire answers. Those who shelter ' +
        'beneath its roof soon learn why the locals ring twice and ride on.',
    objectives: [
        'Take shelter in the flooded chapel before dark.',
        'Still the tolling bell.',
        'Leave the mire before the water rises.'
    ],
    documents: [
        {label: 'Scene (md)', href: 'adventures/the-tolling-bell/docs/adventure.md'}
    ],
    monsters: [
        'marsh-hound',
        'will-o-wisp',
        'bark-touched'
    ],
    scenes: [
        {
            id: 'scene-1',
            title: 'The Flooded Nave',
            images: [
                'adventures/the-tolling-bell/images/01_flooded_nave.jpg'
            ],
            battlemap: 'ttlb-p32-v-underground-flooded',
            readAloud:
                'The chapel door stands open onto a nave awash with black water. Pews lean like drowned ' +
                'trees; the altar lies broken at the far end, and in the bell tower above, a bell hangs ' +
                'just over the waterline — green with age, its rope trailing into the flood. As dusk ' +
                'falls, the bell moves. No wind, no hand: it moves, and it rings once, low, and the ' +
                'water in the nave ripples toward the door.',
            readAloudNo:
                'Kapelldøren står åpen mot et kirkeskip fylt av svart vann. Kirkebenkene lener seg som ' +
                'drukne trær; alteret ligger brukket i den andre enden, og i klokketårnet over henger en ' +
                'klokke like over vannlinjen – grønn av alder, med taue som henger ned i flommen. Når ' +
                'skumringen faller, beveger klokken seg. Ingen vind, ingen hånd: den beveger seg, og den ' +
                'runger én gang, dypt, og vannet i kirkeskipet krusler mot døren.',
            environment:
                'A half-flooded chapel nave. Black water covers the floor (knee-deep, difficult terrain), ' +
                'pews provide partial cover, and the bell tower rises over the far end. The water rises ' +
                'with every toll.',
            notes: [
                'The Toll: the bell rings once at dusk, and again every few minutes. Each toll wakes something in the mire — and the water rises a finger\'s width.',
                'The Lights: will-o\'-wisps drift in through the broken windows as the light fades, luring anyone who wades toward the deep water by the altar.',
                'The Hunt: marsh hounds slip in through the flooded gaps at the nave\'s base, using the knee-deep water to hide their approach.',
                'Shelter Above: the choir loft is dry and defensible; holding it means fighting the hounds as they funnel up the stair.'
            ],
            enemies: [
                {id: 'will-o-wisp', count: 2},
                {id: 'marsh-hound', count: 2}
            ],
            tactics: [
                'Lure and Pack: the wisps drift ahead of the hounds, drawing heroes into deep water where Muddy Grip hits hardest.',
                'Toll of Reinforcements: every two rounds, the bell tolls and one marsh hound slithers in from the flooded north wall (optional) — the fight ends only when the bell is stilled.',
                'Hold the Loft: the wisps cannot reach the loft\'s dry floor easily; the hounds can. Guard the stair.'
            ],
            aftermath:
                'The hounds sink back as the water stills. The nave grows quiet, save for the bell — ' +
                'which hangs still now, waiting. The way to the crypt door stands ajar beneath the altar.'
        },
        {
            id: 'scene-2',
            title: 'The Crypt',
            images: [
                'adventures/the-tolling-bell/images/02_the_crypt.jpg'
            ],
            battlemap: 'ttlb-p37-l-tomb',
            readAloud:
                'Beneath the altar, a flooded stair drops into the crypt — and here, at last, is the ' +
                'source of the tolling. A great drowned bell lies on its side in a shallow basin, ' +
                'its mouth under the water, its clapper chained to a mechanism of rusted gears. Around ' +
                'the basin, bark-touched figures stand silent, heads bowed, as if listening to a ' +
                'knell only they can hear. The bell is not tolling for the living.',
            readAloudNo:
                'Under alteret faller en oversvømt trapp ned i krypten – og her, endelig, er kilden til ' +
                'klangene. En stor druknet klokke ligger på siden i et grunt basseng, med munningen under ' +
                'vannet og klangen lenket til en mekanisme av rustne tannhjul. Rundt bassenget står ' +
                'barkrammede skikkelser tause, med bøyde hoder, som om de lytter til en gravklokke bare de ' +
                'kan høre. Klokken ringer ikke for de levende.',
            environment:
                'The crypt: a flooded vault with a drowned bell in a stone basin, a rusted gear mechanism, ' +
                'and bark-touched figures standing in the water like mourners.',
            notes: [
                'Puzzle — The Stilled Knell: the bell tolls whenever the rusted mechanism winds taut. The bark-touched do not attack while the bell rings — they guard the rite. To quiet them, the bell must be stilled, and only a living hand turning the gear against its winding, or the clapper chained fast, will do it.',
                'Silencing the Bell: three ways work — chain the clapper (DC 12 Strength or Thieves\' Tools check as an Action), jam the gears with a blade or stake (DC 12 Strength or Dexterity check), or cut the bell\'s rope in the tower above. Each takes an Action and, done wrong, tolls the bell once and rouses the mourners.',
                'The Mourners: while the bell hangs still, the bark-touched sink back into the water, motionless. The moment it tolls, they rise and press the party toward the stairs.',
                'The Restless: each failed attempt calls one bark-touched to act; they do not pursue beyond the stair.'
            ],
            enemies: [
                {id: 'bark-touched', count: 3}
            ],
            tactics: [
                'Rite, Not Rage: the bark-touched fight defensively while the bell rings, herding the party rather than killing — they want the knell to continue.',
                'The Threshold: once the bell is stilled, the mourners stop mid-step and sink into the water. The party can loot the crypt in peace.',
                'The Tread on the Stair: if the party retreats rather than silencing the bell, the tolling follows them — two marsh hounds meet them at the top of the stairs (optional).'
            ],
            aftermath:
                'The bell hangs still, and the water settles. The crypt\'s reliquary holds a church bell-ringer\'s ' +
                'hammer (counts as a +1 mace), a waterproof coffer with 40 gp, and a brass reliquary ' +
                'the village will be glad to see returned. As the party climbs back into the nave, ' +
                'dawn shows grey through the broken windows — and for the first time in years, ' +
                'the chapel is silent.'
        },
        {
            id: 'monster-gallery',
            title: 'Monster Gallery',
            images: ['adventures/the-tolling-bell/images/monster-gallery.jpg'],
            gallery: true
        }
    ]
});
