$(function(){
	$('#AddClick').click(function(){
		showtab();
	});
	$('#CancelClick').click(function(){
		hidetab();
	});
	$('#SubmitClick').click(function(){
		validate();
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
	var subscription = $.trim($("#SubscriptionId").val());
	var copenings = $.trim(CKEDITOR.instances.CurrentOpenings.getData());
	var desc = $.trim(CKEDITOR.instances.Description.getData());
	var fjerr = '';
	
	if(jobtitle == '')
	{
		fjerr = 1;
		$("#JobTitle").css('border-color','red');
	}
	else
		$("#JobTitle").css('border-color','');
	
	if(org == '')
	{
		fjerr = 1;
		$('#OrganisationName').css('border-color','red')
	}
	else
		$('#OrganisationName').css('border-color','')
	
	if(jobloc == '')
	{
		fjerr = 1;
		$("#JobLocation").css('border-color','red');
	}
	else
		$("#JobLocation").css('border-color','');
	
	if(elig == '')
	{
		fjerr = 1;
		$("#Eligibility").css('border-color','red');
	}
	else
		$("#Eligibility").css('border-color','');
	
	if(stdate == '')
	{
		fjerr = 1;
		$("#StartDate").css('border-color','red');
	}
	else
		$("#StartDate").css('border-color','');
	
	if(enddate == '')
	{
		fjerr = 1;
		$("#EndDate").css('border-color','red');
	}
	else
		$("#EndDate").css('border-color','');
	
	if(jobtype == '')
	{
		fjerr = 1;
		$("#JobType").css('border-color','red');
	}
	else
		$("#JobType").css('border-color','');
	
	if(subscription == '')
	{
		fjerr = 1;
		$("#SubscriptionId").css('border-color','red');
	}
	else
		$("#SubscriptionId").css('border-color','');
	
	if(copenings == '')
	{
		fjerr = 1;
		$("#cke_CurrentOpenings").css('border','1px solid red');
	}
	else
		$("#cke_CurrentOpenings").css('border','');
	
	if(desc == '')
	{
		fjerr = 1;
		$("#cke_Description").css('border','1px solid red');
	}
	else
		$("#cke_Description").css('border','');
	
	if(fjerr == '')
	{
		$('#jobform').removeAttr('onsubmit');
		$('#jobform').tigger('submit');
	}
}

function showtab()
{
	$("#JobTitle").val("");
	$("#JobTitle").css('border-color','');
	$("#OrganisationName").val("");
	$("#OrganisationName").css('border-color','');
	$("#JobLocation").val("");
	$("#JobLocation").css('border-color','');
	$("#Eligibility").val("");
	$("#Eligibility").css('border-color','');
	$("#StartDate").val("");
	$("#StartDate").css('border-color','');
    $("#EndDate").val("");
    $("#EndDate").css('border-color','');
	$("#subscription").val("");
	$("#SubscriptionId").css('border-color','');
	
	$("#JobType").val("");
	$("#JobType").css('border-color','');
	
	$('#AddClick').hide();
	$('#SubmitClick').show();
	$('#CancelClick').show();
	$("#Id").val("");
	$("#status").val("");
	CKEDITOR.instances['CurrentOpenings'].setData("");
	$('#cke_CurrentOpenings').css('border','');
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
				console.log(obj.SubscriptionId);
				//var Mtimg = '<?php echo base_url() ?>images/Managementteam/'+obj.Mtimg;
				 $("#JobTitle").val(obj.JobTitle);
				//$("#OrganisationName").select2('val',obj.OrganisationName);
				$("#OrganisationName").val(obj.OrganisationName);
				$("#JobLocation").val(obj.JobLocation);
				$("#Eligibility").val(obj.Eligibility);
				$("#StartDate").val(obj.StartDate);
				//$("#SubscriptionId").select2('val',obj.SubscriptionId);
				$("#SubscriptionId").val(obj.SubscriptionId);
				//Console.log($("#SubscriptionId").val(obj.SubscriptionId))
				$("#EndDate").val(obj.EndDate);
				$("#PostedOn").val(obj.PostedOn);
				//console.log($("#JobType").val(obj.JobType))
				//$("#JobType").select2('val',obj.JobType);
				 $("#JobType").val(obj.JobType);
					CKEDITOR.instances['CurrentOpenings'].setData(obj.CurrentOpenings);
				CKEDITOR.instances['Description'].setData(obj.Description);
				//$("#Mtimg").css("display","block");
				//$("#Mtimg").attr("src",Mtimg);
				//$("#status").val(obj.status);
				$("#status").select2('val',obj.status);
				$("#Id").val(jobid);
				$('#AddClick').hide();
			}
		});
}
function deletefun(jobid)
{
	if(confirm("Are you sure You want to delete this record?"))
	{
		$.ajax({
				type: "POST",
				url: base_url+"Findjob/DeleteJob",
				data : "jobid="+jobid,
				success: function(data)
				{
					alertify.alert("your record has been deleted successfully");
					window.location.reload();
				}
		});
	}
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
			CKEDITOR.replace( 'CurrentOpenings' );
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