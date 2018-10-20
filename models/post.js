var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    name: String,
    email: String,
    message:String
});

module.exports = mongoose.model('post', postSchema);
