
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
		
		<a  href="<?php echo base_url('admin/ManageTrainRoutes'); ?>"  class="btn btn-primary btn-block">Manage Train Routes</a><br>
		<a  href="<?php echo base_url('admin/ManageTrains'); ?>"  class="btn btn-warning btn-block">Manage Trains</a><br>	
		<a  href="<?php echo base_url('admin/ManageEmployees'); ?>"  class="btn btn-primary btn-block">Manage Employees</a><br>	
	</div>
	<div class="col-sm-8">
		<button class="btn btn-info " id="create_btn">Create a new Train</button>
		<div style="padding-top:10px;display:none"  id="new_div">
			<div  class="well"  id="AddBdy" style="display:none">
				<b>Add or Edit Trains </b><br><br>
				<form id="UserAddForm" onsubmit="return false;" method="post" enctype='multipart/form-data'>	
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>Train Number</label>
								<input type="text" class="form-control null" name="TrainNum" id="TrainNum" placeholder="Enter First Name"/>
							</div>
							<div class="form-group">
								<label>Train Name</label>
								<input type="text" class="form-control null" name="TrainName" id="TrainName" placeholder="Enter Train Name"/>
							</div>
						</div>
						<div class="col-sm-6">
							  <label for="sel1">Select Route:</label>
							  <select class="form-control" id="selectroute" name="selectroute">
								<option value="0">select</option>
							  </select>	
							<input type="hidden" class="form-control "  id="RouteId" name="RouteId" >
							<input type="hidden" class="form-control "  id="TrainRoute" name="TrainRoute" >
						</div>
					</div>
					
					
					<input type="hidden" name="TrainId" id="TrainId" value="" />
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
					<th>Train Number</th>
					<th>Train Name</th>
					<th>Train Route</th>
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
<script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script>
<script>
$(function(){
	var routeId,trainroute;
	cpage = 1;
	get_records(cpage);
	$("body").on("click",'.pagination li',function(){
        cpage = $(this).attr('page');
		get_records(cpage);
    });
	
	
	$('#SubmitBtn').click(function(){
		vaidate_from();
		routeId = $("#selectroute").val();
		$('#RouteId').val(routeId);
		trainroute = $("#selectroute").text();
		$('#TrainRoute').val(trainroute);
		
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
		get_TrainRoutes()
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
					html +=  row.TrainNumber;
					html += '</td>';
					html += '<td>';
					html +=  row.TrainName;
					html += '</td>';
					html += '<td>';
					html +=  row.TrainRoute;
					html += '</td>';
					html += '<td>';
					html +=  row.CreatedOn;
					html += '</td>';
					html += '<td>';
					html +=  '<button class="btn btn-info btn-xs" onClick="edit('+row.TrainId+')" ><i class="fa fa-pencil" ></i>  Edit</button>&nbsp;&nbsp;<button class="btn btn-danger btn-xs" onClick="del('+row.TrainId+')" ><i class="fa fa-trash" ></i>  Delete</button>  ';
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
	get_TrainRoutes()
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
				$('#TrainNum').val(data.TrainNumber);
				$('#TrainName').val(data.TrainName);
				$('#TrainId').val(data.TrainId);
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
	$('#TrainId').val('');
	$('#AddBdy').hide();
	$('#create_btn').show();
}

function vaidate_from()
{
	var invalid = '';
	var invalid_pass = '';
	var TrainId = $.trim($('#TrainId').val());
	$('.null').each(function(){
		if($(this).val() == '')
		{
			invalid = '1';
			$(this).css('border','1px solid red');
		}	
		else
			$(this).css('border','');
	})
	
	if(invalid == '')
	{
		
		$('#UserAddForm').removeAttr('onsubmit');
		$('#UserAddForm').trigger('submit');
	}
}
function get_TrainRoutes()
{
	$.ajax({
		url:"",
		method : "POST",
		data:{'Role':'TrainRoutes'},
		success:function(data){
			data = $.parseJSON(data);
			
			if(data.res!='')
			{			
				$.each(data.res, function(i){	
					var row = data.res[i];
					$('#selectroute').append($('<option>',{
						value : row.RouteId,
						text : row.FromLoc+' ==> '+ row.ToLoc
					}));
				});
			}
			
		}
	});
	
}
</script>

</body>
</html>
