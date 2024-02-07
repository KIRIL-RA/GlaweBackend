require("dotenv").config()
const bcrypt = require('bcrypt')
const {UserAdmin,Worker} = require("../Database/models/models")

const ApiError = require("../Utils/apiErrors.utils")

const log = require("../Utils/logger.utils")

const UserAdminDTO = require("../DTO/UserAdmin.dto")

const Tokens = require("../Utils/jwt.utils")
const WorkerDTO = require("../DTO/Worker.dto")

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

        log.info(user[0].dataValues)

        // chesk if current password and passwlrd in db are equal
        const isPassEquals = await bcrypt.compare(password,user[0].dataValues.user_password)

        if (!isPassEquals) {
            throw ApiError.BadRequest("Пароль не подходит")
        }

        

        const userDTO = new UserAdminDTO(user[0].dataValues)

        const token= Tokens.generateToken({...userDTO})
    
    

        return {
            token: token,  
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

        const token= Tokens.generateToken({...userDTO})
    
    

        return {
            token: token,  
            user : userDTO 
        }

    }

    
}

module.exports = new LoginService()