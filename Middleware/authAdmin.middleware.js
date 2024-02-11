const apiError = require("../Utils/apiErrors.utils")
const tokenUtil = require("../Utils/jwt.utils")

module.exports = function(req,res,next) {
    try {


        const {accessToken} = req.body

        const admin = tokenUtil.checkAdminAccessToken(accessToken)

        if (!admin) {
            throw apiError.UnautherizedError()
        }

        req.admin = admin

        next()
        
    } catch (error) {
        return next(apiError.UnautherizedError())
    }
}