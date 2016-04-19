var Server_Script = require('../models/server_script');

module.exports = function (request, response) {
    console.log('delet server '+request.body.script_id);


    Server_Script.server_script.remove({_id:request.body.script_id},function (err,deleteResponse) {
        if(err)
            console.log('error in delete server '+err);
        response.redirect('/registeredShellScripts');
    });

}
