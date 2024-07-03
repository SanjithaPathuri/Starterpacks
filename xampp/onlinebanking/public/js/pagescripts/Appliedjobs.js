var cpage=1;
$(document).ready(function(){
	get_Applied_jobs(cpage);
	$('#searchbtn').click(function(){
		get_Applied_jobs(cpage);
	});
	
	$("body").on("click",'.pagination li',function(){
        cpage = $(this).attr('page');
		 get_Applied_jobs(cpage);
    });
	
	$('#SendMailtoHrBtn').click(function(){
		SendtoHr();
	}); 
});

function get_Applied_jobs(page)
{
	var SearchKey=$('#SearchKey').val();
	$.ajax({
		url: base_url+"Findjob/get_Applied_jobs",
		type:"POST",
		data: {'SearchKey':SearchKey,'page':page},
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
					var jobname='';
					var CompanyName='';
					
					var v = data.subjects[i];
					html+='<tr>';
					html+='<td align="center">'+n+'</td>';
					html+='<td align="center">'+v.FirstName+' '+v.LastName+'</td>';
					html+='<td align="center">'+v.Email+'</td>';
					if(v.JobTitle==null || v.JobTitle=='')
					{
						jobname='N/A';
					}
					else
						jobname=v.JobTitle;
					if(v.ApplicationStatus == 0)
						ApplicationStatus = '<span class="label label-warning">Pending</span>';
					else if(v.ApplicationStatus == 1)
						ApplicationStatus = '<span class="label label-Success">Approved</span>';
					else if(v.ApplicationStatus == 3)
						ApplicationStatus = '<span class="label label-danger">Rejected</span>';
					else
						ApplicationStatus = '';
					if(v.CompanyName==null || v.CompanyName=='')
					{
						CompanyName='N/A';
					}
					else
						CompanyName=v.CompanyName;
					
					html+='<td align="center">'+jobname+'</td>';
					html+='<td align="center">'+CompanyName+'</td>';
					html+='<td align="center">'+v.ApplicationDateTime+'</td>';
					html+='<td align="center">'+ApplicationStatus+'</td>';
					html+='<td align="center"><a onclick="getPDF('+v.UserId+');" href="javascript:void(0);">Click to download</a></td>'; 
					html+='<td align="center"><button class="btn btn-xs btn-warning mar-b5 bt-r mar_b5 sthHide" title="Send To HR" onclick="SendtoHrpop('+v.UserId+');"><i class="fa fa-inbox"></i></button></td>';
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

function SendtoHrpop(Id)
{
	Id = $.trim(Id);
	if(Id!='')
	{
		$('#HRemail').val('');
		$('#HRemail').css('border','');
		$('#IdToHr').val(Id);
		$('#SendMailtoHr').modal('show');
	}
		
}

function SendtoHr()
{
	Id = $.trim($('#IdToHr').val());
	if(Id!='')
	{
		var HRemail = $.trim($('#HRemail').val())
		if(HRemail!='')
		{
			$.ajax({
					url: base_url+'AppliedInterships/SendMailtoHr',
					data : {'student_id':Id, 'HRemail':HRemail},
					type:"POST",
					success:function(result) 
					{
						 if(result == 1)
						 {
							 $('#SendMailtoHr').modal('hide');
							 $('#HRemail').val('');
							 $('#HRemail').css('border','');
							 alertify.alert("Email sent successfully..");
						 }
					}
				});
		}
		else
			$('#HRemail').css('border','1px solid red');
	}
}