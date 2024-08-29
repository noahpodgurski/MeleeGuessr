import { decode, encode } from "@shelacek/ubjson";
import fs from 'fs';
import { Frame } from "./common/types";
import { readUint, parseEventPayloadsEvent, parseGameStartEvent, firstVersion, handleFrameStartEvent, handleItemUpdateEvent, handlePostFrameUpdateEvent, handlePreFrameUpdateEvent, clearData, isInVersion } from "./parser/parser";



async function writeCutSlp(arrayBuffer: Uint8Array, outName: string) {
  const outputFilePath = outName; // Path to your output file
  try {

    await fs.promises.writeFile(outputFilePath, arrayBuffer);
    console.log('File successfully written:', outputFilePath);
  } catch (err) {
      console.error('Error writing file:', err);
  }
  
}

async function clipReplay({ metadata, raw }: any, fileSize: number, outName: fs.PathLike, start: number, end: number): Promise<number> {
  const rawData = new DataView(
    raw.buffer,
    raw.byteOffset
    // baseJson.raw.byteLength
  );
  const slicedData = new Uint8Array(fileSize);
  
  const length = readUint(
    rawData,
    32,
    firstVersion,
    firstVersion,
    0x0b
  );

  // The first two events are always Event Payloads and Game Start.
  const commandPayloadSizes = parseEventPayloadsEvent(rawData, 0x00);

  const frames: Frame[] = [];

  const gameSettings = parseGameStartEvent(
    rawData,
    0x01 + commandPayloadSizes[0x35],
    metadata
  );


  // let gameEnding: GameEnding | undefined;
  const replayVersion = gameSettings.replayFormatVersion;
  let offset =
  0x00 + commandPayloadSizes[0x35] + 0x01 + commandPayloadSizes[0x36] + 0x01;
  // inputs/states may come multiple times for a given player on a given
  // frame due to rollbacks. Because we are overwriting, we will just save the
  // last one which will be the official "finalized" one.
  // console.log(`Starting offset is ${offset}`);
  let frameCount = 0;
  let savedFrames = 0;

  let slicedDataOffset = 0;
  slicedData.set(new Uint8Array(rawData.buffer, 0, offset), slicedDataOffset);
  slicedDataOffset += offset;

  // rawData.byteLength
  let push = true;
  let go = true;
  while (go && offset <= rawData.byteLength) {
    if (frameCount === 0 || (frameCount >= start && frameCount < end)) push = true;
    else push = false;

    if (savedFrames > end-start) push = false;
    if (offset === rawData.byteLength-1) push = true;
    
    const command = readUint(rawData, 8, replayVersion, firstVersion, offset);
    // console.log(command.toString(16));
    // '16': 516, message splitter event
    // 0x35 '53': 28,  event payloads
    // 0x36 '54': 420, game start
    // 0x37 '55': 63,  pre-frame
    // 0x38 '56': 72,  post-frame
    // 0x39 '57': 2,   game end
    // 0x3a '58': 8,   frame start
    // 0x3b '59': 42,  item update
    // 0x3c '60': 8,   frame bookend
    // 0x3d '61': 31256 gecko list

    const l = commandPayloadSizes[command];
    switch (command) {
      default:
        go = false;
        break;
      //   console.log(`command: ${command} l is ${l}`)
      case 0x10:
        // console.log(`OTHER: ${command}: setting at: ${offset}, ${l}, ${slicedDataOffset}`)
        slicedData.set(new Uint8Array(rawData.buffer, offset, l+1), slicedDataOffset);
        slicedDataOffset += l + 0x01;
        break;
      case 0x37: //pre frame
        if (push) {
          // console.log('37')
          slicedData.set(new Uint8Array(rawData.buffer, offset, l+1), slicedDataOffset);
          slicedDataOffset += l + 0x01;
        }
        handlePreFrameUpdateEvent(rawData, offset, replayVersion, frames);
        break;
      case 0x38: //post frame
        // console.log('38')
        if (push) {
          slicedData.set(new Uint8Array(rawData.buffer, offset, l+1), slicedDataOffset);
          slicedDataOffset += l + 0x01;
        }
        handlePostFrameUpdateEvent(rawData, offset, replayVersion, frames);
        break;
      case 0x39: //game end
        // console.log('39')
        if (push) {
          slicedData.set(new Uint8Array(rawData.buffer, offset, l+1), slicedDataOffset);
          slicedDataOffset += l + 0x01;
        }
        break;
      case 0x3a: //frame start
        // console.log('3a')
        // console.log(commandHistory);
        if (push) {
          slicedData.set(new Uint8Array(rawData.buffer, offset, l+1), slicedDataOffset);
          slicedDataOffset += l + 0x01;
        }
        handleFrameStartEvent(rawData, offset, replayVersion, frames);
        break;
      case 0x3b: //item update
        // console.log('3b')
        if (push) {
          slicedData.set(new Uint8Array(rawData.buffer, offset, l+1), slicedDataOffset);
          slicedDataOffset += l + 0x01;
        }
        handleItemUpdateEvent(rawData, offset, replayVersion, frames);
        break;
      case 0x3c: //frame bookend
      // console.log(`so this is a frame bookend... did we push this? ${start} ${end} ${frameCount} ${push}`)
        if (push) {
          savedFrames++;
          slicedData.set(new Uint8Array(rawData.buffer, offset, l+1), slicedDataOffset);
          slicedDataOffset += l + 0x01;
        }
        frameCount++;
        //frame bookend
        break;
    }
    if (go)
      offset += l + 0x01;
  }
  console.log(`${frameCount} total frames`);
  console.log(`${frames.length} total frames`);
  console.log(`${savedFrames} frames saved`);
  // cutSlp(start1Offset, end1Offest, start2Offest, end2Offset);

  // console.log(slicedData);
  console.log(`slicing from 0 to ${slicedDataOffset}`);
  // console.log(encode(slicedData));
  console.log(`slicedDataOffset: ${slicedDataOffset}`);
  console.log(`rawData.byteOffset: ${rawData.byteOffset}`);
  console.log(`rawData.byteLength: ${rawData.byteLength}`);
  console.log(`metadata length??: ${rawData.byteLength-offset}`);
  console.log("================");
  console.log(`length data was set to ${length}, should be changed to ${slicedDataOffset}`);

  //redo length at offset 0x0b
  const newArrayBuffer = new ArrayBuffer(4);
  const newByteArray = new Uint8Array(newArrayBuffer);
  const newDataView = new DataView(newArrayBuffer);
  newDataView.setUint32(0, slicedDataOffset, false);
  slicedData.set(newByteArray, 0x0b);
  const fullData = Buffer.concat([
    slicedData.slice(0, slicedDataOffset), 
    new Uint8Array(rawData.buffer, offset, rawData.byteLength+rawData.byteOffset-offset) //metadata
  ]);
  
  await writeCutSlp(fullData, outName.toString());
  return rawData.byteLength-slicedDataOffset+rawData.byteLength-offset
}

export async function schliceSlp(inFile: fs.PathLike, outFile: fs.PathLike, endFrame: number): Promise<number> {
  try {
    const fd = await fs.promises.open(inFile, 'r');
    // if (err) {
    //   console.error('Error opening file:', err);
    //   return Promise.resolve();
    // }
    
    // Get the file stats to know the size
    const stats = await fd.stat()
    console.log(`size is ${stats.size}`)

    // Create a Buffer to hold the file contents
    const size = Buffer.alloc(stats.size);
    // console.log('can we make the size thing?')
    
    // Read the file into the buffer
    const { buffer } = await fd.read(size, 0, stats.size, null);

    // Convert the Buffer into an ArrayBuffer
    const arrayBuffer = buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );

    const data = decode(arrayBuffer, { useTypedArrays:true});

    const dataSaved = await clipReplay(data, stats.size, outFile, 0, endFrame);
    await fd.close();
    await readFileAndCutNamesAndMetadata(outFile, outFile);
    // Don't forget to close the file descriptor
    return dataSaved;
  } catch(err) {
    console.warn(`there was an error with ${inFile}:: ${err}`)
    return 0;
  }
}

function cutMetadataAndNames(
    rawData: DataView,
    offset: number,
  ): ArrayBuffer {
  const replayFormatVersion = [
    readUint(rawData, 8, firstVersion, firstVersion, offset + 0x01),
    readUint(rawData, 8, firstVersion, firstVersion, offset + 0x02),
    readUint(rawData, 8, firstVersion, firstVersion, offset + 0x03),
    readUint(rawData, 8, firstVersion, firstVersion, offset + 0x04),
  ].join(".");
  const settings: any = {}
  settings.playerSettings = {};
  console.log(`replayFormatVersion: ${replayFormatVersion}`)
  for (let playerIndex = 0; playerIndex < 4; playerIndex++) {
    const playerType = readUint(
      rawData,
      8,
      replayFormatVersion,
      firstVersion,
      offset + 0x66 + 0x24 * playerIndex
    );
    if (playerType === 3) continue;

    if (isInVersion(replayFormatVersion, "1.3.0.0"))
      clearData(rawData, offset + 0x161 + 0x10 * playerIndex, 9); //nametag
    if (isInVersion(replayFormatVersion, "3.9.0.0")) 
      clearData(rawData, offset + 0x1a5 + 0x1f * playerIndex, 16);//display name
    if (isInVersion(replayFormatVersion, "3.9.0.0")) 
      clearData(rawData, offset + 0x221 + 0x0a * playerIndex, 10);//connect code
    if (isInVersion(replayFormatVersion, "3.11.0.0")) 
      clearData(rawData, offset + 0x249 + 0x1d * playerIndex, 28);//slippi uid
  }
  
  if (isInVersion(replayFormatVersion, "3.9.0.0")) 
    clearData(rawData, offset + 0x1a5, 16, true);//display name

  return rawData.buffer;
}


// const testFilePath = "C:\\Users\\noahp\\Documents\\Programming\\Websites\\MeleeGuessr\\scripts\\new-scripts\\test.slp"
// cutMetadataAndNames(testFilePath) //todo
const readFileAndCutNamesAndMetadata = async (inFile: fs.PathLike, outFile: fs.PathLike) => {
  const fd = await fs.promises.open(inFile, 'r');
  // if (err) {
  //   console.error('Error opening file:', err);
  //   return Promise.resolve();
  // }
  
  // Get the file stats to know the size
  const stats = await fd.stat()
  console.log(`size is ${stats.size}`)

  // Create a Buffer to hold the file contents
  const size = Buffer.alloc(stats.size);
  // console.log('can we make the size thing?')
  
  // Read the file into the buffer
  const { buffer } = await fd.read(size, 0, stats.size, null);

  // Convert the Buffer into an ArrayBuffer
  const arrayBuffer = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );

  let data = decode(arrayBuffer, { useTypedArrays:true});
  //what causes the {U to {i
  delete data.metadata;
  const encoded = encode(data, { optimizeArrays: true }); //it's
  data = decode(encoded, { useTypedArrays: true });       //this
  const rawData = new DataView(
    data.raw.buffer,
    // data.raw.byteOffset
    0
  )
  //convert it back
  rawData.setUint8(1, 0x55);
  const commandPayloadSizes = parseEventPayloadsEvent(rawData, data.raw.byteOffset);
  const cutNames = cutMetadataAndNames(
    rawData, 
    data.raw.byteOffset + 0x01 + commandPayloadSizes[0x35],
  );
  await fd.close();
  console.log(`cut metadata and names and writing to ${outFile}`)
  await fs.promises.writeFile(outFile, Buffer.from(cutNames))
}

//testing
const x = async () => {
  // await test("test.slp");
  // const game = new SlippiGame("cut-names.slp")
  // console.log(game.getFrames()[-1] === null)

  schliceSlp("test.slp", "C:\\Users\\noahp\\Documents\\Programming\\Websites\\MeleeGuessr\\scripts\\new-scripts\\out.slp", 1052);
};
// x();