const { Client, LocalAuth } = require('whatsapp-web.js');
const q = require("qrcode-terminal")
const os = require("os");

const client = new Client({
    // puppeteer: {
    //     executablePath: '/usr/bin/google-chrome',
    //     args: ["--disable-gpu", "--no-sandbox"],
    //     headless: true
    // },
    puppeteer: { args: ["--no-sandbox"] },
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    q.generate(qr, { small: true })
    console.log(os.arch())
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

    client.pupPage.goto("https://chromium.googlesource.com/chromium/src/+/refs/tags/101.0.4950.0")
        .then(res => {
            client.pupPage.waitForSelector(".Site-header")
                .then(sel => {
                    console.log("aqui")
                })
        })

    client.pupBrowser.pages()
        .then(pg => {
            console.log(pg.length)
        })
}, 15000)

client.initialize();