const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema ({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment: String,
})

module.exports = mongoose.model("Comment", commentsSchema);
