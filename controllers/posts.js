const express = require('express');
const router = express.Router();
const Post = require('../models/posts')
const User = require('../models/users')
const Comment = require('../models/comments')
const requireLoggin  = require('../middleware/requireLoggin');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({}).populate("user");
        res.render('posts/index.ejs', {posts});
    } catch(err) {
        res.send(err);
    }
});

router.get('/new', requireLoggin, (req, res) => {
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
        post = await Post.findById(req.params.id).populate("user").populate({ 
            path: "comments",
            populate: {
                path: "user",
            }
        });
        res.render('posts/show.ejs', {post, message: res.locals.message});
    } catch(err) {
        res.send(err);
    }
});
router.post('/:id', requireLoggin, async (req, res) => {
    try{
        const comment = await Comment.create(req.body);
        const post = await Post.findById(req.params.id);
        post.comments.push(comment._id);
        await post.save();
        res.redirect(`/posts/${req.params.id}`);
    }catch(err){
        res.send(err);
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.id);
        res.render('posts/edit.ejs', {post: foundPost});
    } catch(err) {
        res.send(err);
    }
});



// router.get('/:id/edit', (req, res) => {
//     Post.findById(req.params.id, (err, foundPost) => {
//         res.render('posts/edit.ejs', {post: foundPost})
//     })
// })






module.exports = router;


