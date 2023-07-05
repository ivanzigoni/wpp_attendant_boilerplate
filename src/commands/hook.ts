import fs from "fs";
import * as path from "path";
import { Client, Message } from "whatsapp-web.js";
import { main as initialHook } from "./initialHook";
import { CommandsMap } from "./Command";

export function main(client: Client) {
  const commands = fs
    .readdirSync(path.resolve(process.cwd(), "dist", "commands"))
    .filter((command) => !command.includes("."));

  const commandsMap = commands.reduce((acc, command) => {
    acc["!" + command] = {
      name: "!" + command,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      main: require(path.resolve(process.cwd(), "dist", "commands", command))
        .main,
    };
    return acc;
  }, {} as CommandsMap);

  console.log(commandsMap, " commands available for message_create");

  initialHook(client);

  client.on("message_create", (msg: Message) => {
    console.log("message_create emitted");

    const { from, body } = msg;

    /*
        
        !command
        arg1 
        arg2
        arg3
        ...
    */

    const [command, ...payload] = body.split("\n");

    if (commandsMap[command]) {
      console.log("activating command " + commandsMap[command].name);

      commandsMap[command].main(msg, client, payload);
    }
  });
}
