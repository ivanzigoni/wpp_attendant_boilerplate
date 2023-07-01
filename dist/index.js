"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("dotenv"));
_.config();
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = require("qrcode-terminal");
console.log(process.env.ENV);
const client = new whatsapp_web_js_1.Client({
// puppeteer: { args: ["--no-sandbox", "--disable-dev-shm-usage"] },
});
console.log("aki");
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    (0, qrcode_terminal_1.generate)(qr, { small: true });
    console.log("aki");
    console.log(qr);
    if (client.pupPage && client.pupBrowser) {
        client.pupBrowser.on("error", (e) => {
            console.log(" browsererr");
            console.log(e);
        });
        client.pupPage.on("request", (req) => {
            console.log(req.url());
        });
        client.pupPage.on("error", (err) => {
            console.log("pupPage normal error \n");
            console.log(err);
        });
        client.pupPage.on("pageerror", (err) => {
            console.log("pupPage pagerror \n");
            console.log(err);
        });
        client.pupPage.on("requestfailed", (req) => {
            console.log("pupPage requestfailed \n");
            console.log(req.url(), " errUrl");
            console.log(req.failure().errorText);
        });
    }
});
client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('message', msg => {
    console.log("aki");
    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});
client.on("message_create", msg => {
    const { from, fromMe, body } = msg;
    console.log("inside message_create");
    if (body === "teste") {
        client.sendMessage(from, body + ` ${from} gosta de batata`);
    }
});
client.on("auth_failure", () => {
    console.log("auth failure");
});
client.on("disconnected", () => {
    console.log("disconnected");
});
client.initialize()
    .then(_ => { console.log("initialized client"); })
    .catch(_ => { console.log("client initialization failed"); });
//# sourceMappingURL=index.js.map