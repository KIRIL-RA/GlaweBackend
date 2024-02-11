const apiError = require("../Utils/apiErrors.utils")
const tokenUtil = require("../Utils/jwt.utils")

module.exports = function(req,res,next) {
    try {


        const {accessToken} = req.body

        const worker = tokenUtil.checkWorkerAccessToken(accessToken)

        if (!worker) {
            throw apiError.UnautherizedError()
        }

        req.worker = worker

        next()
        
    } catch (error) {
        return next(apiError.UnautherizedError())
    }
}