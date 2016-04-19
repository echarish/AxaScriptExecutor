var App_Users = require('../models/app_user');


module.exports=function (request, response) {
    console.log('Getting Registerd Users');
    App_Users.find({},  function(err, registeredUsers) {

       if (err)
           console.log(err);
       
       console.log('registeredUsers on server '+registeredUsers);
       response.render('registeredUsersList', {user: request.user, registeredusers:registeredUsers});
   });

}