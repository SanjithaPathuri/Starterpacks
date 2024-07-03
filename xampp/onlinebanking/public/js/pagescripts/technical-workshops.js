$(function(){
	
	$('#FiltersDiv').hide();
	var cpage = 1;
	get_workshops(cpage);
	$('#SearchKey').click(function(){
		get_workshops(cpage);
	});
	$('#ClearFilters').click(function(){
		clearfilters();
	});
	$('#CategoryId').change(function(){
		search();
	});
	$('#Location').change(function(){
		search();
	});
	
	$('#topsearch').click(function(){
		var cat = $.trim($('#TopCategory').val());
		if(cat!='')
			$('#CategoryId').select2('val',cat);
		else
			get_workshops(cpage);
	});
});

function clearfilters()
{
	$('#CategoryId').select2('val','');
	$('#skey').val('');
	$('ul').find('#Latest').prop('checked',true);
	$('#FiltersDiv').hide();
	get_workshops('1');
}

function search()
{
	get_workshops('1');
	$('#FiltersDiv').show();
}

function get_workshops(page)
{
	var skey = $.trim($('#skey').val());
	var Location = $.trim($('#Location').val());
	var skey = $.trim($('#skey').val());
	var Category = $.trim($('#CategoryId').val());
	var TopCategory = $.trim($('#TopCategory').val());
	var order = $('input[name=filters]:checked').val();
	$.ajax({
		url: "",
		type: "POST",
		data:{'order':order,'get':'workshops','skey':skey,'page':page,'Category':Category,'Location':Location,'TopCategory':TopCategory},
		beforeSend: function()
		{
			//$("#preloader_del").show()
		},
		complete:function()
		{
			//$("#preloader_del").hide()
		},
		success:function(data)
		{
			data = $.parseJSON(data);
			var html = '';
			if(data.workshops!='')
			{
				$.each(data.workshops,function(i){
					var row = data.workshops[i];
					var title_full = row.WorkshopTitle;
					var Title = row.WorkshopTitle.substr(0, 17);
					var url = base_url+"Technicalworkshops/workshopinner/"+row.WorkshopId;
					html+="<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'  data-toggle='tooltip' title='"+title_full+"' data-placement='top' ><div class='cari-curs-block'><a href='"+url+"'> <img class='img-responsive cari-img' alt='' src='"+row.Image+"'><div class='cari-curs-boxmn'><h3 class='cari-curs-hdtitle' >"+Title+"</h3><div class='row'><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center'><span class='twc-txt'>"+row.Venue+"</span></div><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center'><span class='twc-txt'><i class='fa fa-calendar'></i>&nbsp;"+row.Date+"</span></div><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'><span class='linkvw-details' href='javascript:void(0);'><i class='fa fa-arrow-right'></i> Details</span></div></div></div></a></div></div>";
				
						

				});
				
			}
			else
				html+="No Records Found..";
			$('#WorkshopsDiv').html(html);
			$('#Pagination').html(data.pagination);
			$('#Pagination').find('li').find('a').click(function(){
				var page = $(this).parent('li').attr('page');
				get_workshops(page);				
			});
			$('[data-toggle="tooltip"]').tooltip();
		}
	});
}