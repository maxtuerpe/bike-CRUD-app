const express = require('express');
const router = express.Router();
const Post = require('../models/posts')
const User = require('../models/users')


router.get('/', (req, res) => {
    console.log(req.session, '')
    Post.find({}, (err, foundPosts) => {
        res.render('posts/index.ejs', {
            posts: foundPosts
        });
    });
});

router.get('/new', (req, res) => {
    console.log(req.session, ' in new route');
    res.render('posts/new.ejs');
});






module.exports = router;


