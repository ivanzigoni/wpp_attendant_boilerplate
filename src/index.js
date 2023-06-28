const { Client, LocalAuth } = require('whatsapp-web.js');
const _ = require("lodash");
const q = require("qrcode-terminal")
const os = require("os");

const client = new Client({
    // puppeteer: {
    //     executablePath: '/usr/bin/google-chrome',
    //     args: ["--disable-gpu", "--no-sandbox"],
    //     headless: true
    // },
    puppeteer: { args: ["--no-sandbox"] },
    // authStrategy: new LocalAuth(),
});

let workers;

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    q.generate(qr, { small: true })
    console.log(os.arch())
    console.log(qr);

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


        console.log(req.url(), " url")
        console.log(req.failure().errorText)
        console.log(req.response())
    })
});

client.on('ready', () => {
    console.log('Client is ready!');
    workers = _.cloneDeep(client.pupPage["_workers"]);
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

    // client.pupPage.goto("https://chromium.googlesource.com/chromium/src/+/refs/tags/101.0.4950.0")
    //     .then(res => {
    //         client.pupPage.waitForSelector(".Site-header")
    //             .then(sel => {
    //                 console.log("aqui")
    //             })
    //     })

    if (client.pupPage["_workers"].size === 0) {
        console.log("WORKERS DELETED =================================== \n")
        client.pupPage["_workers"] = workers;
    }

    console.log(workers, " workers list from variable \n")

    console.log(client.pupPage["_workers"], " workers list from puppage")

    console.log("====================================================================================\n\n")
}, 10000)

client.initialize();