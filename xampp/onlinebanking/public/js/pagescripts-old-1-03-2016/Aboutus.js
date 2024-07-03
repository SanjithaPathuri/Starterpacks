$(document).ready(function(){
	
var file ;
	$(':file').change(function(){
		
		file = this.files[0];
		var name = file.name;
		var size = file.size;
		
		var type = file.type;
		var error=0;
		
		if(file.name.length < 1) {
			alertify.alert("Invalid File name");
			
			if($('#Objective_Img').val()!='')
				$('#Objective_Img').val('');

						error=1;
		}
		else if(file.size > 2000000) {
				alertify.alert("File is too big, Max allowed size: 2MB");
				$('#Objective_Img').val('');
				error=1;
		}
		else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/gif') {
			alertify.alert("File doesnt match png, jpeg, jpg or gif");
			//$('#Objective_Img').val('');
			if($('#Objective_Img').val()!='')
				$('#Objective_Img').val('');
			if($('#Methodology_Img').val()!='')
				$('#Methodology_Img').val('');
			if($('#HowitWorks_Img').val()!='')
				$('#HowitWorks_Img').val('');
			if($('#CorporateProfile_Img').val()!='')
				$('#CorporateProfile_Img').val('');
			error=1;
		}
		else{
			var img = new Image();
			var _URL = window.URL || window.webkitURL;
			img.src = _URL.createObjectURL(file);
			img.onload = function () {
				/* if(this.height <412 || this.width<619 )
				{
					err = '1';
					alertify.alert("Please upload Images with atleast 619 x 412 and Maximum 750 x 500 resolutions"); */
					if(this.height <400 || this.width<600 )
				{
					err = '1';
					alertify.alert("Please upload Images with atleast 600 x 400 and Maximum 619 x 412 resolutions");
					$('#Objective_Img').val('');
					$('#Methodology_Img').val('');
					$('#HowitWorks_Img').val('');
					$('#CorporateProfile_Img').val('');
					/* if($('#Objective_Img').val()=='')
						$("#cimage_img1").attr("src",reader.result);
					if($('#Methodology_Img').val()!='')
						$("#cimage_img2").attr("src",reader.result);
					if($('#HowitWorks_Img').val()!='')
						$("#cimage_img3").attr("src",reader.result);
					if($('#CorporateProfile_Img').val()!='')
						$("#cimage_img4").attr("src",reader.result); */
					return false;
				}
				if(this.height >412 || this.width>619)
				{
					err = '1';
					alertify.alert("Please upload Images with less than 619 x 412  resolutions");
					$('#Objective_Img').val('');
					$('#Methodology_Img').val('');
					$('#HowitWorks_Img').val('');
					$('#CorporateProfile_Img').val('');
					/* if($('#Objective_Img').val()=='')
						$("#cimage_img1").attr("src",reader.result);
					if($('#Methodology_Img').val()!='')
						$("#cimage_img2").attr("src",reader.result);
					if($('#HowitWorks_Img').val()!='')
						$("#cimage_img3").attr("src",reader.result);
					if($('#CorporateProfile_Img').val()!='')
						$("#cimage_img4").attr("src",reader.result); */
					return false;
					
				}
				
				
				else
				{
					
					var reader = new FileReader();
					reader.onloadend = function() {
						if($('#Objective_Img').val()!='')
						$("#cimage_img1").attr("src",reader.result);
					if($('#Methodology_Img').val()!='')
						$("#cimage_img2").attr("src",reader.result);
					if($('#HowitWorks_Img').val()!='')
						$("#cimage_img3").attr("src",reader.result);
					if($('#CorporateProfile_Img').val()!='')
						$("#cimage_img4").attr("src",reader.result);
					
					}
					reader.readAsDataURL(file); 
					if($('#Objective_Img').val()!='')
					$("#cimage_img1").show();
				if($('#Methodology_Img').val()!='')
					$("#cimage_img2").show();
				if($('#HowitWorks_Img').val()!='')
					$("#cimage_img3").show();
				if($('#CorporateProfile_Img').val()!='')
					$("#cimage_img4").show();
					//$("#editbanImg").val('0')
				}
					
			};
			
		}
		
	})	
	$('#AboutusBtn').click(function(){
		var err = '';
		var AboutusTxt = $.trim(CKEDITOR.instances.AboutusTxt.getData());
	if(AboutusTxt.length >1219){
		alertify.alert("Maximum 1200 characters only with spaces.");
		return false;
	}
		
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
		
		if(ObjectiveTxt.length >1219){
		alertify.alert("Maximum 1200 characters only with spaces.");
		return false;
		}
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
		if(MethodologyTxt.length >1219){
		alertify.alert("Maximum 1200 characters only with spaces.");
		return false;
		}
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
		if(HowitWorksTxt.length >1219){
		alertify.alert("Maximum 1200 characters only with spaces.");
		return false;
		}
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
		if(CorporateProfileTxt.length >1219){
		alertify.alert("Maximum 1200 characters only with spaces.");
		return false;
		}
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