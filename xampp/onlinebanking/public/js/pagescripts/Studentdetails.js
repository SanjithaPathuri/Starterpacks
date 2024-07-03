$(function(){
	$('#reset').on('click',function(){
		reset();
	});
	var cpage = 1;
	get_students(cpage);
	$('#pagination').find('li').click(function(){
		var page = $(this).attr('page');
		get_students(page);
	});
	
	
	function reset()
	{
		$('#student_form').trigger('reset');
		$("#KnownLanguages").select2("val",'');
		$('#status').select2('val','');
		$('#StId').val('');
		$('#student_form').find(':input').each(function(){
			$(this).css('border-color','');
		})
		$('#PhotoImagePathex').hide();
		$('#CVPathex').hide();
	}
	
	function get_students(page)
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
				var n =0;
				$.each(data.Students,function(i){
					n = n+1;
					var item = data.Students[i];
					if(item.stu_Status == '1')
						status="<span class='label label-success'>Active</span>";
					else
						status="<span class='label label-danger'>Inactive</span>"; 
					if(item.PhotoImagePath == null){item.PhotoImagePath = 'images/profile-image.png'}
					result+="<tr><td>"+n+"</td><td>"+item.Email+"</td><td>"+item.FirstName+"&nbsp"+item.LastName+"</td><td>"+item.MobileNo+"</td><td align='center'><img style='height:20px' src='"+base+item.PhotoImagePath+"'/></td><td align='center'>"+status+"</td><td align='center'><a href='"+base_url+"AdminStudents/editstudent/"+item.UserId+"' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5'><i class='fa fa-pencil'></i></a> <button data-toggle='modal' data-target='' OnClick='del("+item.UserId+");' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' type='button' title='Delete' ><i class='fa fa-trash-o'></i></button></td></td></tr>";
				});
				$('#student_table').find('tbody').html(result); 
				$('#Pagination').html(data.pagination);
				$('#Pagination').find('li').click(function(){
					var page = $(this).attr('page');  
					get_students(page); 
				})
			}
		});
	}
});

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
						alertify.alert('<p style="color:red"> Deleted the student records permanently<p>')
						setTimeout(function(){$('#AlertMsg').hide();},3500);
						get_students(page);
					}
				}
			})
		}
		else
			return false;
		});
	}
	else
	{
		$('#AlertMsg').html('Please select atleast One (1) User to delete !!.');
		$('#AlertMsg').removeClass('alert-success');
		$('#AlertMsg').addClass('alert-danger');
		$('#AlertMsg').show();
		setTimeout(function(){$('#AlertMsg').hide();},3500);
	}
}

function del(id)
{
	alertify.confirm("Do you really want to delete all the selected users ?", function (e) {
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
						alertify.alert('<p style="color:red"> Deleted the student records permanently<p>')
						setTimeout(function(){$('#AlertMsg').hide();},3500);
						var cpage = 1;
						location.reload();
					}
				}
			});
		}
	});
}