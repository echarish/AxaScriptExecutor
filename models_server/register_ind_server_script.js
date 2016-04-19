var Server_Script = require('../models/server_script');
var executor_utils=require('../utils/executor_utils');


module.exports = function (request, response) {

    var server_script = new Server_Script.server_script();

    server_script.script_type = request.body.script_type;
    server_script.script_name = request.body.script_name;
    server_script.batch_name = request.body.batch_name;
   // server_script.user_name = request.body.user_name;
    server_script.script_executor_id = request.body.script_executor_id;
    server_script.script_executor_password = executor_utils.encrypt(request.body.script_executor_password);
    server_script.project_name = request.body.project_name;
    
    if(request.body.script_id==""){
        server_script.save(function (err) {
            if (err) {
                console.log('server_script server_script.js  Error in Saving user: ' + err);
                throw err;
            }
            console.log('server_script server_script.js  Server Registration succesful ' + server_script);
            response.redirect('/registeredShellScripts');
        });
    }else{
        server_script._id=request.body.script_id;

        Server_Script.server_script.findOneAndUpdate({_id:request.body.script_id}, server_script, {upsert:true}, function(err, doc){
            if (err) return res.send(500, { error: err });
            console.log('server_script server_script.js  update done succesful ' + server_script);
            response.redirect('/registeredShellScripts');
        });
        
    }
    
    


}