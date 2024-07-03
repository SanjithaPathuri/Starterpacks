cpage = 1;
$(function() {
	getMyIdeas(cpage);
    $('#AddBtn').click(function() {
        $('#AddBtn').hide();
        $('#idea_form').show();
        $('#PostBtn').show();
        $('#CancelBtn').show();
    });
    $('#CancelBtn').click(function() {
        location.reload();
    });
    $('#PostBtn').click(function() {
        var invalid = '';
        if($.trim($('#IdeaTile').val()) == '')
		{
			 invalid = 1;
			 $('#IdeaTile').css('border', '1px solid red');
		}
		else
			 $('#IdeaTile').css('border', '');
		 
		if($.trim($('#Prize').val()) == '')
		{
			 invalid = 1;
			 $('#Prize').css('border', '1px solid red');
		}
		else
			 $('#Prize').css('border', '');
		 
		if($.trim($('#StartDate').val()) == '')
		{
			 invalid = 1;
			 $('#StartDate').css('border', '1px solid red');
		}
		else
			$('#StartDate').css('border', '');
		
		if($.trim($('#EndDate').val()) == '')
		{
			 invalid = 1;
			 $('#EndDate').css('border', '1px solid red');
		}
		else
			$('#EndDate').css('border', '');
		
		if($.trim($('#Label').val()) == '')
		{
			 invalid = 1;
			 $('#s2id_Label').css('border', '1px solid red');
		}
		else
			$('#s2id_Label').css('border', '');
		
         $('#idea_form').find('select').each(function() {
			var id = $(this).attr('id');
            if ($.trim($('#'+id).val()) == '') {
                invalid = 1;
                $('#s2id_'+id).css('border', '1px solid red');
            } else $('#s2id_'+id).css('border', '');
        }); 
		
		if($.trim($('#UpId').val()) == '')
		{
			$('#idea_form').find('input[type=file]').each(function() {
				if ($.trim($(this).val()) == '') {
					invalid = 1;
					$(this).css('border', '1px solid red');
				} else $(this).css('border', '');
			});
		}
		
        if ($.trim(CKEDITOR.instances.instructions.getData()) == '') {
            invalid = 1;
            $('#cke_instructions').css('border', '1px solid red');
        } else $('#cke_instructions').css('border', '');
        if ($.trim(CKEDITOR.instances.desc.getData()) == '') {
            invalid = 1;
            $('#cke_desc').css('border', '1px solid red');
        } else $('#cke_desc').css('border', '');
        if (invalid == '') {
            $('#idea_form').removeAttr('onsubmit');
            $('#idea_form').attr("action", "");
            $('#idea_form').trigger('submit');
        }
    });
    CKEDITOR.replace('instructions');
    CKEDITOR.replace('desc');
    $('#theme').change(function() {
        var file;
        file = this.files[0];
        var name = file.name;
        var size = file.size;
        var type = file.type;
        var error = 0;
        if (file.name.length < 1) {
            alertify.alert("Invalid File name");
            $('#theme').val('');
            error = 1;
        } else if (file.size > 2000000) {
            alertify.alert("File is too big, Max allowed size: 2MB");
            $('#theme').val('');
            error = 1;
        } else if (file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg') {
            alertify.alert("File doesnt match png, jpg or gif");
            $('#theme').val('');
            error = 1;
        } else {
            var img = new Image();
            var _URL = window.URL || window.webkitURL;
            img.src = _URL.createObjectURL(file);
            img.onload = function() {
                if (this.height < 400 || this.width < 1550) {
                    err = '1';
                    alertify.alert("Please upload Images with atleast 1600 x 420 resolutions");
                    $('#theme').val('');
                    return false;
                }
            };
        }
    });
    $('#Attachment').change(function() {
        file = this.files[0];
        var name = file.name;
        var size = file.size;
        var type = file.type;
        var error = 0;
        if (file.name.length < 1) {
            alertify.alert("Invalid File name");
            $('#Attachment').val('');
            error = 1;
        } else if (file.size > 2000000) {
            alertify.alert("File is too big, Max allowed size: 2MB");
            $('#Attachment').val('');
            error = 1;
        } else if (file.type != 'application/pdf' && file.type != 'application/msword' && file.type != 'application/doc' && file.type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.type != 'application/msexcel') {
            alertify.alert("File doesnt match DOC or PDF or Word file");
            $('#Attachment').val('');
            error = 1;
        }
    });
});

function getsubcat(pid) {
    $('#SubcategoryDiv').hide();
    $.ajax({
        url: base_url+"PostYourIdea/getsub",
        data: {
            pid: pid
        },
        type: "POST",
        success: function(result) {
            var message = $.parseJSON(result);
            $("#SubCategory").html(message);
            $("#SubCategory").append("<option value='' selected>Please select a sub Category</option>");
            $('#SubcategoryDiv').show();
        }
    });
}

function getMyIdeas(page)
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
			var j = 1;
			if(data.ideas!='')
			{
				$.each(data.ideas, function(i){
					var row = data.ideas[i];
					var AdminStatus ='';
					var status ='';
					if(row.UserStatus =='1')
						status = "<span class='label label-success'>Active</span>";
					else
						status = "<span class='label label-warning'>In-Active</span>"; 
					if(row.AdminStatus=='1')
						AdminStatus = "<span class='label label-success'>Approved</span>"
					else
						AdminStatus = "<span class='label label-danger'>Pending</span>";
					html+="<tr><td>"+j+"</td><td>"+row.IdeaTile+"</td><td>"+row.Eligibility+"</td><td align='center'>"+row.MainCategoryName+"</td><td align='center'>"+row.SubCategory_name+"</td><td align='center'><a href='"+base_url+row.Attachment+"' target='_blank'>Download Attachment</a></td><td><img src='"+base_url+row.Theme+"' style='width:110px'/></td><td>"+status+"</td><td>"+AdminStatus+"</td><td align='center'><button title='Edit' type='button' class='btn btn-xs btn-primary mar-b5 bt-r mar_b5' onclick='editfun("+row.CompetitionId+");'><i class='fa fa-pencil'></i></button> <button title='Delete' type='button' class='btn btn-xs btn-danger mar-b5 bt-r mar_b5' onclick='delfunc("+row.CompetitionId+");'><i class='fa fa-trash'></i></button></td></tr>";
					j++;
				});
			}
			else
				html +="<tr><td><td></td><td></td><td></td><td>No Results Found..</td><td></td><td></td><td></td><td></td><td></td></tr>";
			$('#MyIdeas_table').find('tbody').html(html);
			$('#pagination').html(data.pagination);
			$('.pagination').find('a').click(function(){
				var newpage = $(this).parent('li').attr('page')
				getMyIdeas(newpage);
			})
		}
	});
}

function editfun(id)
{
	id = $.trim(id);
	if(id!='')
	{
		$.ajax({
			url: "",
			type:"POST",
			data: {'Edit':'true', 'id':id},
			beforeSend: function(){
			},
			complete: function(){
			},
			success: function(data)
			{
				data = $.parseJSON(data);
				catid = data.CategoryId;
				 $.ajax({
						url: base_url+"AdminIdeaCompetition/getsub",
						data: { pid: catid },
						type: "POST",
						success: function(result) 
						{
							var message = $.parseJSON(result);
							$("#SubCategory").html(message);
							$("#SubCategory").append("<option value='' selected>Please select a sub Category</option>");
							$('#SubcategoryDiv').show();
							$('#SubCategory').select2('val',data.SubCategoryId);
						}
					});
				$('#IdeaTile').val(data.IdeaTile);
				$('#Eligibility').val(data.Eligibility);
				$('#Prize').val(data.Prize);
				$('#StartDate').val(data.StartDate);
				$('#EndDate').val(data.EndDate);
				$('#Status').select2('val',data.AdminStatus);
				$('#UpId').val(data.CompetitionId);
				$('#Label').select2('val',data.IdeaStatus);
				$('#Category').select2('val',data.CategoryId);
				CKEDITOR.instances['desc'].setData(data.Description)
				CKEDITOR.instances['instructions'].setData(data.Instructions)
				$('#idea_form').show();
				$('#AddBtn').hide();
				$('#CancelBtn').show();
				$('#PostBtn').show();
			}
		});
	}
}

function delfunc(id)
{
	alertify.confirm("Do you really want to delete this Idea ?", function (e) 
	{
		if (e) 
		{
			$.ajax({
				url: "",
				type:"POST",
				data: {'Delete':'true','id':id},
				beforeSend: function(){
				},
				complete: function(){
				},
				success: function(data)
				{
					getMyIdeas(cpage);
					alertify.error("Idea deleted..!!"); 
				}
			});
		}
	});
}