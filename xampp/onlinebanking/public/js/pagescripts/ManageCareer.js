$(document).ready(function(){
	$('select').select2();
	var cpage=1;
	get_careers('cpage');
	
	
	$('#AddBtn').click(function(){
		$('#AddBtn').hide();
		$('#CancelBtn').show();
		$('#Image_Path1').hide();
		CKEDITOR.instances['CareerInfTxt'].setData('');
		$('#AddBtn').hide();
		$('#showhide').show();
		$('#SubmitBtn').show();
		$('#Id').val('');
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
		var cfile = $(this);  
		var file = this.files[0];
		var name = file.name;
		var size = file.size;
		 var ext = name.split('.').pop();
		var type = file.type;
		var error=0;
		if(file.name.length < 1) {
			alert("Invalid File name")
			$(cfile).val('')
			return false;
		}
		else if(file.size > 2000000) {
				alert("File is too big, Max allowed size: 2MB");
				$(cfile).val('')
				return false;
		}  
		else if(file.type != 'image/png' && file.type!="image/jpeg"  && ext!="file.type/jpg"  && file.type != 'application/msword' ) {
			alert("File doesnt match jpg,jpeg or png");     
			$(cfile).val('')
			return false;  
		}
		else{
			var img = new Image();
			var _URL = window.URL || window.webkitURL;
			img.src = _URL.createObjectURL(file);
			img.onload = function () {
				if(this.height <=500 || this.width<=500 )  
				{
					error=1; 
					alert("Please upload Images with atleast 500*500 resolution")
					$(cfile).val('')
					return false;
				}
				
			};
			
		}
		
	})
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
	
	CKEDITOR.replace( 'CareerInfTxt' );
			CKEDITOR.replace( 'editor2',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor3',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor4',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor5',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor6',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor7',{customConfig : 'config-image.js'});
	
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
			var status = '';
			$.each(data.Careers,function(i){
				var row = data.Careers[i];
				if(row.Cstatus == '1')
					status = "<td align='center'><span class='inac label label-success'>Active</span></td>";
				else
					status = "<td align='center'><span class='inac label label-danger'>Inactive</span></td>";
				
				var date="";
				row.Last_Edited = $.trim(row.Last_Edited);
				if(row.Last_Edited=='')  
					date=row.CreatedOn;
				else
					date=row.Last_Edited; 
				
				var Attachment = '';
				row.Attachment = $.trim(row.Attachment);
				if(row.Attachment !='')
					Attachment ="<a href='"+base_url+row.Attachment+"' style='text-decoration:none'><span class='label label-warning'>Attachment</span></a>";
				else
					Attachment = "<span class='label label-danger'>No Attachment</span>";
				
				result+="<tr><td>"+row.CategoryName+"</td><td>"+row.Title+"</td><td align='center'><img src='"+base_url+row.Image_Path+"' style='height:35px;'/></td><td align='center'>"+Attachment+"</td><td align='center'>"+date+"</td>"+status+"<td align='center'><button OnClick='editfun("+row.Id+");' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5' type='button' title='Edit' ><i class='fa fa-pencil'></i></button> <button data-toggle='modal' data-target='' OnClick='deletefun("+row.Id+");' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' type='button' title='Delete' ><i class='fa fa-trash-o'></i></button></td></td></tr>";
			});
			$('#CareersTable').find('tbody').html(result);
			$('#pagination').html(data.pagination);
			$('.pagination').find('a').click(function(){
				var cpage = $(this).parent('li').attr('page')
				get_careers(cpage); 
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
	$('#Status').select2('val','1');
	$('#Id').val('');
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
			$('#Id').val('');
			var obj = JSON.parse(data);
			$("#Title").val(obj.Title);
			$("#Image_Path1").attr("src",base_url+obj.Image_Path);
			obj.Attachment = $.trim(obj.Attachment);
			if(obj.Attachment!='')
			{
				$("#Attachement_Path").attr("href",base_url+obj.Attachment);
				$('#Attachement_Path').show();
			}
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
			

function validate()
{
	var Category = $.trim($('#Category').val());
	var Title = $.trim($('#Title').val());

	//var Attachment = $.trim($('#Attachment').val());
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
		/*if( Attachment =="")
		{
			err = 1;
			$('#Attachment').css('border','1px solid red');
		}
		else
			$('#Attachment').css('border','');*/ 
		
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
