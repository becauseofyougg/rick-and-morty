const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '15d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId,refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    } 
}

module.exports = new TokenService()