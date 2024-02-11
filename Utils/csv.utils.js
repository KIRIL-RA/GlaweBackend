const { createObjectCsvWriter } = require('csv-writer');

class CSVUtils {
    getHeadersFromArray(array) {

        const headers = []

        for (let i = 0; i < array.length; i++) {
            headers.push(({id : `${i}`,title : `${i}`}))
        }

        return headers
    }

    async writeToCSV(filePath,array) {

        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header: this.getHeadersFromArray(array),
            append: true
        })

        await csvWriter.writeRecords([{...array}])
    }

    async readRowFromCSV() {
        
    }
}

module.exports = new CSVUtils()