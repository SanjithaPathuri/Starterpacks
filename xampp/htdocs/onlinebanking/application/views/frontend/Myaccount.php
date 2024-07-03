<style>
.amount{
	font-size: 18px;
	font-weight: 500;
	color: #0d1214;
}

</style>
<br>
<br>

<div class="section clearfix object-non-visible" data-animation-effect="fadeIn">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h1 id="about" class="title text-center">My Account </h1>
						<div class="space"></div>
						<div class="row">
							<div class="col-sm-4">
								<p>Account No: <?php echo $users_data['AccountNo']; ?></p>
								<p>Account Holder Name: <?php echo $users_data['Name']; ?></p>
								<p>Mobile: <?php echo $users_data['Mobile']; ?></p>
							</div>
							<div class="col-sm-4"></div>
							<div class="col-sm-4 text-center">
								<a class="btn btn-warning btn-lg btn-block" id="applied_loan" >Make request for a loan </a>
								<small>Click the above button to request for a loan </small>
							</div>
						</div>					
					</div>
					<div class="col-md-12">
						<div class="space"></div>
						<b id="about" class="title text-center">Applied Loan records</b>
						<div class="space"></div>
						<div class="row">
							<table class="table table-striped">
								<thead>
								  <tr>
									<th>Sno</th>
									<th>Application Id</th>
									<th>Application status</th>
									<th>Loan Status</th>
									<th>Record Status</th>
									<th>Created On</th>
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
		</div>

<script>
var cpage  = 1;
$(function(){
	get_loan_data(cpage);
	$('#applied_loan').click(function(){
		$('#applied_loan').attr('class','btn btn-info btn-lg btn-block');
		$('#applied_loan').html('Processing ..');
		$.ajax({
			url : "",
			data : {'Role':'applied_loan'},
			type : "POST",
			success : function(data){
				var data = $.parseJSON(data);
				if(data.err == 1){
					$('#applied_loan').attr('class','btn btn-success btn-lg btn-block');
					$('#applied_loan').html('Successfully applied'); 
					get_loan_data(1);
				}else{
					$('#applied_loan').attr('class','btn btn-danger btn-lg btn-block');
					$('#applied_loan').html('Oops some thing s error'); 
				}	
			}
		})
		
	})
})

function get_loan_data(page){
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
					if(row.AppliedStatus == 1) row.AppliedStatus = 'Success';else row.AppliedStatus = 'Failed'; 
					if(row.ApproveStatus == 1) row.ApproveStatus = 'Approved';
					else if(row.ApproveStatus == 2) row.ApproveStatus = 'Rejected'; 
					else if(row.ApproveStatus == 3) { row.ApproveStatus = 'Closed'; }
					else row.ApproveStatus = 'Processing'; 
					if(row.Status == 1) row.Status = 'Active';else row.Status = 'In Active'; 					
					html += '<tr>';
					html += '<td>';
					html +=  n;
					html += '</td>';
					html += '<td>';
					html +=  row.ApplicationId;
					html += '</td>';
					html += '<td>';
					html +=  row.AppliedStatus;
					html += '</td>';
					html += '<td>';
					html +=  row.ApproveStatus;
					html += '</td>';
					html += '<td>';
					html +=  row.Status;
					html += '</td>';
					html += '<td>';
					html +=  row.FormatedDate;
					html += '</td>';
					html += '</tr>';
				});
			}
			else
				html+="<tr colspan='5'><td>No Results Found..</td></tr>";
			$('#show_data').html(html);
		//	alert(html);
			$('#pagination').html(data.pagination);
		}
	});
	
	
}




</script>