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
				$(wrapper).append('<div class="in" style="float: left;"><div class="remove"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="CollegeName" class="col-sm-12 control-label">College Name:</label><div class="col-sm-12"><input type="text" class="form-control" name="edu['+x+'][CollegeName]" id="CollegeName" placeholder="College name"/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="University" class="col-sm-12 control-label">University:</label><div class="col-sm-12"><input type="text" class="form-control" name="edu['+x+'][UniversityName]" id="UniversityName" placeholder="University Name"/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="citydesrict" class="col-sm-12 control-label">Location:</label><div class="col-sm-12"><input type="text" class="form-control" name="edu['+x+'][Location]" id="Location" placeholder="Location"/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="course" class="col-sm-12 control-label">Course:</label><div class="col-sm-12"><input type="text" class="form-control" name="edu['+x+'][CourseName]" id="CourseName" placeholder="Course Name"/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="course" class="col-sm-12 control-label">Branch/Stream:</label><div class="col-sm-12"><input type="text" class="form-control" name="edu['+x+'][BatchName]" id="BatchName" placeholder="Batch/Stream Name"/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="YearOfPass" class="col-sm-12 control-label">Year of Passout:</label><div class="col-sm-12"><input type="text" class="form-control" name="edu['+x+'][YearOfPass]" id="YearOfPass" placeholder="YearOfPass" maxlength="4" /></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="AggregatePercent" class="col-sm-12 control-label">Aggregate:</label><div class="col-sm-12"><input type="text" class="form-control" name="edu['+x+'][AggregatePercent]" id="AggregatePercent" placeholder="Aggregate" maxlength="2" /></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label class="col-sm-12 control-label">&nbsp;</label><div class="col-sm-12"><button class="btn btn btn-danger remove_field" type="button"><i class="fa fa-trash-o"></i></button></div></div></div></div></div>');
				x++;
				$('.remove_field').click(function(e){
						$(this).parent('div').parent('div').parent('div').parent('div').remove(); x--;
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
				
				$(wrapper1).append('<div class="india" style="float:left;"><div class="remove"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="experiercetype" class="col-sm-12 control-label">Experierce Type:</label><div class="col-sm-12"><select class="form-control" name="exp['+y+'][ExperienceTypeId]" id="ExperienceTypeId"><option value="">Select Experience Type</option><option value="1">Internship</option><option value="2">Job</option><option value="3">Project work</option><option value="4">R&amp;D</option></select></div></div></div><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="companyname" class="col-sm-12 control-label">Company Name:</label><div class="col-sm-12"><input type="text" class="form-control" name="exp['+y+'][CompanyName]" id="CompanyName" placeholder="Company Name"/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="yearstarting" class="col-sm-12 control-label">Year Starting:</label><div class="col-sm-12"><input type="text" class="form-control StartDate" name="exp['+y+'][StartDate]" id="StartDate" placeholder="Year Starting" readonly/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="yearend" class="col-sm-12 control-label">Year End:</label><div class="col-sm-12"><input type="text" class="form-control EndDate" name="exp['+y+'][EndDate]" id="EndDate" placeholder="Year End" readonly /></div></div></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="designation" class="col-sm-12 control-label">Designation:</label><div class="col-sm-12"><input type="text" class="form-control" name="exp['+y+'][Designation]" id="Designation" placeholder="Designation"/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="workprofile" class="col-sm-12 control-label">Work Profile:</label><div class="col-sm-12"><input type="text" class="form-control" name="exp['+y+'][WorkProfile]" id="WorkProfile" placeholder="Work Profile"/></div></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="form-group"><label for="workprofile" class="col-sm-12 control-label">&nbsp;</label><div class="col-sm-12"><button class="btn btn btn-danger remove_field1" type="button"><i class="fa fa-trash-o"></i></button></div></div></div></div></div>');
				y++; 
				
				$('.StartDate').datepicker({
				});
				$('.EndDate').datepicker({
				});
				
				$('.remove_field1').click(function(e){
						$(this).parent('div').parent('div').parent('div').parent('div').parent('div').remove(); x--;
				})
			}	
			else
				alertify.alert("Only 5 Details");
		});
	
	
		$('#Savedetails').click(function(){		
			var valid;	
			valid = validations();
			if(valid)
			{			
				
			}
			
		});	
	
		function validations() {
			var valid = true;
			jQuery.validator.addMethod("lettersonly", function(value, element) 
			{
				return this.optional(element) || /^[a-z ]+$/i.test(value);
			}, "Letters and spaces only please");
			var condition = '';
			if(cvPath == '')
				condition = true;
			else
				condition = false;
			 
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
					OtherEmail: {
						required: true,
						email: true
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
						number: true,
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
						lettersonly: true
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
						required: condition,
						extension: "docx|rtf|doc|pdf",
					},
				},
				errorPlacement: function(){
					return false;
				}, 
				submitHandler: function() {
					dataString = $("form#profile-form").serialize();
					$.ajax({
						url: base+"Student/studentprofileaj",
						type:"POST",
						data: dataString,
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
								$('#Alert').removeClass('alert-danger');
								$('#Alert').addClass('alert-success');
								$('#Alert').html('Profile Updated Successfully..!');
								$('#Alert').show();
								location.reload()
							}
							else
							{
								$('#Alert').removeClass('alert alert-success');
								$('#Alert').addClass('alert alert-danger');
								$('#Alert').html('Please try again.....');
								$('#Alert').show();
							}
						}
						
					})
				}
			});
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
					alert("Invalid File name")
					$('#CVPath').val('');
					error=1;
				}				
				else if(file.type != 'application/msword' && file.type != 'application/pdf' ) {
					alert("File doesnt match DOC,DOCX");
					$('#CVPath').val('');
					error=1;
				}
				else{					
						var data = new FormData();
						data.append("CVPath", file);
						$.ajax({
							url:base+"Student/pro_cv",
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
								if(data==9)
								{
									$('#AlertMsg').removeClass('alert-danger');
									$('#AlertMsg').addClass('alert-success');
									$('#AlertMsg').html('CV Updated Successfully');
									$('#AlertMsg').show();
								}
								else
								{
									$('#AlertMsg').removeClass('alert alert-success');
									$('#AlertMsg').addClass('alert alert-danger');
									$('#AlertMsg').html('Please try again with a different Doc File');
									$('#AlertMsg').show();
								}
							}
						});
					
				}
				
			});
	
	});