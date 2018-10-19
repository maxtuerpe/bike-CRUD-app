const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt  = require('bcryptjs');



router.get('/', async (req, res) => {
    res.render('auth/login.ejs', {
        message: req.session.message
    });    
})

router.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        console.log(req.body)
        const password = req.body.password;
        console.log(password);
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        console.log(passwordHash);
        res.send(passwordHash);
    } catch (err) {
        res.send(err);
    }
})


module.exports = router;