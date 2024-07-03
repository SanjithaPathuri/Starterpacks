$(document).ready(function(){
	var cpage = 1;
	var order = 'Normal';
	get_Courses(cpage);
	$('#SearchKey').click(function(){
		get_Courses(cpage);
	});
	$('#ClearFilters').click(function(){
		clearfilters();
	});
	if(SelectedCat !='')
		categoryClick(SelectedCat);
});

function clearfilters()
{
	$('#Category').val('');
	$('#skey').val('');
	$('ul').find('#Latest').prop('checked',true);
	get_Courses('1');
	$('#FiltersDiv').hide();
}

function search()
{
	get_Courses('1');
	$('#FiltersDiv').show();
}

function get_Courses(page)
{
	var skey = $.trim($('#skey').val());
	var Category = $.trim($('#Category').val());
	var filters=[];
	$('#filters').find("[name=filters]:checked").each(function(){
		filters.push($(this).attr('did'))
	});
	$.ajax({
		url: "",
		type: "POST",
		data:{'order':filters,'get':'Courses','skey':skey,'page':page,'Category':Category},
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
			if(data.Courses!='')
			{
				/******************************************************************
				Removed subscription flag code
				<div class='bxbk-undfdbtn'><a href='#'><span class='btn btn-warning btn-xs'>"+row.subscriptionShortCode+"</span></a></div>
				******************************************************************/
				$.each(data.Courses,function(i){
					var row = data.Courses[i];
					var name = row.CourseName.substr(0, 17);
					var url = base_url+"Courses/CareerCoursesinner/"+row.CourseId;
					html+="<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12' data-toggle='tooltip' title='"+row.CourseName+"' data-placement='top' ><div class='cari-curs-block'><a href='"+url+"'><img src='"+row.Image+"' alt='' class='img-responsive cari-img' /><div class='cari-curs-boxmn'><h3 class='cari-curs-hdtitle'>"+name+"..</h3><div class='row'><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'><div class='cari-curs-rupees'><i class='fa fa-inr'></i> "+row.CourseAmount+"</div></div></div><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left mar-t15 mar-b15'><div class='hrbdr'><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center'><div class='row'><a href='"+url+"' class='btn btn-primary btn-sm'><i class='fa fa-arrow-right'></i> View More</a></div></div></div></div></div></a></div></div>";
				});
			}
			else
				html+="No Records Found..";
			$('#CoursesDiv').html(html);
			$('#Pagination').html(data.pagination);
			$('#Pagination').find('li').find('a').click(function(){
				var page = $(this).parent('li').attr('page');
				get_Courses(page);
			});
			$('[data-toggle="tooltip"]').tooltip();
		}
	});
}

function  categoryClick(id)
{
	$('#Category').val(id);
	$('#SearchKey').trigger('click');
	$('#FiltersDiv').show();
}