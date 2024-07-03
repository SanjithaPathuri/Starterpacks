cpage = 1; 
$(function(){
	get_Projects(cpage);
	
	$('#AddBtn').click(function(){
		reset();
		$('#EditDiv').html('');
		$('#EditDiv').hide();
		showform();
	});
	
	$('#CancelBtn').click(function(){
		hideform();
	});
	
	$('#SubmitBtn').click(function(){
		validate();
	});
	
	$('#ProjectsForm').submit(function(){
		var form  = '';
		form = new FormData(this)
		$.ajax({
			url: "",
			type:"POST",
			data: form,
			processData: false,
			contentType: false,
			beforeSend: function(){
				$('#SubmitBtn').prop('disabled', true);
				$('#CancelBtn').prop('disabled', true);
			},
			complete: function(){
				$('#SubmitBtn').prop('disabled', false);
				$('#CancelBtn').prop('disabled', false);
			},
			success: function(data)
			{
				if(data == 1)
				{
					$('#CancelBtn').trigger('click');
					get_Projects(cpage);
				}
				else
				{
					alertify.alert(data);
				}
			}
		});
	});
});

function showform()
{
	$('#AddBtn').hide();
	$('#CancelBtn').show()
	$('#SubmitBtn').show();
	$('#ProjectsForm').show();
}

function hideform()
{
	$('#CancelBtn').hide()
	$('#ProjectsForm').hide();
	$('#SubmitBtn').hide();
	$('#AddBtn').show();
}

function validate()
{
	
	var SubscriptionId= $.trim($('#SubscriptionId').val());
	var DiscountAmount= $.trim($('#DiscountAmount').val());
	var org = $.trim($('#Organization').val());
	var protitle = $.trim($('#Project_Title').val());
	var vlink = $.trim($('#Video_Link').val());
	var Images = $.trim($('#Images').val());
	var bdiag = $.trim($('#Bdiagram').val());
	var resources = $.trim($('#Resources').val());
	var Category = $.trim($('#Category').val());
	var Branch = $.trim($('#Branch').val());
	var Price = $.trim($('#Price').val());
				/* reset text editers */
	var Specs = $.trim(CKEDITOR.instances.Specs.getData());
	var Kit = $.trim(CKEDITOR.instances.Kit.getData());
	var Description = $.trim(CKEDITOR.instances.Description.getData());
	var Highlights = $.trim(CKEDITOR.instances.Highlights.getData());
	var Swrequirements = $.trim(CKEDITOR.instances.Swrequirements.getData());
	var Hwrequirements = $.trim(CKEDITOR.instances.Hwrequirements.getData());
	var proinvalid = '';
	
	if(org == '')
	{
		proinvalid = 1;
		$('#s2id_Organization').css('border','1px solid red');
	}
	else
		$('#s2id_Organization').css('border','');
	
	if(SubscriptionId == '')
	{
		proinvalid = 1;
		$('#s2id_SubscriptionId').css('border','1px solid red');
	}
	else
		$('#s2id_SubscriptionId').css('border','');
	if(DiscountAmount == '')
	{
		proinvalid = 1;
		$('#DiscountAmount').css('border','1px solid red');
	}
	else
	{
		var numsPattern = /^\d{0,4}(\.\d{0,2})?$/;
		if(!numsPattern.test(DiscountAmount))
		{
			proinvalid = 1;
			$('#DiscountAmount').css('border','1px solid red');
		}
		else
		{
			
			$('#DiscountAmount').css('border','');
		}
	}	
	
	if(protitle == '')
	{
		proinvalid = 1;
		$('#Project_Title').css('border-color','red');
	}
	else
		$('#Project_Title').css('border-color','');
	
	if(vlink == '')
	{
		proinvalid = 1;
		$('#Video_Link').css('border-color','red');
	}
	else
		$('#Video_Link').css('border-color','');
	
	if(Price == '')
	{
		proinvalid = 1;
		$('#Price').css('border-color','red');
	}
	else
		$('#Price').css('border-color','');
	
	if($.trim($('#UpId').val())=='')
	{
		if(Images == '')
		{
			proinvalid = 1;
			$('#Images').css('border-color','red');
		}
		else
			$('#Images').css('border-color','');
		
		if(bdiag == '')
		{
			proinvalid = 1;
			$('#Bdiagram').css('border-color','red');
		}
		else
			$('#Bdiagram').css('border-color','');
		
		if(resources == '')
		{
			proinvalid = 1;
			$('#Resources').css('border-color','red');
		}
		else
			$('#Resources').css('border-color','');
	}
	
	if(Category == '')
	{
		proinvalid = 1;
		$('#s2id_Category').css('border','1px solid red');
	}
	else
		$('#s2id_Category').css('border','');
	
	if(Branch == '')
	{
		proinvalid = 1;
		$('#s2id_Branch').css('border','1px solid red');
	}
	else
		$('#s2id_Branch').css('border','');
	
	if(Description == '')
	{
		proinvalid = 1;
		$('#cke_Specs').css('border','1px solid red');
	}
	else
		$('#cke_Specs').css('border','');
	
	if(Kit == '')
	{
		proinvalid = 1;
		$('#cke_Kit').css('border','1px solid red');
	}
	else
		$('#cke_Kit').css('border','');
	
	if(Hwrequirements == '')
	{
		proinvalid = 1;
		$('#cke_Hwrequirements').css('border','1px solid red');
	}
	else
		$('#cke_Hwrequirements').css('border','');
	
	if(Swrequirements == '')
	{
		proinvalid = 1;
		$('#cke_Swrequirements').css('border','1px solid red');
	}
	else
		$('#cke_Swrequirements').css('border','');
	
	if(Highlights == '')
	{
		proinvalid = 1;
		$('#cke_Highlights').css('border','1px solid red');
	}
	else
		$('#cke_Highlights').css('border','');
	
	if(Description == '')
	{
		proinvalid = 1;
		$('#cke_Description').css('border','1px solid red');
	}
	else
		$('#cke_Description').css('border','');
	
			/*var data = new FormData();
			data.append('Organization',$.trim($('#Organization').val()));
			data.append('Project_Title',$.trim($('#Project_Title').val()));
			data.append('Video_Link',$.trim($('#Video_Link').val()));
			data.append('Images',$("#uploadedfile")[0].files[0]);
			data.append('Bdiagram',$.trim($('#Bdiagram').val()));
			data.append('Resources',$.trim($('#Resources').val()));
			data.append('Specs',$.trim(CKEDITOR.instances.Specs.getData()));
			data.append('Kit',$.trim(CKEDITOR.instances.Kit.getData()));
			data.append('Description',$.trim(CKEDITOR.instances.Description.getData()));
			data.append('Highlights',$.trim(CKEDITOR.instances.Highlights.getData()));
			data.append('Swrequirements',$.trim(CKEDITOR.instances.Swrequirements.getData()));
			data.append('Hwrequirements',$.trim(CKEDITOR.instances.Hwrequirements.getData()));
			data.append('UpId',$.trim($('#UpId').val()));*/
			if(proinvalid == '')
			{
				$('#Specs').val($.trim(CKEDITOR.instances.Specs.getData()));
				$('#Kit').val($.trim(CKEDITOR.instances.Kit.getData()));
				$('#Description').val($.trim(CKEDITOR.instances.Description.getData()));
				$('#Highlights').val($.trim(CKEDITOR.instances.Highlights.getData()));
				$('#Swrequirements').val($.trim(CKEDITOR.instances.Swrequirements.getData()));
				$('#Hwrequirements').val($.trim(CKEDITOR.instances.Hwrequirements.getData()));
				$('#ProjectsForm').trigger('submit');
			}
}

function get_Projects(page)
{
	skey = $('#search').val();
	$.ajax({
		url: "",
		type:"POST",
		data: {'get':'true','skey':skey,'page':page},
		beforeSend: function(){
		},
		complete: function(){
		},
		success: function(data)
		{
			data = $.parseJSON(data);
			var html = '';
			$.each(data.Projects, function(i){
				var row = data.Projects[i];
				var diag ='';
				if(row.BlockDiagram!='')
					diag = base_url+row.BlockDiagram;
				else
					diag = base_url+'noimage.jpg';
				if(row.Status=='1')
					status = "<span class='label label-success'>Active</span>"
				else
					status = "<span class='label label-danger'>In-Active</span>";
				html+="<tr><td>"+row.ProjectTitle+"</td><td>"+row.CompanyName+"</td><td style='text-align:center'><img src='"+diag+"' style='height:25px;'/></td><td><a href='"+base_url+row.Resources+"' target='_blank'>Resources</a></td><td>"+status+"</td><td><button title='Edit' type='button' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5' onclick='editfun("+row.ProjectId+");'><i class='fa fa-pencil'></i></button>&nbsp;&nbsp;<button title='Delete' type='button' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' onclick='delfunc("+row.ProjectId+");'><i class='fa fa-trash'></i></button></td></tr>";
			});
			$('#Projects_table').find('tbody').html(html);
			$('#pagination').html(data.pagination);
			$('.pagination').find('a').click(function(){
                var newpage = $(this).parent('li').attr('page')
                get_Projects(newpage);
            })
		}
	});
}

function editfun(id)
{
	if($.trim(id)!='')
	{
		$.ajax({
			url: "",
			type:"POST",
			data: {'edit':'true','id':id},
			beforeSend: function(){
			},
			complete: function(){
			},
			success: function(data)
			{
				$('#EditDiv').html('');
				data = $.parseJSON(data);
				var imgs = ''
				$.each(data.Images, function(i){
					var row = data.Images[i];
					imgs +="<div class='col-sm-2'><h4 style='text-align:center'>Images</h4><img src='"+base_url+row.ImageLink+"' style='height:150px;'/></div>&nbsp;&nbsp;"; 
				});
				$('#DiscountAmount').val(data.DiscountAmount);
				$('#Organization').select2('val',data.OrganizationId);
				$('#SubscriptionId').select2('val',data.SubscriptionId);
				$('#Category').select2('val',data.CategoryId);
				$('#Branch').select2('val',data.BranchId);
				$('#Status').select2('val',data.Status);
				$('#Project_Title').val(data.ProjectTitle);
				$('#Video_Link').val(data.VideoLink);
				$('#Price').val(data.Price);
				imgs +="<div class='col-sm-2'><h4 style='text-align:center'>Block Diagram</h4><img src='"+base_url+data.BlockDiagram+"' style='height:150px;'/></div>&nbsp;&nbsp;"; 
				imgs +="<div class='col-sm-2'><h4 style='text-align:center'>Resources</h4><a href='"+base_url+data.Resources+"' style='text-align:center'>Click here to download.</a></div>";
				imgs +="<br>";
				$('#UpId').val(data.ProjectId);
							/* append to text editers */
				CKEDITOR.instances['Specs'].setData(data.Specifications)
				CKEDITOR.instances['Kit'].setData(data.kitDetails)
				CKEDITOR.instances['Description'].setData(data.Description)
				CKEDITOR.instances['Highlights'].setData(data.Highlights)
				CKEDITOR.instances['Swrequirements'].setData(data.SoftwareRequirements)
				CKEDITOR.instances['Hwrequirements'].setData(data.HardwareRequirements)
				$('#EditDiv').html(imgs);
				showform();
				$('#EditDiv').show();
			}
		});
	}
}

function delfunc(delid)
{
	alertify.confirm("Do you really want to delete this Project ?", function (e) 
	{
		if (e) 
		{
			$.ajax({
				url: "",
				type:"POST",
				data: {'Delete':'true','id':delid},
				beforeSend: function(){
				},
				complete: function(){
				},
				success: function(data)
				{
					if(data == 1)
						get_Projects(cpage)
					else
						alertify.alert("Error deleting the project. <br> Please try later.");
				}
			});
		}
	});
}

function reset()
{
	$('#s2id_Organization').css('border','');  // select2
	$('#s2id_Organization').select2('val',''); //select2	
	$('#Project_Title').val('');
	$('#Project_Title').css('border-color','');
	$('#Video_Link').val('');
	$('#Video_Link').css('border-color','');
	$('#Price').val('');
	$('#Price').css('border-color','');
	$('#Images').val('');
	$('#Images').css('border-color','');
	$('#Bdiagram').val('');
	$('#Bdiagram').css('border-color','');
	$('#Resources').val('');
	$('#Resources').css('border-color','');
	$('#UpId').val('');
	$('#s2id_Category').css('border','');  // select2
	$('#s2id_Category').select2('val',''); //select2
	$('#s2id_Branch').css('border','');  // select2
	$('#s2id_Branch').select2('val',''); //select2
			/* reset text editers */
	$('#cke_Specs').css('border','');
	CKEDITOR.instances['Specs'].setData('');
	$('#cke_Kit').css('border','');
	CKEDITOR.instances['Kit'].setData('');
	$('#cke_Description').css('border','');
	CKEDITOR.instances['Description'].setData('');
	$('#cke_Highlights').css('border','');
	CKEDITOR.instances['Highlights'].setData('');
	$('#cke_Swrequirements').css('border','');
	CKEDITOR.instances['Swrequirements'].setData('');
	$('#cke_Hwrequirements').css('border','');
	CKEDITOR.instances['Hwrequirements'].setData('');
}


/*--------------------Text Editers-------------Starts Here--*/
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
			CKEDITOR.replace('Specs');
			CKEDITOR.replace('Kit',{customConfig : 'config-image.js'});
			CKEDITOR.replace('Description',{customConfig : 'config-image.js'});
			CKEDITOR.replace('Highlights',{customConfig : 'config-image.js'});
			CKEDITOR.replace('Swrequirements',{customConfig : 'config-image.js'});
			CKEDITOR.replace('Hwrequirements',{customConfig : 'config-image.js'});
			
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
/*--------------------Text Editers-------------Ends Here----*/