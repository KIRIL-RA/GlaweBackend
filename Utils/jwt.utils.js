const jwt = require('jsonwebtoken')

require("dotenv").config()

class TokenUtils {

    generateToken(payload) {

        return jwt.sign(payload,process.env.jwt_secret, {expiresIn:"30m"})

    }
}

module.exports = new TokenUtils()