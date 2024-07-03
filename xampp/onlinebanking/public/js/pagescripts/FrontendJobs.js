$(document).ready(function(){
	var cpage = 1;
	var order = 'recent';
	get_Jobs(cpage);
	$('#SearchKey').click(function(){
		get_Jobs(cpage);
	});
	$('#SideSearch').click(function(){
		var for_filter=0;
		$('#Category').val($('#Category_dummy').val());
		$('#location').val($('#loc').val());
		$('#SearchKey').trigger('click');
		if($('#Category_dummy').val()!='')
		{
			for_filter=1;
		}
		if($('#loc').val()!='')
		{
			for_filter=1;
		}
		if(for_filter==1)
		{
			$('#FiltersDiv').show();
		}
	});
	$('#Subscribe').on('click',function(){
		ADDSubscribe();
	});
	$('#ClearFilters').on('click',function(){
		//clearfilters();
		location.reload()
	});
});

function get_Jobs(page)
{
	var searchKey	= $.trim($('#searchKey').val());
	var Category	= $.trim($('#Category_dummy').val());
	var location	= $.trim($('#location').val());
	var orderBy		= $.trim($('#orderBy').val());
	var exp 		= $('.rangerpickerbox').find('#amount01').val();
	exp = exp.split("-");
	var exp1 = exp[0].split(" ");
	var exp2 = exp[1].split(" ");
	var experience = exp1[0]+'-'+exp2[1];
	$.ajax({
		url: "",
		type: "POST",
		data:{'type':'Jobs','Category':Category,'location':location,'searchKey':searchKey,'page':page,'orderBy':orderBy,'experience':experience},
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
				if(data.jobs!='')
				{
				$.each(data.jobs,function(i){
					var img = base_url+'images/logo-noimage.jpg';
					var jobDetails = data.jobs[i];
					var JobTitle = jobDetails.JobTitle.substr(0, 45);
					var subs = ''
					var CompanyName = '';
					jobDetails.CompanyName = $.trim(jobDetails.CompanyName);
					if(jobDetails.CompanyName == '')
						CompanyName = 'Smart Bridge';
					else
						CompanyName = jobDetails.CompanyName;
					if(jobDetails.subscriptionShortCode == 'P')
						subs = '<span class="btn btn-info btn-xs">'+jobDetails.subscriptionShortCode+'</span>';
					if(jobDetails.subscriptionShortCode == 'PR')
						subs = '<span class="btn btn-primary btn-xs">'+jobDetails.subscriptionShortCode+'</span>';
					if(jobDetails.subscriptionShortCode == 'F')
						subs = '<span class="btn btn-warning btn-xs">'+jobDetails.subscriptionShortCode+'</span>';
					
					jobDetails.PhotoImagePath = $.trim(jobDetails.PhotoImagePath);
					if(jobDetails.PhotoImagePath != '')
						img = base_url+jobDetails.PhotoImagePath;
					var url = base_url+'Findjobfront/job/'+jobDetails.Id;
					html += '<div class="lsbx-block">';
                    html += '<div class="lsbx-hdtitle">';
                    html += '<div class="internsp-logo">';
                    html += '<a href="'+url+'"><img src="'+(img)+'" class="img-responsive" alt="Logo"></a>';
                    html += '</div>';
                    html += '<h3>'+JobTitle+' <a href="#">'+subs+'</a></h3>';
                    html += '<h4><a href="'+url+'">'+CompanyName+'</a></h4>';
                    html += '</div>';
                    html += '<div class="lsbx-contentwps">';
                    html += '<div class="intersp-locations">';
                    html += '<label>Location(s): </label> '+jobDetails.JobLocation+'';
                    html += '</div>';
                    html += '<table class="table no-table-border">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th>Experience</th>';
                    html += '<th>Eligibility</th>';
                    html += '<th>Posted On</th>';
                    html += '<th>Last Date</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';
                    html += '<tr>';
                    html += '<td>'+jobDetails.ExperienceFrom+'yr(s) - '+jobDetails.ExperienceTo+'yr(s)</td>';
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
	
	if (x=='') 
	{
		
		$("#subscribeEmail").css({"border":"2px solid red"});
		$("#subscribeEmail").val('');
		return false;
	}
	else
	{	
		var email=$("#subscribeEmail").val();
		
		$("#loading").show();	
		$.ajax({

			  url:base_url+"Subscribe/insertSubscribe",
			  data : {email:email,
					  typeid:2
						},
			
			type:"POST",
			  success: function(result)
			  {
				var datass= $.parseJSON(result);
				if(datass.error==1)
				{
					
					alertify.alert("<strong style='color:green'>"+datass.msg+"</strong>");
				}
				else
				{
					alertify.alert("<strong style='color:red'>"+datass.msg+"</strong>");
				}						
				
				$("#loading").hide();
				$("#subscribeEmail").val('');	
			  }
		  
			});
		
	}
}

function clearfilters()
{
	
}