// 评论是否需要管理员批准review
var review;

// detailTxt  detailBox 文章渲染
var id = location.search.substr(4)
$.ajax({
    type: "get",
    url: "/posts/" + id,
    success: function(res) {
        var html = template('detailTxt', res);
        $("#detailBox").html(html)
    }
})

// 点赞 detailBox
$('#detailBox').on('click', '#like', function() {
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + id,
        success: function(res) {
            // console.log($('#like').children('span'))
            // console.log(res.meta.likes)
            $('#like').children('span').html('(' + res.meta.likes + ')')
        }
    })
})

// 评论  #comment
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(res) {
        // 获取管理员是否同意的 全局变量 
        review = res.review
        if (!res.comment) return;
        // 显示评论框
        var html = template('textMB');
        $('#comment').html(html);
    }
})

// 发布评论
$('#comment').on('submit', 'form', function() {
    var content = $(this).find('textarea').val();
    var state = 1;
    if (review) state = 0;
    $.ajax({
            type: 'post',
            url: '/comments',
            data: {
                content: content,
                post: id,
                state: state
            },
            success: function(res) {
                alert('评论成功')
                location.reload();
            },
            error: function(res) {
                alert('评论失败' + JSON.parse(res.responseText).message);
                // console.log(res.responseText)
            }
        })
        // 阻止表单默认提交行为
    return false;
})