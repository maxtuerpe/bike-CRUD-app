const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema ({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    img: {type: String, required: true},
    caption: String,
})

module.exports = mongoose.model('Post', postsSchema);





