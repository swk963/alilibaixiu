// 页面渲染
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        var html = template('template', res);
        $("#postsBox").html(html)
        var page = template('pageT', res);
        $('.pageBox').html(page)
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
            console.log(res)
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
    console.log(formData)
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(res) {
            console.log(res)
            var html = template('template', res);
            $("#postsBox").html(html)
            var page = template('pageT', res);
            $('.pageBox').html(page)
        }
    });
    return false
})