const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Post = require('../models/posts');
const Comment = require('../models/comments');


router.get('/', async(req,res) => {
    try{

    }catch(err){
        res.send(err);
    }
})



module.exports = router;