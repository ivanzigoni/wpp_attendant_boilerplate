import fs from "fs";
import { Client, Message } from "whatsapp-web.js";
import split2 from "split2";
import * as path from "path";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function main(msg: Message, client: Client) {
  let multiplier = 1;

  fs.createReadStream(
    path.resolve(process.cwd(), "assets", "dayandnite", "lyric.txt"),
  )
    .pipe(split2())
    .on("data", async (line: string) => {
      await sleep(1500 * multiplier++);

      await client.sendMessage(msg.from, line);
    })
    .on("end", async () => {
      console.log("command ended");
    });
}
