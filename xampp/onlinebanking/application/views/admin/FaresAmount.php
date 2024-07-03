
	<div class="col-sm-10" style="padding-top: 90px;">
		<h3 >Fare Amounts</h3>
		<form class="well" onsubmit="return false;" id="form_submit" name="form_submit" method="POST">
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label>Vehicle Type</label>
						<select class="form-control null" id="Vehicle_Type" name="Vehicle_Type">
							<option value="">Select Vehicle Type</option>
							<option value="2 - Wheeler">2 - Wheeler</option>
							<option value="4 - Wheeler">4 - Wheeler</option>
							<option value="8 - Wheeler">8 - Wheeler</option>
							<option value="16 - Wheeler">16 - Wheeler</option>
						</select>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label>Fare Amount</label>
						<input type="text" class="form-control null" placeholder="Fare Amount" id="FareAmount" name="FareAmount">
					</div>
				</div>
				<div class="col-sm-12">
					<div class="form-group">
						<label>Toll Type</label>
						<select class="form-control null" id="Toll_Type" name="Toll_Type">
							<option value="">Select Toll Type</option>
							<option value="Up - Fare">Up - Fare</option>
							<option value="Up & Down - Fare">Up & Down - Fare</option>
						</select>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label>Toll gates</label>
						<select class="form-control null" id="TollgateName" name="TollgateName">
							<option value="">Select Tollgates</option>
							<?php foreach($toolgates as $toolgate){ ?>
								<option value="<?php echo $toolgate['tollgateId']; ?>"><?php echo $toolgate['tollname']; ?></option>
							<?php } ?>
						</select>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label>Status</label>
						<select class="form-control null" id="Status" name="Status">
							<option value="">Select Status</option>
							<option value="1">Active</option>
							<option value="0">In Active</option>
						</select>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label id="alerts_pa"></label>
					</div>
				</div>
				<div class="col-sm-12">
					<div class="form-group">
						<button class="btn btn-default" type="submit"><i class="fa fa-check"></i> Submit</button>
					</div>
				</div>
				<div class="col-sm-12">
					<div class="form-group"> 
						<input type="hidden" class="form-control " placeholder="FareId" id="FareId" name="FareId"> 
						<input type="hidden" class="form-control " placeholder="Role" id="Role" name="Role" value="Add_Edit"> 
					</div>
				</div>
			</div>
		</form>
		
		<h3 >Fare Amounts</h3>  
		<table class="table table-striped">
			<thead>
			  <tr>
				<th>Sno.</th>
				<th>Vehicle Type</th>
				<th>Fare Amount</th>
				<th>Toll Type</th>
				<th>Status</th>
				<th>Created On</th>
				<th>Actions</th>
			  </tr>
			</thead>
			<tbody id="show_data">
			</tbody>  
		</table>
		<div align="right">
			<ul class="pagination" id="pagination"></ul>
		</div>
	</div>
  </div>
</div>

</body>
</html>
<script>
var cpage = 1;
var base_url = "<?php echo  base_url(); ?>";
$(function() {
	
	get_records(cpage);
	$("body").on("click",'.pagination li',function(){
        cpage = $(this).attr('page');
		get_records(cpage);
    });
	
	
	$('#form_submit').submit(function(){
		var invalid = '';
		var invalid_pass = '';
		var FareId = $.trim($('#FareId').val());
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
			$('#form_submit').removeAttr('onsubmit');
			$('#form_submit').trigger('submit');
		}
	});		
});
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
				$('#FareId').val(data.FareId);
				$('#Vehicle_Type').val(data.Vehicle_Type);
				$('#FareAmount').val(data.FareAmount);
				$('#Toll_Type').val(data.Toll_Type);
				$('#TollgateName').val(data.TollgateName);
				$('#Status').val(data.Status);
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
					get_records(1);
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
	
	$('#FareId').val('');
	$('#AddBdy').hide();
	$('#create_btn').show();
}
function get_records(page)
{
	var search = '';
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
					html +=   row.Vehicle_Type;
					html += '</td>';
					html += '<td>';
					html +=   'Rs.'+row.FareAmount+' /-';
					html += '</td>';
					html += '<td>';
					html +=   row.Toll_Type;
					html += '</td>';
					html += '<td>';					
					if(parseInt(row.Status) == 0)
						html += "In active";
					else if(parseInt(row.Status) == 1)
						html += "Active";
					html += '</td>';
					html += '<td>';
					html +=   row.CreatedOn;
					html += '</td>';
					html += '<td>';
					html +=  '<button class="btn btn-info btn-xs" onClick="edit('+row.FareId+')" ><i class="fa fa-pencil" ></i>  Edit</button>&nbsp;&nbsp;<button class="btn btn-danger btn-xs" onClick="del('+row.FareId+')" ><i class="fa fa-trash" ></i>  Delete</button>  ';
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

function vaidate_from()
{
	
}
</script>
