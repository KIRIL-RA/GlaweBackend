const jwt = require('jsonwebtoken')

require("dotenv").config()

const {AdminSessions, WorkerSessions,UserAdmin,Worker} = require("../Database/models/models")
const WorkerDTO = require("../DTO/Worker.dto")
const UserAdminDTO = require("../DTO/UserAdmin.dto")

const apiErrors = require("../Utils/apiErrors.utils")

class TokenUtils {

    async generateAdminTokens(payload) {

        const accessToken = jwt.sign(payload,process.env.jwt_admin_access_secret,{expiresIn : process.env.jwt_admin_access_max_age})
        const refreshToken = jwt.sign(payload,process.env.jwt_admin_refresh_secret,{expiresIn : process.env.jwt_admin_refresh_max_age})

        const presentInDb = await AdminSessions.findOne({
            where : {
                refesh_token : refreshToken
            }
        })

        if (presentInDb) {
            presentInDb.destroy()
        }

        await AdminSessions.create({
            admin_id : payload.id,
            refesh_token : refreshToken
        })

        return {
            accessToken : accessToken,
            refreshToken : refreshToken
        }
    }

    async generateWorkerTokens(payload) {

        const accessToken = jwt.sign(payload,process.env.jwt_worker_access_secret,{expiresIn : process.env.jwt_worker_access_max_age})
        const refreshToken = jwt.sign(payload,process.env.jwt_worker_refresh_secret,{expiresIn : process.env.jwt_worker_refresh_max_age})

        const presentInDb = await WorkerSessions.findOne({
            where : {
                refesh_token : refreshToken
            }
        })

        if (presentInDb) {
            presentInDb.destroy()
        }

        await WorkerSessions.create({
            worker_id : payload.id,
            refesh_token : refreshToken
        })

        return {
            accessToken : accessToken,
            refreshToken : refreshToken
        }
    }

    checkAdminAccessToken(token) {
        try {
            const isAccessTokenValid = jwt.verify(token,process.env.jwt_admin_access_secret)
            return isAccessTokenValid
        } catch (e) {
            return null
        }
    }

    checkWorkerAccessToken(token) {
        try {
            const isAccessTokenValid = jwt.verify(token,process.env.jwt_worker_access_secret)
            return isAccessTokenValid
        } catch (e) {
            return null
        }
    }


    async refreshAdmin(refreshAdminToken) {
        
        const tokenValid = jwt.verify(refreshAdminToken,process.env.jwt_admin_refresh_secret)
        const presentInDb = await AdminSessions.findOne({
            where : {
                refesh_token : refreshAdminToken
            }
        })

        
        if (tokenValid && presentInDb != "") {
            presentInDb.destroy()

            const user = await UserAdmin.findAll({
                where: {
                    id: tokenValid.id
                }
            })

            const userDTO = new UserAdminDTO(user[0].dataValues)

            const {accessToken,refreshToken} = await this.generateWorkerTokens({...userDTO})
        
        

            return {
                accessToken : accessToken,
                refreshToken : refreshToken,  
                user : userDTO 
            }
        } else {
            throw apiErrors.UnautherizedError()
        }
    }

    async refreshWorker(refreshWorkerToken) {
        const tokenValid = jwt.verify(refreshWorkerToken,process.env.jwt_worker_refresh_secret)
        const presentInDb =  await WorkerSessions.findOne({
            where : {
                refesh_token : refreshWorkerToken
            }
        })
        
        if (tokenValid && presentInDb != "") {
            presentInDb.destroy()
            const user = await Worker.findAll({
                where: {
                    id: tokenValid.id
                }
            })
            const userDTO = new WorkerDTO(user[0].dataValues)

            const {accessToken,refreshToken} = await this.generateWorkerTokens({...userDTO})
        
        

            return {
                accessToken : accessToken,
                refreshToken : refreshToken,  
                user : userDTO 
            }
        } else {
            throw apiErrors.UnautherizedError()
        }
    }

    async exitAdmin(refreshToken) {
        const presentInDb = await AdminSessions.findOne({
            where : {
                refesh_token : refreshToken
            }
        })

        if (presentInDb) {
            presentInDb.destroy()
        }
    }

    async exitWorker(refeshToken) {
        const presentInDb = await WorkerSessions.findOne({
            where : {
                refesh_token : refreshToken
            }
        })

        if (presentInDb) {
            presentInDb.destroy()
        }
    }

    checkDeviceToken(token) {
        try {
            const isDeviceTokenValid = jwt.verify(token,process.env.jwt_device)
            return isDeviceTokenValid
        } catch (e) {
            return null
        }
    }


}

module.exports = new TokenUtils()