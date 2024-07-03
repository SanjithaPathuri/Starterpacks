var cpage=1;
$(document).ready(function(){
	get_courses(cpage);
	$('#searchbtn').click(function(){
		get_courses(cpage);
	})
	$("body").on("click",'.pagination li',function(){
        cpage = $(this).attr('page');
		 get_courses(cpage);
    });
	
	$('#CourseDiscountAmount').change(function(){ 
		var damount = $.trim($('#CourseDiscountAmount').val());
		var camount = $.trim($('#CourseAmount').val());
		if(camount =='')
		{
			$('#CourseDiscountAmount').val('');
			$('#CourseDiscountAmount').css('border','1px solid red');
			$('#CourseAmount').css('border','1px solid red');
		}
		else
		{
			if((parseInt(damount)) > parseInt(camount))
			{
				alertify.alert("<b>Discount amount cannot be greater than Actual amount..</b>");
				$('#CourseDiscountAmount').val('');
				$('#CourseDiscountAmount').css('border','1px solid red');
				$('#CourseAmount').css('border','1px solid red');
			}
			else
			{
				$('#CourseDiscountAmount').css('border','');
				$('#CourseAmount').css('border','');
			}
		}
	});
});

function get_courses(page)
{
	var SearchKey=$('#SearchKey').val();
	$.ajax({
				url: base_url+"AdminCourses/get_courses",
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
							html+='<td align="center">'+v.CourseName+'</td>';
							html+='<td align="center">'+v.CourseAmount+'</td>';
							html+='<td align="center">'+v.CourseDiscountAmount+'</td>';
							/*
							var msg=v.CourseDescription;
							var submsg=msg.substring(0, 20);
							html+='<td align="center">'+submsg+'..</td>';
							*/
							html+='<td align="center"><button class="btn btn-xs btn-info" onclick="getview('+v.CourseId+')"> View </button> </td>';
							html+='<td>';

							if(v.Status==1)
							{
								html+='<span class="label label-success">Active</span>';
							}
							else
							{
								html+='<span class="label label-danger">In Active</span>';
							}
							html+='</td>';
							html+='<td align="center">'
							html+='<button class="btn btn-xs btn-primary mar-b5 bt-r mar_b5" title="Edit" type="button" onclick="editfun('+v.CourseId+');" data-target="#testuser" data-toggle="modal">';
							html+='<i class="fa fa-pencil"></i></button>';
							html+='&nbsp <button class="btn btn-xs btn-danger mar-b5 bt-r mar_b5" title="Delete" type="button" onclick="deletefun('+v.CourseId+');" data-target="" data-toggle="modal">';
							html+='<i class="fa fa-trash-o"></i></button>';
							html+='</td>';
							html+='</tr>';
						});
					}
					else
					html+='<tr> <td> No Records Found..</td> </tr>';
					$('#showcourses').find('tbody').html(html);
					$('#pagination').html(data.pagination);
				}
			});
}
function editfun(blogid)
{
	window.location.href="EditCourses/"+blogid;
}
function deletefun(blogid)
{
	alertify.confirm("Do you really want to delete this Project ?", function (e) 
	{
		if (e) 
		{
			$.ajax({
					type: "POST",
					url: "DeleteCourses",
					data : "blogid="+blogid,
					success: function(data)
					{
						var data=$.parseJSON(data);
						alertify.alert("<strong style='color:red'>"+data.msg+"</strong>");
						get_courses(cpage);
					}
			});
		}
	});
}
function getview(id)
{
	$.ajax({
			type: "POST",
			url: base_url+"AdminCourses/get_courses_by_id",
			data :{'id':id},
			success: function(data)
			{
				var data = $.parseJSON(data);
				$('#Course_name').html(data.CourseName);
				if(data.SupportEmail=='' || data.SupportEmail=='null'){ data.SupportEmail='N/A';}
				$('#Course_email').html(data.SupportEmail);
				$('#Course_Description').html(data.CourseDescription);
				$('#recentenq').modal('show');
			}
		});
}