const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection successfully");
    } catch (err) {
        console.log("Database connnection error : ", err);
    }
}

module.exports = connectDB;