
<style>
.main_title
{
	font-size: 28px;
	font-weight: 600;
	text-align: center;
}
.padding_login
{
	padding-top: 48px;
}
.login_form
{
	
}
.login_title
{
	
}
.verticalLine {
	border-left: thick solid #020202;
	font-size: 20px;
	font-weight: 700;
	padding: 5px;

}
</style>
<!-- Container (About Section) -->
<br><br><br><br><br><br>
<div id="about" class="container-fluid">
  <div class="row">
	<div class="col-sm-2">
		<button class="btn btn-default btn-block">All Menus</button><br>
		<a  href="<?php echo base_url('admin/Locations'); ?>"  class="btn btn-primary btn-block"> Dashboard </a><br>
		<a  href="<?php echo base_url('admin/AdminDashboard'); ?>" class="btn btn-primary btn-block"> Charts </a><br>
		<a  href="<?php echo base_url('admin/Notifications'); ?>"  class="btn btn-primary btn-block">Notifications</a><br>	
		<a  href="<?php echo base_url('admin/TrackRecords'); ?>"  class="btn btn-primary btn-block">TrackRecords</a><br>
		
		<a  href="<?php echo base_url('admin/ManageTrainRoutes'); ?>"  class="btn btn-warning btn-block">Manage Train Routes</a><br>
		<a  href="<?php echo base_url('admin/ManageTrains'); ?>"  class="btn btn-primary btn-block">Manage Trains</a><br>	
		<a  href="<?php echo base_url('admin/ManageEmployees'); ?>"  class="btn btn-primary btn-block">Manage Employees</a><br>	
	</div>
	<div class="col-sm-8">
		<button class="btn btn-info " id="create_btn">Create a new Route</button>
		<div style="padding-top:10px;display:none"  id="new_div">
			<div  class="well"  id="AddBdy" style="display:none">
				<b>Add or Edit Train Route</b><br>
				<form id="UserAddForm" onsubmit="return false;" method="post" enctype='multipart/form-data'>
				
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>From</label>
								<input type="text" class="form-control null" name="From" id="From" placeholder="Enter First Name"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>To</label>
								<input type="text" class="form-control null" name="To" id="To" placeholder="Enter Last Name"/>
							</div>
						</div>
					</div>
					
					
					<input type="hidden" name="RouteId" id="RouteId" value="" />
					<input type="hidden" name="Role" id="Role" value="Add_Edit" />
					
					<div class="row">
						<div class="col-md-6">
							<div class="form-group"><br>
								<button class="btn btn-primary " id="SubmitBtn"><i class="fa fa-check"></i> Submit</button>
								<button class="btn btn-danger " id="CancelBtn"><i class="fa fa-times"></i> Cancel</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div style="padding-top:10px">
			<h4 style="text-align:center;color:#f0ad4e"><b>List of Train Routes</b></h4><br>
		
		<table class="table table-bordered" >
			<tr>
					<th>S No</th>
					<th>From</th>
					<th>To</th>
					<th>Created On </th>

			</tr>
			<tbody id="show_data">
					
			</tbody>
		</table>
		<div align="right">
			<ul class="pagination" id="pagination"></ul>
		</div>
		</div>
	</div>
  </div>
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
	$('#create_btn').click(function(){
		$('#create_btn').show();
		$('#create_btn').hide();
		$('#AddBdy').show();
		$('#new_div').show();

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
			var n =0;
			if(data.records!='')
			{			
				$.each(data.records, function(i){
					n = n+1;
					var row = data.records[i];
					html += '<tr>';
					html += '<td>';
					html +=  n;
					html += '</td>';
					html += '<td>';
					html +=  row.FromLoc;
					html += '</td>';
					html += '<td>';
					html +=  row.ToLoc;
					html += '</td>';
					html += '<td>';
					html +=  row.CreatedOn;
					html += '</td>';
					html += '<td>';
					html +=  '<button class="btn btn-info btn-xs" onClick="edit('+row.RouteId+')" ><i class="fa fa-pencil" ></i>  Edit</button>&nbsp;&nbsp;<button class="btn btn-danger btn-xs" onClick="del('+row.RouteId+')" ><i class="fa fa-trash" ></i>  Delete</button>  ';
					html += '</td>';
					html += '</tr>';
				});
			}
			else
				html+="<tr><td>No Results Found..</td></tr>";
			$('#show_data').html(html);
		//	alert(html);
			$('#pagination').html(data.pagination);
		}
	});
}

function edit(recordId)
{
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
				$('#From').val(data.From);
				$('#To').val(data.To);
				$('#RouteId').val(data.RouteId);
				$('#AddBdy').show();
				$('#new_div').show();
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
	
	$('#RouteId').val('');
	$('#AddBdy').hide();
	$('#create_btn').show();
}

function vaidate_from()
{
	var invalid = '';
	var invalid_pass = '';
	var RouteId = $.trim($('#RouteId').val());
	$('.null').each(function(){
		if($(this).val() == '')
		{
			invalid = '1';
			$(this).css('border','1px solid red');
		}	
		else
			$(this).css('border','');
	})
	if(RouteId == '')
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
	}
	
	if(invalid == '')
	{
		
		$('#UserAddForm').removeAttr('onsubmit');
		$('#UserAddForm').trigger('submit');
	}
}
</script>

</body>
</html>
