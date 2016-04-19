var mongoose = require('mongoose');
var target_server=require('./target_server');

var project=mongoose.model('target_server',{
    project_name: String,
    target_severs:[target_server.target_server_schema]

});



module.exports.project = project;