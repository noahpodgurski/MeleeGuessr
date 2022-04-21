import { AllCharacters, Character, Floaties, Spacies } from "../models/Character";
import { Choice } from "../models/Choice";

export interface PlayerType {
  [key: string]: Choice;
}

export const Player: PlayerType = { 
'Hungrybox': { 
  label: 'Hungrybox',
  characters: [Character.Jigglypuff,],
  flag: 'us',
  score: 100},
'Leffen': { 
  label: 'Leffen',
  characters: [Character.Fox,],
  conditionalCharacters: {
    "Sheik": [Character.Marth],
  },
  flag: 'se',
  score: 98.9},
'Mang0': {
  label: 'Mang0',
  aliases: ['mang0', 'mang', 'mango'],
  // color: 'primary',
  characters: [Character.Fox, Character.Falco],
  conditionalCharacters: {
    "Fox": [Character.Falco],
    "Falco": AllCharacters
  },
  flag: 'us',
  score: 98.3,
},
'Axe': { 
  label: 'Axe',
  aliases: ['frozenpizza', 'chillaxe'],
  characters: [Character.Pikachu,],
  flag: 'us',
  score: 97},
'Wizzrobe': { 
  label: 'Wizzrobe',
  characters: [Character.Falcon,],
  flag: 'us',
  score: 96.4},
'Zain': { 
  label: 'Zain',
  aliases: ['zain ', 'dontrestme', 'zain', '@boyo_boost', 'cock9 dinodick', 'albert999999999', 'spilledmycumjar'],
  characters: [Character.Marth,],
  flag: 'us',
  score: 96.1},
'aMSa': { 
  label: 'aMSa',
  characters: [Character.Yoshi,],
  flag: 'jp',
  score: 94.6},
'Plup': { 
  label: 'Plup',
  aliases: ['plub'],
  characters: [Character.Sheik, Character.Fox],
  flag: 'us',
  score: 93.5},
'iBDW': { 
  label: 'iBDW',
  characters: [Character.Fox,],
  flag: 'us',
  score: 92.9},
'Mew2King': { 
  label: 'Mew2King',
  characters: [Character.Marth],
  conditionalCharacters: {
    "Fox": [Character.Jigglypuff],
    "Sheik": Floaties,
    // "Marth": Spacies
  },
  flag: 'us',
  score: 92},
'S2J': { 
  label: 'S2J',
  aliases: ['john redcorn', 'tony soprano', 'barry lyndon', 'mr plow', 'yolanda'],
  characters: [Character.Falcon,],
  flag: 'us',
  score: 91.5},
'Fiction': { 
  label: 'Fiction',
  characters: [Character.Fox,],
  flag: 'us',
  score: 90.3},
'SFAT': { 
  label: 'SFAT',
  aliases: ['eatyourveggies', 'es gordo', 'its gonna be ok', 'o7 ', 'lookin4marths', 'aye or die', 'softfat', 'veggie monster'],
  characters: [Character.Fox,],
  flag: 'us',
  score: 90.3},
'moky': { 
  label: 'moky',
  characters: [Character.Fox,],
  flag: 'ca',
  score: 89.2},
'n0ne': { 
  label: 'n0ne',
  characters: [Character.Falcon,],
  flag: 'ni',
  score: 88.1},
'Trif': { 
  label: 'Trif',
  characters: [Character.Peach,],
  flag: 'es',
  score: 87.4},
'Captain Faceroll': { 
  label: 'Captain Faceroll',
  characters: [Character.Sheik,],
  flag: 'us',
  score: 87.1},
'Swedish Delight': { 
  label: 'Swedish Delight',
  characters: [Character.Sheik,],
  flag: 'us',
  score: 86.9},
'Hax': { 
  label: 'Hax',
  characters: [Character.Fox,],
  flag: 'us',
  score: 84.7},
'Lucky': { 
  label: 'Lucky',
  characters: [Character.Fox,],
  flag: 'us',
  score: 84.7},
'Ginger': { 
  label: 'Ginger',
  characters: [Character.Falco,],
  flag: 'us',
  score: 83.2},
'Spark': { 
  label: 'Spark',
  characters: [Character.Sheik,],
  flag: 'us',
  score: 82.7},
'ChuDat': { 
  label: 'ChuDat',
  characters: [Character.IC],
  flag: 'us',
  score: 82.2},
'PewPewU': { 
  label: 'PewPewU',
  characters: [Character.Marth, Character.Fox,],
  flag: 'us',
  score: 81.5},
'lloD': { 
  label: 'lloD',
  characters: [Character.Peach,],
  flag: 'us',
  score: 80},
'ARMY': { 
  label: 'ARMY',
  characters: [Character.IC],
  flag: 'us',
  score: 79.6},
'AbsentPage': { 
  label: 'AbsentPage',
  characters: [Character.Fox,],
  flag: 'us',
  score: 78.9},
'Bananas': { 
  label: 'Bananas',
  characters: [Character.IC],
  flag: 'us',
  score: 77.6},
'KJH': { 
  label: 'KJH',
  aliases: ['kjh', 'magisux', ':(', ';(', 'pull up hoe'],
  characters: [Character.Fox,],
  flag: 'us',
  score: 77.6},
'Shroomed': { 
  label: 'Shroomed',
  characters: [Character.Sheik, Character.Marth, Character.DrMario],
  flag: 'us',
  score: 75.6},
'Westballz': { 
  label: 'Westballz',
  characters: [Character.Falco,],
  flag: 'us',
  score: 74.9},
'Medz': { 
  label: 'Medz',
  aliases: ['medz', 'michael peña', 'migatteno gokui'],
  characters: [Character.Fox, Character.Marth,],
  flag: 'us',
  score: 74.1},
'MikeHaze': { 
  label: 'MikeHaze',
  characters: [Character.Fox,],
  flag: 'us',
  score: 73.4},
'Professor Pro': { 
  label: 'Professor Pro',
  characters: [Character.Fox,],
  flag: 'gb',
  score: 72.5},
'2saint': { 
  label: '2saint',
  characters: [Character.Jigglypuff,],
  flag: 'us',
  score: 72.5},
'Gahtzu': { 
  label: 'Gahtzu',
  characters: [Character.Falcon,],
  flag: 'us',
  score: 71.3},
'Albert': { 
  label: 'Albert',
  characters: [Character.Falco,],
  flag: 'us',
  score: 69.8},
'Spud': { 
  label: 'Spud',
  characters: [Character.Marth,],
  flag: 'nz',
  score: 68.7},
'FatGoku': { 
  label: 'FatGoku',
  characters: [Character.Fox,],
  flag: 'us',
  score: 67.8},
'Rishi': { 
  label: 'Rishi',
  aliases: ['imrlygood'],
  characters: [Character.Marth, Character.DK],
  flag: 'us',
  score: 67.3},
'Bimbo': { 
  label: 'Bimbo',
  characters: [Character.Falco,],
  flag: 'mx',
  score: 66.2},
'Setchi': { 
  label: 'Setchi',
  characters: [Character.Falcon,],
  flag: 'gb',
  score: 66.2},
'Magi': { 
  label: 'Magi',
  aliases: ['burrito dog', 'built depressed', 'dumbfuckdipshit', 'hottub streamer', 'come get it bby', 'ahhhhhhhhhhhhhh', 'the ironcat', 'go ez on me :(', 'big strong cat', 'magi', 'bitch', 'vroom vroom cat'],
  characters: [Character.Falco,],
  flag: 'us',
  score: 74.8},
'Morsecode762': { 
  label: 'Morsecode762',
  characters: [Character.Samus],
  flag: 'us',
  score: 63.1},
'Jakenshaken': { 
  label: 'Jakenshaken',
  characters: [Character.Marth,],
  flag: 'us',
  score: 63},
'HugS': { 
  label: 'HugS',
  characters: [Character.Samus],
  flag: 'us',
  score: 62.1},
'Zamu': { 
  label: 'Zamu',
  characters: [Character.Fox,],
  flag: 'us',
  score: 60.1},
'Drephen': { 
  label: 'Drephen',
  characters: [Character.Sheik,],
  flag: 'us',
  score: 59.9},
'Michael': { 
  label: 'Michael',
  characters: [Character.Jigglypuff,],
  flag: 'us',
  score: 59},
'Ice': { 
  label: 'Ice',
  characters: [Character.Fox,],
  flag: 'de',
  score: 58.8},
'billybopeep': { 
  label: 'billybopeep',
  characters: [Character.Fox,],
  flag: 'us',
  score: 58.7},
'La Luna': { 
  label: 'La Luna',
  characters: [Character.Marth,],
  flag: 'us',
  score: 57.5},
'Colbol': { 
  label: 'Colbol',
  characters: [Character.Fox, Character.Marth,],
  flag: 'us',
  score: 57.2},
'Overtriforce': { 
  label: 'Overtriforce',
  characters: [Character.Sheik,],
  flag: 'es',
  score: 57.1},
'Slox': { 
  label: 'Slox',
  characters: [Character.Fox,],
  flag: 'us',
  score: 56.3},
'Kalamazhu': { 
  label: 'Kalamazhu',
  characters: [Character.Peach,],
  flag: 'us',
  score: 56.2},
'Nickemwit': { 
  label: 'Nickemwit',
  characters: [Character.Falcon,],
  flag: 'us',
  score: 55.6},
'Jerry': { 
  label: 'Jerry',
  characters: [Character.Fox, Character.Jigglypuff,],
  flag: 'us',
  score: 54.2},
'Aura': { 
  label: 'Aura',
  characters: [Character.Peach,],
  flag: 'us',
  score: 52.8},
'Nut': { 
  label: 'Nut',
  characters: [Character.Sheik,],
  flag: 'us',
  score: 52.8},
'Kalvar': { 
  label: 'Kalvar',
  characters: [Character.Marth,],
  flag: 'us',
  score: 52.6},
'Polish': { 
  label: 'Polish',
  characters: [Character.Peach,],
  flag: 'us',
  score: 52},
'Kevin Maples': { 
  label: 'Kevin Maples',
  characters: [Character.Fox,],
  flag: 'us',
  score: 48},
'Bladewise': { 
  label: 'Bladewise',
  characters: [Character.Peach,],
  flag: 'us',
  score: 47.6},
'Tai': { 
  label: 'Tai',
  characters: [Character.Marth,],
  flag: 'us',
  score: 47.4},
'Squid': { 
  label: 'Squid',
  characters: [Character.Falco,],
  flag: 'us',
  score: 16.5},
'Forrest': { 
  label: 'Forrest',
  characters: [Character.Marth,],
  flag: 'us',
  score: 45.5},
'Joyboy': { 
  label: 'Joyboy',
  characters: [Character.Fox,],
  flag: 'us',
  score: 44.8},
'KoDoRiN': { 
  label: 'KoDoRiN',
  aliases: ['||||||||||||'],
  characters: [Character.Marth,],
  flag: 'us',
  score: 44.6},
'Ryan Ford': { 
  label: 'Ryan Ford',
  characters: [Character.Fox, Character.Sheik,],
  flag: 'ca',
  score: 43.2},
'Free Palestine': { 
  label: 'Free Palestine',
  characters: [Character.Sheik, Character.Marth,],
  flag: 'palestine',
  score: 41.7},
'Ryobeat': { 
  label: 'Ryobeat',
  characters: [Character.Peach,],
  flag: 'us',
  score: 41.3},
'Ka Master': { 
  label: 'Ka Master',
  characters: [Character.Luigi, Character.Falcon,],
  flag: 'us',
  score: 39.4},
'Kürv': { 
  label: 'Kürv',
  characters: [Character.Luigi, Character.Fox,],
  flag: 'us',
  score: 38.8},
'Frenzy': { 
  label: 'Frenzy',
  characters: [Character.Falco,],
  flag: 'gb',
  score: 38.5},
'MoG': { 
  label: 'MoG',
  characters: [Character.Peach,],
  flag: 'us',
  score: 38.2},
'Boyd': { 
  label: 'Boyd',
  characters: [Character.IC],
  flag: 'us',
  score: 38.2},
'Cool Lime': { 
  label: 'Cool Lime',
  characters: [Character.IC],
  flag: 'us',
  score: 37.4},
'bobby big ballz': { 
  label: 'bobby big ballz',
  characters: [Character.Falco,],
  flag: 'us',
  score: 37.3},
'Nintendude': { 
  label: 'Nintendude',
  characters: [Character.Marth, Character.IC],
  flag: 'us',
  score: 36.8},
'Franz': { 
  label: 'Franz',
  characters: [Character.DrMario,],
  flag: 'us',
  score: 36.4},
'Nicki': { 
  label: 'Nicki',
  characters: [Character.Fox,],
  flag: 'de',
  score: 36.2},
'lint': { 
  label: 'lint',
  characters: [Character.Falco,],
  flag: 'us',
  score: 34.7},
'King Mom': { 
  label: 'King Mom',
  characters: [Character.Falco,],
  flag: 'us',
  score: 33.5},
'TheRealThing': { 
  label: 'TheRealThing',
  characters: [Character.Falco,],
  flag: 'us',
  score: 32.9},
'Zeo': { 
  label: 'Zeo',
  characters: [Character.Falcon,],
  flag: 'us',
  score: 32},
'Pricent': { 
  label: 'Pricent',
  characters: [Character.Fox,],
  flag: 'no',
  score: 31.6},
'Prince Ab': { 
  label: 'Prince Ab',
  characters: [Character.Jigglypuff,],
  flag: 'us',
  score: 31.4},
'Amsah': { 
  label: 'Amsah',
  characters: [Character.Sheik,],
  flag: 'nl',
  score: 30.9},
'Rocky': { 
  label: 'Rocky',
  characters: [Character.Falco,],
  flag: 'us',
  score: 30.1},
'Sharkz': { 
  label: 'Sharkz',
  characters: [Character.IC],
  flag: 'us',
  score: 29.8},
'HTwa': { 
  label: 'HTwa',
  characters: [Character.Sheik, Character.Fox,],
  flag: 'us',
  score: 28},
'Kage': { 
  label: 'Kage',
  characters: [Character.Ganondorf,],
  flag: 'ca',
  score: 25.4},
'Schythed': { 
  label: 'Schythed',
  characters: [Character.Falcon,],
  flag: 'us',
  score: 25.4},
'Panda': { 
  label: 'Panda',
  characters: [Character.Fox,],
  flag: 'us',
  score: 24.9},
'Soonsay': { 
  label: 'Soonsay',
  characters: [Character.Fox,],
  flag: 'ca',
  score: 24.8},
'TheSWOOPER': { 
  label: 'TheSWOOPER',
  characters: [Character.Samus],
  flag: 'us',
  score: 24.7},
'Snowy': { 
  label: 'Snowy',
  characters: [Character.Jigglypuff,],
  flag: 'us',
  score: 24.3},


  'Armada': {
    label: 'Armada',
    // color: 'warning',
    characters: [Character.Peach],
    conditionalCharacters: {
      "Fox": [Character.Jigglypuff, Character.Fox],
    },
  },
  'PPMD': {
    label: 'PPMD',
    // color: 'warning',
    characters: [Character.Falco, Character.Marth]
  },
  'Moky': {
    label: 'Moky',
    characters: [Character.Fox]
  },
  'Hax$': {
    label: 'Hax$',
    characters: [Character.Fox]
  },
  'Llod': {
    label: 'Llod',
    characters: [Character.Peach]
  },
  'LSD': {
    label: 'LSD',
    characters: [Character.Marth]
  },
  'Kodorin': {
    label: 'Kodorin',
    characters: [Character.Marth]
  },
  'Wobbles': {
    label: 'Wobbles',
    characters: [Character.IC]
  },
  'Anther': {
    label: 'Anther',
    characters: [Character.Pikachu]
  },
  'Tyler Swift': {
    label: 'Tyler Swift',
    characters: [Character.Pikachu]
  },
  'BobbyScar': {
    label: "BobbyScar",
    aliases: ['bobbyscar'],
    characters: [Character.Falcon]
  },
  'DarkGenex': {
    label: "DarkGenex",
    aliases: ['darkgenex'],
    characters: [Character.Fox]
  },
  'Jbone': {
    label: "Jbone",
    aliases: ['jbone', 'joey =d', 'j03y', 'eatyourmeat', 'lucky'],
    characters: [Character.Sheik]
  },
  'Reeve': {
    label: "Reeve",
    aliases: ['reeve', 'ttv/reeve', 'clout strife', "mang0's patreon", 'mang0spalreeve'],
    characters: [Character.Marth]
  },
  'Toph': {
    label: "Toph",
    aliases: ['toph'],
    characters: [Character.Fox]
  },
  'ludwig': {
    label: "ludwig",
    aliases: ['ludwig'],
    characters: [Character.Jigglypuff]
  },
  'null': {
    label: "null",
    aliases: ['null', 'null4summit :)'],
    characters: [Character.Fox]
  },
  

  
  'TEST': {
    label: 'TEST',
    characters: AllCharacters
  }
}