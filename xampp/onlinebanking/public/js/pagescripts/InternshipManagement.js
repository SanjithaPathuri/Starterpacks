$(function(){
	var cpage= 1;
	get_Internships(cpage);
	autovalidation();
	$('#SearchKey').click(function(){
		get_Internships(cpage);
		$('#FiltersDiv').show();
	});
	$('#ClearFilters').click(function(){
		clearfilters();
	});
});
/*$('#InternshipBtn').click(function(){
			var data = new FormData();
			data.append('Internship_Id',$.trim($(Internship_Id).val()));
			data.append('Heading',$.trim($('#Heading').val()));
			data.append('Dead_Line',$.trim($('#Dead_Line').val()));
			data.append('Skills',$.trim($('#Skills').val()));
			data.append('Duration',$.trim($('#Duration').val()));
			data.append('DurationType',$.trim($('#DurationType').val()));
			data.append('Category',$.trim($('#Category').val()));
			data.append('Salary',$.trim($('#Salary').val()));
			data.append('Eligiblity',$.trim($('#Eligiblity').val()));
			data.append('Location',$.trim($('#Location').val()));
			data.append('StartDate',$.trim($('#StartDate').val()));
			data.append('ShortDescription',$.trim($('#ShortDescription').val()));
			data.append('Type',$.trim($('#Type').val()));
			data.append('Status',$.trim($('#Status').val()));
			data.append('Student_Count',$.trim($('#Student_Count').val()));
			data.append('Description',$.trim(CKEDITOR.instances.Description.getData()));
			data.append('Content',$.trim(CKEDITOR.instances.Content.getData()));
			data.append('UpId',$.trim($('#UpId').val()));
			
						$.ajax({
				url: base_url+"InternshipManagement/Add_interships",
				type:"POST",
				data: data,
				cache: false,
				dataType: 'json',
				processData: false, 
				contentType: false,
				enctype: 'multipart/form-data',
				beforeSend: function(){
					$('#submit').prop('disabled', true);
				},
				complete: function(){
					$('#submit').prop('disabled', false);
					get_Internships('1');
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
						setTimeout(function(){window.location.href= base_url+"/InternshipManagement";},4000);
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
		
})*/
function showhidetab(getpar)
{
	$("#Heading").val("");
	$("#Dead_Line").val("");
	$("#Skills").val("");
	$("#Type").val("");
    $("#Duration").val("");
	$("#DurationType").val("");
	$("#Category").val("");
	$("#Salary").val("");
    $("#Eligiblity").val("");
    $("#Location").val("");
	 $("#Student_Count").val("");
	//$("#ShortDescription").val("");
	$("#StartDate").val("");
	$("#OrganisationName").select2('val',"");
	$("#SubscriptionId").select2('val',"");
	$("#Internship_Id").val("");
	$("#status").val("");
	CKEDITOR.instances['Description'].setData("");
	CKEDITOR.instances['Content'].setData("");
	$("#BannerId").val("");
	$("#bannerurl").css("display","none");
	if(getpar == 'add')
	{
		$("#showhide").css("display","block");
		$('#AddBtn').hide();
		$('#InternshipBtn').show();
		$('#CancelBtn').show();
		reset();
	}
	if(getpar == 'cancel')
	{
		$("#showhide").css("display","none");
		$('#InternshipBtn').hide();
		$('#CancelBtn').hide();
		$('#AddBtn').show();
		$("#UpId").val('');
	}
}

function search()
{
	get_Internships('1');
	$('#FiltersDiv').show();
}

function clearfilters()
{
	$('#skey').val('');
	$('#Category').select2('val','');
	$('#Location').val('');
	$('#Sort').select2('val','');
	get_Internships('1');
	$('#FiltersDiv').hide();
}

function get_Internships(page)
{
	var skey = $.trim($('#search').val());
	var Category = $.trim($('#Category').val());
	var Location = $.trim($('#Location').val());
	var Sort = $.trim($('#Sort').val());
	$.ajax({
		url: base_url+"InternshipManagement/search",
		type: "POST",
		data:{'get':'Internships','skey':skey,'page':page,'Category':Category,'Location':Location,'Sort':Sort},
		
		success:function(data)
		{
			data = $.parseJSON(data);
			$("#Internship_table").find('tbody').empty();
			var html = '';
			var Status = '';
			if(data.Internships.length>0)
			{
				$.each(data.Internships,function(i){
					var item = data.Internships[i];
					var sdate = item.StartDate.split(' ');
					var ddate = item.Application_Deadline.split(' ');
					var cdate = item.iStartDate.split(' ');
					if(item.istatus == '1')
						Status = "<td align='center'><span class='inac label label-success'>Approved</span></td>";
					else
						Status = "<td align='center'><span class='inac label label-warning'>Pending</span></td>";
					
					if(item.UserStatus == '1')
						UserStatus = "<td align='center'><span class='inac label label-success'>Active</span></td>";
					else
						UserStatus = "<td align='center'><span class='inac label label-danger'>Inactive</span></td>";
					
					
					
					html+='<tr><td>'+item.Internship_Heading+'</td><td>'+item.CompanyName+'</td><td>'+item.Location+'</td><td align="center">'+ddate[0]+'</td><td align="center">'+item.No_Of_Students+'</td><td>'+item.intCreatedOn+'</td>'+UserStatus+Status+'<td align="center"><button  OnClick="editfun('+item.Internship_Id+');" class="btn btn-xs btn-primary mar-b5 bt-r mar_b5" type="button" title="Edit" ><i class="fa fa-pencil"></i></button> <button data-toggle="modal" data-target="" OnClick="deletefun('+item.Internship_Id+');" class="btn btn-xs btn-danger mar-b5 bt-r mar_b5" type="button" title="Delete" ><i class="fa fa-trash-o"></i></button></td></tr>';
				});
			}
			else
				html+="<tr><td colspan='8'><p style='margin-bottom:0px; text-align:center;'>No Records Found...!</p> </td></tr>";
			
			$("#Internship_table").find('tbody').html(html)
			$("#pagination").html(data.pagination)
			$('#pagination').find('li').click(function(){
				get_Internships($(this).attr('page'));
			});
		}
	});
}

function  categoryClick(id)
{
	$('#Category').val(id);
	$('#SearchKey').trigger('click');
}
$(document).ready(function(){
	
	
	 $('#InternshipBtn').click(function(){
		
		var invalid = '';
		 $('#Internship_form').find('.validatetrue').each(function(){
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
			$('#cke_Description').css('border','1px solid red');
			invalid = 1
		}
		else
			$('#cke_Description').css('border','');
		
		var cnttxt = $.trim(CKEDITOR.instances.Content.getData());
		if(cnttxt == '')
		{
			$('#cke_Content').css('border','1px solid red');
			invalid = 1
		}
		else
			$('#cke_Content').css('border','');
		
		if($('#Internship_form').find('#DurationType').val() == '')
		{
			$('#Internship_form').find('#s2id_DurationType').css('border','1px solid red');
			invalid = 1
		}
		else
			$('#Internship_form').find('#s2id_DurationType').css('border','')
		
		if($('#Internship_form').find('#Category').val() == '')
		{
			$('#Internship_form').find('#s2id_Category').css('border','1px solid red')
			invalid = 1
		}
		else
			$('#Internship_form').find('#s2id_Category').css('border','')
		
		if($('#Internship_form').find('#Eligiblity').val() == '')
		{
			$('#Internship_form').find('#s2id_Eligiblity').css('border','1px solid red')
			invalid = 1
		}
		else
			$('#Internship_form').find('#s2id_Eligiblity').css('border','') 
		if($('#Internship_form').find('#OrganisationName').val() == '')
		{
			$('#Internship_form').find('#s2id_OrganisationName').css('border','1px solid red')
			invalid = 1
		}
		else
			$('#Internship_form').find('#s2id_OrganisationName').css('border','')
		if($('#Internship_form').find('#Type').val() == '')
		{
			$('#Internship_form').find('#s2id_Type').css('border','1px solid red')
			invalid = 1
		}
		else
			$('#Internship_form').find('#s2id_Type').css('border','')
		
		if($('#Internship_form').find('#SubscriptionId').val() == '')
		{
			$('#Internship_form').find('#s2id_SubscriptionId').css('border','1px solid red')
			invalid = 1
		}
		else
			$('#Internship_form').find('#s2id_SubscriptionId').css('border','')
		
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
			data.append('StartDate',$.trim($('#StartDate').val()));
			data.append('ShortDescription','');
			data.append('Type',$.trim($('#Type').val()));
			data.append('Status',$.trim($('#status').val()));
			data.append('Student_Count',$.trim($('#Student_Count').val()));
			data.append('Description',$.trim(CKEDITOR.instances.Description.getData()));
			data.append('Content',$.trim(CKEDITOR.instances.Content.getData()));
			data.append('UpId',$.trim($('#UpId').val()));
			data.append('OrganisationId',$.trim($('#OrganisationName').val()));
			data.append('SubscriptionId',$.trim($('#SubscriptionId').val()));
			
						$.ajax({
				url: base_url+"InternshipManagement/Add_interships",
				type:"POST",
				data: data,
				cache: false,
				dataType: 'json',
				processData: false, 
				contentType: false,
				enctype: 'multipart/form-data',
				beforeSend: function(){
					$('#submit').prop('disabled', true);
				},
				complete: function(){
					$('#submit').prop('disabled', false);
				},
				success: function(data)
				{
					if(data == 1)
					{
						reset();
						alertify.alert("Internship Added Successfully.");
						showhidetab('cancel');
						get_Internships('1');
					}
					else if(data == 2)
					{
						reset();
						alertify.alert("Internship Updated Successfully.");
						showhidetab('cancel');
						get_Internships('1');
					}
					else
					{
						alertify.alert("Please try later.");
					}
				}
			});
		}
	});
	 
	
	$('#reset').click(function(){
		reset();
	});
});
/* ---------------------------- CK EDITER stats here ----------------------------*/
CKEDITOR.replace( 'Description' );
CKEDITOR.replace( 'Content',{customConfig : 'config-image.js'});
CKEDITOR.inline( 'CareerInf' );
/* ---------------------------- CK EDITER Ends here ----------------------------*/
function reset()
{
	$('#Internship_form').trigger('reset');
	$('#Internship_form input:required').each(function(){
		$(this).css('border-color','');
	});
	
	
	$("#Heading").val("");
	$("#Dead_Line").val("");
	$("#Skills").val("");
	$("#Type").select2('val',"");
    $("#Duration").val("");
	$("#DurationType").select2('val',"");
	$("#Category").select2('val',"");
	$("#Salary").val("");
    $("#Eligiblity").select2('val',"");
    $("#Location").val("");
	 $("#Student_Count").val("");
	//$("#ShortDescription").val("");
	$("#SubscriptionId").val("");
	$("#OrganisationName").val("");
	$("#Type").val("");
	$("#status").select2("val",'1');
	$("#Eligiblity").val("");

	/* $("#OrganisationName")$('#Internship_form').find('#DurationType').parent('.customselect2').find('.select2-choice').val("");
	$('#Internship_form').find('#Category').parent('.customselect2').find('.select2-choice').val("");
	$('#Internship_form').find('#Eligiblity').parent('.customselect2').find('.select2-choice').val("");
	$('#Internship_form').find('#DurationType').parent('.customselect2').find('.select2-choice').val("");
	$('#Internship_form').find('#Category').parent('.customselect2').find('.select2-choice').val("");
	$('#Internship_form').find('#Eligiblity').parent('.customselect2').find('.select2-choice').val(""); */
	CKEDITOR.instances['Description'].setData("");
	CKEDITOR.instances['Content'].setData("");
	$("#Heading").css('border','');
	$("#Dead_Line").css('border','');
	$("#Skills").css('border','');
	$("#s2id_Type").css('border','');
    $("#Duration").css('border','');
	$("#DurationType").css('border','');
	$("#Category").css('border','');
	$("#Salary").css('border','');
    $("#Eligiblity").css('border','');
    $("#Location").css('border','');
	 $("#Student_Count").css('border','');
	//$("#ShortDescription").css('border','');
	$("#StartDate").css('border','');
	$("#s2id_OrganisationName").css('border','');
	$("#s2id_SubscriptionId").css('border','');
	$('#Internship_form').find('#s2id_DurationType').css('border','')
	$('#Internship_form').find('#s2id_Category').css('border','')
	$('#Internship_form').find('#s2id_Eligiblity').css('border','')
	$('#cke_Content').css('border-color','');
	$('#cke_Description').css('border-color','') ;
	$('#Internship_Id').val('');
}
function editfun(Intid)
{
	reset();
	$("#Heading").css('border','');
	$("#Dead_Line").css('border','');
	$("#Skills").css('border','');
	$("#Type").css('border','');
    $("#Duration").css('border','');
	$("#DurationType").css('border','');
	$("#Category").css('border','');
	$("#Salary").css('border','');
    $("#Eligiblity").css('border','');
    $("#Location").css('border','');
	 $("#Student_Count").css('border','');
	//$("#ShortDescription").css('border','');
	$("#StartDate").css('border','');
	$("#OrganisationName").css('border','');
	CKEDITOR.instances['Description'].setData("");
	CKEDITOR.instances['Content'].setData("");
	$("#showhide").hide();
	$.ajax({
		
			type: "POST",
			url: base_url+"InternshipManagement/EditMember/",
			data : {"Edit":'true', 'Id':Intid},
			success: function(data)
			{
				$('#InternshipBtn').show();
				var obj = $.parseJSON(data);
				//console.log(obj[0].Internship_Heading);
				$("#Heading").val(obj.Internship_Heading);
				$("#Dead_Line").val(obj.Application_Deadline);
				$("#Skills").val(obj.Skills_Required);
				$("#Type").select2('val',obj.Type);
				$("#Duration").val(obj.Duration_number);
				$("#DurationType").select2('val',obj.Duration_type);
				$("#Category").select2('val',obj.Category);
				$("#Salary").val(obj.Stipend_Salary);
				$("#Eligiblity").select2('val',obj.Eligibility);
				$("#Location").val(obj.Location);
				$("#Student_Count").val(obj.No_Of_Students);
				//$("#ShortDescription").val(obj.ShortDescription);
				$("#StartDate").val(obj.iStartDate);
				$("#OrganisationName").select2('val',obj.UserId);
				$("#SubscriptionId").select2('val',obj.SubscriptionId);
				CKEDITOR.instances['Description'].setData(obj.InternDesc);	
				CKEDITOR.instances['Content'].setData(obj.More_Description);
					
				//$("#status").val(obj.status);
				$("#status").select2('val',obj.istatus);
				$("#UpId").val(obj.Internship_Id);
				$("#showhide").show()
				$('#AddBtn').hide();
				$('#CancelBtn').show();
			}
		});
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
function deletefun(teamid)
{
	alertify.confirm("Do you really want to delete the internship ?", function (e) 
	{
		if (e) 
		{
			$.ajax({
				
					type: "POST",
					url: base_url+"InternshipManagement/deleteMember/"+teamid,
					data : "teamid="+teamid,
					success: function(data)
					{
						get_Internships('1');
						alertify.alert('<p style="color:red">Deleted successfully</p>')
						
					}
			});
		}
	});
}
 