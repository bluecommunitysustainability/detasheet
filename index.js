const { google } = require("googleapis")
const fs = require("fs")

const Detasheet = require("./src/Detasheet")


const credentials = JSON.parse(fs.readFileSync("./tokyo-trilogy-327817-7c662991acce.json"))

const deta = new Detasheet(credentials, "1VdSmvZLJRpVP2b0aOWB1_NVRFivLeGI3YRYZtdb-lUc")
const db = deta.Base("Detasheet")

const createTable = () => db.set("A1:C1", [["Name", "Age", "Likes"]])

// db.put("A1", ["John", "25", "Coding"])

const main = (async () => {
    db.set("A1:A3", [["Name"], ["Age"], ["Likes"]])
    db.set("B2:B3", db.utils.increment(1))
})()

// db.utils.increment("A1").then(console.log)

// db.update("bruh", "A1")
// db.put([ db.utils.key(), "example data" ], "A1")
// db.put("adsflkajsdflk jadklsjf as fljasdklf", "C1")