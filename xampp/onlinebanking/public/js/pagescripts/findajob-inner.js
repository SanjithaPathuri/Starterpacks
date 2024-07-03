$(function(){
	$('#ApplyJob').click(function(){
		var id = $('#ApplyJob').attr('JobId');
		$.ajax({
				url: base_url+"Findjobfront/applyjob",
				type: "POST",
				data:{'JobId':id,'Apply':'true'},
				beforeSend: function()
				{
					$('#ApplyJob').hide();
					$('#LoadingImg').show();
				},
				complete:function()
				{
					$('#LoadingImg').hide();
					$('#ApplyJob').show();
				},
				success:function(data)
				{
					data = $.parseJSON(data);
					if(data.Message!='')
					{
						alertify.alert(data.Message);
						window.location.href='';
					}
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