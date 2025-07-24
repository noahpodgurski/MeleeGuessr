import fs from "fs";
import { parseReplay } from "./parser/parser";
import cliProgress from "cli-progress";
import { decode } from "@shelacek/ubjson";
import { SlippiGame } from "@slippi/slippi-js";

const isValidSlippi = async (inFile = "../slp-test/test.slp") => {
  try {
    const fd = await fs.promises.open(inFile, "r");
    // Get the file stats to know the size
    const stats = await fd.stat();
    console.log(`size is ${stats.size}`);
    const size = Buffer.alloc(stats.size);
    const { buffer } = await fd.read(size, 0, stats.size, null);
    // Convert the Buffer into an ArrayBuffer
    const arrayBuffer = buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );

    const data = decode(arrayBuffer, { useTypedArrays: true });
    //parse with our own func
    await fd.close();
    return parseReplay(data);
  } catch (err) {
    console.error(err);
    return [false, null];
  }
};

// console.log(isValidSlippi('./source.slp'));
// fs.readFile('C:\\Users\\noahp\\Documents\\Programming\\Websites\\MeleeGuessr-Server\\meleeguessr-server\\routes\\clips.json', 'utf-8', async (err, fd) => {
fs.readFile(
  "\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\2.0\\all\\clips.json",
  "utf-8",
  async (err, fd) => {
    const problematics = [];
    const data = JSON.parse(fd);
    // console.log(data);
    const bar1 = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    bar1.start(data.length, 0);
    for (let i = 0; i < data.length; i++) {
      const clip = data[i];
      const [numFrames, version] = await isValidSlippi(clip.path);
      bar1.update(i);
      // if (!version) { //isnotvalid
      //     console.error(`${clip.path} is not a valid slp ${version}`)
      //     problematics.push(clip.path);
      // }
      // const slpFrames = (game.getLatestFrame()?.frame ?? 0) + 123;
      const slpFrames = 0;
      console.log(`\n${clip.startFrame} -> ${numFrames} | [${slpFrames}]`);
      if (numFrames && clip.startFrame > numFrames) {
        console.error(
          `${clip.path} has less frames than the start frame ${version}`
        );
        problematics.push({ path: clip.path, version });
      }

      //make sure portToGuess is actually the one doing the combo
      const game = new SlippiGame(clip.path);
      console.log(game.getFrames());
    }
    console.log(problematics.length);
    await fs.promises.writeFile(
      "problematics.json",
      JSON.stringify(problematics, null, 2)
    );
  }
);
