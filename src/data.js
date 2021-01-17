const skills = {
  // agility
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
  // general
  block: 'Block',
  dauntless: 'Dauntless',
  dirtyPlayer: 'Dirty Player',
  fend: 'Fend',
  frenzy: 'Frenzy',
  kick: 'Kick',
  pro: 'Pro',
  shadowing: 'Shadowing',
  stripBall: 'Strip Ball',
  sureHands: 'Sure Hands',
  tackle: 'Tackle',
  wrestle: 'Wrestle',
  // mutation
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
  // passing
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
  // strength
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
  // traits
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
  takeRoop: 'Take Root',
  titchy: 'Titchy',
  timmmber: 'Timmm-ber!',
  throwTeamMate: 'Throw Team-mate',
  unchannelledFury: 'Unchannelled Fury'
}


const player = (quantity, position, cost, ma, st, ag, pa, av, skills, primary, secondary) => {
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
    primary: primary,
    secondary: secondary,
  }
}


const roster = (name, players, reRollsCost, apothecaryAllowed) => {
  return {
    name: name,
    players: players,
    reRollsCost: reRollsCost,
    apothecaryAllowed: apothecaryAllowed,
  }
}


const rosters = [
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
  ),
  roster(
    'Orc',
    [
      player(16, 'Lineman', 50000, 5, 3, 3, 4, 10, [skills.animosity('Orc Linemen')], 'G', 'AS'),
      player(2, 'Thrower', 65000, 5, 3, 3, 3, 9, [skills.animosity('all team-mates'), skills.pass, skills.sureHands], 'GP', 'AS'),
      player(4, 'Blitzer', 80000, 6, 3, 3, 4, 10, [skills.animosity('all team-mates'), skills.block], 'GS', 'AP'),
      player(4, 'Big Un Blocker', 90000, 5, 4, 4, '-', 10, [skills.animosity('Big Un Blockers')], 'GS', 'A'),
      player(4, 'Goblin', 40000, 6, 2, 3, 4, 8, [skills.dodge, skills.rightStuff, skills.stunty], 'A', 'GS'),
      player(1, 'Untrained Troll', 115000, 4, 5, 5, 5, 10, [skills.alwaysHungry, skills.loner(4), skills.mightyBlow(1), skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], 'S', 'AGP')
    ],
    60000,
    true,
  )
]

export default rosters;
