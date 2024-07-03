var cpage    = 1;
$(function(){
	get_GuestLectures(cpage);
	$('#Search').click(function(){
		$('#FiltersDiv').show();
		get_GuestLectures(cpage);
	});
	$('#ClearFilters').click(function(){
		location.reload();
	});
	$('input[name=filters]').change(function(){
		$('#FiltersDiv').show();
		get_GuestLectures(cpage);
	});
	$('#filtersearch').click(function(){
		$('#FiltersDiv').show();
		get_GuestLectures(cpage);
	});
	$("body").on("click",'.pagination li',function(){
		cpage = $(this).attr('page');
		 get_GuestLectures(cpage); 
	})
});

function get_GuestLectures(page)
{
	var skey		= $('#skey').val();
	var Location	= $('#Location').val();
	var sortby		= $('input[name=filters]:checked').val();
	var Category	= '';
	if($.trim($('#SideCategory').val()) == '')
		Category = $.trim($('#Category').val());
	else
		Category = $.trim($('#SideCategory').val());
	
	$.ajax({
			url:"",
			type:"POST",
			data:{'Get':'GuestLectures','skey':skey,'Location':Location,'page':page,'sortby':sortby,'Category':Category},
			success: function(data)
			{
				var html = '';
				var data = $.parseJSON(data);
				if(data.Knowledge!='')
				{
					$.each(data.Knowledge,function(i){
						var row = data.Knowledge[i];
						var CreatedOn = row.kCreatedOn;
						CreatedOn = CreatedOn.split(' ');
						var img = $.trim(row.PhotoImagePath);;
						if(img == '')
							var img = base_url+'images/profile-image.png';
						else
							img = base_url+img;
						var desc = $(row.Description).text();
						desc = desc.substr(0,50); 
						html+="<div class='lsbx-block'><div class='lsbx-hdtitle'><h3>"+row.TopicName+"</h3><h4>Description: <a href='javascript:void(0);'>"+desc+"</a></h4></div><div class='lsbx-contentwps'><div class='intersp-locations'><label>Location : </label> "+row.Location+"</div><table class='table no-table-border'><thead><tr><th>From</th><th>To</th><th>Posted On</th><th>Category</th></tr></thead><tbody><tr><td>"+row.Available_From+"</td><td>"+row.Available_To+"</td><td>"+CreatedOn+"</td><td>"+row.Category_name+"</td></tr></tbody></table><div class='lsbx-bottmwps'>";
						if(row.postedUserId == '0')
						{
							html+="<a>Posted by Smartbridge</a>";
						}
						else
						{
							html+="<a class='btn btn-success btn-sm' href='javascript:void(0)' onclick='get_mentor_profile("+row.postedUserId+")'>View Profile</a>";
						}					
						html+="<a class='btn btn-info pull-right' href='"+base_url+"GuestLectures/inner/"+row.KnowledgeId+"'>View</a></div></div></div>";
					});
				}
				else
					html+="No Records Found.."; 
				
				$('#showdata').html(html);
				$('#pagination').html(data.pagination);
				
			}
	});
	
}
function get_mentor_profile(id)
{
	if(id == '0' || id == null)
	{
		alert('ss');
	}
	else
	{
		$.ajax({
			url:base_url+"GuestLectures/get_mentor_profile",
			type:"POST",
			data:{'id':id},
			success: function(data)
			{
				var data = $.parseJSON(data);
				var image_path = '';
				if(data.profile.PhotoImagePath == '1')
				{
					image_path = data.profile.SocialRegistrationImage;
				}
				else if(data.profile.PhotoImagePath == null)
				{
					image_path = 'images/noimage.jpg';
				}
				else
				{
					image_path = data.profile.PhotoImagePath;
				}
				document.getElementById("mentor_img").src=base_url+image_path;
				
				$('#Name').html(data.profile.FirstName+' ' +data.profile.LastName);
				if(data.profile.CompanyName == null)
				{
					data.profile.CompanyName = '--';
				}
				if(data.profile.Designation == null)
				{
					data.profile.Designation = '--';
				}
				
				$('#Company').html(data.profile.CompanyName);
				$('#Designation').html(data.profile.Designation);
				console.log(data.exp);
				var exp_details = '';
				if(data.exp != '')
				{
					$.each(data.exp,function(i)
					{
						var v = data.exp[i];
						if(v.No_of_Years == '0')
						{
							v.No_of_Years = 'Fresher';
						}
						else if(v.No_of_Years == '10')
						{
							v.No_of_Years = '10 plus years'
						}
						else
						{
							v.No_of_Years = v.No_of_Years+' years';
						}
						exp_details += v.ExperienceTypeName +' : '+v.Stream+'('+v.No_of_Years+')<br>'; 
					});
				}
				else
				{
					exp_details = '--';
				}
				$('#Experience').html(exp_details);
				
				$('#guestviewpop').modal('show');
			}
		});
	}
	
}