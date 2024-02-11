const {Router} = require("express")

const router = new Router()

const DataRecievingController = require("../Controllers/dataReceiving.controller") 

router.post("/recieve_data",DataRecievingController.recieveData)


module.exports = router