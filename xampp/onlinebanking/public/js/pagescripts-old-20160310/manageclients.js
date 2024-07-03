function reset()
{
	$('#Name').val('');
	$('#LogoImage').val('');
	$('#logourl').val('');
	$('#Name').css('border','');
	$('#LogoImage').css('border-color','');
	$('#status').select2('val','1');
	$('#ClientId').val('');
}
function showhidetab(getpar)
{
	$("#Name").val("");
	$("#logourl").attr("src","");
	$("#status").val("");
	$("#ClientId").val("");
	$("#logourl").css("display","none");
	if(getpar == 'add')
	{
		$("#showhide").css("display","block");
		$('#AddBtn').hide();
		$('#managementclientBtn').show();
		$('#cancel').show();
		reset();
	}
	if(getpar == 'cancel')
	{
		$("#showhide").css("display","none");
		$('#managementclientBtn').hide();
		$('#cancel').hide();
		$('#AddBtn').show();
	}
}
function editfun(ClientId)
{
	reset();
	$('#Name').css('border','');
	$('#logourl').css('border','');
	$("#showhide").css("display","block");
	$.ajax({
		type: "POST",
		url: base_url+"index.php/Client/EditClient",
		data: "ClientId="+ClientId,
		success: function(data)
		{
		    $('#managementclientBtn').show();
			$('#cancel').show();
			var obj = JSON.parse(data);
			$("#Name").val(obj.Name);
			$("#logourl").css("display","block");
			$("#logourl").attr("src",base_url+"public/itemimages/"+obj.LogoImage);
			$("#status").select2('val',obj.status);
			$("#ClientId").val(ClientId);
			//$("#banner_detail").val(obj.banner_detail);
			$("#showhide").css("display","block");
		    $('#AddBtn').hide();
		}
	});
}
function deletefun(ClientId)
{
	if(confirm("Are you sure You want to delete this record?"))
	{
		$.ajax({
				type: "POST",
				url: base_url+"index.php/Client/DeleteClient",
				data : "ClientId="+ClientId,
				success: function(data)
				{
					alertify.alert("your record has been deleted successfully");
					search_clients();
				}
		});
	}
}

$(document).ready(function(){
	var cpage=1;
	search_clients(cpage);
})
var base = base_url+"public/itemimages/";
		
function search_clients(page)
			{
				//var stype = $('#search_select').val();
				var skey = $('#search').val();
				$.ajax({
				url: base_url+"Client/search",
					
					type:"POST",
					data:{'skey':skey, 'page': page},
					
					success:function(data)
					{
						data = $.parseJSON(data)
						$("#client_table").find('tbody').empty();
						var html = '';
						var status = '';
						
						if(data.Clients.length>0)
						{
							$.each(data.Clients, function(i){
								var item = data.Clients[i];
								var path= base+item.LogoImage;
								if(item.status == '1')
									status = "<td><span class='inac label label-success'>Active</span></td>";
								else
									status = "<td align='center'><span class='inac label label-danger'>Inactive</span></td>";				
								html+='<tr align="center"><td>'+item.Name+'</td><td><img style="height:20px" src="'+path+'"></td>'+status+'<td><button data-toggle="modal" data-target="" OnClick="editfun('+item.ClientId+');" class="btn btn-xs btn-primary mar-b5 bt-r mar_b5" type="button" title="Edit" ><i class="fa fa-pencil"></i></button>&nbsp&nbsp<button data-toggle="modal" data-target="" OnClick="deletefun('+item.ClientId+');" class="btn btn-xs btn-danger mar-b5 bt-r mar_b5" type="button" title="Delete" ><i class="fa fa-trash-o"></i></button></td></tr>';
							});				
							
							 $("#client_table").find('tbody').html(html)
							$("#pagination").html(data.pagination)
							$(document).find(".pagination li").on("click",function(){
								cpage=$(this).attr('page');
								search_clients($(this).attr('page'))
							})
						}
						else
						{
							$("#client_table").find('tbody').html("<tr><td colspan='5'><p style='margin-bottom:0px; text-align:center;'>No Records Found...!</p> </td></tr>")
							$("#pagination").hide()
						}
					}					
				})
			}

$('#LogoImage').click(function(){
var file ;
	$(':file').change(function(){
		
		file = this.files[0];
		var name = file.name;
		var size = file.size;
		
		var type = file.type;
		var error=0;
		
		if(file.name.length < 1) {
			alertify.alert("Invalid File name");
			$('#LogoImage').val('');
			error=1;
		}
		else if(file.size > 2000000) {
				alertify.alert("File is too big, Max allowed size: 2MB");
				$('#LogoImage').val('');
				error=1;
		}
		else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
			alertify.alert("File doesnt match png, jpg or gif");
			$('#LogoImage').val('');
			error=1;
		}
		else{
			var img = new Image();
			var _URL = window.URL || window.webkitURL;
			img.src = _URL.createObjectURL(file);
			img.onload = function () {
				if(this.height  <160 || this.width  <190 )
				{
					err = '1';
					alertify.alert("Please upload Images with  minimum 190 x 160 resolutions");
					$('#LogoImage').val('');
					return false;
				}
				if(this.height  >170 || this.width  >200 )
				{
					err = '1';
					alertify.alert("Please upload Images with   200 x 170 resolutions");
					$('#LogoImage').val('');
					return false;
				}
				else
				{
					var reader = new FileReader();
					reader.onloadend = function() {
						$("#logourl").attr("src",reader.result);
					}
					reader.readAsDataURL(file); 
					$("#logourl").show();
					//$("#editbanImg").val('0')
				}
					
			};
			
		}
		
	})
})	
$('#managementclientBtn').click(function(){

		var Name = $.trim($('#Name').val());
		var LogoImage = $.trim($('#LogoImage').val());
		
		var err = '';
		if( Name =="")
		{
			err = 1;
			$('#Name').css('border','1px solid red');
		}
		else
			$('#Name').css('border','');
		
		if($.trim($('#ClientId').val())=='')
		{
			//console.log($.trim($('#ClientId').val()));
			if(LogoImage =="")
			{
				err = 1;
				$('#LogoImage').css('border','1px solid red');
			}
			else
				$('#LogoImage').css('border','');
		}
		
		if(err == '')
		{
			$('#bannerform').removeAttr('onsubmit') ;
			$('#bannerform').trigger('submit');
		}
})
