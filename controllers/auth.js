const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt  = require('bcryptjs');



router.get('/login', async (req, res) => {
    res.render('auth/login.ejs', {
        message: req.session.message
    });    
})
router.get('/register', async (req, res) => {
    res.render('users/new.ejs',);    
})

router.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUserData = {
            username: req.body.username,
            password: passwordHash,
        }
        const user = await User.create(newUserData);
        req.session.loggedIn = true;
        req.session.userId = user._id
        req.session.message = '';
        res.redirect(`/users/${user._id}/edit`);
    } catch (err) {
        res.send(err);
    }
})
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.loggedIn = true;
                req.session.userId = user._id
                res.redirect('/');
            } else {
                req.session.message = "username or password is incorrect"
                res.redirect('/auth/login')
            }
        } else {
            req.session.message = "username or password is incorrect"
            res.redirect('/auth/login')
        } 
    } catch (err) {
        res.send(err);
    }
})
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            res.send(err);
        } else {
            res.render('auth/logout.ejs')
        }
    });
});


module.exports = router;