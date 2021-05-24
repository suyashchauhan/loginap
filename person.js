const mongoose = require('mongoose')
const personModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
})
module.exports = mongoose.model('Person', personModel)