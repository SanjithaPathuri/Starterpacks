$(function(){
	var cpage = 1;
	get_roles(cpage);
	
	$('#btnsDiv').find('#Add').click(function(){
		$('#Add').hide();
		$('#RoleManagementDiv').show();
		$('#Submit').show();
		$('#Cancel').show();
	});
	
	$('#btnsDiv').find('#Cancel').click(function(){
		reset();
		$('#RoleManagementDiv').hide();
		$('#Submit').hide();
		$('#Cancel').hide();
		$('#Add').show();
	});
	
	$('#Submit').click(function(){
			var invalid = '';
			var rolename = $.trim($('#RoleName').val());
			var rolestatus = $.trim($('#Status').val());
			
			var UpId = $.trim($('#UpId').val());
			if(rolename=='')
			{
				$('#RoleName').css('border-color','red');
				invalid = 1; 
			}
			else
				$('#RoleName').css('border-color','');
			if(rolestatus=='')
			{
				$('#Status').css('border-color','red');
				invalid = 1; 
			}
			else
				$('#Status').css('border-color','');
		
		if(invalid =='')
		{
			$.ajax({
				url: "",
				type:"POST",
				data: {'RoleName':rolename,'Status':rolestatus,'UpId':UpId},
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
						if($('#UpId').val() == '')
							alertify.alert('Role Added succesfully');
						else
							alertify.alert('Role Updated succesfully');
						$('#RoleName').val('');
						$('#Status').select2('val','1');
						$('#UpId').val('');
						$('#btnsDiv').find('#Cancel').trigger('click');
						get_roles(cpage);
					}
					else if(data == 2)
						alertify.alert('Role already exsists');
				}
			});
		}
		
	});
});

function reset()
{
	$('#RoleName').css('border-color','');
	$('#RoleName').val('');
	$('#Status').select2('val','1');
}

function get_roles(page)
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
			$.each(data.Roles,function(i){
				var row = data.Roles[i];
				if(row.Status == '1')
					status="<span class='label label-success'>Active</span>";
				else
					status="<span class='label label-danger'>Inactive</span>";
				result+="<tr><td>"+row.UserTypeName+"</td><td class='text-center'>"+status+"</td></tr>";
			});
			
			/* Removed Edit & Delete buttons Code */
			/* <td class='text-center'><button data-toggle='modal' data-target='#testuser' OnClick='editfun("+row.role_id+");' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5' type='button' title='Edit'><i class='fa fa-pencil'></i></button> <button data-toggle='modal' data-target='' OnClick='del("+row.role_id+");' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' type='button' title='Delete' ><i class='fa fa-trash-o'></i></button></td> */
			
			 var res =$('#rolesTable').find('tbody').html(result);
			if(res.length>0){
							$('#pagination').html(data.pagination)
							$(document).find(".pagination li").on("click",function(){
								cpage=$(this).attr('page');
								get_roles($(this).attr('page'))
							})
			}
						 else
						{
							$("#rolesTable").find('tbody').html("<tr><td colspan='4'><p style='margin-bottom:0px; text-align:center;'>No Records Found...!</p> </td></tr>")
							$("#pagination").hide()
						} 
			/* $('#rolesTable').find('tbody').html(result);
			$('#pagination').html(data.pagination); */
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
			data: {'getrole':id},
			success: function(data)
			{
				data = $.parseJSON(data);
				//console.log(data);
				$('#RoleName').val(data.UserTypeName); 
				$('#Status').select2('val',data.Status); 
				$('#UpId').val(UserTypeId.role_id); 
				$('#btnsDiv').find('#Add').trigger('click');
			}
		});
	}
}
