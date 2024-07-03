$(document).ready(function(){
	var cpage = 1;
	get_Innovative(cpage);
	$('#FiltersDiv').click(function(){
		$('#Category').val('');
		$('#Branch').val('');
		get_Innovative('1');
		$('#FiltersDiv').hide();
		$('.CategoryFilter').removeClass('active');
		$('.BranchFilter').removeClass('active');
	});
});

function search()
{
	get_Innovative('1');
}

function get_Innovative(page)
{
	var Category = $.trim($('#Category').val());	
	var Branch = $.trim($('#Branch').val());	
	$.ajax({
		url: "",
		type: "POST",
		data:{'get':'Innovative','page':page,'Category':Category,'Branch':Branch},
		beforeSend: function()
		{
			$("#Innovativepro").hide();
			$("#pre-loading").show();
		},
		success:function(data)
		{
			$("#pre-loading").hide();
			$("#Innovativepro").show();
			data = $.parseJSON(data);
			var html = '';
			if(data.Projects!='')
			{
				$.each(data.Projects,function(i){
					var row = data.Projects[i];
					/*if(row.images!='')
					{
						var Imgstring = row.images[0].ImageLink; // just an example
						var Image = Imgstring.replace('/thumbs', '');
						Image = base_url+Image;
					}*/
					var Image = base_url+row.BlockDiagram;
					var today = new Date();
					var dd = today.getDate(); var mm = today.getMonth(); var yy = today.getFullYear(); 
					var splitted = row.CreatedDate;
					splitted = splitted.split(' ');
					mm = parseInt(mm)+parseInt(1);
					if(parseInt(mm) < 9)
						mm = '0'+mm;
					if(parseInt(dd) < 9)
						dd = '0'+dd;
					var currDate = yy+'-'+mm+'-'+dd;
					var New = '';
					if(currDate == splitted[0])
						New = "<span class='notitc-new'>New</span>";
					var Rating = "";
					for(r=1; r<=row.rating.rating; r++)
					{
						Rating+="<img src='"+base_url+"images/star.jpg'/>";
					}
					var url = base_url+"InnovativeProjects/Details/"+row.ProjectId;
					html+="<div class='col-lg-4 col-md-4 col-sm-4 col-xs-12'><div class='bxblock'><div class='bxbk-img'><img class='img-responsive' src='"+Image+"'/></div><div class='bxbk-name'>"+row.ProjectTitle+New+"</div><div class='bxbk-star-vwdtls'><div class='star-wrps'>"+Rating+"</div><a href='"+url+"' class='viewdlsbtn btn btn-info btn-sm'>View Details</a> </div> <div class='bxbk-addcart-pric'> <a href='#' class='addcart-btn btn btn-primary'><i class='fa fa-shopping-cart'></i></a><span class='bxbk-price'><i class='fa fa-rupee'></i>"+row.Price+"</span></div></div></div>";
				});
			}
			else
				html+="No Records Found..";
			$('#Innovativepro').html(html);
			$(".ratingstar").rating();
			$('#Pagination').html(data.pagination);
			$('#Pagination').find('li').find('a').click(function(){
				var page = $(this).parent('li').attr('page');
				get_Innovative(page);
			});
		}
	});
}

function  categoryClick(id)
{
	$('#FiltersDiv').show();
	$('#Category').val(id);
	get_Innovative('1');
	$('.CategoryFilter').removeClass('active');
	$('#Category'+id).addClass('active');
}

function branchClick(id)
{
	$('#FiltersDiv').show();
	$('#Branch').val(id);
	get_Innovative('1');
	$('.BranchFilter').removeClass('active');
	$('#branch'+id).addClass('active');
}