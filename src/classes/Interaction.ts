import {Client, Message} from "whatsapp-web.js";
import {Tree} from "./Tree";

class Interaction {
    constructor(
        public client: Client,
        public initialMessage: Message,
        public tree: Tree
    ) {}

    private checkLifecycle() {

    }
}