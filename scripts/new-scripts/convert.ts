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
import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator';
import { FileData, getCharacterAndPlayerData } from './addCharacterToJson';
import { SlippiGame } from '@slippi/slippi-js';

const IS_TOURNAMENT = true;
const SUB_DIR = "tournament"
const player = "lloD"
// const HIGHLIGHTS_FILE = `\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\Player\\highlights.json`
const HIGHLIGHTS_FILE = `\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\Tournament\\Parsed\\highlights.json`


const BASE_DIR = "\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\2.0";
const CLIP_DIR = path.join(BASE_DIR, SUB_DIR);
const CLIP_FILE = path.join(CLIP_DIR, "clips.json");
const CUT_DIR = path.join(CLIP_DIR, "cut");


console.log(HIGHLIGHTS_FILE)
console.log(CLIP_DIR)
console.log(CLIP_FILE)
console.log(CUT_DIR)

export type Highlight = {
    clipName?: string;
    path: string;

    gameStartAt: string;
    gameStation?: string;
    tournament?: string;
    startFrame: number;
    endFrame: number;
    character: number;
    oppChar: number;
    player: string;
    oppPlayer: string;
    portToGuess: number;
}

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
function cutSlp () {
    let erroredFiles = 0;
    const fileData: FileData[] = [];
    fs.readFile(HIGHLIGHTS_FILE, 'utf-8', async (err, fd) => {
        if (err) {
            console.error('Error opening file:', err);
            erroredFiles++;
            return;
        }
        
        const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        let dataSaved = 0;
        // const gameMatchRegex = new RegExp(/(Game_.*\.slp)/g);
        const data = JSON.parse(fd);
        bar1.start(data.queue.length, 0);
        
        const highlights = data.queue as Highlight[];
        // const highlights = [{
        //     "path": "\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\Tournament\\Parsed\\LACS 5\\Game_20230709T110325.slp",
        //     "gameStartAt": "07/09/23 2:03 pm",
        //     "gameStation": "BTS 322",
        //     "startFrame": 2477,
        //     "endFrame": 3558
        //   } as Highlight]
        for (let i = 0; i < highlights.length; i++) {
            bar1.update(i);
            let highlight = highlights[i];
            let tournamentName;
            if (IS_TOURNAMENT) {
                //add tournament data
                const tournamentMatchRegex = new RegExp(/Tournament\\(.*)\\/)
                tournamentName = highlight.path.match(tournamentMatchRegex);
                if (!tournamentName || !tournamentName[0]) {
                    console.warn(`unable to find a tournament match for ${highlight.path}`)
                    continue;
                }
            }
            //get character and player info
            const data = await getCharacterAndPlayerData(highlight.path, highlight);
            if (!data) {
                console.log(`ERROR: SKIPPING ${path.basename(highlight.path)}`)
                continue;
            };
            //make new name
            const newName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }) + ".slp";
            //use original name
            // const newName = path.basename(highlight.path);
            const outFile = path.join(CUT_DIR, newName);
            // console.log(highlight.path, path.join(CUT_DIR, gameName[0]));
            console.log(`schlicin clip ${highlight.path}`)
            dataSaved += await schliceSlp(highlight.path, outFile, highlight.endFrame);
            
            data.path = outFile;
            data.ogPath = highlight.path;
            data.tournament = tournamentName?.[0] ?? "";
            // console.log(data);
            
            //verify cut slps
            try {
                if (!data) throw Error("unable to get character and player data");
                // const verifySlp = new SlippiGame(outFile);
                // const _ = verifySlp.getFrames()
                console.log(`${path.basename(outFile)} is valid .slp :)`)
                fileData.push(data);
            } catch(err) {
                erroredFiles++;
                console.warn(err);
                // await fs.promises.unlink(outFile);
                // delete highlights[i];
            }

        }


        fs.writeFile(CLIP_FILE, JSON.stringify(fileData, null, 2), (err) => {});
        
        // stop the progress bar
        bar1.stop();
        const b = byteSize(dataSaved);
        console.log(`Data saved: ${b.value}${b.unit}`)
        console.log(`Errored files: ${erroredFiles}`)
    });   
}

cutSlp();

//todo make script to regenerate all names in s3 and update clips.json accordingly