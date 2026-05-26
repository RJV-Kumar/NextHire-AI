const mongoose = require('mongoose')

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[INFO] Connected to database...');
    } catch (err) {
        console.log(`[ERROR] Database connection failed: {err}`)
    }   
}

module.exports = connectToDB