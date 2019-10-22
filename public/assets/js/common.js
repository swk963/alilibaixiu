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