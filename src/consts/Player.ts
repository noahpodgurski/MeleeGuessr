import { AllCharacters, Character } from "../models/Character";
import { Choice } from "../models/Choice";

export interface PlayerType {
  [key: string]: Choice;
}

export const Player: PlayerType = { 
  'Armada': {
    label: 'Armada',
    color: 'warning',
    characters: [Character.Fox, Character.Peach]
  },
  'HungryBox': {
    label: 'HungryBox',
    color: 'success',
    aliases: ['HBox'],
    characters: [Character.Jigglypuff]
  },
  'Mang0': {
    label: 'Mang0',
    color: 'primary',
    characters: [Character.Jigglypuff, Character.Fox, Character.Falco]
  },
  'PPMD': {
    label: 'PPMD',
    color: 'warning',
    characters: [Character.Falco, Character.Marth]
  },
  'Mew2King': {
    label: 'Mew2King',
    // color: 'dark',
    aliases: ["M2K"],
    characters: [Character.Fox, Character.Marth, Character.Sheik]
  },
  'Zain': {
    label: 'Zain',
    color: 'danger',
    characters: [Character.Fox, Character.Marth]
  },
  'Leffen': {
    label: 'Leffen',
    // color: 'light',
    characters: [Character.Fox, Character.Sheik]
  },
  'Plup': {
    label: 'Plup',
    color: 'primary',
    characters: [Character.Fox, Character.Sheik, Character.Samus]
  },
  'iBDW': {
    label: 'iBDW',
    // color: 'light',
    characters: [Character.Fox]
  },
  'Fiction': {
    label: 'Fiction',
    color: 'danger',
    characters: [Character.Fox, Character.Falco]
  },
  'SFAT': {
    label: 'SFAT',
    color: 'success',
    characters: [Character.Fox]
  },
  'moky': {
    label: 'moky',
    characters: [Character.Fox]
  },
  'Trif': {
    label: 'Trif',
    color: 'warning',
    characters: [Character.Peach]
  },
  'Captain Faceroll': {
    label: 'Captain Faceroll',
    characters: [Character.Sheik]
  },
  'Swedish Delight': {
    label: 'Swedish Delight',
    characters: [Character.Sheik]
  },
  'Hax$': {
    label: 'Hax$',
    characters: [Character.Fox]
  },
  'Lucky': {
    label: 'Lucky',
    characters: [Character.Fox]
  },
  'Ginger': {
    label: 'Ginger',
    color: 'primary',
    characters: [Character.Falco]
  },
  'Spark': {
    label: 'Spark',
    characters: [Character.Sheik]
  },
  'PewPewU': {
    label: 'PewPewU',
    color: 'primary',
    characters: [Character.Fox, Character.Marth]
  },
  'KJH': {
    label: 'KJH',
    characters: [Character.Fox]
  },
  'Westballz': {
    label: 'Westballz',
    color: 'danger',
    characters: [Character.Falco]
  },
  'Professor Pro': {
    label: 'Professor Pro',
    characters: [Character.Fox]
  },
  'Llod': {
    label: 'Llod',
    characters: [Character.Peach]
  },
  'Polish': {
    label: 'Polish',
    characters: [Character.Peach]
  },
  'LSD': {
    label: 'LSD',
    characters: [Character.Marth]
  },
  'Wizzrobe': {
    label: 'Wizzrobe',
    characters: [Character.Falcon]
  },
  'n0ne': {
    label: 'n0ne',
    characters: [Character.Falcon]
  },
  'Gahtzu': {
    label: 'Gahtzu',
    characters: [Character.Falcon]
  },
  'S2J': {
    label: 'S2J',
    characters: [Character.Falcon]
  },




  
  'TEST': {
    label: 'TEST',
    characters: AllCharacters
  }
}