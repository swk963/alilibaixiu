$.ajax({
    type: 'get',
    url: '/comments',
    success: function(res) {
        // console.log(res.records)
        var html = template('observer', res);
        $('#observerBox').html(html);
        // var page = template('fyHtml', res);
        // $(".fyBox").html(page);
        $('#fyBox').twbsPagination({
            totalPages: res.pages,
            visiblePages: 3,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function(event, page) {
                $('#page-content').text('Page ' + page);
            }
        });
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
    if (!confirm("请确认是否删除")) return;
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/comments/' + id,
        success: function(res) {
            location.reload()
        }
    })
})