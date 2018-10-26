const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
const morgan         = require('morgan');
// CONTROLLERS
const authController = require('./controllers/auth');
const postsController = require('./controllers/posts');
const usersController = require('./controllers/users');

require('./db/db');

app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use(session({
    secret: 'This is some random secret string',
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next)=>{
    if(req.session.loggedIn){
        res.locals.loggedIn = true;
        res.locals.userId = req.session.userId
    } else {
        res.locals.loggedIn = false;
        res.locals.userId = false;
    } 
    if(req.session.message){
        res.locals.message = req.session.message
    } else {
        
        res.locals.message = '';
    }
    req.session.message = '';
    next();
})
app.get('/', (req, res) => {
    res.redirect('/posts');
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('short'));


app.use('/auth', authController);
app.use('/posts', postsController);
app.use('/users', usersController);


port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('server running on port' + port);
})





