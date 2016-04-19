$(function () {
    var mainContentPage = $('#main-page-content-wrapper');   

    $('#registerServerAnchor').click(function () {
        $.ajax('/registerServer').done(function (registerServerHtmlPage) {
            mainContentPage.html(registerServerHtmlPage);
        });
    });


    $('#executionLogAnchor').click(function () {
        $.ajax('/executionLogList').done(function (executionLogHtmlPage) {
            mainContentPage.html(executionLogHtmlPage);
        });

    });


    $('#usersListAnchor').click(function () {
        $.ajax('/registeredUsersList').done(function (registeredUserListHtmlPage) {
            mainContentPage.html(registeredUserListHtmlPage);
        });

    });

    $('#registerNewUserAnchor').click(
        function() {
            //alert('Sing me up');
            $.ajax( '/registration').done(function( signUpHtmlPage ) {

                mainContentPage.html(signUpHtmlPage);


            });
            return false;
        });

    
    $('#registeredShellScriptsAnchor').click(function () {
        $.ajax('/registeredShellScripts').done(function (registeredUserListHtmlPage) {
            mainContentPage.html(registeredUserListHtmlPage);
        });

    });



});

function executeOnServer(server_name, project_name, ip_address, port_number, server_user, server_user_password) {
    //alert('Execute on server '+project_name+' ' + name + ' ' + ip_address + ' ' + port_number + ' ' + server_user + ' ' + server_user_password);

    $.post('/serverBatchList',
        getServerObject(server_name, project_name, ip_address, port_number, server_user, server_user_password),
        function (responseHtml) {
            $('#main-page-content-wrapper').html(responseHtml);
        }
    );
}

function editServer(server_name, project_name, ip_address, port_number, server_user, server_user_password) {
    //alert('EditServer on server '+project_name+' ' + name + ' ' + ip_address + ' ' + port_number + ' ' + server_user + ' ' + server_user_password);
}

function deleteServer(server_id) {
   $.post('/deleteServer',{server_id:server_id},function (deleteResponse) {
       $('#main-page-content-wrapper').html(deleteResponse);
   });
}

function editServerScriptPre(server_script) {
    $.post('/editServerScriptPre',{server_script:server_script},function (server_scriptResponse) {
        $('#main-page-content-wrapper').html(server_scriptResponse);
    });
}

function editServerScriptPost(server_script) {
    $.post('/editServerScriptPost',{server_script:server_script},function (server_scriptResponse) {
        $('#main-page-content-wrapper').html(server_scriptResponse);
    });
}

function deleteIndServerScript(script_id) {
    $.post('/deleteIndScript',{script_id:script_id},function (deleteResponse) {
        $('#main-page-content-wrapper').html(deleteResponse);
    });
}



function attachRegisterdScipt(server) {
   // alert('server attache to this '+server );
    //alert('server attache to this ' +JSON.parse(server)['_id']);
    $.ajax('/registeredShellScripts?selector=true&server_id='+JSON.parse(server)['_id']).done(function (registeredUserListHtmlPage) {
       $.colorbox({html:registeredUserListHtmlPage});
    });
}


function attachScriptsToServer(selectedScripts,server_id) {
    //alert(selectedScripts);
    //alert(JSON.stringify(selectedScripts));
    if(selectedScripts.length<=0){
        $('#cboxClose').click();
    }else {
        $.post('/attachScritsToServer',{attach_scripts:JSON.stringify(selectedScripts),server_id:server_id},function (attachResponse) {
            if(attachResponse.indexOf('errorPage')>-1){
                $('#errorDetails').html(attachResponse);
                $('#serverRegistrationErrorDiv').show();
            }else{

                $('#main-page-content-wrapper').html(attachResponse);
               $('#cboxClose').click();

            }
        });
    }
}

function deleteUser(user_id) {
    $.post('/deleteUser',{user_id:user_id},function (deleteResponse) {
        $('#main-page-content-wrapper').html(deleteResponse);
    });
}

function deleteServerScript(server_script_id,server_id) {
    $.post('/deleteServerScript',{server_id:server_id,server_script_id:server_script_id},function (deleteResponse) {
        $('#main-page-content-wrapper').html(deleteResponse);
    });
}

function getServerObject(server_name, project_name, ip_address, port_number, server_user, server_user_password) {
    var server = {
        server_name: server_name,
        ip_address: ip_address,
        server_user: server_user,
        server_user_password: server_user_password,
        port_number: port_number,
        project_name: project_name
    };

    return server;
}

function getServerScriptObject(server_name, project_name, server_ip_address, script_name, script_type, script_executor_id, server_user_password, batch_name, user_name) {
    var serverScript = {
        script_type: script_type,
        script_name: script_name,
        batch_name: batch_name,
        user_name: user_name,
        script_executor_id: script_executor_id,
        script_executor_password: server_user_password,
        server_name: server_name,
        server_ip_address: server_ip_address,
        project_name: project_name
    };

    return serverScript;
}


function addNewShellScript(server) {
    // alert('add new shell script pre '+server);
    //alert('add new shell script pre '+JSON.stringify(server));
    $.post('/addNewShellScriptPre',{server:server},function (addNewShellScriptHtml) {
        //alert('addNewShellScriptHtml '+addNewShellScriptHtml);
        $('#main-page-content-wrapper').html(addNewShellScriptHtml);
    })

}

function addNewShellScriptPost(serverId) {
    $('#executionResultDiv').hide();
    var data_string = $("#addNewShellScriptForm").serialize();
    data_string='server_id='+serverId+'&'+data_string;
   // console.log(data_string);
    $.post('/addNewShellScript',
        data_string,
        function (responseHtml) {
            if(responseHtml.indexOf('errorPage')>-1){
                $('#errorDetails').html(responseHtml);
                $('#serverRegistrationErrorDiv').show();
            }else{
                $('#main-page-content-wrapper').html(responseHtml);
            }

        }
    );
}

function addNewIndShellScript(server) {

    $.post('/addNewIndShellScriptPre',{},function (addNewShellScriptHtml) {
        //alert('addNewShellScriptHtml '+addNewShellScriptHtml);
        $('#main-page-content-wrapper').html(addNewShellScriptHtml);
    })

}


function addNewIndShellScriptPost() {
    $('#executionResultDiv').hide();
    var data_string = $("#addNewShellScriptForm").serialize();
    //console.log(data_string);
    $.post('/addNewIndShellScript',
        data_string,
        function (responseHtml) {
            if(responseHtml.indexOf('errorPage')>-1){
                $('#errorDetails').html(responseHtml);
                $('#serverRegistrationErrorDiv').show();
            }else{
                $('#main-page-content-wrapper').html(responseHtml);
            }

        }
    );
}

function addNewServerPost() {
    $('#serverRegistrationErrorDiv').hide();
    var data_string = $("#registerServerForm").serialize();
    //console.log(data_string);
    $.post('/registerServer',
        data_string,
        function (responseHtml) {
            if(responseHtml.indexOf('errorPage')>-1){
                $('#errorDetails').html(responseHtml);
                $('#serverRegistrationErrorDiv').show();
            }else{
                $('#main-page-content-wrapper').html(responseHtml);
            }
        }
    );
}

function addNewUser() {
    $('#serverRegistrationErrorDiv').hide();
    var data_string = $("#newUserRegistrationForm").serialize();
   // console.log(data_string);
    $.post('/registration',
        data_string,
        function (responseHtml) {
            if(responseHtml.indexOf('errorPage')>-1){
                $('#errorDetails').html(responseHtml);
                $('#serverRegistrationErrorDiv').show();
            }else{
                $('#main-page-content-wrapper').html(responseHtml);
            }
        }
    );
}


function executeCommandPre(server) {
    $.post('/executeCommandPre',{server:server},function (exectueCommanPage) {
        $.colorbox({html:exectueCommanPage});
    });
}

function executeCommand(server,user_name) {
    //$('#commandExecutionResultDiv').hide();
    $('#commandExecutorSpinnerID').show();
    $('#commandExecutionResultTxtAr').val('');
    var data_string = $("#executeCommandForm").serialize();
    data_string='user_name='+user_name+'&server='+server+'&'+data_string;
    //console.log(data_string);
    $.post('/executeCommand',
        data_string,
        function (responseHtml) {
            if(responseHtml.indexOf('errorPage')>-1){
                $('#errorDetails').html(responseHtml);
                $('#serverRegistrationErrorDiv').show();
            }else{
                $('#commandExecutionResultTxtAr').val(responseHtml);
                $('#commandExecutorSpinnerID').hide();
                //$('#commandExecutionResultDiv').show();
            }
        }
    );
}

function uploadFileOnServerPre(server) {
    $.post('/uploadFileOnServerPre',{server:server},function (exectueCommanPage) {
       $.colorbox({html:exectueCommanPage});
        //$('#main-page-content-wrapper').html(uploadFilePage);
    });
}

function uploadFileOnServerPost(server,user_name){
    var data_string = $("#uploadFileForm").serialize();
    data_string='user_name='+user_name+'&server='+server+'&'+data_string;
    $.post('/uploadFileOnServer',
        data_string,
        function (responseHtml) {
            if(responseHtml.indexOf('errorPage')>-1){
                $('#errorDetails').html(responseHtml);
                $('#serverRegistrationErrorDiv').show();
            }else{
                $('#commandExecutionResultTxtAr').val(responseHtml);
                $('#commandExecutorSpinnerID').hide();
                //$('#commandExecutionResultDiv').show();
            }
        }
    );

}


function executeScriptOnServer(server, server_script, user) {
    $('#executionResultDiv').hide();
    $('#scriptSpinner'+server_script._id).show();
    $.post("/executeScript",
        {server: server, server_script: server_script, user: user},
        function (response) {
            $('#executedScripHeading').html(server_script.script_name+' on server '+server.server_name+' ( '+server.ip_address+' )');
            $('#executionResultTxtAr').val(response);
            $('#executionResultDiv').show();
            $('#scriptSpinner'+server_script._id).hide();
        }
    );
}




function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

var selectedScripts = [];
function setSelectedCheck(selectedCheck){

    if(selectedCheck.checked){
        selectedScripts.push(selectedCheck.value);
    }else{
        removeA(selectedScripts,selectedCheck.value);
    }

}


