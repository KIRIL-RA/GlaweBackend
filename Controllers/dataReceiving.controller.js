const dataReceivingService = require("../Serivces/dataReceiving.service")


class DataRecievingController {
    async recieveData(req,res,next) {
        try {

            const {id,deviceToken,type,data} = req.body

            await dataReceivingService.analyzeData(id,deviceToken,type,data)

            return res.status(200).json({
                message : "data received"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new DataRecievingController()