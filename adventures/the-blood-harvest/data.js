window.RPG_HELPER = window.RPG_HELPER || {adventures: []};

window.RPG_HELPER.adventures = window.RPG_HELPER.adventures.filter(a => a.id !== 'the-blood-harvest');

window.RPG_HELPER.adventures.push({
    id: 'the-blood-harvest',
    title: 'The Blood Harvest',
    meta: {players: 4, level: '3–4', duration: '3–4 hours'},
    intro:
        'Reedfall has a saint and a secret. Every Harvest Eve the church takes the "fever-marked" — the sick, ' +
        'the old, the unlucky — promising the saint takes one so that all may live. Tonight the tithe is Nessa, ' +
        'a fifteen-year-old with a bad cough, and her brother Pip has run to the first strangers he can find. ' +
        'The churchyard is chained, the dead are walking, and at moonrise the Tithe Bell rings.',
    objectives: [
        'Reach Reedfall on festival eve and answer a child\'s plea.',
        'Break into the church and learn the truth of the Harvest Tithe.',
        'Reach the reliquary before the Tithe Bell sounds again.',
        'Face the Red Skull and decide what the cult deserves.'
    ],
    documents: [
        {label: 'Adventure (md)', href: 'adventures/the-blood-harvest/docs/adventure.md'}
    ],
    monsters: [
        'goblin-skirmisher',
        'goblin-archer',
        'goblin-hexer',
        'zombie',
        'skeleton',
        'ghoul',
        'spirit-guardian',
        'cultist',
        'red-skull-abbot'
    ],
    scenes: [
        {
            id: 'scene-1',
            title: 'The Festival Eve',
            images: [
                'adventures/the-blood-harvest/images/01_festival_eve.jpg'
            ],
            battlemap: 'ttb1-p23-l-market-square',
            readAloud:
                'The festival square is bright and wrong. Garlands sag between the stalls, the air smells of ' +
                'apples and cinders, and on every lintel a handprint gleams in dull red. The crowd cheers a ' +
                'gilded shrine a half-second too late, and goblin "watchmen" in red sashes stand where no one ' +
                'paid them to stand. A boy bursts through the crowd and seizes a sleeve — ragged, shaking, ' +
                'clutching a scrap of red linen and a brass charm. "Please," he says. "They took my sister to ' +
                'the church. The bell rings at moonrise."',
            readAloudNo:
                'Festplassen er lys og feil. Girlander henger slapt mellom bodene, luften lukter epler og aske, ' +
                'og på hver dørstokk glinser et håndavtrykk i matt rødt. Folkemengden jubler for et forgylt ' +
                'helgenskrin et halvt sekund for sent, og golbinvakter i røde skjerf står der ingen betalte dem ' +
                'for å stå. En gutt bryter gjennom folkemengden og griper et erme – fillete, skjelvende, med ' +
                'en rød linlapp og et messingamulett i neven. «Vær så snill,» sier han. «De tok søsteren min ' +
                'til kirken. Klokka ringer ved måneoppgang.»',
            environment:
                'Reedfall\'s market square at dusk on the eve of the Harvest Festival: garlands, a gilded shrine ' +
                'to Saint Erilda, red handprints on every lintel, and goblin watchmen in red sashes at the ' +
                'square\'s edges.',
            notes: [
                'Pip: the tavern-keeper\'s son, twelve, shaking. His sister Nessa — fifteen, a bad cough — was taken to the church "for healing" at midnight. He knows the churchyard gate is chained and the Tithe Bell rings at moonrise. He carries a brass saint\'s-charm and a scrap of red linen torn from a robe.',
                'The Town\'s Fear: the festival cheer is practiced. Locals change the subject, will not meet the party\'s eyes, and warn them to be gone by moonrise "for their own good." The red handprints are the church\'s blessing — no one will explain them.',
                'The Watchmen: goblins in red sashes no one paid to stand anywhere. They are the abbot\'s enforcers, hired to keep strangers out before the bell. They do not want a fight — they want the party gone.',
                'Hazard — Festival Crowd: civilians everywhere; careless attacks endanger the crowd. Knockbacks and area effects risk turning the town hostile.'
            ],
            enemies: [
                {id: 'goblin-skirmisher', count: 2, optional: true},
                {id: 'goblin-archer', optional: true}
            ],
            tactics: [
                'Drive Them Out, Not Kill: the watchmen fight to push the party out of town — skirmishers harry the flanks with Nimble Escape while the archer covers from the stall roofs. If pressed, they scatter into the alleys.',
                'Signal the Church: if any watchman escapes, a whistle answers from the churchyard and the gate is barred ahead — the party hears the bell wind up for the first time.'
            ],
            aftermath:
                'The square clears and the party stands alone under the garlands. The church looms across the ' +
                'rooftops, its bell dark against the last light. Moonrise is an hour off, and the gate will be ' +
                'chained.'
        },
        {
            id: 'scene-2',
            title: 'The Churchyard',
            images: [
                'adventures/the-blood-harvest/images/02_churchyard.jpg'
            ],
            battlemap: 'ttb1-p8-r-village-walls',
            readAloud:
                'The churchyard gate hangs chained and the fog lies thick as wool between the graves. A bell ' +
                'waits somewhere above, patient, and the dead are not resting — a gravedigger who should have ' +
                'been a year in the ground stands at the foot of his own grave, and behind him the mound splits, ' +
                'and another rises. "Someone has to get to the church first," Pip said. The bell is counting ' +
                'the minutes to moonrise.',
            readAloudNo:
                'Kirkegårdsporten henger i kjede og tåken ligger tett som ull mellom gravene. En klokke venter et ' +
                'sted ovenfor, tålmodig, og de døde hviler ikke – en graver som burde ha ligget et år i jorden ' +
                'står ved foten av sin egen grav, og bak ham sprekker haugen, og enda en reiser seg. «Noen må ' +
                'komme til kirken først,» sa Pip. Klokka teller minuttene til måneoppgang.',
            environment:
                'The chained churchyard of Saint Erilda: fog thick as wool, old graves, a brick church with ' +
                'shuttered windows and a single locked door. The dead are walking.',
            notes: [
                'The Gravedigger: a year in the ground, now standing at the foot of his own grave. The sacristy key hangs from his belt — the only way in the front door.',
                'The Gate: chained and padlocked. A DC 14 Strength check snaps the chain; a DC 12 Dexterity (Thieves\' Tools) pick opens it silently; climbing the wall draws the dead\'s attention.',
                'The Rising Dead: zombies shamble from the graves in pairs; skeletons crouch on the wall with shortbows and fire over the shamblers\' heads.',
                'The Tithe Bell: high in the tower, waiting. It rings once at moonrise; after that, the abbot knows the party has come.'
            ],
            enemies: [
                {id: 'zombie', count: 2},
                {id: 'skeleton', count: 2}
            ],
            tactics: [
                'The Wall of Dead: zombies take the lead and soak hits (Undead Fortitude) while skeletons stay on the wall at range, shattering if caught in melee by a bludgeon.',
                'Surge in Pairs: the dead rise in waves from the graves — a second pair shambles up as the first falls, unless a hero seizes the gravedigger\'s key and bolts for the door.'
            ],
            aftermath:
                'Inside the porch the fog cannot follow. The church is dark and silent, and on a lectern in the ' +
                'sacristy an open book glows faintly in a shaft of moonlight: the Tithe Ledger.'
        },
        {
            id: 'scene-3',
            title: 'The Tithe Ledger',
            images: [
                'adventures/the-blood-harvest/images/03_tithe_ledger.jpg'
            ],
            battlemap: 'ttlb-p23-l-room',
            readAloud:
                'The sacristy is candlelit and close, ledgers shelved to the ceiling. The book on the lectern is ' +
                'open: the Tithe Ledger, years of festival nights, every entry a name and every name marked ' +
                '"taken by the fever" — a farmhand, a cobbler, a mother, and tonight, a fifteen-year-old girl ' +
                'with a bad cough. "Pip\'s mother," you realize. "Five years ago." A goblin in a red cowl steps ' +
                'from behind the curtain. He has been waiting for this.',
            readAloudNo:
                'Sakristiet er levende opplyst og trangt, med journaler hyller opp til taket. Boka på lesepulten ' +
                'er åpen: Tideledgeren, år med festivalnetter, hver oppføring et navn og hvert navn merket «tatt ' +
                'av feberen» – en gårdsarbeider, en skomaker, en mor, og i natt, en femten år gammel jente med en ' +
                'vond hoste. «Pips mor,» innser dere. «For fem år siden.» En golbin i rød hette kommer ut bak ' +
                'forhenget. Han har ventet på dette.',
            environment:
                'The sacristy: candlelit, ledgers shelved to the ceiling, an open book on the lectern. A red ' +
                'curtain hides the stair to the catacombs.',
            notes: [
                'The Tithe Ledger: years of festival nights. Every entry a name — a farmhand, a cobbler, a mother — every name marked "taken by the fever." The last entry is tonight: Nessa, age fifteen, "fever-marked."',
                'The Truth: the fever is a story the church keeps for itself. There was a fever once, a century ago; the abbot has made the tithe from its memory.',
                'The Castellan: a goblin hexer in a red cowl, the abbot\'s castellan. He waited here, knowing the ledger would be found. He holds a lantern of red glass that casts a skull-shaped shadow on the wall.',
                'Hazard — Candlelight: the sacristy is lined with wax and paper. Fire spells turn the room into a furnace (and destroy the ledger).'
            ],
            enemies: [
                {id: 'goblin-hexer'},
                {id: 'goblin-skirmisher', count: 2}
            ],
            tactics: [
                'Curse and Smoke: the hexer works from the gallery above the sacristy door, laying down Curse and Smoke Cloud while the skirmishers rush through the pews.',
                'Burn the Book: if the party takes the ledger, the hexer tries to torch it — protecting the evidence can be the real objective.',
                'The Stair: behind the red curtain, a spiral stair leads down into the catacombs. The hexer will not follow below.'
            ],
            aftermath:
                'The castellan falls, and the sacristy settles. Behind the red curtain the stair gapes into the ' +
                'dark, and from far below comes a sound like weeping — or like a bell being struck with cloth ' +
                'to muffle it.'
        },
        {
            id: 'scene-4',
            title: 'The Catacombs',
            images: [
                'adventures/the-blood-harvest/images/04_catacombs.jpg'
            ],
            battlemap: 'ttlb-p31-l-underground',
            readAloud:
                'Below the church the reliquary chamber waits, warm with beeswax and silence. On the altar rests ' +
                'the skull — Erilda\'s skull, lacquered a wet, glistening red — and above it the saint\'s spirit ' +
                'hovers, bound, weeping without sound. She does not threaten. She pleads. "The fever was real ' +
                'once," she whispers. "I held it with clean linen and closed doors and kindness. He built a ' +
                'monster he could pay. Please — break the skull. Let me go."',
            readAloudNo:
                'Nede under kirken venter relikvierommet, varmt av bivoks og stillhet. På alteret hviler skallen – ' +
                'Erildas skalle, lakkert i vått, glinsende rødt – og over den svever helgenens ånd, bundet, ' +
                'gråtende uten lyd. Hun truer ikke. Hun ber. «Feberen var virkelig en gang,» hvisker hun. «Jeg ' +
                'holdt den tilbake med rent lin og lukkede dører og vennlighet. Han bygde seg et monster han ' +
                'kunne betale. Vær så snill – knus skallen. La meg gå.»',
            environment:
                'The reliquary chamber under the church: warm with beeswax, silent, a skull lacquered wet red on ' +
                'an altar. Above it, the bound spirit of Saint Erilda.',
            notes: [
                'The Skull: Erilda\'s skull, dipped in red lacquer, on the altar. It is the reliquary the town venerates. Breaking it releases the saint — and, the abbot believes, lets the fever in.',
                'The Saint\'s Spirit: bound to the skull, weeping. She is real, and she is ashamed. She does not fight unless the party attacks the altar — and she begs to be released, not destroyed.',
                'The Truth: the fever was real once, a century ago. Erilda held it back with quarantine and clean linen and kindness, not souls. The abbot built the tithe from a girl\'s death and his own grief.',
                'The Ward: the spirit guards the reliquary; the ghouls flank anyone who touches the altar. If the skull is broken (DC 12 to shatter, one action), the spirit is freed and the ghouls collapse.'
            ],
            enemies: [
                {id: 'spirit-guardian'},
                {id: 'ghoul', count: 2}
            ],
            tactics: [
                'Hold the Altar: the spirit stays between the party and the skull while the ghouls flank. A Paralyzing Bite can pin a hero for a turn — breaking the skull instead of the spirit ends the fight.',
                'Spare the Saint: the spirit can be freed, not killed. Destroying the skull frees her and drops the undead. Fighting the spirit to 0 HP scatters it in anguish — the party will face the abbot with a wound in the world.'
            ],
            aftermath:
                'The chamber stills. Whether the skull lies whole or broken, from the vault beyond comes the ' +
                'slow, certain sound of boots on stone — and the abbot, dragging Nessa by the wrist toward the ' +
                'altar below, looks up and sees the party standing where his saint should be.'
        },
        {
            id: 'scene-5',
            title: 'The Red Skull',
            images: [
                'adventures/the-blood-harvest/images/05_the_red_skull.jpg'
            ],
            battlemap: 'ttlb-p38-r-tomb',
            readAloud:
                'The vault is the abbot\'s last argument. Nessa lies on the altar, still as the dead; around her ' +
                'the cult kneels in red; and above them all, in his red-skull miter, Abbot Cael waits — certain, ' +
                'not cruel. "You have seen the truth," he says, "and you have come to rob me of it. Give me the ' +
                'girl, and the town stays safe forever. Take her, and you doom every one of them to the fever I ' +
                'have held back for a century." The bell is not ringing. That is the worst part. He is waiting ' +
                'for you to choose.',
            readAloudNo:
                'Hvelvet er abbotens siste argument. Nessa ligger på alteret, stille som de døde; rundt henne ' +
                'kneler kulterne i rødt; og over dem alle, i sin rødskallemiter, venter abbot Cael – viss, ikke ' +
                'ond. «Dere har sett sannheten,» sier han, «og dere er kommet for å frarøve meg den. Gi meg ' +
                'jenta, så er landsbyen trygg for alltid. Tar dere henne, dømmer dere dem alle til feberen jeg ' +
                'har holdt tilbake i et århundre.» Klokka ringer ikke. Det er det verste. Han venter på at dere ' +
                'skal velge.',
            environment:
                'The reliquary vault: Nessa on the altar, the cult kneeling in red, Abbot Cael in his red-skull ' +
                'miter before them. The Tithe Bell hangs high above, silent.',
            notes: [
                'The Last Argument: the abbot does not want to fight. He wants the party to leave the girl and let the tithe be paid — the town\'s safety for one soul, as it has always been.',
                'The Mercy Choice: when the abbot reaches 0 HP he does not fall. He kneels, and the vault goes still. The players hold the pen: mercy (speak Erilda\'s name over him, break the skull, let the town learn the truth) or vengeance (strike him down, and give the cult its martyr).',
                'Mercy: the saint\'s spirit, if freed, is released; the dead sink back; the abbot faces the town. Pip keeps the charm. The ledger is read aloud and burned.',
                'Vengeance: the cult\'s dread lingers; the town gets a tyrant\'s corpse and a story of heroes who chose the knife.',
                'Reward: the reliquary\'s silver (60 gp), the abbot\'s stores of healing potions (2 potions of healing), and Reedfall\'s gratitude and shame.'
            ],
            enemies: [
                {id: 'red-skull-abbot'},
                {id: 'cultist', count: 2, optional: true}
            ],
            tactics: [
                'The Vault as Bell: the abbot channels the saint\'s power through the skull — the vault rings like a struck bell when he takes damage, and Tithe Bell calls every risen dead in the vault to act at once.',
                'Saint\'s Vigor: once below half HP he is fortified by the saint\'s light, regaining 15 HP. He is not cruel — he is certain; the fight is his proof.',
                'The Kneeling: at 0 HP he kneels instead of dying. Do not attack him further — the choice is the scene.'
            ],
            aftermath:
                'However the choice goes, the vault empties of its power. The bell hangs silent, the skull lies ' +
                'broken or whole, and somewhere above the town is holding its breath at moonrise.'
        },
        {
            id: 'monster-gallery',
            title: 'Monster Gallery',
            images: ['adventures/the-blood-harvest/images/monster-gallery.jpg'],
            gallery: true
        }
    ]
});
