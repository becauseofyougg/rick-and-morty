const {Router} = require('express')
const UserController = require('../controller/user-controller')
const router = Router()
const {body} = require('express-validator')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 30}),
    UserController.registration)
router.post('/login',UserController.login)
router.post('/logout',UserController.logout)
router.get('/refresh', UserController.refresh)
router.get('/users', UserController.refresh)


module.exports = router