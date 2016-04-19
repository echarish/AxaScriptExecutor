var Target_Server = require('../models/target_server');
var Server_Script = require('../models/server_script');

module.exports = function (request, response) {
    Target_Server.target_server.find({_id: request.body.server_id}, function (err, server) {
        console.log('Attaching scripts to server ');
        console.log(request.body.server_id);
        if (err) {
            console.log('found error while searching for server ');
        }
        var scriptArray = JSON.parse(request.body['attach_scripts']);
        console.log(' SCRIPT ARRAY '+scriptArray.length+' '+scriptArray.constructor);
        console.log(scriptArray+' SCRIPT ARRAY '+scriptArray.length+' '+scriptArray.constructor);
        var serverObject = server[0];
        console.log(serverObject);
        var script_length = serverObject.server_scripts.length;
        console.log('script_length ' + script_length+' and attach lenght is '+scriptArray.length+' prototype.toString '+scriptArray.prototype);
        for (var i = 0; i < scriptArray.length; i++) {
            console.log('Inside FOR LOOP DOING process '+i+' SCRIPTI ARRAY is  '+scriptArray[i]+' Type is ');
            var scriptArrayValObject = JSON.parse(scriptArray[i]);
            var server_script = new Server_Script.server_script();

            server_script.script_type = scriptArrayValObject['script_type'];
            server_script.script_name = scriptArrayValObject['script_name'];
            server_script.batch_name =scriptArrayValObject['batch_name'];
            // server_script.user_name = request.body.user_name;
            server_script.script_executor_id = scriptArrayValObject['script_executor_id'];
            server_script.script_executor_password = scriptArrayValObject['script_executor_password'];
            server_script.project_name =  scriptArrayValObject['project_name'];
            server_script._id= script_length+i+1;
            console.log( server_script._id);

            console.log(server_script);

            Target_Server.target_server.findByIdAndUpdate(
                request.body.server_id,
                {$push: {"server_scripts": server_script}},
                {safe: true, upsert: true, new: true},
                function (err, server) {
                    console.log('server_script attachment on  Server Registration succesful ' + server);
                }
            );
        }

        Target_Server.target_server.find({_id: request.body.server_id}, function (err, server) {

            console.log('Making server find again to send response back '+server);
            response.render('batchListOnServer', {user: request.user, server: server[0]});
        });


    });


}