const player = (quantity, position, cost, ma, st, ag, av, skills, normal, double) => {
  return {
    quantity: quantity,
    position: position,
    cost: cost,
    ma: ma,
    st: st,
    ag: ag,
    av: av,
    skills: skills,
    normal: normal,
    double: double
  }
}

const skills = {
  // agility
  catch: 'Catch',
  divingCatch: 'Diving Catch',
  divingTackle: 'Diving Tackle',
  dodge: 'Dodge',
  jumpUp: 'Jump Up',
  leap: 'Leap',
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
  kickOffReturn: 'Kick-off Return',
  passBlock: 'Pass Block',
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
  prehensileTail: 'Prehensile Tail',
  tentackles: 'Tentackles',
  twoHeads: 'Two Heads',
  veryLongLegs: 'Very Long Legs',
  // passing
  accurate: 'Accurate',
  dumpOff: 'Dump-off',
  hailMaryPass: 'Hail Mary Pass',
  leader: 'Leader',
  nervesOfSteel: 'Nerves of Steel',
  pass: 'Pass',
  safeThrow: 'Safe Throw',
  // strength
  breakTackle: 'Break Tackle',
  grab: 'Grab',
  guard: 'Guard',
  juggernaut: 'Juggernaut',
  mightyBlow: 'Mighty Blow',
  multipleBlock: 'Multiple Block',
  pilingOn: 'Pilng On',
  standFirm: 'Stand Firm',
  strongArm: 'Strong Arm',
  thickSkull: 'Thick Skull',
  // extraordinary
  alwaysHungry: 'Always Hungry',
  animosity: 'Animosity',
  ballAndChain: 'Ball & Chain',
  bloodLust: 'Blood Lust',
  bombardier: 'Bombardier',
  boneHead: 'Bone-head',
  chainsaw: 'Chainsaw',
  decay: 'Decay',
  fanFavourite: 'Fan Favourite',
  hypnoticGaze: 'Hypnotic Gaze',
  loner: 'Loner',
  monstrousMouth: 'Monstrous Mouth',
  noHands: 'No Hands',
  nurglesRot: 'Nurgles Rot',
  reallyStupid: 'Really Stupid',
  regeneration: 'Regeneration',
  rightStuff: 'Right Stuff',
  secretWeapon: 'Secret Weapon',
  stab: 'Stab',
  stunty: 'Stunty',
  swoop: 'Swoop',
  takeRoop: 'Take Root',
  throwTeamMate: 'Throw Team-mate',
  timmmber: 'Timmm-ber!',
  titchy: 'Titchy',
  weepingDagger: 'Weeping Dagger',
  wildAnimal: 'Wild Animal'
}

const races = [
  {
    name: 'Human',
    reRollsCost: 50000,
    apothecaryAllowed: true,
    players: [
      player(16, 'Lineman', 50000, 6, 3, 3, 8, [], 'G', 'ASP'),
      player(4, 'Catcher', 60000, 8, 2, 3, 7, [skills.catch, skills.dodge], 'GA', 'SP'),
      player(2, 'Thrower', 70000, 6, 3, 3, 8, [skills.pass, skills.sureHands], 'GP', 'AS'),
      player(4, 'Blitzer', 90000, 7, 3, 3, 8, [skills.Block], 'GS', 'AP'),
      player(1, 'Ogre', 140000, 5, 5, 2, 9, [skills.boneHead, skills.loner, skills.mightyBlow, skills.thickSkull, skills.throwTeamMate], 'S', 'GAP')
    ]
  },
  {
    name: 'Orc',
    reRollsCost: 60000,
    apothecaryAllowed: true,
    players: [
      player(16, 'Lineman', 50000, 5, 3, 3, 9, [], 'G', 'ASP'),
      player(4, 'Goblin', 40000, 6, 2, 3, 7, [skills.dodge, skills.rightStuff, skills.stunty], 'A', 'GSP'),
      player(2, 'Thrower', 70000, 5, 3, 3, 8, [skills.pass, skills.sureHands, 'GP', 'AS']),
      player(4, 'Black Orc Blocker', 80000, 4, 4, 2, 9, [], 'GS', 'AP'),
      player(4, 'Blitzer', 80000, 6, 3, 3, 9, [skills.block], 'GS', 'AP'),
      player(1, 'Troll', 110000, 4, 5, 1, 9, [skills.alwaysHungry, skills.loner, skills.mightyBlow, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], 'S', 'GSP')
    ]
  }
]

export default races;
