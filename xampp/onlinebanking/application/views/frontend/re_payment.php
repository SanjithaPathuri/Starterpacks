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
				<h1 id="about" class="title text-center">Re-payment </h1>
				<div class="space"></div>
				<div class="row">
					<div class="col-sm-4">
						<p>Email: <?php echo $bank_data['Email'];  ?></p>
					</div>
					<div class="col-sm-4"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">				
				<b id="about" class="title text-center">See all loan applications and status</b>
				<div class="space"></div>
				<form onsubmit="return false;" id="search_form">
					<div class="row">
						<div class="col-sm-4">
							<input type="text" class="form-control" placeholder="Search by Adhaar No. and Account No" id="search"><br>	
						</div>					
						<div class="col-sm-4">
							<button class="btn btn-success">Search</button>
						</div>
						
						<div class="col-sm-4">
							<a href="<?php echo base_url().'Welcome/bank_account'; ?>" class="btn btn-warning btn-block"><i class="fa fa-arrow-left"></i> Go Back</a>
							<p>Click the above button to navigate to bank admin account</p>
						</div>
						
							
					</div>
				</form>
				<div class="row">
					<table class="table table-striped">
						<thead>
						  <tr>
							<th>Sno</th>
							<th>Farmer Name</th>
							<th>Adhaar No.</th>
							<th>Application Id</th>
							<th>Loan Status</th>
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
				<div class="row" id="farm_status">
					
				</div>

				
			</div>
		</div>
		
		
		
		
</div>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Analytics Status</h4>
      </div>
      <div class="modal-body">
        <p>By previous loans and status of the farmers farm the server algorithms was suggest that, this application can be <br> <br> <span id="id_status"></span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>



<script>
var cpage  = 1;
$(function(){
	//get_loan_data(cpage);
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
	
	$('#search_form').submit(function(){
		$('#farm_status').html('');
		get_loan_data(1);
		get_suggestion();
	})
	
	
})
function get_loan_data(page){
	var search = $('#search').val();
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
					
					if(row.ApproveStatus == 1) {row.ApproveStatus = 'Approved';}
					else if(row.ApproveStatus == 2) { row.ApproveStatus = 'Rejected'; }
					else if(row.ApproveStatus == 3) { row.ApproveStatus = 'Closed'; }else {row.ApproveStatus = 'Proccessing'; }
					
					
					if(row.Status == 1) row.Status = 'Active';else row.Status = 'In Active'; 					
					html += '<tr>';
					html += '<td>';
					html +=  n;
					html += '</td>';
					html += '<td>';
					html +=  row.Name;
					html += '</td>';
					html += '<td>';
					html +=  row.AdhaarNo;
					html += '</td>';
					html += '<td>';
					html +=  row.ApplicationId;
					html += '</td>';
					html += '<td>';
					html +=  row.ApproveStatus;
					html += '</td>';
					
					html += '<td>';
					html +=  row.FormatedDate;
					html += '</td>';
					html += '<td>';
					html +=  '<button class="btn btn-warning btn-sm" onclick="close_app('+row.ID+')" >Close Application</button>';
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

function approve(ID){
	$.ajax({
		url : "",
		data : {'Role':'approve','ID':ID},
		type : "POST",
		success : function(data){
			var data = $.parseJSON(data);
			if(data.err == 1){
				get_loan_data(1);
			}
			else{
				get_loan_data(1);
			}
		}		
	})
}

function close_app(ID){
	$.ajax({
		url : "",
		data : {'Role':'close','ID':ID},
		type : "POST",
		success : function(data){
			var data = $.parseJSON(data);
			if(data.err == 1){
				get_loan_data(1);
			}
			else{
				get_loan_data(1);
			}
		}		
	})
}



function reject(ID){
	$.ajax({
		url : "",
		data : {'Role':'reject','ID':ID},
		type : "POST",
		success : function(data){
			var data = $.parseJSON(data);
			if(data.err == 1){
				get_loan_data(1);
			}
			else{
				get_loan_data(1);
			}
		}		
	})
}

function Suggestion(ID){
	$.ajax({
		url : "",
		data : {'Role':'Suggestion','ID':ID},
		type : "POST",
		success : function(data){
			var data = $.parseJSON(data);
			if(data.err == 1){
				$('#id_status').html('<button class="btn btn-success">Approved</button>');
				$('#myModal').modal('show');
			}
			else if(data.err == 2){
				$('#id_status').html('<button class="btn btn-danger">Rejected</button>');
				$('#myModal').modal('show');
			}
			else{
				$('#id_status').html('<button class="btn btn-warning">Installment Payment</button>');
				$('#myModal').modal('show');
			}
		}		
	})
}


function get_suggestion(){
	var search = $('#search').val();
	$.ajax({
		url : "",
		data : {"Role":"get_suggestion","search":search},
		type  : "POST",
		success : function(data){
			var data = $.parseJSON(data);			
			var html = '<h3>Farm Condition</h3><div class="alert alert-info"><b>'+data.status+'</b></div>';
			$('#farm_status').html(html);
		}
	})
}

</script>