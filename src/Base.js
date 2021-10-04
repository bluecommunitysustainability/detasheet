const { google } = require("googleapis")

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

    put(data, column="A1") {

        return new Promise(async (resolve, reject) => {

            // await sheets.spreadsheets.values.append(request)
            
            this.sheets.spreadsheets.values.append({
                spreadsheetId: this.sheetID,
                auth: await this.client, 
                valueInputOption: "RAW",
                range: column,
                resource: { values: [[ data ]] }
            }, (err, response) =>  err ? reject(err) : resolve(response))

        })

    }

}

module.exports = Base