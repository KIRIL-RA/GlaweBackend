const log = require("../Utils/logger.utils")
const settingsService = require("../Serivces/settings.service")

class SettingsController {
    async setTargetValue(req,res,next) {
        try {


            const {sensor_id,target_value} =  req.body 

            const data = await settingsService.setTargetValue(sensor_id,target_value);

            return res.status(200).json(data)
        } catch (error) {
            log.error(error)
            next()
        }
    }
}

module.exports = new SettingsController()