<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>	
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>

<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>





<script>
var Title = "<?php echo $Title ; ?>";
$(function () {
   get_charts();
   setInterval(function(){ get_charts();} , 5000)
});
function get_charts()
{
	$.ajax({
		url :  "",
		data : {'Role':'Get_Data'},
		type : "POST",
		success : function(data)
			{
				var data = $.parseJSON(data);
				var categories = [] ;
				var values = [] ;
				if(data.res != '')
				{
					$.each(data.res , function(i){
						var row = data.res[i] ;
						categories.push(row.Date+' '+row.Time);
						values.push(parseInt(row.field3));
					})
					categories = categories.reverse();
					values = values.reverse();
					 Highcharts.chart('container', {
							title: {
								text: Title,
								x: -20 //center
							},
							subtitle: {
								text: 'Source: SmartBridge',
								x: -20
							},
							xAxis: {
								categories: categories
							},
							yAxis: {
								title: {
									text: 'cm'
								},
								plotLines: [{
									value: 0,
									width: 1,
									color: '#808080'
								}]
							},
							tooltip: {
								valueSuffix: ' (cm)'
							},
							legend: {
								layout: 'vertical',
								align: 'right',
								verticalAlign: 'middle',
								borderWidth: 0
							},
							series: [{
								name: Title,
								data: values
							}]
						});					
				}
				else
				{
					$('#container').html('No Data Found ..');
				}	
				
				
				
				
			}
		
		
		
	})
	
	
	
	
} 
</script>