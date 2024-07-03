$(document).ready(function(){
	$(".text").blur(function(){
		var namesPattern = /^[a-zA-Z ]*$/;
		var id = $(this).attr('id');
		var value = $('#'+id).val();
		if(!namesPattern.test(value))
		{
			$('#'+id).css('border-color','red')
			$('#'+id).val('');
		}
		else
		{
			$('#'+id).css('border-color','');
			return false;
		}
    });
	
	$('#ContactSubmit').click(function(){
		var cu_name = $('#ContactUs_form').find('#CU_Name').val();
		var cu_email = $('#ContactUs_form').find('#CU_Email').val();
		var cu_msg = $('#ContactUs_form').find('#CU_Msg').val();
		var cu_invalid = '';
		if(cu_name == '')
		{
			cu_invalid = 1;
			$('#ContactUs_form').find('#CU_Name').css('border-color','red');
		}
		else
			$('#ContactUs_form').find('#CU_Name').css('border-color','');
		
		if(cu_email == '')
		{
			cu_invalid = 1;
			$('#ContactUs_form').find('#CU_Email').css('border-color','red');
		}
		else
			$('#ContactUs_form').find('#CU_Name').css('border-color','');
		
		if(cu_msg == '')
		{
			cu_invalid = 1;
			$('#ContactUs_form').find('#CU_Msg').css('border-color','red');
		}
		else
			$('#ContactUs_form').find('#CU_Msg').css('border-color','');
		
		if(cu_invalid == '')
		{
			$.ajax({
				url: "../welcome/ContactUs_form",
				type:"POST",
				data: $('#ContactUs_form').serializeArray(),
				beforeSend: function(){
					$('#ContactSubmit').prop('disabled', true);
				},
				complete: function(){
					$('#ContactSubmit').prop('disabled', false);
				},
				success: function(data)
				{
					if(data == 1)
					{
						$('#ContactUs_form').trigger('reset');
						alertify.alert("<b style='color:green'>Thank you for your valuable feedback.</b>");
					}
				}
			});
		}
		
	});
	
	$('input[type=email]').on('keyup',function(){
		$('#Span_Email').hide();
	});
	$('input[type=email]').blur(function(){
		var email = $.trim($(this).val());
		var emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if(!emailPattern.test(email))
		{
			$(this).css('border-color','red');
			$(this).val('');
			$('#Span_Email').show();
		}
		else
		{
			$(this).css('border-color','');
			$('#Span_Email').hide();
		}
	});
});