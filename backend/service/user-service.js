const UserModel = require("../models/user-model")
const tokenService = require("./token-service")
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcrypt')
const ApiError = require("../exeptions/api-error")

class UserService {
    async registration(email, password) {
        const personToRegister = await UserModel.findOne({email})
        if (personToRegister) {
            throw ApiError.BadRequest('User already exists')
        }
        const hashedPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({email, password: hashedPassword})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({ ...userDto})
        await tokenService.saveToken(userDto.id , tokens.refreshToken)

        return {
            ...tokens, user: userDto
        }
    }
}

module.exports = new UserService()