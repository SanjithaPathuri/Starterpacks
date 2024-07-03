var cpage = 1;
$(function(){
	get_Applied_internships(cpage)
	$("#SendMailtoStu_Btn").click(function(){
		SendMailtoStu_stu();
	});
});

function get_Applied_internships(page)
{
	cpage = page;
	var SearchKey = $('#SearchKey').val();
	$.ajax({
		url: "",
		type:"POST",
		data: {'Get':'true','SearchKey':SearchKey,'page':page},
		success: function(data)
		{
			var html = '';
			var data = $.parseJSON(data);
			if(data.subjects.length>0)
			{
				var n=0;
				$.each(data.subjects,function(i)
				{
					n++;
					var CompanyName='';
					var actions = '';
					var v = data.subjects[i];
					html+='<tr>';
					html+='<td align="center">'+n+'</td>';
					html+='<td align="center">'+v.FirstName+' '+v.LastName+'</td>';
					html+='<td align="center">'+v.Internship_Heading+'</td>';
					html+='<td align="center">'+v.ApplicationDateTime+'</td>';
					if(v.ApplicationStatus == 0)
					{ 
						ApplicationStatus = '<span class="label label-warning">Pending</span>';
						actions = '<button class="btn btn-xs btn-success mar-b5 bt-r mar_b5 sthHide props OgName'+v.ApplicationId+'" title="Accept Application" OgName ="'+v.CompanyName+'" onclick="ChangeStatus('+v.UserId+',1,'+v.ApplicationId+','+v.ApplicationTypeId+');"><i class="fa fa-check"></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-xs btn-danger mar-b5 bt-r mar_b5 sthHide props OgName'+v.ApplicationId+'" title="Reject Application" OgName ="'+v.CompanyName+'" onclick="ChangeStatus('+v.UserId+',2,'+v.ApplicationId+','+v.ApplicationTypeId+');"><i class="fa fa-times"></i></button>'
					}
					else if(v.ApplicationStatus == 1)
					{
						ApplicationStatus = '<span class="label label-success">Approved</span>';
						actions = '<button OgName="'+v.CompanyName+'" class="btn btn-xs btn-danger mar-b5 bt-r mar_b5 sthHide props OgName'+v.ApplicationId+'" title="Reject Application" OgName ="'+v.CompanyName+'" onclick="ChangeStatus('+v.UserId+',2,'+v.ApplicationId+','+v.ApplicationTypeId+');"><i class="fa fa-times"></i></button>';
					}
					else if(v.ApplicationStatus == 2)
					{
						ApplicationStatus = '<span class="label label-danger">Rejected</span>';
						actions = '<button OgName="'+v.CompanyName+'" class="btn btn-xs btn-success mar-b5 bt-r mar_b5 sthHide props OgName'+v.ApplicationId+'" title="Accept Application" OgName ="'+v.CompanyName+'" onclick="ChangeStatus('+v.UserId+',1,'+v.ApplicationId+','+v.ApplicationTypeId+');"><i class="fa fa-check"></i></button>';
					}
					else
						ApplicationStatus = '';
					html+='<td align="center">'+ApplicationStatus+'</td>'; 
					html+='<td align="center"><a onclick="getPDF('+v.UserId+');" href="javascript:void(0);">Click to download</a></td>'; 
					html+='<td align="center">'+actions+'</td>';
					html+='</tr>';
				});
			} 
			else
				html+='<tr> <td> No Records Found..</td> </tr>';
			$('#AppliedCoursestb').find('tbody').html(html);
			$('#pagination').html(data.pagination);
		}
	});
}

function ChangeStatus(id,Status,appId,appTid)
{
	var id = $.trim(id);
	var Status = $.trim(Status);
	var cName = $('.OgName'+appId).attr('OgName');
	if(id!='' && Status!= '' && appId!='')
	{
		var txt = ''
		if(Status == 1)
			txt = 'Accept';
		else
			txt = 'Reject';
		$('#SendMailtoStu_Msg').val('');
		$('#SendMailtoStu_Msg').css('border','');
		$('#Accept_RejectHeading').html(txt+" Student Application");
		$('#Accept_Reject').find('#Stu').val(id);
		$('#Accept_Reject').find('#Status').val(Status);
		$('#Accept_Reject').find('#appId').val(appId);
		$('#Accept_Reject').find('#cName').val(cName);
		$('#Accept_Reject').find('#appTid').val(appTid);
		$('#Accept_Reject').modal('show');
	}		
}

function SendMailtoStu_stu()
{
	var text = $.trim($('#SendMailtoStu_Msg').val());
	var Status = $.trim($('#Status').val());
	var Stu = $.trim($('#Stu').val());
	var appId = $.trim($('#appId').val());
	var appTid = $.trim($('#appTid').val());
	var invalid = '';
	if(text=='')
	{
		$('#SendMailtoStu_Msg').css('border','1px solid red');
		invalid = 1;
	}
	else
		$('#SendMailtoStu_Msg').css('border','');
	
	if(Stu=='')
	{
		alertify.alert("<b>Some thing went wrong. <br>Refreshing the page..</b>")
		invalid = 1;
		window.location.href="";
	}
	else
		$('#Stu').css('border','');
	
	if(Status=='')
	{
		alertify.alert("<b>Some thing went wrong. <br>Refreshing the page..</b>")
		invalid = 1;
		window.location.href="";
	}
	else
		$('#Status').css('border','');
	
	if(appId=='')
	{
		alertify.alert("<b>Some thing went wrong. <br>Refreshing the page..</b>")
		invalid = 1;
		window.location.href="";
	}
	else
		$('#appId').css('border','');
	
	if(appTid=='')
	{
		alertify.alert("<b>Some thing went wrong. <br>Refreshing the page..</b>")
		invalid = 1;
		window.location.href="";
	}
	else
		$('#appTid').css('border','');
	
	if(invalid == '')
	{
		$.ajax({
			type: "POST",
			url: "",
			data : {'ChangeStatus':'true','Id':Stu,'Status':Status,'appId':appId,'txt':text,'appTid':appTid},
			beforesend: function(){
				$('.props').prop('disabled',true);
			},
			complete : function(){
				$('.props').prop('disabled',false);
			},
			success: function(data)
			{
				if(data == 1)
				{
					$('#Accept_Reject').modal('hide');
					alertify.alert("<b>Status Sent..</b>");
					get_Applied_internships(cpage);
				}
				else
				{
					alertify.alert('<b>Please try after some time..</b>');
				}
			} 
		});
	}
}

function getPDF(student_id)
{
	var id=1;
	$.ajax({
		url: base_url+'AppliedInterships/getPDF',
		data : {'id':id,'student_id':student_id},
		type:"POST",
		success:function(result) 
		{
			var get_url = $.trim(result);
			window.open(base_url+get_url,'_blank');
		}
	});
}