

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Railway Track Crack Detection| Admin</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>


<style>
.admin_login
{
	padding-top : 100px;
}
.new_well
{
	background-color: #ffffff2e;
    color: white;
    border-radius: 0px;
    box-shadow: -10px 10px 39px #0b0c0c82;
    border-color: #a3a9d8;
}
.body
{
	background-color: #4f5373;
}
</style>




<body class="body"> 

<div class="container">
 <div class="row">
	<div class="col-sm-3"></div>
	<div class="col-sm-6 admin_login">
		<div class="well new_well">
			<h2 class="text-center">Admin Login </h2>
			<p class="text-center">Please login here to get access control for Users and Doctors members.</p>
			<p class="text-center">After login you will navigate to Super admin dashboard</p>
			 <form onsubmit="return false; " id="login_form" name="login_form">
			  <div class="form-group">
				<label for="email">UserId:</label>
				<input type="text" class="form-control null" id="UserId"  name="UserId" placeholder="Enter UserId">
			  </div>
			  <div class="form-group">
				<label for="pwd">Password:</label>
				<input type="password" class="form-control null" id="Password" name="Password" placeholder="Enter Password">
			  </div>
			  <p id="alert_msg"></p>
			  <button type="submit" class="btn btn-default">Submit</button>
			</form>
		</div>
	</div>
	<div class="col-sm-3"></div>
	
 </div>
 
 
</div>

</body>
</html>
<script>
var base_url = "<?php echo base_url(); ?>" ;
$(function(){
	
	$('#login_form').submit(function(){
		
		var invalid = '';
		$('.null').each(function(){
			if($.trim($(this).val()) == '')
			{
				invalid = '1';
				$(this).css('border','1px solid red');
			}
			else
				$(this).css('border','');			
		})
		if(invalid == '')
		{
			$.ajax({
				url            : "",
				data           : new FormData(this),
				type           : "POST",
				processData    : false,
				contentType    : false,
				success        : function(data)
				{
					var data = $.parseJSON(data);
					if(data.err == 1)
					{
						$('#alert_msg').html('<div class="alert alert-success" >'+data.msg+'</div> ');
						window.location.replace(base_url+'admin/AdminDashboard');
					}
					else
					{
						$('#alert_msg').html('<div class="alert alert-danger" >'+data.msg+'</div> ');
					}
				}
			})
		}
	})
})















</script>
