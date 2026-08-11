window.RPG_HELPER = window.RPG_HELPER || {adventures: []};

window.RPG_HELPER.adventures = window.RPG_HELPER.adventures.filter(a => a.id !== 'the-joyous-blight-of-plaguestead');

window.RPG_HELPER.adventures.push({
    id: 'the-joyous-blight-of-plaguestead',
    title: 'The Joyous Blight of Plaguestead',
    meta: {players: 4, level: '3', duration: '3–4 hours'},
    intro:
        'The village of Plaguestead is infected with a rotting, putrid plague, but the villagers are ' +
        'not dying in agony — they are singing and celebrating with ecstatic joy. They worship a ' +
        '"Generous Grandfather" who has freed them from pain. You are hired to break through the quarantine, ' +
        'stop the source of this "joyous blight," and save who you can before the plague overflows the valley.',
    objectives: [
        'Investigate the outlying farms of Plaguestead and survive the "blessed" welcome.',
        'Infiltrate the high street of Plaguestead and bypass the rotting guards and daemonic imps.',
        'Confront Abbot Throt inside the desecrated village chapel and silence the defiled Rot-Bell.',
        'Neutralize the bubbling Cauldron of Poxes and decide the fate of Plaguestead.'
    ],
    documents: [
        {label: 'Adventure (md)', href: 'adventures/the-joyous-blight-of-plaguestead/docs/adventure.md'}
    ],
    monsters: [
        'marsh-hound',
        'blighted-peasant',
        'nurgling-swarm',
        'rot-knight',
        'abbot-throt'
    ],
    scenes: [
        {
            id: 'scene-1',
            title: 'The Singing Outpost',
            images: [
                'adventures/the-joyous-blight-of-plaguestead/images/01_singing_outpost.jpg'
            ],
            battlemap: 'ttb1-p3-l-rural-inn',
            readAloud:
                'The air grows heavy, carrying a sweet, sickly-sweet aroma like overripe fruit and ' +
                'stagnant pondwater. Ahead, the outline of Plaguestead\'s outlying farms rises from the fog. ' +
                'Strange, lively singing echoes through the mist. As you draw closer, you see a group of ' +
                'villagers dancing hand-in-hand around a cracked cauldron. But as the fog parts, your breath catches. ' +
                'Their skin is swollen and green, their clothes stained with dried pus, and bloated blisters cover ' +
                'their arms. Yet they are smiling, laughing, and beckoning you to join their joyous circle.',
            readAloudNo:
                'Luften blir tung og bærer med seg en søtlig, kvalmende duft som overmoden frukt og ' +
                'stillestående vann. Foran dere stiger konturene av Plaguesteads ytterste gårder frem fra tåken. ' +
                'Merkelig, livlig sang ekkoer gjennom disen. Etter hvert som dere kommer nærmere, ser dere en ' +
                'gruppe landsbyboere som danser hånd i hånd rundt en sprukken kjele. Men idet tåken letter, ' +
                'setter dere pusten i halsen. Huden deres er hoven og grønn, klærne er flekket med tørket verk, ' +
                'og oppblåste blemmer dekker armene deres. Likevel smiler de, ler, og vinker dere inn i sin ' +
                'gledesfylte sirkel.',
            environment:
                'The outlying farms and country lane leading into Plaguestead. Thick fog clings to the wet grass.',
            notes: [
                'The Welcoming Committee: 4 blighted peasants and 2 marsh hounds dance in a delirious circle around a cracked wooden cauldron bubbling with stagnant, rancid broth.',
                'The Infection: The peasants are horribly bloated, rotting, and covered in sores, but their minds are completely numb to the pain, locked in a joyous, maniacal trance.',
                'Sharing the Blessing: If the heroes refuse to drink the putrid broth, the peasants smile warmly and attack, declaring that they must "share the Grandfather\'s great gifts!"'
            ],
            enemies: [
                {id: 'blighted-peasant', count: 4},
                {id: 'marsh-hound', count: 2}
            ],
            tactics: [
                'Joyous Grab: The blighted peasants shamble forward blindly, ignoring attacks, trying to grapple heroes and pull them closer to spread the Rotting Touch.',
                'Flesh Exploders: When a peasant drops to 0 HP, they burst into a spray of toxic sludge. Emphasize the threat of Joyous Burst to melee combatants.',
                'Pack Hunt: The marsh hounds circle the flanks, using Muddy Grip to hold heroes down, then attacking grappled targets with advantage.'
            ],
            aftermath:
                'With the dance halted, one peasant lies gasping, the manic smile fading into tears. Before ' +
                'passing, they whisper: "The abbot... Throt... tolls the Rot-Bell in the chapel... we must keep ' +
                'dancing so the broth stays sweet..."'
        },
        {
            id: 'scene-2',
            title: 'The High Street of Plaguestead',
            images: [
                'adventures/the-joyous-blight-of-plaguestead/images/02_high_street.jpg'
            ],
            battlemap: 'ttb1-p17-l-high-street',
            readAloud:
                'As you step onto the High Street of Plaguestead, the joyous madness of the village becomes a ' +
                'choking nightmare. Weeping green moss clings to the cobblestones, and a thin, yellowish-green ' +
                'vapor clings to the ground. In the gutters, tiny, green-skinned creatures — no larger than ' +
                'housecats, with bloated bellies and wide, toothy grins — frolic in the filth, throwing handfuls ' +
                'of rotting muck at each other. Tearing through the fog come massive, hulking figures clad in ' +
                'rusted, pitted plate armor, their breath rattling through wet, congested iron helms. They raise ' +
                'rusted halberds, eager to introduce you to their Grandfather\'s grace.',
            readAloudNo:
                'Idet dere går inn på Plaguesteads hovedgate, blir landsbyens gledesfylte vanvidd til et ' +
                'kvelende mareritt. Dryppende, grønn mose klamrer seg til brosteinene, og en tynn, gulgrønn damp ' +
                'ligger lavt over bakken. I rennesteinen leker bittelåte, grønnhudede skapninger – ikke større ' +
                'enn huskatter, med oppblåste mager og brede, tannete glis – i sølen mens de kaster råtten ' +
                'gjørme på hverandre. Ut av tåken stormer digre, tunge skikkelser kledd i rusten, tæret ' +
                'platerustning. Pusten deres rasler gjennom våte, tette jernhjelmer. De hever rustne ' +
                'hellebarder, ivrige etter å introdusere dere for sin bestefars nåde.',
            environment:
                'The main cobblestone thoroughfare. Thick green moss covers the stones, making it difficult ' +
                'terrain off the direct paths. Toxic yellow-green vapor impairs visibility beyond 40 ft.',
            notes: [
                'Nurglings in the Gutters: 3 nurgling swarms are playing in the toxic sludge, cackling and capering. They are aggressive, unpredictable, and highly evasive.',
                'The Rot Guards: 2 hulking rot knights stand guard in front of the heavy wooden chapel gates, completely devoted to preventing anyone from interrupting the abbot\'s work.',
                'Aura of Decay: The thick rust-filled air makes metal weapons pitted and fragile. Remind players of the pitting effect when they strike the rot knights.'
            ],
            enemies: [
                {id: 'rot-knight', count: 2},
                {id: 'nurgling-swarm', count: 3}
            ],
            tactics: [
                'Iron Wall: The rot knights form a solid frontline, blocking the path with their rusted halberds and absorbing hits with their high AC.',
                'Nurgling Distraction: The nurglings crawl underfoot and leap from gutters, using Poison Filth to poison backliners and Mischievous Dodging to slip away from melee counters.',
                'Aura Abuse: The knights stay close to heroes using metal shields/armor, enjoying the passive rotting effects of the environment.'
            ],
            aftermath:
                'The rot knights fall, leaving behind heaps of rusted scrap and putrid black blood. On one of ' +
                'their belts, you find a heavy, rusted brass key engraved with a weeping three-lobed fly, ' +
                'which fits the chapel\'s iron lock.'
        },
        {
            id: 'scene-3',
            title: 'The Chapel of the Weeping Three',
            images: [
                'adventures/the-joyous-blight-of-plaguestead/images/03_chapel.jpg'
            ],
            battlemap: 'ttlb-p37-l-tomb',
            readAloud:
                'The heavy wooden doors of the village chapel creak open, releasing a wave of hot, humid air ' +
                'thick with the smell of boiling fat and wild copper. Inside, the pews have been pushed aside ' +
                'to make room for a massive, bubbling copper cauldron of green sludge. Standing over it, ' +
                'stirring with a giant wooden ladle, is Abbot Throt. Once a holy man, he is now a bloated, ' +
                'weeping mountain of flesh, his eyes twinkling with a manic, grandfatherly affection. In his ' +
                'other hand, he holds a rope tied to the great brass bell in the rafters. "Ah, new guests!" he ' +
                'wetly chuckles, pulling the rope. The bell tolls with a deep, vibrating resonance that makes ' +
                'your wounds itch and burn.',
            readAloudNo:
                'De tunge tredørene til landsbykapellet knirker opp og slipper ut en bølge av varm, fuktig ' +
                'luft som er tykk av lukten av kokende fett og villkobber. Innvendig er kirkebenkene skjøvet ' +
                'til side for å gi plass til en enorm, boblende kobberkjele med grønt slam. Over den står ' +
                'abbed Throt og rører med en gigantisk tresleiv. En gang var han en hellig mann, men nå er han ' +
                'et oppblåst, væskende fjell av kjøtt, med øyne som glitrer av en manisk, bestefaderlig ' +
                'kjærlighet. I den andre hånden holder han et tau knyttet til den store messingklokken i ' +
                'takbjelkene. "Å, nye gjester!" humrer han vått og drar i tauet. Klokken klinger med en dyp, ' +
                'vibrerende klang som får sårene deres til å klø og brenne.',
            environment:
                'The desecrated stone interior of the chapel. A massive copper cauldron dominates the sanctuary altar, bubbling with volatile, green plague-broth.',
            notes: [
                'Abbot Throt: Once the protector of Plaguestead, now completely corrupted into a fanatical Apostle of Decay. He believes the plague is a beautiful, loving gift.',
                'The Defiled Rot-Bell: Hanging from the central rafters. Its tolling pulses with necrotic energy, accelerating the plague\'s maturation and keeping his minions alive.',
                'Sacrilegious Workshop: The pews, icons, and holy books have been thrown into heaps, covered in green slime and crawling with nurglings.'
            ],
            enemies: [
                {id: 'abbot-throt', count: 1},
                {id: 'blighted-peasant', count: 4},
                {id: 'nurgling-swarm', count: 2}
            ],
            tactics: [
                'Pestilent Bell: Abbot Throt uses his Rot-Bell Toll at the start of his turn to either heal his blighted servants or poison the heroes.',
                'Noxious Guard: Throt releases a Plague Cloud as a bonus action, forcing melee heroes to take poison damage while his blighted peasants form a defensive meat shield.',
                'Final Stand: Once Throt drops below half HP, he uses Final Bloom to summon 2 more blighted peasants directly from the boiling cauldron.'
            ],
            aftermath:
                'Abbot Throt collapses against the cauldron, his heavy censer-flail clattering to the floor. ' +
                'As he gasps his last, the great brass bell cracks in two, its tolling silenced. But the ' +
                'bubbles in the giant copper vat grow frantic, and the cauldron begins to tilt...'
        },
        {
            id: 'scene-4',
            title: 'The Bitter Choice',
            images: [
                'adventures/the-joyous-blight-of-plaguestead/images/04_bitter_choice.jpg'
            ],
            readAloud:
                'The abbot is gone, but his putrid work remains. The massive copper cauldron is tipping over, ' +
                'its rim bubbling with virulent, boiling rot. If it overflows and spills into the chapel vaults, ' +
                'it will seep into the village water supply and flow down the fens, spreading Nurgle\'s ' +
                'joyous blight to the entire valley. The altars still hold the village\'s sacred, uncorrupted ' +
                'saintly relics, and the damp timbers of the wooden roof are ripe for flame. You must decide ' +
                'how to neutralize the Grandfather\'s gift, and each choice has a bitter price.',
            readAloudNo:
                'Abbeden er borte, men hans motbydelige arbeid gjenstår. Den massive kobberkjelen tipper over, ' +
                'og kanten bobler med virulent, kokende råte. Hvis den flommer over og lekker ned i kapellhvelvene, ' +
                'vil den sive inn i landsbyens vannforsyning og flyte nedover myrene, og spre Nurgles ' +
                'gledesfylte pest til hele dalen. Altrene rommer fremdeles landsbyens hellige, uberørte ' +
                'helgenrelikvier, og det fuktige tømmeret i tretaket er klart for flammer. Dere må velge ' +
                'hvordan dere skal nøytralisere bestefarens gave, og hvert valg har en bitter pris.',
            environment:
                'The high-altar sanctuary. The bubbling cauldron is tilting precariously as acidic green rot begins to crack the floor tiles.',
            notes: [
                'Option 1 — The Sacred Sacrifice: Pour the temple\'s ancient relics of Saint Elspeth directly into the cauldron. The holy magic completely purifies the rot, curing the surviving peasants, but the priceless relics are dissolved and lost forever.',
                'Option 2 — The Iron Quarantine: Set the wooden rafters of the chapel ablaze and bar the heavy iron gates. The holy fire incinerates the plague-broth, saving the valley, but the chapel, its relics, and any infected seeking sanctuary inside are burned to ash.',
                'Option 3 — The Flesh Siphon: Use ancient druidic runes to draw the rotting plague directly into the heroes\' own life force. This saves the chapel, the relics, and the villagers, but each hero carries a permanent scar of Nurgle (-2 Max HP or a minor rot-scars).'
            ],
            aftermath:
                'The choice is made, and the green fog begins to lift as the morning sun breaks through the fens.'
        },
        {
            id: 'monster-gallery',
            title: 'Monster Gallery',
            images: [
                'adventures/the-joyous-blight-of-plaguestead/images/monster-gallery.jpg'
            ],
            gallery: true
        }
    ]
});
