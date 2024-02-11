const loginService = require("../Serivces/login.service")

const log = require("../Utils/logger.utils")


class LoginController {
    async loginAdmin(req,res,next) {
        try {
            const {login,password} = req.body

            const userData = await loginService.loginAdmin(login,password)

        
            return res.status(200).json(userData)
        } catch (error) {
            next(error)
        }
    }

    async loginWorker(req,res,next) {
        try {
            const {login,password} = req.body

            const userData = await loginService.loginWorker(login,password)

        
            return res.status(200).json(userData)
            
        } catch (error) {
            next(error)
        }
    }

    async exitAdmin(req,res,next) {
        try {

            const {refreshToken} = req.body

            await loginService.exitAdmin(refreshToken)

            return res.status(200).json({
                status : "succesfull"
            })
        } catch (error) {
            next(error)
        }
    }

    async exitWorker(req,res,next) {
        try {

            const {refreshToken} = req.body

            await loginService.exitWorker(refreshToken)

            return res.status(200).json({
                status : "succesfull"
            })
        } catch (error) {
            next(error)
        }
    }

    async refreshAdmin(req,res,next) {
        try {

            const {refreshToken} = req.body

            const data = await loginService.refreshAdmin(refreshToken)

            return res.status(200).json(
                data
            )
        } catch (error) {
            next(error)
        }
    }

    async refreshWorker(req,res,next) {
        try {

            const {refreshToken} = req.body

            const data = await loginService.refreshWorker(refreshToken)

            return res.status(200).json(
                data
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginController()