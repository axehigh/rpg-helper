window.RPG_HELPER = window.RPG_HELPER || {adventures: []};

window.RPG_HELPER.adventures = window.RPG_HELPER.adventures.filter(a => a.id !== 'redpost-road');

window.RPG_HELPER.adventures.push({
    id: 'redpost-road',
    title: 'Redpost Road',
    kind: 'single-scene',
    blurb: '4 players · Level 2 · 1–1.5 hours',
    synopsis: 'Survive the Redpost ambush and burn the goblin camp',
    meta: {players: 4, level: 2, duration: '1–1.5 hours'},
    intro:
        'A short combat-ready standalone scene: the party travels a lonely stretch of road ' +
        'between waystations, marked by red posts that the locals say are painted in blood. ' +
        'The goblins of the Redpost gang have been waylaying wagons for a fortnight, and tonight ' +
        'they have chosen their ambush ground.',
    objectives: [
        'Survive the Redpost ambush.',
        'Pursue the gang back to its camp.',
        'Put the bugbear leader down for good.'
    ],
    documents: [
        {label: 'Scene (md)', href: 'adventures/redpost-road/docs/adventure.md'}
    ],
    monsters: [
        'goblin-archer',
        'goblin-skirmisher',
        'goblin-hexer',
        'worg',
        'bugbear-brute'
    ],
    scenes: [
        {
            id: 'scene-1',
            title: 'The Ambush',
            images: [
                'adventures/redpost-road/images/01_redpost_road.jpg'
            ],
            battlemap: 'ttlb-p3-l-country-lane',
            readAloud:
                'The road runs straight between tall hedges and red-painted posts. At the last post, ' +
                'a wagon lies on its side, its wheel broken, its driver gone — the only sound a crow ' +
                'picking at spilled grain. As you step past the wreck, the hedges erupt: goblins rise ' +
                'from the ditches, arrows already nocked, and a worg pads out of the treeline, ' +
                'snout low and hungry.',
            readAloudNo:
                'Veien går rett mellom høye hekker og rødmalt stolper. Ved den siste stolpen ligger en vogn ' +
                'veltet, med et brukket hjul og en forsvunnet kusk – den eneste lyden en kråke som hakker i ' +
                'spilt korn. Idet dere stiger forbi vraket, eksploderer hekkene: gobliner reiser seg fra ' +
                'grøftene med spente piler, og en varg kommer ut av skogkanten, med snuten lav og sulten.',
            environment:
                'A straight country lane between dense hedgerows. The overturned wagon blocks the road, and ' +
                'ditches on either side offer cover to the ambushers.',
            notes: [
                'The Bait: the wrecked wagon is the lure. The driver was dragged off an hour ago; a DC 12 Perception check spots a fresh boot trail heading into the hedges.',
                'The Ambush: two goblin skirmishers burst from the near ditch while the archer holds the far hedge and the worg circles behind. The goblins use Nimble Escape to dart in and out of cover.',
                'Escalation: if the fight drags past three rounds, the goblin hexer peeks from the treeline and adds Curse to the archer\'s fire before retreating.'
            ],
            enemies: [
                {id: 'goblin-skirmisher', count: 2},
                {id: 'goblin-archer'},
                {id: 'worg'}
            ],
            tactics: [
                'Hit and Run: the skirmishers dart out, strike, and Nimble Escape back into the ditch — force them out of cover or they bleed you slowly.',
                'The Worg Circles: the worg moves around the far side to Knock Down a target and drag them toward the hedge while the goblins pepper the party.',
                'Break Contact: once two goblins fall, the rest retreat down the road toward the camp, leaving a trail a DC 10 Survival check can follow.'
            ],
            aftermath:
                'The surviving goblins scatter into the treeline. Fresh tracks and snapped twigs lead ' +
                'south down a game trail — straight toward the smoke of a campfire and a red banner ' +
                'hung from a broken cart.'
        },
        {
            id: 'scene-2',
            title: 'The Redpost Camp',
            images: [
                'adventures/redpost-road/images/02_redpost_camp.jpg'
            ],
            battlemap: 'ttb2-p4-r-field',
            readAloud:
                'The game trail opens onto a clearing of packed earth and cold fire pits. A red banner hangs ' +
                'from a broken cart, and what the goblins plundered is heaped in a corner: tools, sacks, a ' +
                'child\'s doll, a merchant\'s strongbox. In the center stands the bugbear they answer to, ' +
                'whittling a spear point with a knife the size of a shortsword. It looks up. "More wagons?" ' +
                'it asks, and grins.',
            readAloudNo:
                'Dyreleia åpner seg i en lysning med pakket jord og kalde bålplasser. Et rødt banner henger fra ' +
                'en brukket vogn, og det goblinene har plyndret ligger i en haug i hjørnet: verktøy, sekker, en ' +
                'barnelektedukke, en kjøpmanns pengeskrin. I midten står bugbaren de svarer til, og spikker en ' +
                'spydspiss med en kniv så stor som et kort sverd. Den ser opp. «Flere vogner?» spør den, og ' +
                'gliser.',
            environment:
                'A cleared campsite at the end of a game trail: packed earth, fire pits, plunder heaped in one ' +
                'corner, and a rickety lean-to of stolen timber. The tree line offers cover.',
            notes: [
                'The Leader: the bugbear brute commands what remains of the gang. Its Ambusher opening strike lands hard if the party is careless crossing into the clearing.',
                'The Hexer: the goblin hexer hangs back by the lean-to, laying Curse and Smoke Cloud to cover the bugbear\'s advance.',
                'The Loot: the strongbox holds 25 gp and a locked case with 2 healing potions. A DC 12 Investigation check of the plunder turns up a merchant\'s ledger that identifies the gang\'s fence in the next town.'
            ],
            enemies: [
                {id: 'bugbear-brute'},
                {id: 'goblin-hexer'},
                {id: 'goblin-skirmisher', optional: true}
            ],
            tactics: [
                'First Blood: the bugbear holds the center and lets the hexer soften the party; when a hero closes, it lands its full Ambusher hit.',
                'Smoke and Shadow: the hexer\'s Smoke Cloud cuts the party\'s line of sight while the bugbear circles to the far side of the smoke.',
                'Mop Up: the last skirmisher flees when the bugbear falls — chasing it down is the party\'s call; the fence\'s name is in the ledger either way.'
            ],
            aftermath:
                'The Redpost gang is finished. The road is safe again, the loot is the party\'s to return or ' +
                'keep, and the merchant\'s ledger points the way to a deeper story if anyone wants to follow it.'
        },
        {
            id: 'monster-gallery',
            title: 'Monster Gallery',
            images: ['adventures/redpost-road/images/monster-gallery.jpg'],
            gallery: true
        }
    ]
});
