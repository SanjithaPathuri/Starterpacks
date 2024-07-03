function editfun(testimonialid)
{
	reset();
	$('#Name').css('border-color','');
	$('#CollegeName').css('border-color','');
	$('#title').css('border-color','');
	$('#shortdesc').css('border-color','');
	//$('#cke_content').css('border','');
	$('#TestimonialId').val('');
	$.ajax({
			type: "POST",
			url: base_url+"Testimonial/EditTestimonial",
			data : "testimonialid="+testimonialid,
			success: function(data)
			{
				$('#managementtestBtn').show();
				$('#cancel').show();
				var obj = JSON.parse(data);
				var testimonialurl = base_url+'public/itemimages/'+obj.image;
				$("#Name").val(obj.Name);
				$("#CollegeName").val(obj.CollegeName);
				$("#title").val(obj.title);
				$("#shortdesc").val(obj.shortdesc);
				//CKEDITOR.instances['content'].setData(obj.content);
				//$("#testimonialurl").css("display","block");
				//$("#testimonialurl").attr("src",testimonialurl);
				$("#testimonialurl").css("display","block");
				if($("#testimonialurl").val()!=''){
					$("#testimonialurl").attr("src",base_url+'images/noimage.jpg');
				}
				else{
				$("#testimonialurl").attr("src",base_url+'public/itemimages/'+obj.image);
				}
				
				//$("#status").val(obj.status);
				$("#status").select2('val',obj.status);
				$("#TestimonialId").val(testimonialid);
				$("#showhide").css("display","block");
				$('#AddBtn').hide();
		       $('#managementtestBtn').show();
			   $('#cancel').show();
			}
		});
}


function reset()
{
	$('#Name').val('');
	$('#CollegeName').val('');
	$('#title').val('');
	$('#shortdesc').val('');
	$('#image').val('');
	$('#status').select2('val','1');

	//$('#cke_content').val('');
	//CKEDITOR.instances['content'].setData('');
	$('#Name').css('border-color','');
	$('#CollegeName').css('border-color','');
	$('#title').css('border-color','');
	$('#shortdesc').css('border-color','');
	$('#status').css('border-color','');
	//$('#cke_content').css('border','');
	$('#TestimonialId').val('');
}

function showhidetab(getpar)
{
	$("#Name").val("");
	$("#CollegeName").val("");
	$("#title").val("");
	$("#shortdesc").val("");
	$("#testimonialurl").attr("src","");
	$("#testimonialurl").css("display","none");
	$("#TestimonialId").val("");
	$("#status").val("");
	//CKEDITOR.instances['content'].setData("");
	$("#BannerId").val("");
	$("#bannerurl").css("display","none");
	if(getpar == 'add')
	{
		$("#showhide").css("display","block");
		$('#AddBtn').hide();
		$('#managementtestBtn').show();
		$('#cancel').show();
		reset();
	}
	if(getpar == 'cancel')
	{
		$("#showhide").css("display","none");
		$('#managementtestBtn').hide();
		$('#cancel').hide();
		$('#AddBtn').show();
	}
}

$(document).ready(function(){
	var cpage=1;
	search_test(cpage);
	
})
	
		
function search_test(page)
			{
				
				//var stype = $('#search_select').val();
				var skey = $('#search').val();
				$.ajax({
					url: base_url+"Testimonial/search",
					
					type:"POST",
					data:{'skey':skey, 'page': page},
					
					success:function(data)
					{
						
						data = $.parseJSON(data)
						$("#test_table").find('tbody').empty();
						var html = '';
						var status = '';
						var testimonialurl;
						if(data.Testimonials.length>0)
						{
							
							$.each(data.Testimonials, function(i){
								var item = data.Testimonials[i];
								var base = base_url+"public/itemimages/";
								var noimage= base_url+'images/noimage.jpg';
								str = item.shortdesc;
								comm = str.substring(0,50);

								var str = item.testimonialurl;
								var path= base+item.image;
								if(item.testimonialurl!= '')
								
									testimonialurl = "<img style='height:20px' src='"+path+"'>";
								else
									testimonialurl = "<img style='height:20px' src='"+noimage+"'>";
								if(item.status == '1')
									status = "<td align='center'><span class='inac label label-success'>Active</span></td>";
								else
									status = "<td align='center'><span class='inac label label-danger'>Inactive</span></td>";
								html+='<tr><td>'+item.Name+'</td><td>'+item.CollegeName+'</td><td align="center">'+testimonialurl+'</td><td>'+comm+'</td>'+status+'<td align="center"><button ddata-target="" OnClick="editfun('+item.TestimonialId+');" class="btn btn-xs btn-primary mar-b5 bt-r mar_b5" type="button" title="Edit"><i class="fa fa-pencil"></i></button> <button data-toggle="modal" data-target="" OnClick="deletefun('+item.TestimonialId+');" class="btn btn-xs btn-danger mar-b5 bt-r mar_b5" type="button" title="Delete" ><i class="fa fa-trash-o"></i></button></td></tr>';
							});				
							
							 $("#test_table").find('tbody').html(html)
							$("#pagination").html(data.pagination)
							$(document).find(".pagination li").on("click",function(){
								cpage=$(this).attr('page');
								search_test($(this).attr('page'))
							})
						}
						else
						{
							$("#test_table").find('tbody').html("<tr><td colspan='8'><div class='alert alert-danger mar_b0'> No Records Found..! </div></td></tr>")
							$("#pagination").show()
						}
					}					
				})
			}

$('#image').click(function(){
var file ;
	$(':file').change(function(){
		
		file = this.files[0];
		var name = file.name;
		var size = file.size;
		
		var type = file.type;
		var error=0;
		
		if(file.name.length < 1) {
			alertify.alert("Invalid File name");
			$('#image').val('');
			error=1;
		}
		else if(file.size > 2000000) {
				alertify.alert("File is too big, Max allowed size: 2MB");
				$('#image').val('');
				error=1;
		}
		else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
			alertify.alert("File doesnt match png, jpg or gif");
			$('#image').val('');
			error=1;
		}
		else{
			var img = new Image();
			var _URL = window.URL || window.webkitURL;
			img.src = _URL.createObjectURL(file);
			img.onload = function () {
				if(this.height <95 || this.width<95 )
				{
					err = '1';
					alertify.alert("Please upload Images with  minimum 95 X 95  resolutions");
					$('#image').val('');
					return false;
				}
				if(this.height >105 || this.width>105 )
				{
					err = '1';
					alertify.alert("Please upload Images with  100 x 100 resolutions");
					$('#image').val('');
					return false;
				}
								
				
				else
				{
					
					var reader = new FileReader();
					reader.onloadend = function() {
						$("#testimonialurl").attr("src",reader.result);
					}
					reader.readAsDataURL(file); 
					$("#testimonialurl").show();
					//$("#editbanImg").val('0')
				}
					
			};
			
		}
		
	})
})	
$('#managementtestBtn').click(function(){

		var Name = $.trim($('#Name').val());
		var CollegeName = $.trim($('#CollegeName').val());
		var title = $.trim($('#title').val());
		//var image = $.trim($('#image').val());
		var image = $.trim($('#image').attr('src',''));
		var shortdesc = $.trim($('#shortdesc').val());
		//var content = $.trim(CKEDITOR.instances.content.getData()); 
	//if(content.length >1219){
		//alertify.alert("In Content Field Maximum 1200 characters only with spaces.");
		//return false;
	//}
		var err = '';
		if( Name =="")
		{
			err = 1;
			$('#Name').css('border','1px solid red');
		}
		else
			$('#Name').css('border','');
		if( CollegeName =="")
		{
			err = 1;
			$('#CollegeName').css('border','1px solid red');
		}else{
			$('#CollegeName').css('border','');
		}
		
		if( title =="")
		{
			err = 1;
			$('#title').css('border','1px solid red');
		}
		else
		{
			$('#title').css('border','');
		}
		//if($("#Id").val()==''){
		//if( image =="")
		//{
			//err = 1;
			//$('#image').css('border','1px solid red');
		//}
		//}
		//else{
			
			//$('#image').css('border','');
		//}
		if( shortdesc =="")
		{
			err = 1;
			$('#shortdesc').css('border','1px solid red');
		}else{
			$('#shortdesc').css('border','');
		}
		
		//if( content =="")
		//{
			//err = 1;
			//$('#cke_content').css('border','1px solid red');
		//}
		//else{
			//$('#cke_content').css('border','');
		//}
		
		if(err == '')
		{
			$('#bannerform').removeAttr('onsubmit') ;
			$('#bannerform').trigger('submit');
		}
})

function deletefun(testimonialid)
{
	if(confirm("Are you sure You want to delete this record?"))
	{
		$.ajax({
				type: "POST",
				url: base_url+"Testimonial/DeleteTestimonial",
				data : "testimonialid="+testimonialid,
				success: function(data)
				{
					alertify.alert("your record has been deleted successfully");
					search_test();
				}
		});
	}
}
  /* if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
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
			CKEDITOR.replace( 'content' );
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
initSample(); */
