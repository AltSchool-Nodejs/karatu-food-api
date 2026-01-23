const Joi = require('joi');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const ValidateRegisterUser = async (req, res, next) => {
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = await userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message, status: 400 });
    }

    next();
}

const ValidateLoginUser = async (req, res, next) => {
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = await userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message, status: 400 });
    }

    next();
}

const ValidateToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        token = token.split(' ')[1]; // Bearer <token> -> [<Bearer>, <token>] -> <token>

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized', status: 401 });
        }

        const decoded = await jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized', status: 401 });
        }

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Unauthorized', status: 401 });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired', status: 401 });
        }
        return res.status(401).json({ message: 'Unauthorized', status: 401 });
    }
}

module.exports = {
    ValidateRegisterUser,
    ValidateLoginUser,
    ValidateToken
}