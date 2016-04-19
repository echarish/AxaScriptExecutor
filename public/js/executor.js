 $(function(){

     var executionType=$("input:radio[name=optradio]").val();

      $('#executeScriptBtn').click(function() {
        if($('#scriptLocation').val()==undefined || $('#scriptLocation').val()==''){
            showError();

        }else{
            doExecuteButtonClick();
        }


        });

       $("input:radio[name=optradio]").click(
              function(){
                  executionType=$(this).val();
                  if(executionType=='shell'){
                      $('#headerMessage').html(' Please input the location of your script in server e.g. /opt/somescript.sh');
                      $('#scriptLocation').attr("placeholder",'/opt/script/somescript.sh');
                  }if(executionType=='command'){
                     $('#headerMessage').html(' Please input the command, you can put multiple command seperated with && e.g. cd /opt/dir && ls -lart  ');
                     $('#scriptLocation').attr("placeholder",'cd /opt/dir && ls -lart');
                  }
              }
        );



        function doExecuteButtonClick(){
               $('#executeScriptBtn').toggleClass('active');
                $('#executionResultTxtAr').val();
                $.post(
                  '/execute',
                  {
                    executionScript : $('#scriptLocation').val(),
                    executionType: executionType
                   },
                  function(result){
                    $('#executionResultTxtAr').val(result.executeResponse);
                    $('#executeScriptBtn').toggleClass('active');
                  }
                );
       }

       function showError(){
            bootbox.dialog({
              message: "Please input a value for command or shell script location",
              title: "Error",
              buttons: {
               danger: {
                  label: "Ok",
                  className: "btn-danger",
                  callback: function() {
                    //Example.show("uh oh, look out!");
                  }
                }
                }
            });

       }

    });



