const { google } = require("googleapis")

class Base {

    constructor(client, sheetID, sheetName) {

        this.client = client
        this.sheetID = sheetID
        this.sheetName = sheetName
        this.sheets = google.sheets("v4")

    }

    #createRange(range) {
        return this.sheetName + "!" + (range.includes(":") ? range : new Array(2).fill(range).join(":"))
    }

    get(range) {

        return new Promise(async (resolve, reject) => {
            
            this.sheets.spreadsheets.values.get({
                spreadsheetId: this.sheetID,
                auth: await this.client, 
                range: this.#createRange(range)
            }, (err, response) =>  err ? reject(err) : resolve(response.data.values))
        
        })

    }

    put(data, range="A1") {

        return new Promise(async (resolve, reject) => {

            this.sheets.spreadsheets.values.append({
                spreadsheetId: this.sheetID,
                auth: await this.client, 
                valueInputOption: "RAW",
                range: this.#createRange(range),
                resource: { values: [ Array.isArray(data) ? data : [data] ] }
            }, (err, response) =>  err ? reject(err) : resolve(response))

        })

    }

}

module.exports = Base