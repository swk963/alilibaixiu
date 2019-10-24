// 上传图片
$('#fileID').on('change', function() {
    // console.log(1)
    var formData = new FormData();
    formData.append('images', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        contentType: false,
        processData: false,
        success: function(res) {
            $('#image').val(res[0].images);
            $('.image').attr('src', (res[0].images)).show();
        }
    })
    return false
})

// 提交
$('#slidesForm').on('submit', function() {
    // console.log(1)
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function(res) {
            location.reload()
        }
    })
    return false;
})

// slidesBox 渲染数据
$.ajax({
    type: 'get',
    url: '/slides',
    async: false,
    success: function(res) {
        var html = template('slideshow', res);
        $('#slidesBox').html(html);
        // console.log(res)
    }
})

// 删除
$('#slidesBox').on('click', ".delete", function() {
    var id = $(this).attr('data-id');
    if (!confirm('你确定要删除吗')) return;
    $.ajax({
        type: 'delete',
        url: '/slides/' + id,
        success: function(res) {
            location.reload()
        }
    })
})