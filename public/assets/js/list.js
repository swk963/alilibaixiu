// listTxT  listBox
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