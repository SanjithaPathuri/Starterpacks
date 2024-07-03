var cpage =1;
$(function(){
	if($.trim(err) == '0')
	{
		console.log(err);
		alertify.log(subscribe, "", 0);
	}
	else if($.trim(err)  == '1')
	{
		alertify.success(subscribe);
	}
	blurValidations();
	get_postjobs(cpage);
	$('#AddClick').click(function(){
		CKEDITOR.instances['Keyskills'].setData('');
		CKEDITOR.instances['Description'].setData('');
		showtab();
	});
	$('#CancelClick').click(function(){
		hidetab();
	});
	$('#SubmitClick').click(function(){
		validate();
	});
});

function editfun(jobid)
{
	showtab();	
	$.ajax({
			type: "POST",
			url: base_url+"Companydashboard/get_jobs_by_id",
			data : "jobid="+jobid,
			success: function(data)
			{
				var obj = JSON.parse(data);
				CKEDITOR.instances['Keyskills'].setData(obj.Keyskills);
				CKEDITOR.instances['Description'].setData(obj.Description);
				$('#Jobid').val(jobid);
				$("#JobTitle").val(obj.JobTitle);
				$("#JobLocation").val(obj.JobLocation);
				$("#Eligibility").val(obj.Eligibility);
				$("#StartDate").val(obj.StartDate);
				($("#SubscriptionId").val(obj.SubscriptionId))
				$("#EndDate").val(obj.EndDate);
				$("#PostedOn").val(obj.PostedOn);
				$("#JobType").val(obj.JobType);
				$("#CurrentOpenings").val(obj.CurrentOpenings);
				$("#ExperienceFrom").val(obj.ExperienceFrom);
				$("#ExperienceTo").val(obj.ExperienceTo);
				$("#Category").val(obj.CategoryId);
				$("#Userstatus").val(obj.Userstatus);
			}
		});
}

function validate()
{
	var jobtitle = $.trim($("#JobTitle").val());
	var jobloc = $.trim($("#JobLocation").val());
	var elig = $.trim($("#Eligibility").val());
	var stdate = $.trim($("#StartDate").val());
	var enddate = $.trim( $("#EndDate").val());
	var jobtype = $.trim($("#JobType").val());
	var ExperienceFrom = $.trim($("#ExperienceFrom").val());
	var ExperienceTo = $.trim($("#ExperienceTo").val());
	var Category = $.trim($("#Category").val());
	var Userstatus = $.trim($("#Userstatus").val());
	//var subscription = $.trim($("#SubscriptionId").val());
	var CurrentOpenings = $.trim($("#CurrentOpenings").val());
	var Keyskills = $.trim(CKEDITOR.instances.Keyskills.getData());
	var desc = $.trim(CKEDITOR.instances.Description.getData());
	var fjerr = '';
	
	if(jobtitle == '')
	{
		fjerr = 1;
		$("#JobTitle").css('border','1px solid red');
	}
	else
		$("#JobTitle").css('border','');
	
	if(jobloc == '')
	{
		fjerr = 1;
		$("#JobLocation").css('border','1px solid red');
	}
	else
		$("#JobLocation").css('border','');
	
	if(elig == '')
	{
		fjerr = 1;
		$("#Eligibility").css('border','1px solid red');
	}
	else
		$("#Eligibility").css('border','');
	
	if(stdate == '')
	{
		fjerr = 1;
		$("#StartDate").css('border','1px solid red');
	}
	else
		$("#StartDate").css('border','');
	
	if(enddate == '')
	{
		fjerr = 1;
		$("#EndDate").css('border','1px solid red');
	}
	else
		$("#EndDate").css('border','');
	
	if(jobtype == '')
	{
		fjerr = 1;
		$('#JobType').css('border','1px solid red');
	}
	else
		$('#JobType').css('border','');
	
	/* if(subscription == '')
	{
		fjerr = 1;
		$('#SubscriptionId').css('border','1px solid red');
	}
	else
		$('#SubscriptionId').css('border',''); */
	
	if(Keyskills == '')
	{
		fjerr = 1;
		$("#cke_Keyskills").css('border','1px solid red');
	}
	else
		$("#cke_Keyskills").css('border','');
	if(desc == '')
	{
		fjerr = 1;
		$("#cke_Description").css('border','1px solid red');
	}
	else
		$("#cke_Description").css('border','');
	if(CurrentOpenings == '')
	{
		fjerr = 1;
		$("#CurrentOpenings").css('border','1px solid red');
	}
	else
		$("#CurrentOpenings").css('border','');
	
	if(Keyskills == '')
	{
		fjerr = 1;
		$("#cke_Keyskills").css('border','1px solid red');
	}
	else
		$("#cke_Keyskills").css('border','');
	
	
	if(ExperienceFrom == '')
	{
		fjerr = 1;
		$("#ExperienceFrom").css('border','1px solid red');
	}
	else
		$("#ExperienceFrom").css('border','');
	if(ExperienceTo == '')
	{
		fjerr = 1;
		$("#ExperienceTo").css('border','1px solid red');
	}
	else
		$("#ExperienceTo").css('border','');
	if(Category == '')
	{
		fjerr = 1;
		$('#Category').css('border','1px solid red');
	}
	else
		$('#Category').css('border','');
	if(Userstatus == '')
	{
		fjerr = 1;
		$('#Userstatus').css('border','1px solid red');
	}
	else
		$('#Userstatus').css('border','');
	
	if(fjerr == '')
	{
		$('#jobform').removeAttr('onsubmit');
		$('#jobform').trigger('submit');
	}
	else
	{
		//alert();
	}
	
}

function showtab()
{
	$('#jobform').show();
	$('#SubmitClick').show();
	$('#CancelClick').show();
	$('#AddClick').hide();
	
	$("#JobTitle").val("");
	$("#JobTitle").css('border','');
	$("#OrganisationName").val("");
	$("#OrganisationName").css('border','');
	$("#JobLocation").val("");
	$("#JobLocation").css('border','');
	$("#Eligibility").val("");
	$("#Eligibility").css('border','');
	$("#StartDate").val("");
	$("#StartDate").css('border','');
    $("#EndDate").val("");
    $("#EndDate").css('border','');
	//$("#subscription").val("");
	$("#SubscriptionId").val("");
	$("#SubscriptionId").css('border','');
	$("#Userstatus").val("");
	$("#Userstatus").css('border','');
	
	$("#JobType").val("");
	$("#JobType").css('border','');
	
	$("#Id").val("");
	$("#status").val("");
	$("#status").css('border','');
	$("#ExperienceFrom").val("");
	$("#ExperienceTo").val("");
	$("#ExperienceFrom").css('border','');
	$("#ExperienceTo").css('border','');
	$("#Category").val("");
	$("#CurrentOpenings").val("");
	$("#Category").css('border','');
	$("#CurrentOpenings").css('border','');
	$('#cke_Keyskills').css('border','');
	$('#cke_Description').css('border','');
	$('#showhide').show();
	$('#jobform').trigger('reset');
}

function hidetab()
{
	$('#jobform').hide();
	$('#CancelClick').hide();
	$('#AddClick').show();
	$('#SubmitClick').hide();
}

 
function get_postjobs(page)
{
	var SearchKey=$('#SearchKey').val();
	var SearchStatus=$('#SearchStatus').val();
	$.ajax({
				url: base_url+"Companydashboard/get_postjobs",
				type:"POST",
				data: {'SearchKey':SearchKey,'SearchStatus':SearchStatus,'page':page},
				success: function(data)
				{
					var html = '';
					var data = $.parseJSON(data);
					if(data.subjects!='')
					{
						var n=0;
						$.each(data.subjects,function(i)
						{
							n++;
							var v = data.subjects[i];
							
							html+='<tr>';
							html+='<td class="text-center">'+n+'</td>';
							html+='<td class="text-center">'+v.JobTitle+'</td>';
							html+='<td class="text-center">'+v.JobType+'</td>';
							html+='<td class="text-center">'+v.JobLocation+'</td>';
							html+='<td class="text-center">'+v.Eligibility+'</td>';
							html+='<td class="text-center">'+v.StartDate+'</td>';
							html+='<td class="text-center">'+v.EndDate+'</td>';
							//html+='<td class="text-center"><button class="btn btn-xs btn-info mar-b5" name="editblogpost" onclick="getview('+v.CientId+')">View</button></td>';
							html+='<td class="text-center">';
							if(v.Userstatus==1)
							{
								html+='<button class="btn btn-xs btn-success mar-b5" >Active</button>';
							}
							else
							{
								html+='<button class="btn btn-xs btn-danger mar-b5" >In Active</button>';
							}
								html+='</td>';
							html+='<td class="text-center">';
							
							if(v.status==1)
							{
								html+='<button class="btn btn-xs btn-success mar-b5" >Approved</button>';
							}
							else
							{
								html+='<button class="btn btn-xs btn-warning mar-b5" >Pending</button>';
							}
							
							html+='</td>';
							html+='<td text-center><button class="btn btn-xs btn-primary mar-b5" name="editblogpost" onclick="editfun('+v.Id+')"><i class="fa fa-pencil"></i></button> &nbsp';
							html+='<button class="btn btn-xs btn-danger mar-b5" name="trashblogpost" onclick="deletefun('+v.Id+')"><i class="fa fa-trash-o"></i></button></td>';
							
							html+='</tr>';
						});
					}
					else
					html+="No Records Found.."; 
					$('#showdata').html(html);
					$('#pagination').html(data.pagination);
					$("body").on("click",'.pagination li',function(){
						cpage = $(this).attr('page');
						 get_postjobs(cpage);
					})
				}
			});
}

function deletefun(jobid)
{
	alertify.confirm("Do you really want to delete the job ?", function (e) 
	{
		if (e) 
		{
			$.ajax({
					type: "POST",
					url: base_url+"Companydashboard/DeleteJob",
					data : "jobid="+jobid,
					success: function(data)
					{
						alertify.error("your record has been deleted successfully");
						get_postjobs(cpage);
					}
			});
		}
	});
}


	/************CK EDITER Starts************/
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
			CKEDITOR.replace( 'Description' );
			CKEDITOR.replace( 'Keyskills' );
			CKEDITOR.replace( 'editor2',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor3',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor4',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor5',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor6',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor7',{customConfig : 'config-image.js'});
			
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
initSample();
/************CK EDITER Ends************/
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
		$('.aggregate').blur(function(){
			var numPattren = /[^0-9]/g ;
			if(numPattren.test($(this).val()))
			{
				$(this).val('');
				$(this).css('border','1px solid red')
			}
			else
			{
				if($.trim($(this).val()) > 100)
				{
					$(this).val('');
					$(this).css('border','1px solid red')
				}
				else
					$(this).css('border','')
			}	
		});
		$('#ExperienceTo').blur(function(){
			var ExpFrom = parseInt($.trim($('#ExperienceFrom').val()));
			var ExpTo	= parseInt($.trim($('#ExperienceTo').val()));
			if(ExpTo < ExpFrom)
			{
				$('#ExperienceTo').css('border','1px solid red');
				$('#ExperienceFrom').css('border','1px solid red');
				$('#ExperienceTo').val('');
			}
			else
			{
				$('#ExperienceTo').css('border','');
				$('#ExperienceFrom').css('border','');
			}
		});
		$('#ExperienceFrom').blur(function(){
			var ExpFrom = parseInt($.trim($('#ExperienceFrom').val()));
			var ExpTo	= parseInt($.trim($('#ExperienceTo').val()));
			if(ExpTo < ExpFrom) 
			{
				$('#ExperienceTo').css('border','1px solid red');
				$('#ExperienceFrom').css('border','1px solid red');
				$('#ExperienceTo').val('');
			}
			else
			{
				$('#ExperienceTo').css('border','');
				$('#ExperienceFrom').css('border','');
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
		
	}