var cpage =1;
$(function(){	
	blurValidations();
	get_share_knowledge(cpage);
	$('#AddClick').click(function(){
		CKEDITOR.instances['Description'].setData('');
		showtab();
	});
	$('#CancelClick').click(function(){
		hidetab();
	});
	$("#CategoryId").change(function(){
		var value = $.trim($("#CategoryId").val());
		getsubcategory(value);
		
	})
	$('#SubmitClick').click(function(){
		var invalid = '0';
		var desc = $.trim(CKEDITOR.instances.Description.getData());
		$('.null').each(function(){	
			
			var value = $.trim($(this).val());	
			if(value == "")
			{
				invalid = '1';
				$(this).css('border','1px solid red');				
			}
			else
				$(this).css('border','');	
		})
		if(desc == "")
		{
			invalid = '1';
			$("#cke_Description").css('border','1px solid red');
		}
		else
			$("#cke_Description").css('border','');
		if(invalid == '0')
		{
			var data = new FormData();
			data.append('shareid',$.trim($('#shareid').val()));
			data.append('TopicName',$.trim($('#TopicName').val()));
			data.append('CategoryId',$.trim($('#CategoryId').val()));
			data.append('SubCategoryId',$.trim($('#SubCategoryId').val()));
			data.append('Available_From',$.trim($('#Available_From').val()));
			data.append('Available_To',$.trim($('#Available_To').val()));
			data.append('Location',$.trim($('#Location').val()));
			data.append('Userstatus',$.trim($('#Userstatus').val()));
			data.append('Description',$.trim(CKEDITOR.instances.Description.getData()));
			
			$.ajax({
			url: "",
			type:"POST",
			data: data,
			cache: false,
			//dataType: 'json',
			processData: false, 
			contentType: false,
			enctype: 'multipart/form-data', 	
			success: function(data)
			{
				var data  = $.parseJSON(data);					
				if(data.err == '1')
				{
					alertify.success(data.msg);
				}
				hidetab();
				get_share_knowledge(cpage);
			}
			});
		}
	});
	 
		
});
function editfun(shareid)
{	
	$.ajax({
			type: "POST",
			url: base_url+"Mentordashboard/get_share_knowledg_by_id",
			data : {'shareid':shareid},
			success: function(data)
			{
				var obj  = $.parseJSON(data);
				CKEDITOR.instances['Description'].setData(obj.Description);
				$('#shareid').val(shareid);
				$("#TopicName").val(obj.TopicName);
				$("#CategoryId").val(obj.CategoryId);
				selectsubcategory(obj.CategoryId,obj.SubCategoryId)
				//$("#SubCategoryId").val(obj.SubCategoryId);
				$("#Available_From").val(obj.Available_From);
				$("#Available_To").val(obj.Available_To);
				$("#Location").val(obj.Location);
				$("#Userstatus").val(obj.User_Status);				
				
			}
		});
		showtab();	
}

function showtab()
{
	$('#shareform').show();
	$('#SubmitClick').show();
	$('#CancelClick').show();
	$('#AddClick').hide();
	$('#shareid').val('');
	$('.null').each(function(){		
		$(this).val("");
		$(this).css('border','');		
	})
	
	$('#showhide').show();
	$('#jobform').trigger('reset');
}

function hidetab()
{
	$('#shareform').hide();
	$('#CancelClick').hide();
	$('#AddClick').show();
	$('#SubmitClick').hide();
}

 
function get_share_knowledge(page)
{
	var SearchKey=$('#SearchKey').val();
	$.ajax({
				url: base_url+"Mentordashboard/get_share_knowledge",
				type:"POST",
				data: {'searchKey':SearchKey,'page':page},
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
							html+='<td class="text-center">'+v.TopicName+'</td>';
							html+='<td class="text-center">'+v.Available_From+'</td>';
							html+='<td class="text-center">'+v.Available_To+'</td>';							
							html+='<td class="text-center">';
							if(v.User_Status==1)
							{
								html+='<button class="btn btn-xs btn-success mar-b5" >Active</button>';
							}
							else
							{
								html+='<button class="btn btn-xs btn-danger mar-b5" >In Active</button>';
							}
								html+='</td>';
							html+='<td class="text-center">';
							
							if(v.Admin_Status==1)
							{
								html+='<button class="btn btn-xs btn-success mar-b5" >Approved</button>';
							}
							else
							{
								html+='<button class="btn btn-xs btn-warning mar-b5" >Pending</button>';
							}
							html+='</td>';
							html+='<td text-center><button class="btn btn-xs btn-primary mar-b5" name="editblogpost" onclick="editfun('+v.KnowledgeId+')"><i class="fa fa-pencil"></i></button> &nbsp';
							html+='<button class="btn btn-xs btn-danger mar-b5" name="trashblogpost" onclick="deletefun('+v.KnowledgeId+')"><i class="fa fa-trash-o"></i></button></td>';							
							html+='</tr>';
						});
					}
					else
					html+="<tr><td colspan='7'><div class='alert alert-danger mar0' role='alert'>No Records Found...!</div></td></tr>"; 
					$('#showdata').html(html);
					$('#pagination').html(data.pagination);
					$("body").on("click",'.pagination li',function(){
						cpage = $(this).attr('page');
						 get_share_knowledge(cpage);
					})
				}
			});
}

function deletefun(shareid)
{
	alertify.confirm("Do you really want to delete the record ?", function (e) 
	{
		if (e) 
		{
			$.ajax({
					type: "POST",
					url: base_url+"Mentordashboard/delete_share_knowledge_by_id",
					data : {'shareid':shareid},
					success: function(data)
					{
						var data = $.parseJSON(data);
						if(data.err == '1')
						{
							alertify.error(data.msg);
						}						
						get_share_knowledge(cpage);
					}
			});
		}
	});
}
function getsubcategory(id)
{
			$.ajax({
					type: "POST",
					url: base_url+"Mentordashboard/get_sub_category",
					data : {'id':id},
					success: function(data)
					{
						var data = $.parseJSON(data);			
						$('#SubCategoryId').html('');
						$('#SubCategoryId').html('<option value="">Select Sub Category</option>');
						var html = '';
						$.each(data,function(i)
						{
							var v = data[i];
							html += '<option value="'+v.sid+'">'+v.SubCategory_name+'</option>';
						});
						$('#SubCategoryId').append(html);
					}
			});
}
function selectsubcategory(cid,sid)
{
			$.ajax({
					type: "POST",
					url: base_url+"Mentordashboard/get_sub_category",
					data : {'id':cid},
					success: function(data)
					{
						var data = $.parseJSON(data);			
						$('#SubCategoryId').html('');
						var html = '';
						html = '<option value="">Select Sub Category</option>';
						var selected = '';
						$.each(data,function(i)
						{
							var v = data[i];
							if(v.sid == sid)
							{
								selected = "selected";
							}
							else
							{
								selected = '';
							}							
							html += '<option value="'+v.sid+'" '+selected+'>'+v.SubCategory_name+'</option>';
						});
						$('#SubCategoryId').append(html);
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
			CKEDITOR.replace( 'editor2',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor3',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor4',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor5',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor6',{customConfig : 'config-image.js'});
			CKEDITOR.replace( 'editor7',{customConfig : 'config-image.js'});
			
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			CKEDITOR.inline( 'Description' );
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