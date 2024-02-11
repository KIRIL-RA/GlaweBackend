const {Router} = require('express')

const router = new Router()


const loginController = require("../Controllers/login.controller")

const authAdminMiddleware = require("../Middleware/authAdmin.middleware")
const authWorkerMiddleware = require("../Middleware/authAdmin.middleware")


router.post("/login_admin",loginController.loginAdmin)
router.post("/login_worker", loginController.loginWorker)
router.post("/exit_worker",loginController.exitWorker)
router.post("/exit_admin", loginController.exitAdmin)

router.post("/refresh_admin",loginController.refreshAdmin)
router.post("/refresh_worker", loginController.refreshWorker)

module.exports = router