"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("dotenv");
_.config();
var whatsapp_web_js_1 = require("whatsapp-web.js");
var qrcode_terminal_1 = require("qrcode-terminal");
console.log(process.env.ENV);
var client = new whatsapp_web_js_1.Client({
    puppeteer: { args: ["--no-sandbox", "--disable-dev-shm-usage"] },
});
client.on('qr', function (qr) {
    // Generate and scan this code with your phone
    (0, qrcode_terminal_1.generate)(qr, { small: true });
    console.log(qr);
    client.pupBrowser.on("error", function (e) {
        console.log(" browsererr");
        console.log(e);
    });
    client.pupPage.on("request", function (req) {
        console.log(req.url());
    });
    client.pupPage.on("error", function (err) {
        console.log("pupPage normal error \n");
        console.log(err);
    });
    client.pupPage.on("pageerror", function (err) {
        console.log("pupPage pagerror \n");
        console.log(err);
    });
    client.pupPage.on("requestfailed", function (req) {
        console.log("pupPage requestfailed \n");
        console.log(req.url(), " errUrl");
        console.log(req.failure().errorText);
    });
});
client.on('ready', function () {
    console.log('Client is ready!');
});
client.on('message', function (msg) {
    console.log("aki");
    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});
client.on("message_create", function (msg) {
    var from = msg.from, fromMe = msg.fromMe, body = msg.body;
    console.log("inside message_create");
    if (body === "teste") {
        client.sendMessage(from, body + " ".concat(from, " gosta de batata"));
    }
});
client.on("auth_failure", function () {
    console.log("auth failure");
});
client.on("disconnected", function () {
    console.log("disconnected");
});
client.initialize();
