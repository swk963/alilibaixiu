// 上传图片
$('#logo').on('change', function() {
    var formData = new FormData()
    formData.append('logos', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        contentType: false,
        processData: false,
        success: function(res) {
            $('#logohid').val(res[0].logos);
            $('#logoImg').attr('src', res[0].logos)
        }
    })
})

// 上传网站配置数据
$("#settingsForm").on('submit', function() {
    var formData = $(this).serialize();
    // console.log(formData)
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function(res) {
            location.reload();
        },
        error: function(res) {
            console.log(res)
        }
    })
    return false
})

// 渲染页面
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(res) {
        if (!res) return;
        $("#logoImg").attr('src', res.logo);
        $("#logohid").val(res.logo);
        $("#site_name").val(res.title)
        $("#site_description").val(res.description)
        $("#site_keywords").val(res.keywords)
        $('input[name="comment"]').prop('checked', res.comment)
        $('input[name="review"]').prop('checked', res.review)
    }
})