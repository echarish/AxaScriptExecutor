var mongoose = require('mongoose');
var server_scripts=require('./server_script');

var target_server_schema={
    server_name: String,
    ip_address: String,
    server_user: String,
    server_user_password: String,
    port_number: String,
    project_name:String,
    server_scripts:[server_scripts.server_script_schema]

};

var target_server=mongoose.model('target_server',target_server_schema);



module.exports.target_server = target_server;
module.exports.target_server_schema = target_server_schema;