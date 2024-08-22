import { SlippiGame } from "@slippi/slippi-js";
import { decode } from "@shelacek/ubjson";
import fs from 'fs';
import path from "path";
import { ReplayData, Frame, GameEnding } from "./common/types";
import { readUint, parseEventPayloadsEvent, parseGameStartEvent, firstVersion, handleFrameStartEvent, handleItemUpdateEvent, handlePostFrameUpdateEvent, handlePreFrameUpdateEvent } from "./parser/parser";



function writeCutSlp(arrayBuffer: Uint8Array, outName: string) {
  const outputFilePath = path.join(__dirname, outName); // Path to your output file
  fs.writeFile(outputFilePath, arrayBuffer, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('File successfully written:', outputFilePath);
    }
  })
}

export function clipReplay({ metadata, raw }: any, inName: string, outName: string, start: number, end: number): void {
  const rawData = new DataView(
    raw.buffer,
    raw.byteOffset
    // baseJson.raw.byteLength
  );
  const slicedData = new Uint8Array(10000000); //10MB
  
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

  let gameEnding: GameEnding | undefined;
  const replayVersion = gameSettings.replayFormatVersion;
  let offset =
  0x00 + commandPayloadSizes[0x35] + 0x01 + commandPayloadSizes[0x36] + 0x01;
  // inputs/states may come multiple times for a given player on a given
  // frame due to rollbacks. Because we are overwriting, we will just save the
  // last one which will be the official "finalized" one.
  console.log(`Starting offset is ${offset}`);
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
        console.log(`OTHER: ${command}: setting at: ${offset}, ${l}, ${slicedDataOffset}`)
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
  console.log(`${frameCount} total frames`)
  console.log(`${frames.length} total frames`)
  console.log(`${savedFrames} frames saved`)
  // console.log(`s1: ${start1Offset}, e1: ${end1Offest}, s2: ${start2Offest}, e2: ${end2Offset}`)
  // cutSlp(start1Offset, end1Offest, start2Offest, end2Offset);

  // console.log(slicedData);
  console.log(`slicing from 0 to ${slicedDataOffset}`)
  // console.log(slicedDataOffset+extraneousOffset)
  // console.log(encode(slicedData));
  console.log(`slicedDataOffset: ${slicedDataOffset}`)
  console.log(`rawData.byteOffset: ${rawData.byteOffset}`)
  console.log(`rawData.byteLength: ${rawData.byteLength}`)
  console.log(`metadata length??: ${rawData.byteLength-offset}`)
  console.log("================")
  console.log(`length data was set to ${length}, should be changed to ${slicedDataOffset}`)

  //redo length at offset 0x0b
  const newArrayBuffer = new ArrayBuffer(4);
  const newDataView = new DataView(newArrayBuffer);
  newDataView.setUint32(0, slicedDataOffset, false);
  const newByteArray = new Uint8Array(newArrayBuffer);
  slicedData.set(newByteArray, 0x0b)
  const fullData = Buffer.concat([
    slicedData.slice(0, slicedDataOffset), 
    new Uint8Array(rawData.buffer, offset, rawData.byteLength+rawData.byteOffset-offset)
  ]);
  
  writeCutSlp(fullData, outName);
  console.log(``)
}

function schliceSlp() {
  fs.open('source.slp', 'r', (err, fd) => {
    if (err) {
      console.error('Error opening file:', err);
      return;
    }
  
    // Get the file stats to know the size
    fs.fstat(fd, (err, stats) => {
      if (err) {
        console.error('Error getting file stats:', err);
        return;
      }
  
      // Create a Buffer to hold the file contents
      const buffer = Buffer.alloc(stats.size);
  
      // Read the file into the buffer
      fs.read(fd, buffer, 0, stats.size, null, (err, bytesRead, buffer) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
  
        // Convert the Buffer into an ArrayBuffer
        const arrayBuffer = buffer.buffer.slice(
          buffer.byteOffset,
          buffer.byteOffset + buffer.byteLength
        );
  
        const data = decode(arrayBuffer, { useTypedArrays:true});

        clipReplay(data, "source.slp", "sliced.slp", 0, 3326);
  
        // Don't forget to close the file descriptor
        fs.close(fd, (err) => {
          if (err) console.error('Error closing file:', err);
        });
      });
    });
  });
}

schliceSlp();