var Target_Server = require('../models/target_server');


module.exports=function (request, response,ip) {
    console.log('Getting registered servers with IP');
   Target_Server.target_server.find({'ip_address':ip},  function(err, server) {

       if (err)
           console.log(err);
       
       console.log('searching server '+server);
       response.render('batchListOnServer', {user: request.user, server: server});
   });
   // console.log('OUTSIDE '+target_server_list);
   // return target_server_list;
}