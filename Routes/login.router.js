const {Router} = require('express')

const router = new Router()


const loginController = require("../Controllers/login.controller")

router.post("/login_admin",loginController.loginAdmin)
router.post("/login_worker", loginController.loginWorker)
router.post("/exit_worker",loginController.exitWorker)
router.post("/exit_admin", loginController.exitAdmin)

module.exports = router