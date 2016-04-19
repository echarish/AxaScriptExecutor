var register_server = require('./register_server');
var registered_server_list = require('./register_server_list');
var register_server_script = require('./register_server_script')
var find_server = require('./find_server')
var find_server_script=require('./find_server_script')
var find_execution_log=require('./find_execution_log');
var find_registered_users=require('./find_registered_users');
var delete_server=require('./delete_server');
var delete_server_script=require('./delete_server_script');
var register_new_user=require('./register_new_user');
var delete_user=require('./delete_user');
var find_ind_server_script=require('./find_ind_server_script');
var register_ind_server_script=require('./register_ind_server_script');
var delete_ind_script=require('./delete_ind_script');
var attach_server_scripts=require('./attach_server_script');


module.exports = {
    register_server: register_server,
    registered_server_list: registered_server_list,
    register_server_script: register_server_script,
    find_server: find_server,
    find_server_script:find_server_script,
    find_execution_log:find_execution_log,
    find_registered_users:find_registered_users,
    delete_server:delete_server,
    delete_server_script:delete_server_script,
    register_new_user:register_new_user,
    delete_user:delete_user,
    find_ind_server_script:find_ind_server_script,
    register_ind_server_script:register_ind_server_script,
    delete_ind_script:delete_ind_script,
    attach_server_scripts:attach_server_scripts
}