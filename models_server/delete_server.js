var Target_Server = require('../models/target_server');

module.exports = function (request, response) {
    console.log('delet server '+request.body.server_id);


    Target_Server.target_server.remove({_id:request.body.server_id},function (err,deleteResponse) {
        if(err)
            console.log('error in delete server '+err);
        response.redirect('/serverList');
    });

}
