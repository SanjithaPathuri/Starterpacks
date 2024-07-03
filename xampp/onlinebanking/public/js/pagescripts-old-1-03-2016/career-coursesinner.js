$(function(){
	$('#CourseBuyBtn').click(function(){
		var id = $('#CourseBuyBtn').attr('courseid');
		$.ajax({
				url: base_url+"Courses/ApplyCourse",
				type: "POST",
				data:{'CourseId':id,'Apply':'true'},
				beforeSend: function()
				{
					$('#CourseBuyBtn').hide();
					$('#LoadingImg').show();
				},
				complete:function()
				{
					$('#LoadingImg').hide();
					$('#CourseBuyBtn').show();
				},
				success:function(data)
				{
					data = $.parseJSON(data);
					if(data.Message!='')
						alertify.alert(data.Message);
					else if(data.Message =='')
						window.location.href= base_url+data.Link;
					else if(data.Link!="Reload")
						setTimeout(function(){window.location.href= base_url+data.Link;},3000);
					else if(data.Link=="Reload")
						setTimeout(function(){window.location.href= '';},3000);
					else if(data.Link == '')
						return false;
				}
		});
	});
});