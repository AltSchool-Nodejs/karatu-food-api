const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/karatu-food-api').then(() => {
        console.log('Connected to MongoDB successfully');
    }).catch((err) => {
        console.log(err);
        console.log('Failed to connect to MongoDB');
    });
}

module.exports = { connectDB };