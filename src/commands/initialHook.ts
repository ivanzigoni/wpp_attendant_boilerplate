import {Client} from "whatsapp-web.js";
import * as qterminal from "qrcode-terminal";

export function main(client: Client) {

    client.on('qr', (qr) => {

        qterminal.generate(qr, { small: true })

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

    client.on("auth_failure", () => {
        console.log("auth failure")
    })

    client.on("disconnected", () => {
        console.log("disconnected")
    })

}