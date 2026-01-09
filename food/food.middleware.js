const Joi = require('joi');

const ValidateFood = (req, res, next) => {

    const foodSchema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().required(),
        menu: Joi.string().required()
    });

    const { error } = foodSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message, status: 400 });
    }

    
    next()

}

module.exports = {
    ValidateFood
}