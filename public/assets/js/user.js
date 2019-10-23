// 添加用户
$('#userForm').on('submit', function() {
    // jQ方法获取表单内容
    var formDate = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formDate,
        success: function() {
            location.reload()
        },
        error: function(res) {
            // console.log(JSON.parse(res.responseText).message)
            alert(JSON.parse(res.responseText).message)
        }
    });
    // 阻止默认提交行为  submit默认提交 form默认提交get
    return false
});
// 上传图片  加载完就绑定了事件 , 后来成的标签没有这个事件
$('#modifyBox').on('change', '#avatar', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            // console.log(data[0].avatar)
            $('#avatarHidden').val(data[0].avatar);
            $('#imgTOP').attr('src', data[0].avatar);
        }
    })
})

// 获取数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(data) {
        var html = template('usersHtml', data);
        // console.log(html)
        $('#addUsers').html(html)
    }
})

// 修改信息
$('#addUsers').on('click', '.btn-default', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(data) {
            // console.log(data)
            var html = template('add-pl', data);
            // console.log(html)
            $('#modifyBox').html(html)
        },
    })

});

// 提交修改信息  事件委托 才能给新添加的标签添加事件
// 点击事件, 是按钮事件,按钮要写form的ID
// $('#modifyBox').on('click', '#addSubmit', function() {
// 提交事件, 是表单事件,表单可以直接用this
$('#modifyBox').on('submit', '#userForm', function() {
    var formData = $('#userForm').serialize();
    var id = $('#userForm').attr('data-id');
    // console.log(formData) 键值对
    //  晚上找put
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function() {
            location.reload();
        },
        error: function(res) {
            alert(JSON.parse(res.responseText).message);
        }
    });

    // // 阻止默认提交行为  submit默认提交 form默认提交get
    return false
})

// 删除一个用户
$('#addUsers').on('click', '.btn-danger', function() {
    var id = $(this).attr('data-id');
    var con = confirm('您真的要删除吗')
    if (!con) return
    $.ajax({
        type: 'delete',
        url: '/users/' + id,
        success: function() {
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
    $('#addUsers').find('input').prop('checked', status);
    if (status) return $("#btnDel").show()
    $("#btnDel").hide()
});

// 2.单选 牵动全选状态
$('#addUsers').on('change', '.btnMore', function() {
    var input = $('#addUsers').find('input');
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
    var select = $('#addUsers').find('input').filter(':checked');
    var array = []
    $.each(select, function(index, value) {
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