$(document).ready(function(){
	var alert = '';
	var cpage = 1;
	get_blogs(cpage);
	$('#Add').click(function(){
		showform();
	});
	$('#Cancel').click(function(){
		hideform();
		reset();
	});
	CKEDITOR.replace('Description');
	$('#Submit').click(function(){
		Submit();
	});
	$('#Blog_Tags').tagsInput();
	$('#Blog_Tags').addTag('Blogs');
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

function get_blogs(page)
{
	var skey = $('#search').val();
	$.ajax({
		url: "",
		type:"POST",
		data: {'get':'1','skey':skey,'page':page},
		success: function(data)
		{
			data = $.parseJSON(data);
			var html = '';
			var status = "";
			$.each(data.Blogs,function(i){
				var row = data.Blogs[i];
				 
				if(row.Status == '1')
					status = "<td><span class='inac label label-success'>Active</span></td>";
								else
					status = "<td align='center'><span class='inac label label-danger'>Inactive</span></td>";
				html+="<tr><td>"+row.CategoryName+"</td><td>"+row.BlogName+"</td><td>"+row.BlogDescription.substr(0,60)+".....</td><td>"+row.CreatedDate+"</td>"+status+"<td><button class='btn btn-xs btn-primary mar-b5 bt-r mar_b5' title='Edit' OnClick='editfunc("+row.BlogId+")'><i class='fa fa-pencil'></i></button>&nbsp&nbsp<button class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' title='Edit' OnClick='delfunc("+row.BlogId+")'><i class='fa fa-trash'></i></button></td></tr>"; 
			});
			$('#Blogs_table').find('tbody').html(html);
			$('#pagination').html(data.pagination);
			$('.pagination').find('a').click(function(){
				var newpage = $(this).parent('li').attr('page')
				get_blogs(newpage);
			});
		}
	});
}

function delfunc(id)
{
	alertify.confirm("Do you really want to delete the Blog ?", function (e) {
		if (e) 
		{
			$.ajax({
				url: "",
				type: "POST",
				data:{'id':id,'Delete':'true'},
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
						var cpage = 1;
						get_blogs(cpage);
						alertify.alert("Blog Deleted Successfully..")
					}
				}
			});
		}
	});
}

function showform()
{
	$('#Add').hide();
	$('.FormButtons').show();
	$('#blogs_form').show();
}

function hideform()
{
	reset()
	$('.FormButtons').hide();
	$('#blogs_form').hide();
	$('#Add').show();
}

function reset()
{
	$('#blogs_form').hide();
	$('#blogs_form').trigger('reset');
	$('#Blog_Heading').css('border-color','');
	$('#cke_Description').css('border','');
	$('#Status').select2('val','1');
	CKEDITOR.instances['Description'].setData('')
	$('#UpId').val('');
	$('#Category').select2('val','');
	$('#Blog_Tags').importTags('Blogs');
	$('#s2id_Category').find('.select2-choice').css('border-color','');
}

function Submit()
{
	var heading = $.trim($('#Blog_Heading').val());
	var Status  = $.trim($('#Status').val());
	var Desc  = $.trim(CKEDITOR.instances.Description.getData());
	var Category = $.trim($('#Category').val());
	var UpId = $.trim($('#UpId').val());
	var Blog_Tags = $.trim($('#Blog_Tags').val());
	var invalid = '';
	if(heading == '')
	{
		invalid = 1;
		$('#Blog_Heading').css('border-color','red');
	}
	else
		$('#Blog_Heading').css('border-color','');
	
	if(Blog_Tags == '')
	{
		invalid = 1;
		$('#Blog_Tags_tagsinput').css('border-color','red');
	}
	else
		$('#Blog_Tags_tagsinput').css('border-color','');
		
	if(Category == '')
	{
		invalid = 1;
		$('#s2id_Category').find('.select2-choice').css('border-color','red');
	}
	else
		$('#s2id_Category').find('.select2-choice').css('border-color','');
	if(Desc == '')
	{
		invalid = 1;
		$('#cke_Description').css('border','1px solid red');
	}
	else
		$('#cke_Description').css('border','');
	
	if(invalid == '')
	{
		var data = new FormData();
		data.append('Heading',heading);
		data.append('Desc',Desc);
		data.append('Status',Status);
		data.append('AddEdit','true');
		data.append('Category',$.trim($('#Category').val()));
		data.append('UpId',$.trim($('#UpId').val()));
		data.append('Blog_Tags',$.trim($('#Blog_Tags').val()));
		$.ajax({
				url: "", 
				type: "POST",
				data: data,
				cache: false,
				dataType: 'json',
				processData: false, 
				contentType: false,
				enctype: 'multipart/form-data',
				beforeSend: function()
				{
					$("#Submit").prop('disabled',true);
				},
				complete: function()
				{
					$("#Submit").prop('disabled',false);
				},
				success: function(data)
				{
					if(data == 1)
					{
						$('#Cancel').trigger('click');
						get_blogs('1');
						alertify.alert('Blog Added Successfully');
					}
					else if(data == 2)
					{
						$('#Cancel').trigger('click');
						get_blogs('1');
						alertify.alert('Blog Updated Successfully');
					}
					else
					{
						alertify.alert('Operation Failed..! <br>Please try later');
					}
				}
		});
	}
}

function editfunc(id)
{
	$.ajax({
				url: "",
				type: "POST",
				data:{'get':'Blog','id':id},
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
					
					data = $.parseJSON(data);
					$('#Add').trigger('click');
					$('#Blog_Heading').val(data.Blog.BlogName) 
					$('#Category').select2('val',data.Blog.BlogCategoryId);
					var editer_data = data.Blog.BlogDescription;
					CKEDITOR.instances['Description'].setData(editer_data);
					$('#Status').select2('val',data.Blog.Status);
					$('#UpId').val(data.Blog.BlogId);
					if(data.Blog.Tags!='')
						$('#Blog_Tags').importTags(data.Blog.Tags);
				}
	});
}
