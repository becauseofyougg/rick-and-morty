const {Router} = require('express')
const userController = require('../controller/user.controller')
const router = Router()
const {body} = require('express-validator')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 30}),
    userController.registration)
router.post('/login',userController.login)
router.post('/logout',userController.logout)
router.get('/refresh', userController.refresh)


module.exports = router