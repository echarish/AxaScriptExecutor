var App_User = require('../models/app_user');

module.exports = function (request, response) {
    console.log('delet user '+request.body.user_id);


    App_User.remove({_id:request.body.user_id},function (err,deleteResponse) {
        if(err)
            console.log('error in delete server '+err);
        response.redirect('/registeredUsersList');
    });

}
