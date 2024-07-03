$(function(){
	$('.deleteBtn').click(function(){
		var GalleryId = $(this).attr('GalleryId');
		singledel(GalleryId);
	});
});

function singledel(GalleryId)
{
	GalleryId = $.trim(GalleryId);
	if(GalleryId!='')
	{
		alertify.confirm("Do you really want to delete this Project ?", function (e) 
		{
			if (e) 
			{
				$.ajax({
					url: "",
					type:"POST",
					data: {'Delete':'single','GalleryId':GalleryId},
					beforeSend: function(){
						$('.deleteBtn').hide();
					},
					complete: function(){
						$('.deleteBtn').show();
					},
					success: function(data)
					{
						alertify.alert("Image deleted successfully..");
						window.location.href="";
					}
				});
			}
		});
	}
}