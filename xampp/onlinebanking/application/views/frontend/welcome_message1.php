
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
.button1 {
    background-color: #808ede; /* Green */
    border: none;
    color: white;
    padding: 12px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
	border-radius: 8px;
	width:330px;
}

</style>
<!-- Container (About Section) -->
<div id="about" class="container-fluid">
  <div class="row">
    <div class="col-sm-12" align="center">
     
    </div>
	<div class="row">
		<div class="col-sm-4"></div>
		<div class="col-sm-4">
		<div class="well">
		  <p class="main_title">Waste Management</p>
		<form class="login_form" onSubmit="return false;" id="login_form">
			<br>
			  <div class="form-group">
				<input type="text" class="form-control null " id="email" name="email" placeholder="Enter Email Id">
			  </div> 
			  <div class="form-group">
				<input type="password" class="form-control null " id="password" name="password" placeholder="Enter Password">
			  </div>
			  <button type="submit" class="button1">Login</button>
			  <br>
			  <br>
			  <p id="alerts_msg"></p>
		</form></div>
		</form></div>
		<div class="col-sm-4"></div>
	
	</div>
   
  </div>
</div>

<script>
var base_url = "<?php echo  base_url(); ?>";
$(function(){
	
	$('#login_form').submit(function(){
		var invalid = 0 ;
		$('.null').each(function(){
			
			var val  = $.trim($(this).val());
			if(val == '')
			{
				invalid = 1 ;
				$(this).css('border','1px solid red');
			}
			else
				$(this).css('border','');
			});
		
			if(invalid == 0)
			{
				var email = $.trim($('#email').val());
				var pwd = $.trim($('#password').val());
				$.ajax({
					url     : "",
					data     : {'Email' : email,'Password' : pwd},
					type     : "post",
					success     : function(data)
								{
									var data = $.parseJSON(data);
									if(data.err == 1)
									{
										$('#alerts_msg').html('<div class="alert alert-success">Successfully Login</div>');
										window.location.replace(base_url+'MyAccount');
									}
									else
									{
										$('#alerts_msg').html('<div class="alert alert-danger">Invalid Login</div>');
									}
									
								},
					error     : function(data)
								{
										$('#alerts_msg').html('<div class="alert alert-danger">NETWORK ERROR</div>');
								},
					})
			}
	})
	
	
	
	
})	

</script>

</body>
</html>
