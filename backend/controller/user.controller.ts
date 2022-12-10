const userService = require("../service/user.service")
const { validationResult } = require('express-validator')
const apiError = require("../exeptions/api-error")

class UserController {
    async registration(req,res,next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(apiError.BadRequest("Validation error", errors.array()))
            }
            const {email,password,bio} = req.body
            const userData = await userService.registration(email,password,bio)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 14 * 24 * 3600 * 1000, httpOnly: true})
            res.json(userData)        
        } catch (error) {
            next(error)
        }
    }
    async login(req,res,next) {
        try {
            const {email,password} = req.body
            const userData = await userService.login(email,password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 14 * 24 * 3600 * 1000, httpOnly: true})
            res.json(userData) 
        } catch (error) {
            next(error)
        }
    }
    async logout(req,res,next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken')
            return res.json(200)
        } catch (error) {
            next(error)
        }
    }
    async refresh(req,res,next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 14 * 24 * 3600 * 1000, httpOnly: true})
            res.json(userData) 
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()