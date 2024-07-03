$(document).ready(function(){
	var cpage = 1;
	var order = 'recent';
	get_Jobs(cpage);
	$('#SearchKey').click(function(){
		get_Jobs(cpage);
	});
	$('#SideSearch').click(function(){
		$('#companyName').val($('#OrgName').val());
		$('#location').val($('#loc').val());
		$('#SearchKey').trigger('click');
	});
});

function get_Jobs(page)
{
	var searchKey	= $.trim($('#searchKey').val());
	var companyName	= $.trim($('#companyName').val());
	var location	= $.trim($('#location').val());
	var orderBy		= $.trim($('#orderBy').val());
	$.ajax({
		url: "",
		type: "POST",
		data:{'type':'Jobs','companyName':companyName,'location':location,'searchKey':searchKey,'page':page,'orderBy':orderBy},
		beforeSend: function() 
		{
			$('#JobsDiv').hide();
			$('#loading').show();
		},
		success:function(data)
		{
			$('#loading').hide();
			$('#JobsDiv').show();
			data = $.parseJSON(data);
			var html = '';
			if(data.Courses!='')
			{
				$.each(data.jobs,function(i){
					var jobDetails = data.jobs[i];
					var JobTitle = jobDetails.JobTitle.substr(0, 17);
					
					html += '<div class="lsbx-block">';
                    html += '<div class="lsbx-hdtitle">';
                    html += '<div class="internsp-logo">';
                    html += '<img src="'+(base_url+jobDetails.PhotoImagePath)+'" class="img-responsive" alt="Logo">';
                    html += '</div>';
                    html += '<h3>'+JobTitle+' <a href="#"><span class="btn btn-warning btn-xs">'+jobDetails.subscriptionShortCode+'</span></a></h3>';
                    html += '<h4><a href="javascript:">'+jobDetails.CompanyName+'</a></h4>';
                    html += '</div>';
                    html += '<div class="lsbx-contentwps">';
                    html += '<div class="intersp-locations">';
                    html += '<label>Location(s): </label> '+jobDetails.JobLocation+'';
                    html += '</div>';
                    html += '<table class="table no-table-border">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th>Start Date</th>';
                    html += '<th>Eligibility</th>';
                    html += '<th>Posted On</th>';
                    html += '<th>Last Date</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';
                    html += '<tr>';
                    html += '<td>'+jobDetails.StartDate+'</td>';
                    html += '<td>'+jobDetails.Eligibility+'</td>';
                    html += '<td>'+jobDetails.PostedOn+'</td>';
                    html += '<td>'+jobDetails.EndDate+'</td>';
                    html += '</tr>';
                    html += '</tbody>';
                    html += '</table>';
                    html += '<div class="lsbx-bottmwps">';
                    html += '<span class="label ';
					html += (jobDetails.JobType == 'Full Time') ? 'label-success' : 'label-warning';
					html += '">'+jobDetails.JobType+'</span>';
                    html += '<a href="'+(base_url+"Findjobfront/job/"+jobDetails.Id)+'" class="btn btn-info pull-right">View</a>';
                    html += ' </div>';
                    html += '</div>';
                    html += '</div>';
				});
			}
			else
				html+="No Records Found..";
			$('#JobsDiv').html(html);
			$('#Pagination').html(data.pagination);
			$('#Pagination').find('li').find('a').click(function(){
				var page = $(this).parent('li').attr('page');
				get_Jobs(page);
			});
		}
	});
}

function ADDSubscribe()
{
	var x = $("#subscribeEmail").val();
	var atpos = x.indexOf("@");
	var dotpos = x.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) 
	{
		$("#validationMsg").html("<strong>Not a valid email</strong>")
		$("#validationMsg").css("color","red").fadeIn().fadeOut(8000);
		return false;
	}
	else
	{	
		var email=$("#subscribeEmail").val();
		$("#loading").show();	
		$.ajax({

			  url:"<?php echo base_url('Subscribe/insertSubscribe'); ?>",
			  data : {email:email,
					  typeid:2
						},
			
			type:"POST",
			  success: function(result)
			  {
				var datass= $.parseJSON(result);
				if(datass.error==1)
				{
					
					$("#cp_successMsg").html("<strong>"+datass.msg+"</strong>")
					$("#cp_successMsg").css("color","green").fadeIn().fadeOut(8000);
				}
				else
				{
					
					$("#cp_successMsg").html("<strong>"+datass.msg+"</strong>")
					$("#cp_successMsg").css("color","red").fadeIn().fadeOut(8000);
				}						
				
				$("#loading").hide();		 
			  }
		  
			});
		
	}
}