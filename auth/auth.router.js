const { Router } = require('express');
const AuthController = require('./auth.controller');
const AuthMiddleware = require('./auth.middleware');
const router = Router();

router.post('/register', AuthMiddleware.ValidateRegisterUser, AuthController.RegisterUser);
router.post('/login', AuthMiddleware.ValidateLoginUser, AuthController.LoginUser);

module.exports = router;