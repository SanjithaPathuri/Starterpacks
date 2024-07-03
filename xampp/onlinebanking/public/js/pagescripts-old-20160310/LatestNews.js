function reset()
{
	$('#Name').val('');
	$('#Name').css('border','');
	$('#status').select2('val','1');
	$('#LatestId').val('');
}
function showhidetab(getpar)
{
	$("#Name").val("");
	$("#status").val("");
	$("#LatestId").val("");
	
	if(getpar == 'add')
	{
		$("#showhide").css("display","block");
		$('#AddBtn').hide();
		$('#managementnewsBtn').show();
		$('#cancel').show();
		reset();
	}
	if(getpar == 'cancel')
	{
		$("#showhide").css("display","none");
		$('#managementnewsBtn').hide();
		$('#cancel').hide();
		$('#AddBtn').show();
	}
}
function editfun(LatestId)
{
	reset();
	$('#Name').css('border','');
		$("#showhide").css("display","block");
	$.ajax({
		type: "POST",
		url: base_url+"index.php/LatestNews/EditNews",
		data: "LatestId="+LatestId,
		success: function(data)
		{
		    $('#managementnewsBtn').show();
			$('#cancel').show();
			var obj = JSON.parse(data);
			$("#Name").val(obj.Name);
			$("#status").select2('val',obj.status);
			$("#LatestId").val(LatestId);
			$("#showhide").css("display","block");
		    $('#AddBtn').hide();
		}
	});
}
function deletefun(LatestId)
{
	if(confirm("Are you sure You want to delete this record?"))
	{
		$.ajax({
				type: "POST",
				url: base_url+"index.php/LatestNews/DeleteNews",
				data : "LatestId="+LatestId,
				success: function(data)
				{
					alertify.alert("your record has been deleted successfully");
					search_news();
				}
		});
	}
}

$(document).ready(function(){
	var cpage=1;
	search_news(cpage);
})
		
function search_news(page)
			{
				//var stype = $('#search_select').val();
				var skey = $('#search').val();
				$.ajax({
				url: base_url+"LatestNews/search",
					
					type:"POST",
					data:{'skey':skey, 'page': page},
					
					success:function(data)
					{
						data = $.parseJSON(data)
						$("#News_table").find('tbody').empty();
						var html = '';
						var status = '';
						if(data.LatestNews.length>0)
						{
							$.each(data.LatestNews, function(i){
								var item = data.LatestNews[i];
								if(item.status == '1')
									status = "<td align='center'><span class='inac label label-success'>Active</span></td>";
								else
									status = "<td align='center'><span class='inac label label-danger'>Inactive</span></td>";				
								html+='<tr><td>'+item.Name+'</td>'+status+'<td align="center"><button data-toggle="modal" data-target="" OnClick="editfun('+item.LatestId+');" class="btn btn-xs btn-primary mar-b5 bt-r mar_b5" type="button" title="Edit" ><i class="fa fa-pencil"></i></button> <button data-toggle="modal" data-target="" OnClick="deletefun('+item.LatestId+');" class="btn btn-xs btn-danger mar-b5 bt-r mar_b5" type="button" title="Delete" ><i class="fa fa-trash-o"></i></button></td></tr>';
							});				
							
							 $("#News_table").find('tbody').html(html)
							$("#pagination").html(data.pagination)
							$(document).find(".pagination li").on("click",function(){
								cpage=$(this).attr('page');
								search_news($(this).attr('page'))
							})
						}
						else
						{
							$("#News_table").find('tbody').html("<tr><td colspan='5'><p style='margin-bottom:0px; text-align:center;'>No Records Found...!</p> </td></tr>")
							$("#pagination").hide()
						}
					}					
				})
			}

$('#managementnewsBtn').click(function(){

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
