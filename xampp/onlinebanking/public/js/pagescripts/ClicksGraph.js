$(function(){
	var ClicksData = '';
	getClicks();
});

function getClicks()
{
	$.ajax({
			url: "",
			type:"POST",
			data: {'Get':'Clicks'},
			success: function(data)
			{
				ClicksData = $.parseJSON(data);
				console.log(ClicksData);
				append();
			}
	});
}

function append()
{
	$('#container').highcharts({
		 chart: {type: 'column'},
        title: { text: 'Total Clicks in this Month '+Month },
        subtitle: {text: 'Click the columns to view previous dates.'},
        xAxis: {type: 'category'},
        yAxis: {title: {text: 'Total Number of clicks'}},
        legend: {enabled: false},
        plotOptions: {
			 series: 	{borderWidth: 0,
							dataLabels:{enabled: true,format: '{point.y}'}
						}
					},

        tooltip: {	headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
					pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
				},
		
        series: [
					{ 
						name: 'Clicks', colorByPoint: true,
						colorByPoint: true,
						data: ClicksData
					}
				]
	});
}