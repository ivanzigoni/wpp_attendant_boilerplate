import * as _ from "dotenv";
_.config()

import {Client, LocalAuth} from "whatsapp-web.js";
import { generate } from "qrcode-terminal";

console.log(process.env.ENV)

const client = new Client({
    puppeteer: { args: ["--no-sandbox", "--disable-dev-shm-usage"] },
    authStrategy: new LocalAuth()
});

console.log("aki")
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    generate(qr, { small: true })
    console.log("aki")
    console.log(qr);

    if (client.pupPage && client.pupBrowser) {

        client.pupBrowser.on("error", (e) => {
            console.log(" browsererr")

            console.log(e)
        })

        client.pupPage.on("request", (req) => {
            console.log(req.url())
        })

        client.pupPage.on("error", (err) => {
            console.log("pupPage normal error \n")

            console.log(err)
        })

        client.pupPage.on("pageerror", (err) => {
            console.log("pupPage pagerror \n")

            console.log(err)
        })

        client.pupPage.on("requestfailed", (req) => {
            console.log("pupPage requestfailed \n")


            console.log(req.url(), " errUrl")
            console.log(req.failure()!.errorText)
        })
    }
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    console.log("aki")
    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});

client.on("message_create", msg => {
    const {
        from,
        fromMe,
        body
    } = msg;

    console.log("inside message_create")

    if (body === "teste") {
        client.sendMessage(
            from,
            body + ` ${from} gosta de batata`
        )
    }
})

client.on("auth_failure", () => {
    console.log("auth failure")
})

client.on("disconnected", () => {
    console.log("disconnected")
})

client.initialize()
    .then(_ => { console.log("initialized client") })
    .catch(_ => { console.log("client initialization failed") });