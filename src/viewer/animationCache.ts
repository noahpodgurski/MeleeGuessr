import { unzipSync, strFromU8 } from "fflate";

export type AnimationFrames = string[];
export interface CharacterAnimations {
  [animationName: string]: AnimationFrames;
}

const animationsCache = new Map<number, CharacterAnimations>();

export const fetchAnimations = async (
  externalCharacterId: number
): Promise<CharacterAnimations> => {
  if (animationsCache.has(externalCharacterId)) {
    return animationsCache.get(externalCharacterId) as CharacterAnimations;
  }
  //todo do islocal ? /zips/ : ''
  const animations = await load(
    `https://meleeguessr-v2-zips.s3.amazonaws.com/${characterZipUrlByExternalId[externalCharacterId]}`
  );
  animationsCache.set(externalCharacterId, animations);
  return animations;
};

// zips expected to exist at the root
const characterZipUrlByExternalId = [
  "captainFalcon.zip",
  "donkeyKong.zip",
  "fox.zip",
  "mrGameAndWatch.zip",
  "kirby.zip",
  "bowser.zip",
  "link.zip",
  "luigi.zip",
  "mario.zip",
  "marth.zip",
  "mewtwo.zip",
  "ness.zip",
  "peach.zip",
  "pikachu.zip",
  "iceClimbers.zip",
  "jigglypuff.zip",
  "samus.zip",
  "yoshi.zip",
  "zelda.zip",
  "sheik.zip",
  "falco.zip",
  "youngLink.zip",
  "doctorMario.zip",
  "roy.zip",
  "pichu.zip",
  "ganondorf.zip",
];

async function load(url: string): Promise<CharacterAnimations> {
  const response = await fetch(url);
  const animationsZip = await response.blob();
  const fileBuffers = unzipSync(
    new Uint8Array(await animationsZip.arrayBuffer())
  );
  return Object.fromEntries(
    Object.entries(fileBuffers).map(([name, buffer]) => [
      name.replace(".json", ""),
      JSON.parse(strFromU8(buffer)),
    ])
  );
}
