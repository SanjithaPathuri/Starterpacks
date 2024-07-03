$(function(){
	$('#reset').on('click',function(){
		reset();
	});
	autovalid();
	var cpage = 1;
	get_users(cpage);
	$('#pagination').find('li').click(function(){
		var page = $(this).attr('page');
		get_users(page);
	});
	$('#Submit').click(function(){
			var invalid = '';
			var username = $.trim($('#user_name').val());
			var emailid = $.trim($('#emailid').val());
			var first_name = $.trim($('#first_name').val());
			var last_name = $.trim($('#last_name').val());
			var Role = $.trim($('#role_id').val());
			var access_type = $.trim($('#access_type').val());
			var status = $.trim($('#status').val());
			var UpId = $.trim($('#UpId').val());
			if(username == '')
			{
				invalid = 1;
				$('#user_name').css('border-color','red');
			}
			else
				$('#user_name').css('border-color','');
			if(emailid == '')
			{
				invalid = 1;
				$('#emailid').css('border-color','red');
			}
			else
				$('#emailid').css('border-color','');
			if(first_name == '')
			{
				invalid = 1;
				$('#first_name').css('border-color','red');
			}
			else
				$('#first_name').css('border-color','');
			if(last_name == '')
			{
				invalid = 1;
				$('#last_name').css('border-color','red');
			}
			else
				$('#last_name').css('border-color','');
			if(Role == '')
			{
				invalid = 1;
				$('#Role').css('border-color','red');
			}
			else
				$('#Role').css('border-color','');
			if(access_type == '')
			{
				invalid = 1;
				$('#access_type').css('border-color','red');
			}
			else
				$('#access_type').css('border-color','');
			if(status == '')
			{
				invalid = 1;
				$('#status').css('border-color','red');
			}
			else
				$('#status').css('border-color','');
		if(invalid =='')
		{
			$.ajax({
				url: "",
				type:"POST",
				data: $('#user_form').serializeArray(),
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
						$('#AlertMsg').html('User added successfully..'); 
						reset();
						get_users(cpage);
						$('#AlertMsg').removeClass('alert-danger');
						$('#AlertMsg').addClass('alert-success');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},3500);
					}
					else if(data == 8)
					{
						reset();
						$('#AlertMsg').html('User Updated successfully.');
						get_users(cpage);
						$('#AlertMsg').removeClass('alert-danger');
						$('#AlertMsg').addClass('alert-success');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},3500);
					}
					else if(data == 2)
					{
						$('#AlertMsg').html('User Name already exsists');
						$('#AlertMsg').removeClass('alert-success');
						$('#AlertMsg').addClass('alert-danger');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},3500);
					}
					else if(data == 3)
					{
						$('#AlertMsg').html('Email ID already exsists');
						$('#AlertMsg').removeClass('alert-success');
						$('#AlertMsg').addClass('alert-danger');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},3500);
					}
					else
					{
						$('#AlertMsg').html('Please try later');
						$('#AlertMsg').removeClass('alert-success');
						$('#AlertMsg').addClass('alert-danger');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},3500);
					}
				}
			});
		}
	});
});
function get_users(page)
{
	var skey = $('#search').val();
	$.ajax({
		url: "",
		type:"POST",
		data: {'get':'1','skey':skey,'page':page},
		success: function(data)
		{
			data = $.parseJSON(data);
			var result = '';
			var status = '';
			$.each(data.Users,function(i){
				var row = data.Users[i];
				if(row.is_active == '1')
					status="<span class='label label-success'>Active</span>";
				else
					status="<span class='label label-danger'>Inactive</span>";
				result+="<tr><td><input type='checkbox' name='chk' did='"+row.admin_id+"'></td><td>"+row.user_name+"</td><td>"+row.role_name+"</td><td>"+row.UserTypeName+"</td><td>"+row.emailid+"</td><td align='center'>"+status+"</td><td align='center'><button data-toggle='modal' data-target='#testuser' OnClick='editfun("+row.admin_id+");' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5' type='button' title='Edit' ><i class='fa fa-pencil'></i></button> <button data-toggle='modal' data-target='' OnClick='del("+row.admin_id+");' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' type='button' title='Delete' ><i class='fa fa-trash-o'></i></button></td></td></tr>";
			});
			$('#user_table').find('tbody').html(result);
			$('#pagination').html(data.pagination);
		}
	});
}

function editfun(id)
{
	id = $.trim(id);
	if(id!='')
	{
		$.ajax({
			url: "",
			type:"POST",
			data: {'getuser':id},
			success: function(data)
			{
				data = $.parseJSON(data);
				$('#user_name').val(data.user_name); 
				$('#emailid').val(data.emailid); 
				$('#first_name').val(data.first_name); 
				$('#last_name').val(data.last_name); 
				$('#role_id').select2('val',data.role_id); 
				$('#access_type').select2('val',data.user_type_access); 
				$('#status').select2('val',data.is_active);
				$('#UpId').val(data.admin_id);
			}
		});
	}
}

function reset()
{
	$('#AlertMsg').html('User added successfully..'); 
	$('#user_form').trigger('reset');
	$('#role_id').select2('val','');
	$('#access_type').select2('val','');
	$('#status').select2('val','1');
	$('#UpId').val('');
	$('#user_form').find(':input').each(function(){
		$(this).css('border-color','');
	})
}

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
}
function multipleDel()
{
	var ids=[];
	$("[name=chk]:checked").each(function(){
		ids.push($(this).attr('did'))
	});
	if(ids.length>0)
	{
		alertify.confirm("Do you really want to delete all the selected users ?", function (e) {
				if (e) 
				{
					$.ajax({
						url: "",
						type: "POST",
						data:{'dids':ids,'Delete':'true'},
						beforeSend: function()
						{
						//$("#preloader_del").show()
						},
						complete:function()
						{
						//$("#preloader_del").hide()
						},
						success:function(data)
						{
							if(data == 1)
							{
								$('#AlertMsg').html('Deleted Successfully.');
								$('#AlertMsg').removeClass('alert-danger');
								$('#AlertMsg').addClass('alert-success');
								$('#AlertMsg').show();
								setTimeout(function(){$('#AlertMsg').hide();},3500);
								get_users(cpage);
							}
						}
					});
				}
				else
					return false;
			});
	}
	else
	{
		alert("Please select atleast One (1) User to delete !!")
	}
}

function checkAll(ele) 
{
	var checkboxes = document.getElementsByTagName('input');
	if (ele.checked) 
	{
		for (var i = 0; i < checkboxes.length; i++) 
		{
			if (checkboxes[i].type == 'checkbox') 
			{
				checkboxes[i].checked = true;
			}
		}
	} 
	else 
	{
		for (var i = 0; i < checkboxes.length; i++)
		{
			if (checkboxes[i].type == 'checkbox') 
			{
				checkboxes[i].checked = false;
			}
		}
	}
}
function del(id)
{
	alertify.confirm("Do you eally want to delete the user ?", function (e) {
		if (e) 
		{
			var ids = [];
			ids.push(id);
			$.ajax({
				url: "",
				type: "POST",
				data:{'dids':ids,'Delete':'true'},
				beforeSend: function()
				{
					//$("#preloader_del").show()
				},
				complete:function()
				{
					//$("#preloader_del").hide()
				},
				success:function(data)
				{
					if(data == 1)
					{
						$('#AlertMsg').html('Deleted Successfully.');
						$('#AlertMsg').removeClass('alert-danger');
						$('#AlertMsg').addClass('alert-success');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},3500);
						var cpage = 1;
						get_users(cpage);
					}
				}
			});
		}
	});
}