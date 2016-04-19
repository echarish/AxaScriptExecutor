var login = require('./login');
var dummy_registration = require('./dummy_registration');
var App_User = require('../models/app_user');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
       // console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        App_User.findById(id, function(err, user) {
            //console.log('deserializing user:',user);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    dummy_registration(passport);

}