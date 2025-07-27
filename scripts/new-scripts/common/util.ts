import { FramesType } from "@slippi/slippi-js";
import { unzipSync } from "fflate";

export async function filterFiles(files: File[]): Promise<File[]> {
  const slpFiles = files.filter((file) => file.name.endsWith(".slp"));
  const zipFiles = files.filter((file) => file.name.endsWith(".zip"));
  const blobsFromZips = (await Promise.all(zipFiles.map(unzip)))
    .flat()
    .filter((file) => file.name.endsWith(".slp"));
  return [...slpFiles, ...blobsFromZips];
}

export async function unzip(zipFile: File): Promise<File[]> {
  const fileBuffers = unzipSync(new Uint8Array(await zipFile.arrayBuffer()));
  return Object.entries(fileBuffers).map(
    ([name, buffer]) => new File([buffer], name)
  );
}

export const UNIQUE_COORD_GCC_THRESH_MIN = 2;
export const UNIQUE_COORD_GCC_THRESH_MAX = 50;
export function getUniqueCStickAngles(
  frames: FramesType,
  lastFrame: number
): [number, number, number, number] {
  const uniqueCoordinateSets = [
    new Set<string>(),
    new Set<string>(),
    new Set<string>(),
    new Set<string>(),
  ];
  for (let i = 0; i < lastFrame - 1; i++) {
    for (let p = 0; p < 4; p++) {
      frames[i].players[p] &&
        uniqueCoordinateSets[p].add(
          `${frames[i].players[p]?.pre.joystickX}, ${frames[i].players[p]?.pre.joystickY}`
        );
    }
  }

  // return [false, false, false, false];
  return [
    uniqueCoordinateSets[0].size,
    uniqueCoordinateSets[1].size,
    uniqueCoordinateSets[2].size,
    uniqueCoordinateSets[3].size,
  ];
}
