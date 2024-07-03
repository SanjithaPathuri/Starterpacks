$(document).ready(function() {
		
		$('.removediv').click(function(e){
			/* alertify.confirm("Do You Really Want to Delete This..?", function (a) {
			if (a) { */
				$(this).parent('div').parent('div').parent('div').parent('div').remove(); x--;
			/* }}); */
		})
		
		$('.removediv1').click(function(e){
			$(this).parent('div').parent('div').parent('div').parent('div').parent('div').remove(); x--;
		})
		
		var max_fields      = 5;
		var wrapper         = $(".input_fields_wrap");
		var add_button      = $(".add_field_button");
	   
		var x = 1;
		$(add_button).click(function(e){ 				
			e.preventDefault();
			if(x < max_fields)
			{ 				
				$(wrapper).append('<div class="in"><div class="remove"><div class="col-lg-6 col-md-6 col-sm-3 col-xs-12"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">College Name</label><input type="text" class="form-control" name="edu['+x+'][CollegeName]" id="CollegeName" placeholder="College name" /></div></div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">University</label><input type="text" class="form-control" name="edu['+x+'][UniversityName]" id="UniversityName" placeholder="University Name" /></div></div></div></div><div class="col-lg-6 col-md-6 col-sm-3 col-xs-12"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Location</label><input type="text" class="form-control" name="edu['+x+'][Location]" id="Location" placeholder="Location" /></div></div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Course</label><input type="text" class="form-control" name="edu['+x+'][CourseName]" id="CourseName" placeholder="Course Name" /></div></div></div></div><div class="col-lg-6 col-md-6 col-sm-3 col-xs-12"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Branch/Stream</label><input type="text" class="form-control" name="edu['+x+'][BatchName]" id="BatchName" placeholder="Batch/Stream Name" /></div></div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Year of Passout</label><input type="text" class="form-control" name="edu['+x+'][YearOfPass]" id="YearOfPass" placeholder="YearOfPass" maxlength="4" /></div></div></div></div><div class="col-lg-6 col-md-6 col-sm-3 col-xs-12"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Aggregate</label><input type="text" class="form-control" name="edu['+x+'][AggregatePercent]" id="AggregatePercent" placeholder="Aggregate" maxlength="2" /></div></div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">&nbsp;</label><button class="form-control btn btn-danger remove_field" type="button"><i class="fa fa-trash-o"></i></button></div></div></div></div></div>');
				x++;				
				$('.YearOfPass').datepicker({
				});
				$('.remove_field').click(function(e){
						$(this).parent('div').parent('div').parent('div').parent('div').parent('div').remove(); x--;
				})
			}	
			else
				alertify.alert("Only 5 Details");
		});
		
		$(".customclass").change(function() {
			var test = $(this).val();
			if(test == '2')
				$("#experincediv").show();
			else
				$("#experincediv").hide();			
		});
		
		var max_fields1      = 5;
		var wrapper1         = $(".input_fields_ex");
		var add_button1      = $(".add_exfield_button");
	   
		var y = 1;
		$(add_button1).click(function(e){ 
			e.preventDefault();
			if(y < max_fields1)
			{ 
				
				$(wrapper1).append('<div class="india"><div class="remove"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="row"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Experierce Type</label><select style="width:100%;" id="ExperienceTypeId" name="exp['+y+'][ExperienceTypeId]" multiple><option value="">Select Experience Type</option><option value="1">Internship</option><option value="2">Job</option><option value="3">Project work</option><option value="4">R&amp;D</option></select></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Company Name</label><input type="text" class="form-control" name="exp['+y+'][CompanyName]" id="CompanyName" placeholder="Company Name" /></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Year Starting</label><input type="text" class="form-control form_date" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd" name="exp['+y+'][StartDate]" id="StartDate" placeholder="Year Starting"  /></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Year End</label><input type="text" class="form-control form_date" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd" name="exp['+y+'][EndDate]" id="EndDate" placeholder="Year End"  /></div></div></div><div class="row"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Designation</label><input type="text" class="form-control" name="exp['+y+'][Designation]" id="Designation" placeholder="Designation" /></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Work Profile</label><input type="text" class="form-control" name="exp['+y+'][WorkProfile]" id="WorkProfile" placeholder="Work Profile" /></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr" id="pwd">	<label class="control-label">&nbsp;</label><button class="form-control btn btn-danger remove_field1" type="button"><i class="fa fa-trash-o"></i></button></div></div></div></div></div></div>');
				y++; 
				
				$(document).ready(function () {                
				   $('.form_date').datetimepicker({
						language:  'fr',
						weekStart: 1,
						todayBtn:  0,
						autoclose: 1,
						todayHighlight: 1,
						startView: 2,
						minView: 2,
						forceParse: 0
					});            
				});
				
				$('.remove_field1').click(function(e){
						$(this).parent('div').parent('div').parent('div').parent('div').parent('div').parent('div').remove(); x--;
				})
			}	
			else
				alertify.alert("Only 5 Details");
		});
	
		jQuery.validator.addMethod("lettersonly", function(value, element) 
		{
			return this.optional(element) || /^[a-z ]+$/i.test(value);
		}, "Letters and spaces only please");
		$("#profile-form").validate({
			rules: {
				MobileNo: {
					required: true,
					number: true
				},
				email: {
					required: true,
					email: true
				},
				Password: { 
					required: true,
                    minlength: 6,
                    maxlength: 10,

				}, 
                cfmPassword: { 
                    equalTo: "#Password",
                    minlength: 6,
                    maxlength: 10
				},
				CollegeName: {
					required: true,
					lettersonly: true
				},
				UniversityName: {
					required: true,
					lettersonly: true
				},
				Location: {
					required: true,
					lettersonly: true
				},
				CourseName: {
					required: true,
					lettersonly: true
				},
				BatchName: {
					required: true,
					lettersonly: true
				},
				YearOfPass: {
					required: true,
					number: true
				},
				AggregatePercent: {
					required: true,
					number: true,
				},
				ExperienceTypeId: {
					required: true,
				},
				CompanyName: {
					required: true,
				},
				Designation: {
					required: true,
				},
				WorkProfile: {
					required: true,
				},
				FatherName: {
					required: true,
					lettersonly: true,
				},
				PinCode: {
					required: true,
					number: true,
				},
				CVPath: {
					required: true,
					extension: "docx|rtf|doc|pdf",
				},
			},
			errorPlacement: function(){
				return false;
			}, 
			submitHandler: function() {
				dataString = $("form#profile-form").serialize();
				$.ajax({
					url: base+"AdminStudents/StudentADD",
					type:"POST",
					data: dataString,
					cache: false,
					dataType: 'json',
					enctype: 'multipart/form-data',
					beforeSend: function(res){
						
						//console.log($("form#profile-form").serialize())
						/* return false; */
						$('#Submit').prop('disabled', true);
					},
					complete: function(){
						//alert(res);
						$('#Submit').prop('disabled', false);
					},
					
					success: function(data)
						{
							if(data==1)
							{								
								$('#AlertMsg').removeClass('alert-danger');
								$('#AlertMsg').addClass('alert-success');
								$('#AlertMsg').html('Student Added Successfully');
								$('#AlertMsg').show();
								window.location.href = base+"AdminStudents";
							}
							if(data==2)
							{
								$('#AlertMsg').removeClass('alert-success');
								$('#AlertMsg').addClass('alert-danger');
								$('#AlertMsg').html('Email Already Exists');
								$('#AlertMsg').show();
							}
							else if((data==0) || (data==3))
							{
								$('#testsub').prop('disabled',false);
								$('#addedit_alert').removeClass('alert-success');
								$('#addedit_alert').addClass('alert-danger');
								$('#addedit_alert').html('Error Updating Please ty after some time..');
								$('#addedit_alert').show();
								setTimeout(function(){ $('#addedit_alert').hide(); }, 3000);
							}
						}
					
				})
				
			}
		});
		
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
							/* if(x)
								x.abort(); */
								$.ajax({
									url:base+"AdminStudents/Add_img",
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
										if(data !='')
										{    
											data = $.trim(data);
											$('#PhotoImage').attr('src',base+'/'+data);
										}
									}
								});
						}
					};
					
				}
				
			});
		
	});