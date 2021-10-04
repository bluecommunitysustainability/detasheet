const { google } = require("googleapis")
const fs = require("fs")

const Detasheet = require("./src/Detasheet")

const main = (async () => {
    // initialize Detasheet
    const credentials = JSON.parse(fs.readFileSync("./tokyo-trilogy-327817-7c662991acce.json"))
    const deta = new Detasheet(credentials, "1VdSmvZLJRpVP2b0aOWB1_NVRFivLeGI3YRYZtdb-lUc")
    const db = deta.Base("Detasheet")

    // create a table with headers
    await db.set("A1:D1", [["Key", "Name", "Age", "Likes"]])

    // append a new row to data set 
    // create a custom key because clearing cells will not shift the entire data set up
    const res = await db.put("A1", [[db.utils.key(), "John", 25, "Programming"]])

    // dynamically retrieve age cell
    const cell = "C" + (parseInt(res.tableRange.slice(-1)) + 1)
    await db.set(cell, db.utils.increment(1))
})

// only run main if called through cmd
if(require.main === module) {
    main()
}

module.exports = Detasheet