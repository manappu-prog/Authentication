const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose.js');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const port = 5000;

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('static'));


app.use(session({
    name: 'authsystem',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index.js'));

app.listen(port,(err) => {
    if(err){
        console.log(err);
        return;
    }   
    console.log(`server is up and running on port ${port}`);
})