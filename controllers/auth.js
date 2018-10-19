const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt  = require('bcryptjs');



router.get('/', async (req, res) => {
    res.render('auth/login.ejs', {
        message: req.session.message
    });    
})


module.exports = router;