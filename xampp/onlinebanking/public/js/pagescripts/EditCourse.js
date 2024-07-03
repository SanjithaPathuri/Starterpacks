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
	
	$('.email').blur(function(){
		var numsPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i ;
		var email = $.trim($(this).val());
		if(!numsPattern.test(email))
		{
			$(this).css('border-color','red');
			$(this).val('');
		}
		else
			$(this).css('border-color','');
	});
	
	$('.mobile').blur(function(){
		var numsPattern =/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		var mobile = $.trim($(this).val());
		if(!numsPattern.test(mobile))
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
	});
		
	$('#imagefile').change(function(){

			var file = this.files[0];
				var name = file.name;
				var size = file.size;
				
				var type = file.type;
				var error=0;
				if(file.name.length < 1) {
					alertify.alert("Invalid File name")
					$('#imagefile').val('');
					
				}				
				else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
					alertify.alert("Please upload file in jpg,gif,jpeg format");
					$('#imagefile').val('');
				}
})	
	$('#pdffiles').change(function()
	{
				
				var file = this.files[0];
				var name = file.name;
				var size = file.size;
				
				var type = file.type;
				var error=0;
				if(file.name.length < 1) {
					alertify.alert("Invalid File name")
					$('#pdffiles').val('');
					
				}				
				else if(file.type != 'application/pdf') {
					alertify.alert("Please upload file in PDF format");
					$('#pdffiles').val('');
					
				}
	})
	
	$('#CourseDiscountAmount').change(function(){ 
		var damount = $.trim($('#CourseDiscountAmount').val());
		var camount = $.trim($('#CourseAmount').val());
		if(camount =='')
		{
			$('#CourseDiscountAmount').val('');
			$('#CourseDiscountAmount').css('border','1px solid red');
			$('#CourseAmount').css('border','1px solid red');
		}
		else
		{
			if((parseInt(damount)) > parseInt(camount))
			{
				alertify.alert("<b>Discount amount cannot be greater than Actual amount..</b>");
				$('#CourseDiscountAmount').val('');
				$('#CourseDiscountAmount').css('border','1px solid red');
				$('#CourseAmount').css('border','1px solid red');
			}
			else
			{
				$('#CourseDiscountAmount').css('border','');
				$('#CourseAmount').css('border','');
			}
		}
	});
	
	$('.ChapterClose').click(function(){
		var Courseclose = $(this).attr('courseid');
		$('#CourseDiv_'+Courseclose).remove();
		$(this).remove();
	});
	
	$('.TopicClose').click(function(){
		var Topicclose = $(this).attr('topic');
		$('#TopicNameDiv_'+Topicclose).remove();
		$('#TopicLinkDiv_'+Topicclose).remove();
		$(this).remove();
	});
	
	$('.QuizClose').click(function(){
		
		var QuizClose = $(this).attr('quiz');
		$('#QuizNameDiv_'+QuizClose).remove();
		$('#QuizLinkDiv_'+QuizClose).remove();
		$(this).remove();
	});
	
	$('.QueAnsClose').click(function(){
		var QueAnsClose_id = $(this).attr('Ques_ans_id');
		$('.QueClose_'+QueAnsClose_id).remove();
		$('.AnsClose_'+QueAnsClose_id).remove();
		$('.QueAnsClose_'+QueAnsClose_id).remove();
		$(this).remove();
	});
	
	
	
});

function delchap(chptr)
{
	$('#topicname'+chptr).remove()
	$('#topiclink'+chptr).remove()
	$('#btndiv'+chptr).remove()
}

function removequiz(chptr)
{
	$('#quizname'+chptr).remove()
	$('#quizlink'+chptr).remove()
	$('#quizbtn'+chptr).remove()
}

var i =2;
function addmorefaq()
{
	var setstring = "";
	setstring += '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 QueClose_'+i+'">';
	setstring += '<div class="form-group no-margin-hr">';
	setstring += '<label class="control-label">Question</label> <input type="text" name="FaqQuestion[]" id="FaqQuestion'+i+'" class="form-control" />';
	setstring += '</div>';
	setstring += '</div>';

	setstring += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 AnsClose_'+i+'">';
	setstring += '<div class="form-group no-margin-hr">';
	setstring += '<label class="control-label">Answer</label> <input type="text" name="FaqAnswer[]" id="FaqAnswer'+i+'" class="form-control" />';
	setstring += '</div>';
	setstring += '</div>';

	setstring += '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center QueAnsClose_'+i+' ">';
    setstring += '<label class="control-label text-center"><a class = "QueAnsClose" Ques_ans_id = "'+i+'"	><span class="nav-icons btn btn-danger btn-xs mar_t19"><i class="fa fa-close"></i></span></a></label>';
    setstring += '</div>';

	
	$("#addmorefaq1").append(setstring);
	i++;
	$('.QueAnsClose').click(function(){
		var QueAnsClose_id = $(this).attr('Ques_ans_id');
		$('.QueClose_'+QueAnsClose_id).remove();
		$('.AnsClose_'+QueAnsClose_id).remove();
		$('.QueAnsClose_'+QueAnsClose_id).remove();
		$(this).remove();
	});
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

function editCourses()
{	
	var invalid='';
	$('#corseform').find("input[type='text']").each(function(){
		
		if($(this).val()=='')
		{
			var text_id=$(this).attr('id');
			if(text_id=='s2id_autogen1' || text_id=='s2id_autogen2' || text_id=='s2id_autogen3' || text_id=='s2id_autogen1_search' ||  text_id=='s2id_autogen2_search' ||  text_id=='s2id_autogen3_search' )
			{
			}
			else
			{
				$(this).css('border-color','red');
				invalid=1;
			}
		}
		else
			$(this).css('border-color',''); 
		
	})
	/* $("input[type='file']").each(function(){
		
		if($(this).val()=='')
		{
			$(this).css('border-color','red');
			invalid=1;console.log('file');
		}
		else
			$(this).css('border-color','');
		
	}) */
	$("select").each(function(){
		
		var id=$(this).attr('id');
			if($('#'+id).val()=='')
			{
				$('#s2id_'+id).css('border','1px solid red');
				invalid=1;console.log('select');
			}
			else
				$('#s2id_'+id).css('border','');
					
	})
	/* $("textarea").each(function(){
		//console.log('1')
		var id=$(this).attr('id');
		
			if($.trim(CKEDITOR.instances.CourseDescription.getData())=='')
			{
				$('#CourseDescription').css('border','1px solid red');
				invalid=1;
			}
			else
				$('#CourseDescription').css('border','');
					
	}) */
	if($.trim(CKEDITOR.instances.CourseDescription.getData())=='')
			{
				$('#cke_CourseDescription').css('border','1px solid red');
				invalid=1;console.log('textarea1');
			}
			else
				$('#cke_CourseDescription').css('border','');
			
	if($.trim(CKEDITOR.instances.CourseDetail.getData())=='')
			{
				$('#cke_CourseDetail').css('border','1px solid red');
				invalid=1;console.log('textarea1');
			}
			else
				$('#cke_CourseDetail').css('border','');
			
	if(invalid=='')
	{
		$("#corseform").attr('onSubmit','return true');
		$("#corseform").trigger('submit');
	}
	else
	{
		console.log('no');
	}
	
	
	/* var CourseName 			= $("#CourseName").val();
	var CourseType 			= $("#CourseType").val();
	var CourseAmount 		= $("#CourseAmount").val();
	var CourseDescription 	= CKEDITOR.instances['CourseDescription'].getData();
	var CourseDetail 		= CKEDITOR.instances['CourseDetail'].getData();
	var FaqQuestion1 		= $("#FaqQuestion1").val();
	var FaqAnswer1 			= $("#FaqAnswer1").val();
	var Subscription		= $.trim($("#SubscriptionId").val());
	//var formdata			= $("#corseform").serializeArray(); */
	//console.log('sdsdsd');
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