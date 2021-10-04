const { google } = require("googleapis")

class Base {

    constructor(client, sheetID) {

        this.client = client
        this.sheetID = sheetID
        this.sheets = google.sheets("v4")

    }

    get(range) {

        return new Promise(async (resolve, reject) => {
            
            this.sheets.spreadsheets.values.get({
                spreadsheetId: this.sheetID,
                auth: await this.client, 
                range
            }, (err, response) =>  err ? reject(err) : resolve(response.data.values))
        
        })
        


    }

}

//     let spreadsheetId = '1Dua_kwZjCZx1pBp_6umDVQYy_t2MT5KfmPf6u7kakcA';
//     let sheetName = 'Top Rated TV Shows!A5:B10'
//     let sheets = google.sheets('v4');
//     sheets.spreadsheets.values.get({
//     auth: authClient,
//     spreadsheetId: spreadsheetId,
//     range: sheetName
//     }, function (err, response) {
//     if (err) {
//         console.log('The API returned an error: ' + err);
//     } else {
//         console.log('Movie list from Google Sheets:');
//         console.log(response.data.values)
//     }
//     });

// })

module.exports = Base