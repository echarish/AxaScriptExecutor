var Target_Server = require('../models/target_server');


module.exports=function (request, response,isHome) {
    console.log('Getting list of registered servers');
   Target_Server.target_server.find({},  function(err, server_list) {

       if (err)
           console.log(err);


       console.log('Registered servers are '+server_list);
       if(isHome){
           response.render('home', {user: request.user, serverlist: server_list});
       }else{
           response.render('serverlist', {user: request.user, serverlist: server_list});
       }

   });

}