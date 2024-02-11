const apiError = require("../Utils/apiErrors.utils")
const tokenUtil = require("../Utils/jwt.utils")

module.exports = function(req,res,next) {
    try {


        const {deviceToken} = req.body

        const device = tokenUtil.checkDeviceToken(deviceToken)

        if (!device) {
            throw apiError.UnautherizedError()
        }

        req.device = device

        next()
        
    } catch (error) {
        return next(apiError.UnautherizedError())
    }
}