$(document).ready(function(){
	var cpage = 1;
	get_Gallery(cpage);	
	
	$('.ArchivesClick').click(function(){
		$('#ClearFilters').show();
		var archieve = $(this).attr('archive');
		archivesclick(archieve);
	});
	$('#ClearFilters').hide();
	$('#ClearFilters').click(function(){ 
		$('#ClearFilters').hide();
		$('#Category').val('');
		$('#archivesfield').val('');
		get_Gallery('1')
	});
});

function search()
{
	get_Gallery('1');
}

function get_Gallery(page)
{
	var Category = $.trim($('#Category').val());
	var archives = $.trim($('#archivesfield').val());
	$.ajax({
		url: "",
		type: "POST",
		data:{'get':'Gallery','page':page,'Category':Category,'archives':archives},
		beforeSend: function()
		{
			$("#ImagesDiv").hide()
			$("#LoadingDiv").show()
		},
		complete:function()
		{
			$("#LoadingDiv").hide()
			$("#ImagesDiv").show()
		},
		success:function(data)
		{
			data = $.parseJSON(data);
			var html = '';
			if(data.Categories!='')
			{
				$.each(data.Categories,function(i){
					var row = data.Categories[i];Image
					var Image = base_url+row.Thumb;
					
					var url = encodeURI(base_url+"Gallery/Gallery_inner/"+row.CategoryId+"/"+row.AlbumName);
					var AlbumName = row.AlbumName;
					if(row.AlbumName.length > 25)
					{
						AlbumName = AlbumName.substring(0,25);
						AlbumName = AlbumName+' ...';
					}
					html+="<li class='col-lg-4 col-md-4 col-sm-4 col-xs-6'><div class='gallery-block'><a href='"+url+"'><img src='"+Image+"' class='img-responsive' /><div class='glry-hvrwps'><span><i class='fa fa-picture-o'></i></span></div></a><div class='gly-namewrps'><h3>"+AlbumName+"</h3></div></div></li>";
				});
			}
			else
				html+="No Records Found..";
			$('#CategoryImages').html(html);
			$('#Pagination').html(data.pagination);
			$('#Pagination').find('li').find('a').click(function(){
				var page = $(this).parent('li').attr('page');
				get_Gallery(page);
			});
		}
	});
}

function  categoryClick(id)
{
	$('#ClearFilters').show();
	$('#Category').val(id);
	get_Gallery('1');
}

function archivesclick(archieve)
{
	$('#ClearFilters').show();
	$('#archivesfield').val(archieve);
	get_Gallery('1');
}