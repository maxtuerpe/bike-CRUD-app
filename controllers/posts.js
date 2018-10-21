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

router.post('/', (req, res) => {
    User.findById(req.body.userId, (err,foundUser) => {
        Post.create(req.body, (err, createdPost) => {
            foundUser.posts.push(createdPost);
            foundUser.save((err, data) => {
                res.redirect('/posts')
            });
        });
    })
});






module.exports = router;


