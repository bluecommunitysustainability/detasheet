const { google } = require("googleapis")
const fs = require("fs")

const credentials = JSON.parse(fs.readFileSync("./tokyo-trilogy-327817-7c662991acce.json"))

const authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
)

authClient.authorize((err, tokens) => {
    console.log("ok")

    let spreadsheetId = '1Dua_kwZjCZx1pBp_6umDVQYy_t2MT5KfmPf6u7kakcA';
    let sheetName = 'Top Rated TV Shows!A5:B10'
    let sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
    auth: authClient,
    spreadsheetId: spreadsheetId,
    range: sheetName
    }, function (err, response) {
    if (err) {
        console.log('The API returned an error: ' + err);
    } else {
        console.log('Movie list from Google Sheets:');
        console.log(response.data.values)
    }
    });

})