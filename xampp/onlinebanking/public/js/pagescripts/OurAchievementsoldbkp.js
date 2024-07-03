function reset()
{
	$('#Name').val('');
	$('#Name').css('border','');
	$('#OurId').val('');
}
function showhidetab(getpar)
{
	$("#Name").val("");
	$("#status").val("");
	$("#OurId").val("");
	
	if(getpar == 'add')
	{
		$("#showhide").css("display","block");
		$('#AddBtn').hide();
		$('#achievementsBtn').show();
		reset();
	}
	if(getpar == 'cancel')
	{
		$("#showhide").css("display","none");
		$('#achievementsBtn').hide();
		$('#AddBtn').show();
	}
}
function editfun(OurId)
{
	reset();
	$('#Name').css('border','');
		$("#showhide").css("display","block");
	$.ajax({
		type: "POST",
		url: base_url+"index.php/OurAchievements/Editour",
		data: "OurId="+OurId,
		success: function(data)
		{
		    $('#achievementsBtn').show();
			var obj = JSON.parse(data);
			$("#Name").val(obj.Name);
			$("#status").select2('val',obj.status);
			$("#OurId").val(OurId);
			$("#showhide").css("display","block");
		    $('#AddBtn').hide();
		}
	});
}
function deletefun(OurId)
{
	if(confirm("Are you sure You want to delete this record?"))
	{
		$.ajax({
				type: "POST",
				url: base_url+"index.php/OurAchievements/Deleteour",
				data : "OurId="+OurId,
				success: function(data)
				{
					alertify.alert("your record has been deleted successfully");
					search_our();
				}
		});
	}
}

$(document).ready(function(){
	search_our();
})
		var cpage=1;
function search_our(page)
			{
				//var stype = $('#search_select').val();
				var skey = $('#search').val();
				$.ajax({
				url: base_url+"OurAchievements/search",
					
					type:"POST",
					data:{'skey':skey, 'page': page},
					
					success:function(data)
					{
						data = $.parseJSON(data)
						$("#Our_table").find('tbody').empty();
						var html = '';
						var status = '';
						if(data.OurAchievements.length>0)
						{
							$.each(data.OurAchievements, function(i){
								var item = data.OurAchievements[i];
								if(item.status == '1')
									status = "<td><span class='inac label label-success'>Active</span></td>";
								else
									status = "<td align='center'><span class='inac label label-danger'>Inactive</span></td>";				
								html+='<tr align="center"><td>'+item.Name+'</td>'+status+'<td><button data-toggle="modal" data-target="" OnClick="editfun('+item.OurId+');" class="btn btn-xs btn-primary mar-b5 bt-r mar_b5" type="button" title="Edit" ><i class="fa fa-pencil"></i></button><button data-toggle="modal" data-target="" OnClick="deletefun('+item.OurId+');" class="btn btn-xs btn-danger mar-b5 bt-r mar_b5" type="button" title="Delete" ><i class="fa fa-trash-o"></i></button></td></tr>';
							});				
							
							 $("#Our_table").find('tbody').html(html)
							$("#pagination").html(data.pagination)
							$(document).find(".pagination li").on("click",function(){
								cpage=$(this).attr('page');
								search_our($(this).attr('page'))
							})
						}
						else
						{
							$("#Our_table").find('tbody').html("<tr><td colspan='5'><p style='margin-bottom:0px; text-align:center;'>No Records Found...!</p> </td></tr>")
							$("#pagination").hide()
						}
					}					
				})
			}

$('#achievementsBtn').click(function(){

		var Name = $.trim($('#Name').val());
				
		var err = '';
		if( Name =="")
		{
			err = 1;
			$('#Name').css('border','1px solid red');
		}
		else
			$('#Name').css('border','');
		
		if(err == '')
		{
			$('#bannerform').removeAttr('onsubmit') ;
			$('#bannerform').trigger('submit');
		}
})
