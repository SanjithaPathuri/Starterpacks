var cpage = '1';
$(document).ready(function(){
	get_comments(cpage);
	$(".text").blur(function(){
		var namesPattern = /^[a-zA-Z ]*$/;
		var id = $(this).attr('id');
		var value = $('#'+id).val();
		if(!namesPattern.test(value))
		{
			$('#'+id).css('border-color','red')
			$('#'+id).val('');
		}
		else
		{
			$('#'+id).css('border-color','');
			return false;
		}
    });
	
	$(':radio').change(
	  function(){
		$('.choice').text( this.value + ' stars' );
	  } 
	)
	
	$('#Submit').click(function(){
		//var name = $('#innovative_form').find('#Name').val();
		//var email = $('#innovative_form').find('#Email').val();
		//var location = $('#innovative_form').find('#Location').val();
		var msg = $('#innovative_form').find('#Feedback').val();
		var invalid = '';
		var val = $("input[name='Rating']:checked").val();
		if(val > 0)
		{
			/* if(name == '')
			{
				invalid = 1;
				$('#innovative_form').find('#Name').css('border-color','red');
			}
			else
				$('#innovative_form').find('#Name').css('border-color','');
			
			if(email == '')
			{
				invalid = 1;
				$('#innovative_form').find('#Email').css('border-color','red');
			}
			else
				$('#innovative_form').find('#Name').css('border-color',''); */
			
			if(msg == '')
			{
				invalid = 1;
				$('#innovative_form').find('#Feedback').css('border-color','red');
			}
			else
				$('#innovative_form').find('#Feedback').css('border-color','');
			
			/* if(location == '')
			{
				invalid = 1;
				$('#innovative_form').find('#Location').css('border-color','red');
			}
			else
				$('#innovative_form').find('#Location').css('border-color','');
			 */
			if(invalid == '')
			{
				$.ajax({
					url: "../Feedback",
					type:"POST",
					data: $('#innovative_form').serializeArray(),
					beforeSend: function(){
						$('#Submit').prop('disabled', true);
					},
					complete: function(){
						$('#Submit').prop('disabled', false);
					},
					success: function(data)
					{
						if(data == 1)
						{
							$('#innovative_form').trigger('reset');
							alertify.alert("<b style='color:green'>Thank you for your valuable feedback.</b>");
							get_comments('1');
						}
					}
				});
			}
		}
		else
			alertify.alert("Please select rating");
	});
	
	$('#SpecificationsPop').click(function(){
		$('#SpecsandKit').find('#Headingh4').html('Specifications');
		$('#SpecsandKit').find('#ContentDiv').html($('#SpecContent').html());
		$('#SpecsandKit').modal('show');
	});
	
	$('#KitdetailsPop').click(function(){
		$('#SpecsandKit').find('#Headingh4').html('Kit Details');
		$('#SpecsandKit').find('#ContentDiv').html($('#KitContent').html());
		$('#SpecsandKit').modal('show');
	});
	
	/* $('h1').find('#PrintPage').click(function(){
		window.print();
	}); */
	$('#PrintPage').click(function(){
		window.print();
	});
	
	$('input[type=email]').on('keyup',function(){
		$('#Span_Email').hide();
	});
	$('input[type=email]').blur(function(){
		var email = $.trim($(this).val());
		var emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if(!emailPattern.test(email))
		{
			$(this).css('border-color','red');
			$(this).val('');
			$('#Span_Email').show();
		}
		else
		{
			$(this).css('border-color','');
			$('#Span_Email').hide();
		}
	});
	$('#ProjectApply').click(function(){
		var id = $('#ProjectApply').attr('ProjectId');
		$.ajax({
				url: base_url+"InnovativeProjects/ApplyProject",
				type: "POST",
				data:{'ProjectId':id,'Apply':'true'},
				beforeSend: function()
				{
					$('#ProjectApply').hide();
					$('#LoadingImg').show();
				},
				complete:function()
				{
					$('#LoadingImg').hide();
					$('#ProjectApply').show();
				},
				success:function(data)
				{
					data = $.parseJSON(data);
					if(data.Message == '01')
					{
						alertify.alert('You have reached the limit for free projects.<br>Full amount is applicable.');
						setTimeout(function(){window.location.href= base_url+data.Link;},3000)
					}
					else
					{
						if(data.Message!='')
							alertify.alert(data.Message);
						else if(data.Message =='')
							window.location.href= base_url+data.Link;
						else if(data.Link!="Reload")
							setTimeout(function(){window.location.href= base_url+data.Link;},3000);
						else if(data.Link=="Reload")
							setTimeout(function(){window.location.href= '';},3000);
						else if(data.Link == '')
							return false;
					}
				}
		});
	});
	
	/* $('.starrating').change(function(){
		var val = parseInt($.trim($(this).val()));
		if(val < 0)
		{
			$.ajax({
					url: base_url+"InnovativeProjects/rating/",
					type: "POST",
					data:{'ProjectId':ProjectId,'rating':'true'},
					beforeSend: function()
					{
						$('#ProjectApply').hide();
						$('#LoadingImg').show();
					},
					complete:function()
					{
						$('#LoadingImg').hide();
						$('#ProjectApply').show();
					},
					success:function(data)
					{
						
					}
			});
		}
	}) */
});
function get_comments(page)
{
	$.ajax({
		url: base_url+"InnovativeProjects/get_comments",
		type:"POST",
		data: {'ProjectId':ProjectId,'page':page},
		success: function(data)
		{
			var html = '';
			var data = $.parseJSON(data);
			if(data.subjects!='')
			{				
				$.each(data.subjects,function(i)
				{
					
					var v = data.subjects[i];
					//html += "<div class='lverply_btmbox'><h3>"+v.Name+"</h3><p>"+v.Message+"</p></div>";
					html += '<div class="lverply_btmbox"><div class="media"><div class="media-left"><a href="#"><img class="media-object" src="'+base_url+v.ProfilePic+'" style="max-width:64px;"></a></div><div class="media-body"><h4 class="media-heading">'+v.Name+' <div class="media-datrepy pull-right">'+v.CreatedOn+'</div></h4><p>'+v.Feedback+'</p><b>Ratings : </b>';
					html += '<img src="'+base_url+'images/'+v.Rating+'star.png" alt="" /></div></div></div>';
					
				});
			}
			else
			html+="No Comments"; 
			$('#showdata').html(html);
			$('#pagination').html(data.pagination);
			$("body").on("click",'.pagination li',function(){
				cpage = $(this).attr('page');
				 get_replay_details(cpage);
			})
		}
	})
}