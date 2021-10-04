const { google } = require("googleapis")

const makeID = (length) => (
    new Array(length).fill("0").map((n) => Math.random().toString(36)[2] || n).join('')
)

class Base {

    constructor(client, sheetID, sheetName) {

        this.client = client
        this.sheetID = sheetID
        this.sheetName = sheetName
        this.sheets = google.sheets("v4")

    }

    get(range) {

        return new Promise(async (resolve, reject) => {
            
            this.sheets.spreadsheets.values.get({
                spreadsheetId: this.sheetID,
                auth: await this.client, 
                range: this.sheetName + "!" + range
            }, (err, response) =>  err ? reject(err) : resolve(response.data.values))
        
        })

    }

    put(data, key=makeID(10)) {

        return new Promise(async (resolve, reject) => {

            // await sheets.spreadsheets.values.append(request)
            
            this.sheets.spreadsheets.values.append({
                spreadsheetId: this.sheetID,
                auth: await this.client, 
                valueInputOption: "RAW",
                range: "A1",
                resource: { values: [[ key, JSON.stringify(data) ]] }
            }, (err, response) =>  err ? reject(err) : resolve(response))

        })

    }

}

module.exports = Base