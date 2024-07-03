$(document).ready(function(){
	$('#managementteamBtn').click(function(){
		var err = '';
		var Mtext = $.trim(CKEDITOR.instances.Mtext.getData());
		var Name = $.trim($('#Name').val());
		var Branch = $.trim($('#Branch').val());
		var Certifiedby = $.trim($('#Certifiedby').val());
		var Mt_fb = $.trim($('#Mt_fb').val());
		var Mt_tw = $.trim($('#Mt_tw').val());
		var Mt_google = $.trim($('#Mt_google').val());
		var Mt_in = $.trim($('#Mt_in').val());
		var Mtimg = $.trim($('#Mtimg').val());
		if(Mtext == '' || Name=='' || Branch=='' || Certifiedby=='' || Mt_fb=='' || Mt_tw=='' || Mt_google=='' || Mt_in=='' || Mtimg=='' )
			{
				$('#cke_Mtext').css('border-color','red')
				$('#cke_Name').css('border-color','red');
				$('#cke_Branch').css('border-color','red');
				$('#cke_Certifiedby').css('border-color','red');
				$('#cke_Mt_fb').css('border-color','red');
				$('#cke_Mt_tw').css('border-color','red');
				$('#cke_Mt_google').css('border-color','red');
				$('#cke_Mt_in').css('border-color','red');
				$('#cke_Mtimg ').css('border-color','red');
				;
				err = 1;
			}
			else
			{
				$('#cke_Mtext').css('border-color','')
				$('#cke_Name').css('border-color','');
				$('#cke_Branch').css('border-color','');
				$('#cke_Certifiedby').css('border-color','');
				$('#cke_Mt_fb').css('border-color','');
				$('#cke_Mt_tw').css('border-color','');
				$('#cke_Mt_google').css('border-color','');
				$('#cke_Mt_in').css('border-color','');
				$('#cke_Mtimg ').css('border-color','');
				err= 0;
			}
			if(err == '')
			{
				var data = new FormData();
				data.append('Mtext',Mtext);
				data.append('Name',Name);
				data.append('Branch',Branch);
				data.append('Certifiedby',Certifiedby);
				data.append('Mt_fb',Mt_fb);
				data.append('Mt_tw',Mt_tw);
				data.append('Mt_google',Mt_google);
				data.append('Mt_in',Mt_in);
				data.append('type', 'Managementteam');
				if($('#Mtimg').val() != '')
					data.append('file', $("#Mtimg")[0].files[0]);
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
						$("#loading").show();
					},
					complete: function()
					{
						$("#loading").hide();
					},
					success: function(result)
					{
						alertify.alert("Managementteam Information Updated Successfully");
					}
				});
			}
		})
	});
	
	
	

/* ------------------------- CK EDITER CODE Starts Here ----------------------------*/
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
	/*CKEDITOR.config.wordcount = {
		showWordCount: true,
		showCharCount: false,
		maxWordCount: 500,
		maxCharCount: 10000,
		countSpacesAsChars: true
	};*/
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
			
			
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			CKEDITOR.inline( 'Managementteam' );
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
/* ------------------------- CK EDITER CODE Ends Here ----------------------------*/