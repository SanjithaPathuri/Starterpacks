$(document).ready(function(){
	$('#AboutusBtn').click(function(){
		var err = '';
		var AboutusTxt = $.trim(CKEDITOR.instances.AboutusTxt.getData());
		var Aboutus_url = $.trim($('#Aboutus_url').val());
		if(AboutusTxt=='' || Aboutus_url==''  )
		{
			$('#cke_AboutusTxt').css('border','1px solid red');
			$('#Aboutus_url').css('border','1px solid red');
			err = 1;
		}
		else
		{
			$('#cke_AboutusTxt').css('border','');
		    $('#Aboutus_url').css('border','');
		}
		if(err == '')
		{
			var data = new FormData();
			data.append('AboutusTxt',AboutusTxt);
			data.append('Aboutus_url',Aboutus_url);
				data.append('type', 'Aboutus');
			if(err == '')
			{
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
					alertify.alert("About Us Information Updated Successfully");
				}
			});
		}
		}
	});
	
	$('#ObjectiveBtn').click(function(){
		var erro = '';
		var ObjectiveTxt = $.trim(CKEDITOR.instances.ObjectiveTxt.getData());
		//var Objective_Img = $.trim($('#Objective_Img').val());
		
		
		if(ObjectiveTxt =='')
		{
			erro = 1;
			$('#cke_ObjectiveTxt').css('border','1px solid red');
			$('#cke_Objective_Img').css('border','1px solid red');
			
		}
		else
		{
			erro = ''
			
			$('#cke_ObjectiveTxt').css('border','');
		    $('#cke_Objective_Img').css('border','');
		}
		if(erro == '')
		{
		
			var data = new FormData();
			data.append('ObjectiveTxt',ObjectiveTxt);
			data.append('type', 'Objective');
			if($('#Objective_Img').val() != '')
				data.append('file', $("#Objective_Img")[0].files[0]);
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
					alertify.alert("Objective Information Updated Successfully");
				}
			});
		}
	});
	$('#MethodologyBtn').click(function(){
		var error = '';
		var MethodologyTxt = $.trim(CKEDITOR.instances.MethodologyTxt.getData());
		//var Methodology_Img = $.trim($('#Methodology_Img').val());
		
		
		if(MethodologyTxt =='')
		{
			error = 1;
			$('#cke_MethodologyTxt').css('border','1px solid red');
			//$('#cke_Objective_Img').css('border','1px solid red');
			
		}
		else
		{
			error = ''
			
			$('#cke_MethodologyTxt').css('border','');
		    //$('#cke_Objective_Img').css('border','');
		}
		if(error == '')
		{
		
			var data = new FormData();
			data.append('MethodologyTxt',MethodologyTxt);
			if($('#Methodology_Img').val() != '')
				data.append('file', $("#Methodology_Img")[0].files[0]);
				data.append('type', 'Methodology');
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
					alertify.alert("Methodology Information Updated Successfully");
				}
			});
		}
	});
	
	$('#HowitWorksBtn').click(function(){
		var errors = '';
		var HowitWorksTxt  = $.trim(CKEDITOR.instances.HowitWorksTxt .getData());
		//var HowitWorks_Img = $.trim($('#HowitWorks_Img').val());
		
		if(HowitWorksTxt =='')
		{
			errors = 1;
			$('#cke_HowitWorksTxt').css('border','1px solid red');
			//$('#cke_Objective_Img').css('border','1px solid red');
			
		}
		else
		{
			errors = ''
			
			$('#cke_HowitWorksTxt').css('border','');
		    //$('#cke_Objective_Img').css('border','');
		}
		if(errors == '')
		{
		
			var data = new FormData();
			data.append('HowitWorksTxt ',HowitWorksTxt );
			if($('#HowitWorks_Img').val() != '')
				data.append('file', $("#HowitWorks_Img")[0].files[0]);
				data.append('type', 'HowitWorks');
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
					alertify.alert("How it Works Information Updated Successfully");
				}
			});
		}
	});
	
	
	$('#CorporateProfileBtn').click(function(){
		var er = '';
		var CorporateProfileTxt = $.trim(CKEDITOR.instances.CorporateProfileTxt.getData());
		//var CorporateProfile_Img = $.trim($('#CorporateProfile_Img').val());
		
		
		if(CorporateProfileTxt =='')
		{
			er = 1;
			$('#cke_CorporateProfileTxt').css('border','1px solid red');
			//$('#cke_Objective_Img').css('border','1px solid red');
			
		}
		else
		{
			er = ''

			$('#cke_CorporateProfileTxt').css('border','');
		    //$('#cke_Objective_Img').css('border','');
		}
		if(er == '')
		{
		
			var data = new FormData();
			data.append('CorporateProfileTxt',CorporateProfileTxt);
			if($('#CorporateProfile_Img').val() != '')
				data.append('file', $("#CorporateProfile_Img")[0].files[0]);
				data.append('type', 'CorporateProfile');
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
					alertify.alert("Corporate Profile Information Updated Successfully");
				}
			});
		}
	});
})


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
			CKEDITOR.replace( 'AboutusTxt' );
			CKEDITOR.replace( 'ObjectiveTxt',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'MethodologyTxt',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'HowitWorksTxt',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'CorporateProfileTxt',{customConfig : 'config-image.js'});
			
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			CKEDITOR.inline( 'Aboutus' );
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