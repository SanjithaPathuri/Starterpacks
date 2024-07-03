$(function(){
	cpage = 1;
	getJoinedmembers(cpage);
	$('#searchbtn').click(function(){
		getJoinedmembers('1');
	});
});

function getJoinedmembers(page)
{
	skey = $('#search').val();
	$.ajax({
		url: "",
		type:"POST",
		data: {'get':'JEvents','skey':skey,'page':page},
		beforeSend: function(){
		},
		complete: function(){
		},
		success: function(data)
		{
			data = $.parseJSON(data);
			var html = '';
			var j = 1;
			$.each(data.JEvents, function(i){
				var row = data.JEvents[i];
				
				html+="<tr><td>"+j+"</td><td>"+row.FirstName+" "+row.LastName+"</td><td align='center'>"+row.Email+"</td><td align='center'>"+row.EventName+"</td><td align='center'>"+row.ApplicationDateTime+"</td></tr>";
				j++;
			});
			$('#JoinedEvents').find('tbody').html(html);
			$('#pagination').html(data.pagination);
			$('.pagination').find('a').click(function(){
                var newpage = $(this).parent('li').attr('page')
                getJoinedmembers(newpage);
            })
		}
	});
}