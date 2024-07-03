$(function(){
	var cpage= 1;
	get_Adds(cpage);
	
	$('#searchResults').click(function(){
		get_Adds(cpage);
	});
	
	/* Image Validation <---- Start's */
	$('#adds_image').change(function () {
		var ImG = $("#adds_image").val();
		var extension = ImG.split('.').pop().toUpperCase();
		if(ImG.length < 1)
		{
			ImGok = 0;
			$("#adds_image").val('');
		}
		else if (extension!="PNG" && extension!="JPG" && extension!="GIF" && extension!="JPEG")
		{
			alertify.alert("invalid extension "+extension);
			$("#adds_image").val('');
		}
	});
	/* Image Validation End's. -->*/
	
	/* URL Validation */
	$('#AddLink').blur(function(){
		var url = $.trim($('#AddLink').val());
		var pattern = /^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
		if(!pattern.test(url))
		{
			$('#AddLink').val('');
			$('#AddLink').css('border','1px solid red');
		}
		else
			$('#AddLink').css('border','');
	});
	$('#Addnew').click(function(){
		reset();
		$('#Addnew').hide();
		$('#AddsDiv').show();
		$('#bannerSubmit').show();
		$('#CancelClick').show();
	});
	
	$('#CancelClick').click(function(){
		$('#AddsDiv').hide();
		$('#bannerSubmit').hide();
		$('#CancelClick').hide();
		$('#Addnew').show();
	});
	
	$('#bannerSubmit').click(function(){
		addAdds();
	});
});

function reset()
{
	$('#Addspage').select2('val','');
	$('#Addspage').css('border');
	$('#AddLink').val('');
	$('#AddLink').css('border');
	$('#adds_image').val('');
	$('#adds_image').css('border');
	$('#Status').select2('val',''); 
	$('#Status').css('border');
	$('#UpId').val('');
}

function addAdds()
{
	var invalid = '';
	var UpId = $.trim($('#UpId').val());
	if($.trim($('#Addspage').val())=='')
	{
		invalid = 1;
		$('#s2id_Addspage').css('border','1px solid red');
	}
	else
		$('#s2id_Addspage').css('border','');
	
	if($.trim($('#AddLink').val()) == '')
	{
		invalid = 1;
		$('#AddLink').css('border','1px solid red');
	}
	else
		$('#AddLink').css('border','');
	
	if(UpId == '')
	{
		if($.trim($('#adds_image').val()) == '')
		{
			invalid = 1;
			$('#adds_image').css('border','1px solid red');
		}
		else
			$('#adds_image').css('border','');
	}
	
	if($.trim($('#Status').val()) == '')
	{
		invalid = 1;
		$('#s2id_Status').css('border','1px solid red');
	}
	else
		$('#s2id_Status').css('border','');
	
	if(invalid == '')
	{
		var data = new FormData();
		data.append('Addspage',$.trim($('#Addspage').val()));
		data.append('AddLink',$.trim($('#AddLink').val()));
		data.append('Status',$.trim($('#Status').val()));
		data.append('UpId',$.trim($('#UpId').val()));
		data.append('adds_image',document.getElementById('adds_image').files[0]);
		$.ajax({
			url: "",
			type:"POST",
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, 
			contentType: false,
			enctype: 'multipart/form-data',
			beforeSend: function(){
				$('#submit').prop('disabled', true);
			},
			complete: function(){
				$('#submit').prop('disabled', false);
			},
			success: function(data)
			{
				if(data == 1)
				{
					$('#CancelClick').trigger('click');
					alertify.alert("Added Succesfully");
					get_Adds('1');
				}
				else if(data == 4)
				{
					$('#CancelClick').trigger('click');
					alertify.alert("Updated Successfully");
					get_Adds('1');
				}
				else if(data == 5)
					alertify.alert("Active Adds for this Page Exceed.<br> Please De-Activate few adds or add this Add as In-Active.");
				else 
					alertify.alert("Some Thing went wrong. <br> Please try again.");
			}
		});
	}
}

function get_Adds(page)
{
	var pageid = $.trim($('#SearchAddspage').val());
	$.ajax({
		url: "",
		type: "POST",
		data:{'get':'Adds','pageid':pageid,'page':page},
		success:function(data)
		{
			data = $.parseJSON(data);
			var html = '';
			if(data.Adds.length>0)
			{
				$.each(data.Adds,function(i){
					var row = data.Adds[i];
					var Status = '';
					if(row.Status == '1')
						Status = "<span class='inac label label-success'>Active</span>";
					else
						Status = "<span class='inac label label-danger'>Inactive</span>";
					
					html+="<tr><td>"+row.AddId+"</td><td>"+row.PageName+"</td><td>"+row.RedirectLink+"</td><td>"+row.CreatedDateTime+"</td><td><img src='"+row.ImageLink+"' style='height:35px;'/></td><td>"+Status+"</td><td align='center'><button OnClick='editfun("+row.AddId+");' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5' type='button' title='Edit'><i class='fa fa-pencil'></i></button> <button OnClick='deletefun("+row.AddId+");' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' type='button' title='Delete' ><i class='fa fa-trash-o'></i></button></td></tr>";
				});
			}
			else
				html+="<tr><td></td><td></td><td></td><td> No Results Found..</td><td></td><td></td><td></td></tr>";
			
			$('#Adds_table').find('tbody').html(html);
			$('#pagination').html(data.pagination);
			$('#pagination').find('li').click(function(){
				get_Adds($(this).attr('page'));
			});
		}
	});
}

function editfun(id)
{
	reset();
	$.ajax({
		url: "",
		type: "POST",
		data:{'get':'Add','AddId':id},
		success:function(data)
		{
			data = $.parseJSON(data);
			$('#Addspage').select2('val',data.AddPageId);
			$('#AddLink').val(data.RedirectLink);
			$('#Status').select2('val',data.Status);
			$('#UpId').val(data.AddId);
			$('#Addnew').hide();
			$('#AddsDiv').show();
			$('#bannerSubmit').show();
			$('#CancelClick').show();
		}
	});
}

function deletefun(id)
{
	if(id!='')
	{
		alertify.confirm("Do you really want to delete this Add..?", function (e){
			if (e)
			{
				$.ajax({
					url: "",
					type: "POST",
					data:{'delete':'Adds','AddId':id},
					success:function(data)
					{
						alertify.alert('Deleted Successfully');
						get_Adds('1');
					}
				});
			}
		});
	}
}