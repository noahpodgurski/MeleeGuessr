import { SlippiGame } from "@slippi/slippi-js";
import { decode } from "@shelacek/ubjson";
import fs from 'fs';
import { clipReplay, parseGameSettings, parseReplay } from "./parser/parser";

function schliceSlpOG() {
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
  
        // Now you have the ArrayBuffer
        const settings = parseGameSettings(
          decode(arrayBuffer, { useTypedArrays: true })
        );
        const replay = clipReplay(decode(arrayBuffer, { useTypedArrays: true }), 0, 500);
        // const replay = clipReplay(decode(arrayBuffer, { useTypedArrays: true }), 500, 800);
        // console.log(x)
        // console.log(settings);
        // console.log(replay);
  
        // Don't forget to close the file descriptor
        fs.close(fd, (err) => {
          if (err) console.error('Error closing file:', err);
        });
      });
    });
  });
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
  
        // Now you have the ArrayBuffer
        // const settings = parseGameSettings(
        //   decode(arrayBuffer, { useTypedArrays: true })
        // );
        const data = decode(arrayBuffer, { useTypedArrays:true});
        // console.log(data.raw)

        const replay = clipReplay(data, 0, 500);
        // const replay = clipReplay(decode(arrayBuffer, { useTypedArrays: true }), 500, 800);
        // console.log(x)
        // console.log(settings);
        // console.log(replay);
  
        // Don't forget to close the file descriptor
        fs.close(fd, (err) => {
          if (err) console.error('Error closing file:', err);
        });
      });
    });
  });
}

function parseSlp() {
  const game = new SlippiGame("short.slp");
  
  // Get game settings – stage, characters, etc
  const settings = game.getSettings();
  // console.log(settings);
  
  // Get metadata - start time, platform played on, etc
  const metadata = game.getMetadata();
  // console.log(metadata);
  
  // Get computed stats - openings / kill, conversions, etc
  const stats = game.getStats();
  // console.log(stats);
  
  // Get frames – animation state, inputs, etc
  // This is used to compute your own stats or get more frame-specific info (advanced)
  const frames = game.getFrames();
  console.log(frames);
  // console.log(frames[0].players); // Print frame when timer starts counting down
}

// 0 -100 yields -123 -> -12
schliceSlp();
// parseSlp();

// fs.readFile('sliced.slp', (err, data) => {
//   const replayData = parseReplay(
//     data
//   );
//   console.log(replayData)
// });