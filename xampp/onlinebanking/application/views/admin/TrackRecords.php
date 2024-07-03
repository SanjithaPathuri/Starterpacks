
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
		<a  href="<?php echo base_url('admin/TrackRecords'); ?>"  class="btn btn-warning btn-block">TrackRecords</a><br>	
		
		<a  href="<?php echo base_url('admin/ManageTrainRoutes'); ?>"  class="btn btn-primary btn-block">Manage Train Routes</a><br>
		<a  href="<?php echo base_url('admin/ManageTrains'); ?>"  class="btn btn-primary btn-block">Manage Trains</a><br>	
		<a  href="<?php echo base_url('admin/ManageEmployees'); ?>"  class="btn btn-primary btn-block">Manage Employees</a><br>	
		
	</div>
	<div class="col-sm-9">
		
		<div style="padding-top:10px">
			<h3 style="text-align:center;color:#DAA520"><b>List of Railway Track Crack Details</b></h3><br><br>
			
			<table class="table table-bordered" >
				<tr>
						<th>S No</th>
						<th>Subject</th>
						<th>Location</th>
						<th>Status</th>
						<th>CreatedOn </th>
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
					html +=  'Crack is Detected On ('+row.DetectedOn+')';
					html += '</td>';
					html += '<td>';
					html +=  row.address;
					html += '</td>';
					html += '<td>';					
					if(parseInt(row.Status) == 0)
						html += "<button class='btn btn-xs btn-danger'>Crack Detected</button>";
					else if(parseInt(row.Status) == 1)
						html += "<button class='btn btn-xs btn-info'>Crack under process</button>";
					else  if(parseInt(row.Status) == 2)
						html += "<button class='btn btn-xs btn-success'>Crack Rectified</button>";
					html += '</td>';
					
					html += '<td>';
					
					if(parseInt(row.Status) == 0)
						html +=  row.DetectedOn;
					else if(parseInt(row.Status) == 1)
						html +=  row.processDate;
					else  if(parseInt(row.Status) == 2)
						html +=  row.RectifieldData;
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

</script>

</body>
</html>
