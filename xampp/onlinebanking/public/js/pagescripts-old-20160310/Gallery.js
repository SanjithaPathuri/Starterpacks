$(function(){
	$('#reset').on('click',function(){
		reset();
	});
	
	var cpage = 1;
	get_Categories(cpage);
	$('#pagination').find('li').click(function(){
		var page = $(this).attr('page');
		get_Categories(page);
	});
	
	jQuery.validator.addMethod("lettersonly", function(value, element) 
	{
		return this.optional(element) || /^[a-z ]+$/i.test(value);
	}, "Letters and spaces only please");
	$("#gallery_form").validate({
		rules: {
			CategoryName: {
				required: true,
				lettersonly: true,				
			},
			Description: {
				required: true,
			},				
		},	 
		errorPlacement: function(){
			return false;
		}, 
		submitHandler: function() {				
			$.ajax({
				url: base+"AdminGallerys/CategorieADD",
				type:"POST",
				data: $('#gallery_form').serialize(),
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
						$('#AlertMsg').html('Category Added successfully..');						
						$('#AlertMsg').removeClass('alert-danger');
						$('#AlertMsg').addClass('alert-success');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},3500);
						reset();
						get_Categories(cpage);
					}
					else if(data == 2)
					{
						$('#AlertMsg').html('Category Updated successfully..');
						$('#AlertMsg').removeClass('alert-danger');
						$('#AlertMsg').addClass('alert-success');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},3500);
						reset();
						get_Categories(cpage);
					}
					 else if(data == 3)
					{
						$('#AlertMsg').html('CategoryName already exsits');
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
function get_Categories(page)
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
			var Status = '';
			$.each(data.Categories,function(i){
				var item = data.Categories[i];
				if(item.Status == '1')
					Status="<span class='label label-success'>Active</span>";
				else
					Status="<span class='label label-danger'>Inactive</span>";
				    result+="<tr><td><input type='checkbox' name='' did='"+item.CategoryId+"'></td><td>"+item.CategoryName+"</td><td>"+item.Description+"</td><td align='center'>"+Status+"</td><td align='center'><button data-toggle='modal' data-target='#testuser' OnClick='editfun("+item.CategoryId+");' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5' type='button' title='Edit' ><i class='fa fa-pencil'></i></button> <button data-toggle='modal' data-target='' OnClick='del("+item.CategoryId+");' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' type='button' title='Delete' ><i class='fa fa-trash-o'></i></button></td></td></tr>";
			});
			$('#gallery_table').find('tbody').html(result); 
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
			data: {'getCategory':id},
			success: function(data)
			{
				data = $.parseJSON(data);
				$('#CategoryName').val(data.CategoryName); 
				$('#Description').val(data.Description);
				$('#Status').select2('val',data.Status);
				$('#GaId').val(data.CategoryId);
			}
		});
	}
} 

function reset()
{
	$('#gallery_form').trigger('reset');
	$('#CategoryName').val('');
	$('#Description').val('');
	$('#Status').select2('val','1');
	$('#GaId').val('');
}

/* function multipleDel()
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
} */