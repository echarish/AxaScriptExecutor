var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var server_script_schema=new mongoose.Schema({
    script_type: String,
    script_name: String,
    batch_name: String,
    script_executor_id: String,
    script_executor_password:String,
    project_name:String
});

server_script_schema.plugin(autoIncrement.plugin,'server_script');

module.exports.server_script_schema=server_script_schema;

module.exports.server_script=mongoose.model('server_script',server_script_schema);
