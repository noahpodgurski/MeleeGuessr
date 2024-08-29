import { SlippiGame } from '@slippi/slippi-js';
import fs from "fs";
import { Highlight } from './convert';

export interface FileData {
  path: string;
  endFrame: number;
  startFrame: number;
  characterId: number | null;
  characterColor: number | null;
  playerName: string | null;
  oppCharacterId: number | null;
  oppCharacterColor: number | null;
  oppPlayerName: string | null;
  portToGuess: number | null;
}

interface JsonData {
  queue: FileData[];
}

async function readJson(filePath: string): Promise<JsonData> {
  const rawData = await fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

export async function getCharacterAndPlayerData(slpFile: string, highlight: Highlight): Promise<FileData | null> {
    const playerCodeMap: { [key: string]: string[] } = {};
    let game: SlippiGame;
    let settings, frames, stats, metadata;
    try {
        game = new SlippiGame(slpFile);
        settings = game.getSettings();
        frames = game.getFrames();
        stats = game.getStats();
        metadata = game.getMetadata();
    } catch (error) {
        return null; // Skip this file if it fails to lonull;
    }

    const ports: number[] = [];
    const characterIds: number[] = [];
    const characterColors: number[] = [];
    let players: any[] = [];
    
    console.log(!!settings, !!frames, !!stats)
    if (!settings || !frames || !stats) return null;
    for (let i = 0; i < 4; i++) {
        try {
            let player = settings.players[i];
            if (!player || player.characterId === null) {
                console.error('no character id')
                continue;
            }
            if (!player?.displayName) {
                player.connectCode = metadata?.players?.[i]?.names?.code ?? "";
                player.displayName = metadata?.players?.[i]?.names?.netplay ?? "";
            };
            
            characterIds.push(player.characterId);
            if (player.characterColor === null) {
                console.error('no character color')
                return null;
            }
            characterColors.push(player.characterColor);
            ports.push(i);
            players.push({
                code: player.connectCode,
                name: player.displayName
            });

        } catch (error) {
            console.error(error);
        // Skip if any error occurs for this player
            return null;
        }
    }

    if (characterIds.some((char: any) => char.value === 26)) {
        return null;
    }

    for (const player of players) {
        if (player && player.code) {
            if (!playerCodeMap[player.code]) {
                playerCodeMap[player.code] = [player.name];
            } else if (!playerCodeMap[player.code].includes(player.name)) {
                playerCodeMap[player.code].push(player.name);
            }
        }
    }

    // Determine stocks at start and end frames
    let endFrame = highlight.endFrame;
    const char1StartStocks = frames[highlight.startFrame].players[ports[0]]?.post.stocksRemaining;
    const char2StartStocks = frames[highlight.startFrame].players[ports[1]]?.post.stocksRemaining;

    if (endFrame > stats.lastFrame) {
        endFrame = stats.lastFrame;
    }

    const char1EndStocks = frames[endFrame-1].players[ports[0]]?.post.stocksRemaining;
    const char2EndStocks = frames[endFrame-1].players[ports[1]]?.post.stocksRemaining;

    console.log(!!char1StartStocks, !!char1EndStocks, !!char2StartStocks, !!char2EndStocks)
    if (!char1StartStocks || !char1EndStocks || !char2StartStocks || !char2EndStocks) {
        console.error('no start/end stock resolution')
        return null
    };

    // Determine the winner based on stocks
    let player: string | null = null;
    let character: number | null = null;
    let characterColor: number | null = null;
    let oppPlayer: string | null = null;
    let oppCharacter: number | null = null;
    let oppCharacterColor: number | null = null;
    let portToGuess: number | null = null;

    if (char1StartStocks - char1EndStocks < char2StartStocks - char2EndStocks) {
        // char1 wins
        portToGuess = 0;
        character = characterIds[0];
        characterColor = characterColors[0];
        oppCharacter = characterIds[1];
        oppCharacterColor = characterColors[1];
        player = players[0];
        oppPlayer = players[1];
    } else if (char1StartStocks - char1EndStocks > char2StartStocks - char2EndStocks) {
        // char2 wins
        portToGuess = 1;
        character = characterIds[1];
        characterColor = characterColors[1];
        oppCharacter = characterIds[0];
        oppCharacterColor = characterColors[0];
        player = players[1];
        oppPlayer = players[0];
    } else {
        // Iterate backwards to find who died last
        for (let i = endFrame - 1; i >= highlight.startFrame; i--) {
            const char1Stocks = frames[i].players[ports[0]]?.post.stocksRemaining;
            const char2Stocks = frames[i].players[ports[1]]?.post.stocksRemaining;

            if (char1Stocks !== char1EndStocks || char1Stocks === char1StartStocks) {
                portToGuess = 1;
                character = characterIds[1];
                characterColor = characterColors[1];
                oppCharacter = characterIds[0];
                oppCharacterColor = characterColors[0];
                player = players[1];
                oppPlayer = players[0];
                break;
            } else if (char2Stocks !== char2EndStocks || char1Stocks === char1StartStocks) {
                portToGuess = 0;
                character = characterIds[0];
                characterColor = characterColors[0];
                oppCharacter = characterIds[1];
                oppCharacterColor = characterColors[1];
                player = players[0];
                oppPlayer = players[1];
                break;
            }
        }
    }
    
    console.log('are we here?')
    console.log(!!player, !!character, !!characterColor, !!oppCharacter, !!oppPlayer, !!oppCharacterColor)
    console.log(player, character, characterColor, oppCharacter, oppPlayer, oppCharacterColor)
    if (!player || !character || !oppCharacter || !oppPlayer) {
        console.log('couldnt get player/character data??? 2')
        return null;
    };
    console.log(playerCodeMap);
    return {
        path: slpFile,
        startFrame: highlight.startFrame,
        endFrame: highlight.endFrame,
        playerName: player,
        characterId: character,
        characterColor: characterColor ?? -1,
        oppCharacterId: oppCharacter,
        oppPlayerName: oppPlayer,
        oppCharacterColor: oppCharacterColor ?? -1,
        portToGuess: portToGuess
    }
}
    
// fs.writeFileSync("./playerCodeMap.json", JSON.stringify(playerCodeMap, null, 2));
// fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));