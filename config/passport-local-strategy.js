const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authantication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(email,password,done){
        User.findOne({email: email},function(err,user){
            if(err){
                console.log('error while getting user information');
                return(done(err));
            }
            if(!user || password !== user.password){
                console.log('Incorrect password');
                return done(null,false);
            }
            return done(null,user);
        })
    }
));

passport.serializeUser(function(user,done){
    return done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('err in finding user');
            return done(err);
        }
        return done(null,user);
    })
});

passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;