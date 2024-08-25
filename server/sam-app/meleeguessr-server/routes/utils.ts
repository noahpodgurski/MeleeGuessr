import { Clip, PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const createOrUpdateSessionByUserId = async (userId: string, clip: any)  => {
    const currentSession = await prisma.session.findUnique({
        where: { userId }
    });

    if (currentSession) {
        //update it
        await prisma.session.update({
            where: { userId },
            data: {
                currentClip: path.basename(clip.path),
                answer: clip.playerName.code,
                startFrame: clip.startFrame,
                portToGuess: clip.portToGuess
            }
        });
    } else {
        //otherwise make a new one
        await prisma.session.create({
            data: {
                userId,
                correct: 0,
                incorrect: 0,
                currentClip: path.basename(clip.path),
                answer: clip.playerName.code,
                startFrame: clip.startFrame,
                portToGuess: clip.portToGuess
            }
        });
    }
}

export const createOrUpdateSessionBySessionId = async (sessionId: string, clip: any)  => {
    let newSession;
    const currentSession = sessionId !== "" ? await prisma.session.findUnique({
        where: { id: sessionId }
    }) : null;

    if (currentSession) {
        //update it
        newSession = await prisma.session.update({
            where: { id: sessionId },
            data: {
                currentClip: path.basename(clip.path),
                answer: clip.playername.code,
                startFrame: clip.startFrame,
                portToGuess: clip.portToGuess
            }
        });
    } else {
        //otherwise make a new one
        newSession = await prisma.session.create({
            data: {
                correct: 0,
                incorrect: 0,
                currentClip: path.basename(clip.path),
                answer: clip.playerName.code,
                startFrame: clip.startFrame,
                portToGuess: clip.portToGuess
            }
        });
    }
    return newSession;
}

export const getRandomClip = async () => {
    let clips: any = [];
    const fd = await fs.promises.readFile(path.join(__dirname, './clips.json'), 'utf-8');
    clips = JSON.parse(fd);
    if (!clips) {
        throw Error("Unable to read clips.json (2)");
    }
    return clips[Math.floor(Math.random() * (clips.length-1))];
}
