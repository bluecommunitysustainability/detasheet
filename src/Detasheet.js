const { google } = require("googleapis")
const Base = require("./Base")

class Detasheet {

    constructor(credentials={}) {

        this.client = this.#authorize(credentials)
        this.bases = []

    }

    async #authorize(credentials) {

        return new Promise((resolve, reject) => {

            const { client_email, private_key } = credentials
            const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
            const client = new google.auth.JWT(client_email, null, private_key, SCOPES)

            client.authorize((err, tokens) => err ? reject(err) : resolve(client))

        })

    }

    Base(sheetID) {

        const base = new Base(this.client, sheetID)
        this.bases.push(base)
        return base

    }

}

module.exports = Detasheet