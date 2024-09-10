import { AllCharacters, Character, Floaties, MidLowTiers } from "../models/Character";
import { Choice } from "../models/Choice";

export interface PlayerType {
  [key: string]: Choice;
}

export const Player: PlayerType = { 
  'Hungrybox': { 
    label: 'Hungrybox',
    characters: [Character.Jigglypuff, Character.Ness],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
    aliases: ["Hbox", "HGod", "Clutchbox", "Clutchgod"],
    score: 100},
  'Leffen': { 
    label: 'Leffen',
    characters: [Character.Fox, Character.Mewtwo],
    controllerType: {
      type: {
        rectangle: false,
      },
      mods: {
        notches: true,
        zJump: true
      }
    },
    conditionalCharacters: {
      "Sheik": [Character.Marth],
    },
    flag: 'se',
    score: 98.9},
  'Mang0': {
    label: 'Mang0',
    aliases: ['mang0', 'mang', 'mango', 'mang#0'],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    // color: 'primary',
    characters: [Character.Falco, Character.Mario, Character.DrMario],
    conditionalCharacters: {
      "Fox": [Character.Falco],
    },
    flag: 'us',
    score: 98.3,
  },
  'cpu0': { 
    label: 'cpu0',
    aliases: ['CPU#0'],
    characters: [Character.Jigglypuff, Character.Marth, Character.Fox],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
  },
  'mof': { 
    label: 'mof',
    characters: [Character.IC],
    controllerType: {
      type: {
        rectangle: false,
        oEMModded: true
      }
    },
    flag: 'us',
  },
  'Axe': { 
    label: 'Axe',
    aliases: ['AXE#845', 'frozenpizza', 'chillaxe', 'axe.pizza'],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      },
      mods: {
        notches: true
      },
    },
    characters: [Character.Falco, ...MidLowTiers],
    flag: 'us',
    score: 97},
  'Wizzrobe': { 
    label: 'Wizzrobe',
    aliases: ['wizzy'],
    characters: [Character.Falcon,],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
    score: 96.4},
  'JChu': { 
    label: 'JChu',
    characters: [Character.Pikachu],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
  },
  'ChaoticNordi': { 
    label: 'ChaoticNordi',
    characters: [Character.Roy],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
  },
  'Zain': { 
    label: 'Zain',
    aliases: ['zain ', 'dontrestme', 'zain', '@boyo_boost', 'cock9 dinodick', 'albert999999999', 'spilledmycumjar'],
    controllerType: {
      type: {
        rectangle: false,
        oEMModded: true,
      }
    },
    characters: [Character.Marth,Character.Roy],
    conditionalCharacters: {
        "Ice Climbers": [Character.Marth]
    },
    flag: 'us',
    score: 96.1},
  'aMSa': { 
    label: 'aMSa',
    characters: [Character.Yoshi,],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'jp',
    score: 94.6},
  'Plup': { 
    label: 'Plup',
    aliases: ['plub'],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    characters: [Character.Fox, ...MidLowTiers],
    flag: 'us',
    score: 93.5},
  'Eddy Mexico': { 
    label: 'Eddy Mexico',
    characters: [Character.Luigi],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
  },
  'Cody': { 
    label: 'Cody Schwab',
    aliases: ['iBDW', 'ibdw', 'Cody', 'IBDW#0', 'ibdw#734'],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      },
      mods: {
        zJump: true,
      }
    },
    characters: [Character.Fox,],
    flag: 'us',
    score: 92.9},
  'Mew2King': { 
    label: 'Mew2King',
    characters: [Character.Marth, ...MidLowTiers],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    conditionalCharacters: {
      "Fox": [Character.Jigglypuff],
      "Sheik": Floaties,
      // "Marth": Spacies
    },
    flag: 'us',
    score: 92},
  'SDJ': { 
    label: 'SDJ',
    characters: [Character.Jigglypuff],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
  },
  'Becca': {
    label: 'Becca',
    characters: [Character.Zelda]
  },
  'DJ Nintendo': {
    label: "DJ Nintendo",
    characters: MidLowTiers,
    controllerType: {
      type: {
        rectangle: false
      }
    }
  },
  'Taj': {
    label: 'Taj',
    aliases: ["TAJ#69", "DEEP KRO"],
    characters: [Character.Mewtwo, Character.Samus],
    controllerType: {
      type: {
        rectangle: false
      }
    }
  },
  'Triple R': {
    label: 'Triple R',
    characters: [Character.Kirby, Character.Pichu],
    controllerType: {
      type: {
        rectangle: false
      }
    }
  },
  'S2J': { 
    label: 'S2J',
    aliases: ['john redcorn', 'tony soprano', 'barry lyndon', 'mr plow', 'yolanda'],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    characters: [Character.Falcon,],
    flag: 'us',
    score: 91.5},
  'Fiction': { 
    label: 'Fiction',
    aliases: ['yousobadatgame', 'fff#641'],
    controllerType: {
      type: {
        rectangle: false,
        goomwave: true
      }
    },
    characters: [Character.Fox,],
    flag: 'us',
    score: 90.3},
  'SFAT': { 
    label: 'SFAT',
    aliases: ['eatyourveggies', 'es gordo', 'its gonna be ok', 'o7 ', 'lookin4marths', 'aye or die', 'softfat', 'veggie monster'],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    characters: [Character.Fox,],
    flag: 'us',
    score: 90.3},
  'Chem': {
    label: 'Chem',
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    characters: [Character.Fox],
  },
  'Ben': {
    label: 'Ben',
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    characters: [Character.Sheik]
  },
  'Krudo': {
    label: 'Krudo',
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    characters: [Character.Sheik]
  },
  'Sfop': {
    label: "Sfop",
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    characters: [Character.Fox]
  },
  'n0ne': { 
    label: 'n0ne',
    aliases: ['bond', 'none'],
    controllerType: {
      type: {
        rectangle: false,
        oEMModded: true
      }
    },
    characters: [Character.Falcon, Character.Ganondorf, Character.Mario],
    flag: 'ni',
    score: 88.1},
  'Egg$': { 
    label: 'Egg$',
    characters: [Character.Yoshi],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
  },
  'Franz': { 
    label: 'Franz',
    characters: [Character.DrMario],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
  },
  'Trif': { 
    label: 'Trif',
    characters: [Character.Peach,],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'es',
    score: 87.4},
  'Captain Faceroll': { 
    label: 'Captain Faceroll',
    characters: [Character.Sheik,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 87.1},
  'Swedish Delight': { 
    label: 'Swedish Delight',
    characters: [Character.Sheik,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 86.9},
  'Lucky': { 
    label: 'Lucky',
    aliases: ['jbone', 'joey =d', 'j03y', 'eatyourmeat', 'lucky'],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    characters: [Character.Fox,],
    flag: 'us',
    score: 84.7},
  'Ginger': { 
    label: 'Ginger',
    characters: [Character.Falco,],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
    score: 83.2},
  'Kibbles': { 
    label: 'Kibbles',
    characters: [Character.Yoshi,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
  },
  'LittleCoaks': { 
    label: 'LittleCoaks',
    characters: [Character.Yoshi,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
  },
  'Spark': { 
    label: 'Spark',
    aliases: ["hug money", "ZAID#633"],
    controllerType: {
      type: {
        rectangle: false,
        oEMModded: true
      }
    },
    characters: [Character.Sheik,],
    flag: 'us',
    score: 82.7},
  'ChuDat': { 
    label: 'ChuDat',
    characters: [Character.IC],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 82.2},
  'PewPewU': { 
    label: 'PewPewU',
    characters: [Character.Marth],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 81.5},
  'lloD': { 
    label: 'lloD',
    characters: [Character.Peach,],
    controllerType: {
      type: {
        rectangle: false,
        oEMModded: true,
      },
      mods: {
        zJump: true
      }
    },
    flag: 'us',
    score: 80},
  'ARMY': { 
    label: 'ARMY',
    characters: [Character.IC],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 79.6},
  'Bananas': { 
    label: 'Bananas',
    characters: [Character.IC],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 77.6},
  'KJH': { 
    label: 'KJH',
    aliases: ['kjh', 'magisux', ':(', ';(', 'pull up hoe'],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    characters: [Character.Fox,],
    flag: 'us',
    score: 77.6},
  'Shroomed': { 
    label: 'Shroomed',
    characters: [Character.Sheik, Character.Marth, Character.DrMario],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 75.6},
  'Westballz': { 
    label: 'Westballz',
    characters: [Character.Falco,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 74.9},
  'Medz': { 
    label: 'Medz',
    aliases: ['medz', 'michael peña', 'migatteno gokui'],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    characters: [Character.Fox, Character.Marth,],
    flag: 'us',
    score: 74.1},
  'MikeHaze': { 
    label: 'MikeHaze',
    characters: [Character.Fox,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 73.4},
  'JoshMan': { 
    label: 'JoshMan',
    aliases: ['Sora', 'woof#111'],
    controllerType: {
      type: {
        rectangle: false,
        oEMModded: true,
      }
    },
    characters: [Character.Fox,],
    flag: 'us',
    score: 73.4},
  // 'Professor Pro': { 
  //   label: 'Professor Pro',
  //   characters: [Character.Fox,],
  // controllerType: {
  //   type: {
  //     rectangle: false,
  //   }
  // },
  //   flag: 'gb',
  //   score: 72.5},
  '2saint': { 
    label: '2saint',
    characters: [Character.Jigglypuff,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 72.5},
  'Salt': { 
    label: 'Salt',
    aliases: ['SALT#747'],
    characters: [Character.Falcon, Character.Roy],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
  },
  'Zuppy': { 
    label: 'Zuppy',
    characters: [Character.Fox],
    controllerType: {
      type: {
        rectangle: true,
      }
    },
    flag: 'us',
  },
  'Gahtzu': { 
    label: 'Gahtzu',
    aliases: ['GUTZ', 'GAHT#867'],
    controllerType: {
      type: {
        rectangle: true,
      }
    },
    characters: [Character.Falcon,],
    flag: 'us',
    score: 71.3},
  'Albert': { 
    label: 'Albert',
    aliases: ['ALBE#135'],
    characters: [Character.Falco,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 69.8},
  'Spud': { 
    label: 'Spud',
    characters: [Character.Marth,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'nz',
    score: 68.7},
  'FatGoku': { 
    label: 'FatGoku',
    characters: [Character.Fox,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 67.8},
  'Rishi': { 
    label: 'Rishi',
    aliases: ['imrlygood'],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    characters: [Character.Marth, Character.DK],
    flag: 'us',
    score: 67.3},
  // 'Bimbo': { 
  //   label: 'Bimbo',
  //   characters: [Character.Falco,],
  // controllerType: {
  //   type: {
  //     rectangle: false,
  //   }
  // },
  //   flag: 'mx',
  //   score: 66.2},
//   'Setchi': { 
//     label: 'Setchi',
//     characters: [Character.Falcon,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'gb',
//     score: 66.2},
  'Preeminent': {
    label: 'Preeminent',
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    characters: [Character.DK, Character.Fox]
  },
  'Magi': { 
    label: 'Magi',
    aliases: ['MAGI#732', 'burrito dog', 'built depressed', 'dumbfuckdipshit', 'hottub streamer', 'come get it bby', 'ahhhhhhhhhhhhhh', 'the ironcat', 'go ez on me :(', 'big strong cat', 'magi', 'bitch', 'vroom vroom cat'],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    characters: [Character.Falco,],
    flag: 'us',
    score: 74.8},
  'Morsecode762': { 
    label: 'Morsecode762',
    characters: [Character.Samus],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
    score: 63.1},
  'Junebug': { 
    label: 'Junebug',
    characters: [Character.DK, Character.DrMario, Character.Bowser],
    controllerType: {
      type: {
        rectangle: false,
        oEMModded: true
      }
    },
    flag: 'us',
  },
  'ckyulmiqnudaetr': { 
    label: 'ckyulmiqnudaetr',
    characters: [Character.DK],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
  },
  'Moe': { 
    label: 'Moe',
    characters: [Character.DK],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
  },
  'Aklo': { 
    label: 'Aklo',
    characters: [Character.Fox, Character.Link],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
  },
//   'Jakenshaken': { 
//     label: 'Jakenshaken',
//     characters: [Character.Marth,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 63},
  'HugS': { 
    label: 'HugS',
    characters: [Character.Samus],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 62.1},
  'Zamu': { 
    label: 'Zamu',
    characters: [Character.Fox,],
    controllerType: {
      type: {
        rectangle: false,
        goomwave: true
      }
    },
    flag: 'us',
    score: 60.1},
  'Drephen': { 
    label: 'Drephen',
    characters: [Character.Sheik,],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
    score: 59.9},
  'Michael': { 
    label: 'Michael',
    characters: [Character.Jigglypuff,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 59},
  'Ice': { 
    label: 'Ice',
    characters: [Character.Fox,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'de',
    score: 58.8},
//   'billybopeep': { 
//     label: 'billybopeep',
//     characters: [Character.Fox,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 58.7},
  // 'Colbol': { 
  //   label: 'Colbol',
  //   characters: [Character.Fox, Character.Marth,],
  // controllerType: {
  //   type: {
  //     rectangle: false,
  //   }
  // },
//     flag: 'es',
//     score: 57.1},
//   'Slox': { 
//     label: 'Slox',
//     characters: [Character.Fox,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 56.3},
  'Kalamazhu': { 
    label: 'Kalamazhu',
    characters: [Character.Peach,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 56.2},
//   'Nickemwit': { 
//     label: 'Nickemwit',
//     characters: [Character.Falcon,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 55.6},
//   'Jerry': { 
//     label: 'Jerry',
//     characters: [Character.Fox, Character.Jigglypuff,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 54.2},
//   'Aura': { 
//     label: 'Aura',
//     characters: [Character.Peach,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 52.8},
//   'Nut': { 
//     label: 'Nut',
//     characters: [Character.Sheik,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 52.8},
//   'Kalvar': { 
//     label: 'Kalvar',
//     characters: [Character.Marth,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 52.6},
  'Polish': { 
    label: 'Polish',
    characters: [Character.Peach,],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
    score: 52},
  'Kevin Maples': { 
    label: 'Kevin Maples',
    characters: [Character.Fox,],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
    score: 48},
//   'Bladewise': { 
//     label: 'Bladewise',
//     characters: [Character.Peach,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 47.6},
//   'Tai': { 
//     label: 'Tai',
//     characters: [Character.Marth,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 47.4},
//   'Squid': { 
//     label: 'Squid',
//     characters: [Character.Falco,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 16.5},
  'Forrest': { 
    label: 'Forrest',
    characters: [Character.Marth, Character.GAW],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 45.5},
  'KoDoRiN': { 
    label: 'KoDoRiN',
    aliases: ['||||||||||||', "KOD#0"],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    characters: [Character.Marth,],
    flag: 'us',
    score: 44.6},
  'Ryan Ford': { 
    label: 'Ryan Ford',
    characters: [Character.Fox, Character.Sheik,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'ca',
    score: 43.2},
  'Free Palestine': { 
    label: 'Free Palestine',
    characters: [Character.Sheik, Character.Marth,],
    controllerType: {
      type: {
        rectangle: true,
      }
    },
    flag: 'palestine',
    score: 41.7},
  'Ryobeat': { 
    label: 'Ryobeat',
    characters: [Character.Peach,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 41.3},
//   'Ka Master': { 
//     label: 'Ka Master',
//     characters: [Character.Luigi, Character.Falcon,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 39.4},
//   'Kürv': { 
//     label: 'Kürv',
//     characters: [Character.Luigi, Character.Fox,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 38.8},
  'Frenzy': { 
    label: 'Frenzy',
    characters: [Character.Falco,],
    controllerType: {
      type: {
        rectangle: false,
        goomwave: true
      }
    },
    flag: 'gb',
    score: 38.5},
//   'MoG': { 
//     label: 'MoG',
//     characters: [Character.Peach,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 38.2},
  'Boyd': { 
    label: 'Boyd',
    characters: [Character.IC],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 38.2},
  'Cool Lime': { 
    label: 'Cool Lime',
    characters: [Character.IC],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 37.4},
  'bobby big ballz': { 
    label: 'bobby big ballz',
    aliases: ["Chickenman400", "BOB#283"],
    characters: [Character.Falco,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 37.3},
  'Nintendude': { 
    label: 'Nintendude',
    characters: [Character.Marth, Character.IC],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 36.8},
  'Nicki': { 
    label: 'Nicki',
    characters: [Character.Fox,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'de',
    score: 36.2},
  // 'lint': { 
  //   label: 'lint',
  //   characters: [Character.Falco,],
  // controllerType: {
  //   type: {
  //     rectangle: false,
  //   }
  // },
  //   flag: 'us',
  //   score: 34.7},
//   'King Mom': { 
//     label: 'King Mom',
//     characters: [Character.Falco,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 33.5},
  'TheRealThing': { 
    label: 'TheRealThing',
    characters: [Character.Falco,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 32.9},
  'Asashi': { 
    label: 'Asashi',
    characters: [Character.Falco,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'us',
    score: 32.9},
//   'Zeo': { 
//     label: 'Zeo',
//     characters: [Character.Falcon,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 32},
//   'Pricent': { 
//     label: 'Pricent',
//     characters: [Character.Fox,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'no',
//     score: 31.6},
//   'Prince Ab': { 
//     label: 'Prince Ab',
//     characters: [Character.Jigglypuff,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 31.4},
//   'Amsah': { 
//     label: 'Amsah',
//     characters: [Character.Sheik,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'nl',
//     score: 30.9},
//   'Rocky': { 
//     label: 'Rocky',
//     characters: [Character.Falco,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 30.1},
//   'Sharkz': { 
//     label: 'Sharkz',
//     characters: [Character.IC],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 29.8},
  'Kage': { 
    label: 'Kage',
    characters: [Character.Ganondorf,],
    controllerType: {
      type: {
        rectangle: false,
      }
    },
    flag: 'ca',
    score: 25.4},
//   'Schythed': { 
//     label: 'Schythed',
//     characters: [Character.Falcon,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 25.4},
//   'Panda': { 
//     label: 'Panda',
//     characters: [Character.Fox,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 24.9},
  'Soonsay': { 
    label: 'Soonsay',
    characters: [Character.Fox,],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'ca',
    score: 24.8},
  'TheSWOOPER': { 
    label: 'TheSWOOPER',
    characters: [Character.Samus],
    controllerType: {
      type: {
        rectangle: false,
        phob: true,
      }
    },
    flag: 'us',
    score: 24.7},
//   'Snowy': { 
//     label: 'Snowy',
//     characters: [Character.Jigglypuff,],
// controllerType: {
//   type: {
//     rectangle: false,
//   }
// },
//     flag: 'us',
//     score: 24.3},
  'N3zModGod': { 
    label: 'N3zModGod',
    characters: [Character.Yoshi,],
    controllerType: {
      type: {
        rectangle: false,
        oEMModded: true
      }
    },
    flag: 'us',
  }, 
    'Armada': {
      label: 'Armada',
      // color: 'warning',
      controllerType: {
        type: {
          rectangle: false,
        }
      },
      characters: [Character.Peach],
      conditionalCharacters: {
        "Fox": [Character.Jigglypuff, Character.Fox],
        "Young Link": [Character.Jigglypuff],
      },
    },
    'PPMD': {
      label: 'PPMD',
      // color: 'warning',
      controllerType: {
        type: {
          rectangle: false,
        }
      },
      characters: [Character.Falco, Character.Marth]
    },
    'Moky': {
      label: 'Moky',
      characters: [Character.Fox],
      controllerType: {
        type: {
          rectangle: false,
          oEMModded: true,
        }
      },
    },
    'Jflex': {
      label: 'Jflex',
      characters: [Character.Sheik],
      controllerType: {
        type: {
          rectangle: false,
          phob: true
        }
      },
    },
    'Hax$': {
      label: 'Hax$',
      aliases: ['hax'],
      characters: [Character.Fox, Character.Falcon],
      controllerType: {
        type: {
          rectangle: true,
        }
      },
    },
    'Logan': {
      label: 'Logan',
      characters: [Character.Marth],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Wobbles': {
      label: 'Wobbles',
      characters: [Character.IC],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Anther': {
      label: 'Anther',
      characters: [Character.Pikachu],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Pipsqueak': {
      label :'Pipsqueak',
      characters: [Character.Fox],
      controllerType: {
        type: {
          rectangle: true
        }
      }
    },
    'Tyler Swift': {
      label: 'Tyler Swift',
      characters: [Character.Pikachu],
      controllerType: {
        type: {
          rectangle: true,
        }
      },
    },
    'Scar': {
      label: "Scar",
      aliases: ['bobbyscar'],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
      characters: [Character.Falcon]
    },
    'DarkGenex': {
      label: "DarkGenex",
      aliases: ['darkgenex'],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
      characters: [Character.Fox]
    },
    'Reeve': {
      label: "Reeve",
      aliases: ['reeve', 'ttv/reeve', 'clout strife', "mang0's patreon", 'mang0spalreeve', 'reeve#0'],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
      characters: [Character.Marth]
    },
    'Toph': {
      label: "Toph",
      aliases: ['toph'],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
      characters: [Character.Fox]
    },
    'ludwig': {
      label: "ludwig",
      aliases: ['ludwig'],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
      characters: [Character.Jigglypuff]
    },
    'Jmook': { 
      label: 'Jmook',
      characters: [Character.Sheik],
      controllerType: {
        type: {
          rectangle: false,
          oEMModded: true,
        }
      },
      flag: 'us',
    },
    'Jah Ridin': { 
      label: 'Jah Ridin',
      characters: [Character.Luigi],
      controllerType: {
        type: {
          rectangle: false,
          phob: true,
        }
      },
      flag: 'us',
    },
    'Abate': { 
      label: 'Abate',
      characters: [Character.Luigi],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
      flag: 'us',
    },
    'null': {
      label: "null",
      aliases: ['null', 'null4summit :)'],
      controllerType: {
        type: {
          rectangle: false,
          goomwave: true
        }
      },
      characters: [Character.Fox]
    },
    'Faust': {
      label: "Faust",
      aliases: ["PTBO#289"],
      controllerType: {
        type: {
          rectangle: false,
          oEMModded: true
        }
      },
      characters: [Character.Jigglypuff]
    },
    'A Rookie': {
      label: "A Rookie",
      characters: [Character.Mario],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Nen': {
      label: "Nen",
      characters: [Character.Jigglypuff],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Savestate': {
      label: "Savestate",
      characters: [Character.Link],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'El Link': {
      label: "El Link",
      characters: [Character.Link],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'CowCowCowCowCow': {
      label: "CowCowCowCowCow",
      aliases: ['COW#5'],
      characters: [Character.Ganondorf],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Ap0stl3': {
      label: "Ap0stl3",
      characters: [Character.Ness],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Joe(y) Bats': {
      label: "Joe(y) Bats",
      aliases: ["Joey bats"],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
      characters: [Character.Ness]
    },
    'Ayo Yanos': {
      label: "Ayo Yanos",
      characters: [Character.Ness],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Sirmeris': {
      label: 'Sirmeris',
      characters: [Character.Peach],
      controllerType: {
        type: {
          rectangle: false,
          phob: true,
        }
      }
    },
    'Ulsi': {
      label: "Ulsi",
      characters: [Character.Ness],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Jimbob': {
      label: "Jimbob",
      characters: [Character.Mario],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'wcbq': {
      label: "wcbq",
      characters: [Character.Roy],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'LSDX': {
      label: "LSDX",
      characters: [Character.Roy],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Rocket': {
      label: "Rocket",
      characters: [Character.YLink],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Stats': {
      label: "Stats",
      characters: [Character.YLink],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
    'Khryke': {
      label: 'Khryke',
      characters: [Character.Mewtwo],
      controllerType: {
        type: {
          rectangle: false,
          phob: true,
        }
      }
    },
    'OG Kid': {
      label: 'OG Kid',
      characters: [Character.Jigglypuff],
      controllerType: {
        type: {
          rectangle: false
        }
      }
    },
    'Mekk': {
      label: "Mekk",
      characters: [Character.Falcon, Character.Ganondorf],
      controllerType: {
        type: {
          rectangle: false,
          phob: true,
        }
      },
    },
    'Qerb': {
      label: 'Qerb',
      characters: [Character.GAW],
      controllerType: {
        type: {
          rectangle: false
        }
      }
    },
    'Bizzaro Flame': {
      label: "Bizzaro Flame",
      characters: [Character.Ganondorf],
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    },
  
    
    'TEST': {
      label: 'TEST',
      characters: AllCharacters,
      controllerType: {
        type: {
          rectangle: false,
        }
      },
    }
}