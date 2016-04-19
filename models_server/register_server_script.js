var Target_Server = require('../models/target_server');
var Server_Script = require('../models/server_script');
var executor_utils=require('../utils/executor_utils');


module.exports = function (request, response) {

    var server_script = new Server_Script.server_script();

    server_script.script_type = request.body.script_type;
    server_script.script_name = request.body.script_name;
    server_script.batch_name = request.body.batch_name;
   // server_script.user_name = request.body.user_name;
    server_script.script_executor_id = request.body.script_executor_id;
    server_script.script_executor_password = executor_utils.encrypt(request.body.script_executor_password);
    server_script.project_name = request.body.project_name;

    Target_Server.target_server.find({_id: request.body.server_id}, function (err, server) {
        if (err) {
            console.log('found error while searching for server ');
        }
        var serverObject = server[0];
        console.log(serverObject);
        var script_length = serverObject.server_scripts.length;
        console.log('script_length ' + script_length);
        server_script._id = script_length + 1;
        Target_Server.target_server.findByIdAndUpdate(
            request.body.server_id,
            {$push: {"server_scripts": server_script}},
            {safe: true, upsert: true, new: true},
            function (err, server) {
                console.log('server_script registration  Server Registration succesful ' + server);
                response.render('batchListOnServer', {user: request.user, server: server});
            }
        );


    });


}