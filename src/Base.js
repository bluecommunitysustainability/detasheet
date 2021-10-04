const { google } = require("googleapis")

class Base {

    constructor(client, sheetID, sheetName) {

        this.client = client
        this.sheetID = sheetID
        this.sheetName = sheetName
        this.sheets = google.sheets("v4")
        this.utils = this.#createUtils()
    }

    async #formatData(range, data) {
        const utilData = typeof data == "function" ? (await data(range)) : data
        return Array.isArray(utilData) ? utilData : [utilData]
    }

    async #createShared(range) {
        return {
            spreadsheetId: this.sheetID,
            auth: await this.client, 
            range: this.#createRange(range)
        }
    }

    #createRange(range="A1") {
        return this.sheetName + "!" + (range.includes(":") ? range : new Array(2).fill(range).join(":"))
    }

    #createUtils() {
        return {
            key: (len=10) => (
                new Array(len)
                    .fill("0")
                    .map((n) => Math.random().toString(36)[2] || n).join('')
            ),

            increment: (amount) => (
                (range) => (
                    this.get(range)
                        .then(data => data.map(row => row.map(cell => cell.match(/^\d+$/) ? parseInt(cell) + amount : cell)))   
                )
            )

        }
    }

    clear(range) {

        return new Promise(async (resolve, reject) => {

            this.sheets.spreadsheets.values.clear({
                ...(await this.#createShared(range)),
            }, (err, response) =>  err ? reject(err) : resolve(response))

        })

    }

    get(range) {

        return new Promise(async (resolve, reject) => {
            
            this.sheets.spreadsheets.values.get({ ...(await this.#createShared(range)) }, (err, response) => (
                err ? reject(err) : resolve(response.data.values))
            )

        })

    }

    set(range, data) {
        return new Promise(async (resolve, reject) => {

            this.sheets.spreadsheets.values.update({
                ...(await this.#createShared(range)),
                valueInputOption: "RAW",
                resource: { values: await this.#formatData(range, data) }
            }, (err, response) =>  err ? reject(err) : resolve(response))

        })

    }

    put(range, data) {

        return new Promise(async (resolve, reject) => {

            this.sheets.spreadsheets.values.append({
                ...(await this.#createShared(range)),
                valueInputOption: "RAW",
                resource: { values: await this.#formatData(range, data) }
            }, (err, response) =>  err ? reject(err) : resolve(response))

        })

    }

}

module.exports = Base