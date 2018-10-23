const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    bio: String,
    profilePic: String,

})

module.exports = mongoose.model('User', usersSchema);