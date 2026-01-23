const AuthService = require('./auth.service');

const RegisterUser = async (req, res) => {
    const userData = req.body;
    const user = await AuthService.RegisterUser(userData);
    return res.status(user.status).json(user);
}

const LoginUser = async (req, res) => {
    const userData = req.body;
    const user = await AuthService.LoginUser(userData);
    return res.status(user.status).json(user);
}

module.exports = {
    RegisterUser,
    LoginUser
}