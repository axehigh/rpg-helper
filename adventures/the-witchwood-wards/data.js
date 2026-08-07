window.RPG_HELPER = window.RPG_HELPER || {adventures: []};

window.RPG_HELPER.adventures = window.RPG_HELPER.adventures.filter(a => a.id !== 'the-witchwood-wards');

window.RPG_HELPER.adventures.push({
    id: 'the-witchwood-wards',
    title: 'The Witchwood Wards',
    meta: {players: 4, level: '3–4', duration: '3–4 hours'},
    intro:
        'The village of Coldwell is sealed inside a ring of five standing stones, and the witch who put them ' +
        'there has fed on the village\'s fear for generations. Anyone who tries to leave turns slowly to bark ' +
        'at the road\'s edge. The last messenger made it to the bridge before the bark took his knees, one hand ' +
        'already wood, clutching a letter that begs for help.',
    objectives: [
        'Reach Coldwell and answer the plea sealed in the bark.',
        'Break the ward circle and open the road through the Witchwood.',
        'Cross the blackwater marsh to the witch\'s den.',
        'Face the Bog Witch and decide what the curse deserves.'
    ],
    documents: [
        {label: 'Adventure (md)', href: 'adventures/the-witchwood-wards/docs/adventure.md'}
    ],
    monsters: [
        'marsh-hound',
        'will-o-wisp',
        'spirit-guardian',
        'bark-touched',
        'bog-witch'
    ],
    scenes: [
        {
            id: 'scene-1',
            title: 'The Rooted Road',
            images: [
                'adventures/the-witchwood-wards/images/01_rooted_road.jpg'
            ],
            readAloud:
                'The marsh begins at the edge of the world. On a causeway of old stone, half-sunk, a boy ' +
                'stands where the mud and the road meet — one knee already grey with bark, one hand clutching ' +
                'a letter. He moves slowly, like a tree bending in wind, and his voice is hoarse with hope: ' +
                '"You came. Please — Coldwell is just across the bridge. Tell Elder Sable I got the letter out."',
            readAloudNo:
                'Myren begynner ved verdens kant. På en gammel steinvei, halvt sunket, står en gutt der ' +
                'gjørma og veien møtes – det ene kneet allerede grått av bark, den ene hånden klamret rundt ' +
                'et brev. Han beveger seg langsomt, som et tre som bøyer seg i vinden, og stemmen hans er ' +
                'hes av håp: «Dere kom. Vær så snill – Coldwell er like over brua. Si til eldste Sable at ' +
                'jeg fikk ut brevet.»',
            environment:
                'The causeway at the marsh\'s edge. Coldwell\'s bridge and the ring of standing stones are ' +
                'visible across the blackwater. Tam the messenger is rooted to the spot, half-barked and alive.',
            notes: [
                'Tam: the boy will not move again. The bark has his knees and creeps upward with every passing hour. He hands over Elder Sable\'s letter and knows the way back is gone.',
                'The Letter: Elder Sable begs for help and warns that the stones "cannot be struck, only read." The village has tried breaking, digging, and burning the wards for generations.',
                'Coldwell: a small village crowded inside the stone ring, kind and frightened. The villagers have never walked past the garden fence since the curse began. They will shelter, feed, and guide the party, but cannot follow into the swamp.',
                'Elder Sable\'s Legend: a witch, a broken promise, and a village sealed for her hunger. She believes the witch wants only fear, and that hope is what makes the bark spread.'
            ],
            aftermath:
                'The bridge crossing is quiet. Beyond it the ring of standing stones rises out of the fog, ' +
                'carved with symbols that catch the last light — and the blackwater road to the swamp lies open.'
        },
        {
            id: 'scene-2',
            title: 'The Blackwater Crossing',
            images: [
                'adventures/the-witchwood-wards/images/02_blackwater.jpg',
                'adventures/the-witchwood-wards/images/02_wisp_lights.jpg'
            ],
            battlemap: 'ttlb-p32-v-underground-flooded',
            readAloud:
                'Past the fifth stone the road sinks into blackwater. The water is still and dark as pitch; ' +
                'hummocks of moss shift underfoot, and pale lights dance between the alders — will-o\'-wisps, ' +
                'drifting slow, luring the unwary off the path. Something large and low glides through the reeds, ' +
                'and the mud is full of the quiet waiting of things that hunt.',
            readAloudNo:
                'Forbi den femte steinen synker veien ned i svartvann. Vannet er stille og mørkt som bek; ' +
                'mosehauger flytter seg under føttene, og bleke lys danser mellom orene – viljetjern, som ' +
                'driver langsomt og lokker de uforsiktige ut av stien. Noe stort og lavt glir gjennom sivet, ' +
                'og gjørma er full av den stille ventingen til ting som jakter.',
            environment:
                'The blackwater marsh: dark pools, sucking mud, treacherous hummocks, and alder groves. ' +
                'Difficult terrain everywhere off the sinking causeway.',
            notes: [
                'Hazard — Sucking Mud: off the causeway, a DC 12 Strength (Athletics) check or a hero is pulled knee-deep and slowed (half speed). A marsh hound grappled in the same mud is at disadvantage to escape.',
                'Will-o\'-Wisp Lights: the drifting lights lead toward a false crossing that ends in a deep pool. Following them off the path invites the ambush.',
                'The Court Hunts: marsh hounds attack from the reeds in two waves — the first pair drags a target into the mud, the second pair closes when the party is split.',
                'Short Rest Point: a mossy hummock at the marsh\'s heart is dry enough to rest on, if the party can hold it for an hour.'
            ],
            enemies: [
                {id: 'marsh-hound', count: 2},
                {id: 'will-o-wisp'},
                {id: 'marsh-hound', count: 2, optional: true}
            ],
            tactics: [
                'Drag and Hold: the first marsh hounds use Muddy Grip to grapple a backliner and drag them off the causeway; the will-o\'-wisp drifts in behind to keep the rest off balance.',
                'Pack Hunt: once two hounds flank a grappled hero, they gain advantage on their bites — kill the grappler or pull the hero free fast.',
                'Luring Light: the will-o\'-wisp dims and retreats toward the false crossing, tempting the party away from the causeway and into the second wave\'s ambush.'
            ],
            aftermath:
                'The water shallows, and the drowned meadow of the ward circle opens ahead. Five standing ' +
                'stones rise from the fog in a ring, each carved with a symbol — and at the ring\'s center, ' +
                'half-sunk, a weathered shrine.'
        },
        {
            id: 'scene-3',
            title: 'The Ward Circle',
            images: [
                'adventures/the-witchwood-wards/images/03_ward_circle.jpg',
                'adventures/the-witchwood-wards/images/03_shrine_tablets.jpg'
            ],
            battlemap: 'ttb1-p19-l-gardens',
            readAloud:
                'Five standing stones ring a drowned meadow, each carved with a symbol: a leaf, a flame, a ' +
                'wave, a wind, a stone. At the circle\'s center a battered shrine holds a statue of a woman — ' +
                'a founder, hand outstretched as if offering a cup. Around the statue\'s feet lie moss-eaten ' +
                'tablets, and the stones hum faintly, patient and hungry.',
            readAloudNo:
                'Fem stående steiner omkranser en druknet eng, hver utskåret med et symbol: et blad, en flamme, ' +
                'en bølge, en vind, en stein. I sirkelens sentrum står et medtatt helgenskrin med en statue av ' +
                'en kvinne – en grunnlegger, med hånden strukket ut som om den byr frem et beger. Rundt ' +
                'statuens føtter ligger mosetne tavler, og steinene summer svakt, tålmodige og sultne.',
            environment:
                'The drowned meadow and the five-stone ring. The ward stones hum when approached; the shrine ' +
                'of the founder Elsweth stands at the center, offering a wooden cup of stagnant water.',
            notes: [
                'Puzzle — The Symbol Sequence: the five stones must be pressed in the order the founder served her village: wind, fire, water, leaf, stone — the order a seedling grows. The order is written on the shrine\'s tablets and in the statue\'s posture, and can be puzzled out by reading the carvings rather than trial and error.',
                'Reading the Shrine: the tablets are moss-eaten but legible — a DC 12 Investigation or History check reconstructs the founding story: Elsweth fed the wind-blown village, lit its first fire, drew its water, planted its gardens, and raised its walls of stone. Pressing the stones in that order breaks the ring.',
                'Wrong Press — Ward Spirit: pressing a stone out of order cracks it with a sound like a struck bell and a ward spirit rises from the mud to attack. No more than three spirits are bound to the ring; after the third, further wrong presses simply crack the stone (the ring stays intact until the order is right).',
                'The Locked Ring: the stones cannot be broken, dug up, or burned (Elder Sable warned of this). The symbols glisten with fresh moss after any physical assault — the ring heals itself.',
                'The Shrine Cup: offering the wooden cup\'s water to the statue first whispers the correct order to whoever stands near — a mercy for parties who want to skip the riddle. The order is always wind, fire, water, leaf, stone.'
            ],
            enemies: [
                {id: 'spirit-guardian', count: 3, optional: true}
            ],
            tactics: [
                'Ward Spirits: one spirit rises for each wrong press (up to three). They are Wardbound — they cannot leave the circle and ignore its difficult terrain, so the party can retreat to the causeway to regroup.',
                'Grasping Moss: a spirit\'s hit restrains its target with spectral vines; the restrained hero must break free or the next spirit presses the advantage.',
                'Combat or Riddle: the spirits only rise on mistakes. A party that reads the tablets first can shatter the ring untouched — reward the observation.'
            ],
            aftermath:
                'As the fifth stone is pressed in true order, the ring cracks like ice and the hum dies into ' +
                'silence. The ground sags beyond the circle into a hollow beneath the roots of a drowned oak — ' +
                'the witch\'s den, open at last.'
        },
        {
            id: 'scene-4',
            title: 'The Witch\'s Den',
            images: [
                'adventures/the-witchwood-wards/images/04_witchs_den.jpg',
                'adventures/the-witchwood-wards/images/04_swallowed_things.jpg'
            ],
            battlemap: 'ttb1-p32-r-underground',
            readAloud:
                'Beneath the drowned oak, the marsh hollows into a dry, warm den. The things the swamp has ' +
                'swallowed hang from the roots like trophies: a wedding bell, a farmer\'s boot, a child\'s ' +
                'wooden toys. Bark-touched servants stand still as furniture, and at the den\'s heart the witch ' +
                'waits — old as the bog, patient as it, feeding on the fear of a village she remembers ' +
                'young. She does not rise. "You broke my circle," she says. "Now you are mine to keep."',
            readAloudNo:
                'Under den druknede eika huler myren seg ut til en tørr, varm hule. Tingene sumpen har ' +
                'slukt henger fra røttene som trofeer: en bryllupsklokke, en bondestøvel, et barns treleker. ' +
                'Barkrammede tjenere står stille som møbler, og i hulens sentrum venter heksa – like gammel ' +
                'som myra, like tålmodig, som lever av frykten til en landsby hun husker som ung. Hun reiser ' +
                'seg ikke. «Dere brøt sirkelen min,» sier hun. «Nå er dere mine å holde.»',
            environment:
                'The witch\'s den: a hollow beneath the drowned oak, dry and warm, hung with swallowed things. ' +
                'Reeds grow up through the packed floor, and the roots arch overhead like ribs.',
            notes: [
                'The Den Guardians: the bark-touched servants and marsh hounds are the witch\'s court. The servants are slow, bark-hided walls that hold the line while the hounds drag prey into the open.',
                'The Witch Fights Cold: she stands at the heart of the den and does not move unless pressed. Her Curse of Bark saps speed and life at range; her Grasping Reeds pins the front line while the hounds close.',
                'Call the Court: once she summons 2 marsh hounds from the mire behind the party — keep a body between the backline and the open root-tunnel.',
                'The Swallowed Things: a DC 12 Perception check on the den walls finds the witch\'s trove — the village\'s plundered relics and, among them, a wooden cup like the one in the shrine.',
                'Reward: the witch\'s hoard holds the founder\'s heirloom — a +1 weapon or implement of the party\'s choosing — plus the village\'s reclaimed relics and 60 gp in salvaged goods.'
            ],
            enemies: [
                {id: 'bark-touched', count: 2},
                {id: 'marsh-hound', count: 2},
                {id: 'bog-witch'},
                {id: 'will-o-wisp', optional: true}
            ],
            tactics: [
                'Court First, Witch Last: the bark-touched servants and hounds screen the witch while she hangs back and lays down Curse of Bark. Burn the court down or bypass it to break her concentration.',
                'Grasping Reeds: when the party bunches up, the witch pins the front line and the hounds rush the exposed backline. Spread out.',
                'The Witch Does Not Chase: she has no reason to. She fights from the den\'s heart, punishing anyone who closes while keeping the party from simply leaving.',
                'The Broken Promise: when the witch reaches 0 HP she does not fall. She kneels, and the fight ends — read The Broken Promise scene.'
            ],
            aftermath:
                'The last hound drops, and the witch does not. She kneels in the mire of her den, breath ' +
                'rattling, and the fear drains from her face like water — leaving something older and ' +
                'more tired behind. "The village," she whispers. "They kept my cup. They never stopped ' +
                'praying to it."'
        },
        {
            id: 'scene-5',
            title: 'The Broken Promise',
            images: [
                'adventures/the-witchwood-wards/images/05_the_choice.jpg',
                'adventures/the-witchwood-wards/images/05_bark_falls.jpg'
            ],
            readAloud:
                'The witch kneels in the mire, and the truth spills out of her like water from a cracked pot. ' +
                'She is Elsweth — the founder whose shrine stands in the ward circle, betrayed in the founding ' +
                'days, sealed in the swamp by the people she saved. The curse is not her hatred; it is her ' +
                'grief, rooted in the mud and fed on fear so she would never be forgotten. Her death will ' +
                'break the wards and set the barked free. But she looks up, and she asks only this: "Will ' +
                'you remember me as the monster — or the founder?"',
            readAloudNo:
                'Heksa kneler i gjørma, og sannheten renner ut av henne som vann fra en sprukket krukke. ' +
                'Hun er Elsweth – grunnleggeren hvis skrin står i vardsirkelen, forrådt i grunnleggerårene, ' +
                'forseglet i sumpen av menneskene hun reddet. Forbannelsen er ikke hennes hat; det er hennes ' +
                'sorg, rotfestet i gjørma og næret på frykt så hun aldri skulle bli glemt. Hennes død vil ' +
                'bryte vardene og sette de barkrammede fri. Men hun ser opp og ber bare om dette: «Vil dere ' +
                'huske meg som monstret – eller som grunnleggeren?»',
            environment:
                'The witch\'s den after the battle: quiet, the roots still, the swallowed things swaying gently. ' +
                'The wooden cup from the shrine rests in the mud where it fell.',
            notes: [
                'The Choice: the witch will die either way — the curse is bound to her life. What the heroes do in the moment decides how she dies and what the curse leaves behind.',
                'Grant Peace: return her wooden cup, offer a prayer or a word of the founding story. She dies smiling; the bark falls from the rooted like shed skin (Tam is freed within the hour), and the swamp drains quiet. The village remembers the founder, and the +1 heirloom glows warm — its blessing intact.',
                'Strike Her Down: killing her in anger breaks the wards all the same, but the barked villagers wake stiff and grey for days, and the Witchwood keeps its cold edge. The heirloom is won, but tainted — the village tells the story of a monster slain by heroes who chose to hate.',
                'Spare Words, Not Mercy: she asks only to be remembered. There is no trick, no second form, no hidden third phase — the fight is over. Let the players realize they are holding the pen for this ending.',
                'Reward: the founder\'s heirloom (+1 weapon or implement), the village\'s reclaimed relics, 60 gp in salvaged goods, and Coldwell\'s lasting gratitude — a standing invitation and free room at the inn whenever the heroes pass the bridge.'
            ],
            aftermath:
                'The road from Coldwell is open for the first time in generations. The bark falls, the bridge ' +
                'holds, and the village walks out of the ring of stones — blinking at a world it had only ' +
                'heard about. However the heroes chose, the swamp settles behind them, quiet as a held breath, ' +
                'and the Witchwood finally lets go.'
        },
        {
            id: 'monster-gallery',
            title: 'Monster Gallery',
            images: ['adventures/the-witchwood-wards/images/monster-gallery.jpg'],
            gallery: true
        }
    ]
});
