import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import cliProgress from "cli-progress";

const client = new S3Client({});

export const main = async () => {
  const dir =
    "\\\\NOAH-PC\\Clout\\Backups\\MeleeGuessrSlp\\3.0\\converted\\cut";
  const files = await fs.promises.readdir(dir);

  const bar1 = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  bar1.start(files.length, 0);
  for (let i = 0; i < files.length; i++) {
    bar1.update(i);
    const file = files[i];
    const data = await fs.promises.readFile(path.join(dir, file));
    const command = new PutObjectCommand({
      Bucket: "meleeguessr-v3-clips",
      Key: file,
      Body: data,
    });

    try {
      const response = await client.send(command);
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
  bar1.stop();
};

main();
