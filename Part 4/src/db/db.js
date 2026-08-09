const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI);   // If there is no database named "halley", it will create one

    console.log("Conneted to DB");
}

module.exports = connectDB