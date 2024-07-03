<style>
.amount{
	font-size: 18px;
	font-weight: 500;
	color: #0d1214;
}
.card_div{
	text-align: center;
	background-color: #383b40;
	color: #fff;
	box-shadow: 1px 1px 3px #cccc;
	margin: 10px;
}
.doctors_image{
	width	: 100%;

}
</style>
<br>
<br>

<div class="section clearfix object-non-visible" data-animation-effect="fadeIn">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h1 id="about" class="title text-center">Doctors Request</h1>
						<div class="space"></div>
						<div class="row">
							<div class="col-sm-4">
								<p>Account Holder Name: <?php echo $users_data['Name']; ?></p>
								<p>Email: <?php echo $users_data['Email'];  ?></p>
								<p>Mobile: <?php echo $users_data['Mobile']; ?></p>
							</div>
							<div class="col-sm-4"></div>
							<div class="col-sm-4 text-center">
								<a href="<?php echo  base_url().'Welcome/users_account'; ?>" class="btn btn-warning btn-lg btn-block" ><i class="fa fa-arrow-left"></i> Go back to your account</a>
								<small >Click the above button to navigate to your account ..</small>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="text-center">
							<b style="align:center">Find Your doctor from the below list ..</b>
						</div>	
						
						<div class="row">
						
							<?php foreach($doctors_data as $row){ ?>
								<div class="col-sm-3">
									<div class="card_div">
										<img src="<?php echo base_url().'images/ing.jpg'; ?>" class="doctors_image">
										<div style="padding:5px">
											<p><?php echo $row['Name'] ; ?></p>
											<small><?php echo $row['Designation'] ; ?>, <?php echo $row['Mobile'] ; ?></small>
											<small><a class="btn btn-success btn-xs" href="<?php echo base_url().'Welcome/request_send/'.$row['MemberId']; ?>">Get Appointment</button></a>
										</div>
									</div>
								</div>
							<?php } ?>
												
						</div>
						
					</div>
				</div>
			
			
			
			
			
		</div>
