const loginService = require("../Serivces/login.service")

const log = require("../Utils/logger.utils")


class LoginController {
    async loginAdmin(req,res,next) {
        try {
            const {login,password} = req.body

            const userData = await loginService.loginAdmin(login,password)

        
            return res.status(200).json(userData)
        } catch (error) {
            log.error(error)
            next()
        }
    }

    async loginWorker(req,res,next) {
        try {
            const {login,password} = req.body

            log.info(`${login} ${password}`)

            const userData = await loginService.loginWorker(login,password)

        
            return res.status(200).json(userData)
            
        } catch (error) {
            log.error(error)
            next()
        }
    }

    async exitAdmin(req,res,next) {
        try {
            return res.status(200).json({
                status : "succesfull"
            })
        } catch (error) {
            console.log(error);
        }
    }

    async exitWorker(req,res,next) {
        try {
            return res.status(200).json({
                status : "succesfull"
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new LoginController()