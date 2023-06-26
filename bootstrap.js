const ven = require("venom-bot");

class Venom {
    static _instance

    static async GetInstance() {
        if (!this._instance) {
            this._instance = await ven.create({
                session: "travessias-bot"
            })

            this.hook()
        }

        return this._instance;
    }

    static hook() {

    }

}

module.exports.Venom = Venom;
