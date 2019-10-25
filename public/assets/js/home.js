$.ajax({
    type: 'get',
    url: '/slides',
    success: function(res) {
        // console.log(res)
        var html = template('slideshow', res)
        $('#slideshowBox').html(html)
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function(index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });
        $('.swipe .arrow').on('click', function() {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
});


// 最新发布
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function(res) {
        var html = template('latest', res);
        $("#newDivBox").html(html);
        // console.log(res)
        // console.log(html);
        // 报警 有val没有获取到
    }
})