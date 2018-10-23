const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    bio: String,
    profilePic: {type: String, default: "http://torrentcorp.com/wp-content/uploads/Generic-profile-pic.gif"},

})

module.exports = mongoose.model('User', usersSchema);