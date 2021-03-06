// 分类渲染
$.ajax({

    type: 'get',
    url: '/categories',
    success: function(res) {
        // category
        // console.log(res)
        var html = template('classList', res);
        $('#category').html(html)
    }
})

// 图片上传 fromEditBiox
$('#fromEditBiox').on('change', '#feature', function() {
    // var FormData = new FormData();不能用大写FormData 当变量
    var formData = new FormData()
    formData.append('feature', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        contentType: false,
        processData: false,
        success: function(res) {
            $('.classimg').attr('src', res[0].feature).show();
            $('#featureImg').val(res[0].feature);

        }
    })
})

// 表单上传  路由里获取作者id so登录状态才能发送文章 fromEditBiox
$('#fromEditBiox').on('submit', '#addFrom', function() {
    var formData = $('#addFrom').serialize();
    // console.log(formData)
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
                // console.log('ok')
        },
        error: function(res) {
            console.log(res)
        }
    })

    return false;
})

// 修改数据渲染
if (location.search != '') getId()

function getId() {
    // return;
    var id = location.search.substr(4);
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(res) {
            // console.log(res)
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(param) {
                    res.param = param
                    var html = template('editList', res);
                    $("#fromEditBiox").html(html);
                    console.log(res)
                }
            })
        }
    })
}

// 修改的form名 fromEdit
$("#fromEditBiox").on('submit', '#fromEdit', function() {
    var formData = $(this).serialize()
    var id = location.search.substr(4);
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        }
    })
    return false;
})