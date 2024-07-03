$(function(){
	
	$('#DownloadBroucher').click(function(){
		broureset();
	});
	
	var emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	
	$('#BrochureEmail').blur(function(){
		var brouemail = $('#BrochureEmail').val();
		if(!emailPattern.test(brouemail))
		{
			$('#BrochureModal').find('#BrochureEmail').css('border-color','red');
		}
		else
			$('#BrochureEmail').css('border-color','');
	});
	
	$('.num').blur(function(){
		var fData = $(this).val();
		var reg = /[^0-9]/g;
		if(!reg.test(fData))
		$(this).css('border-color','');
		else
		{
			$(this).val('');
			$(this).css('border-color','red');
		}
	});
	
	$('#BrochureSubmit').click(function(){
		validatebloucher();
	});
});

function validatebloucher()
{
	var brouname = $.trim($('#BroucherName').val());
	if(brouname == '')
	{
		broucherInvalid = 1;
		$('#BroucherName').css('border-color','red');
	}
	else
		$('#BroucherName').css('border-color','');
	
	var brouemail = $.trim($('#BrochureEmail').val());
	var broucherInvalid = '';
	if(brouemail == '')
	{
		broucherInvalid = 1;
		$('#BrochureEmail').css('border-color','red');
	}
	else
		$('#BrochureEmail').css('border-color','');
	
	var broumobile = $.trim($('#BrochureMobile').val());
	if(broumobile == '')
	{
		broucherInvalid = 1;
		$('#BrochureMobile').css('border-color','red');
	}
	else
		$('#BrochureMobile').css('border-color','');
	
	if(broucherInvalid == '')
	{
		$.ajax({
			url: base_url+"Welcome/BroucherDownload",
			type:"POST",
			data: {'Name':brouname,'Email':brouemail,'Mobile':broumobile},
			beforeSend: function(){
				$('#BrochureBtns').hide();
				$('#LoadingBroucher').show();
			},
			complete: function(){
				$('#LoadingBroucher').hide();
				$('#BrochureBtns').show();
			},
			success: function(data)
			{
				data = $.parseJSON(data);
				if(data !='')
				{
					var win = window.open(data, '_blank');
					if(win)
					{
						broureset();
						$('#BrochureModal').modal('hide');
						win.focus();
					}
					else
						alertify.alert('Please allow popups in <br> your browser to download the broucher');
				}
				else
					alertify.alert('Please try after some time.');
			}
		});
	}
}

function broureset()
{
	$('#BrochureModal').find('#BroucherName').val('');
	$('#BrochureModal').find('#BroucherName').css('border-color','');
	$('#BrochureModal').find('#BrochureEmail').val('');
	$('#BrochureModal').find('#BrochureEmail').css('border-color','');
	$('#BrochureModal').find('#BrochureMobile').val('');
	$('#BrochureModal').find('#BrochureMobile').css('border-color','');
	$('#LoadingBroucher').hide();
	$('#BrochureBtns').show();
}