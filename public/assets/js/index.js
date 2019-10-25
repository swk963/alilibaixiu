// 文章评论数量
var res = {};
var sum = 0;
$.ajax({
    type: 'get',
    url: '/posts/count',
    async: false,
    success: function(res1) {
        Object.assign(res, res1)
    }
})

$.ajax({
    type: 'get',
    url: '/categories/count',
    async: false,
    success: function(res2) {
        Object.assign(res, res2)
    }
})

$.ajax({
    type: 'get',
    url: '/comments/count',
    async: false,
    success: function(res3) {
        Object.assign(res, res3)
    }
})

$.ajax({
    type: 'get',
    url: '/comments',
    async: false,
    success: function(data) {
        $.each(data.records, function(index, value) {
            if (value.state == 1) return;
            sum++
        })
        res.sum = sum;
        // console.log(res)
        var html = template('indexHtml', res);
        $('#indexBox').html(html)
    }
})