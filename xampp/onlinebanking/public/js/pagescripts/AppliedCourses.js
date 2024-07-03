var cpage=1;
$(document).ready(function(){
	get_Applied_Courses(cpage);
	$('#searchbtn').click(function(){
		get_Applied_Courses(cpage);
	})
	$("body").on("click",'.pagination li',function(){
        cpage = $(this).attr('page');
		 get_Applied_Courses(cpage);
    })
});

function get_Applied_Courses(page)
{
	var SearchKey=$('#SearchKey').val();
	$.ajax({
				url: base_url+"AdminCourses/get_Applied_Courses",
				type:"POST",
				data: {'SearchKey':SearchKey,'page':page},
				success: function(data)
				{
					var html = '';
					var data = $.parseJSON(data);
					if(data.subjects.length>0)
					{
						var n=0;
						$.each(data.subjects,function(i)
						{
							n++;
							var v = data.subjects[i];
							html+='<tr>';
							html+='<td align="center">'+n+'</td>';
							html+='<td align="center">'+v.FirstName+' '+v.LastName+'</td>';
							html+='<td align="center">'+v.Email+'</td>';
							html+='<td align="center">'+v.MobileNo+'</td>'; 
							html+='<td align="center">'+v.CourseName+'</td>';
							html+='<td align="center">'+v.ApplicationDateTime+'</td>';
							html+='</tr>';
						});
					}
					else
					html+='<tr> <td> No Records Found..</td> </tr>';
					$('#AppliedCoursestb').find('tbody').html(html);
					$('#pagination').html(data.pagination);
				}
			});
}