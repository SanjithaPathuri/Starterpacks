$(document).ready(function(){
	$('#LoginClick').click(function(){
		setlogin();
	});
	$("#forgotPassword").submit(function(){
		forgot();
	});
});

function setlogin()
{
	var UserName 	= $.trim($("#UserName").val());
	var Password 	= $.trim($("#Password").val());
	var formData	= $("#loginform").serializeArray();
	var loginfields = '';
	var checked = '';
	if(UserName == '')
	{
		loginfields = 1;
		$("#UserName").css('border-color','red');
	}
	else
		$("#UserName").css('border-color','');
	if(Password == '')
	{
		loginfields = 1;
		$("#Password").css('border-color','red');
	}
	else
		$("#Password").css('border-color','');
	
	if(loginfields == '')
	{
		if($('#loginform').find('input:radio:checked').length > 0)
		{
			$.ajax({
				type: "POST",
				url: base_url+"Login/index",
				data : formData,
				success: function(data)
				{
					if(data != 0)
					{
						if(data == 3)
							window.location.href = "";
						else
							window.location.href = data;
					}
					else
					{
						alertify.alert("<b>Invalid Login Details.</b>");
					}
				}
			});
		}
		else
			alertify.alert("<b>Please select a User Type to Login.</b>");
	}
}

function forgot()
{
	var formDataas	= $("#forgotPassword").serializeArray();
	$.ajax({

			  url: base_url+"ForgotPassword/forgotPassword",
			  data : formDataas,
			  type:"POST",
			  success: function(result)
			  {
					 data = $.parseJSON(result)
						if(data.eid==0)
						{
							//$("#msg").html(errorMsg).css("color","green").fadeIn().fadeOut(5000);
						 //$('#password_form').trigger('reset')
						$("#msg").html("<strong>"+data.eMsg+"</strong>").css("color","green").fadeIn().fadeOut(5000);
							
				
						}
						else{
							
							$("#msg").html("<strong>"+data.eMsg+"</strong> ").css("color","red").fadeIn().fadeOut(5000);
							$("#email").css("border","1px solid red")
						}
						$('#forgotPassword').trigger('reset')
			  }
		  
			});
}

