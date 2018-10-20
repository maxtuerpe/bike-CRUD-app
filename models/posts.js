const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema ({
    user: {type: mongoose.Schema.Types.ObjectId, require: "User"},
    comments: {type: mongoose.Schema.Types.ObjectId, require: 'Comment'}
})

module.exports = mongoose.model('Post', postsSchema);