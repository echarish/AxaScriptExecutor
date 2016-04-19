var connect = require('ssh2-connect');
var exec = require('ssh2-exec');
var Execution_Log = require('../models/execution_log');
var executor_utils = require('../utils/executor_utils');


function executeScript(request, response) {
    var server = JSON.parse(request.body.server);
    var serverOptions = {
        username: request.body.executor_id,
        host: server.ip_address,
        password: request.body.executor_password
    };


    connect(serverOptions, function (err, ssh) {
        child = exec({cmd: request.body.command_value, ssh: ssh, pty: true}, function (err, stdout, stderr) {
            console.log('STD OUT ' + stdout);
            doResponseOperation(server, request, response, err, stdout, stderr);
        });
        child.stdout.on('data', function (data) {
            console.log('DATA ' + data);
            //doResponseOperation(server,request,response, "", data, "");
        });
        child.on('exit', function (code) {
            console.log('Exit', code);
        });
    })



}

function getCurrentTimeDisplay() {
    var time = new Date();
    return time.toLocaleDateString() + " | " + time.toLocaleTimeString()

}

function doResponseOperation(server, request, response, err, stdout, stderr) {
    var execution_log = new Execution_Log();
    execution_log.executed_by = request.body.user_name;
    execution_log.executed_date = getCurrentTimeDisplay();
    execution_log.script_name = request.body.command_value;
    if (err) {
        execution_log.execution_result = err + '\n' + stderr;
    } else {
        execution_log.execution_result = stdout;
    }

    if (execution_log.execution_result == '') {
        execution_log.execution_result = 'We are sorry,\nthere was a issue in connecting to server,\nPlease try again.'
    }
    execution_log.ip_address = server.ip_address;
    execution_log.server_name = server.server_name;
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
}


module.exports = {
    executeScript: executeScript
};