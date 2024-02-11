const {Router} = require("express")

const router = new Router()


const settingsController = require("../Controllers/settings.controller")
const authAdminMiddleware = require("../Middleware/authAdmin.middleware")

router.post("/set_traget_value",authAdminMiddleware,settingsController.setTargetValue)

module.exports = router