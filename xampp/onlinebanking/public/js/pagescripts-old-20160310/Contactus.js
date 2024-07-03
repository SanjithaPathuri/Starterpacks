$(document).ready(function(){
	autovalid();
	$('#Submit').on('click',function(){
		var invalid = '';
		$('#Contactus_form').find('input[type=text]').each(function(){
			if($(this).val() == '')
			{
				invalid = 1;
				$(this).css('border-color','red');
			}
			else
				$(this).css('border-color','');
		});
		
		$('#Contactus_form').find('textarea').each(function(){
			if($(this).val() == '')
			{
				invalid = 1;
				$(this).css('border-color','red');
			}
			else
				$(this).css('border-color','')
		});
		
		if(invalid == '')
		{
			$.ajax({
				url: "",
				type:"POST",
				data: $('#Contactus_form').serializeArray(),
				beforeSend: function(){
					$('#Submit').prop('disabled', true);
				},
				complete: function(){
					$('#Submit').prop('disabled', false);
				},
				success: function(data)
				{
					if(data == 1)
					{
						$('#AlertMsg').removeClass('alert-danger');
						$('#AlertMsg').addClass('alert-success');
						$('#AlertMsg').html('Update Successfull');	
						$('#AlertMsg').show();	
						setTimeout(function(){$('#AlertMsg').hide();},4000);
					}
					else
					{
						$('#AlertMsg').removeClass('alert-success');
						$('#AlertMsg').addClass('alert-danger');
						$('#AlertMsg').html('Update failed. Please try later');	
						$('#AlertMsg').show();	
						setTimeout(function(){$('#AlertMsg').hide();},4000);
					}
				}
			});
		}
	});
	
	$('#reset').on('click',function(){
		$('#Contactus_form').find('input[type=text]').each(function(){
				$(this).css('border-color','');
		});
		
		$('#Contactus_form').find('textarea').each(function(){
				$(this).css('border-color','')
	  });
		
		$('#Contactus_form').trigger('reset');
	});
});

function autovalid()
{
	$(".email").blur(function(){
		var emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var id = $(this).attr('id');
		var email = $(this).val();
		if(!emailPattern.test(email))
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
	$('.nums').blur(function(){
		var numPattern = /^[1-9][0-9]{0,9}$/;
		var id = $(this).attr('id');
		var field = $(this).val();
		if(!numPattern.test(field))
		{
			$('#'+id).css('border-color','red')
			$('#'+id).val('');
		}
		else
		{
			$('#'+id).css('border-color','');
			return false;
		}
	})
}