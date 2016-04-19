var Execution_Log = require('../models/execution_log');


module.exports=function (request, response) {
    console.log('Getting Execution Log');
    Execution_Log.find({},  function(err, executionlog) {

       if (err)
           console.log(err);
       
       console.log('Execution on server '+executionlog);
       response.render('executionLogList', {user: request.user, executionlog:executionlog});
   });
   // console.log('OUTSIDE '+target_server_list);
   // return target_server_list;
}