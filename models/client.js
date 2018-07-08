var mongoose = require('mongoose');

var commentsSchema = mongoose.Schema({
    name: String,
    comment: String,
    date: String
})
var schema = mongoose.Schema({
    //_id: String,
    title: String,
    author: String,
    text: String,
    date: String,
    uid: String,
    profileImage: String,
    rawDate: String,
    comments: [commentsSchema]
})

exports.Posts = mongoose.model('posts', schema)
exports.Comments = mongoose.model('comments', schema)
