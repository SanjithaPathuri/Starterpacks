$(document).ready(function(){
	$('#Addnew').click(function(){
		$('#bannerform').trigger('reset');
		$('#Addnew').hide();
		$('#bannerSubmit').show();
		$('#CancelClick').show();
	});
	$('#CancelClick').click(function(){
		$('#CancelClick').hide();
		$('#bannerSubmit').hide();
		$('#Addnew').show();
		$('#BannerLink').css('border-color','')
		$('#banner_image').css('border-color','')
		$('#banner_detail').css('border-color','')
		$('#title').css('border-color','');
		$('#s2id_TypeId').css('border','');
		$('#TypeId').select2('val','');
		$('#status').select2('val','1');
	});
	$('.url').blur(function(){
		var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		var url = $.trim($(this).val());
		if(!urlPattern.test(url))
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
		else
			$(this).css('border-color','');
	})
	var file;
	var x;
	$(':file').change(function(){
		
		file = this.files[0];
		var name = file.name;
		var size = file.size;
		
		var type = file.type;
		var error=0;
		
		if(file.name.length < 1) {
			alertify.alert("<b style='color:red'>Invalid File name</b>");
			$(this).val('');
			error=1;
		}
		else if(file.size > 4000000) {
				alertify.alert("<b style='color:red'>File is too big, Max allowed size: 4MB</b>");
				$(this).val('');
				error=1;
		}
		else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
			alertify.alert("<b style='color:red'>File doesnt match png, jpg or gif</b>");
			$(this).val('');
			error=1;
		}
		else{
			$('#banner_image').css('border-color','red');
			var img = new Image();
			var _URL = window.URL || window.webkitURL;
			img.src = _URL.createObjectURL(file);
			img.onload = function () {
				if(this.height <819 || this.width<1439 )
				{
					err = '1';
					alertify.alert("<b style='color:red'>Please upload Images with atleast  1440 x 820 resolution</b>"); 
					$('#banner_image').val('');
					return false;
				}
				else
					$('#banner_image').css('border-color','red');
				/*if(this.height <407 || this.width<1599 )
				{
					if(this.height >750)
					{
						error=1;
						alert("Please upload Images with atleast  height less than 700 resolution");
						$('#BannerImage').val('');
						return false;
					}
					error=1;
					alert("Please upload Images with atleast 1600x408 resolution");
					$('#BannerImage').val('');
					return false;
				}*/
					
			};
			
		}
		
	});
	
	$('#bannerSubmit').click(function(){
		var invalid = '';
		if($.trim($('#title').val()) == '')
		{
			invalid = 1;
			$('#title').css('border-color','red');
		}
		else
			$('#title').css('border-color','');
		
		if($.trim($('#banner_detail').val()) == '')
		{
			invalid = 1;
			$('#banner_detail').css('border-color','red')
		}
		else
			$('#banner_detail').css('border-color','')
		
		if($.trim($('#BannerLink').val()) == '')
		{
			invalid = 1;
			$('#BannerLink').css('border-color','red')
		}
		else
			$('#BannerLink').css('border-color','')
		
		if($.trim($('#TypeId').val()) == '')
		{
			invalid = 1;
			$('#s2id_TypeId').css('border','1px solid red')
		}
		else
			$('#s2id_TypeId').css('border','')
		
		/* Disabling Image validation in update as image is choice Starts here*/
		var UpId = $('#BannerId').val();
		if(UpId == '')
		{
			if($.trim($('#banner_image').val()) == '')
			{
				invalid = 1;
				$('#banner_image').css('border-color','red')
			}
			else
				$('#banner_image').css('border-color','')
		}
		/*-------------- Ends here ------------*/
		
		if(invalid == '')
		{
			$('#bannerform').removeAttr('onsubmit');
			$('#bannerform').trigger('submit');
		}
	});
});
function showhidetab(getpar)
{
	$("#title").val("");
	$("#bannerurl").attr("src","");
	$("#status").select2('val',"1");
	$("#banner_detail").val("");
	$("#BannerId").val("");
	$("#bannerurl").css("display","none");
	if(getpar == 'add')
	{
		$("#showhide").css("display","block");
	}
	if(getpar == 'cancel')
	{
		$("#showhide").css("display","none");
	}
}
function editfun(bannerid)
{
	$("#showhide").css("display","block");
	$.ajax({
				type: "POST",
				url: base_url+"/Banner/EditBanner",
				data : "bannerid="+bannerid,
				success: function(data)
				{
					var obj = JSON.parse(data);
					$("#title").val(obj.title);
					$("#bannerurl").css("display","block");
					$("#bannerurl").attr("src",base_url+obj.banner_image_url);
					$("#status").select2('val',obj.status);
					$("#BannerId").val(bannerid);
					$("#banner_detail").val(obj.banner_detail);
					$("#BannerLink").val(obj.BannerLink);
				}
	});
}
function deletefun(bannerid)
{
	alertify.confirm("Do you really want to delete this Banner ?", function (e) {
		if (e) 
		{
			$.ajax({
					type: "POST",
					url: base_url+"Banner/DeleteBanner",
					data : "bannerid="+bannerid,
					success: function(data)
					{
						alert("your record has been deleted successfully");
						window.location.reload();
					}
			});
		}
	});
}
