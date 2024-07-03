var sort = 'Latest';
var cpage = 1;
$(function(){
	get_Career('1');
	$('#SearchKey').click(function(){
		get_Career(cpage);
	});
	$('#ClearFilters').click(function(){
		clearfilters();
	});
	$('#OldestSort').change(function(){
		sort = 'Oldest';
		$('#FiltersDiv').show();
		get_Career('1');
	});
	
	$('#LatestSort').change(function(){
		sort = 'Latest';
		$('#FiltersDiv').show();
		get_Career('1');
	});
	
	$('#Category').change(function(){
		var cat = $.trim($('#Category').val());
		$('#CategoryId').val(cat);
		get_Career('1');
	});
	
	$('#CategoryId').change(function(){
		get_Career('1');
	});
	$('#Search').click(function(){
		get_Career('1');
	});
	
	$('#Subscribe').click(function(){
		subscribe();
	});
});

function get_Career(page)
{
	var skey = $.trim($('#skey').val());
	var Category = $.trim($('#CategoryId').val());
	if(skey!='' || Category!='')
		$('#FiltersDiv').show();
	$.ajax({
		url: "",
		type: "POST",
		data:{'order':sort,'get':'careers','skey':skey,'page':page,'Category':Category},
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
			console.log(data); 
			var html = '';
			if(data.careers!='')
			{
				$.each(data.careers,function(i){
					var row = data.careers[i]; 
					var url = base_url+"Career/Detail/"+row.Id;
					var ids=$("#ids").val(); 
						var attach="";
					if(ids=='')
					{
						if(row.Attachment!='')
						{
							attach="<a href='javascript:void(0)' data-target='#myloginpop' data-toggle='modal' class='pull-right btn btn-primary'><i class='fa fa-paperclip'></i> Attachment</a>";
						}						
					}
						
					else if(row.Attachment!='')
						attach="<a href='"+row.Attachment+"' target='_blank' class='pull-right btn btn-primary'><i class='fa fa-paperclip'></i> Attachment</a>";
						
					//console.log(row.Attachment)
					row.Last_Edited = $.trim(row.Last_Edited);
					var date="";
					if(row.Last_Edited == '')  
					    date=row.CreatedOn;
					else
						date=row.Last_Edited; 
					var liked = "";
					if(row.liked == '1')
						liked = "<a href='javascript:void(0)' class='btn btn-info'><i class='fa fa-check'></i>&nbsp;<span class='likes-count'>"+row.likes+"</span>&nbsp;&nbsp;liked</a>";
					else if(UserType != '1')
						liked = "<a href='javascript:void(0)' data-target='#myloginpop' data-toggle='modal' class='btn btn-success'><i class='fa fa-thumbs-o-up'></i>&nbsp;<span class='likes-count'>"+row.likes+"</span>&nbsp;&nbsp;likes</a>";
					else
						liked = "<a href='javascript:void(0)' likevale='"+row.Id+"' class='btn btn-success LikeClick'><i class='fa fa-thumbs-o-up'></i>&nbsp;<span class='likes-count'>"+row.likes+"</span>&nbsp;&nbsp;likes</a>";
					html+="<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'><div class='bscs-block bscsbk-listgrid'><div class='bscs-img'><img src='"+row.Image_Path+"' class='img-responsive'></div><div class='bscs-txtwps'><h3 class='bscs-hdtitle'>"+row.Title+"</h3><div class='bscs-destxt'>"+row.ShortDesc+"</div><div class='bscs-postimewps'>"+date+"</div></div><div class='bscs-readmore'><div class='carinnr-bottmwps'>"+liked+"<a href='"+base_url+"career/Detail/"+row.Id+"' class='btn btn-warning pull-right' target='_blank'>Read more</a>"+attach+"</div></div></div></div>";
				});
			}
			else
				html+="No Records Found..";
			$('#CareerInfoDiv').html(html);
			//console.log(data.pagination);
			$('#pagination').html(data.pagination);
			$('#pagination').find('li').find('a').click(function(){
				var page = $(this).parent('li').attr('page');
				get_Career(page);
			}); 
			/* $("body").on("click",'.pagination li',function(){
						var page = $(this).attr('page');
						 get_Career(page);
					}) */
			$('.LikeClick').click(function(){
				var likeId = $(this).attr('likevale');
				var str = "<form action='"+base_url+"Career/like' method='post' id='likeForm'><input type='hidden' value='"+likeId+"' name='TypeId'/><input type='hidden' value='1' name='LikeType'/></form>";
				$('#LikeDiv').html(str);
				$('#LikeDiv').find('#likeForm').trigger('submit');
			});
		}
	});
}

function clearfilters()
{
	window.location.reload();
}

function subscribe()
{
	var emailid = $.trim($('#subscribeEmail').val());
	var nullvalue = '';
	if(emailid == '')
	{
		nullvalue = 1;
		$('#subscribeEmail').css('border','1px solid red');
	}
	else
		$('#subscribeEmail').css('border','');
	
	if(nullvalue == '')
	{
		$.ajax({
			url:base_url+"Subscribe/insertSubscribe",
			data : {email:emailid,typeid:8},
			type:"POST",
			beforeSend: function() {
					$('#Subscribe').hide();
					$('#SubsLoad').show();
			},
			complete: function() {
				$('#SubsLoad').hide();
				$('#Subscribe').show();
			},
			success: function(result)
			{
				var datass = $.parseJSON(result);
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