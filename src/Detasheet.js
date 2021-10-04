const { google } = require("googleapis")
const Base = require("./Base")

class Detasheet {

    constructor(credentials={}, sheetID) {

        this.client = this.#authorize(credentials)
        this.sheetID = sheetID

    }

    async #authorize(credentials) {

        return new Promise((resolve, reject) => {

            const { client_email, private_key } = credentials
            const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
            const client = new google.auth.JWT(client_email, null, private_key, SCOPES)

            client.authorize((err, tokens) => err ? reject(err) : resolve(client))

        })

    }

    Base(name) {

        const base = new Base(this.client, this.sheetID, name)
        return base

    }

}

module.exports = Detasheet