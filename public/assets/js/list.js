// listTxT  listBox
// 文章
var id = location.search.substr(4)
$.ajax({
    type: 'get',
    url: '/posts/category/' + id,
    success: function(res) {
        var html = template('listTxT', res);
        $("#listBox").html(html);
        // console.log(res)
    }
})

// 分类名
$.ajax({
    type: 'get',
    url: '/categories/' + id,
    success: function(res) {
        $("#topList").html(res.title);
        // console.log(res)
    }
})