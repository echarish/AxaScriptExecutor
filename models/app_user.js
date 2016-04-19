
var mongoose = require('mongoose');

module.exports = mongoose.model('app_user',{
	username: String,
	password: String,
	email: String,
	first_name: String,
	last_name: String,
	user_role:String
});