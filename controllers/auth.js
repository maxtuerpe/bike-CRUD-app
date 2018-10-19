const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt  = require('bcryptjs');



router.get('/login', async (req, res) => {
    res.render('auth/login.ejs', {
        message: req.session.message
    });    
})

router.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUserData = {
            username: req.body.username,
            password: passwordHash,
        }
        await User.create(newUserData);
        req.session.loggedIn = true;
        req.session.message = '';
        res.render('index.ejs');
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
                res.render('index.ejs');
            } else {
                req.session.message = "wrong username or password"
                res.redirect('/auth/login')
            }
        } else {
            req.session.message = "wrong username or password"
            res.redirect('/auth/login')
        }
        res.send('working'); 
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