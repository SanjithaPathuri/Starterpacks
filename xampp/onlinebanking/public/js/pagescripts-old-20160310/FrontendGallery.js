$(document).ready(function(){
	var cpage = 1;
	get_Gallery(cpage);	
});

function search()
{
	get_Gallery('1');
}

function get_Gallery(page)
{
	var Category = $.trim($('#Category').val());	
	$.ajax({
		url: "",
		type: "POST",
		data:{'get':'Gallery','page':page,'Category':Category},
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
			if(data.Categories!='')
			{
				$.each(data.Categories,function(i){
					var row = data.Categories[i];
					var Image = base_url+row.Image;
					var url = base_url+"Gallery/Gallery_inner/"+row.CategoryId+"/"+row.AlbumName;
					html+="<li class='col-lg-4 col-md-4 col-sm-4 col-xs-6'><div class='gallery-block'><a href='"+url+"'><img src='"+Image+"' class='img-responsive' /><div class='glry-hvrwps'><span><i class='fa fa-picture-o'></i></span></div></a><div class='gly-namewrps'><h3>"+row.AlbumName+"</h3></div></div></li>";
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
	$('#Category').val(id);
	get_Gallery('1');
}