require("dotenv").config()
const {Sequelize} = require("sequelize")

const log = require("../Utils/logger.utils")

module.exports = new Sequelize(
    process.env.db_name, // databse name
    process.env.db_user, // database user
    process.env.db_password, // database password
    {
        dialect : "postgres",
        host : process.env.db_host,
        port : process.env.db_port,
        logging : msg => log.debug(msg)
    }
)