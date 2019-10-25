// 页面渲染
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        // console.log(res.records.reverse())
        // var records = res.records.reverse()
        var html = template('template', res);
        $("#postsBox").html(html)
            // var page = template('pageT', res);
            // $('.pageBox').html(page)
        $('.pageBox').twbsPagination({
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
});

// template.defaults.imports.xxx = formateDate
// 时间格式函数
function formateDate(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
};

// 分页
function changeTop(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(res) {
            // console.log(res)
            // var records = res.records.reverse()
            // var html = template('template', records);
            var html = template('template', res);
            $("#postsBox").html(html)
            var page = template('pageT', res);
            $('.pageBox').html(page)
        }
    })

}

// 分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('pageClass', res);
        $(".pageClassBox").html(html)
    }
});

// 筛选
$('#screen').on('submit', function() {
    var formData = $(this).serialize();
    // console.log(formData)
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(res) {
            // console.log(res)
            // var records = res.records.reverse()
            // var html = template('template', records);
            var html = template('template', res);
            $("#postsBox").html(html)
            var page = template('pageT', res);
            $('.pageBox').html(page)
        }
    });
    return false
})

// 删除 delete
$("#postsBox").on('click', '.delete', function() {
    if (!confirm('您真的要进行删除操作吗')) return;
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'delete',
        url: '/posts/' + id,
        success: function() {
            location.reload()
        }
    })
})