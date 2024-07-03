cpage = 1; 
$(function(){
	get_Feedbacks(cpage);
});

function get_Feedbacks(page)
{
	skey = $('#search').val();
	$.ajax({
		url: "",
		type:"POST",
		data: {'get':'true','skey':skey,'page':page},
		beforeSend: function(){
		},
		complete: function(){
		},
		success: function(data)
		{
			data = $.parseJSON(data);
			var html = '';
			$.each(data.Projects, function(i){
				var row = data.Projects[i];
				if(row.Status=='1')
					status = "<span class='label label-success'>Active</span>"
				else
					status = "<span class='label label-danger'>In-Active</span>";
				
				if(row.Status!='1')
					approval = "<button title='Approve' type='button' class='btn btn-xs btn-success mar-b5' onclick='Apprv("+row.ProjectId+");'><i class='fa fa-check' title='Active'></i></button>"
				else
					approval = "<button title='Approve' type='button' class='btn btn-xs btn-danger mar-b5' onclick='DenyAccess("+row.ProjectId+");'><i class='fa fa-times' title='Deny Access'></i></button>";
				
				html+="<tr><td>"+row.ProjectTitle+"</td><td>"+row.Name+"</td><td>"+row.Email+"</td><td>"+row.Location+"</td><td>"+row.Feedback+"</td><td>"+status+"</td><td>"+approval+"&nbsp;&nbsp;<button title='Delete' type='button' class='btn btn-xs btn-danger mar-b5' onclick='delfunc("+row.ProjectId+");'><i class='fa fa-trash-o'></i></button></td></tr>";
			});
			$('#Feedback_table').find('tbody').html(html);
			$('#pagination').html(data.pagination);
			$('.pagination').find('a').click(function(){
                var newpage = $(this).parent('li').attr('page')
                get_Feedbacks(newpage);
            })
		}
	});
}

function Apprv(id)
{	
	alertify.confirm("Do you really want to Approve this Feedback..?", function (e) 
	{
		if (e) 
		{
			$.ajax({
				url: "",
				type:"POST",
				data: {'appov':'true','id':id},
				beforeSend: function(){
				},
				complete: function(){
				},
				success: function(data)
				{
					if(data == 1)
					{
						alertify.alert("Approved..");
						get_Feedbacks(cpage);
					}
					else
						alertify.alert("Error : Please try later....!");
				}
			});
		}
	});	

}

function DenyAccess(id)
{	
	alertify.confirm("Do you really want to Deny this Feedback..?", function (e) 
	{
		if (e) 
		{
			$.ajax({
				url: "",
				type:"POST",
				data: {'deny':'true','id':id},
				beforeSend: function(){
				},
				complete: function(){
				},
				success: function(data)
				{
					if(data == 1)
					{
						alertify.alert("DenyAccess..");
						get_Feedbacks(cpage);
					}
					else
						alertify.alert("Error : Please try later....!");
				}
			});
		}
	});	
}

function delfunc(id)
{	
	alertify.confirm("Do you really want to Delete this Feedback..?", function (e) 
	{
		if (e) 
		{
			$.ajax({
				url: "",
				type:"POST",
				data: {'delete':'true','id':id},
				beforeSend: function(){
				},
				complete: function(){
				},
				success: function(data)
				{
					if(data == 1)
					{
						alertify.alert("Delete Successfully...!");
						get_Feedbacks(cpage);
					}
					else
						alertify.alert("Error : Please try later....!");
				}
			});
		}
	});	
}