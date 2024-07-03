$(function(){
	$('#ReActSubmit').click(function(){
		var ReActEmail = $.trim($('#ReActEmail').val());
		var ResendActForm	= $("#ResendActForm").serializeArray();
		if(ReActEmail!='')
		{
			$('#ReActEmail').css('border','');
			$.ajax({
				url: base_url+"Activate/ResendEmailActivation",
				type: "POST",
				// data:{'ReAct':'true','Email':ReActEmail},
				data : ResendActForm ,
				beforesend:function(){
					$('#ReActSubmit').prop('disabled',true);
				},
				complete: function(){
					$('#ReActSubmit').prop('disabled',false);
				},
				success:function(data)
				{
					if(data == 1)
						alertify.alert("A Email has been sent to your Email ID Containing Activation Link..");
					else if(data == 2)
						alertify.alert("Your Email ID has been already Activated.");
					else
						alertify.alert("Invalid Email ID");
				}
			});
		}
		else
			$('#ReActEmail').css('border','1px solid red');
	});
});