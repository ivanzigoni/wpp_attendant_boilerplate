import fs from "fs";
import {Client} from "whatsapp-web.js";
import split2 from "split2"
import * as path from "path";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function main(client: Client) {
    client.on("message_create", (msg) => {
            if (msg.body === "dayandnite") {
                let multiplier = 1;
                fs.createReadStream(path.resolve(process.cwd(), "assets", "dayandnite", "lyric.txt"))
                    .pipe(split2())
                    .on("data", async (line: string) => {
                        await sleep(1500 * multiplier++)

                        client.sendMessage(msg.from, line);
                    })
                    .on("end", () => {
                        client.sendMessage(msg.from, "😎");
                    })

            }
    })

}