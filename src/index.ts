import * as _ from "dotenv";
_.config()

import {Client, LocalAuth} from "whatsapp-web.js";
import * as qterminal from "qrcode-terminal";
import { main as dnnHook } from "./events/dayandnite/index";

const client = new Client({
    puppeteer: { args: ["--no-sandbox", "--disable-dev-shm-usage"] },
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {

    qterminal.generate(qr, { small: true })

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

dnnHook(client)

client.initialize()
    .then(_ => { console.log("initialized client") })
    .catch(_ => { console.log("client initialization failed") });