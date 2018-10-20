const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema ({
    user: {type: mongoose.Schema.Types.ObjectId, required: "User"},
    
})