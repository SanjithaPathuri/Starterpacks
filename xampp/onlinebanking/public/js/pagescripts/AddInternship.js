$(document).ready(function(){
	autovalidation();
	
	$('#Submit').click(function(){
		var invalid = '';
		$('#Internship_form input:required').each(function(){
			if($(this).val() == '')
			{
				$(this).css('border-color','red');
				invalid = 1;
			}
			else
				$(this).css('border-color','');
		});
		
		var desctxt = $.trim(CKEDITOR.instances.Description.getData());
		if(desctxt == '')
		{
			$('#cke_Description').css('border-color','red');
			invalid = '1';
		}
		else
			$('#cke_Description').css('border-color','');
		
		var cnttxt = $.trim(CKEDITOR.instances.Content.getData());
		if(cnttxt == '')
		{
			$('#cke_Content').css('border-color','red');
			invalid = '1';
		}
		else
			$('#cke_Content').css('border-color','');
		
		if($('#Internship_form').find('#DurationType').val() == '')
		{
			$('#Internship_form').find('#DurationType').parent('.customselect2').find('.select2-choice').css('border-color','red')
			invalid = '1';
		}
		else
			$('#Internship_form').find('#DurationType').parent('.customselect2').find('.select2-choice').css('border-color','')
		
		if($('#Internship_form').find('#Category').val() == '')
		{
			$('#Internship_form').find('#Category').parent('.customselect2').find('.select2-choice').css('border-color','red')
			invalid = '1';
		}
		else
			$('#Internship_form').find('#Category').parent('.customselect2').find('.select2-choice').css('border-color','')
		
		if($('#Internship_form').find('#Eligiblity').val() == '')
		{
			$('#Internship_form').find('#Eligiblity').parent('.customselect2').find('.select2-choice').css('border-color','red')
			invalid = '1';
		}
		else
			$('#Internship_form').find('#Eligiblity').parent('.customselect2').find('.select2-choice').css('border-color','')
		
		if(invalid == '')
		{
			var data = new FormData();
			data.append('Heading',$.trim($('#Heading').val()));
			data.append('Dead_Line',$.trim($('#Dead_Line').val()));
			data.append('Skills',$.trim($('#Skills').val()));
			data.append('Duration',$.trim($('#Duration').val()));
			data.append('DurationType',$.trim($('#DurationType').val()));
			data.append('Category',$.trim($('#Category').val()));
			data.append('Salary',$.trim($('#Salary').val()));
			data.append('Eligiblity',$.trim($('#Eligiblity').val()));
			data.append('Location',$.trim($('#Location').val()));
			data.append('Status',$.trim($('#Status').val()));
			data.append('Student_Count',$.trim($('#Student_Count').val()));
			data.append('Description',$.trim(CKEDITOR.instances.Description.getData()));
			data.append('Content',$.trim(CKEDITOR.instances.Content.getData()));
			data.append('UpId',$.trim($('#UpId').val()));
			
			$.ajax({
				url: base_url+"Usercommonpages/Add_interships",
				type:"POST",
				data: data,
				cache: false,
				dataType: 'json',
				processData: false, 
				contentType: false,
				enctype: 'multipart/form-data',
				beforeSend: function(){
					$('#Submit').prop('disabled', true);
				},
				complete: function(){
					$('#Submit').prop('disabled', false);
				},
				success: function(data)
				{
					if(data == 1)
					{
						reset();
						$('#AlertMsg').removeClass('alert-danger');
						$('#AlertMsg').addClass('alert-success');
						$('#AlertMsg').html('Internship Added Successfully');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},4000);
					}
					else if(data == 2)
					{
						reset();
						$('#AlertMsg').removeClass('alert-danger');
						$('#AlertMsg').addClass('alert-success');
						$('#AlertMsg').html('Internship Updated Successfully');
						$('#AlertMsg').show();
						setTimeout(function(){window.location.href= base_url+"/Usercommonpages/Manage_interships";},4000);
					}
					else
					{
						$('#AlertMsg').removeClass('alert-success');
						$('#AlertMsg').addClass('alert-danger');
						$('#AlertMsg').html('Please try later');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},4000);
					}
				}
			});
		}
	});
	
	$('#reset').click(function(){
		reset();
	});
});

function reset()
{
	$('#Internship_form').trigger('reset');
	$('#Internship_form input:required').each(function(){
		$(this).css('border-color','');
	});
	$('#Internship_form').find('#DurationType').parent('.customselect2').find('.select2-choice').css('border-color','')
	$('#Internship_form').find('#Category').parent('.customselect2').find('.select2-choice').css('border-color','')
	$('#Internship_form').find('#Eligiblity').parent('.customselect2').find('.select2-choice').css('border-color','')
	$('#cke_Content').css('border-color','');
	$('#cke_Description').css('border-color','');
}

function autovalidation()
{
	$('.num').blur(function(){
		var fData = $(this).val();
		var reg = /[^0-9.,]/g;
		if(!reg.test(fData))
		$(this).css('border-color','');
		else
		{
			$(this).val('');
			$(this).css('border-color','red');
		}
	});
}

 /* ---------------------------- CK EDITER stats here ----------------------------*/
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
			CKEDITOR.replace( 'Description' );
			CKEDITOR.replace( 'Content',{customConfig : 'config-image.js'});
			
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			CKEDITOR.inline( 'CareerInf' );
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
/* ---------------------------- CK EDITER Ends here ----------------------------*/