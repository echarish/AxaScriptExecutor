var executor_utils=require('../utils/executor_utils');
var App_User = require('../models/app_user');

module.exports = function (request, response) {
    console.log('server registration.js ');
    var username= request.body.username;

    App_User.findOne({ 'username' :  username }, function(err, user) {

        // In case of any error, return using the done method
        if (err){
            console.log('registration.js  Error in SignUp: '+err);
            response.render("error",{message:"User registration failed",error:{code:"ERR-105",type: err}});
        }
        // already exists
        if (user) {
            console.log('registration.js  User already exists with username: '+username);
            response.render("error",{message:"Server reistration failed",error:{code:"ERR-101",type: 'User already exists'}});
        } else {
            // if there is no user with that email
            // create the user
            console.log('registration.js User not exists with username: '+username);
            var newUser = new App_User();

            // set the user's local credentials
            newUser.username = request.body.username;
            newUser.password = executor_utils.createHash(request.body.password);
            newUser.email = request.body.email;
            newUser.first_name = request.body.first_name;
            newUser.last_name = request.body.last_name;
            newUser.user_role=request.body.user_role;

            // save the user
            newUser.save(function(err) {
                if (err){
                    console.log('registration.js  Error in Saving user: '+err);

                }
                console.log('registration.js  User Registration succesful '+newUser);
               response.redirect('/registeredUsersList');
            });
        }
    });
}


