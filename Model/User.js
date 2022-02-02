const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema ({
    name: {
        type: String, 
        required: true
    },
    age: {
        type: Number
    },
    email : {
        type: String,
        required: true
    }
})

module.exports=mongoose.model('User', userSchema)