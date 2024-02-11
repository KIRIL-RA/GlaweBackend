const ApiError = require('../Utils/apiErrors.utils')

const log = require("../Utils/logger.utils")

module.exports = function (err, req,res,next) {
    log.error(err)

    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors :err.errors})
    }

    return res.status(500).json({message : "unexpected error"})
}