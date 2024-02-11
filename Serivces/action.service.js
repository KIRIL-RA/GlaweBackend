const log = require("../Utils/logger.utils")

class ActionService {

    async understandAction(actionTime,actionName,actionType){
        log.info(`${actionName} - ${actionType} - ${actionTime}`)
    }
}

module.exports = new ActionService()