require("dotenv").config()
const bcrypt = require('bcrypt')
const {UserAdmin,Worker} = require("../Database/models/models")

const ApiError = require("../Utils/apiErrors.utils")

const log = require("../Utils/logger.utils")

const UserAdminDTO = require("../DTO/UserAdmin.dto")
const WorkerDTO = require("../DTO/Worker.dto")


const Tokens = require("../Utils/jwt.utils")


class LoginService {
    
    async loginAdmin(login,password) {


        // check if a user with such login exist
        const user = await UserAdmin.findAll({
            where: {
                user_login: login
            }
        })

        // checks if user doesn't exist
        if (user == "") {
            throw ApiError.BadRequest("Пользователь не был найден")
        }

        // chesk if current password and passwlrd in db are equal
        const isPassEquals = await bcrypt.compare(password,user[0].dataValues.user_password)

        if (!isPassEquals) {
            throw ApiError.BadRequest("Пароль не подходит")
        }

        

        const userDTO = new UserAdminDTO(user[0].dataValues)

        const {accessToken,refreshToken} = await Tokens.generateAdminTokens({...userDTO})
    
    

        return {
            accessToken : accessToken,
            refreshToken : refreshToken,  
            user : userDTO 
        }

    }

    async loginWorker(login,password) {


        // check if a user with such login exist

        const user = await Worker.findAll({
            where: {
                worker_login: login
            }
        })

        // checks if user doesn't exist
        if (user == "") {
            throw ApiError.BadRequest("Пользователь не был найден")
        }


        // chesk if current password and passwlrd in db are equal
        const isPassEquals = await bcrypt.compare(password,user[0].dataValues.worker_password)

        if (!isPassEquals) {
            throw ApiError.BadRequest("Пароль не подходит")
        }

        

        const userDTO = new WorkerDTO(user[0].dataValues)

        const {accessToken,refreshToken} = await Tokens.generateWorkerTokens({...userDTO})
    
    

        return {
            accessToken : accessToken,
            refreshToken : refreshToken,  
            user : userDTO 
        }

    }

    async exitAdmin(refeshToken) {
        await Tokens.exitAdmin(refeshToken)
    }

    async exitWorker(refeshToken) {
        await Tokens.exitWorker(refeshToken)
    }

    async refreshAdmin(refeshToken) {
        
        return await Tokens.refreshAdmin(refeshToken)
    }

    async refreshWorker(refeshToken) {
        return await Tokens.refreshWorker(refeshToken)
    }

    
}

module.exports = new LoginService()