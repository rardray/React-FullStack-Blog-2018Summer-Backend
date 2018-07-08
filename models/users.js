var mongoose = require('mongoose');

var schema = mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    admin: Boolean,
    date: String,
    profileImage: String
})

var UserInfo = mongoose.model('users', schema)

module.exports = UserInfo;