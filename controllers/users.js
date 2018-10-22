const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Post = require('../models/posts');
const Comment = require('../models/comments');


router.get('/', async(req,res) => {
    try{
        const users = await User.find({});
        res.render('users/index.ejs', {users});
    }catch(err){
        res.send(err);
    }
})
router.get('/new', (req, res) => {
    res.redirect('/auth/register');
})
router.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id).populate('posts');
        res.render('users/show.ejs', {user});
    } catch(err){
        res.send(err);
    }
})




module.exports = router;