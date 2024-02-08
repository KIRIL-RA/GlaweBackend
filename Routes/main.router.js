const {Router} = require('express')

const router = new Router()

// const alertRouter = require("./alertsRouter")
// const analyticCalculationRouter = require("./analyticCalculationRouter")
// const consolidationRouter = require("./consolidationRouter")
// const dataRecievingRouter = require("./dataRecievingRouter")
const loginRouter = require("./login.router")
// const productionAndShopMetricsRouter = require("./productionAndShopMetricsRouter")
// const reportGeneratorRouter = require("./reportGeneratorRouter")
const settingsRouter = require("./settings.router")
// const workerAnalyticCalculation = require("./workerAnalyticCalculation")

// router.use(alertRouter)
// router.use(analyticCalculationRouter)
// router.use(consolidationRouter)
// router.use(dataRecievingRouter)
router.use(loginRouter)
// router.use(productionAndShopMetricsRouter)
// router.use(reportGeneratorRouter)
router.use(settingsRouter)
// router.use(workerAnalyticCalculation)

module.exports = router