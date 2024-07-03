/*--------------------Text Editers-------------Starts Here--*/
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
			CKEDITOR.replace('Dsescription');
			CKEDITOR.replace('Kit',{customConfig : 'config-image.js'});
			
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
autovalid();
/*--------------------Text Editers-------------Ends Here----*/
function autovalid()
{
	$('#WorkshopImg').change(function()
	{
		var file ;
		file = this.files[0];
		var name = file.name;
		var size = file.size;
		
		var type = file.type;
		var error=0;
		
		if(file.name.length < 1) {
			alertify.alert("Invalid File name");
			$('#WorkshopImg').val('');
			error=1;
		}
		else if(file.size > 2000000) {
				alertify.alert("File is too big, Max allowed size: 2MB");
				$('#WorkshopImg').val('');
				error=1;
		}
		else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
			alertify.alert("File doesnt match png, jpg or gif");
			$('#WorkshopImg').val('');
			error=1;
		}
		else
		{
			var img = new Image();
			var _URL = window.URL || window.webkitURL;
			img.src = _URL.createObjectURL(file);
			img.onload = function () {
				if(this.height <500 || this.width<500 )
				{
					err = '1';
					alertify.alert("Please upload Images with atleast 500 x 500 resolutions");
					$('#WorkshopImg').val('');
					return false;
				}
			};
		}
	});
	
	$('#pdffiles').change(function()
	{
			var file = this.files[0];
			var name = file.name;
			var size = file.size;
			
			var type = file.type;
			var error=0;
			if(file.name.length < 1) 
			{
				alertify.alert("Invalid File name")
				$('#pdffiles').val('');
				
			}				
			else if(file.type != 'application/pdf') 
			{
				alertify.alert("Please upload file in PDF format");
				$('#pdffiles').val('');
				
			}
	});
	
	$('.text').blur(function(){
		var namesPattern = /^[a-zA-Z ]*$/;
		var text = $.trim($(this).val());
		if(!namesPattern.test(text))
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
		else
			$(this).css('border-color','');
	});
	
	$('.nums').blur(function(){
		var numsPattern = /^[0-9]{1,10}$/;
		var nums = $.trim($(this).val());
		if(!numsPattern.test(nums))
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
		else
			$(this).css('border-color','');
	});
	
	$('.email').blur(function(){
		var numsPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i ;
		var email = $.trim($(this).val());
		if(!numsPattern.test(email))
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
		else
			$(this).css('border-color','');
	});
	
	$('.mobile').blur(function(){
		var numsPattern =/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		var mobile = $.trim($(this).val());
		if(!numsPattern.test(mobile))
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
		else
			$(this).css('border-color','');
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
	});
}