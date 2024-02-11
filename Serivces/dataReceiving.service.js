const apiError = require("../Utils/apiErrors.utils")
const fs = require("fs")
require("dotenv").config()
const log = require("../Utils/logger.utils")

const actoinService = require("../Serivces/action.service")

const csv = require("../Utils/csv.utils")

class DataReceivingService {
    
    async analyzeData(id,deviceToken,type,data){

        
        // we checking the type of the device ...
        switch(type) {
            case "crm": {

                const dataValues = data.replace(" ","").split(",")

                await actoinService.understandAction(dataValues[0],dataValues[1],dataValues[2])

                
            }

            case "machine" : {

                // path to csv folder for current machine ...
                const csvPath = `${process.env.file_path}/machinesCSV/${id}`

                // name of the in which data for current machine is placed
                const fileName = `${csvPath}/${new Date().getDay()}.csv`

                // if folder with such name and time doesn't exist for current device the folder is createds
                if (!fs.existsSync()) {
                    fs.mkdirSync(csvPath,{recursive:true})
                }

                // getting data from data and converting it to correct way
                const csvData = []
                csvData.push(id)
                data.split(",").map(value => csvData.push(value))

                await csv.writeToCSV(fileName,csvData)

                log.info("file written succesfully")
                    
            }
        }

        log.info(`received data from device : ${type} ~ ${id}`)
    }

}

module.exports = new DataReceivingService()