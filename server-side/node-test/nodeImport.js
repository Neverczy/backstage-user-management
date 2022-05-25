const nm = require('./nodeExport')

const fdate = nm.timeFormatter(Date.now())
console.log(fdate)
