$(function(){

    
    $('#loginBtn').click(function () {
        
        $.post('/login',{
            username:$('#username').val(),
            password:$('#password').val()
        },function (responseData) {
            $('#errorDetails').html(responseData);
            $('#serverRegistrationErrorDiv').show();
        });
        
    });


    
});