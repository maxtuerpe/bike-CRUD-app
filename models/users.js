const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema ({
    username: {type: String, required: true},
    password: {type: String, required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, required: 'Post'}]

})

module.exports = mongoose.model('User', usersSchema);