![project banner](https://project-banner.phamn23.repl.co/?title=Detasheet&description=Google%20Sheets%20as%20a%20database&stack=node)

# Detasheet
Google Sheets as a database. Probably a bad idea. This package is somewhat inspired by [Deta](http://deta.sh/), a simplistic and free database system for developers. Please refer to the [Google Sheets API Reference](https://developers.google.com/sheets/api/reference/rest) for details on response data and formatting data.

## What is Detasheet?
Detasheet is a wrapper around the Google Sheets API (v4) that allows you to intuitively create and manage a database in Google Sheets. It is a work in progress and the API is subject to change.

## Installing Detasheet
Install the `detasheet` package and require it into your application. 
```
>>> npm install detasheet
```
```js
const Detasheet = require("detasheet")
```

## Initializing a Detasheet
Detasheet uses a service account rather than OAuth to manipulate sheets. Other Google databases like Firebase also use service account credentials, rather than managing ambiguous refresh tokens. Visit the Google Cloud console, enable the Google Sheets API, and create a service account to obtain the appropriate authentication. 

Detasheet takes two parameters: a credential object and a sheet id.

Because the credentials are simply a JSON object, you can read them from a file or use environment variables. 

The sheet id is taken from the end of the Google Sheets url. For example, in the Google Sheet https://docs.google.com/spreadsheets/d/1VdSmvZLJRpVP2b0aOWB1_NVRFivLeGI3YRYZtdb-lUc/edit, the id would be `1VdSmvZLJRpVP2b0aOWB1_NVRFivLeGI3YRYZtdb-lUc`.

```js
const credentials = {}
const sheetID = "1VdSmvZLJRpVP2b0aOWB1_NVRFivLeGI3YRYZtdb-lUc"

// ways to obtain credentials
JSON.parse(fs.readFileSync("./credentials.json"))
{ client_email: process.env.EMAIL, process.env.PRIVATE_KEY }
```

```js
const deta = new Detasheet(credentials, sheetID)
```

Spreadsheets also contain sheets, which are sort of like subpages. At the bottom left of a newly created Google Spreadsheet, you should see a sheet named `Sheet1`. You can create infinitely many sheets and access them by name in Detasheets.

```js
const db = deta.Base("Sheet1")
```

## Database Main Methods
There are only four main methods you can use to manipulate a sheet. All methods are asynchronous and promise-based. 

The first value of these methods is always the range of cells that should be manipulated. Ranges are specified in the format `A1:B2` (fixed range), `A1:A` (A1 to last row), or `A` (single cell).

Note that all data (returned from `get` or input into methods like `set`) is shaped like a literal spreadsheet that corresponds to the range of cells. 

```js
// horizontal data
[[1, 2, 3]]

// vertical data
[[1], [2], [3]]

// single cell data
// Detasheets automatically converts liteals into a single cell array
1 or [1]
```

### Set
`set` is used to set or update the values in a cell. This method returns information about the cell that was updated.

```js
await db.set("A1:D1", [["Key", "Name", "Age", "Likes"]])
```

### Put
`put` is used to append a row to the end of the sheet. This method returns information about the cell that was updated.

```js
await db.put("A1", [[db.utils.key(), "John", 25, "Programming"]])
```

### Clear
`clear` is used to "delete" a range of cells. It does not shift the overall positioning of data, so it is recommend you add custom keys to identify data (users for example). This method returns information about the cell that was updated.

```js
await db.clear("A1")
```

### Get
`get` is used to retrieve a range of cells. This method returns information about the cell that was retrieved.

```js
await db.get("A1")
```

## Database Utility Methods
Detasheet offers some utility functions to manipulate cell data.

### Key
`key` creates a unique, randomized key of specified length.
```js
db.utils.key(10)
```

### Increment
`increment` increments a cell by a specified amount, only if the cell value is a number or can be parsed into a number.
```js
await db.set("A1", db.utils.increment(20))
```

## Full Example
This code is also found within `index.js`.

```js
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
```