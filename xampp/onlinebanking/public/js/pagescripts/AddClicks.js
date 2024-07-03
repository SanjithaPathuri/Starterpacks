$(function(){
	$('.AddClick').click(function(){
		var AddId = $.trim($(this).attr('AddId'));
		var redirect = $.trim($(this).attr('redirect'));
		$.ajax({
			url: base_url+"ManageAdds/AddClicks",
			type:"POST",
			data: {'AddId':AddId,'ipaddress':ipaddress,'UserAgent':UserAgent},
			success: function(data)
			{}
		});
		var win = window.open(redirect, '_blank');
		win.focus();
	});
});