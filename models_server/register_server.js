var Target_Server = require('../models/target_server');
var executor_utils=require('../utils/executor_utils');

module.exports = function (request, response) {
    console.log('server registration.js ');


    Target_Server.target_server.findOne({'ip_address': request.body.ip_address}, function (err, serverDetails) {
        if (err) {
            console.log('server registration.js  Error in registration : ' + err);
            response.render("error",{message:"Server reistration failed",error:{code:"ERR-101",type: err}});
        }

        if (serverDetails) {
            console.log('Server already exists with IP Address : ' + request.body.ip_address);
            response.render("error",{message:"Server reistration failed",error:{code:"ERR-102",type:"Server with IP address exist"}});
        } else {
            var targetServer = new Target_Server.target_server();
            targetServer.server_name = request.body.server_name;
            targetServer.ip_address = request.body.ip_address;
            targetServer.port_number = request.body.port_number;
            targetServer.server_user = request.body.server_user;
            targetServer.server_user_password = executor_utils.encrypt(request.body.server_user_password);
            targetServer.project_name = request.body.project_name;

            // save the server
            targetServer.save(function (err) {
                if (err) {
                    console.log('server registration.js  Error in Saving user: ' + err);
                    throw err;
                }
                console.log('server registration.js  Server Registration succesful ' + targetServer);
                response.redirect('/serverList');
            });

        }
    });
}
