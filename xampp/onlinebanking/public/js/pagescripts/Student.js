$(document).ready(function() {
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
		
		var max_fields      = 5;
		var wrapper         = $(".input_fields_wrap");
		var add_button      = $(".add_field_button");
	   
		var x = 1;
		$(add_button).click(function(e){
			/* e.preventDefault();
			if(x < max_fields)
			{ 	 */			
				$(wrapper).append('<div class="in'+x+' col-md-12"><div class="remove"><div class="col-lg-6 col-md-6 col-sm-3 col-xs-12"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">College Name</label><select  name="edu['+x+'][CollegeName]" id="CollegeName" style="width:100%">'+collegeoptions+'</select></div></div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">University</label><select name="edu['+x+'][UniversityName]" id="UniversityName" style="width:100%">'+universityoptions+'</select></div></div></div></div><div class="col-lg-6 col-md-6 col-sm-3 col-xs-12"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Location</label><input type="text" class="form-control address null" name="edu['+x+'][Location]" id="Location" placeholder="Location" /></div></div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Course</label><select name="edu['+x+'][CourseName]" id="CourseName" style="width:100%">'+courseoptions+'</select></div></div></div></div><div class="col-lg-6 col-md-6 col-sm-3 col-xs-12"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Branch/Stream</label><select name="edu['+x+'][BatchName]" id="BatchName" style="width:100%;">'+branchoptions+'</select></div></div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Year of Passout</label><select  id="YearOfPass" name="edu['+x+'][YearOfPass]" style="width:100%;">'+options+'</select></div></div></div></div><div class="col-lg-6 col-md-6 col-sm-3 col-xs-12"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Aggregate</label><input type="text" class="form-control null" name="edu['+x+'][AggregatePercent]" id="AggregatePercent" placeholder="Aggregate" maxlength="2" /></div></div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">&nbsp;</label><select name="edu['+x+'][Percentage]" id="Percentage" style="width:100%"><option value="">Select Aggregate type</option><option value="Percentage">Percentage (%)</option><option value="CGPA" >CGPA</option></select></div></div></div></div><div class="col-lg-3 col-md-3 col-sm-12 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">&nbsp;</label><button class="form-control btn btn-danger remove_field " rid="'+x+'" type="button"><i class="fa fa-trash-o"></i></button></div></div></div></div></div></div>');
				 x++;				
				/*$('.YearOfPass').datepicker({
				}); */
				blurfun();
				$('.remove_field').click(function(e){
						//$(this).parent('div').parent('div').parent('div').parent('div').parent('div').remove(); x--;
						
						var rid = $(this).attr('rid');
						$('.in'+rid).remove();x--;
				})
				$('select').select2();
			/* }	
			else
				alertify.alert("Only 5 Details"); */
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
			/* if(y < max_fields1)
			{  */
				
				$(wrapper1).append('<div class="india"><div class="remove"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="row"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Experierce Type</label><select style="width:100%;" id="ExperienceTypeId" name="exp['+y+'][ExperienceTypeId]" ><option value="">Select Experience Type</option><option value="1">Internship</option><option value="2">Job</option><option value="3">Project work</option><option value="4">R&amp;D</option></select></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Company Name</label><input type="text" class="form-control name null" name="exp['+y+'][CompanyName]" id="CompanyName" placeholder="Company Name" /></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Year Starting</label><input type="text" class="form-control null  StartDate'+y+'"  name="exp['+y+'][StartDate]" id="StartDate'+y+'" placeholder="Year Starting" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd" /></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Year End</label><input type="text" class="form-control null EndDate'+y+' "  name="exp['+y+'][EndDate]" id="EndDate'+y+'" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd"   placeholder="Year End"  /></div></div></div><div class="row"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Designation</label><input type="text" class="form-control name null" name="exp['+y+'][Designation]" id="Designation" placeholder="Designation" /></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr"><label class="control-label">Work Profile</label><input type="text" class="form-control address null" name="exp['+y+'][WorkProfile]" id="WorkProfile" placeholder="Work Profile" /></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="form-group no-margin-hr" id="pwd">	<label class="control-label">&nbsp;</label><button class="form-control btn btn-danger remove_field1" type="button"><i class="fa fa-trash-o"></i></button></div></div></div></div></div></div>');
				
				blurValidations();
				$('select').select2();
				$('.StartDate'+y).datetimepicker({
					language:  'fr',
					weekStart: 1,
					todayBtn:  0,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					minView: 2,
					forceParse: 0,
					todayBtn:  1,
					autoclose: true,
				 }).on('changeDate', function (selected) {
					var get_class = $(this).attr('id');
					var id_no = get_class.substr(get_class.length - 1); 
					var minDate12 = new Date(selected.date.valueOf());
					$('.EndDate'+id_no).datetimepicker('setStartDate', minDate12);
				});
				
				$('.EndDate'+y).datetimepicker({
					language:  'fr',
					weekStart: 1,
					todayBtn:  0,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					minView: 2,
					forceParse: 0
				 }).on('changeDate', function (selected) {
					 var get_class = $(this).attr('id');
					var id_no = get_class.substr(get_class.length - 1); 
					var minDate12 = new Date(selected.date.valueOf());
					$('.StartDate'+id_no).datetimepicker('setEndDate', minDate12);
				});
				
				y = y+1;
				//
				$('.remove_field1').click(function(e){
						$(this).parent('div').parent('div').parent('div').parent('div').parent('div').parent('div').remove(); y--;
				})
			/* }	
			else
				alertify.alert("Only 5 Details"); */
		});
	
		/* jQuery.validator.addMethod("lettersonly", function(value, element) 
		{
			return this.optional(element) || /^[a-z ]+$/i.test(value);
		},  "Letters and spaces only please");*/
		/*$("#profile-form").validate({ 
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
						 return false;
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
		}); */
		
		$('#Savedetails').click(function(){			
			
			var invalid = '0';
			var KnownLanguages = $.trim($('#KnownLanguages').val());
			var InterestedIn = $.trim($('#InterestedIn').val());
			var state = $.trim($('#state').val());
			var Password = $.trim($('#Password').val());	
			var cfmPassword = $.trim($('#cfmPassword').val());
			
			 $('.null').each(function(){
				var val = $.trim($(this).val());
				var id = $(this).attr('id');
				if(val == '')
				{
					invalid = '1';
					$(this).css('border','1px solid red');
				}
				else
					$(this).css('border','');
				}); 
				
				if(state == '')
				{
					invalid = '1';
					$('#s2id_state').css('border','1px solid red');
				}
				if(KnownLanguages == '')
				{
					invalid = '1';
					$('#s2id_KnownLanguages').css('border','1px solid red');
				}
				if(InterestedIn == '')
				{
					invalid = '1';
					$('#s2id_InterestedIn').css('border','1px solid red');
				}
				if(Password != '' && cfmPassword != '')
				{
					if(Password != cfmPassword)
					{
						invalid = '1';
						alertify.alert('<p >Password and Confirm password are not matched</p>');
					}
				}
				if(invalid == '0')
				{
					$('#process').show();
					dataString = $("form#profileform").serializeArray();
					$.ajax({
						url :  base+"AdminStudents/StudentADD",
						data : dataString,
						type : 'POST',
						complete : function(){$('#process').hide();},
						success : function(data){
							
							var res  = $.parseJSON(data);
							if(res.err == '1')
							{
								alertify.alert('<p style="color:green">'+res.msg+'</p>')
								window.location.href = base+"AdminStudents";
							}
							else
							{
								alertify.alert('<p style="color:red">'+res.msg+'</p>')
							}
						}
					})
				}
		})
		
		
		 $('#PhotoImagePath').change(function(){
				var file = this.files[0];
				var name = file.name;
				var size = file.size;
				
				var type = file.type;
				var error=0;
				if(file.name.length < 1) {
					alertify.alert("Invalid File name")
					$('#PhotoImagePath').val('');
					error=1;
				}
				else if(file.size > 2000000) {
						alertify.alert("File is too big, Max allowed size: 2MB");
						$('#PhotoImagePath').val('');
						error=1;
				}
				else if(file.type != 'image/png' && file.type != 'image/jpg' && !file.type != 'image/gif' && file.type != 'image/jpeg' ) {
					alertify.alert("File doesnt match png, jpg or gif");
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
							alertify.alert("Please upload Images with atleast 200 x 200 resolution");
							$('#PhotoImagePath').val('');
							return false;
						}
						else
						{
							var reader = new FileReader();
							reader.onloadend = function() {
								$("#PhotoImage").attr("src",reader.result);
							}
							reader.readAsDataURL(file);
							$("#PhotoImage").show();
						
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
	function blurfun()
	{
		$('.Aggregate').blur(function(){
			
			var numPattren = /[^0-9.]/g ;
			if(numPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				$(this).css('border','')
			}	
			
		})
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
	}
	function blurValidations()
	{
		$('.name').blur(function(){
			var namePattren = /^[a-zA-Z][a-zA-Z ]+$/ ;
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