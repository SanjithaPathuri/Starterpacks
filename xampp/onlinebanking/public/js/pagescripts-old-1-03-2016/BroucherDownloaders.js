$(function(){
	var cpage = 1;
	get_downloaders(cpage);
});

function get_downloaders(page)
{
	var skey = $('#search').val();
	$.ajax({
		url: "",
		type:"POST",
		data: {'get':'1','skey':skey,'page':page},
		success: function(data)
		{
			data = $.parseJSON(data);
			var html = '';
			$.each(data.downloaders,function(i){
				var row = data.downloaders[i];
				html+="<tr><td>"+row.Name+"</td><td>"+row.EmailId+"</td><td>"+row.Mobile+"</td><td>"+row.Download_Count+"</td><td>"+row.LastDownloaded+"</td></tr>";
			});
			$('#downloaders_table').find('tbody').html(html);
			$('#pagination').html(data.pagination);
		}
	});
}