const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        default: "user"
    }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("users",userSchema);