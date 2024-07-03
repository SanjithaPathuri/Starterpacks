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
	$('.email').blur(function(){
		var emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var email = $.trim($(this).val());
		if(!emailPattern.test(email) || email =='')
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
		else
			$(this).css('border-color','');
	});
	var file ;
	$('#PhotoImagePath').change(function(){
		
		file = this.files[0];
		var name = file.name;
		var size = file.size;
		
		var type = file.type;
		var error=0;
		
		if(file.name.length < 1) 
		{
			alertify.alert("Invalid File name");
			$(this).val('');
			error=1;
		}
		else if(file.size > 2000000) 
		{
				alertify.alert("File is too big, Max allowed size: 2MB");
				$(this).val('');
				error=1;
		}
		else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/gif') 
		{
			alertify.alert("File doesnt match png, jpeg, jpg or gif");
			$(this).val('');
			error=1;
		}
		else
		{
			var img = new Image();
			var _URL = window.URL || window.webkitURL;
			img.src = _URL.createObjectURL(file);
			img.onload = function () 
			{
				if(this.height <412 || this.width<619 )
				{
					err = 1;
					alertify.alert("Please upload Images with atleast 619 x 412 and Maximum 750 x 500 resolutions");
					$(this).val('');
				}
			};
		}
	});
	
	$('#CancelBtn').on('click',function(){
		reset();
		$('#Submit').hide();
		$('#AddBtn').show();
		$('#college_form').hide();
		$('#CancelBtn').hide();
	});
	$('#AddBtn').click(function(){
		reset();
		$('#AddBtn').hide();
		$('#CancelBtn').show();
		$('#Submit').show();
		$('#college_form').show();
	});
	
	$('.nums').blur(function(){
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
	
	var cpage = 1;
	get_colleges(cpage);
	$('#pagination').find('li').click(function(){
		var page = $(this).attr('page');
		get_colleges(page);
	});
	
	$('#Submit').click(function(){
		var invalid = '';
		var CollegeName = $.trim($('#CollegeName').val());
		var FirstName = $.trim($('#FirstName').val());
		var LastName = $.trim($('#LastName').val());
		var Designation = $.trim($('#Designation').val());
		var Email = $.trim($('#Email').val());
		var Password = $.trim($('#Password').val());
		var ConfirmPassword = $.trim($('#ConfirmPassword').val());
		var MobileNo = $.trim($('#MobileNo').val());
		var FatherName = $.trim($('#FatherName').val());
		var DOB = $.trim($('#DOB').val());
		var Address1 = $.trim($('#Address1').val());
		var Address2 = $.trim($('#Address2').val());
		var CityId = $.trim($('#CityId').val());
		var PinCode = $.trim($('#PinCode').val());
		var KnownLanguages = $.trim($('#KnownLanguages').val());
		var OtherLanguages = $.trim($('#OtherLanguages').val());
		var PhotoImagePath = $.trim($('#PhotoImagePath').val());
		//		var CVPath = $.trim($('#CVPath').val());			** Validations are also in comments.
		var InterestedIn = $.trim($('#InterestedIn').val());
		var status = $.trim($('#status').val());
		var CgId = $.trim($('#CgId').val());
		
		if(CollegeName == '')
		{
			invalid = 1;
			$('#CollegeName').css('border-color','red');
		}
		else
			$('#CollegeName').css('border-color','');
		
		if(FirstName == '')
		{
			invalid = 1;
			$('#FirstName').css('border-color','red');
		}
		else
			$('#FirstName').css('border-color','');
		
		if(LastName == '')
		{
			invalid = 1;
			$('#LastName').css('border-color','red');
		}
		else
			$('#LastName').css('border-color','');
		
		if(Designation == '')
		{
			invalid = 1;
			$('#Designation').css('border-color','red');
		}
		else
			$('#Designation').css('border-color','');
				
		if(Email == '')
		{
			invalid = 1;
			$('#Email').css('border-color','red');
		}
		else
			$('#Email').css('border-color','');
		
		
		
		if(MobileNo == '')
		{
			invalid = 1;
			$('#MobileNo').css('border-color','red');
		}
		else
			$('#MobileNo').css('border-color','');
		
		if(FatherName == '')
		{
			invalid = 1;
			$('#FatherName').css('border-color','red');
		}
		else
			$('#FatherName').css('border-color','');
		
		if(DOB == '')
		{
			invalid = 1;
			$('#DOB').css('border-color','red');
		}
		else
			$('#DOB').css('border-color','');
		
		if(Address1 == '')
		{
			invalid = 1;
			$('#Address1').css('border-color','red');
		}
		else
			$('#Address1').css('border-color','');		
		
		if(Address2 == '')
		{
			invalid = 1;
			$('#Address2').css('border-color','red');
		}
		else
			$('#Address2').css('border-color','');		
		
		if(CityId == '')
		{
			invalid = 1;
			$('#s2id_CityId').css('border','1px solid red');
		}
		else
			$('#s2id_CityId').css('border','');	
			
		if(PinCode == '')
		{
			invalid = 1;
			$('#PinCode').css('border-color','red');
		}
		else
			$('#PinCode').css('border-color','');
		
		if(KnownLanguages == '')
		{
			invalid = 1;
			$('#s2id_KnownLanguages').css('border','1px solid red');
		}
		else
			$('#s2id_KnownLanguages').css('border','');
		
		if(OtherLanguages == '')
		{
			invalid = 1;
			$('#OtherLanguages').css('border-color','red');
		}
		else
			$('#OtherLanguages').css('border-color','');		
		
		if(CgId == '')
		{
			alert();
			if(Password == '')
			{
				invalid = 1;
				$('#Password').css('border-color','red');
			}
			else
				$('#Password').css('border-color','');
			
			if(ConfirmPassword == '')
			{
				invalid = 1;
				$('#ConfirmPassword').css('border-color','red');
			}
			else
				$('#ConfirmPassword').css('border-color','');
			
			if(PhotoImagePath == '')
			{
				invalid = 1;
				$('#PhotoImagePath').css('border-color','red');
			}
			else
				$('#PhotoImagePath').css('border-color','');		
			/*
			if(CVPath == '')
			{
				invalid = 1;
				$('#CVPath').css('border-color','red');
			}
			else
				$('#CVPath').css('border-color','');
			*/
		}		
		
		if(InterestedIn == '')
		{
			invalid = 1;
			$('#InterestedIn').css('border-color','red');
		}
		else
			$('#InterestedIn').css('border-color','');	
		
		if(Status == '')
		{
			invalid = 1;
			$('#Status').css('border-color','red');
		}
		else
			$('#Status').css('border-color','');
		
		if(invalid =='')
		{
			var formdata = new FormData();
			formdata.append('CollegeName',$('#CollegeName').val());
			formdata.append('FirstName',$('#FirstName').val());
			formdata.append('LastName',$('#LastName').val());
			formdata.append('Designation',$('#Designation').val());
			formdata.append('Email',$('#Email').val());
			formdata.append('Password',$('#Password').val());
			formdata.append('FatherName',$('#FatherName').val());
			formdata.append('MobileNo',$('#MobileNo').val());
			formdata.append('DOB',$('#DOB').val());
			formdata.append('Address1',$('#Address1').val());
			formdata.append('Address2',$('#Address2').val());
			formdata.append('CityId',$('#CityId').val());
			formdata.append('PinCode',$('#PinCode').val());
			formdata.append('KnownLanguages',$('#KnownLanguages').val());
			formdata.append('OtherLanguages',$('#OtherLanguages').val());
			formdata.append('InterestedIn',$('#InterestedIn').val());
			formdata.append('OtherEmail',$('#OtherEmail').val());
			formdata.append('Status',$('#Status').val());
			formdata.append('PhotoImagePath',$("#PhotoImagePath")[0].files[0]);
			//		formdata.append('CVPath',$("#CVPath")[0].files[0]);
			formdata.append('CgId',$("#CgId").val());
			formdata.append('forsubmit','true');
				
			$.ajax({
				url: "",
				type:"POST",
				data: formdata,
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
					$('#Submit').prop('disabled', false);
					if(data == 1)
					{
						
						$('#CancelBtn').trigger('click');
						get_colleges('1');
						alertify.alert('College added successfully..');
						$('#CancelBtn').trigger('click');
					}
					else if(data == 2)
					{
						alertify.alert('Email ID already exsists');
					}
					else if(data == 3)
					{
						reset();
						alertify.alert('Updated Successfully...');
						$('#CancelBtn').trigger('click');
						get_colleges('1');
					}
					else
					{
						alertify.alert('Please try later');
					}
				}
			});
		}
	});
	
	function reset()
	{
		$('#college_form').trigger('reset');
		$("#KnownLanguages").select2("val",'');
		$('#s2id_KnownLanguages').css('border','');
		$('#s2id_CityId').css('border','');	
		$('#CgId').val('');
		$('#college_form').find(':input').each(function(){
			$(this).css('border-color','');
		})
		$('#CityId').select2('val','');
		$('#PhotoImagePathex').hide();
		$('#CVPathex').hide();
	}
	
	function get_colleges(page)
	{
		var skey = $('#search').val();
		$.ajax({
			url: "",
			type:"POST",
			data: {'get':'1','skey':skey,'page':page},
			success: function(data)
			{
				data = $.parseJSON(data);
				var result = '';
				var status = '';
				$.each(data.Colleges,function(i){
					var item = data.Colleges[i];
					if(item.CollegeStatus == '1')
						status="<span class='label label-success'>Active</span>";
					else
						status="<span class='label label-danger'>Inactive</span>";
					// ** use checkbox if needed --> <td><input type='checkbox' name='student' value='"+item.UserId+"'></td>
					result+="<tr><td>"+item.Email+"</td><td>"+item.CollegeName+"</td><td>"+item.FirstName+"&nbsp"+item.LastName+"</td><td>"+item.MobileNo+"</td><td align='center'><img style='height:20px' src='"+base_url+item.PhotoImagePath+"'/></td><td align='center'>"+status+"</td><td align='center'><button data-toggle='modal' data-target='#testuser' OnClick='editcollege("+item.UserId+");' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5' type='button' title='Edit' ><i class='fa fa-pencil'></i></button> <button data-toggle='modal' data-target='' OnClick='del("+item.UserId+");' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' type='button' title='Delete' ><i class='fa fa-trash-o'></i></button></td></td></tr>";
				});
				$('#college_table').find('tbody').html(result);
				$('#pagination').html(data.pagination);
				$('#pagination').find('li').click(function(){
					get_colleges($(this).attr('page'));
				});
			}
		});
	}
});

function editcollege(id)
{
	id = $.trim(id);
	if(id!='')
	{
		$.ajax({
			url: "",
			type:"POST",
			data: {'getcollege':id},
			success: function(data)
			{
				data = $.parseJSON(data);
				$('#CollegeName').val(data.CollegeName);
				$('#FirstName').val(data.FirstName);
				$('#LastName').val(data.LastName);
				$('#Designation').val(data.Designation);
				$('#Email').attr('disabled','disabled');
				$('#Email').val(data.Email);
				$('#Password').attr('disabled','disabled');
				$('#Password').val(data.Password);
				$('#MobileNo').val(data.MobileNo);
				$('#FatherName').val(data.FatherName);
				$('#DOB').val(data.DOB);
				$('#Address1').val(data.Address1);
				$('#Address2').val(data.Address2);
				$('#CityId').select2('val',data.CityId);
				$('#PinCode').val(data.PinCode);
				var KLS = data.KnownLanguages.split(',');
				$("#KnownLanguages").select2("val",KLS);
				$('#OtherLanguages').val(data.OtherLanguages);				
				$('#InterestedIn').val(data.InterestedIn);
				$('#OtherEmail').val(data.OtherEmail);
				$('#PhotoImagePathex').attr('src',data.PhotoImagePath);
				//		$('#CVPathex').attr('href',data.CVPath);
				$('#status').select2('val',data.Status);
				$('#CgId').val(data.UserId);
				$('#PhotoImagePathex').show();
				$('#CVPathex').show();
				$('#college_form').show();
				$('#AddBtn').hide();
				$('#CancelBtn').show();
				$('#Submit').show();
			}
		});
	}
}

function checkAll(ele) 
{
	var checkboxes = document.getElementsByTagName('input');
	if (ele.checked) 
	{
		for (var i = 0; i < checkboxes.length; i++) 
		{
			if (checkboxes[i].type == 'checkbox') 
			{
				checkboxes[i].checked = true;
			}
		}
	} 
	else 
	{
		for (var i = 0; i < checkboxes.length; i++)
		{
			if (checkboxes[i].type == 'checkbox') 
			{
				checkboxes[i].checked = false;
			}
		}
	}
}

function multipleDel()
{
	var ids=[];
	$("[name=chk]:checked").each(function(){
		ids.push($(this).attr('did'))
	});
	if(ids.length>0)
	{
		alertify.confirm("Do you really want to delete all the selected colleges ?", function (e) {
		if (e) 
		{
			$.ajax({
				url: "",
				type: "POST",
				data:{'dids':ids,'Delete':'true'},
				beforeSend: function()
				{
					//$("#preloader_del").show()
				},
				complete:function()
				{
					//$("#preloader_del").hide()
				},
				success:function(data)
				{
					if(data == 1)
					{
						$('#AlertMsg').html('Deleted Successfully.');
						$('#AlertMsg').removeClass('alert-danger');
						$('#AlertMsg').addClass('alert-success');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},3500);
						get_colleges(page);
					}
				}
			})
		}
		else
			return false;
		});
	}
	else
	{
		$('#AlertMsg').html('Please select atleast One (1) User to delete !!.');
		$('#AlertMsg').removeClass('alert-success');
		$('#AlertMsg').addClass('alert-danger');
		$('#AlertMsg').show();
		setTimeout(function(){$('#AlertMsg').hide();},3500);
	}
}

function del(id)
{
	alertify.confirm("Do you really want to delete all the selected College ?", function (e) {
		if (e) 
		{
			var ids = [];
			ids.push(id);
			$.ajax({
				url: "",
				type: "POST",
				data:{'dids':ids,'Delete':'true'},
				beforeSend: function()
				{
					//$("#preloader_del").show()
				},
				complete:function()
				{
					//$("#preloader_del").hide()
				},
				success:function(data)
				{
					if(data == 1)
					{
						$('#AlertMsg').html('Deleted Successfully.');
						$('#AlertMsg').removeClass('alert-danger');
						$('#AlertMsg').addClass('alert-success');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},3500);
						var cpage = 1;
						get_colleges(page);
					}
				}
			});
		}
	});
}

