
	<div class="col-sm-10" style="padding-top: 90px;">
		<h3 >Dashboard</h3>
		
		
		
		
	</div>
  </div>
</div>

</body>
</html>
<script>
var base_url = "<?php echo  base_url(); ?>";
$(function() {
	default_function();
	$('#selecttrain').change(function(){
		var train_key = $('#selecttrain').val();
		if(train_key != '')
		{
			$('#frame1').attr('src',base_url+'Admin/train_sensor1/'+train_key);
			$('#frame2').attr('src',base_url+'Admin/train_sensor2/'+train_key);
			$('#frame1').show();
			$('#frame2').show();
		}
		else
		{
			$('#frame1').hide();
			$('#frame2').hide();
		}
	})
	
	$("#sensor_1_download").click(function(){
		var train_key = $('#selecttrain').val();
		window.location.replace(base_url+"Admin/generate_excels/"+train_key);
	})
	
	
	
});
function default_function()
{
	var train_key = $('#selecttrain').val();
	if(train_key != '')
	{
		$('#frame1').attr('src',base_url+'Admin/train_sensor1/'+train_key);
		$('#frame2').attr('src',base_url+'Admin/train_sensor2/'+train_key);
		$('#frame1').show();
		$('#frame2').show();
	}
	else
	{
		$('#frame1').hide();
		$('#frame2').hide();
	}
	
}
</script>
