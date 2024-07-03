var limit = '';
$(document).ready(function(){
	$('#BlogCPost').on('click',function(){
		MainComment();
	});
	get_Comments('true');
	$('#ViewAllComments').click(function(){
		limit = 'false';
		get_Comments(limit)
	});
});

function MainComment()
{
	var Name = $.trim($('#Name').val());
	var Email  = $.trim($('#Email').val());
	var Message = $.trim($('#Message').val());
	var invalidcomment = '';
	if(Name == '')
	{
		invalidcomment = 1;
		$('#Name').css('border-color','red');
	}
	else
		$('#Name').css('border-color','');
	
	if(Email == '')
	{
		invalidcomment = 1;
		$('#Email').css('border-color','red');
	}
	else
		$('#Email').css('border-color','');
	
	if(Message == '')
	{
		invalidcomment = 1;
		$('#Message').css('border-color','red');
	}
	else
		$('#Message').css('border-color','');
	
	if(invalidcomment == '')
	{
		$.ajax({
			url: commentUrl,
			type:"POST",
			data: $('#BlogReply').serializeArray(),
			beforeSend: function(){
				$('#BlogCPost').prop('disabled', true);
			},
			complete: function(){
				$('#BlogCPost').prop('disabled', false);
			},
			success: function(data)
			{
				if(data == 1)
				{
					alertify.alert("<b style='color:green'>Comment posted Succesfully.</b><br>")
					$('#BlogReply').trigger('reset');
					limit = 'true';
					get_Comments(limit);
				}
				else
					alertify.alert("Please try later");
			}
		});
	}
}

function get_Comments(limit)
{
	$.ajax({
			url: "",
			type:"POST",
			data: {"Get":'Comments','Bid':BlogId,'limit':limit}, /* BlogId is defined at bloginner page in bottom */
			beforeSend: function(){
				$('#CommentsDiv').hide();
				$('#LoadinDiv').show();
			},
			complete: function(){
				$('#LoadinDiv').hide();
				$('#CommentsDiv').show();
			},
			success: function(data)
			{
				data = $.parseJSON(data);
				var html = '';
				if(data.Count != '0')
				{
					$.each(data.Comments,function(i){
						var row = data.Comments[i];
						html+="<li class='media'><div class='media-left'><a href='#'><img class='media-object' src='"+base_url+"images/profile-image.png' style='max-width:64px;'></a></div><div class='media-body'><h4 class='media-heading'>"+row.CommentName+"<div class='media-datrepy pull-right'>"+row.DateTime+"<a href='javascript:void(0)' onclick='reply("+row.ParentCommentId+")'>Reply<i class='fa fa-mail-reply'></i></a></div></h4><div class='media-desc'>"+row.ParentComment+"</div></div></li><li class='media' style='display:none' id='CommentDiv"+row.ParentCommentId+"'><div class='media-left media-left-space'></div><div class='media-body'><div class='media'><input type='text' class='form-control text bgcolor-white' placeholder='Enter your name here' id='FieldName"+row.ParentCommentId+"'/><textarea class='form-control bgcolor-white mar-t10 subCommenttextarea' id='Textarea"+row.ParentCommentId+"' rows='3' maxlength='200'></textarea><button id='"+row.ParentCommentId+"' class='btn btn-primary btn-sm pull-right mar-t5 SubCommentBtn'>Comment</button><button class='btn btn-warning btn-sm pull-right mar-t5 mar-r5 CancelComment' id='"+row.ParentCommentId+"'>Cancel</button></div></div></li>";
							$.each(row.ChildComments,function(i){
								subrow = row.ChildComments[i];
								if(row.ParentCommentId == subrow.ParentId)
								{
									html+="<li class='media'><div class='media-left media-left-space'></div><div class='media-body'><div class='media'><div class='media-left'><a href='#'><img style='max-width:64px;' src='"+base_url+"images/profile-image.png' class='media-object'> </a></div><div class='media-body'><h4 class='media-heading'>"+subrow.CommentedBy_Name+"<div class='media-datrepy pull-right'>"+subrow.CreatedDate+"</div></h4><div class='media-desc'>"+subrow.BlogComment+"</div></div></div></div></li>";
								}
							});
					});
				}
				else
					html+="<h3>No Comments yet..</h3>"
				$('#CommentsDiv').html(html);
				$('.CommentsCount').html(data.Count+' Comment (s)');
				if(limit == 'false')
					$('#ViewAllComments').hide();
				else
					$('#ViewAllComments').show();
				$('#CommentsDiv').find('.SubCommentBtn').click(function(){
					id = $(this).attr('id');
					SubComment(id);
				});
				$('#CommentsDiv').find('.CancelComment').click(function(){
					id = $(this).attr('id');
					CancelComment(id);
				});
				validations();
			}
	});
}

function validations()
{
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
}

function reply(id)
{
	if(id!='')
	{
		$('#CommentDiv'+id).show();
	}
}

function SubComment(id)
{
	var Name = $.trim($('#CommentsDiv').find('#FieldName'+id).val());
	var description = $.trim($('#CommentsDiv').find('#Textarea'+id).val());
	var invalid = '';
	if(Name == '')
	{
		invalid = 1;
		$('#CommentsDiv').find('#FieldName'+id).css('border-color','red');
	}
	else
		$('#CommentsDiv').find('#FieldName'+id).css('border-color','');
	if(description == '')
	{
		invalid = 1;
		$('#CommentsDiv').find('#Textarea'+id).css('border-color','red');
	}
	else
		$('#CommentsDiv').find('#Textarea'+id).css('border-color','');
	
	if(invalid == '')
	{
		$.ajax({
			url: commentUrl,
			type:"POST",
			data: {'SubComment':'true','Name':Name,'Description':description,'ParentId':id},
			beforeSend: function(){
				$('#CommentsDiv').find('.SubCommentBtn').prop('disabled', true);
			},
			complete: function(){
				$('#CommentsDiv').find('.SubCommentBtn').prop('disabled', false);
			},
			success: function(data)
			{
				if(data == 1)
				{
					alertify.alert("<b style='color:green'>Comment posted Succesfully.</b><br>");
					limit = 'true';
					get_Comments(limit)
				}
				else
					alertify.alert("Please try later");
			}
		});
	}
}

function CancelComment(id)
{
	$('#CommentDiv'+id).hide();
	$('#FieldName'+id).val('');
	$('#Textarea'+id).val('');
	$('#Textarea'+id).css('border-color','');
	$('#FieldName'+id).css('border-color','');
}