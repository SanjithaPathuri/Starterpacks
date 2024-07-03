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
	
	$('#Submit').click(function(){
		var name = $('#innovative_form').find('#Name').val();
		var email = $('#innovative_form').find('#Email').val();
		var location = $('#innovative_form').find('#Location').val();
		var msg = $('#innovative_form').find('#Feedback').val();
		var invalid = '';
		if(name == '')
		{
			invalid = 1;
			$('#innovative_form').find('#Name').css('border-color','red');
		}
		else
			$('#innovative_form').find('#Name').css('border-color','');
		
		if(email == '')
		{
			invalid = 1;
			$('#innovative_form').find('#Email').css('border-color','red');
		}
		else
			$('#innovative_form').find('#Name').css('border-color','');
		
		if(msg == '')
		{
			invalid = 1;
			$('#innovative_form').find('#Feedback').css('border-color','red');
		}
		else
			$('#innovative_form').find('#Feedback').css('border-color','');
		
		if(location == '')
		{
			invalid = 1;
			$('#innovative_form').find('#Location').css('border-color','red');
		}
		else
			$('#innovative_form').find('#Location').css('border-color','');
		
		if(invalid == '')
		{
			$.ajax({
				url: "../Feedback",
				type:"POST",
				data: $('#innovative_form').serializeArray(),
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
						$('#innovative_form').trigger('reset');
						alertify.alert("<b style='color:green'>Thank you for your valuable feedback.</b>");
					}
				}
			});
		}
		
	});
	
	$('#SpecificationsPop').click(function(){
		$('#SpecsandKit').find('#Headingh4').html('Specifications');
		$('#SpecsandKit').find('#ContentDiv').html($('#SpecContent').html());
		$('#SpecsandKit').modal('show');
	});
	
	$('#KitdetailsPop').click(function(){
		$('#SpecsandKit').find('#Headingh4').html('Kit Details');
		$('#SpecsandKit').find('#ContentDiv').html($('#KitContent').html());
		$('#SpecsandKit').modal('show');
	});
	
	$('h1').find('#PrintPage').click(function(){
		window.print();
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
	$('#ProjectApply').click(function(){
		var id = $('#ProjectApply').attr('ProjectId');
		$.ajax({
				url: base_url+"InnovativeProjects/ApplyProject",
				type: "POST",
				data:{'ProjectId':id,'Apply':'true'},
				beforeSend: function()
				{
					$('#ProjectApply').hide();
					$('#LoadingImg').show();
				},
				complete:function()
				{
					$('#LoadingImg').hide();
					$('#ProjectApply').show();
				},
				success:function(data)
				{
					data = $.parseJSON(data);
					if(data.Message!='')
						alertify.alert(data.Message);
					else if(data.Message =='')
						window.location.href= base_url+data.Link;
					else if(data.Link!="Reload")
						setTimeout(function(){window.location.href= base_url+data.Link;},3000);
					else if(data.Link=="Reload")
						setTimeout(function(){window.location.href= '';},3000);
					else if(data.Link == '')
						return false;
				}
		});
	});
});