// 创建分类
$('#classForm').on('submit', function() {
    var formData = $(this).serialize()
        // console.log(formData)
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function(res) {
            location.reload()
        },
        error: function(res) {
            alert('失败')
        }
    })
    return false
})

// 渲染页面 classListBox classList
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('classList', res);
        $('#classListBox').html(html)
    }
})

// 编辑
$('#classListBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(res) {
            // console.log(res)
            var html = template('classListB', res);
            $('#classBbox').html(html)
        }
    })
})

// 提交修改  form新名字 modifyCategory
$('#classBbox').on('submit', '#modifyCategory', function(res) {
    var id = $(this).attr('data-id');
    var formData = $(this).serialize()
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function(res) {
            location.reload()
        }
    })
    return false
})