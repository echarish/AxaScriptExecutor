var exec = require('ssh-exec');
var Execution_Log = require('../models/execution_log');
var executor_utils=require('../utils/executor_utils');



var executeShellOnServer = function (request, response) {
    console.log('Execution starting now ..............');
    var server=request.body.server;
    var server_script=request.body.server_script;
    var user=request.body.user;

    var script_name = server_script.script_name;
    var server_name = server.server_name;
    var server_user = server_script.script_executor_id;
    var ip_address =  server.ip_address;
    var script_executor_id = server_script.script_executor_id;
    var script_executor_password = server_script.script_executor_password;
    var executed_by = user.username;
   
    exec(script_name, {
        user: script_executor_id,
        host: ip_address,
        password: executor_utils.decrypt(script_executor_password)
    }, function (err, stdout, stderr) {
        console.log(err, stdout, stderr);
        var execution_log = new Execution_Log();
        execution_log.executed_by = executed_by;
        execution_log.executed_date = getCurrentTimeDisplay();
        execution_log.script_name = script_name;
        if(err){
            execution_log.execution_result = err+'\n'+stderr;
        }else{
            execution_log.execution_result = stdout;
        }



        execution_log.ip_address = ip_address;
        execution_log.server_name = server_name;
        // save the user
        execution_log.save(function (err) {
            if (err) {
                console.log('Execution log save error: ' + err);
                throw err;
            }
            console.log('Execution log save successful ' + execution_log);
            response.write(execution_log.execution_result);
            response.end();
        });
    });
}

function getCurrentTimeDisplay() {
    var time = new Date();
    return time.toLocaleDateString() + " | " + time.toLocaleTimeString()

}


module.exports = {
    executeShellOnServer: executeShellOnServer

}