var cpage =1;
$(function(){
	get_postjobs(cpage);
	$("body").on("click",'.pagination li',function(){
		cpage = $(this).attr('page');
		 get_postjobs(cpage);
	})
					
	$('#AddClick').click(function(){
		showtab();
	});
	$('#CancelClick').click(function(){
		hidetab();
	});
	$('#SubmitClick').click(function(){
		validate();
	});
	$('#search_form').submit(function(){
		get_postjobs(cpage);
	});
	
	
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
});

function validate()
{
	var jobtitle = $.trim($("#JobTitle").val());
	var org = $.trim($("#OrganisationName").val());
	var jobloc = $.trim($("#JobLocation").val());
	var elig = $.trim($("#Eligibility").val());
	var stdate = $.trim($("#StartDate").val());
	var enddate = $.trim( $("#EndDate").val());
	var jobtype = $.trim($("#JobType").val());
	var status = $.trim($("#status").val());
	var ExperienceFrom = $.trim($("#ExperienceFrom").val());
	var ExperienceTo = $.trim($("#ExperienceTo").val());
	var Category = $.trim($("#Category").val());
	var CurrentOpenings = $.trim($("#CurrentOpenings").val());
	var subscription = $.trim($("#SubscriptionId").val());
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
	
	if(org == '')
	{
		fjerr = 1;
		$('#s2id_OrganisationName').css('border','1px solid red')
	}
	else
		$('#s2id_OrganisationName').css('border','')
	
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
		//$("#Eligibility").css('border','1px solid red');
		$("#s2id_Eligibility").css('border','1px solid red');
	}
	else
		$("#s2id_Eligibility").css('border','');
	
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
		$("#s2id_JobType").css('border','1px solid red');
	}
	else
		$("#s2id_JobType").css('border','');
	
	if(subscription == '')
	{
		fjerr = 1;
		$("#s2id_SubscriptionId").css('border','1px solid red');
	}
	else
		$("#s2id_SubscriptionId").css('border','');
	
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
	if(status == '')
	{
		fjerr = 1;
		$("#s2id_status").css('border','1px solid red');
	}
	else
		$("#s2id_status").css('border','');
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
		$("#s2id_Category").css('border','1px solid red');
	}
	else
		$("#s2id_Category").css('border','');
	
	if(CurrentOpenings == '')
	{
		fjerr = 1;
		$("#CurrentOpenings").css('border','1px solid red');
	}
	else
		$("#CurrentOpenings").css('border','');
	
	if(fjerr == '')
	{
		$('#jobform').removeAttr('onsubmit');
	//	$('#jobform').trigger('submit');
	}
}

function showtab()
{
	$("#JobTitle").val("");
	$("#JobTitle").css('border-color','');
	//$("#OrganisationName").val("");
	$("#OrganisationName").select2('val','');
	$("#s2id_OrganisationName").css('border','');
	$("#JobLocation").val("");
	$("#JobLocation").css('border-color','');
	//$("#Eligibility").val("");
	$("#Eligibility").select2('val','');
	$("#s2id_Eligibility").css('border-color','');
	$("#StartDate").val("");
	$("#StartDate").css('border-color','');
    $("#EndDate").val("");
    $("#EndDate").css('border-color','');
	//$("#SubscriptionId").val("");
	$("#SubscriptionId").select2('val','');
	$("#s2id_SubscriptionId").css('border','');
	
	//$("#JobType").val("");
	$("#JobType").select2('val','');
	$("#s2id_JobType").css('border','');
	
	$('#AddClick').hide();
	$('#SubmitClick').show();
	$('#CancelClick').show();
	$("#Id").val("");
	//$("#status").val("");
	$("#status").select2('val','');
	
	$("#s2id_status").css('border','');
	
	$("#ExperienceTo").val("");
	$("#ExperienceFrom").val("");
	$("#ExperienceTo").css('border-color','');
	$("#ExperienceFrom").css('border-color','');
	//$("#Category").val("");
	$("#Category").select2('val','');
	$("#s2id_Category").css('border','');
	$("#CurrentOpenings").val("");
	$("#CurrentOpenings").css('border-color','');
	
	CKEDITOR.instances['Keyskills'].setData("");
	$('#cke_Keyskills').css('border','');
	CKEDITOR.instances['Description'].setData("");
	$('#cke_Description').css('border','');
	$('#showhide').show();
}

function hidetab()
{
	$('#showhide').hide();
	$('#SubmitClick').hide();
	$('#CancelClick').hide();
	$('#AddClick').show();
}

function editfun(jobid)
{
	$("#showhide").css("display","block");
	$.ajax({
			type: "POST",
			url: base_url+"Findjob/EditJob",
			data : "jobid="+jobid,
			success: function(data)
			{
				$('#SubmitClick').show();
	            $('#CancelClick').show();
				var obj = JSON.parse(data);
			//	console.log(obj.SubscriptionId);
				//var Mtimg = '<?php echo base_url() ?>images/Managementteam/'+obj.Mtimg;
				$("#JobTitle").val(obj.JobTitle);
				$("#OrganisationName").select2('val',obj.OrganisationName);
				//$("#OrganisationName").val(obj.OrganisationName);
				$("#JobLocation").val(obj.JobLocation);
				$("#Eligibility").select2('val',obj.Eligibility);
				//$("#Eligibility").val(obj.Eligibility);
				$("#StartDate").val(obj.StartDate);
				$("#SubscriptionId").select2('val',obj.SubscriptionId);
				//$("#SubscriptionId").val(obj.SubscriptionId);
				//Console.log($("#SubscriptionId").val(obj.SubscriptionId))
				$("#EndDate").val(obj.EndDate);
				$("#PostedOn").val(obj.PostedOn);
				//console.log($("#JobType").val(obj.JobType))
				$("#JobType").select2('val',obj.JobType);
				// $("#JobType").val(obj.JobType);
					CKEDITOR.instances['Keyskills'].setData(obj.Keyskills);
				CKEDITOR.instances['Description'].setData(obj.Description);
				//$("#Mtimg").css("display","block");
				//$("#Mtimg").attr("src",Mtimg);
				$("#status").select2('val',obj.status);
				//$("#status").val(obj.status);
				
				$("#CurrentOpenings").val(obj.CurrentOpenings);
				$("#ExperienceTo").val(obj.ExperienceTo);
				$("#ExperienceFrom").val(obj.ExperienceFrom);
				$("#Category").select2('val',obj.CategoryId);
				//$("#Category").val(obj.CategoryId);
				$("#Id").val(jobid);
				$('#AddClick').hide();
			}
		});
}

function get_postjobs(page)
{
	var SearchKey=$('#skey').val();
	$.ajax({
				url: base_url+"Findjob/get_postjobs",
				type:"POST",
				data: {'SearchKey':SearchKey,'page':page},
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
							html+='<td class="text-center">'+v.CompanyName+'</td>';
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
					url: base_url+"Findjob/DeleteJob",
					data : "jobid="+jobid,
					success: function(data)
					{
						alertify.alert("<p style='color:red'>Your record has been deleted successfully</p>");
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