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
</style>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBM28JQxcwipPzJS2UfYw4gmiE3ctVFPn4&libraries=places&callback=initAutocomplete"
         async defer></script><script src="http://maps.googleapis.com/maps/api/js"></script>

<div id="about" class="container-fluid">
	<div class="row">
		<div class="col-sm-12">
		<h2>Sensors</h2>
		<h4>UserKey : <?php echo $this->session->userdata('UserKey');?></h4>
			<div class="row">
				<div class="col-sm-2">
					<a href= "<?php echo base_url('Welcome/UserVisualization/1'); ?>" class="btn btn-primary btn-block">Field1</a>
					<a href= "<?php echo base_url('Welcome/UserVisualization/2'); ?>" class="btn btn-primary btn-block">Field2</a> 
					<a  href= "<?php echo base_url('Welcome/UserVisualization/3'); ?>" class="btn btn-primary btn-block">Field3</a>
					<a  href= "<?php echo base_url('Welcome/UserVisualization/4'); ?>" class="btn btn-primary btn-block">Field4</a> 
					<a  href= "<?php echo base_url('Welcome/UserVisualization/5'); ?>" class="btn btn-primary btn-block">Field5</a>
				
				</div>
				<div class="col-sm-10">
					<div class="well">
						<iframe src="<?php echo base_url('Welcome/Field'.$id.'/'.$UserKey) ?>" width="100%" height="420px;"></iframe>
					</div>
				
				
				
				
				</div>
			
			
			
			</div>
		</div>
			
	</div>

</div>	