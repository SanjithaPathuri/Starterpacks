$(function(){
	var cpage = 1;
	get_newsletterSubs(cpage);
	$('#pagination').find('li').click(function(){
		var page = $(this).attr('page');
		get_newsletterSubs(page);
	});
});

function get_newsletterSubs(page)
{
	var skey = $('#search').val();
	$.ajax({
		url: "",
		type:"POST",
		data: {'get':'1','skey':skey,'page':page},
		success: function(data)
		{
			data = $.parseJSON(data);
			var result = '';
			$.each(data.NLS,function(i){
				var row = data.NLS[i];
				result+="<tr><td>"+row.Name+"</td><td>"+row.EmailId+"</td><td>"+row.SubscribedOn+"</td><td align='center'><button data-toggle='modal' data-target='' OnClick='del("+row.NewsletterId+");' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' type='button' title='Delete' ><i class='fa fa-trash-o'></i></button></td></tr>";
			});
			$('#newslttr_subsTb').find('tbody').html(result);
			$('#pagination').html(data.pagination);
			$('#pagination').find('li').click(function(){
				get_newsletterSubs($(this).attr('page'));
			});
		}
	});
}

function multipleDel()
{
	var ids=[];
	$("[name=chk]:checked").each(function(){
		ids.push($(this).attr('did'))
	});
	if(ids.length>0)
	{
		alertify.confirm("Do you really want to delete all the selected Newsletter Subscribers ?", function (e) {
				if (e) 
				{
					$.ajax({
						url: "",
						type: "POST",
						data:{'dids':ids,'Delete':'true'},
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
							if(data == 1)
							{
								alertify.alert('Deleted Successfully.');
								get_newsletterSubs(cpage);
							}
						}
					});
				}
				else
					return false;
			});
	}
	else
	{
		alert("Please select atleast One (1) User to delete !!")
	}
}

function checkAll(ele) 
{
	var checkboxes = document.getElementsByTagName('input');
	if (ele.checked) 
	{
		for (var i = 0; i < checkboxes.length; i++) 
		{
			if (checkboxes[i].type == 'checkbox') 
			{
				checkboxes[i].checked = true;
			}
		}
	} 
	else 
	{
		for (var i = 0; i < checkboxes.length; i++)
		{
			if (checkboxes[i].type == 'checkbox') 
			{
				checkboxes[i].checked = false;
			}
		}
	}
}
function del(id)
{
	alertify.confirm("Do you really want to delete the Newsletter Subscriber ?", function (e) {
		if (e) 
		{
			var ids = [];
			ids.push(id);
			$.ajax({
				url: "",
				type: "POST",
				data:{'dids':ids,'Delete':'true'},
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
					if(data == 1)
					{
						alertify.alert('Deleted Successfully.');
						var cpage = 1;
						get_newsletterSubs(cpage);
					}
				}
			});
		}
	});
}