import * as _ from "dotenv";
_.config();

import { Client, LocalAuth } from "whatsapp-web.js";
import { main as hook } from "./commands/hook";

const client = new Client({
  puppeteer: { args: ["--no-sandbox"] },
  authStrategy: new LocalAuth(),
});

hook(client);

client
  .initialize()
  .then(() => {
    console.log("initialized client");
  })
  .catch((_) => {
    console.log("client initialization failed");
  });
