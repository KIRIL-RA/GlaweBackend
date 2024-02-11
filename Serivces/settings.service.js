const {Sensors,TargetValues} = require("../Database/models/models")
const log = require("../Utils/logger.utils")

class SettingsService {
    async setTargetValue(sensor_id,target_value,sensors_type_id) {
        
        const sensorExist = await Sensors.findAll({
            where: {
              id: sensor_id
            }
          })

          if (sensorExist == "") {
            throw ApiError.BadRequest("Таких сенсоров не существует")
          }
    
          const newTargetValue = await TargetValues.create({
            "metric_type"  : "none",
            "target_value" : target_value,
            "sensors_type_id" : sensors_type_id

          })

          await newTargetValue.save()

        return {
            status : "ok"
        }
    }
}

module.exports = new SettingsService()