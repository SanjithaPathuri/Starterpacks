<style>
.title h3 span {
    color: #00bcd4;
}
</style>
<br>
<!-- footer start -->
		<!-- ================ -->
		<footer id="footer">

			<!-- .footer start -->
			<!-- ================ -->
			<div class="footer section">
				<div class="container">
					<h1 class="title text-center" id="contact">Contact <span>Us</span></h1>
					<div class="space"></div>
					<div class="row">
						<div class="col-sm-5">

							<div class="col-sm-6 contact-info">
							<br><br>
								<b>SmartBridge</b>
								<p class="contact-content">Bridging the gap between Academics and Industries</p>
								<p class="st-address"><i class="fa fa-map-marker"></i> <strong>4TH Floor, Narmada Arcade, Above HDFC Bank, 
								Nacharam Main Road,Hyderabad – 500 076 </strong></p>

								<p class="st-website"><i class="fa fa-globe"></i> <strong>http://www.thesmartbridge.com/</strong></p>

							</div>
									
						</div>
						<div class="col-sm-7">
							<div class="footer-content">
								
								<form id="contactform" method="post" class="validateform" name="contactform" onsubmit="return false;">
									<div class="form-group has-feedback">
										<label class="sr-only" for="name2">Name</label>
										<input type="text" class="form-control null_contact" id="name" placeholder="Name" name="name" >
										<i class="fa fa-user form-control-feedback"></i>
									</div>
									<div class="form-group has-feedback">
										<label class="sr-only" for="email2 ">Email address</label>
										<input type="text" class="form-control null_contact" id="email" placeholder="Enter email" name="email" >
										<i class="fa fa-envelope form-control-feedback"></i>
									</div>
									<div class="form-group has-feedback">
										<label class="sr-only" for="message2">Message</label>
										<textarea class="form-control null_contact" rows="8" id="message" placeholder="Message" name="message" ></textarea>
										<i class="fa fa-pencil form-control-feedback"></i>
									</div>
									<input type="submit" value="Submit" class="btn btn-default"><br></br>
									<p id="contact_alert"></p>
								</form>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			<!-- .footer end -->

			<!-- .subfooter start -->
			<!-- ================ -->
			<div class="subfooter">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<p class="text-center"> All Rights Reserved | Copyright 2017 © <strong> <a target="_blank" href="http://thesmartbridge.com">By SmartBridge</a></strong></p>
						</div>
					</div>
				</div>
			</div>
			<!-- .subfooter end -->

		</footer>
		<!-- footer end -->

		<!-- JavaScript files placed at the end of the document so the pages load faster
		================================================== -->
		<!-- Jquery and Bootstap core js files -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url('template'); ?>/plugins/jquery.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url('template'); ?>/bootstrap/js/bootstrap.min.js"></script>

		<!-- Modernizr javascript -->
		<script type="text/javascript" src="<?php echo base_url('template'); ?>/plugins/modernizr.js"></script>

		<!-- Isotope javascript -->
		<script type="text/javascript" src="<?php echo base_url('template'); ?>/plugins/isotope/isotope.pkgd.min.js"></script>
		
		<!-- Backstretch javascript -->
		<script type="text/javascript" src="<?php echo base_url('template'); ?>/plugins/jquery.backstretch.min.js"></script>

		<!-- Appear javascript -->
		<script type="text/javascript" src="<?php echo base_url('template'); ?>/plugins/jquery.appear.js"></script>

		<!-- Initialization of Plugins -->
		<script type="text/javascript" src="<?php echo base_url('template'); ?>/js/template.js"></script>

		<!-- Custom Scripts -->
		<script type="text/javascript" src="<?php echo base_url('template'); ?>/js/custom.js"></script>

	</body>
</html>

<script type="text/javascript">
		var url = "<?php echo base_url(); ?>/Welcome/Contact";
			$(document).ready(function(){
				
				$('#contactform').submit(function(){
					var invalid = '';
					$('.null_contact').each(function(){
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
						$.ajax({
							url     : url,
							data    : new   FormData(this),
							type    : "POST",
							processData : false,
							contentType : false,
							success : function(data)
							{
								var data = $.parseJSON(data);
								if(data.err == 1)
								{
									$('#contact_alert').html('<div class="alert alert-success" >Successfully Sent The Message</div>');
									$('.null_contact').each(function(){
										$(this).css('border','');
										$(this).val('');
									})
								}
								else
								{
									$('#contact_alert').html('<div class="alert alert-danger" >Your Email Id Is Alredy Exits</div>');
								}								
							}
						})
					}
				})	
			});
		</script>