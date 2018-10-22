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
    } else {
        res.locals.loggedIn = false;
    }
    next();
})
app.get('/', (req, res) => {
    res.render('index.ejs');
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('short'));


app.use('/auth', authController);
app.use('/posts', postsController);
app.use('/users', usersController);



app.listen(3000, () => {
    console.log('server running on port 3000');
})





