$.ajax({
    type: 'get',
    url: '/comments',
    success: function(res) {
        var html = template('observer', res);
        $('#observerBox').html(html);
        var page = template('fyHtml', res);
        $(".fyBox").html(page);
    }
})

function fnFY(data) {
    $.ajax({
        type: 'get',
        url: '/comments',
        success: function(res) {
            var html = template('observer', res);
            $('#observerBox').html(html);
            var page = template('fyHtml', res);
            $(".fyBox").html(page);
        }
    });
}
// 批准驳回
$('#observerBox').on('click', '.PZBH', function(res) {
    var id = $(this).attr('data-id');
    var state = $(this).text().trim() == '批准' ? 1 : 0;
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: state,
        },
        success: function(res) {
            location.reload()
                // console.log(res)
        }
    })
});

// 删除
$('#observerBox').on('click', '.delete', function(res) {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/comments/' + id,
        success: function(res) {
            location.reload()
        }
    })
})