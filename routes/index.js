var express = require('express');
var router = express.Router();
var linux_server_models = require('../models_server/init_linux');
var linux_server_command=require('../linux_server/init_linux_cmd');

var multer  = require('multer')




var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/executor');
}

module.exports = function (passport) {

    /* GET login page. */
    router.get('/executor', function (req, res) {
        // Display the Login page with any flash message, if any
        //console.log("Base / path is called");
        res.render('login', {message: req.flash('message')});
    });

    router.get('/', function (req, res) {
        res.redirect('/executor');
    });

  /*  router.post('/dummy_registration', passport.authenticate('dummy_registration', {
        successRedirect: '/registeredUsersList',
        failureRedirect: '/home',
        failureFlash: true
    }));
    router.get('/dummy', function (req, res) {
        res.render('dummy_registration');
    });*/


    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/executor',
        failureFlash: true
    }));

    /* GET Registration Page */
    router.get('/registration', function (req, res) {
        //console.log(" Index.js  Base GET /registration path is called");
        res.render('registerNewUser', {message: req.flash('message')});
    });

    /* Handle Registration POST */
    router.post('/registration',function (req,res) {
        linux_server_models.register_new_user(req,res);
    });



    router.post('/registration', isAuthenticated, function (req, res) {
        //console.log(" register user post");
       linux_server_models.register_new_user(req,res);
    });

    /* Handle Registration POST */
    router.post('/executeCommand', isAuthenticated, function (req, res) {
        //console.log(" Index.js Base /home path is called " + req.user);
        linux_server_command.execute_command.executeScript(req, res);
    });

    router.post('/executeCommandPre', isAuthenticated, function (req, res) {
        //console.log(" Index.js Base /home path is called " + req.user);
        var serverObj=JSON.parse(req.body.server);
        res.render('executeCommand',{server:serverObj,user:req.user});
    });


    router.post('/uploadFileOnServerPre', isAuthenticated, function (req, res) {
        //console.log(" Index.js Base /home path is called " + req.user);
        var serverObj=JSON.parse(req.body.server);
        res.render('uploadFile',{server:serverObj,user:req.user});
    });

    //router.use(multer({ storage: multer.memoryStorage({}) }));
    var upload = multer({ storage: multer.memoryStorage({}) });
    router.post('/uploadFileOnServer', upload.single('upload_file'), function (request, res) {
        linux_server_command.sftp_linux.do_sftp(request,res);
    });

    /* GET Home Page */
    router.get('/home', isAuthenticated, function (req, res) {
        //console.log(" Index.js Base /home path is called " + req.user);
        linux_server_models.registered_server_list(req, res,true);
    });

    router.get('/serverList', isAuthenticated, function (req, res) {
        //console.log(" Index.js Base /home path is called " + req.user);
        linux_server_models.registered_server_list(req, res,false);
    });

    router.post('/deleteServer', isAuthenticated, function (req, res) {
        //console.log(" Delete this server " + req.body.server_id);
        linux_server_models.delete_server(req, res);
    });

    router.post('/deleteIndScript', isAuthenticated, function (req, res) {
             
        linux_server_models.delete_ind_script(req, res);
    });

    

    router.post('/deleteUser', isAuthenticated, function (req, res) {
        //console.log(" Delete this server " + req.body.server_id);
        linux_server_models.delete_user(req, res);
    });

    router.post('/deleteServerScript', isAuthenticated, function (req, res) {
        //console.log(" Delete this server " + req.body.server_id);
        linux_server_models.delete_server_script(req, res);
    });

    /* Handle Logout */
    router.get('/signout', function (req, res) {
        //console.log(" Index.js  Base /signout path is called");
        req.logout();
        res.redirect('/executor');
    });


    /* GET Home Page */
    router.get('/registerServer', isAuthenticated, function (req, res) {
        //console.log(" registerServer GET");
        res.render('registerServer');
    });

    router.post('/registerServer', isAuthenticated, function (req, res) {
         linux_server_models.register_server(req, res);
    });


    router.post('/serverBatchList', isAuthenticated, function (req, res) {
        //console.log("Server Batch List POST " + req.body.server_name + ' ' + req.body.project_name+ ' ' + req.body.ip_address);
        linux_server_models.find_server_script(req,res,req.body.ip_address);
    });

    router.post('/serverScriptList', isAuthenticated, function (req, res) {
        //console.log("Server Batch List POST " + req.body.server_name + ' ' + req.body.project_name+ ' ' + req.body.ip_address);
        linux_server_models.find_ind_server_script(req,res);
    });

   /* router.get('/serverScriptBatchList/:ip', isAuthenticated, function (req, res) {
        //console.log("serverBatchList GET ip"+req.params.ip);
        //console.log("Server Batch List GET" + req.body.server_name + ' ' + req.body.project_name);
        linux_server_models.find_server_script(req,res,req.params.ip);
    });*/


    router.post('/addNewShellScriptPre', isAuthenticated, function (req, res) {
       // console.log("addNewShellScript PRE input is " + req.body.server);
        res.render('addNewShellScript',{server:req.body.server});
    });

    router.post('/addNewShellScript', isAuthenticated, function (req, res) {
        //console.log("Register Server Script POST" + JSON.stringify(req.body) + ' ' + req.body.server+ ' ' + req.body.script_executor_password);
        linux_server_models.register_server_script(req, res);
        //res.redirect('/serverScriptBatchList/'+req.body.server_ip_address);
    });

    router.post('/addNewIndShellScriptPre', isAuthenticated, function (req, res) {
       // console.log("addNewIndShellScriptPre PRE input is " + req.body.server);
      
        res.render('addNewIndividualShellScript',{server_script:{}});
    });

    router.post('/addNewIndShellScript', isAuthenticated, function (req, res) {
      linux_server_models.register_ind_server_script(req, res);
      
    });

    router.post('/attachScritsToServer', isAuthenticated, function (req, res) {
        //console.log(JSON.stringify(req.body));
        linux_server_models.attach_server_scripts(req, res);

    });



    router.get('/registeredShellScripts', isAuthenticated, function (req, res) {
       // console.log(" registeredShellScripts this server " + req.query.selector);
        linux_server_models.find_ind_server_script(req, res,req.query.selector);

    });

    router.get('/executionLogList', isAuthenticated, function (req, res) {
        //console.log("executionLogList GET ");
        linux_server_models.find_execution_log(req,res);
    });

    router.get('/registeredUsersList', isAuthenticated, function (req, res) {
        //console.log("registeredUserList GET ");
        linux_server_models.find_registered_users(req,res);
    });
    
    router.post('/executeScript', isAuthenticated, function (req, res) {
        //console.log(" Execution Script on server " + req.user + ' ' + req.server+ ' ' + req.server_script);
        //console.log(" Calling actual executor ");
        linux_server_command.linux_server_executor.executeShellOnServer(req, res);

    });


    router.post('/editServerScriptPre', isAuthenticated, function (req, res) {
       res.render('addNewIndividualShellScript',{server_script:JSON.parse(req.body.server_script)});
    });

    return router;
}





