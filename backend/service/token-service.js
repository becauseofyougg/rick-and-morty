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
    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData
    }
    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData
    }
    async verifyAccessToken(){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }
    async verifyRefreshToken(){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }
}

module.exports = new TokenService()