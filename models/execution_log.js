
var mongoose = require('mongoose');

module.exports = mongoose.model('execution_log',{
    server_name: String,
    ip_address: String,
	executed_by:String,
    executed_date:String,
    script_name:String,
    execution_result:String
});