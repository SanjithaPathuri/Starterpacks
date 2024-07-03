var cpage =1;
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
	$('.currdate').blur(function(){
			var currentYear = (new Date).getFullYear();
			
			var numPattren = /[^0-9]/g ;
			if(numPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border-color','red')
			}
			else
			{
				if($(this).val() > currentYear)
				{
				$(this).val('');
				$(this).css('border-color','red')
				}
				else
				$(this).css('border-color','')
			}
				
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
		$('#CancelBtn').hide();
		$('#AddBtn').show();
		$('#company_form').hide();
	});
	$('#AddBtn').click(function(){
		reset();
		$('#AddBtn').hide();
		$('#Submit').show();
		$('#CancelBtn').show();
		$('#company_form').show();
		$('#PasswordDiv').show();
		$('#ConfirmPasswordDiv').show();
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
	
	var cpage = 1;
	get_companys(cpage);
	$('#pagination').find('li').click(function(){
		var page = $(this).attr('page');
		get_companys(page);
	});
	
	$('#Submit').click(function(){
		var invalid = '';
		var CompanyName = $.trim($('#CompanyName').val());
		var FirstName = $.trim($('#FirstName').val());
		var LastName = $.trim($('#LastName').val());
		var Designation = $.trim($('#Designation').val());
		var Email = $.trim($('#Email').val());
		var Password = $.trim($('#Password').val());
		var MobileNo = $.trim($('#MobileNo').val());
		var LinkedInUrl = $.trim($('#LinkedInUrl').val());
		var CompanyType = $.trim($('#CompanyType').val());
		var FatherName = $.trim($('#FatherName').val());
		var DOB = $.trim($('#DOB').val());
		var Address1 = $.trim($('#Address1').val());
		var Address2 = $.trim($('#Address2').val());
		var State = $.trim($('#State').val());
		var PinCode = $.trim($('#PinCode').val());
	//	var KnownLanguages = $.trim($('#KnownLanguages').val());
		//var OtherLanguages = $.trim($('#OtherLanguages').val());
		var PhotoImagePath = $.trim($('#PhotoImagePath').val());
			
		var StartedDate = $.trim($('#StartedDate').val());
		var AlterContactNo = $.trim($('#AlterContactNo').val());
		var CompanyWebsite = $.trim($('#CompanyWebsite').val());
		var Facebook = $.trim($('#Facebook').val());
		var Twitter = $.trim($('#Twitter').val());
		var City = $.trim($('#City').val());
		var SupportEmail = $.trim($('#SupportEmail').val());
		var CompanyType = $.trim($('#CompanyType').val());
		var ConfirmPassword = $.trim($('#ConfirmPassword').val());
		
		// var CVPath = $.trim($('#CVPath').val()); --> Validations and upload code are in comments.
		var InterestedIn = $.trim($('#InterestedIn').val());
		var status = $.trim($('#status').val());
		var CmId = $.trim($('#CmId').val());
		
		$('.url').each(function(){
			
			if($(this).val() == '')
			{
				invalid = 1;
				$(this).css('border-color','red');
			}
			else
			{
				$(this).css('border-color','');
			}
		})
		if($.trim(CKEDITOR.instances.description.getData()) =='')
		{
			$('#cke_description').css('border','1px solid red');
			invalid=1;
		}
		else
			$('#cke_description').css('border','');
		
		//////////////////////////////
		if(Password != ConfirmPassword)
		{
			if($.trim($('#CmId').val()) == '')
			{
				alertify.alert('Password and Confirm password are not matched');
				invalid = 1;
				$('#Password').css('border-color','red');
				$('#ConfirmPassword').css('border-color','red');
			}
			
		}
		else
		{
			$('#Password').css('border-color','');
			$('#ConfirmPassword').css('border-color','');
		}
		if(StartedDate == '')
		{
			invalid = 1;
			$('#StartedDate').css('border-color','red');
		}
		else
			$('#StartedDate').css('border-color','');
		if(AlterContactNo == '')
		{
			invalid = 1;
			$('#AlterContactNo').css('border-color','red');
		}
		else
			$('#AlterContactNo').css('border-color','');
		if(City == '')
		{
			invalid = 1;
			$('#City').css('border-color','red');
		}
		else
			$('#City').css('border-color','');
		if(SupportEmail == '')
		{
			invalid = 1;
			$('#SupportEmail').css('border-color','red');
		}
		else
			$('#SupportEmail').css('border-color','');
		if(CompanyType == '')
		{
			invalid = 1;
			$('#s2id_CompanyType').css('border','1px solid red');
		}
		else
			$('#s2id_CompanyType').css('border','');
		
		/////////////////////////
		if(CompanyName == '')
		{
			invalid = 1;
			$('#CompanyName').css('border-color','red');
		}
		else
			$('#CompanyName').css('border-color','');
		
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
		
		if(Password == '')
		{
			invalid = 1;
			$('#Password').css('border-color','red');
		}
		else
			$('#Password').css('border-color','');
		
		if(MobileNo == '')
		{
			invalid = 1;
			$('#MobileNo').css('border-color','red');
		}
		else
			$('#MobileNo').css('border-color','');
		
		if(LinkedInUrl == '')
		{
			invalid = 1;
			$('#LinkedInUrl').css('border-color','red');
		}
		else
			$('#LinkedInUrl').css('border-color','');
		
		if(CompanyType == '')
		{
			invalid = 1;
			$('#CompanyType').css('border-color','red');
		}
		else
			$('#CompanyType').css('border-color','');
		
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
		
		if(State == '')
		{
			invalid = 1;
			$('#s2id_State').css('border','1px solid red');
		}
		else
			$('#s2id_State').css('border','');	
			
		if(PinCode == '')
		{
			invalid = 1;
			$('#PinCode').css('border-color','red');
		}
		else
			$('#PinCode').css('border-color','');
		
		/* if(KnownLanguages == '')
		{
			invalid = 1;
			$('#s2id_KnownLanguages').css('border','1px solid red');
		}
		else
			$('#s2id_KnownLanguages').css('border','');	
 */
		
		if(CmId == '')
		{
			if(PhotoImagePath == '')
			{
				invalid = 1;
				$('#PhotoImagePath').css('border-color','red');
			}
			else
				$('#PhotoImagePath').css('border-color','');				
		}
		
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
			var description = CKEDITOR.instances.description.getData();	
				
				////////////////////////////
				formdata.append('StartedDate',$('#StartedDate').val());
				formdata.append('AlterContactNo',$('#AlterContactNo').val());
				formdata.append('CompanyWebsite',$('#CompanyWebsite').val());
				formdata.append('Facebook',$('#Facebook').val());
				formdata.append('Twitter',$('#Twitter').val());
				formdata.append('City',$('#City').val());
				formdata.append('SupportEmail',$('#SupportEmail').val());
				formdata.append('CompanyType',$('#CompanyType').val());
				formdata.append('description',description);
				
				////////////////////////////
				formdata.append('FirstName',$('#FirstName').val());
				formdata.append('LastName',$('#LastName').val());
				formdata.append('Email',$('#Email').val());
				formdata.append('Password',$('#Password').val());
				formdata.append('CompanyName',$('#CompanyName').val());
				formdata.append('MobileNo',$('#MobileNo').val());
				formdata.append('Designation',$('#Designation').val());
				formdata.append('LinkedInUrl',$('#LinkedInUrl').val());
				formdata.append('CompanyType',$('#CompanyType').val());
				formdata.append('Address1',$('#Address1').val());
				formdata.append('Address2',$('#Address2').val());
				formdata.append('State',$('#State').val());
				formdata.append('PinCode',$('#PinCode').val());
				//formdata.append('KnownLanguages',$('#KnownLanguages').val());
				//formdata.append('OtherLanguages',$('#OtherLanguages').val());
				formdata.append('InterestedIn',$('#InterestedIn').val());
				formdata.append('Status',$('#Status').val());
				formdata.append('PhotoImagePath',$("#PhotoImagePath")[0].files[0]);
				//		formdata.append('CVPath',$("#CVPath")[0].files[0]);
				formdata.append('CmId',$("#CmId").val());
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
					if(data == 1)
					{
						reset();
						get_companys(1);
						alertify.alert('<p style="color:green">Company added successfully..</p>');
						get_companys(cpage);
					}
					else if(data == 2)
					{
						alertify.alert('<p style="color:red">Email ID already exsists</p>');
					}
					else if(data == 3)
					{
						reset();
						alertify.alert('<p style="color:green">Updated Successfully..</p>');
						get_companys(cpage);
					}
					else
					{
						$('#AlertMsg').html('');
						alertify.alert('<p style="color:red">Please try later</p>');
					}
				}
			});
		}
		
	});
	
	function reset()
	{
		$('#company_form').trigger('reset');
		$("#KnownLanguages").select2("val",'');
		$('#CmId').val('');
		$('#company_form').find(':input').each(function(){
			$(this).css('border-color','');
		})
		/////////////////////////
		$('#s2id_State').css('border','');	
		$('#cke_description').css('border','');	
		$('#s2id_CompanyType').css('border','');
		/////////////////////////
		$('#PhotoImagePathex').hide();
		//		$('#CVPathex').hide();
		//$('#s2id_KnownLanguages').css('border','');	
		$('#s2id_CityId').css('border-color','');
		$('#company_form').hide();
		$('#Submit').hide();
		$('#CancelBtn').hide();
		$('#AddBtn').show();
	}
	
	function get_companys(page)
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
				var sno =0;
				$.each(data.Companies,function(i){
					sno =sno+1;
					var item = data.Companies[i];
					if(item.Status == '1')
						status="<span class='label label-success'>Active</span>";
					else
						status="<span class='label label-danger'>Inactive</span>";
					result+="<tr><td>"+sno+"</td><td>"+item.Email+"</td><td>"+item.CompanyName+"</td><td>"+item.FirstName+"&nbsp"+item.LastName+"</td><td>"+item.MobileNo+"</td><td align='center'><img style='height:20px' src='"+base_url+item.PhotoImagePath+"'/></td><td align='center'>"+status+"</td><td align='center'><button data-toggle='modal' data-target='#testuser' OnClick='editcompany("+item.UserId+");' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5' type='button' title='Edit' ><i class='fa fa-pencil'></i></button>   <button data-toggle='modal' data-target='' OnClick='del("+item.UserId+");' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' type='button' title='Delete' ><i class='fa fa-trash-o'></i></button></td></td></tr>";
				});
				$('#company_table').find('tbody').html(result);
				$('#pagination').html(data.pagination);
				$('#pagination').find('li').click(function(){
					var page = $(this).attr('page');
					get_companys(page)
				})
			}
		});
	}
});
function del(id)
	{
	alertify.confirm("Do you really want to delete all the selected Company ?", function (e) {
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
						alertify.alert('<p style="color:red">Deleted Successfully.</p>'); 
						/* $('#AlertMsg').html('Deleted Successfully.');
						$('#AlertMsg').removeClass('alert-danger');
						$('#AlertMsg').addClass('alert-success');
						$('#AlertMsg').show();
						setTimeout(function(){$('#AlertMsg').hide();},3500); */
						//get_companys(cpage);
						window.location.reload();
					}
				}
			});
		}
	});
}
function editcompany(id)
{
	id = $.trim(id);
	if(id!='')
	{
		$.ajax({
			url: "",
			type:"POST",
			data: {'getcompany':id},
			success: function(data)
			{
				$('#PasswordDiv').hide();
				$('#ConfirmPasswordDiv').hide();
				data = $.parseJSON(data);	
					//console.log(data);				
				$('#FirstName').val(data.FirstName);
				$('#LastName').val(data.LastName);
				$('#Email').val(data.Email);
				$('#Password').val(data.Password);
				$('#CompanyName').val(data.CompanyName);
				$('#Designation').val(data.Designation);
				$('#MobileNo').val(data.MobileNo);
				$('#LinkedInUrl').val(data.LinkedInUrl);
				$('#CompanyType').  select2('val',data.CompanyType);
				$('#Address1').val(data.Address1);
				$('#Address2').val(data.Address2);
				$('#State').select2('val',data.State_Id);
				$('#PinCode').val(data.PinCode);
				if(data.KnownLanguages!=null)
					var KLS = data.KnownLanguages.split(',');
				//$("#KnownLanguages").select2("val",KLS);
				//$('#OtherLanguages').val(data.OtherLanguages);
				$('#PhotoImagePathex').attr('src',data.PhotoImagePath);
				//		$('#CVPathex').val(data.CVPath); 
				$('#Status').select2('val',data.Status);
				$('#CmId').val(data.UserId);
				$('#PhotoImagePathex').show();
				//		$('#CVPathex').show();
				
				/////////////////////////////////////
		$('#StartedDate').val(data.Started_Date);
		$('#AlterContactNo').val(data.Alter_Contact_No);
		$('#CompanyWebsite').val(data.Company_website);
		$('#Facebook').val(data.FaceBook_Link);
		$('#Twitter').val(data.Twitter_Link);
		$('#City').val(data.City_Name);
		$('#SupportEmail').val(data.Support_Email);
		CKEDITOR.instances['description'].setData(data.Description);
				////////////////////////////////////////
				$('#company_form').show();
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
		alertify.confirm("Do you really want to delete all the selected Companies ?", function (e) {
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
						get_companys(1);
					}
				}
			});
		}
		else
			return false;
		});
	}
	else
	{
		$('#AlertMsg').html('Please select atleast One (1) Company to delete !!.');
		$('#AlertMsg').removeClass('alert-success');
		$('#AlertMsg').addClass('alert-danger');
		$('#AlertMsg').show();
		setTimeout(function(){$('#AlertMsg').hide();},3500);
	}
}


