const { google } = require("googleapis")

class Base {

    constructor(client, sheetID, sheetName) {

        this.client = client
        this.sheetID = sheetID
        this.sheetName = sheetName
        this.sheets = google.sheets("v4")

    }

    async #createShared(range) {
        return {
            spreadsheetId: this.sheetID,
            auth: await this.client, 
            range: this.#createRange(range)
        }
    }

    #createRange(range) {
        return this.sheetName + "!" + (range.includes(":") ? range : new Array(2).fill(range).join(":"))
    }

    get(range) {

        return new Promise(async (resolve, reject) => {
            
            this.sheets.spreadsheets.values.get({ ...(await this.#createShared(range)) }, (err, response) => (
                err ? reject(err) : resolve(response.data.values))
            )

        })

    }

    update(data, range="A1") {

        return new Promise(async (resolve, reject) => {

            this.sheets.spreadsheets.values.uppdate({
                ...(await this.#createShared(range)),
                valueInputOption: "RAW",
                resource: { values: [ Array.isArray(data) ? data : [data] ] }
            }, (err, response) =>  err ? reject(err) : resolve(response))

        })

    }

    put(data, range="A1") {

        return new Promise(async (resolve, reject) => {

            this.sheets.spreadsheets.values.append({
                ...(await this.#createShared(range)),
                valueInputOption: "RAW",
                resource: { values: [ Array.isArray(data) ? data : [data] ] }
            }, (err, response) =>  err ? reject(err) : resolve(response))

        })

    }

}

module.exports = Base