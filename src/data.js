const skills = {
  // Agility
  catch: 'Catch',
  divingCatch: 'Diving Catch',
  divingTackle: 'Diving Tackle',
  dodge: 'Dodge',
  defensive: 'Defensive',
  jumpUp: 'Jump Up',
  leap: 'Leap',
  safePairOfHands: 'Safe Pair of Hands',
  sideStep: 'Side Step',
  sneakyGit: 'Sneaky Git',
  sprint: 'Sprint',
  sureFeet: 'Sure Feet',
  // General
  block: 'Block',
  dauntless: 'Dauntless',
  dirtyPlayer: (x) => 'Dirty Player (+' + x + ')',
  fend: 'Fend',
  frenzy: 'Frenzy',
  kick: 'Kick',
  pro: 'Pro',
  shadowing: 'Shadowing',
  stripBall: 'Strip Ball',
  sureHands: 'Sure Hands',
  tackle: 'Tackle',
  wrestle: 'Wrestle',
  // Mutation
  bigHand: 'Big Hand',
  claws: 'Claws',
  disturbingPresence: 'Disturbing Presence',
  extraArms: 'Extra Arms',
  foulAppearance: 'Foul Appearance',
  horns: 'Horns',
  ironHardSkin: 'Iron Hard Skin',
  monstrousMouth: 'Monstrous Mouth',
  prehensileTail: 'Prehensile Tail',
  tentacles: 'Tentacles',
  twoHeads: 'Two Heads',
  veryLongLegs: 'Very Long Legs',
  // Passing
  accurate: 'Accurate',
  cannoneer: 'Cannoneer',
  cloudBurster: 'Cloud Burster',
  dumpOff: 'Dump-off',
  fumblerooskie: 'Fumblerooskie',
  hailMaryPass: 'Hail Mary Pass',
  leader: 'Leader',
  nervesOfSteel: 'Nerves of Steel',
  onTheBall: 'On the Ball',
  pass: 'Pass',
  runningPass: 'Running Pass',
  safePass: 'Safe Pass',
  // Strength
  armBar: 'Arm Bar',
  brawler: 'Brawler',
  breakTackle: 'Break Tackle',
  grab: 'Grab',
  guard: 'Guard',
  juggernaut: 'Juggernaut',
  mightyBlow: (x) => 'Mighty Blow (+' + x + ')',
  multipleBlock: 'Multiple Block',
  pileDriver: 'Pile Driver',
  standFirm: 'Stand Firm',
  strongArm: 'Strong Arm',
  thickSkull: 'Thick Skull',
  // Traits
  animalSavagery: 'Animal Savagery',
  animosity: (x) => 'Animosity (' + x + ')',
  alwaysHungry: 'Always Hungry',
  ballAndChain: 'Ball & Chain',
  bombardier: 'Bombardier',
  boneHead: 'Bone Head',
  chainsaw: 'Chainsaw',
  decay: 'Decay',
  hypnoticGaze: 'Hypnotic Gaze',
  kickTeamMate: 'Kick Team Mate',
  loner: (x) => 'Loner (' + x + '+)',
  noHands: 'No Hands',
  plagueRidden: 'Plague Ridden',
  pogoStick: 'Pogo Stick',
  projectileVomit: 'Projectile Vomit',
  reallyStupid: 'Really Stupid',
  regeneration: 'Regeneration',
  rightStuff: 'Right Stuff',
  secretWeapon: 'Secret Weapon',
  stab: 'Stab',
  stunty: 'Stunty',
  swarming: 'Swarming',
  swoop: 'Swoop',
  takeRoot: 'Take Root',
  titchy: 'Titchy',
  timmmber: 'Timmm-ber!',
  throwTeamMate: 'Throw Team-mate',
  unchannelledFury: 'Unchannelled Fury'
}


const player = (quantity, position, cost, ma, st, ag, pa, av, skills, primaryAccess, secondaryAccess) => {
  return {
    quantity: quantity,
    position: position,
    cost: cost,
    ma: ma,
    st: st,
    ag: ag,
    pa: pa,
    av: av,
    skills: skills,
    primaryAccess: primaryAccess,
    secondaryAccess: secondaryAccess,
  }
}


const roster = (name, players, reRollsCost, apothecaryAllowed, tier) => {
  return {
    name: name,
    players: players,
    reRollsCost: reRollsCost,
    apothecaryAllowed: apothecaryAllowed,
    tier: tier,
  }
}


const rosters = [
  roster(
    'Amazon',
    [
      player(16, 'Linewoman', 50000, 6, 3, 3, 4, 8, [skills.dodge], 'G', 'AS'),
      player(2, 'Thrower', 75000, 6, 3, 3, 3, 8, [skills.dodge, skills.pass], 'GP', 'AS'),
      player(2, 'Catcher', 75000, 6, 3, 3, 5, 8, [skills.catch, skills.dodge], 'AG', 'S'),
      player(4, 'Blitzer', 90000, 6, 3, 3, 5, 8, [skills.block, skills.dodge], 'GS', 'A')
    ],
    50000,
    true,
    1,
  ),
  roster(
    'Black Orc',
    [
      player(12, 'Goblin Bruiser', 45000, 6, 2, 3, 4, 8, [skills.dodge, skills.rightStuff, skills.stunty, skills.thickSkull], 'A', 'GPS'),
      player(6, 'Black Orc', 90000, 4, 4, 4, 5, 10, [skills.brawler, skills.grab], 'GS', 'AP'),
      player(1, 'Trained Troll', 115000, 4, 5, 5, 5, 10, [skills.alwaysHungry, skills.loner(3), skills.mightyBlow(1), skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], 'S', 'AGP')
    ],
    60000,
    true,
    2,
  ),
  roster(
    'Chaos Chosen',
    [
      player(16, 'Beastman Runner', 60000, 6, 3, 3, 4, 9, [skills.horns], 'GMS', 'AP'),
      player(4, 'Chosen Blocker', 100000, 5, 4, 3, 5, 10, [], 'GMS', 'A'),
      player(1, 'Chaos Troll', 115000, 4, 5, 5, 5, 10, [skills.alwaysHungry, skills.loner(4), skills.mightyBlow(1), skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], 'MS', 'AG'),
      player(1, 'Chaos Ogre', 140000, 5, 5, 4, 5, 10, [skills.boneHead, skills.loner(4), skills.mightyBlow(1), skills.thickSkull, skills.throwTeamMate], 'MS', 'AG'),
      player(1, 'Minotaur', 150000, 5, 5, 4, null, 9, [skills.loner(4), skills.frenzy, skills.horns, skills.mightyBlow(1), skills.thickSkull, skills.unchannelledFury], 'MS', 'AG')
    ],
    60000,
    true,
    2,
  ),
  roster(
    'Chaos Dwarf',
    [
      player(16, 'Hobgoblin', 40000, 6, 3, 3, 4, 8, [], 'G', 'AS'),
      player(6, 'Blocker', 70000, 4, 3, 4, 6, 10, [skills.block, skills.tackle, skills.thickSkull], 'GS', 'AM'),
      player(2, 'Bull Centaur', 130000, 6, 4, 4, 6, 10, [skills.sprint, skills.sureFeet, skills.thickSkull], 'GS', 'A'),
      player(1, 'Enslaved Minotaur', 150000, 5, 5, 4, null, 9, [skills.animalSavagery, skills.frenzy, skills.horns, skills.loner(4), skills.mightyBlow(1), skills.thickSkull], 'S', 'AGM')
    ],
    70000,
    true,
    1,
  ),
  roster(
    'Chaos Renegade',
    [
      player(12, 'Human Lineman', 50000, 6, 3, 3, 4, 9, [], 'GM', 'AS'),
      player(1, 'Human Thrower', 75000, 6, 3, 3, 3, 9, [skills.animosity('all team-mates'), skills.pass, skills.safePairOfHands], 'GMP', 'AS'),
      player(1, 'Goblin', 40000, 6, 2, 3, 4, 8, [skills.animosity('all team-mates'), skills.dodge, skills.rightStuff, skills.stunty], 'AM', 'GP'),
      player(1, 'Orc', 50000, 5, 3, 3, 5, 10, [skills.animosity('all team-mates')], 'GM', 'AS'),
      player(1, 'Skaven', 50000, 7, 3, 3, 4, 8, [skills.animosity('all team-mates')], 'GM', 'AS'),
      player(1, 'Dark Elf', 75000, 6, 3, 2, 3, 9, [skills.animosity('all team-mates')], 'AGM', 'PS'),
      player(1, 'Troll', 115000, 4, 5, 5, 5, 10, [skills.alwaysHungry, skills.loner(4), skills.mightyBlow(1), skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], 'S', 'AGM'),
      player(1, 'Ogre', 140000, 5, 5, 4, 5, 10, [skills.boneHead, skills.loner(4), skills.mightyBlow(1), skills.thickSkull, skills.throwTeamMate], 'S', 'AGM'),
      player(1, 'Minotaur', 150000, 5, 5, 4, null, 9, [skills.loner(4), skills.frenzy, skills.horns, skills.mightyBlow(1), skills.thickSkull, skills.unchannelledFury], 'S', 'AGM'),
      player(1, 'Rat Ogre', 150000, 6, 5, 4, null, 9, [skills.animalSavagery, skills.frenzy, skills.loner(4), skills.mightyBlow(1), skills.prehensileTail], 'S', 'AGM')
    ],
    70000,
    true,
    2,
  ),
  roster(
    'Dark Elf',
    [
      player(12, 'Lineman', 70000, 6, 3, 2, 4, 9, [], 'AG', 'S'),
      player(2, 'Runner', 80000, 7, 3, 2, 3, 8, [skills.dumpOff], 'AGP', 'S'),
      player(4, 'Blitzer', 100000, 7, 3, 2, 4, 9, [skills.block], 'AG', 'PS'),
      player(2, 'Assassin', 85000, 7, 3, 2, 5, 8, [skills.shadowing, skills.stab], 'AG', 'PS'),
      player(2, 'Witch Elf', 110000, 7, 3, 2, 5, 8, [skills.dodge, skills.frenzy, skills.jumpUp], 'AG', 'PS')
    ],
    50000,
    true,
    1,
  ),
  roster(
    'Dwarf',
    [
      player(12, 'Blocker', 70000, 4, 3, 4, 5, 10, [skills.block, skills.tackle, skills.thickSkull], 'GS', 'A'),
      player(2, 'Runner', 85000, 6, 3, 3, 4, 9, [skills.sureHands, skills.thickSkull], 'GP', 'AS'),
      player(2, 'Blitzer', 80000, 5, 3, 3, 4, 10, [skills.block, skills.thickSkull], 'GS', 'AP'),
      player(2, 'Troll Slayer', 95000, 5, 3, 4, null, 9, [skills.block, skills.dauntless, skills.frenzy, skills.thickSkull], 'GS', 'A'),
      player(1, 'Deathroller', 170000, 4, 7, 5, null, 11, [skills.breakTackle, skills.dirtyPlayer(2), skills.juggernaut, skills.loner(5), skills.mightyBlow(1), skills.noHands, skills.secretWeapon, skills.standFirm], 'S', 'AG')
    ],
    50000,
    true,
    1,
  ),
  roster(
    'Elven Union',
    [
      player(12, 'Lineman', 60000, 6, 3, 2, 4, 8, [], 'AG', 'S'),
      player(2, 'Thrower', 75000, 6, 3, 2, 2, 8, [skills.pass], 'AGP', 'S'),
      player(4, 'Catcher', 100000, 8, 3, 2, 4, 8, [skills.catch, skills.nervesOfSteel], 'AG', 'S'),
      player(2, 'Blitzer', 115000, 7, 3, 2, 3, 9, [skills.block, skills.sideStep], 'AG', 'PS')
    ],
    50000,
    true,
    2,
  ),
  roster(
    'Goblin',
    [
      player(16, 'Lineman', 40000, 6, 2, 3, 4, 8, [skills.dodge, skills.rightStuff, skills.stunty], 'A', 'GPS'),
      player(1, 'Bomma', 45000, 6, 2, 3, 4, 8, [skills.bombardier, skills.dodge, skills.secretWeapon, skills.stunty], 'A', 'GPS'),
      player(1, 'Looney', 40000, 6, 2, 3, null, 8, [skills.chainsaw, skills.secretWeapon, skills.stunty], 'A', 'GS'),
      player(1, 'Fanatic', 70000, 3, 7, 3, null, 8, [skills.ballAndChain, skills.noHands, skills.secretWeapon, skills.stunty], 'S', 'AG'),
      player(1, 'Pogoer', 75000, 7, 2, 3, 5, 8, [skills.dodge, skills.pogoStick, skills.stunty], 'A', 'GPS'),
      player(1, 'Ooligan', 65000, 6, 2, 3, 6, 8, [skills.dirtyPlayer(1), skills.disturbingPresence, skills.dodge, skills.rightStuff, skills.stunty], 'A', 'GPS'),
      player(1, 'Doom Diver', 60000, 6, 2, 3, 6, 8, [skills.rightStuff, skills.stunty, skills.swoop], 'A', 'GS'),
      player(2, 'Trained Troll', 115000, 4, 5, 5, 5, 10, [skills.alwaysHungry, skills.loner(3), skills.mightyBlow(1), skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], 'S', 'AGP')
    ],
    60000,
    true,
    3,
  ),
  roster(
    'Halfling',
    [
      player(16, 'Hopeful', 30000, 5, 2, 3, 4, 7, [skills.dodge, skills.rightStuff, skills.stunty], 'A', 'GS'),
      player(2, 'Hefty', 50000, 5, 2, 3, 3, 8, [skills.dodge, skills.fend, skills.stunty], 'AP', 'GS'),
      player(2, 'Catcher', 55000, 5, 2, 3, 5, 7, [skills.catch, skills.dodge, skills.rightStuff, skills.sprint, skills.stunty], 'A', 'GS'),
      player(2, 'Altern Forest Treeman', 120000, 2, 6, 5, 5, 11, [skills.mightyBlow(1), skills.standFirm, skills.strongArm, skills.takeRoot, skills.thickSkull, skills.throwTeamMate, skills.timmmber], 'S', 'AGP')
    ],
    60000,
    true,
    3,
  ),
  roster(
    'High Elf',
    [
      player(16, 'Lineman', 70000, 6, 3, 2, 4, 9, [], 'AG', 'PS'),
      player(2, 'Thrower', 100000, 6, 3, 2, 2, 9, [skills.cloudBurster, skills.pass, skills.safePass], 'AGP', 'S'),
      player(4, 'Catcher', 90000, 8, 3, 2, 5, 8, [skills.catch], 'AG', 'S'),
      player(2, 'Blitzer', 100000, 7, 3, 2, 4, 9, [skills.block], 'AG', 'PS')
    ],
    50000,
    true,
    2,
  ),
  roster(
    'Human',
    [
      player(16, 'Lineman', 50000, 6, 3, 3, 4, 9, [], 'G', 'AS'),
      player(2, 'Thrower', 80000, 6, 3, 3, 2, 9, [skills.pass, skills.sureHands], 'GP', 'AS'),
      player(4, 'Catcher', 65000, 8, 2, 3, 5, 8, [skills.catch, skills.dodge], 'AG', 'SP'),
      player(4, 'Blitzer', 85000, 7, 3, 3, 4, 9, [skills.block], 'GS', 'AP'),
      player(3, 'Halfling Hopeful', 30000, 5, 2, 3, 4, 7, [skills.dodge, skills.rightStuff, skills.stunty], 'A', 'GS'),
      player(1, 'Ogre', 140000, 5, 5, 4, 5, 10, [skills.boneHead, skills.loner(4), skills.mightyBlow(1), skills.thickSkull, skills.throwTeamMate], 'S', 'AG')
    ],
    50000,
    true,
    1,
  ),
  roster(
    'Imperial Nobility',
    [
      player(12, 'Retainer Lineman', 45000, 6, 3, 4, 4, 8, [skills.fend], 'G', 'AS'),
      player(2, 'Thrower', 75000, 6, 3, 3, 3, 9, [skills.pass, skills.runningPass], 'GP', 'AS'),
      player(2, 'Noble Blitzer', 105000, 7, 3, 3, 4, 9, [skills.block, skills.catch], 'AG', 'PS'),
      player(4, 'Bodyguard', 90000, 6, 3, 3, 5, 9, [skills.standFirm, skills.wrestle], 'GS', 'A'),
      player(1, 'Ogre', 140000, 5, 5, 4, 5, 10, [skills.boneHead, skills.loner(4), skills.mightyBlow(1), skills.thickSkull, skills.throwTeamMate], 'S', 'AG')
    ],
    70000,
    true,
    2,
  ),
  roster(
    'Lizardmen',
    [
      player(12, 'Skink Runner Lineman', 60000, 8, 2, 3, 4, 8, [skills.dodge, skills.stunty], 'A', 'GPS'),
      player(2, 'Chameleon Skink', 70000, 7, 2, 3, 3, 8, [skills.dodge, skills.onTheBall, skills.shadowing, skills.stunty], 'A', 'GPS'),
      player(6, 'Saurus Blocker', 85000, 6, 4, 5, 6, 10, [], 'GS', 'A'),
      player(1, 'Kroxigor', 140000, 6, 5, 5, null, 10, [skills.boneHead, skills.loner(4), skills.mightyBlow(1), skills.prehensileTail, skills.thickSkull], 'S', 'AG')
    ],
    70000,
    true,
    1,
  ),
  roster(
    'Necromantic Horror',
    [
      player(16, 'Zombie', 40000, 4, 3, 4, null, 9, [skills.regeneration], 'G', 'AS'),
      player(2, 'Ghoul Runner', 75000, 7, 3, 3, 4, 8, [skills.dodge], 'AG', 'PS'),
      player(2, 'Wraith', 95000, 6, 3, 3, null, 9, [skills.block, skills.foulAppearance, skills.noHands, skills.regeneration, skills.sideStep], 'GS', 'A'),
      player(2, 'Werewolf', 125000, 8, 3, 3, 4, 9, [skills.claws, skills.frenzy, skills.regeneration], 'AG', 'PS'),
      player(2, 'Flesh Golem', 115000, 4, 4, 4, null, 10, [skills.regeneration, skills.standFirm, skills.thickSkull], 'GS', 'A')
    ],
    70000,
    false,
    2,
  ),
  roster(
    'Norse',
    [
      player(12, 'Lineman', 50000, 6, 3, 3, 4, 8, [skills.block], 'G', 'AS'),
      player(2, 'Thrower', 70000, 6, 3, 3, 3, 8, [skills.block, skills.pass], 'GP', 'AS'),
      player(2, 'Catcher', 90000, 7, 3, 3, 5, 8, [skills.block, skills.dauntless], 'AG', 'S'),
      player(2, 'Berserker', 90000, 6, 3, 3, 5, 8, [skills.block, skills.frenzy, skills.jumpUp], 'GS', 'A'),
      player(2, 'Ulfwerener', 105000, 6, 4, 4, null, 9, [skills.frenzy], 'GS', 'A'),
      player(1, 'Yhetee', 140000, 5, 5, 5, null, 9, [skills.claws, skills.disturbingPresence, skills.frenzy, skills.loner(4), skills.unchannelledFury], 'S', 'AG')
    ],
    60000,
    true,
    1,
  ),
  roster(
    'Nurgle',
    [
      player(12, 'Rotter', 35000, 5, 3, 4, 6, 9, [skills.decay, skills.plagueRidden], 'GM', 'AS'),
      player(4, 'Pestigor', 75000, 6, 3, 3, 4, 9, [skills.horns, skills.plagueRidden, skills.regeneration], 'GMS', 'AP'),
      player(4, 'Bloater', 115000, 4, 4, 4, 6, 10, [skills.disturbingPresence, skills.foulAppearance, skills.plagueRidden, skills.regeneration], 'GMS', 'A'),
      player(1, 'Rotspawn', 140000, 4, 5, 5, null, 10, [skills.disturbingPresence, skills.foulAppearance, skills.loner(4), skills.mightyBlow(1), skills.plagueRidden, skills.reallyStupid, skills.regeneration, skills.tentacles], 'S', 'AGM')
    ],
    70000,
    false,
    2,
  ),
  roster(
    'Ogre',
    [
      player(16, 'Gnoblar', 15000, 5, 1, 3, 5, 6, [skills.dodge, skills.rightStuff, skills.sideStep, skills.stunty, skills.titchy], 'A', 'G'),
      player(1, 'Ogre Runt Punter', 145000, 5, 5, 4, 4, 10, [skills.boneHead, skills.kickTeamMate, skills.mightyBlow(1), skills.thickSkull], 'PS', 'AG'),
      player(5, 'Ogre Blocker', 140000, 5, 5, 4, 5, 10, [skills.boneHead, skills.mightyBlow(1), skills.thickSkull, skills.throwTeamMate], 'S', 'AGP')
    ],
    70000,
    true,
    3,
  ),
  roster(
    'Old World Alliance',
    [
      player(12, 'Human Lineman', 50000, 6, 3, 3, 4, 9, [], 'G', 'AS'),
      player(1, 'Human Thrower', 80000, 6, 3, 3, 3, 9, [skills.animosity('all Dwarf and Hafling team-mates'), skills.pass, skills.sureHands], 'GP', 'AS'),
      player(1, 'Human Catcher', 65000, 8, 2, 3, 5, 8, [skills.animosity('all Dwarf and Hafling team-mates'), skills.catch, skills.dodge], 'AG', 'S'),
      player(1, 'Human Blitzer', 90000, 7, 3, 3, 4, 9, [skills.animosity('all Dwarf and Hafling team-mates'), skills.block], 'GS', 'A'),
      player(2, 'Dwarf Blocker', 75000, 4, 3, 4, 5, 10, [skills.armBar, skills.brawler, skills.loner(3), skills.thickSkull], 'GS', 'A'),
      player(1, 'Dwarf Runner', 85000, 6, 3, 3, 4, 9, [skills.loner(3), skills.sureHands, skills.thickSkull], 'GP', 'AS'),
      player(1, 'Dwarf Blitzer', 80000, 5, 3, 3, 4, 10, [skills.block, skills.loner(3), skills.thickSkull], 'GS', 'A'),
      player(1, 'Dwarf Troll Slayer', 95000, 5, 3, 4, null, 9, [skills.block, skills.dauntless, skills.frenzy, skills.loner(3), skills.thickSkull], 'GS', 'A'),
      player(2, 'Halfling Hopeful', 30000, 5, 2, 3, 4, 7, [skills.animosity('all Dwarf and Human team-mates'), skills.dodge, skills.rightStuff, skills.stunty], 'A', 'GS'),
      player(1, 'Ogre', 140000, 5, 5, 4, 5, 10, [skills.boneHead, skills.loner(4), skills.mightyBlow(1), skills.thickSkull, skills.throwTeamMate], 'S', 'AG'),
      player(1, 'Altern Forest Treeman', 120000, 2, 6, 5, 5, 11, [skills.loner(4), skills.mightyBlow(1), skills.standFirm, skills.strongArm, skills.takeRoot, skills.thickSkull, skills.throwTeamMate, skills.timmmber], 'S', 'AGP')
    ],
    70000,
    true,
    1,
  ),
  roster(
    'Orc',
    [
      player(16, 'Lineman', 50000, 5, 3, 3, 4, 10, [skills.animosity('Orc Linemen')], 'G', 'AS'),
      player(2, 'Thrower', 65000, 5, 3, 3, 3, 9, [skills.animosity('all team-mates'), skills.pass, skills.sureHands], 'GP', 'AS'),
      player(4, 'Blitzer', 80000, 6, 3, 3, 4, 10, [skills.animosity('all team-mates'), skills.block], 'GS', 'AP'),
      player(4, 'Big Un Blocker', 90000, 5, 4, 4, null, 10, [skills.animosity('Big Un Blockers')], 'GS', 'A'),
      player(4, 'Goblin', 40000, 6, 2, 3, 4, 8, [skills.dodge, skills.rightStuff, skills.stunty], 'A', 'GS'),
      player(1, 'Untrained Troll', 115000, 4, 5, 5, 5, 10, [skills.alwaysHungry, skills.loner(4), skills.mightyBlow(1), skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], 'S', 'AGP')
    ],
    60000,
    true,
    1,
  ),
  roster(
    'Shambling Undead',
    [
      player(12, 'Skeleton', 40000, 5, 3, 4, 6, 8, [skills.regeneration, skills.thickSkull], 'G', 'AS'),
      player(12, 'Zombie', 40000, 4, 3, 4, null, 9, [skills.regeneration], 'G', 'AS'),
      player(4, 'Ghoul Runner', 75000, 7, 3, 3, 4, 8, [skills.dodge], 'AG', 'PS'),
      player(2, 'Wight Blitzer', 90000, 6, 3, 3, 5, 9, [skills.block, skills.regeneration], 'GS', 'AP'),
      player(2, 'Mummy', 125000, 3, 5, 5, null, 10, [skills.mightyBlow(1), skills.regeneration], 'S', 'AG')
    ],
    70000,
    false,
    1,
  ),
  roster(
    'Skaven',
    [
      player(16, 'Clanrat Lineman', 50000, 7, 3, 3, 4, 8, [], 'G', 'AMS'),
      player(2, 'Thrower', 85000, 7, 3, 3, 2, 8, [skills.pass, skills.sureHands], 'GP', 'AMS'),
      player(4, 'Gutter Runner', 85000, 9, 2, 2, 4, 8, [skills.dodge], 'AG', 'MPS'),
      player(2, 'Blitzer', 90000, 7, 3, 3, 5, 9, [skills.block], 'GS', 'AMP'),
      player(1, 'Rat Ogre', 150000, 6, 5, 4, null, 9, [skills.animalSavagery, skills.frenzy, skills.loner(4), skills.mightyBlow(1), skills.prehensileTail], 'S', 'AGM')
    ],
    50000,
    true,
    1,
  ),
  roster(
    'Snotling',
    [
      player(16, 'Snotling Lineman', 15000, 5, 1, 3, 5, 6, [skills.dodge, skills.rightStuff, skills.sideStep, skills.stunty, skills.swarming, skills.titchy], 'A', 'G'),
      player(2, 'Fungus Flinga', 30000, 5, 1, 3, 4, 6, [skills.bombardier, skills.dodge, skills.rightStuff, skills.secretWeapon, skills.sideStep, skills.stunty], 'AP', 'G'),
      player(2, 'Fun-hoppa', 20000, 6, 1, 3, 5, 6, [skills.dodge, skills.pogoStick, skills.rightStuff, skills.sideStep, skills.stunty], 'A', 'G'),
      player(2, 'Stilty Runna', 20000, 6, 1, 3, 5, 6, [skills.dodge, skills.rightStuff, skills.sideStep, skills.sprint, skills.stunty], 'A', 'G'),
      player(2, 'Pump Wagon', 105000, 4, 5, 5, null, 9, [skills.dirtyPlayer(1), skills.juggernaut, skills.mightyBlow(1), skills.reallyStupid, skills.secretWeapon, skills.standFirm], 'S', 'AG'),
      player(2, 'Trained Troll', 115000, 4, 5, 5, 5, 10, [skills.alwaysHungry, skills.loner(3), skills.mightyBlow(1), skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], 'S', 'AGP')
    ],
    60000,
    true,
    3,
  ),
  roster(
    'Tomb Kings',
    [
      player(16, 'Skeleton', 40000, 5, 3, 4, 6, 8, [skills.regeneration, skills.thickSkull], 'G', 'AS'),
      player(2, 'Anointed Thrower', 70000, 6, 3, 4, 3, 8, [skills.pass, skills.regeneration, skills.sureHands, skills.thickSkull], 'GP', 'A'),
      player(2, 'Anointed Blitzer', 90000, 6, 3, 4, 6, 9, [skills.block, skills.regeneration, skills.thickSkull], 'GS', 'AP'),
      player(4, 'Tomb Guardian', 100000, 4, 5, 5, null, 10, [skills.decay, skills.regeneration], 'S', 'AG')
    ],
    70000,
    false,
    2,
  ),
  roster(
    'Underworld Denizens',
    [
      player(12, 'Underworld Goblin', 40000, 6, 2, 3, 4, 8, [skills.dodge, skills.rightStuff, skills.stunty], 'AM', 'GS'),
      player(6, 'Underworld Snotling', 15000, 5, 1, 3, 5, 6, [skills.dodge, skills.rightStuff, skills.sideStep, skills.stunty, skills.swarming, skills.titchy], 'AM', 'G'),
      player(16, 'Skaven Clanrat', 50000, 7, 3, 3, 4, 8, [skills.animosity('Underworld Goblin Linemen')], 'GM', 'AS'),
      player(2, 'Skaven Thrower', 85000, 7, 3, 3, 2, 8, [skills.animosity('Underworld Goblin Linemen'), skills.pass, skills.sureHands], 'GMP', 'AS'),
      player(4, 'Gutter Runner', 85000, 9, 2, 2, 4, 8, [skills.animosity('Underworld Goblin Linemen'), skills.dodge], 'AGM', 'PS'),
      player(2, 'Skaven Blitzer', 90000, 7, 3, 3, 5, 9, [skills.animosity('Underworld Goblin Linemen'), skills.block], 'GMS', 'AP'),
      player(2, 'Underworld Troll', 115000, 4, 5, 5, 5, 10, [skills.alwaysHungry, skills.loner(4), skills.mightyBlow(1), skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], 'MS', 'AGP'),
      player(1, 'Mutant Rat Ogre', 150000, 6, 5, 4, null, 9, [skills.animalSavagery, skills.frenzy, skills.loner(4), skills.mightyBlow(1), skills.prehensileTail], 'MS', 'AG')
    ],
    70000,
    true,
    2,
  ),
  roster(
    'Vampire',
    [
      player(12, 'Thrall', 40000, 6, 3, 3, 5, 8, [], 'G', 'AS'),
      player(6, 'Vampire', 110000, 6, 4, 2, 3, 9, [skills.animalSavagery, skills.hypnoticGaze, skills.regeneration], 'AGS', 'P')
    ],
    70000,
    true,
    2,
  ),
  roster(
    'Wood Elf',
    [
      player(12, 'Lineman', 70000, 7, 3, 2, 4, 8, [], 'AG', 'S'),
      player(2, 'Thrower', 95000, 7, 3, 2, 2, 8, [skills.pass], 'AGP', 'S'),
      player(4, 'Catcher', 90000, 8, 2, 2, 4, 8, [skills.catch, skills.dodge], 'AG', 'PS'),
      player(2, 'Wardancer', 125000, 8, 3, 2, 4, 8, [skills.block, skills.dodge, skills.leap], 'AG', 'PS'),
      player(1, 'Loren Forest Treeman', 120000, 2, 6, 5, 5, 11, [skills.loner(4), skills.mightyBlow(1), skills.standFirm, skills.strongArm, skills.takeRoot, skills.thickSkull, skills.throwTeamMate], 'S', 'AG')
    ],
    50000,
    true,
    1,
  ),
]

export {rosters, skills};
