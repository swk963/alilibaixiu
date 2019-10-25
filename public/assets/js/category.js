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

// 删除 delete
$('#classListBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/categories/' + id,
        success: function(res) {
            location.reload()
        }
    })
})

// 全选功能 btnDel 批量删除按钮  btnAll 全选按钮  btnMore 动态创建的按钮
// 1.全选
var btnAll = $('#btnAll');
var btnDel = $('#btnDel');
btnAll.on('change', function() {
    var status = $(this).prop('checked');
    $('#classListBox').find('input').prop('checked', status);
    if (status) return $("#btnDel").show()
    $("#btnDel").hide()
});

// 2.单选 牵动全选状态
$('#classListBox').on('change', '.btnMore', function() {
    var input = $('#classListBox').find('input');
    var checked = input.filter(':checked');
    if (input.length == checked.length) {
        $('#btnAll').prop('checked', true)
    } else if (checked.length > 1) {
        $('#btnDel').show();
        $('#btnAll').prop('checked', false);
    } else {
        $('#btnDel').hide();
    }
})

// 删除所有选中
$('#btnDel').on('click', function() {
    var select = $('#classListBox').find('input').filter(':checked');
    var array = []
    $.each(select, function(index, value) {
        f
        array.push($(value).parent().attr('data-id'))
    });
    var ary = array.join('-')
    var con = confirm('您真的要删除吗')
    if (!con) return
        // console.log(ary)
    $.ajax({
        type: 'delete',
        url: '/users/' + ary,
        success: function() {
            location.reload()
        }
    })
})