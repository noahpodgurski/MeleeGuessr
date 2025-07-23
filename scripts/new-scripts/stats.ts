import { characterNameByExternalId } from "./common/ids";
import fs from "fs";
import { Player } from "../../src/consts/Player";

type Data = {
  [key: string]: number;
};

const getPlayer = (_name: string, _code: string): string => {
  const playerNames = Object.keys(Player);
  const clipPlayerNameLower = _name.toLowerCase();
  const clipPlayerCodeLower = _code.toLowerCase();
  for (const name of playerNames) {
    // old way (doesnt account for Zain === zain)
    // if (Player[name].aliases?.includes(clip.playerName.name)) {
    //     choices.push(Player[name].label);
    //     found = true;
    //     break;
    // }
    // Check if any alias (also converted to lowercase) matches the clip player name
    if (
      name.toLowerCase() === clipPlayerNameLower ||
      Player[name].label.toLowerCase() === clipPlayerNameLower ||
      Player[name].aliases?.some(
        (alias) => alias.toLowerCase() === clipPlayerNameLower
      ) ||
      Player[name].aliases?.some(
        (alias) => alias.toLowerCase() === clipPlayerCodeLower
      )
    ) {
      return Player[name].label;
    }
  }
  console.log(`no name found for ${_name} ${_code}`);
  return "";
};

//stats - find how many characters - and how many player clips we have
const main = async () => {
  // await test("test.slp");
  // const game = new SlippiGame("cut-names.slp")
  // console.log(game.getFrames()[-1] === null)
  const charMap: Data = {};
  const playerMap: Data = {};
  const fd = await fs.promises.readFile(
    "../../../MeleeGuessr-Server/meleeguessr-server/routes/clips.json",
    "utf-8"
  );
  const clips = JSON.parse(fd);
  console.log(clips[0]);
  const l = clips.length;
  for (let i = 0; i < clips.length; i++) {
    const clip = clips[i];
    const character = characterNameByExternalId[clip.characterId];
    const player = getPlayer(clip.playerName.name, clip.playerName.code);
    if (charMap[`${character} (${clip.characterId})`]) {
      charMap[`${character} (${clip.characterId})`]++;
    } else {
      charMap[`${character} (${clip.characterId})`] = 1;
    }
    if (playerMap[player]) {
      playerMap[player]++;
    } else {
      playerMap[player] = 1;
    }
  }
  Object.entries(charMap)
    .sort(([charA, a], [charB, b]) => b - a)
    .map(([char, n]) => {
      console.log(`${char}: ${n}, ${Math.round((n / l) * 100) / 100}`);
    });
  Object.entries(playerMap)
    .sort(([charA, a], [charB, b]) => b - a)
    .map(([char, n]) => {
      console.log(`${char}: ${n}, ${Math.round((n / l) * 100) / 100}`);
    });
  // console.log(charMap);
  // console.log(playerMap);
};
main();
