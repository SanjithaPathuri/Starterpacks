$(function(){
	
	$('.email').blur(function(){
			if($(this).val() == '')
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				var emailPattren =/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
				if(!emailPattren.test($(this).val()))
				{
					$(this).val('');
					$(this).css('border','1px solid red')
				}
				else
				{
					$(this).css('border','')
				}	
			}
			
		});
	
	
	
	$('#CourseBuyBtn').click(function(){
		var id = $('#CourseBuyBtn').attr('courseid');
		$.ajax({
				url: base_url+"Courses/ApplyCourse",
				type: "POST",
				data:{'CourseId':id,'Apply':'true'},
				beforeSend: function()
				{
					$('#CourseBuyBtn').hide();
					$('#LoadingImg').show();
				},
				complete:function()
				{
					$('#LoadingImg').hide();
					$('#CourseBuyBtn').show();
				},
				success:function(data)
				{
					data = $.parseJSON(data);
					if(data.Message == '00')
					{
						alertify.alert('You have reached the limit for free Courses.<br>Full amount is applicable.');
						setTimeout(function(){window.location.href= base_url+data.Link;},3000)
					}
					else
					{
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
				}
		});
	});
	$('#LikeClick').click(function(){
		var likeId = $('#LikeClick').attr('likevale');
		console.log(likeId);
		var str = "<form action='"+base_url+"Courses/like' method='post' id='likeForm'><input type='hidden' value='"+likeId+"' name='TypeId'/><input type='hidden' value='2' name='LikeType'/></form>";
		$('#LikeDiv').html(str);
		$('#LikeDiv').find('#likeForm').trigger('submit');
	});
});
function Non_Accout_user_questions()
{
	var invalid           = '0';
	var Name              = $.trim($('#non_account_name').val());
	var Email             = $.trim($('#non_account_email').val());
	var Message           = $.trim($('#non_account_message').val());
	var Mobile            = $.trim($('#non_account_Mobile').val());
	$('.null_questions_fiels').each(function(){
		
		var val = $.trim($(this).val());
		if(val == '')
		{
			invalid       = '1';
			$(this).css('border','1px solid red');
		}
		else
			$(this).css('border','');
	})
	if(invalid == '0')
	{
		$.ajax({
			url     : base_url+"Courses/insert_user_question",
			data    : {'Name':Name,'Email':Email,'Message':Message,'Role':'Non_Accout_user_questions','Mobile':Mobile},
			type    : "POST",
			success : function(data){
						var data = $.parseJSON(data);
						if(data.err == '1')
						{
							alertify.alert('<p style = "color:green">'+data.msg+'</p>');
							Resseting_NON_Accout_user_questions();
						}
						else
						{
							alertify.alert('<p style = "color:red">'+data.msg+'</p>');
						}
					},
		})
	}
}

function Accout_user_questions()
{
	var UserId            = $.trim($('#accout_userid').val());
	var UserType          = $.trim($('#accout_usertype').val());
	var Email             = $.trim($('#accout_email').val());
	var accout_message    = $.trim($('#accout_message').val());
	var invalid           = '0';
	
	if(UserId !='' && UserType != '' && Email != '')
	{
		if(accout_message == '')
		{
			invalid = '1';
			$('#accout_message').css('border','1px solid red');
		} 
		else
			$('#accout_message').css('border','');
		if(invalid == '0') 
		{
			$.ajax({
				url     : base_url+"Courses/insert_user_question",
				data    : {'UserId':UserId,'UserType':UserType,'Email':Email,'accout_message':accout_message,'Role':'Accout_user_questions'},
				type    : "POST",
				success : function(data){
							var data = $.parseJSON(data);
							if(data.err == '1')
							{
								alertify.alert('<p style = "color:green">'+data.msg+'</p>');
								Resseting_Accout_user_questions();
							}
							else
							{
								alertify.alert('<p style = "color:red">'+data.msg+'</p>');
							}
						},
			})
		}
	}
	else
	{
		alertify.alert('<p style="color:red"> Some Think Is Problem With Your Login <br> Please Login Again ...</p>')
	}
}
function Resseting_NON_Accout_user_questions()
{
	$('.null_questions_fiels').each(function(){
		
		$(this).val('');
		$(this).css('border','');
		
	})
}
