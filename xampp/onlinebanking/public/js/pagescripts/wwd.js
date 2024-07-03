$(document).ready(function(){
	$('#WWDSubmit').click(function(){
		validate();
	});
});

function validate()
{
	var title = $.trim($('#Title').val());
	var BrochureLink = $.trim($('#BrochureLink').val());
	var Objectives = $.trim(CKEDITOR.instances.Objectives.getData());
			if(Objectives.length >505){
		alertify.alert("In Objectives Field Maximum 500 characters only with spaces.");
		return false;
	}
	var VisionMission = $.trim(CKEDITOR.instances.VisionMission.getData());
			if(VisionMission.length >505){
		alertify.alert("In Vision Mission Field Maximum 500 characters only with spaces.");
		return false;
	}
	var Milestones = $.trim(CKEDITOR.instances.Milestones.getData());
			if(Milestones.length >505){
		alertify.alert("In Milestones Field Maximum 500 characters only with spaces.");
		return false;
	}
	var WWDInvalid = '';
	
	if(title == '')
	{
		WWDInvalid = 1;
		$('#Title').css('border-color','red');
	}
	else
		$('#Title').css('border-color','');
	
	if(BrochureLink == '')
	{
		WWDInvalid = 1;
		$('#BrochureLink').css('border-color','red');
	}
	else
		$('#BrochureLink').css('border-color','');
	
	if(Objectives == '')
	{
		WWDInvalid = 1;
		$('#cke_Objectives').css('border','1px solid red')
	}
	else
		$('#cke_Objectives').css('border','')
	
	if(VisionMission == '')
	{
		WWDInvalid = 1;
		$('#cke_VisionMission').css('border','1px solid red')
	}
	else
		$('#cke_VisionMission').css('border','')
	
	if(Milestones == '')
	{
		WWDInvalid = 1;
		$('#cke_Milestones').css('border','1px solid red')
	}
	else
		$('#cke_Milestones').css('border','')
	
	if(WWDInvalid == '')
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
	$("#Image_Path1").css("display","none");
	if(getpar == 'add')
	{
		$("#showhide").css("display","block");
	}
	if(getpar == 'cancel')
	{
		$("#showhide").css("display","none");
	}
}
function editfun(ServiceId)
{
	$("#showhide").css("display","block");
	$.ajax({
		type: "POST",
		url: base_url+"index.php/Adminourservices/EditService",
		data: "ServiceId="+ServiceId,
		success: function(data)
		{
			var obj = JSON.parse(data);
			$("#Name").val(obj.Name);
			$("#Image_Path1").attr("src",obj.Image_Path);
			$("#Status").select2('val',obj.Status);
			$("#ShortDesc").val(obj.ShortDesc);
			CKEDITOR.instances['CareerInfTxt'].setData(obj.Description);
			$("#Id").val(ServiceId);
			$("#Image_Path1").css("display","block");
		}
	});
}
function deletefun(ServiceId)
{
	if(confirm("Are you sure You want to delete this record?"))
	{
		$.ajax({
				type: "POST",
				url: base_url+"index.php/Adminourservices/DeleteService",
				data : "ServiceId="+ServiceId,
				success: function(data)
				{
					alertify.alert("your record has been deleted successfully");
					window.location.reload();
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
			CKEDITOR.replace( 'Objectives' );
			CKEDITOR.replace( 'VisionMission',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'Milestones',{customConfig : 'config-image.js'});
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