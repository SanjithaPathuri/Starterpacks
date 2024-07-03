$(function(){
	cpage = 1;
	get_workshops(cpage);
	blurValidations();
	$('#search_form').submit(function(){
		get_workshops(cpage);
	});
	$("body").on("click",'.pagination li',function(){
			cpage = $(this).attr('page');
			 get_workshops(cpage);
		})
	$('#submit_btn').click(function(){
		$('#workshop_form').trigger('submit');
	});
	$('#add_btn').click(function(){
		resetting();
		$('#workshop_form').show();
		$('#cancel').show();
		$('#submit_btn').show();
		$('#add_btn').hide();
	})	
	$('#cancel').click(function(){
		resetting();
		$('#workshop_form').hide();
		$('#submit_btn').hide();
		$('#cancel').hide();
		$('#add_btn').show();
	})	
		
		
		
	$('#workshop_form').submit(function(){
		var inavlid = '0';
		var Category = $.trim($('#Category').val());
		var Status = $.trim($('#Status').val());
		var Location = $.trim($('#Location').val());
		var wid = $.trim($('#wid').val());
		var WorkshopImg = $.trim($('#WorkshopImg').val());	
		if(wid == '')
		{
			if(WorkshopImg == '')
			{
				inavlid = '1';
				$('#WorkshopImg').css('border','1px solid red');
			}
			else
				$('#WorkshopImg').css('border','');	
		}
		if(Status == '')
		{
			inavlid = '1';
			$('#s2id_Status').css('border','1px solid red');
		}
		else
			$('#s2id_Status').css('border','');
		
		if(Category == '')
		{
			inavlid = '1';
			$('#s2id_Category').css('border','1px solid red');
		}
		else
			$('#s2id_Category').css('border','');
		if(Location == '')
		{
			inavlid = '1';
			$('#s2id_Location').css('border','1px solid red');
		}
		else
			$('#s2id_Location').css('border','');
		
		if($.trim(CKEDITOR.instances.Description.getData())=='')
		{
			$('#cke_Description').css('border','1px solid red');
			inavlid=1;
		}
		else
			$('#cke_Description').css('border','');
		
		 if($.trim(CKEDITOR.instances.Practicals.getData())=='')
		{
			$('#cke_Practicals').css('border','1px solid red');
			inavlid=1;
		}
		else
			$('#cke_Practicals').css('border','');
		
		/*if($.trim(CKEDITOR.instances.Doubts.getData())=='')
		{
			$('#cke_Doubts').css('border','1px solid red');
			inavlid=1;
		}
		else
			$('#cke_Doubts').css('border','');
		
		if($.trim(CKEDITOR.instances.Certificate.getData())=='')
		{
			$('#cke_Certificate').css('border','1px solid red');
			inavlid=1;
		}
		else
			$('#cke_Certificate').css('border',''); */
		
		
		
		$('.null').each(function(){
			
			var val = $.trim($(this).val());
			if(val == '')
			{
				inavlid = '1';
				$(this).css('border','1px solid red');
			}
			else
				$(this).css('border','');
		})
		var desc = $.trim(CKEDITOR.instances.Description.getData());
		$('#Description').val(desc);
		 var Practicals = $.trim(CKEDITOR.instances.Practicals.getData());
		 $('#Practicals').val(Practicals);
		// var Doubts = $.trim(CKEDITOR.instances.Doubts.getData());
		// var Certificate = $.trim(CKEDITOR.instances.Certificate.getData());
		
		 
		// $('#Doubts').val(Doubts);
		// $('#Certificate').val(Certificate);
		
		if(inavlid == '0')
		{
			$.ajax({
					url: "",
					data : new FormData(this),
					processData: false,
					contentType: false,
					type:"POST",
					beforeSend: function(){},
					complete:function(){ resetting();},
					success: function(data1)
					{
						var datass = $.parseJSON(data1);
						if(datass.err==1)
						{
							alertify.alert("<p style='color:green'>"+datass.msg+"</p>");
							get_workshops(cpage);					
						}
						else
						{
							alertify.alert("<p style='color:red'>"+datass.msg+"</p>");get_workshops(cpage);
						}
					}
				});
		}
		
	})

	$('#FromDate').datetimepicker({});
	$('#ToDate').datetimepicker({});
	
	/* $('#FromDate').datetimepicker({
	language:  'fr',
	weekStart: 1,
	todayBtn:  0,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0,
	todayBtn:  1,
	autoclose: true,
	}).on('changeDate', function (selected) {
	var get_class = $(this).attr('id');
	var id_no = get_class.substr(get_class.length - 1); 
	var minDate12 = new Date(selected.date.valueOf());
	$('#ToDate').datetimepicker('setStartDate', minDate12);
	});
				
	$('#ToDate').datetimepicker({
	language:  'fr',
	weekStart: 1,
	todayBtn:  0,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0
	}).on('changeDate', function (selected) {
	 var get_class = $(this).attr('id');
	var id_no = get_class.substr(get_class.length - 1); 
	var minDate12 = new Date(selected.date.valueOf());
	$('#FromDate').datetimepicker('setEndDate', minDate12);
	}); */
	
	
});
function resetting()
{
	$('.null').each(function(){
		$(this).val('');
		$(this).css('border','');		
	})
	$('#wid').val('');
	$('#WorkshopImg').val('');
	$('#WorkshopImg').css('border','');
	$('#WorkshopImg_hide').hide();
	$("#Status").select2('val','');
	$('#s2id_Status').css('border','');
	$("#Location").select2('val','');
	$('#s2id_Location').css('border','');
	$("#Category").select2('val','');
	$('#s2id_Category').css('border','');
	
	CKEDITOR.instances['Description'].setData('');
	$('#cke_Description').css('border','');
	 CKEDITOR.instances['Practicals'].setData('');
	$('#cke_Practicals').css('border','');
	/*CKEDITOR.instances['Doubts'].setData('');
	$('#cke_Doubts').css('border','');
	CKEDITOR.instances['Certificate'].setData('');
	$('#cke_Certificate').css('border',''); */
	
	document.getElementById("WorkshopImg_hide").src='';
	$("#workshop_form").hide();
	
	$('#workshop_form').hide();
	$('#submit_btn').hide();
	$('#cancel').hide();
	$('#add_btn').show();
}
function get_workshops(page)
{
	var skey = $('#search').val();
	$.ajax({
		url: "",
		type: "POST",
		data:{'get':'true','skey':skey,'page':page},
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
			data = $.parseJSON(data);
			var html = '';
			if(data.workshops!='')
			{
				var n = 0;
				$.each(data.workshops,function(i){
					n = n +1;
					
					var row = data.workshops[i];
					var Titles = row.Title; 
					var Title = Titles.substr(0,17);
					var url = base_url+"Technicalworkshops/workshopinner/"+row.WorkshopId;
					var Status = '';
					if(row.Status == '1')
						Status ="<span class='inac label label-success'>Active</span>"; 
					else
						Status ="<span class='inac label label-danger'>In-Active</span>";
					html+="<tr><td>"+n+"</td><td>"+Title+"</td><td><img src='"+row.Image+"' style='height:35px'/></td><td><a target = '_blank' href ='"+base_url+"Manageworkshops/ManageChapters/"+row.WorkshopId+"'><button  class='btn btn-xs btn-info mar-b5 bt-r mar_b5'> Manage Chapters</button></a></td><td><a  target = '_blank' href ='"+base_url+"Manageworkshops/ManageCertificates/"+row.WorkshopId+"'><button  class='btn btn-xs btn-warning mar-b5 bt-r mar_b5'> Manage Certificates</button></a></td><td><a target = '_blank' href ='"+base_url+"Manageworkshops/WorkshopFAQ/"+row.WorkshopId+"'><button  class='btn btn-xs btn-primary  mar-b5 bt-r mar_b5'> Manage FAQ 's</button></a></td><td>"+row.CreatedOn+"</td><td style='text-align:center'>"+Status+"</td><td align='center'><button onclick='editfun("+row.WorkshopId+");' title='Edit' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5'><i class='fa fa-pencil'></i></button>&nbsp;&nbsp;&nbsp;&nbsp<button onclick='deletefun("+row.WorkshopId+");' title='delete' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5 danger'><i class='fa fa-trash'></i></button></td></tr>";
				});
			}
			else
				html+="No Records Found..";
			$('#WorkshopsDiv').find('tbody').html(html);
			$('#pagination').html(data.pagination);
		}
	});
}
function editfun(id)
{
	if(id != '')
	{
		$.ajax({
			url     : "",
			type    : 'POST',
			data    : {'id':id,'role':'edit'},
			success : function(data){
				
				
				var data = $.parseJSON(data);
				if(data != '')
				{
					$('#WorkshopTitle').val(data.Title)	;
					CKEDITOR.instances['Description'].setData(data.Description);
					$("#Category").select2('val',data.TypeId);
					$('#YoutubeLink').val(data.YoutubeLink)	;
					$('#Venue').val(data.Venue)	;
					$('#FromDate').val(data.FromDate)	;
					$('#ToDate').val(data.ToDate)	;
					$("#Status").select2('val',data.Status);
					$("#Location").select2('val',data.Location);
					$("#Map").val(data.Map)	;
					
					//$('#KitDetails').val(data.Kit)	;					
					CKEDITOR.instances['Practicals'].setData(data.Project_practicals_description);
					//CKEDITOR.instances['Doubts'].setData(data.ClearYourDoubts_description);
					//CKEDITOR.instances['Certificate'].setData(data.GetCertificte_description);
					//$('#Fee').val(data.Fee)	;
					//$('#ContactEmail').val(data.ContactEmail);
					//$('#FromTime').val(data.FromTime)	;
					//$('#ToTime').val(data.ToTime)	;
					//$('#ContactMobile').val(data.ContactMobile)	;
					//$('#less50').val(data.lessthan50)	;
					/* $('#50_100').val(data.d1)	;
					$('#100_150').val(data.d2)	;
					$('#150plus').val(data.d3)	; */
					
					$('#wid').val(data.WorkshopId);
					$('#RegularPrice').val(data.RegularPrice);
					$('#DiscountPrice').val(data.DiscountPrice);
					document.getElementById("WorkshopImg_hide").src=base_url+data.Image;
					$('#WorkshopImg_hide').show();
					$('#workshop_form').show();
					$('#cancel').show();
					$('#submit_btn').show();
					$('#add_btn').hide();
				}
			},
		})
	}
}
















function deletefun(id)
{
	id = $.trim(id);
	if(id!='')
	{
		$.ajax({
			url: "",
			type: "POST",
			data:{'Delete':'Workshop','id':id},
			beforeSend: function()
			{
				$('.danger').hide()
			},
			complete:function()
			{
				$('.danger').show()
			},
			success:function(data)
			{
				get_workshops(1);
				alertify.alert("Workshop Deleted Successfully."); 
			}
		});
	}
}
function blurValidations()
	{
		$('.name').blur(function(){
			var namePattren = /^[a-zA-Z][a-zA-Z ]+$/ ;
			if(!namePattren.test($(this).val()))
			{
			$(this).val('');
			$(this).css('border','1px solid red')
			}
			else
			$(this).css('border','')
				
		});
		$('.currdate').blur(function(){
			var currentYear = (new Date).getFullYear();
			
			var numPattren = /[^0-9]/g ;
			if(numPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				if($(this).val() > currentYear)
				{
				$(this).val('');
				$(this).css('border','1px solid red')
				}
				else
				$(this).css('border','')
			}
				
		});
		$('.nums').blur(function(){
			var numPattren = /[^0-9]/g ;
			if(numPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				if($(this).val() == '')
				{
					$(this).val('');
					$(this).css('border','1px solid red')
				}
				else
					$(this).css('border','')
			}	
		});
		$('.address').blur(function(){
			var addPattren = /^[a-zA-Z0-9\s,'-]*$/ ;
			if(!addPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				if($(this).val() == "")
				{
					$(this).val('');
					$(this).css('border','1px solid red')
				}
				else
				$(this).css('border','')
			}	
		});
		$('.email').blur(function(){
			var emailPattren =/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
			if(!emailPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				$(this).css('border','')
			}	
		});
		$('.pincode').blur(function(){
			var pincodePattren = /^\d{6}$/;
			if(!pincodePattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				$(this).css('border','')
			}	
		});
		
		$('.MobileNo').blur(function(){
			var mobilePattren = /^(\+\d{1,3}[- ]?)?\d{10}$/;
			if(!mobilePattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				$(this).css('border','')
			}	
		});
		$('.URL').blur(function(){
			var URLPattren =/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
			if(!URLPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				$(this).css('border','')
			}	
		});
		$('.empty').blur(function(){
			if($(this).val() == '')
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				$(this).css('border','')
			}		
		});
		
	}
	
//////////////////////image validation/////////////////////////////////
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
	else{
		var img = new Image();
		var _URL = window.URL || window.webkitURL;
		img.src = _URL.createObjectURL(file);
		img.onload = function () {
			if (this.width >= 400  && this.height >= 250)
			{
				
				var reader = new FileReader();
				reader.onloadend = function() {
					$("#WorkshopImg_hide").attr("src",reader.result); 
				}
				reader.readAsDataURL(file); 
				
				$("#WorkshopImg_hide").show();
			}	
			else
			{
				err = '1';
				alertify.alert("Your Image Have "+this.width+" * "+this.height+" </br> Please Upload Images With Atleast 400 Width And 250 Height");
				$('#EventImagePath').val('');
				return false;
			}	
		};
	}
})							