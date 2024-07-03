<div class="content-wrapper">
	<section class="content-header">
		<h1>Manage Admin's</h1>
		<ol class="breadcrumb">
			<li><a href="<?php echo base_url('AdminDashboard'); ?>"><i class="fa fa-dashboard"></i> Home</a></li>
			<li class="active">Manage Admins</li>
		</ol>
	</section>
	<section class="content">
		<div class="box box-default">
			<div class="box-header with-border">
				<h3 class="box-title">Add New Admin</h3>
				<button class="btn btn-primary pull-right" id="AddBtn"><i class="fa fa-plus"></i> Add</button>
			</div>
			<div class="box-body" id="AddBdy" style="display:none">
				<form id="UserAddForm" onsubmit="return false;" method="post" enctype='multipart/form-data'>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>Full Name</label>
								<input type="text" class="form-control null" name="FullName" id="FullName" placeholder="Enter FullName"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>Email</label>
								<input type="text" class="form-control null" name="Email" id="Email" placeholder="Enter Email"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<label>Location</label>
								<textarea class="form-control null" name="Location" id="Location" placeholder="Enter Location" ></textarea>
							</div>
						</div>
					</div>
					<div class="row" id="pass_div">
						<div class="col-md-6">
							<div class="form-group">
								<label>Password</label>
								<input type="Password" class="form-control null_pass" name="Password" id="Password" placeholder="Enter Password"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>Confirm Password</label>
								<input type="Password" class="form-control null_pass" name="ConfirmPassword" id="ConfirmPassword" placeholder="Enter ConfirmPassword"/>
							</div>
						</div>
					</div>
					<input type="hidden" name="AdminId" id="AdminId" value="" />
					<input type="hidden" name="Role" id="Role" value="Add_Edit" />
				
					<div class="row">
						<div class="col-md-3">
							<div class="form-group"><br>
								<button class="btn btn-primary " id="SubmitBtn"><i class="fa fa-check"></i> Submit</button>
								<button class="btn btn-danger " id="CancelBtn"><i class="fa fa-times"></i> Cancel</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		
		<div class="box box-default">
			<div class="box-header with-border">
				<h3 class="box-title">Admin's List</h3>
				<div class="pull-right col-md-8">
					<div class="col-md-2 pull-right">
					  <button class="btn btn-primary" id="SearchBtn"><i class="fa fa-search"></i> Search</button>
					</div>
					<div class="col-md-7 pull-right">
						<input type="text" id="search" class="form-control" placeholder="Search by User Name">
					</div>
				</div>
			</div>
			<div class="box-body">
				<table id="CompaniesTable" class="table table-bordered table-hover table-container">
					<thead>
						<tr>
							<th>Full Name</th>
							<th>Email</th>
							<th>Location</th>
							<th>Registered On </th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
		<ul id="pagination" class="pagination"></ul>
	</section>
</div>
<script>
$(function(){
	cpage = 1;
	get_records(cpage);
	
	$("body").on("click",'.pagination li',function(){
        cpage = $(this).attr('page');
		get_records(cpage);
    });
	
	
	$('#SubmitBtn').click(function(){
		vaidate_from();
	});
	$('#CancelBtn').click(function(){
		reset();
	});
	$('#SearchBtn').click(function(){
		get_records(cpage);
	});
	$('#AddBtn').click(function(){
		$('#AddBdy').show();
		$('#AddBtn').hide();
		$('#pass_div').show();
	});
});

function get_records(page)
{
	var search = $.trim($('#search').val())
	$.ajax({
		url:"",
		method : "POST",
		data:{'Role':'records','skey':search,'page':page},
		success:function(data){
			data = $.parseJSON(data);
			var html='';
			if(data.records!='')
			{
				$.each(data.records, function(i){
					var row = data.records[i];
					html += '<tr>';
					html += '<td>';
					html +=  row.FullName;
					html += '</td>';
					html += '<td>';
					html +=  row.Email;
					html += '</td>';
					html += '<td>';
					html +=  row.Location;
					html += '</td>';
					html += '<td>';
					html +=  row.CreatedOn;
					html += '</td>';
					html += '<td>';
					html +=  '<button class="btn btn-primary btn-xs" onClick="edit('+row.AdminId+')" ><i class="fa fa-pencil" ></i>  Edit</button>&nbsp;&nbsp;<button class="btn btn-danger btn-xs" onClick="del('+row.AdminId+')" ><i class="fa fa-trash" ></i>  Delete</button>  ';
					html += '</td>';
					

					html += '</tr>';
				});
			}
			else
				html+="<tr><td>No Results Found..</td></tr>";
			$('#CompaniesTable').find('tbody').html(html);
			$('#pagination').html(data.pagination);
		}
	});
}

function edit(recordId)
{
	$('#pass_div').hide();
	reset();
	recordId = $.trim(recordId);
	if(recordId!='')
	{
		$.ajax({
			url:"",
			method : "POST",
			data:{'Role':'Edit','recordId':recordId},
			success:function(data){
				var data = $.parseJSON(data);
				$('#FullName').val(data.FullName);
				$('#Email').val(data.Email);
				$('#Location').val(data.Location);
				$('#AdminId').val(data.AdminId);
				$('#AddBdy').show();
			}
		});
	}
}

function del(recordId)
{
	recordId = $.trim(recordId);
	if(recordId!='')
	{
		if(confirm('Do you really want to delete this Record ?'))
		{
			$.ajax({
				url:"",
				method : "POST",
				data:{'Role':'Delete','recordId':recordId},
				success:function(data){
					get_records(cpage);
				}
			});
		}
	}
}

function reset()
{
	$('.null').each(function(){
		$(this).val('');
		$(this).css('border','');
	})
	$('.null_pass').each(function(){
		$(this).val('');
		$(this).css('border','');
	})
	
	$('#AdminId').val('');
	$('#AddBdy').hide();
	$('#AddBtn').show();
}

function vaidate_from()
{
	var invalid = '';
	var invalid_pass = '';
	var AdminId = $.trim($('#AdminId').val());
	$('.null').each(function(){
		if($(this).val() == '')
		{
			invalid = '1';
			$(this).css('border','1px solid red');
		}	
		else
			$(this).css('border','');
	})
	if(AdminId == '')
	{
		
		$('.null_pass').each(function(){
			if($(this).val() == '')
			{
				invalid = '1';
				invalid_pass = '1';
				$(this).css('border','1px solid red');
			}	
			else
				$(this).css('border','');
		})
			var Password = $.trim($('#Password').val());
			var ConfirmPassword = $.trim($('#ConfirmPassword').val());
			if(ConfirmPassword != Password)
			{
			alert('Password and Confirm password are not match');
			}
	}
	
	if(invalid == '')
	{
		$('#UserAddForm').removeAttr('onsubmit');
		$('#UserAddForm').trigger('submit');
	}
}
</script>