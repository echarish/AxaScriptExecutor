var ssh2 = require('ssh2');

var executor_utils = require('../utils/executor_utils');
var Target_Server = require('../models/target_server');


function do_sftp(request, response) {

    transferFile(request, response);
}

function transferFile(request, response) {

    console.log('uploadFileOnServer Request part is ' + JSON.stringify(request.body));
    var server = JSON.parse(request.body.server);
    var user_name = request.body.user_name;
    var folder_location = request.body.folder_location;
    var options = {
        host: server.ip_address,
        port: server.port_number,
        username: server.server_user,
        password: executor_utils.decrypt(server.server_user_password),
        remoteDir: folder_location
    };

    var conn = new ssh2();
    conn.on(
        'connect',
        function () {
            console.log("- connected");
        }
    );

    conn.on(
        'ready',
        function () {
            console.log("- ready");

            conn.sftp(
                function (err, sftp) {
                    if (err) {
                        console.log("Error, problem starting SFTP: %s", err);
                        process.exit(2);
                    }

                    console.log("- SFTP started");

                    var writeStream = sftp.createWriteStream(options.remoteDir + "/" + request.file.originalname);

                    // what to do when transfer finishes
                    writeStream.on(
                        'close',
                        function () {
                            console.log("- file transferred");
                            sftp.end();
                            process.exit(0);
                        }
                    );

                    // initiate transfer of file
                    writeStream.write(request.file.buffer);

                    response.render('batchListOnServer', {user: request.user, server: server});
                }
            );
        }
    );

    conn.on(
        'error',
        function (err) {
            console.log("- connection error: %s", err);
            process.exit(1);
        }
    );

    conn.on(
        'end',
        function () {
            process.exit(0);
        }
    );

    conn.connect(
        options
    );
}


module.exports = {
    do_sftp: do_sftp
};