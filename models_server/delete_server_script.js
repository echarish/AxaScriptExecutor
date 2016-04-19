var Target_Server = require('../models/target_server');

module.exports = function (request, response) {
    console.log('delet server Script '+request.body.server_id+' '+request.body.server_script_id);

    /*Target_Server.target_server.find({_id:request.body.server_id},function (err,deleteResponse) {

     db.target_servers.update({},{$pull:{server_scripts:{}}},false,false)
     });
     */

    /*Target_Server.target_server.update(
        {_id: request.body.server_id},
        {$pull: {server_scripts: {_id:request.body.server_script_id}}},
        false, false);*/

    Target_Server.target_server.findByIdAndUpdate(
        request.body.server_id,
        {$pull: {"server_scripts": {_id:request.body.server_script_id}}},
        {safe: true, upsert: true, new: true},
        function (err, server) {
            console.log('server_script deletion on  Server Registration succesful ' + server);
            response.render('batchListOnServer', {user: request.user, server: server});
        }
    );

}
