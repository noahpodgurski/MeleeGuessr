/*
the file to rule all other files (here)

structure is set up like this:
    1. directory slp/ with .slp files -> use clippi to make "highlights.json" (done already) todo
    2. use cut-slp.ts (convert to js?) to CUT every .slp file in highlights.json to end at (endFrame)
        -> output to to cut/ as "cut-Game_2020.....slp"
    3. take highlights.json (and cut/ files directory)
        -> add character and player data and store in "clips.json" (done already) todo
        -> (todo - rename file to random word combo)
        -> change path to reflect new cut/ file


    <highlights.json>
    {"queue": [
    {
      "path": "E:\\MeleeGuessrSlp\\Tournament\\Genesis-7\\6-Game_20200126T005432.slp",
      "gameStartAt": "01/26/20 12:54 am",
      "gameStation": "Station 6",
      "startFrame": 3557,
      "endFrame": 4735,
      "character": 2
    },
*/
import { schliceSlp } from './cut-slp';
import fs from 'fs';
import path from "path";
import cliProgress from 'cli-progress';
import byteSize from 'byte-size';

const BASE_DIR = "\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\2.0";
const HIGHLIGHTS_FILE = "\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\Player\\Spark\\highlights.json"

const SUB_DIR = "spark"
const CLIP_DIR = path.join(BASE_DIR, SUB_DIR);
const CLIP_FILE = path.join(CLIP_DIR, "clips.json");
const CUT_DIR = path.join(CLIP_DIR, "cut");

console.log(HIGHLIGHTS_FILE)
console.log(CLIP_DIR)
console.log(CLIP_FILE)
console.log(CUT_DIR)

if (!fs.existsSync(CLIP_DIR)) {
    fs.mkdirSync(CLIP_DIR, { recursive: true });
    console.log('Directory created successfully.');
  } else {
    console.log('Directory already exists.');
  }

if (!fs.existsSync(CUT_DIR)) {
    fs.mkdirSync(CUT_DIR, { recursive: true });
    console.log('Directory created successfully.');
} else {
    console.log('Directory already exists.');
}

  // 1. add character to json (done already)

// 2. use cut-slp to cut each file in queue[i].path
fs.readFile(HIGHLIGHTS_FILE, 'utf-8', async (err, fd) => {
    if (err) {
        console.error('Error opening file:', err);
        return;
    }
    
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    let dataSaved = 0;
    const gameMatchRegex = new RegExp(/(Game_.*\.slp)/g);
    const highlights = JSON.parse(fd) as any;
    bar1.start(highlights.queue.length, 0);
    
    for (let i = 0; i < highlights.queue.length; i++) {
        bar1.update(i);
        const highlight = highlights.queue[i];
        const gameName = highlight.path.match(gameMatchRegex);
        if (!gameName || !gameName[0]) {
            console.log('unable to find a match');
            throw Error(`unable to parse filename ${highlight.path}`);
        }
        const outFile = path.join(CUT_DIR, gameName[0]);
        // console.log(highlight.path, path.join(CUT_DIR, gameName[0]));
        console.log(`schlicin clip ${highlight.path}`)
        dataSaved += await schliceSlp(highlight.path, outFile, highlight.endFrame);
        highlight.path = outFile;
    }

    fs.writeFile(CLIP_FILE, JSON.stringify(highlights, null, 2), (err) => {});
    
    // stop the progress bar
    bar1.stop();
    const b = byteSize(dataSaved);
    console.log(`Data saved: ${b.value}${b.unit}`)
});