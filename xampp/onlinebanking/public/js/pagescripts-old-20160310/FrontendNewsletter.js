$(document).ready(function(){
	$('#NlClick').click(function(){
		var emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var email = $.trim($('#Newsletter').val());
		var NewsName = $.trim($('#NewsName').val());
		var namesPattern = /^[a-zA-Z ]*$/;
		var newsinvalid = '';
		if(!namesPattern.test(NewsName) || NewsName == '')
		{
			newsinvalid = 1;
			$('#NewsName').css('border-color','red');
			$('#NewsName').css('border-width','4px');
			$('#NewsName').val('');
		}
		else
			$('#NewsName').css('border-color','');
		if(!emailPattern.test(email) || email =='')
		{
			newsinvalid = 1;
			$('#Newsletter').css('border-color','red');
			$('#Newsletter').css('border-width','4px');
			$('#Newsletter').val('');
		}
		else
			$('#NewsName').css('border-color','');
		if(newsinvalid == '')
		{
			$('#Newsletter').css('border-color','');
			$.ajax({
				url: "./Newsletter/subscribe",
				type:"POST",
				data: {'Newsletter':email,'NewsName':NewsName},
				beforeSend: function()
				{
					$('#NlClick').prop('disabled',true);
				},
				complete:function()
				{
					$('#NlClick').prop('disabled',false);
				},
				success: function(data)
				{
					if(data == 3)
						alertify.alert("<b style='color:red'>You are already subscribed to our News Letters.</b>");
					else if(data == 2)
						alertify.alert("<b style='color:red'>Please trt later..</b>");
					else if(data == 1)
						alertify.alert("<b style='color:green'>You are now succesfully subscribed to our News Letter.</b>");
					$('#Newsletter').val('');
					$('#NewsName').val('');
				}
			});
		}
	})
})