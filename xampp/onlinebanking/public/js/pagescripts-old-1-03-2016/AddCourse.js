$(document).ready(function(){
	$('.text').blur(function(){
		var namesPattern = /^[a-zA-Z ]*$/;
		var text = $.trim($(this).val());
		if(!namesPattern.test(text))
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
		else
			$(this).css('border-color','');
	});
	
	$('.nums').blur(function(){
		var numsPattern = /^[0-9]{1,10}$/;
		var nums = $.trim($(this).val());
		if(!numsPattern.test(nums))
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
		else
			$(this).css('border-color','');
	});
	
	$('.url').blur(function(){
		var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		var url = $.trim($(this).val());
		if(!urlPattern.test(url))
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
		else
			$(this).css('border-color','');
	})
});

var i =2;
function addmorefaq()
{
	var setstring = "";
	setstring += '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">';
	setstring += '<div class="form-group no-margin-hr">';
	setstring += '<input type="text" name="FaqQuestion[]" id="FaqQuestion'+i+'" class="form-control" />';
	setstring += '</div>';
	setstring += '</div>';

	setstring += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">';
	setstring += '<div class="form-group no-margin-hr">';
	setstring += '<input type="text" name="FaqAnswer[]" id="FaqAnswer'+i+'" class="form-control" />';
	setstring += '</div>';
	setstring += '</div>';

	setstring += '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center">';
    setstring += '<label class="control-label text-center"><a href="#"><span class="nav-icons btn btn-danger btn-xs mar_t19"><i class="fa fa-close"></i></span></a></label>';
    setstring += '</div>';

	
	$("#addmorefaq1").append(setstring);
	i++;
}


function showhidetab(getpar)
{
	if(getpar == 'add')
	{
		$("#blog_title").val("");
		$("#BlogId").val("");
		CKEDITOR.instances['CourseDescription'].setData("");
		$("#showhide").css("display","block");
	}
	if(getpar == 'cancel')
	{
		$("#showhide").css("display","none");
	}
}

function AddCourses()
{
	alert();
	var CourseName 			= $("#CourseName").val();
	var CourseType 			= $("#CourseType").val();
	var CourseAmount 		= $("#CourseAmount").val();
	var CourseDescription 	= CKEDITOR.instances['CourseDescription'].getData();
	var CourseDetail 		= CKEDITOR.instances['CourseDetail'].getData();
	var FaqQuestion1 		= $("#FaqQuestion1").val();
	var FaqAnswer1 			= $("#FaqAnswer1").val();
	var Subscription		= $.trim($("#SubscriptionId").val());
	//var formdata			= $("#corseform").serializeArray();
	console.log('sdsdsd');
	/* if(CourseName != '' && CourseAmount != '' && CourseDescription != '' && CourseDetail != '' && FaqQuestion1 != '' && FaqAnswer1 != '' && Subscription!='')
	{
		$("#corseform").attr('onSubmit','return true');
		$("#corseform").trigger('submit');
	}
	else
	{
		alertify.alert("Please Enter The require field");
	} */
	

}


function editfun(blogid)
{
	$("#showhide").css("display","block");
	$.ajax({
		type: "POST",
		url: "<?php echo base_url() ?>index.php/Blog/EditBlog",
		data : "blogid="+blogid,
		success: function(data)
		{
			var obj = JSON.parse(data);
			$("#blog_title").val(obj.blog_title);
			CKEDITOR.instances['CourseDescription'].setData(obj.CourseDescription);
			$("#status").select2('val',obj.status);
			$("#BlogId").val(blogid);
		}
		});
}
function deletefun(blogid)
{
	if(confirm("Are you sure You want to delete this record?"))
	{
		$.ajax({
				type: "POST",
				url: "<?php echo base_url() ?>index.php/Blog/DeleteBlog",
				data : "blogid="+blogid,
				success: function(data)
				{
					alert("your record has been deleted successfully");
					window.location.reload();
				}
		});
	}
}
CKEDITOR.replace( 'CourseDescription' );
CKEDITOR.replace( 'CourseDetail',{customConfig : 'config-image.js'});
CKEDITOR.replace( 'editor4',{customConfig : 'config-image.js'});
CKEDITOR.replace( 'editor5',{customConfig : 'config-image.js'});
CKEDITOR.replace( 'editor6',{customConfig : 'config-image.js'});
CKEDITOR.replace( 'editor7',{customConfig : 'config-image.js'});