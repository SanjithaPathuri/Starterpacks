$(function(){
	$('.names').blur(function(){
		var namesPattern = /^[a-zA-Z ]*$/;
		var name = $(this).val();
		if(!namesPattern.test(name) || name == '')
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
		else
			$(this).css('border-color','');
	});
	
	$('.link').blur(function(){
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
	
	$('#image').change(function(){
		var file ;
		file = this.files[0];
		var name = file.name;
		var size = file.size;
		
		var type = file.type;
		var error=0;
		
		if(file.name.length < 1) {
			alertify.alert("Invalid File name");
			$('#image').val('');
			error=1;
		}
		else if(file.size > 2000000) {
				alertify.alert("File is too big, Max allowed size: 2MB");
				$('#image').val('');
				error=1;
		}
		else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
			alertify.alert("File doesnt match png, jpg or gif");
			$('#image').val('');
			error=1;
		}
		else
		{
			var img = new Image();
			var _URL = window.URL || window.webkitURL;
			img.src = _URL.createObjectURL(file);
			img.onload = function () {
				if(this.height <620 || this.width<430 )
				{
					err = '1';
					alertify.alert("Please upload Images with atleast 620 x 430 resolutions");
					$('#image').val('');
					return false;
				}
				else
				{
					
					var reader = new FileReader();
					reader.onloadend = function() {
						$("#Mtimg").attr("src",reader.result);
					}
					reader.readAsDataURL(file); 
					$("#Mtimg").show();
					//$("#editbanImg").val('0')
				}	
			};
		}
	})	
});
function reset()
{
	$('#Name').val('');
	$('#Branch').val('');
	$('#Certifiedby').val('');
	$('#Mt_fb').val('');
	$('#Mt_tw').val('');
    $('#Mt_google').val('');
	$('#Mt_in').val('');
	$('#Mtimg').val(''); 
	$('#cke_Mtext').val('');
	CKEDITOR.instances['Mtext'].setData('');
	$('#Name').css('border','');
	$('#Branch').css('border','');
	$('#Certifiedby').css('border','');
	$('#Mt_fb').css('border','');
	$('#Mt_tw').css('border','');
	$('#Mt_google').css('border','');
	$('#Mt_in').css('border','');
	$('#Mtimg').css('border','');
	$('#cke_Mtext').css('border','');
	$('#Id').val('');
	$('#image').val('');
	$('#image').css('border-color','');
	$('#status').select2('val','1');
}

function showhidetab(getpar)
{
	$("#Name").val("");
	$("#Branch").val("");
	$("#Certifiedby").val("");
	$("#Mt_fb").val("");
	$("#Mt_tw").val("");
    $("#Mt_google").val("");
	$("#Mt_in").val("");
	$("#Mtimg").attr("src","");
	$("#Mtimg").css("display","none");
	$("#Id").val("");
	$("#status").val("");
	CKEDITOR.instances['Mtext'].setData("");
	$("#BannerId").val("");
	$("#bannerurl").css("display","none");
	if(getpar == 'add')
	{
		$("#showhide").css("display","block");
		$('#AddBtn').hide();
		$('#managementtestBtn').show();
		$('#CancelBtn').show();
		reset();
	}
	if(getpar == 'cancel')
	{
		$("#showhide").css("display","none");
		$('#managementtestBtn').hide();
		$('#CancelBtn').hide();
		$('#AddBtn').show();
	}
}
function editfun(teamid)
{
	$('#Name').css('border','');
	$('#Branch').css('border','');
	$('#Certifiedby').css('border','');
	$('#Mt_fb').css('border','');
	$('#Mt_tw').css('border','');
	$('#Mt_google').css('border','');
	$('#Mt_in').css('border','');
	$('#Mtimg').css('border','');
	$('#cke_Mtext').css('border','');
	
	$("#showhide").css("display","block");
	$.ajax({
			type: "POST",
			url: base_url+"index.php/Managementteam/EditMember",
			data : "teamid="+teamid,
			success: function(data)
			{
				$("#showhide").css("display","block");
				$('#AddBtn').hide();
				$('#managementteamBtn').show();
				var obj = JSON.parse(data);
				var Mtimg = base_url+'images/Managementteam/'+obj.Mtimg;
				$("#Name").val(obj.Name);
				$("#Branch").val(obj.Branch);
				$("#Certifiedby").val(obj.Certifiedby);
				$("#Mt_fb").val(obj.Mt_fb);
				$("#Mt_tw").val(obj.Mt_tw);
				$("#Mt_google").val(obj.Mt_google);
				$("#Mt_in").val(obj.Mt_in);
				CKEDITOR.instances['Mtext'].setData(obj.Mtext);
				var ass=$("#Mtimg").css("display","block");
				//console.log(ass);
				if($("#Mtimg").val()!=''){
					$("#Mtimg").attr("src",base_url+'images/noimage.jpg');
				}
				else{

				$("#Mtimg").attr("src",base_url+'images/Managementteam/'+obj.Mtimg);
				
				}
				
				//$("#status").val(obj.status);
				$("#status").select2('val',obj.status);
				$("#Id").val(teamid);
				$('#managementtestBtn').show();
				$('#CancelBtn').show();
			}
		});
}


$(document).ready(function(){
	var cpage=1;
	search_management(cpage);
})


function search_management(page)
{
	//var stype = $('#search_select').val();
	var skey = $('#search').val();
	$.ajax({
		url: base_url+"Managementteam/search",
		
		type:"POST",
		data:{'skey':skey, 'page': page},
		
		success:function(data)
		{
			data = $.parseJSON(data)
			$("#management_table").find('tbody').empty();
			var html = '';
			var status = '';
			var Mtimg;
			if(data.Managements.length>0)
			{
				$.each(data.Managements, function(i){
					var item = data.Managements[i];
				var base = base_url+"images/Managementteam/";
				var noimage= base_url+'images/noimage.jpg';								
				var str = item.Mtext;
				comm = str.substring(0,50);
				var path= base+item.Mtimg;
				
				if(item.Mtimg!= '')
					
						Mtimg = "<img style='height:20px' src='"+path+"'>";
					else
						Mtimg = "<img style='height:20px' src='"+noimage+"'>";
						
					if(item.status == '1')
						status = "<td align='center'><span class='inac label label-success'>Active</span></td>";
					else
						status = "<td align='center'><span class='inac label label-danger'>Inactive</span></td>";				
					html+='<tr><td>'+item.Name+'</td><td>'+item.Branch+'</td><td>'+item.Certifiedby+'</td><td align="center">'+Mtimg+'</td><td>'+comm+'</td>'+status+'<td align="center"><button data-toggle="modal" data-target="" OnClick="editfun('+item.Id+');" class="btn btn-xs btn-primary mar-b5 bt-r mar_b5" type="button" title="Edit" ><i class="fa fa-pencil"></i></button> <button data-toggle="modal" data-target="" OnClick="deletefun('+item.Id+');" class="btn btn-xs btn-danger mar-b5 bt-r mar_b5" type="button" title="Delete" ><i class="fa fa-trash-o"></i></button></td></tr>';
				});				
				
				 $("#management_table").find('tbody').html(html)
				$("#pagination").html(data.pagination)
				$(document).find(".pagination li").on("click",function(){
					cpage=$(this).attr('page');
					search_management($(this).attr('page'))
				})
			}
			else
			{
				$("#management_table").find('tbody').html("<tr><td colspan='8'><p style='margin-bottom:0px; text-align:center;'>No Records Found...!</p> </td></tr>")
				$("#pagination").hide()
			}
		}					
	})
}

$('#managementtestBtn').click(function(){
		var Name = $.trim($('#Name').val());
		var Branch = $.trim($('#Branch').val());
		var Mt_fb = $.trim($('#Mt_fb').val());
		var Mt_tw = $.trim($('#Mt_tw').val());
		var Mt_google = $.trim($('#Mt_google').val());
		var Mt_in = $.trim($('#Mt_in').val());
		var Certifiedby = $.trim($('#Certifiedby').val());
		var image = $.trim($('#image').val());
		var Mtext = $.trim(CKEDITOR.instances.Mtext.getData()); 
		if(Mtext.length >405)
		{
			alertify.alert("In Content Field Maximum 400 characters only with spaces.");
			return false;
		}
	
		var err = '';
		if( Name =="")
		{
			err = 1;
			$('#Name').css('border','1px solid red');
		}
		else
			$('#Name').css('border','');
		if( Branch =="")
		{
			err = 1;
			$('#Branch').css('border','1px solid red');
		}else{
			$('#Branch').css('border','');
		}
		
		if( Mt_fb =="")
		{
			err = 1;
			$('#Mt_fb').css('border','1px solid red');
		}
		else
		{
			$('#Mt_fb').css('border','');
		}
		if( Mt_tw =="")
		{
			err = 1;
			$('#Mt_tw').css('border','1px solid red');
		}else{
			$('#Mt_tw').css('border','');
		}
		if( Mt_google =="")
		{
			err = 1;
			$('#Mt_google').css('border','1px solid red');
		}else{
			$('#Mt_google').css('border','');
		}
		if( Mt_in =="")
		{
			err = 1;
			$('#Mt_in').css('border','1px solid red');
		}else{
			$('#Mt_in').css('border','');
		}
		if( Certifiedby =="")
		{
			err = 1;
			$('#Certifiedby').css('border','1px solid red');
		}else{
			$('#Certifiedby').css('border','');
		}
		
		//if( image =="")
		//{
			//err = 1;
			//$('#image').css('border','1px solid red');
		//}
		//else{
			
			//$('#image').css('border','');
		//}
		if( Mtext =="")
		{
			err = 1;
			$('#cke_Mtext').css('border','1px solid red');
		}
		else{
			$('#cke_Mtext').css('border','');
		}
		
		if(err == '')
		{
			$('#bannerform').removeAttr('onsubmit') ;
			$('#bannerform').trigger('submit');
		}
})
function deletefun(teamid)
{
	alertify.confirm("Do you really want to delete this Banner ?", function (e) 
	{
		if (e) 
		{
			$.ajax({
				type: "POST",
				url: base_url+"index.php/Managementteam/DeleteMember",
				data : "teamid="+teamid,
				success: function(data)
				{
					
					alertify.alert("Record has been deleted successfully.");
					search_management();
					reset();
				}
			});
		}
	});
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
			CKEDITOR.replace( 'Mtext' );
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
