const { boolean } = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    phone:{
        type: String
    },
    address: {
        type: String
    },
    avatar: {
        type: String
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User