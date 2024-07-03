
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
.main_class{
	text-transform: capitalize;
	margin-bottom: 10px;
}
</style>

<div id="about" class="container-fluid">
  <div class="row">
	<div class="col-sm-2" style="background-color: #181e29;padding-top: 90px;height:800px;">
		<a  href="<?php echo base_url('admin/AdminDashboard'); ?>"  class="btn btn-default  btn-block"> Dashboard </a><br>
		<a  href="<?php echo base_url('admin/doctors'); ?>" class="btn btn-default btn-block">Doctors </a><br>
		<a  href="<?php echo base_url('admin/Users'); ?>"  class="btn btn-default btn-block">Users</a><br>	
		<a  href="<?php echo base_url('admin/contact'); ?>"  class="btn btn-default btn-block">Contact Us</a><br>	
		<!-- <a  href="<?php echo base_url('admin/Payments'); ?>"  class="btn btn-default btn-block">Payments</a><br> -->
	</div>