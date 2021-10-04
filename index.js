const { google } = require("googleapis")
const fs = require("fs")

const Detasheet = require("./src/Detasheet")


const credentials = JSON.parse(fs.readFileSync("./tokyo-trilogy-327817-7c662991acce.json"))

const deta = new Detasheet(credentials)
const db = deta.Base("1Dua_kwZjCZx1pBp_6umDVQYy_t2MT5KfmPf6u7kakcA")

db.get("Top Rated TV Shows!A5:B10").then(console.log)