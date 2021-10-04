const { google } = require("googleapis")
const fs = require("fs")

const Detasheet = require("./src/Detasheet")


const credentials = JSON.parse(fs.readFileSync("./tokyo-trilogy-327817-7c662991acce.json"))
const deta = new Detasheet(credentials)

const db = deta.Base("1Dua_kwZjCZx1pBp_6umDVQYy_t2MT5KfmPf6u7kakcA")

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