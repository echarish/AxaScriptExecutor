var Server_Script = require('../models/server_script');


module.exports=function (request, response,selector) {
    console.log('Fetching server and script list lists');

    Server_Script.server_script.find({},  function(err, server_scripts) {

        if (err)
            console.log(err);

        
        console.log(selector+' Server server_scripts is '+server_scripts);
        response.render('serverScriptsList', {user: request.user, server_scripts: server_scripts, selector:selector,server_id:request.query.server_id});

    });
}