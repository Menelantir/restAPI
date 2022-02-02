const mongoose = require('mongoose')

require('dotenv').config()
const uri = process.env.MONGO_URI;


const connectDB = async() => {
    try {
        await mongoose.connect(uri)
        console.log('db connected')
    } catch (error) {
        console.log('db not connected')
    }
}

module.exports = connectDB