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
import { FramesType, SlippiGame } from '@slippi/slippi-js';
import logger from 'node-color-log';
// import { SlippiGame } from './slippi';

const IS_TOURNAMENT = false;
const SUB_DIR = "gccvsbox"
const player = "lloD"
// const HIGHLIGHTS_FILE = `\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\Player\\highlights.json`
const HIGHLIGHTS_FILE = `\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\Player\\gccvsboxx.json`


const BASE_DIR = "\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\2.0";
const CLIP_DIR = path.join(BASE_DIR, SUB_DIR);
const CLIP_FILE = path.join(CLIP_DIR, "clips.json");
const CUT_DIR = path.join(CLIP_DIR, "cut");

export type PlayerName = {
    code: string;
    name: string;
}

//highlights.json object
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

//clips.json object
export interface FileData {
  path: string;
  ogPath?: string;
  tournament?: string;
  endFrame: number;
  startFrame: number;
  characterId: number | null;
  characterColor: number | null;
  playerName: PlayerName | null;
  oppCharacterId: number | null;
  oppCharacterColor: number | null;
  oppPlayerName: PlayerName | null;
  portToGuess: number | null;
}

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

const isNotAFK = (frames: FramesType, startFrame: number, endFrame: number, playerIndex: number) => {
    for (let i = startFrame; i < endFrame; i++) {
        if (frames[i].players[playerIndex]?.pre.buttons !== 0 || frames[i].players[playerIndex]?.pre.trigger !== 0)
            return true;
    }
    return false;
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
        let success = 0;
        let errored = 0;
        for (let i = 0; i < highlights.length; i++) {
            console.log(`${success} / ${errored} === ${success+errored} (${success/(success+errored+1)})`)
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
            // this function sucks ass
            // const data = await getCharacterAndPlayerData(highlight.path, highlight);
            const data: FileData = {
                path: highlight.path,
                startFrame: highlight.startFrame,
                endFrame: highlight.endFrame,
                characterId: null,
                characterColor: null,
                playerName: null,
                oppCharacterId: null,
                oppCharacterColor: null,
                oppPlayerName: null,
                portToGuess: null,
                
            };

            let verifySlp, stats;
            try {
                verifySlp = new SlippiGame(highlight.path);
                stats = verifySlp.getStats();
            } catch(e) {
                console.warn(e);
                errored++;
                continue;
            }
            
            //get combo port
            //find combo
            const VALIDATION_BUFFER = 5; //frames of leniency between start and endframe
            const CLIPPI_END_OFFSET = 57;
            let validatedPort = false;
            let validatedInput = true;
            let validatedCombo = false;
            if (stats?.combos) {
                console.log(data.startFrame, data.endFrame)
                for (let i = 0; i < stats.combos.length; i++) {
                    const combo = stats.combos[i];
                    combo.startFrame += 123;
                    if (combo.endFrame)
                        combo.endFrame += 123;
                    // console.log(combo.playerIndex, combo.startFrame, combo.endFrame, (combo.endFrame ?? combo.startFrame)-combo.startFrame, combo.didKill)
                    if (
                        // combo.didKill && 
                        //start frame is within range
                        // combo.startFrame > data.startFrame-VALIDATION_BUFFER && combo.startFrame < data.startFrame+VALIDATION_BUFFER &&
                        //end frame is within range
                        (!combo.endFrame || combo.endFrame > data.endFrame-CLIPPI_END_OFFSET-VALIDATION_BUFFER) && (!combo.endFrame || combo.endFrame < data.endFrame-CLIPPI_END_OFFSET+VALIDATION_BUFFER)
                    ) {
                        validatedCombo = true;
                        const players = verifySlp.getSettings()?.players;
                        if (!players) throw Error(`cant get players for ${highlight.path}`);
                        //get opponent port number
                        let playerPort: number | undefined;
                        let oppPlayerPort: number | undefined;
                        console.log(combo.playerIndex)
                        if (players[0] && players[0].playerIndex !== combo.playerIndex) playerPort = 0;
                        if (players[0] && players[0].playerIndex === combo.playerIndex) oppPlayerPort = 0;
                        if (players[1] && players[1].playerIndex !== combo.playerIndex) playerPort = 1
                        if (players[1] && players[1].playerIndex === combo.playerIndex) oppPlayerPort = 1
                        if (players[2] && players[2].playerIndex !== combo.playerIndex) playerPort = 2
                        if (players[2] && players[2].playerIndex === combo.playerIndex) oppPlayerPort = 2
                        if (players[3] && players[3].playerIndex !== combo.playerIndex) playerPort = 3
                        if (players[3] && players[3].playerIndex === combo.playerIndex) oppPlayerPort = 3
                        if (playerPort === undefined || oppPlayerPort === undefined) {
                            throw Error(`cant get player indexes for ${highlight.path}`);
                            // break;
                        }
                        console.log(`player: ${combo.playerIndex} ::: opp: ${oppPlayerPort}`)

                        console.log('WOW WE FOUND A MATCH WHAT ARE TEH CHANcES')
                        //ensure the opponent is actually attempting to move...
                        validatedInput = isNotAFK(verifySlp.getFrames(), highlight.startFrame, highlight.endFrame, oppPlayerPort);
                        logger.color('cyan').log(`HAS INPUT??: ${validatedInput}`);
                        if (!validatedInput) break;

                        // assert(combo.playerIndex === data.portToGuess)
                        if (combo.playerIndex !== data.portToGuess) {
                            logger.color('yellow').log(`combo port ${combo.playerIndex} doesnt match ours ${data.portToGuess}`)
                        } else {
                            logger.color('green').log(`combo port MATCHED yay`);
                        }
                        data.playerName = {
                            name: players[playerPort].displayName,
                            code: players[playerPort].connectCode
                        };
                        data.characterId = players[playerPort].characterId;
                        data.characterColor = players[playerPort].characterColor;
                        data.portToGuess = players[playerPort].playerIndex;
                        data.oppPlayerName = {
                            name: players[oppPlayerPort].displayName,
                            code: players[oppPlayerPort].connectCode
                        }
                        data.oppCharacterId = players[oppPlayerPort].characterId;
                        data.oppCharacterColor = players[oppPlayerPort].characterColor;
                        validatedPort = true;
                    }
                }
            }
            if (!validatedCombo) {
                errored++;
                continue;
                // throw Error("Unable to validate combo");
            }
            if (!validatedInput || !data.playerName || data.playerName.name === "") {
                errored++;
                continue;
            }
            if (!validatedPort) {
                throw Error("Unable to validate port to guess");
            }

            //make new name
            const newName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }) + ".slp";
            //use original name
            // const newName = path.basename(highlight.path);
            const outFile = path.join(CUT_DIR, newName);
            
            // console.log(`schlicin clip ${highlight.path}`)
            dataSaved += await schliceSlp(highlight.path, outFile, highlight.endFrame);
            
            data.path = outFile;
            data.ogPath = highlight.path;
            data.tournament = tournamentName?.[0] ?? "";
            // console.log(data);
            
            //verify cut slps
            try {
                // verifySlp = new SlippiGame(outFile);
                // const _ = verifySlp.getFrames()
                // stats = verifySlp.getStats();
                logger.color('green').log(`${highlight.path} -> ${path.basename(outFile)} is valid .slp :)`)
                success++;
            } catch {
                logger.color('red').log(`${highlight.path} -> ${path.basename(outFile)} is INVALID: (${highlight.startFrame}, ${highlight.endFrame})`)
                errored++;
                // await fs.promises.unlink(outFile);
            }
            fileData.push(data);
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