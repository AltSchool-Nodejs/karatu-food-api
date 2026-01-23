const UserModel = require('../users/users.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


const RegisterUser = async (userData) => {

    const existingUser = await UserModel.findOne({ email: userData.email });

    if (existingUser) {
        return { status: 400, message: 'User already exists' };
    }

    const user = await UserModel.create(userData);

    const token = await jwt.sign({ userId: user._id  }, JWT_SECRET, { expiresIn: '1h' });

    const _user = user.toObject();
    delete _user.password;
    return { user: _user, token, status: 201, message: 'User registered successfully' };
}


const LoginUser = async (userData) => {
    const user = await UserModel.findOne({ email: userData.email });

    if (!user) {
        return { status: 400, message: 'Invalid credentials' };
    }

    const isPasswordValid = await user.comparePassword(userData.password);

    if (!isPasswordValid) {
        return { status: 400, message: 'Invalid credentials' };
    }

    const token = await jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });


    const _user = user.toObject();
    delete _user.password;
    return { user: _user, token, status: 200, message: 'Login successful' };
}

module.exports = {
    RegisterUser,
    LoginUser
}