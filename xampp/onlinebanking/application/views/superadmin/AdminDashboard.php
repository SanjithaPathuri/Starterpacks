
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
<div id="about" class="container-fluid">
  <div class="row">
	<div class="col-sm-2">
		<button class="btn btn-default btn-block">All Menus</button><br>
		<a  href="<?php echo base_url('superadmin/AdminDashboard'); ?>" class="btn btn-primary btn-block">Manage Admins</a><br>
		<!--<a  href="<?php echo base_url('superadmin/Questions'); ?>"  class="btn btn-primary btn-block">Questions</a><br>	 -->
	</div>
	<div class="col-sm-8">
		<button class="btn btn-info " id="create_btn">Create a new Admin</button>
		<div style="padding-top:10px;display:none"  id="new_div">
			<div class="well">
				<b>Add or Edit Admin</b>
				<form onSubmit="return false;" id="formid" method="post">
					<div class="row">
						<div class="col-sm-4">
							<input type="text" class="form-control null" placeholder="Enter a Admin name" id="AdminName" name="AdminName" ><br>
							<input type="text" class="form-control null" placeholder="Enter a Admin Email" id="AdminEmail" name="AdminEmail" ><br>
							<input type="Password" class="form-control null" placeholder="Enter a Admin Password" id="AdminPassword" name="AdminPassword" ><br>															
							<input type="text" class="form-control null" placeholder="Enter a Admin Location" id="Location" name="Location" >													
							<input type="hidden" class="form-control " placeholder="Enter a category name" id="AdminId" name="AdminId" >
							<input type="hidden" class="form-control " placeholder="Enter a category name" id="Role" name="Role" value="Add_Edit" >					
						</div>
						<div class="col-sm-4">
							<button class="btn btn-success" id="SubmitBtn">Submit</button>						
						</div>
						<div class="col-sm-4">
											
						</div>
									
					</div>
				</form>	
			</div>
		</div>
		<div style="padding-top:10px">
		<b>List of all Admins</b><br><br>
		
		<table class="table table-bordered" >
			<tr>
				<th>Sno.</th>
				<th>Admin Name</th>
				<th>Email</th>
				<th>CreatedOn</th>
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
var cpage = 1;
$(function(){
	
	get_records(cpage);
	$('#create_btn').click(function(){
		reset();
		$('#new_div').show();
		$('#AdminPassword').show();
	})
	
	$('#SubmitBtn').click(function(){
		vaidate_from();
	});
	
	
	$("body").on("click",'.pagination li',function(){
        cpage = $(this).attr('page');
		get_records(cpage);
    });
	
})	

function get_records(page)
{
	var search ='';
	$.ajax({
		url:"",
		method : "POST",
		data:{'Role':'records','skey':search,'page':page},
		success:function(data){
			data = $.parseJSON(data);
			var html='';
			if(data.records!='')
			{
				var n=0;
				
				$.each(data.records, function(i){
					n=n+1;
					var row = data.records[i];
					html += '<tr>';
					html += '<td>';
					html +=  n;
					html += '</td>';
					html += '<td>';
					html +=  row.Name;
					html += '</td>';
					html += '<td>';
					html +=  row.Email;
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
			$('#show_data').html(html);
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
				$('#AdminId').val(data.AdminId);
				$('#AdminName').val(data.Name);
				$('#AdminEmail').val(data.Email);
				$('#Location').val(data.Location);
				$('#new_div').show();
				$('#AdminPassword').hide();
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
	$('#CategoryId').val('');
}

function vaidate_from()
{
	var invalid = '';
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
			$('#formid').removeAttr('onsubmit');
			$('#formid').trigger('submit');
		}
	
	
	
}
</script>

</body>
</html>

<!--------------------------------------GOOGLE MAPG API ---------------------------------------------------------->
<script>
      function initAutocomplete() {
       
        // Create the search box and link it to the UI element.
        var input = document.getElementById('Location');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      }

    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBM28JQxcwipPzJS2UfYw4gmiE3ctVFPn4&libraries=places&callback=initAutocomplete"
         async defer></script>
</script>
