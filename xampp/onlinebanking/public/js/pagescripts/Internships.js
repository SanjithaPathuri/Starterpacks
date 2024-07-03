$(document).ready(function(){
	var cpage = 1;
	var order = 'Normal';
	get_Internships(cpage);
	$('#SearchKey').click(function(){
		get_Internships(cpage);
		$('#FiltersDiv').show();
	});
	$('#ClearFilters').click(function(){
		clearfilters();
	});
});

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
	var skey = $.trim($('#skey').val());
	var Category = $.trim($('#Category').val());
	var Location = $.trim($('#Location').val());
	var Sort = $.trim($('#Sort').val());
	$.ajax({
		url: "",
		type: "POST",
		data:{'get':'Internships','skey':skey,'page':page,'Category':Category,'Location':Location,'Sort':Sort},
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
			if(data.Internships!='')
			{
				$.each(data.Internships,function(i){
					var row = data.Internships[i];
					var url = base_url+"Internship/Internshipsinner/"+row.Internship_Id;
					var img = '';
					if(row.PhotoImagePath==null)
						img = base_url+'images/logo-noimage.jpg';
					else
						img = base_url+row.PhotoImagePath;
					var sdate = row.iStartDate.split(' ');
					var ddate = row.Application_Deadline.split(' ');
					var cdate = row.CO.split(' ');
					var subs  = '';
					if(row.subscriptionShortCode == 'F')
						subs  = "<span class='btn btn-warning btn-xs'>"+row.subscriptionShortCode+"</span>";
					else if(row.subscriptionShortCode == 'P')
						subs  = "<span class='btn btn-info btn-xs'>"+row.subscriptionShortCode+"</span>";
					else if(row.subscriptionShortCode == 'PR')
						subs  = "<span class='btn btn-primary btn-xs'>"+row.subscriptionShortCode+"</span>";
					var type = '';
					if(row.Type == "Full Time")
						type  = "<span class='label label-success'>"+row.Type+"</span>";
					else
						type  = "<span class='label label-warning'>"+row.Type+"</span>";
					srcerror();
					html+="<div class='lsbx-block'><div class='lsbx-hdtitle'><div class='internsp-logo'><a href='"+url+"'><img alt='Logo' class='img-responsive' src='"+img+"' onerror='srcerror();'/></a></div><h3>"+row.Internship_Heading+" "+subs+" </h3><h4><a href='"+url+"'>"+row.CompanyName+"</a></h4></div><div class='lsbx-contentwps'><div class='intersp-locations'><label>Location(s): </label>"+" "+row.Location+"</div><table class='table no-table-border'><thead><tr><th>Start Date</th><th>Duration</th><th>Stipend</th><th>Posted On</th><th>Application Deadline</th></tr></thead><tbody><tr><td>"+sdate[0]+"</td><td>"+row.Duration_number+" "+row.Duration_type+"</td><td>"+row.Stipend_Salary+"/Month </td><td>"+cdate[0]+"</td><td>"+ddate[0]+"</td></tr></tbody></table><div class='lsbx-bottmwps'> <a class='btn btn-info pull-right' href='"+url+"'>View</a></div></div></div>";
					srcerror();
				});
			}
			else
				html+="No Records Found..";
			$('#InternshipsContent').html(html);
			$('#Pagination').html(data.pagination);
			$('#Pagination').find('li').find('a').click(function(){
				var page = $(this).parent('li').attr('page');
				get_Internships(page);
			});
		}
	});
}

function  categoryClick(id)
{
	$('#Category').val(id);
	$('#SearchKey').trigger('click');
}

function srcerror()
{
	$(this).attr('src',base_url+'images/logo-noimage.jpg');
}