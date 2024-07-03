$(function(){
	$('#EventJoin').click(function(){
		var id = $('#EventJoin').attr('EventId');
		$.ajax({
				url: base_url+"events/JoinEvent",
				type: "POST",
				data:{'EventId':id},
				beforeSend: function()
				{
					$('#EventJoin').hide();
					$('#LoadingImg').show();
				},
				complete:function()
				{
					$('#LoadingImg').hide();
					$('#EventJoin').show();
				},
				success:function(data)
				{
					data = $.parseJSON(data);
					if(data.Msg!='')
						alertify.alert(data.Msg);
					if(data.Link == 'Reload')
						setTimeout(function(){window.location.href = '';},3000);
					else if(data.Link!='')
						setTimeout(function(){window.location.href = base_url+data.Link;},3000);
				}
		});
	});
});

function insertCalender(eid)
{
	if($("#idss").val()=='')
		$("#myloginpop").modal("show");
	else
	{
		var uid=$("#idss").val();
		$("#loading").show();	
		$.ajax({
			url: base_url+"Events/insertCalender",
			data : {eid:eid, uid:uid},
			type:"POST",
			success: function(result)
			{
				var datass= $.parseJSON(result);
				if(datass.error==1)
				alertify.alert('<p>'+datass.msg+'</p>');
				else
				alertify.alert('<p style="color:red">'+datass.msg+'</p>');
				$("#loading").hide();		 
			}
		});
	}
}