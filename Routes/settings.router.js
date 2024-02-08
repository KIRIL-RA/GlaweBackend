const {Router} = require("express")

const router = new Router()


const settingsController = require("../Controllers/settings.controller")

router.post("/set_traget_value",settingsController.setTargetValue)

module.exports = router