// 退出登录按钮
var exit = $('.exit');
exit.on('click', function() {
    var isConfirm = confirm('您真的要退出吗?');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(data) {
                location.href = 'login.html'
                    // console.log('ok')
            },
            error: function() {
                alert('退出失败')
            }
        })
    }
})

// 头像昵称显示
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(res) {
        // console.log(res)
        $('.profile .avatar').attr('src', res.avatar)
        $('.profile .name').html(res.nickName)
    }
})