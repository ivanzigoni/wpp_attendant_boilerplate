import { Client, Message } from "whatsapp-web.js";

export interface Command {
  main: (msg: Message, client: Client, payload: string[]) => void;

  name: string;
}

export interface CommandsMap {
  [key: string]: Command;
}
