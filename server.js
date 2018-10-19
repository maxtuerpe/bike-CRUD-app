const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
const morgan         = require('morgan');
// CONTROLLERS
const authController = require('./controllers/auth');

require('./db/db');

app.use(session({
    secret: 'This is some random secret string',
    resave: false,
    saveUninitialized: false
}));
app.get('/', (req, res) => {
    res.render('index.ejs');
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('short'));


app.use('/auth', authController);



app.listen(3000, () => {
    console.log('server running on port 3000');
})





