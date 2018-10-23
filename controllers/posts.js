const express = require('express');
const router = express.Router();
const Post = require('../models/posts')
const User = require('../models/users')


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({}).populate("user");
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
        const post = await Post.create(req.body);
        const user = await User.findById(req.body.user);
        user.posts.push(post._id)
        await user.save();
        res.redirect('/posts')
    } catch(err){
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        post = await Post.findById(req.params.id).populate("user");
        res.render('posts/show.ejs', {post});
    } catch(err) {
        res.send(err);
    }
});






module.exports = router;


