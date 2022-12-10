const UserModel = require("../models/user.model")
const tokenService = require("./token.service")
const UserDto = require('../dtos/user.dto')
const bcrypt = require('bcrypt')
const ApiErrors = require("../exeptions/api-error")

class UserService {
    async registration(email, password,bio) {
        const personToRegister = await UserModel.findOne({email})
        if (personToRegister) {
            throw ApiErrors.BadRequest('User already exists')
        }
        const hashedPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({email, password: hashedPassword, bio})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({ ...userDto})
        await tokenService.saveToken(userDto.id , tokens.refreshToken)

        return {
            ...tokens, user: userDto
        }
    }
    async login(email, password) {
        const personToLogin = await UserModel.findOne({email})
        if (!personToLogin) {
            throw ApiErrors.BadRequest('User wasnt found')
        }
        const isPassEqual = await bcrypt.compare(password, personToLogin.password)
        if(!isPassEqual) {
            throw ApiErrors.BadRequest('Wrong password')
        }
        const userDto = new UserDto(personToLogin)
        const tokens = tokenService.generateToken({ ...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens, user: userDto
        }
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiErrors.UnauthorizedError()
        }
        const userData = tokenService.verifyRefreshToken(refreshToken)
        const tokenDB = await tokenService.findToken(refreshToken)
        if (!userData || !tokenDB) {
            throw ApiErrors.UnauthorizedError()
        }
        const personToRefresh = await UserModel.findById(userData.id)
        const userDto = new UserDto(personToRefresh)
        const tokens = tokenService.generateToken({ ...userDto})
        await tokenService.saveToken(userDto.id , tokens.refreshToken)

        return {
            ...tokens, user: userDto
        }
    }
}

module.exports = new UserService()