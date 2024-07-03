	$(document).ready(function() {
		var dt = new Date();
		dt.setFullYear(new Date().getFullYear()-17);

		$('#DOB1').datepicker(
			{
				viewMode: "years",
				endDate : dt
			}
		);
		$('#fresher').change(function()
		{
			
			if($('#fresher').is(':checked'))
			{
				$('#fresher').val('1');
				//alert('val');
			}
			else
			{
				$('#fresher').val('0');
				//alert('noval');
			}
			
			
		})
		var max_fields      = 5;
		var wrapper         = $(".input_fields_wrap");
		var add_button      = $(".add_field_button");
		$('#experienced').change(function()
		{	
			
			if($('#experienced').is(':checked'))
			{
				$('#fresher').val('0');
				//alert('eval');
			}
			else
			{
				$('#fresher').val('1');
				//alert('enoval');
			}
		})
		
		blurValidations();
		
		$('.removediv').click(function(e){
			/* alertify.confirm("Do You Really Want to Delete This..?", function (a) {
			if (a) { */
				$(this).parent('div').parent('div').parent('div').parent('div').remove(); x--;
			/* }}); */
		})
		
		$('.removediv1').click(function(e){
			$(this).parent('div').parent('div').parent('div').parent('div').parent('div').remove(); x--;
		})
		
		
	   
		var x = educount;
		$(add_button).click(function(e){ 				
			e.preventDefault();
			if(x < max_fields)
			{ 		
				//<input type="text" class="form-control name"  id="CollegeName" placeholder="College name"/>
				//<input type="text" class="form-control name" name="edu['+educount+'][UniversityName]" id="UniversityName" placeholder="University Name"/>
				educount=parseInt(educount)+1;
				$(wrapper).append('<div class="in" style="float: left;"><div class="remove"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="CollegeName" class="col-sm-12 control-label">College Name:</label><div class="col-sm-12"><select class="form-control" name="edu['+educount+'][CollegeName]" id="CollegeName">'+collegeoptions+'</select></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="University" class="col-sm-12 control-label">University:</label><div class="col-sm-12"><select class="form-control" name="edu['+educount+'][UniversityName]" id="UniversityName">'+universityoptions+'</select></div></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="course" class="col-sm-12 control-label">Course:</label><div class="col-sm-12"><select class="form-control" name="edu['+educount+'][CourseName]" id="CourseName">'+courseoptions+'</select></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group">		<label for="AggregatePercent" class="col-sm-12 control-label">Aggregate:</label><div class="col-sm-4"><input type="text" class="form-control aggregate" name="edu['+educount+'][AggregatePercent]" id="AggregatePercent" placeholder="Aggregate" /></div><div class="col-sm-8"><select name="edu['+educount+'][Percentage]" id="Percentage" style="width:100%"><option value="">Select Aggregate type</option><option value="Percentage">Percentage (%)</option><option value="CGPA">CGPA</option></select></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="course" class="col-sm-12 control-label">Branch/Stream:</label><div class="col-sm-12"><select name="edu['+educount+'][BatchName]" id="BatchName" style="width:100%">'+branchoptions+'</select></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="YearOfPass" class="col-sm-12 control-label">Year of Passout:</label><div class="col-sm-12"><select class="form-control"  name="edu['+educount+'][YearOfPass]" id="YearOfPass" >'+options+'</select></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="citydesrict" class="col-sm-12 control-label">Location:</label><div class="col-sm-12"><input type="text" class="form-control name" name="edu['+educount+'][Location]" id="Location" placeholder="Location"/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label class="col-sm-12 control-label">&nbsp;</label><div class="col-sm-12"><button class="btn btn btn-danger remove_field" type="button"><i class="fa fa-trash-o"></i></button></div></div></div></div></div>');
				x++;
				$('select').select2();
				$('.remove_field').click(function(e){
						$(this).parent('div').parent('div').parent('div').parent('div').remove(); x--;
				})
			}	
			else
				alertify.alert("Only 5 Details");
			blurValidations();
		});
		
		var max_fields1      = 5;
		var wrapper1         = $(".input_fields_ex");
		var add_button1      = $(".add_exfield_button");
		var y = expcount;
		$(".customclass").change(function() {
			var test = $(this).val();
			if(test == '2')
			{
				$("#experincediv").show();
				var add_button1      = $(".add_exfield_button");
				
				$(add_button1).trigger('click');
			}
				
			else
				$("#experincediv").hide();			
		});
		
		$(add_button1).click(function(e){ 
			e.preventDefault();
			if(y < max_fields1)
			{ 
				expcount=parseInt(expcount)+1;
				$(wrapper1).append('<div class="india" style="float:left;"><div class="remove"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="experiercetype" class="col-sm-12 control-label">Experierce Type:</label><div class="col-sm-12"><select class="form-control exe" name="exp['+expcount+'][ExperienceTypeId]" id="ExperienceTypeId"><option value="">Select Experience Type</option><option value="1">Internship</option><option value="2">Job</option><option value="3">Project work</option><option value="4">R&amp;D</option></select></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="designation" class="col-sm-12 control-label">Designation:</label><div class="col-sm-12"><input type="text" class="form-control name" name="exp['+expcount+'][Designation]" id="Designation" placeholder="Designation"/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="companyname" class="col-sm-12 control-label">Company Name:</label><div class="col-sm-12"><input type="text" class="form-control name" name="exp['+expcount+'][CompanyName]" id="CompanyName" placeholder="Company Name"/></div></div></div></div></div><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="yearstarting" class="col-sm-12 control-label">Year Starting:</label><div class="col-sm-12"><input type="text" class="form-control StartDate'+expcount+'" name="exp['+expcount+'][StartDate]" id="StartDate'+expcount+'" placeholder="Year Starting" readonly/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="yearend" class="col-sm-12 control-label">Year End:</label><div class="col-sm-12"><input type="text" class="form-control EndDate'+expcount+'" name="exp['+expcount+'][EndDate]" id="EndDate'+expcount+'" placeholder="Year End" readonly /></div></div></div></div></div><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="row"><div class="col-lg-8 col-md-8 col-sm-8 col-xs-12"><label for="Work Profile:" class="col-sm-12 control-label">Work Profile:</label><textarea class="form-control workprofile" name="exp['+expcount+'][WorkProfile]" id="Editer'+expcount+'"></textarea></div></div></div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-12"><div class="form-group"><label for="workprofile" class="col-sm-12 control-label">&nbsp;</label><div class="col-sm-12"><button class="btn btn btn-danger remove_field1" type="button"><i class="fa fa-trash-o"></i></button></div></div></div></div></div>');
				var editerid = 'Editer'+expcount;
				console.log(editerid);
				CKEDITOR.replace(''+editerid+'');
				y++; 
				 
				$(".StartDate"+expcount).datepicker({ 
					todayBtn:  1,
					autoclose: true,
					}).on('changeDate', function (selected) {
					var get_class = $(this).attr('id');
					var id_no = get_class.substr(get_class.length - 1);		
					var minDate = new Date(selected.date.valueOf());
					$('.EndDate'+id_no).datepicker('setStartDate', minDate);
				});

				$(".EndDate"+expcount).datepicker().on('changeDate', function (selected) {
					var get_class = $(this).attr('id');
					var id_no = get_class.substr(get_class.length - 1);	
					var minDate = new Date(selected.date.valueOf());
					$('.StartDate'+id_no).datepicker('setEndDate', minDate);
				});
				
				/*  $(function () {
					//$("#StartDate").datetimepicker();
					//$('#EndDate').datetimepicker({
					//useCurrent: false //Important! See issue #1075
					//});
					$("#StartDate").on("dp.change", function (e) {
					$("#EndDate").data("DateTimePicker").minDate(e.date);
					});
					$("#EndDate").on("dp.change", function (e) {
					$("#StartDate").data("DateTimePicker").maxDate(e.date);
					});
				}); */
					$(".StartDate").datepicker({
						todayBtn:  1,
						autoclose: true,
					}).on('changeDate', function (selected) {
						var minDate = new Date(selected.date.valueOf());
						$('.EndDate').datepicker('setStartDate', minDate);
					});

					$(".EndDate").datepicker()
						.on('changeDate', function (selected) {
							var minDate = new Date(selected.date.valueOf());
							$('.StartDate').datepicker('setEndDate', minDate);
						});
				
				
				
				$('.remove_field1').click(function(e){
						$(this).parent('div').parent('div').parent('div').parent('div').parent('div').remove(); y--;
				})
			}	
			else
				alertify.alert("Only 5 Details");
			blurValidations()
		});
	
	
		$('#Savedetails').click(function()
		{
			var valid;	
			valid = validations();
			if(valid)
			{			
				
			}
			
		});	
	
		function validations() 
		{		
			
			 var err=0;
			  $('.name').each(function(){    
						if($(this).val()=='')     
						{
							err=1;
							$(this).css('border','1px solid red')
						}
						else
							$(this).css({"border":""})
						
					});
				/*  $('.skills').each(function(){    
					if($(this).val()=='')     
					{
						err=1;
						$(this).css('border','1px solid red')
					}
					else
						$(this).css({"border":""})
					
				});		 */			
			 /*  $('.email').each(function(){    
						if($(this).val()=='')     
						{
							err=1;
							$(this).css('border','1px solid red')
						}
						else
							$(this).css({"border":""})
						
					}); */	
			 /*  $('.address').each(function(){   
						if($(this).val()=='')     
						{
							err=1;
							$(this).css('border','1px solid red')
						}
						else
							$(this).css({"border":""})
						
					}); */
			  $('.currdate').each(function(){    
						if($(this).val()=='')     
						{
							err=1;
							$(this).css('border','1px solid red')
						}
						else
							$(this).css({"border":""})
						
					});
			   $('.aggregate').each(function(){    
						if($(this).val()=='')     
						{
							err=1;
							$(this).css('border','1px solid red')
						}
						else
							$(this).css({"border":""})
						
					});
				/* $('.pincode').each(function(){    
					if($(this).val()=='')     
					{
						err=1;
						$(this).css('border','1px solid red')
					}
					else
						$(this).css({"border":""})
					
				}); */
				/* $('.address').each(function(){    
					if($(this).val()=='')     
					{
						err=1;
						$(this).css('border','1px solid red')
					}
					else
						$(this).css({"border":""})
					
				}) */;
				
				
				if($('#StartDate').val()=='')
				{err=1;$('#StartDate').css('border','1px solid red')}
				else $('#StartDate').css('border','')
				
				if($('#EndDate').val()=='')
				{err=1;$('#EndDate').css('border','1px solid red')}
				else $('#EndDate').css('border','')
				
				if($('#DOB1').val()=='')
				{err=1;$('#DOB1').css('border','1px solid red')}
				else $('#DOB1').css('border','')
				
				if($('#ExperienceTypeId').val()=='')
				{err=1;$('#ExperienceTypeId').css('border','1px solid red')}
				else $('#ExperienceTypeId').css('border','')
				
				/* if($('#State').val()=='')
				{err=1;$('#state_div').find('.select2-container').css('border','1px solid red')}
				else $('#state_div').find('.select2-container').css('border','') */
				
				if($('#CourseName').val()=='')
				{err=1;$('#course_div').find('.select2-container').css('border','1px solid red')}
				else $('#course_div').find('.select2-container').css('border','')
				
				if($('#CollegeName').val()=='')
				{err=1;$('#College_div').find('.select2-container').css('border','1px solid red')}
				else $('#College_div').find('.select2-container').css('border','')
				
				if($('#UniversityName').val()=='')
				{err=1;$('#university_div').find('.select2-container').css('border','1px solid red')}
				else $('#university_div').find('.select2-container').css('border','')
				
				
				if($('#BatchName').val()=='')
				{err=1;$('#batch_div').find('.select2').css('border','1px solid red')}
				else $('#batch_div').find('.select2').css('border','')
				
				
				if($('#year_pass').val()=='')
				{err=1;$('#year_div').find('.select2').css('border','1px solid red')}
				else $('#year_div').find('.select2').css('border','')
				
				/* if($('#KnownLanguages').val()==null)
				{err=1;$('#lang_div').find('.select2-container').css('border','1px solid red')}
				else $('#lang_div').find('.select2-container').css('border','') */
				
				/* if($('#InterestedIn').val()==null)
				{err=1;$('#int_div').find('.select2-container').css('border','1px solid red')}
				else $('#int_div').find('.select2-container').css('border','') */
				
				if($('#MobileNo').val()=='')
				{err=1;$('#MobileNo').css('border','1px solid red')}
				else $('#MobileNo').css('border','')
					
				if(err>0)
				{
					//alert("no");return false;
				}	
				else
				{/*
					alert("yes");return false;
					$('.textediter').each(function(){
						var id = $(this).attr('id');
						var textareaid = $(this).attr('textid');
						var content = CKEDITOR.instances[''+id].getData();
						$('#'+textareaid).val(content);
					}); */
					$('.workprofile').each(function(){
						var id = $(this).attr('id');
						var cke_id = 'cke_'+id;
						var cke_data = CKEDITOR.instances[id].getData();
						$(this).val(cke_data);
					});
					
					dataString = $("form#profile-form").serializeArray();
					$.ajax({
						url: base+"Student/studentprofileaj",
						type:"POST",
						data: dataString ,
						cache: false,
						dataType: 'json',
						enctype: 'multipart/form-data',
						beforeSend: function(res){						
							$('#Savedetails').prop('disabled', true);
						},
						complete: function(){
							$('#Savedetails').prop('disabled', false);
						},
						
						success:function(data)
						{
						if(data==1)
						{
							alertify.alert('<strong style="color:green">Profile Updated Successfully..!</strong>');
							location.reload()
						}
						else
						{
							alertify.alert('<strong style="color:red">Please try again....!</strong>');
						}
						}
						
					})
				}
		}
		
		$('#PhotoImagePath').change(function(){ 
				var file = this.files[0];
				var name = file.name;
				var size = file.size;
				
				var type = file.type;
				var error=0;
				if(file.name.length < 1) {
					alert("Invalid File name")
					$('#PhotoImagePath').val('');
					error=1;
				}
				else if(file.size > 2000000) {
						alert("File is too big, Max allowed size: 2MB");
						$('#PhotoImagePath').val('');
						error=1;
				}
				else if(file.type != 'image/png' && file.type != 'image/jpg' && !file.type != 'image/gif' && file.type != 'image/jpeg' ) {
					alert("File doesnt match png, jpg or gif");
					$('#PhotoImagePath').val('');
					error=1;
				}
				else{
					var img = new Image();
					var _URL = window.URL || window.webkitURL;
					img.src = _URL.createObjectURL(file);
					img.onload = function () {
						if(this.height <200 || this.width<200 )
						{
							error=1;
							alert("Please upload Images with atleast 200 x 200 resolution");
							$('#PhotoImagePath').val('');
							return false;
						}
						else
						{
							var reader = new FileReader();
							reader.onloadend = function() {
								$("#PhotoImagePath").attr("src",reader.result);
							}
							reader.readAsDataURL(file);
							$("#PhotoImagePath").show();
						
							var data = new FormData();
							data.append("PhotoImagePath", file);
							data.append("CVPath", file);
							data.append("StId", $("#StId").val());
							/* if(x)
								x.abort(); */
								$.ajax({
									url:base+"Student/pro_img",
									type:"post",
									data: data,
									processData: false,
									contentType: false,
									beforeSend:function(){
										$('#newimage').hide();
										$("#ImgupLoad").show()
									},
									complete:function(){
										$("#ImgupLoad").hide()
										$("#newimage").show()
									},
									success:function(data)
									{
										if(data==6)
										{
											$('#AlertMsg').removeClass('alert-danger');
											$('#AlertMsg').addClass('alert-success');
											$('#AlertMsg').html('Profile Updated Successfully');
											$('#AlertMsg').show();
										}
										else
										{
											$('#AlertMsg').removeClass('alert alert-success');
											$('#AlertMsg').addClass('alert alert-danger');
											$('#AlertMsg').html('Please try again with a different Image');
											$('#AlertMsg').show();
										}
									}
								});
						}
					};
					
				}
				
			});
			
			$('#CVPath').change(function(){
				
				var file = this.files[0];
				var name = file.name;
				var size = file.size;
				
				var type = file.type;
				var error=0;
				if(file.name.length < 1) {
					alertify.alert("Invalid File name")
					$('#CVPath').val('');
					error=1;
				}				
				else if(file.type != 'application/msword' && file.type != 'application/pdf' && file.type != 'application/doc' && file.type != 'application/docx' ) {
					alertify.alert("File doesnt match DOC,DOCX,PDF,MSWORD");
					$('#CVPath').val('');
					error=1;
				}
			})
			$('#CVupload').submit(function(){
				//var data = new FormData();
				var filevalue=$('#CVPath').val();
				if(filevalue=='')
				{
					alertify.alert('<strong style="color:red">Please upload CV/Resume</strong>');
				}
				else
				{
					$('#processcv').show();
					var res='';
						
						$.ajax({
							url:base+"Student/pro_cv",
							type:"post",
							data:new FormData(this),
							processData: false,
							contentType: false,
							beforeSend:function(){
								$('#newimage').hide();
								$("#ImgupLoad").show()
							},
							complete:function(){
								$("#ImgupLoad").hide()
								$("#newimage").show()
								$('#processcv').hide();
							},
							success:function(data)
							{
								res=$.parseJSON(data);
								if(res.error=1)
								{
									alertify.alert('<strong style="color:green">'+res.msg+'</strong>');
									$('#CVPath').val('');
								}
								else
								{
									alertify.alert('<strong style="color:red">'+res.msg+'</strong>');
								}
							}
						});
				}
			});
	
	});
	
	function blurValidations()
	{
		$('.name').blur(function(){
			var namePattren = /^[a-zA-Z][a-zA-Z. ]+$/ ;
			if(!namePattren.test($(this).val()))
			{
			$(this).val('');
			$(this).css('border','1px solid red')
			}
			else
			$(this).css('border','')
				
		});
		$('.skills').blur(function(){
			var namePattren = /^[a-zA-Z][a-zA-Z, ]+$/ ;
			if(!namePattren.test($(this).val()))
			{
			$(this).val('');
			$(this).css('border','1px solid red')
			}
			else
			$(this).css('border','')
				
		});
		
		
		
		$('.currdate').blur(function(){
			var currentYear = (new Date).getFullYear();
			
			var numPattren = /[^0-9]/g ;
			if(numPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				if($(this).val() > currentYear)
				{
				$(this).val('');
				$(this).css('border','1px solid red')
				}
				else
				$(this).css('border','')
			}
				
		});
		$('.nums').blur(function(){
			var numPattren = /[^0-9]/g ;
			if(numPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				$(this).css('border','')
			}	
		});
		$('.address').blur(function(){
			var addPattren = /^[a-zA-Z0-9\s,'-]*$/ ;
			if(!addPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				if($(this).val() == "")
				{
					$(this).val('');
					$(this).css('border','1px solid red')
				}
				else
				$(this).css('border','')
			}	
		});
		$('.email').blur(function(){
			if($(this).val() == '')
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				var emailPattren =/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
				if(!emailPattren.test($(this).val()))
				{
					$(this).val('');
					$(this).css('border','1px solid red')
				}
				else
				{
					$(this).css('border','')
				}	
			}
			
		});
		$('.pincode').blur(function(){
			var pincodePattren = /^\d{6}$/;
			if(!pincodePattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				$(this).css('border','')
			}	
		});
		
		$('.MobileNo').blur(function(){
			var mobilePattren = /^(\+\d{1,3}[- ]?)?\d{10}$/;
			if(!mobilePattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				$(this).css('border','')
			}	
		});
		$('.URL').blur(function(){
			var URLPattren =/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
			if(!URLPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				$(this).css('border','')
			}	
		});
		$('.empty').blur(function(){
			if($(this).val() == '')
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				$(this).css('border','')
			}		
		});
		
	}
if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
	CKEDITOR.tools.enableHtml5Elements( document );
	CKEDITOR.config.height = 150;
	CKEDITOR.config.width = 'auto';
	CKEDITOR.config.forcePasteAsPlainText = true;
	CKEDITOR.config.extraPlugins='whitelist,wordcount,maxlength'; 
	CKEDITOR.config.toolbar = [
		   ['Styles','Format','Font'],
		   ['Bold','Italic','StrikeThrough','-','Undo','Redo','-','Find','Replace'],
		   '/',
		   ['NumberedList','BulletedList','-','JustifyBlock'],
		  ['-','Link','Flash','Source']
		] ;
	CKEDITOR.config.removePlugins = 'PasteFromWord';
	var initSample = ( function() {
		var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );

		return function() {
			var classname = $('.contact').attr('class');
			var editorElement = CKEDITOR.classname;
		if ( isBBCodeBuiltIn ) {
			editorElement.setHtml(
				'Hello world!'
			);
		}
		
		// Depending on the wysiwygare plugin availability initialize classic or inline editor.
		if ( wysiwygareaAvailable ) {
			
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			CKEDITOR.inline( 'editor' );
		}
	};

	function isWysiwygareaAvailable() {
		if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
			return true;
		}
		return !!CKEDITOR.plugins.get( 'wysiwygarea' );
	}
} )();	
	
         
  