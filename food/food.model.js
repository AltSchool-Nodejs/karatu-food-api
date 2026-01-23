const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0, },
    menu: { type: String, required: true },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
