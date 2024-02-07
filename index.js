const express = require("express")
const db = require("./Database/db")

const models = require("./Database/models/models")

const errorMiddleware = require("./Middleware/error.middleware")


const log = require("./Utils/logger.utils")

const mainRouter = require("./Routes/main.router")

// load config ...
require("dotenv").config

// important variables

const port = process.env.server_port || 5000

const app = express()

app.use(express.json())
app.use("/api/v1",mainRouter)
app.use(errorMiddleware)

const start = async() => {
    try {
        await db.authenticate()
        await db.sync()

        app.listen(port,() => {
            log.info(`server started on port ${port}`)
        })
    } catch (error) {
        log.error(error)
    }
    
}

start()