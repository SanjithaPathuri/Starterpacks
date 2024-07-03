$(document).ready(function(){
	$('#SubmitBtn').click(function(){
		validate();
	});
	search_service();
	
	$('#Link').blur(function(){
		var details = $(this).val();
		
		var reg = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
		if(reg.test(details))
			$(this).css('border-color','');
		else
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
	});

});

		var cpage=1;
function search_service(page)
{
	//var stype = $('#search_select').val();
	var skey = $('#search').val();
	$.ajax({
		url: base_url+"Adminourservices/search",
		type:"POST",
		data:{'skey':skey, 'page': page},
		
		success:function(data)
		{
			data = $.parseJSON(data)
			$("#service_table").find('tbody').empty();
			var html = '';
			var Status = '';
			
			if(data.OurServices.length>0)
			{
				$.each(data.OurServices, function(i){
					var item = data.OurServices[i];
					
				var path= base_url+item.Image_Path;
					if(item.Status == '1')
						Status = "<td align='center'><span class='inac label label-success'>Active</span></td>";
					else
						Status = "<td align='center'><span class='inac label label-danger'>Inactive</span></td>";				
					html+='<tr><td>'+item.Name+'</td><td align="center"><img style="height:20px" src="'+path+'"/></td>'+Status+'<td align="center"><button data-toggle="modal" data-target="" OnClick="editfun('+item.Id+');" class="btn btn-xs btn-primary mar-b5 bt-r mar_b5" type="button" title="Edit" ><i class="fa fa-pencil"></i></button> <button data-toggle="modal" data-target="" OnClick="deletefun('+item.Id+');" class="btn btn-xs btn-danger mar-b5 bt-r mar_b5" type="button" title="Delete" ><i class="fa fa-trash-o"></i></button></td></tr>';
				});				
				
				 $("#service_table").find('tbody').html(html)
				$("#pagination").html(data.pagination)
				$(document).find(".pagination li").on("click",function(){
					cpage=$(this).attr('page');
					search_service($(this).attr('page'))
				})
			}
			else
			{
				$("#service_table").find('tbody').html("<tr><td colspan='4'><div class='alert alert-danger mar_b0'> No Records Found..! </div></td></tr>")
				$("#pagination").hide()
			}
		}					
	})
}
$('#CareerInf_Img').click(function(){
var file ;
	$(':file').change(function(){
		
		file = this.files[0];
		var name = file.name;
		var size = file.size;
		
		var type = file.type;
		var error=0;
		
		if(file.name.length < 1) {
			alertify.alert("Invalid File name");
			$('#CareerInf_Img').val('');
			error=1;
		}
		else if(file.size > 2000000) {
				alertify.alert("File is too big, Max allowed size: 2MB");
				$('#CareerInf_Img').val('');
				error=1;
		}
		else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
			alertify.alert("File doesnt match png, jpg or gif");
			$('#CareerInf_Img').val('');
			error=1;
		}
		else{
			var img = new Image();
			var _URL = window.URL || window.webkitURL;
			img.src = _URL.createObjectURL(file);
			img.onload = function () {
				/* if(this.height  >380 || this.width  >380 )
				{
					err = '1';
					alertify.alert("Please upload Images with   380 x 380 resolutions");
					$('#CareerInf_Img').val('');
					return false;
				} */
				if(this.height <359 || this.width<359 )
				{
					err = '1';
					alertify.alert("Please upload Images with atleast 360 x 360 and Maximum 380 x 380 resolutions");
					$('#CareerInf_Img').val('');
					
					return false;
				}
				if(this.height >380   || this.width>380)
				{
					err = '1';
					alertify.alert("Please upload Images with Maximum of 380 x 380  resolutions");
					$('#CareerInf_Img').val('');
					
					return false;
					
				}
				else
				{
					
					var reader = new FileReader();
					reader.onloadend = function() {
						$("#Image_Path1").attr("src",reader.result);
					}
					reader.readAsDataURL(file); 
					$("#Image_Path1").show();
					//$("#editbanImg").val('0')
				}
					
			};
			
		}
		
	})
})	

function reset()
{
	$('#Name').val('');
	$('#CareerInf_Img').val('');
	$('#ShortDesc').val('');
	$('#Link').val('');
	$('#Status').select2('val','1');
	$('#cke_CareerInfTxt').val('');
	CKEDITOR.instances['CareerInfTxt'].setData('');
	$('#Name').css('border-color','');
	$('#CareerInf_Img').css('border-color','');
	$('#ShortDesc').css('border-color','');
	$('#Link').css('border-color','');
	$('#s2id_Status').find('.select2-choice').css('border-color','');
	$('#cke_CareerInfTxt').css('border','');
	$('#Id').val('');
}

function validate()
{
	var Name = $.trim($('#Name').val());
	var CareerInf_Img = $.trim($('#CareerInf_Img').val());
	var ShortDesc = $.trim($('#ShortDesc').val());
	var Link = $.trim($('#Link').val());
	
	var CareerInfTxt = $.trim(CKEDITOR.instances.CareerInfTxt.getData()); 
		if(CareerInfTxt.length >405){
		alertify.alert("In Service text Field Maximum 400 characters only with spaces.");
		return false;
	}
	var OSInvalid = '';
	if(Name == '')
	{
		OSInvalid = 1;
		$('#Name').css('border-color','red');
	}
	else
		$('#Name').css('border-color','');
	if($("#Id").val()==''){
	if(CareerInf_Img =='' )
	{
		OSInvalid = 1;
		$('#CareerInf_Img').css('border-color','red');
	}
	}
	else
		$('#CareerInf_Img').css('border-color','');
	
	if(ShortDesc == '')
	{
		OSInvalid = 1;
		$('#ShortDesc').css('border-color','red');
	}
	else
		$('#ShortDesc').css('border-color','');
	if(Link == '')
	{
		OSInvalid = 1;
		$('#Link').css('border-color','red');
	}
	else
		$('#Link').css('border-color','');
	
	
	 if(CareerInfTxt == '')
	{
		OSInvalid = 1;
		$('#cke_CareerInfTxt').css('border','1px solid red')
	}
	else
		$('#cke_CareerInfTxt').css('border','') 
	
	if(OSInvalid == '')
	{
		$('#bannerform').removeAttr('onsubmit');
		$('#bannerform').trigger('submit');
	}
}

function showhidetab(getpar)
{
	$("#Name").val("");
	$("#Image_Path1").attr("src","");
	$("#Status").val("");
	CKEDITOR.instances['CareerInfTxt'].setData("");
	$("#Id").val("");
	$("#ShortDesc").val("");
	$("#Link").val("");
	$("#Image_Path1").css("display","none");
	if(getpar == 'add')
	{
		$('#CancelBtn').show();
		$("#showhide").css("display","block");
		$('#AddBtn').hide();
		$('#SubmitBtn').show();
		reset();
	}
	if(getpar == 'cancel')
	{
		$('#CancelBtn').hide();
		$("#showhide").css("display","none");
		$('#SubmitBtn').hide();
		$('#AddBtn').show();
	}
}
function editfun(ServiceId)
{
	reset();
	$('#Name').css('border-color','');
	$('#CareerInf_Img').css('border-color','');
	$('#ShortDesc').css('border-color','');
	$('#Link').css('border-color','');
	$('#s2id_Status').find('.select2-choice').css('border-color','');
	$('#cke_CareerInfTxt').css('border','');
	$("#showhide").css("display","block");
	$.ajax({
		type: "POST",
		url: base_url+"Adminourservices/EditService",
		data: "ServiceId="+ServiceId,
		success: function(data)
		{
			 $('#search_service').show();
			var obj = JSON.parse(data);
			$("#Name").val(obj.Name);
			$("#Image_Path1").attr("src",obj.Image_Path);
			$("#Status").select2('val',obj.Status);
			$("#ShortDesc").val(obj.ShortDesc);
			$("#Link").val(obj.Link);
			CKEDITOR.instances['CareerInfTxt'].setData(obj.Description);
			$("#Id").val(ServiceId);
			$("#Image_Path1").css("display","block");
			$('#AddBtn').hide();
		    $('#SubmitBtn').show();
			$('#CancelBtn').show();
		}
	});
}
function deletefun(ServiceId)
{
	if(confirm("Are you sure You want to delete this record?"))
	{
		$.ajax({
				type: "POST",
				url: base_url+"Adminourservices/DeleteService",
				data : "ServiceId="+ServiceId,
				success: function(data)
				{
					alertify.alert("your record has been deleted successfully");
					search_service();
				}
		});
	}
}
 if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
	CKEDITOR.tools.enableHtml5Elements( document );
	CKEDITOR.config.height = 150;
	CKEDITOR.config.width = 'auto';
	CKEDITOR.config.forcePasteAsPlainText = true;
	CKEDITOR.config.extraPlugins='whitelist,wordcount,maxlength'; 
	CKEDITOR.config.toolbar = [
		   ['Styles','Format','Font'],
		   ['Bold','Italic','StrikeThrough','-','Undo','Redo','-','Find','Replace'],
		   '/',
		   ['NumberedList','BulletedList','-','JustifyBlock'],
		  ['-','Link','Flash','Source']
		] ;
	CKEDITOR.config.removePlugins = 'PasteFromWord';
	var initSample = ( function() {
		var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );

		return function() {
			var classname = $('.contact').attr('class');
			var editorElement = CKEDITOR.classname;
			if ( isBBCodeBuiltIn ) {
				editorElement.setHtml(
					'Hello world!'
				);
			}
		
		// Depending on the wysiwygare plugin availability initialize classic or inline editor.
		if ( wysiwygareaAvailable ) {
			CKEDITOR.replace( 'CareerInfTxt' );
			CKEDITOR.replace( 'editor2',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor3',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor4',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor5',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor6',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor7',{customConfig : 'config-image.js'});
			
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			CKEDITOR.inline( 'editor' );
		}
	};
	function isWysiwygareaAvailable() {
		if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
			return true;
		}
		return !!CKEDITOR.plugins.get( 'wysiwygarea' );
	}
} )();
initSample();
