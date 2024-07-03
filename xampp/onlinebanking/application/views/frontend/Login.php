<style>
.banner-image1{
    background-color: #005aff38;
}
.well{
	background-color: #f5f5f538;
    border: 1px solid #0d121438;
    box-shadow: 1px 1px 3px #ccc;
}
.well_p{
	color: #ooo;
	font-size: 16px;
	text-align: center;
}

.background_color{
	
}
</style>	

<br>
<br>

<div class="section clearfix object-non-visible banner-image1" data-animation-effect="fadeIn">
		<div class="background_color">
			<div class="container ">
				<div class="row">
					<div class="col-md-12">
						
						<div class="space"></div>
						<div class="row">
							
							<div class="col-sm-3"></div>
							<div class="col-sm-6">
								<div class="well">
								<h1 id="about" class="title text-center">Farmers Login </h1>
								<p class="well_p">Please login here you navigate to your account. </p>
								<form class="login_form" onSubmit="return false;" id="login_form">
									<br>
									  <div class="form-group">
										<input type="text" class="form-control null " id="AdhaarNo" name="AdhaarNo" placeholder="Enter AdhaarNo">
									  </div> 
									  <div class="form-group">
										<input type="password" class="form-control null " id="password" name="password" placeholder="Enter Password">
									  </div>
									  <button type="submit" class="btn btn-info btn-block" >Login</button>
									  <a href="<?php echo base_url().'Welcome/user_register' ?>" >Create a new account</a>
									  <br>
									  <br>
									  <p id="alerts_msg"></p>
								</form>
								</div>
							</div>
							<div class="col-sm-3"></div>
						
						</div>
						<div class="space"></div>
						
					</div>
				</div>
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
				var AdhaarNo = $.trim($('#AdhaarNo').val());
				var pwd = $.trim($('#password').val());
				$.ajax({
					url     : "",
					data     : {'AdhaarNo' : AdhaarNo,'Password' : pwd},
					type     : "post",
					success     : function(data)
								{
									var data = $.parseJSON(data);
									if(data.err == 1)
									{
										$('#alerts_msg').html('<div class="alert alert-success">Successfully Login</div>');
										window.location.replace(base_url+'Welcome/users_account');
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