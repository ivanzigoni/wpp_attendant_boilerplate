import fs from "fs";
import * as path from "path";
import {Client, Message} from "whatsapp-web.js";
import { main as initialHook } from "./initialHook";

export function main(client: Client) {
    const commands =
        fs.readdirSync(path.resolve(process.cwd(), "dist", "commands"))
            .filter(command => !command.includes("."))

    const commandsMap = commands.reduce((acc, command) => {
        console.log(path.resolve(process.cwd(), "dist", "commands", command ))
        acc["!" + command] = {
            name: "!" + command,
            main: require(path.resolve(process.cwd(), "dist", "commands", command )).main
        }
        return acc;
    }, {} as { [key: string]: { name: string, main: (msg: Message, client: Client) => void } } )

    console.log(commandsMap, " commands available for message_create")

    initialHook(client)

    client.on("message_create", (msg: Message) => {
        console.log("message_create emitted")

        const {
            from,
            body
        } = msg;

        if (commandsMap[body]) {
            console.log("activating command " + commandsMap[body].name)
            commandsMap[body].main(msg, client);
        }

    })

    console.log("after message_create hook")
}
