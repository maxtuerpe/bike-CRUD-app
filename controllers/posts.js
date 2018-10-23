const express = require('express');
const router = express.Router();
const Post = require('../models/posts')
const User = require('../models/users')


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.render('posts/index.ejs', {posts});
    } catch(err) {
        res.send(err);
    }
});

router.get('/new', (req, res) => {
    res.render('posts/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        await Post.create(req.body);
        res.redirect('/posts')
    } catch(err){
        res.send(err);
    }
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        res.render('posts/show.ejs', {
        posts: foundPost
        });
    });
});






module.exports = router;


