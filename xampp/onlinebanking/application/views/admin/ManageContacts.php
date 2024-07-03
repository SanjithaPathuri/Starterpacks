
	<div class="col-sm-10" style="padding-top: 90px;">
		<h3 >Contacts</h3>
	
		
		<p >Contacts List</p>           
		<table class="table table-striped">
			<thead>
			  <tr>
				<th>Sno.</th>
				<th>Name</th>
				<th>Email</th>
				<th>Message</th>
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
		var MemberId = $.trim($('#UserId').val());
		$('.null').each(function(){
			if($(this).val() == '')
			{
				invalid = '1';
				$(this).css('border','1px solid red');
			}	
			else
				$(this).css('border','');
		})
		if(MemberId == '')
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
				if(MemberId == '')
				{
					var Password = $.trim($('#Password').val());
					var ConfirmPassword = $.trim($('#ConfirmPassword').val());
					if(ConfirmPassword != Password)
					{
						$('#alerts_pa').html('Password and Confirm password are not match');
					}
					else{
						$('#alerts_pa').html('');
					}
				}
				
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
				$('#UserId').val(data.UserId);
				$('#Name').val(data.Name);
				$('#Email').val(data.Email);
				$('#Mobile').val(data.Mobile);
				$('#CardNo').val(data.CardNo);
				$('#Address').val(data.Address);
				$('#Status').val(data.Status);
				$('#Vehicle_Type').val(data.Vehicle_Type);
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
	
	$('#EmployeeId').val('');
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
					html +=   row.Name;
					html += '</td>';
					html += '<td>';
					html +=   row.Email;
					html += '</td>';
					html += '<td>';
					html +=   row.Message;
					html += '</td>';
					html += '<td>';
					html +=   row.createdon;
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
