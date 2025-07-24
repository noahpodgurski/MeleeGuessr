/*
the file to rule all other files (here)

structure is set up like this:
    1. directory slp/ with .slp files -> use clippi to make "highlights.json" (done already) todo
        1a. combine all highlights into \\NOAH-PC\Clout\Backups\MeleeGuessrSlp\all.json
        1b. make sure tournament files have playerName: "zain"
    2. use convert.ts which processes each clip
        -> outputs to cut/ as "green_mango_Horse.slp"
    3. take all.json (and cut/ files directory)
        upload to s3
        copy to clips.json in server
        run npm run test in server (remember to set DELETE flag accordingly)
        npm run sam


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
import { schliceSlp } from "./cut-slp";
import fs from "fs";
import path from "path";
import cliProgress from "cli-progress";
import byteSize from "byte-size";
import {
  adjectives,
  names,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { FramesType, SlippiGame } from "@slippi/slippi-js";
import logger from "node-color-log";
// import { SlippiGame } from './slippi';

const IS_TOURNAMENT = false;
const SUB_DIR = "converted";
const player = "Nicki";
const HIGHLIGHTS_FILE = `\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\all.json`;
// const HIGHLIGHTS_FILE = `\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\Player\\all.json`

const BASE_DIR = "\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\3.0";
const CLIP_DIR = path.join(BASE_DIR, SUB_DIR);
const CLIP_FILE = path.join(CLIP_DIR, "all.json");
const CUT_DIR = path.join(CLIP_DIR, "cut");

export type PlayerName = {
  code: string;
  name: string;
};

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
};

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

console.log(HIGHLIGHTS_FILE);
console.log(CLIP_DIR);
console.log(CLIP_FILE);
console.log(CUT_DIR);

if (!fs.existsSync(CLIP_DIR)) {
  fs.mkdirSync(CLIP_DIR, { recursive: true });
  console.log("Directory created successfully.");
} else {
  console.log("Directory already exists.");
}

if (!fs.existsSync(CUT_DIR)) {
  fs.mkdirSync(CUT_DIR, { recursive: true });
  console.log("Directory created successfully.");
} else {
  console.log("Directory already exists.");
}

const isNotAFK = (
  frames: FramesType,
  startFrame: number,
  endFrame: number,
  playerIndex: number
) => {
  for (let i = startFrame; i < endFrame; i++) {
    if (
      frames[i]?.players[playerIndex]?.pre.buttons !== 0 ||
      frames[i]?.players[playerIndex]?.pre.trigger !== 0
    )
      return true;
  }
  return false;
};

const isHandOffCombo = (
  frames: FramesType,
  startFrame: number,
  endFrame: number,
  playerIndex: number
) => {
  // is character popo or nana
  if (
    frames[startFrame].players[playerIndex]?.post.internalCharacterId === 10 ||
    frames[startFrame].players[playerIndex]?.post.internalCharacterId === 11
  ) {
    let grabCount = 0;
    for (let i = startFrame; i < endFrame; i++) {
      if (frames[i]?.players[playerIndex]?.post.actionStateId === 213) {
        grabCount++;
      }
    }
    if (grabCount > 4) {
      return true;
    }
  }
  return false;
};

// 1. add character to json (done already)

// 2. use cut-slp to cut each file in queue[i].path
function cutSlp() {
  let erroredFiles = 0;
  const fileData: FileData[] = [];
  fs.readFile(HIGHLIGHTS_FILE, "utf-8", async (err, fd) => {
    if (err) {
      console.error("Error opening file:", err);
      erroredFiles++;
      return;
    }

    const bar1 = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    let dataSaved = 0;
    // const gameMatchRegex = new RegExp(/(Game_.*\.slp)/g);
    const data = JSON.parse(fd);
    bar1.start(data.queue.length, 0);

    //filter out duplicates
    const _highlights = data.queue as Highlight[];
    const highlights: Highlight[] = [];

    if (_highlights.length === 1) {
      highlights.push(_highlights[0]);
    } else {
      for (let i = 0; i < _highlights.length - 1; i++) {
        let isDup = false;
        for (let j = i + 1; j < _highlights.length; j++) {
          if (
            _highlights[i].path === _highlights[j].path &&
            _highlights[i].startFrame === _highlights[j].startFrame &&
            _highlights[i].endFrame === _highlights[j].endFrame
          ) {
            //duplicate detected
            isDup = true;
            break;
          }
        }
        if (!isDup) {
          highlights.push(_highlights[i]);
        }
      }
    }
    console.log(`${_highlights.length - highlights.length} dups detected`);
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
      if (errored === 0) {
        console.log();
      }
      console.log(
        `${success} / ${errored} === ${success + errored} (${
          errored === 0 ? 1 : success / (success + errored)
        })`
      );
      bar1.update(i);
      let highlight = highlights[i];
      let tournamentName;
      if (IS_TOURNAMENT) {
        //add tournament data
        const tournamentMatchRegex = new RegExp(/Tournament\\(.*)\\/);
        tournamentName = highlight.path.match(tournamentMatchRegex);
        if (!tournamentName || !tournamentName[0]) {
          console.warn(
            `unable to find a tournament match for ${highlight.path}`
          );
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
        playerName: highlight.player
          ? { name: highlight.player, code: "" }
          : null,
        oppCharacterId: null,
        oppCharacterColor: null,
        oppPlayerName: null,
        portToGuess: null,
      };

      let verifySlp, stats;
      try {
        verifySlp = new SlippiGame(highlight.path);
        stats = verifySlp.getStats();
      } catch (e) {
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
        console.log(data.startFrame, data.endFrame);
        for (let i = 0; i < stats.combos.length; i++) {
          const combo = stats.combos[i];
          combo.startFrame += 123;
          if (combo.endFrame) combo.endFrame += 123;
          // console.log(combo.playerIndex, combo.startFrame, combo.endFrame, (combo.endFrame ?? combo.startFrame)-combo.startFrame, combo.didKill)
          if (
            // combo.didKill &&
            //start frame is within range
            // combo.startFrame > data.startFrame-VALIDATION_BUFFER && combo.startFrame < data.startFrame+VALIDATION_BUFFER &&
            //end frame is within range
            (!combo.endFrame ||
              combo.endFrame >
                data.endFrame - CLIPPI_END_OFFSET - VALIDATION_BUFFER) &&
            (!combo.endFrame ||
              combo.endFrame <
                data.endFrame - CLIPPI_END_OFFSET + VALIDATION_BUFFER)
          ) {
            validatedCombo = true;
            const players = verifySlp.getSettings()?.players;
            if (!players) throw Error(`cant get players for ${highlight.path}`);
            //get opponent port number
            let playerPort: number | undefined;
            let oppPlayerPort: number | undefined;
            console.log(combo.playerIndex);
            if (players[0] && players[0].playerIndex !== combo.playerIndex)
              playerPort = 0;
            if (players[0] && players[0].playerIndex === combo.playerIndex)
              oppPlayerPort = 0;
            if (players[1] && players[1].playerIndex !== combo.playerIndex)
              playerPort = 1;
            if (players[1] && players[1].playerIndex === combo.playerIndex)
              oppPlayerPort = 1;
            if (players[2] && players[2].playerIndex !== combo.playerIndex)
              playerPort = 2;
            if (players[2] && players[2].playerIndex === combo.playerIndex)
              oppPlayerPort = 2;
            if (players[3] && players[3].playerIndex !== combo.playerIndex)
              playerPort = 3;
            if (players[3] && players[3].playerIndex === combo.playerIndex)
              oppPlayerPort = 3;
            if (playerPort === undefined || oppPlayerPort === undefined) {
              throw Error(`cant get player indexes for ${highlight.path}`);
              // break;
            }
            console.log(
              `player: ${combo.playerIndex} ::: opp: ${oppPlayerPort}`
            );

            console.log("WOW WE FOUND A MATCH WHAT ARE TEH CHANcES");
            //ensure the opponent is actually attempting to move...
            const frames = verifySlp.getFrames();
            validatedInput = isNotAFK(
              frames,
              highlight.startFrame,
              highlight.endFrame,
              oppPlayerPort
            );
            if (!validatedInput) {
              console.log("afk clip.. skipping");
              break;
            }

            // let containsICS = false;

            if (
              isHandOffCombo(
                frames,
                highlight.startFrame,
                highlight.endFrame,
                playerPort
              )
            ) {
              logger.color("red").log(`HAND OFF COMBO DETECTED`);
              break;
            }

            // assert(combo.playerIndex === data.portToGuess)
            if (data.portToGuess) {
              if (combo.playerIndex !== data.portToGuess) {
                logger
                  .color("yellow")
                  .log(
                    `combo port ${combo.playerIndex} doesnt match ours ${data.portToGuess}`
                  );
              } else {
                logger.color("green").log(`combo port MATCHED yay`);
              }
            }
            data.playerName = {
              name: data.playerName?.name ?? players[playerPort].displayName,
              code: players[playerPort].connectCode,
            };
            data.characterId = players[playerPort].characterId;
            data.characterColor = players[playerPort].characterColor;
            data.portToGuess = players[playerPort].playerIndex;
            data.oppPlayerName = {
              name: players[oppPlayerPort].displayName,
              code: players[oppPlayerPort].connectCode,
            };
            data.oppCharacterId = players[oppPlayerPort].characterId;
            data.oppCharacterColor = players[oppPlayerPort].characterColor;
            validatedPort = true;
          }
        }
      }
      if (!validatedCombo) {
        console.log("no validated combo :(");
        errored++;
        continue;
        // throw Error("Unable to validate combo");
      }
      if (!validatedInput || !data.playerName || data.playerName?.name === "") {
        console.log(`other error :( ${validatedInput}`);
        console.log(data.playerName);
        errored++;
        continue;
      }
      if (!validatedPort) {
        throw Error("Unable to validate port to guess");
      }

      //make new name                                         1400       50       4900
      const newName =
        uniqueNamesGenerator({ dictionaries: [adjectives, colors, names] }) +
        ".slp";
      //use original name
      // const newName = path.basename(highlight.path);
      const outFile = path.join(CUT_DIR, newName);

      // console.log(`schlicin clip ${highlight.path}`)
      dataSaved += await schliceSlp(
        highlight.path,
        outFile,
        highlight.endFrame
      );

      data.path = outFile;
      data.ogPath = highlight.path;
      data.tournament = tournamentName?.[0] ?? "";

      //verify cut slps
      try {
        // verifySlp = new SlippiGame(outFile);
        // const _ = verifySlp.getFrames()
        // stats = verifySlp.getStats();
        logger
          .color("green")
          .log(
            `${highlight.path} -> ${path.basename(outFile)} is valid .slp :)`
          );
        success++;
      } catch {
        logger
          .color("red")
          .log(
            `${highlight.path} -> ${path.basename(outFile)} is INVALID: (${
              highlight.startFrame
            }, ${highlight.endFrame})`
          );
        errored++;
        // await fs.promises.unlink(outFile);
      }
      fileData.push(data);
    }

    fs.writeFile(CLIP_FILE, JSON.stringify(fileData, null, 2), (err) => {});

    // stop the progress bar
    bar1.stop();
    const b = byteSize(dataSaved);
    console.log(`Data saved: ${b.value}${b.unit}`);
    console.log(`Errored files: ${erroredFiles}`);
  });
}

cutSlp();

//todo make script to regenerate all names in s3 and update clips.json accordingly
