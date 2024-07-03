$(document).ready(function(){
	$('.nums').blur(function(){
		var fData = $(this).val();
		var reg = /[^0-9.,]/g;
		if(!reg.test(fData))
			$(this).css('border-color','');
		else
		{
			$(this).val('');
			$(this).css('border-color','red');
		}
	});

	$('#submit').click(function(){
		
		var err = '';
			
		var StudentsEnrolled = $.trim($('#StudentsEnrolled').val());
		var CollegesEnrolled = $.trim($('#CollegesEnrolled').val());
		var RecruitingCompanies = $.trim($('#RecruitingCompanies').val());
		var Mentors  = $.trim($('#Mentors ').val());
		if(StudentsEnrolled=='' || CollegesEnrolled=='' || RecruitingCompanies=='' || Mentors==''  )
		{
			$('#StudentsEnrolled').css('border','1px solid red');
			$('#CollegesEnrolled').css('border','1px solid red');
			$('#RecruitingCompanies').css('border','1px solid red');
			$('#Mentors').css('border','1px solid red');
			err = 1;
		}
		else
		{
			$('#StudentsEnrolled').css('border','');
			$('#CollegesEnrolled').css('border','');
			$('#RecruitingCompanies').css('border','');
			$('#Mentors').css('border','');
		}
		
			if(err == '')
			{
				xdata=$('#bannerform').serializeArray();
				$.ajax({
					url: base_url+"OurAchievements/index", 
					type: "POST",
					data: xdata ,
					cache: false,
					dataType: 'json',
					success: function(result)
					{
						alertify.alert("Information Updated Successfully");
					}
				})
			}
	});	
});
	
	
	