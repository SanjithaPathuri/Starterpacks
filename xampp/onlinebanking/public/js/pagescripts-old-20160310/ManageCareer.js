$(document).ready(function(){
	get_careers('1');
	
	$('#AddBtn').click(function(){
		$('#AddBtn').hide();
		$('#CancelBtn').show();
		$('#Image_Path1').hide();
		CKEDITOR.instances['CareerInfTxt'].setData('');
		$('#AddBtn').hide();
		$('#showhide').show();
		$('#SubmitBtn').show();
	});
	
	$('#CancelBtn').click(function(){
		reset();
		$('#CancelBtn').hide();
		$('#Image_Path1').hide();
		CKEDITOR.instances['CareerInfTxt'].setData('');
		$('#Id').val('');
		$('#showhide').hide();
		$('#SubmitBtn').hide();
		$('#AddBtn').show();
	});
	
	$('#SubmitBtn').click(function(){
		validate();
	});
	
	var file ;
	$('#CareerInf_Img').change(function(){
		file = this.files[0];
		var name = file.name;
		var size = file.size;
		
		var type = file.type;
		var error=0;
		
		if(file.name.length < 1) {
			$('#CareerInf_Img').val('');
			alertify.alert("Invalid File name");
			error=1;
		}
		else if(file.size > 2000000) {
				$('#CareerInf_Img').val('');
				alertify.alert("File is too big, Max allowed size: 2MB");
				error=1;
		}
		else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) 
		{
			$('#CareerInf_Img').val('');
			alertify.alert("File doesnt match png, jpg or gif");
			error=1;
		}
		else{
			var img = new Image();
			var _URL = window.URL || window.webkitURL;
			img.src = _URL.createObjectURL(file);
			img.onload = function () {
				if(this.height <430 || this.width<620 )
				{
					err = '1';
					$('#CareerInf_Img').val('');
					alertify.alert("Please upload Images with atleast 620 x 430 resolutions");
					return false;
				}
				if(this.height >450 || this.width>650)
				{
					err = '1';
					$('#CareerInf_Img').val('');
					alertify.alert("Please upload Images with less than 650 x 450  resolutions");
					return false;
				}
			};
		}
	});
	
	$('#Attachment').change(function(){
		file = this.files[0];
		var name = file.name;
		var size = file.size;
		
		var type = file.type;
		var error=0;
		
		if(file.name.length < 1) {
			alertify.alert("Invalid File name");
			$('#Attachment').val('');
			error=1;
		}
		else if(file.size > 2000000) {
				alertify.alert("File is too big, Max allowed size: 2MB");
				$('#Attachment').val('');
				error=1;
		}
		else if(file.type != 'application/pdf' && file.type != 'application/msword' && file.type != 'application/doc' && file.type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.type != 'application/msexcel' ) {
			alertify.alert("File doesnt match DOC or PDF or Word file");
			$('#Attachment').val('');
			error=1;
		}
	});
	
});

function get_careers(page)
{
	var skey = $('#search').val();
	$.ajax({
		url: "",
		type:"POST",
		data: {'get':'true','skey':skey,'page':page},
		success: function(data)
		{
			data = $.parseJSON(data);
			var result = '';
			var Status = '';
			$.each(data.Careers,function(i){
				var row = data.Careers[i];
				if(row.Status == '1')
					Status="<span class='label label-success'>Active</span>";
				else
					Status="<span class='label label-danger'>Inactive</span>";
				result+="<tr align='center'><td>"+row.CategoryName+"</td><td>"+row.Title+"</td><td><img src='"+base_url+row.Image_Path+"' style='height:35px;'/></td><td><a href='"+base_url+row.Attachment+"'><span class='label label-warning'>Attachment</span></a></td><td>"+row.CreatedOn+"</td><td>"+Status+"</td><td><button OnClick='editfun("+row.Id+");' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5' type='button' title='Edit' ><i class='fa fa-pencil'></i></button>&nbsp&nbsp&nbsp<button data-toggle='modal' data-target='' OnClick='deletefun("+row.Id+");' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' type='button' title='Delete' ><i class='fa fa-trash-o'></i></button></td></td></tr>";
			});
			$('#CareersTable').find('tbody').html(result);
			$('#pagination').html(data.pagination);
			$('.pagination').find('a').click(function(){
				var newpage = $(this).parent('li').attr('page')
				get_blogs(newpage);
			});
		}
	});
}

function reset()
{
	$('#bannerform').trigger('reset');
	$('#Category').select2('val','');
	$('#s2id_Category').find('.select2-choice').css('border-color','');
	$('#Attachment').css('border','');
	$('#CareerInf_Img').css('border','');
	$('#Title').css('border','');
	$('#ShortDesc').css('border','');
	$('#cke_CareerInfTxt').css('border','');
}

function editfun(CareerId)
{
	reset();
	$.ajax({
		type: "POST",
		url: base_url+"AdminCareer/EditCareer",
		data: "CareerId="+CareerId,
		success: function(data)
		{
			var obj = JSON.parse(data);
			$("#Title").val(obj.Title);
			$("#Image_Path1").attr("src",obj.Image_Path);
			$("#Status").select2('val',obj.Status);
			$("#Category").select2('val',obj.Category);
			$("#ShortDesc").val(obj.ShortDesc);
			CKEDITOR.instances['CareerInfTxt'].setData(obj.Description);
			$("#Id").val(CareerId);
			$("#Image_Path1").show();
			$('#AddBtn').hide();
			$('#showhide').show();
			$('#SubmitBtn').show();
			$('#CancelBtn').show();
		}
	});
}
function deletefun(CareerId)
{
	alertify.confirm("Do you really want to delete this career Information ?", function (e) {
		if (e) 
		{
			$.ajax({
					type: "POST",
					url: base_url+"AdminCareer/DeleteCareer",
					data : "CareerId="+CareerId,
					success: function(data)
					{
						alertify.alert("Record has been deleted successfully");
						window.location.reload();
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

function validate()
{
	var Category = $.trim($('#Category').val());
	var Title = $.trim($('#Title').val());

	var Attachment = $.trim($('#Attachment').val());
	var CareerInf_Img = $.trim($('#CareerInf_Img').val());
	var ShortDesc = $.trim($('#ShortDesc').val());
	var CareerInfTxt = $.trim(CKEDITOR.instances.CareerInfTxt.getData()); 

	var err = '';
	if(Category == "")
	{
		err = 1;
		$('#s2id_Category').find('.select2-choice').css('border-color','red');
		
	}
	else
		$('#s2id_Category').find('.select2-choice').css('border-color','');
	
	if( Title =="")
	{
		err = 1;
		$('#Title').css('border','1px solid red');
	}
	else
		$('#Title').css('border','');
	
	if($.trim($("#Id").val()) == '')
	{
		if( Attachment =="")
		{
			err = 1;
			$('#Attachment').css('border','1px solid red');
		}
		else
			$('#Attachment').css('border','');
		
		if( CareerInf_Img =="")
		{
			err = 1;
			$('#CareerInf_Img').css('border','1px solid red');
		}
		else
			$('#CareerInf_Img').css('border','');
	}
	
	if( ShortDesc =="")
	{
		err = 1;
		$('#ShortDesc').css('border','1px solid red');
	}
	else
		$('#ShortDesc').css('border','');
	
	if( CareerInfTxt =="")
	{
		err = 1;
		$('#cke_CareerInfTxt').css('border','1px solid red');
	}
	else
		$('#cke_CareerInfTxt').css('border','');
	
	if(err == '')
	{
		$('#bannerform').removeAttr('onsubmit') ;
		$('#bannerform').trigger('submit');
	}
}
