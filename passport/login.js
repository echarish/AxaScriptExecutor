var LocalStrategy   = require('passport-local').Strategy;
var App_User = require('../models/app_user');
var executor_utils=require('../utils/executor_utils');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            console.log('Login check for '+username+' '+password+' '+JSON.stringify(req.body));
            // check in mongo if a user with username exists or not
            App_User.findOne({ 'username' :  username },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // User exists but wrong password, log the error 
                    if (!executor_utils.isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        })
    );

}