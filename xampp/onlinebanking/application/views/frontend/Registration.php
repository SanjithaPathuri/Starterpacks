<style>
.small_div
{
	border: 1px solid #dad8de;
	float: left;
	margin-bottom: 10px;
	border-radius: 3px;
	padding-top: 10px;
	background-color: #dad8de;
	color: #ffffff;
}
.tab_active
{
	border: 1px solid #dad8de;
	float: left;
	margin-bottom: 10px;
	border-radius: 3px;
	padding-top: 10px;
	background-color: #9795bb;
	color: #ffffff;
}
.body_menu
{
	padding-top: 40px;
}
.Registration
{
	background-color: #ceceda;
}
.reg_div
{
	padding-top : 20px;
	border-radius: 5px;
}
.Registration_lable
{
	color:#ffffff;
	font-size: 30px;
}
.row_div
{
	padding-top : 20px
}
</style>


<div class="container-fluid">
	<div class="row">
			<div class="row">
				<div class="col-sm-3"></div>
				<div class="col-sm-6 reg_div">
					<div class="well well-md Registration">
						<p class="text-center Registration_lable" >REGISTRATION</p>
						<div id="alert_msg" ></div>
						<div class="row">
							<div class="col-sm-12">
							<form onsubmit="return false;" id="registration_form" name="registration_form" >	
								<div class="row">
									<div class="col-sm-6">
										<input type="text" class="form-control null" id="firstname" name="firstname" placeholder="First Name *">
									</div>
									<div class="col-sm-6">
										<input type="text" class="form-control null"   id="lastname" name="lastname" placeholder="Last Name *">
									</div>
								</div>
								<div class="row row_div">
									<div class="col-sm-6">
										<input type="text" class="form-control null" id="Mobile" name="Mobile" placeholder="Mobile No. *">
									</div>
									<div class="col-sm-6">
										<input type="text" class="form-control null"   id="Location" name="Location" placeholder="Location *">
									</div>
								</div>
								<div class="row row_div">
									<div class="col-sm-12">
										<input type="text" class="form-control null" id="Email" name="Email" placeholder="Email ID. *">
									</div>
								</div>
								<div class="row row_div">
									<div class="col-sm-12">
										<input type="password" class="form-control null" id="password" name="password" placeholder="Set A Password. *">
									</div>
								</div>
								<div class="row row_div">
									<div class="col-sm-6">
										<input type="text" class="form-control null" id="Latitude" name="Latitude" placeholder="Latitude. *">
									</div>
									<div class="col-sm-6">
										<input type="text" class="form-control null"   id="Longitude" name="Longitude" placeholder="Longitude *">
									</div>
								</div>
								<div class="row row_div">
									<div class="col-sm-12" >
										<button class="btn btn-primary  btn-lg btn-block" type="submit" id="sub_btn">GET START REGISTRATION</button>
									</div>
								</div>
							</form>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-3"></div>
			</div>
	</div>
</div>

<script>
var base_url = "<?php echo base_url() ; ?>";
$(function(){
	
	$('#registration_form').submit(function(){
		invalid = 0;
		$('.null').each(function(){
			
			var val = $.trim($(this).val());
			if(val == '')
			{
				invalid = 1;
				$(this).css('border','1px solid red');
			}
			else
				$(this).css('border','');
		})
		if(invalid == 0)
			
		{
			$.ajax({
				
				url :  "",
				data : new FormData(this),
				processData: false,
				contentType: false,
				type:"POST",
				beforeSend: function(){},
				complete:function(){},
				success: function(data)
							{
								var data = $.parseJSON(data);
								if(data.err == 1)
								{
									$('#alert_msg').html('<div class="alert alert-success">'+data.msg+'</div>');
									window.location.replace(base_url+'Login');
								}
								else
								{
									$('#alert_msg').html('<div class="alert alert-danger">'+data.msg+'</div>');
								}
							},
			})
		}
		
		
	})	
})

</script>

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