const User = require('../models/user')

module.exports.profile = function(req,res){
    return res.send('<h1>Profile page</h1>');
}

module.exports.singnIn = function(req,res){
    return res.render('sign-in',{
        title: "sign-in"
    });
}

module.exports.singnUp = function(req,res){
    return res.render('sign-up',{
        title: "sign-up"
    });
}
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        console.log('password and confirm password must be same')
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/login');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}