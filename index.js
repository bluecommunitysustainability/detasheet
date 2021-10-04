const { google } = require("googleapis")
const fs = require("fs")

const Detasheet = require("./src/Detasheet")


const credentials = JSON.parse(fs.readFileSync("./tokyo-trilogy-327817-7c662991acce.json"))

const deta = new Detasheet(credentials, "1VdSmvZLJRpVP2b0aOWB1_NVRFivLeGI3YRYZtdb-lUc")
const db = deta.Base("Detasheet")

db.get("A1:B1").then(console.log)

db.put("adsflkajsdflk jadklsjf as fljasdklf")