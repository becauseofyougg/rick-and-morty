const userService = require("../service/user-service")
const { validationResult } = require('express-validator')
const ApiError = require("../exeptions/api-error")

class UserController {
    async registration(req,res,next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }
            const {email,password} = req.body
            const userData = await userService.registration(email,password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 14 * 24 * 3600 * 1000, httpOnly: true})
            res.json(userData)        
        } catch (error) {
            next(error)
        }
    }
    async login(req,res,next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async logout(req,res,next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async refresh(req,res,next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async getUsers(req,res,next) {
        try {
            res.json(['qwe','qwewdf'])
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()