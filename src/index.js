const { Client, LocalAuth} = require('whatsapp-web.js');
const q = require("qrcode-terminal")
// import { Client, LocalAuth } from "whatsapp-web.js";

const client = new Client({
    puppeteer: {
        executablePath: '/usr/bin/google-chrome',
        args: ["--no-sandbox"],
        headless: true
    },
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    q.generate(qr, { small: true })
    console.log(qr);
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

setInterval(() => {
    console.log(new Date().toISOString() + " app running")
}, 30000)

client.initialize();