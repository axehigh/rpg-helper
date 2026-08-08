# The Blood Harvest

*A tabletop RPG adventure for 4 players, level 3–4, lasting 3–4 hours.*

---

## The Hook

It is the eve of the Harvest Festival in Reedfall, and the town is afraid in a way it has practiced so long it almost passes for calm. Garlands hang from the market stalls, the smell of apples and cinders fills the square — and on every lintel there is a handprint painted in dull red, the mark of the church's blessing. The village has a saint, Erilda, who drowned a hundred years ago holding back the fever; her skull rests in the church reliquary, and every Harvest Eve the church takes away the "fever-marked" — the sick, the old, the unlucky — promising the saint takes one so that all may live.

No one says what the saint does with them.

Tonight, the tithe is Nessa — a fifteen-year-old with a bad cough, the sister of Pip, the tavern-keeper's son. Pip saw the red-robed men carry her into the churchyard at midnight, saw the grave-digger who should have been dead for a year stand up from his own grave, and ran until he found strangers he could beg. He clutches a scrap of red-dyed linen torn from a robe and a single brass saint's-charm. At moonrise, he says, the Tithe Bell rings. Once the bell rings, she is gone.

The town wants you gone. Someone has to get to the church first.

## The Party's Objectives

- Reach Reedfall on festival eve and answer a child's plea.
- Break into the church and learn the truth of the Harvest Tithe.
- Reach the reliquary before the Tithe Bell sounds again.
- Face the Red Skull and decide what the cult deserves.

---

## The Storyline

### 1. The Festival Eve
The party arrives to garlands and shuttered windows. The square is bright and wrong: red handprints on the doors, goblin "watchmen" in red sashes standing where no one ever paid them to stand, and a crowd that cheers the saint's shrine a half-second too late. Pip finds them among the stalls, shaking, with the red linen and the story of his sister. Before they can move, the watchmen close in — the town has its reasons for wanting strangers gone before the bell.

### 2. The Churchyard
The churchyard gate is chained and the fog is thick enough to hide the walking dead. The gravedigger who stood up from his grave is not alone — the church's dead have been rising for years, kept quiet the way the tithe keeps the town quiet. Zombies shamble from the graves, skeletons crouch on the wall with shortbows, and the Tithe Bell waits somewhere above. The party must fight through the yard and the charnel smell to reach the church door.

### 3. The Tithe Ledger
Inside the sacristy, the truth is written down: the Tithe Ledger, years of festival nights, every entry a name, every name marked "taken by the fever" — including Pip's mother, five years ago, and Nessa, tonight. The fever is a story the church keeps for itself. Before the party can carry the ledger out, the abbot's castellan — a goblin hexer in a red cowl — springs the ambush he was waiting for, and the truth has a price.

### 4. The Catacombs
Below the church, the reliquary chamber: Erilda's skull, lacquered a wet red, on its altar — and the spirit of the saint herself, bound to it, weeping. She was real, and she is ashamed. The fever was real once, a hundred years ago, and she held it back with quarantine and clean linen and kindness, not with souls. The abbot read her legend wrong on purpose: a girl died under his care and he could not bear a world where a child dies for no reason, so he built a monster he could pay. The ward spirit rises to defend the reliquary — it can be fought, or it can be freed.

### 5. The Red Skull
The abbot waits in the vault with Nessa on the altar and his cult around him — Abbot Cael, in his red-skull miter, the saint's power crackling through him. He is not cruel; he is certain, and that is worse. The vault is his last argument: give him the girl, and the town stays safe forever. When he falls, he does not die. He kneels, and the choice is offered: mercy — speak Erilda's name over him, break the skull, let the town know what it is they've been afraid of — or vengeance, and make him the martyr he always wanted to be.

### Epilogue
There is no festival this year. The town buries its dead properly, the names in the ledger are read aloud once and the book is burned in the churchyard. Pip keeps the saint's charm. The reliquary's silver and the abbot's stores of healing potions find their way to the party, along with the town's thanks and its shame — and whichever way the choice went, Reedfall will tell the story of what heroes do with a monster who was almost right.

---

## Scene beats (for `data.js`)

**1. The Festival Eve** — setting: Reedfall's market square at dusk. Beat: the cheer that doesn't reach the eyes; Pip's plea. Enemies: goblin-skirmisher ×2 (optional), goblin-archer ×1 (optional). Tactics: the watchmen drive the party out — hit-and-run, shortbows, flee into alleys if pressed. Aftermath: Pip points the way; the gate is chained; the bell tolls at moonrise. Battlemap: `ttb1-p23-l-market-square`. ReadAloud: yes (No translation needed).

**2. The Churchyard** — setting: the fogbound, chained churchyard. Beat: the dead walking among their own graves. Enemies: zombie ×2, skeleton ×2. Tactics: undead surge forward and soak hits; skeletons hold the wall with shortbows. Aftermath: the sacristy key on the gravedigger; the Ledger inside. Battlemap: `ttb1-p8-r-village-walls` (suggested, swap freely). ReadAloud: yes.

**3. The Tithe Ledger** — setting: the sacristy, candlelit, ledgers to the ceiling. Beat: the truth written down; the ambush. Enemies: goblin-hexer ×1, goblin-skirmisher ×2. Tactics: the hexer curses from the gallery while skirmishers rush. Aftermath: the catacomb stair behind the reliquary veil. Battlemap: `ttlb-p23-l-room`. ReadAloud: yes.

**4. The Catacombs** — setting: the reliquary chamber under the church. Beat: the saint's spirit speaks; the fever was never real. Enemies: spirit-guardian ×1, ghoul ×2 (spirit can be spared, not killed). Tactics: the spirit holds the altar; ghouls flank. Aftermath: the abbot drags Nessa below. Battlemap: `ttlb-p31-l-underground`. ReadAloud: yes.

**5. The Red Skull** — setting: the reliquary vault. Beat: the last argument; the kneeling. Enemies: red-skull-abbot ×1, cultist ×2 (optional adds). Tactics: he channels the saint's power; the vault rings like a bell. Aftermath/payoff: the mercy-or-vengeance choice. Battlemap: `ttlb-p38-r-tomb`. ReadAloud: yes.

## Monsters Used

**Existing (library):** goblin-skirmisher (Fast melee), goblin-archer (Artillery), goblin-hexer (Support), spirit-guardian (Undead Guardian).

**New (canon, adapted — for `create-adventure` to register):**
- `zombie` — Undead · AC 8 · HP 22 · 20 ft · +3 · Slam 1d6+1 · *Undead Fortitude: may shrug off a killing blow (DC 12 CON save).*
- `skeleton` — Undead · AC 13 · HP 13 · 30 ft · +4 · Shortbow 1d6+2 · *Fragile Frame: bludgeoning damage is doubled.*
- `ghoul` — Undead · AC 12 · HP 22 · 30 ft · +4 · Claw 1d6+2 · *Paralyzing Bite: DC 11 CON save or paralyzed until its next turn.*
- `cultist` — Zealot · AC 12 · HP 12 · 30 ft · +4 · Dagger 1d4+2 · *Ritual Knife: marks a target — undead move toward it. Skull Chant: once, +1 to hit for nearby cultists and undead.*
- `red-skull-abbot` — Final Boss · AC 15 · HP 60 · 30 ft · +5 · Censer Flail 1d8+3 (×2 attacks) · *Tithe Bell: once, all undead in the vault act immediately. Saint's Vigor: once below half HP, regains 15 HP. Broken Zeal: at 0 HP he kneels instead of falling — the choice is offered.*
