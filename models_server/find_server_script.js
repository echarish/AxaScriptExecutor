var Server_Script = require('../models/server_script');
var Target_Server = require('../models/target_server');

module.exports=function (request, response,ip) {
    console.log('Fetching server and script list lists');

    Target_Server.target_server.find({'ip_address':ip},  function(err, server) {

        if (err)
            console.log(err);

        console.log('Server object is '+server[0]);
        response.render('batchListOnServer', {user: request.user, server: server[0]});

    });
}