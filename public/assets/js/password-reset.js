// 修改密码  old 旧密码  password 新密码  confirm 确认密码  form-horizontal表单类名
$('.form-horizontal').on('submit', function() {
    var formData = $(this).serialize()
        // console.log(formData);
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function(res) {
            location.href = "/admin/login.html"
        },
        error: function(res) {
            alert(JSON.parse(res.responseText).message)
        }
    })
    return false;
})