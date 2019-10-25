    // 随机推挤 randomBox  random
    $.ajax({
        type: 'get',
        url: '/posts/random',
        success: function(res) {
            var random = `{{each $data val}}
            <li>
                <a href="detail.html?id={{val._id}}">
                    <p class="title">{{val.title}}</p>
                    <p class="reading">阅读({{val.meta.views}})</p>
                    <div class="pic">
                        <img src="{{val.thumbnail}}" alt="">
                    </div>
                </a>
            </li>
            {{/each}}`
            var html = template.render(random, res);
            $("#randomBox").html(html)
        }
    });

    // 最新评论  newCommentBox
    $.ajax({
        type: 'get',
        url: '/comments/lasted',
        success: function(res) {
            res = res.reverse()
            var comment = `
            {{each $data val}}
            <li>
            <a href="javascript:;">
                <div class="avatar">
                    <img src="{{val.thumbnail}}" alt="">
                </div>
                <div class="txt">
                    <p>
                        <span>{{val.author.nickName}}</span>{{val.createAt.split('T')[0]}}说:
                    </p>
                    <p>{{val.content}}</p>
                </div>
            </a>
            </li>
            {{/each}}
            `
            var html = template.render(comment, res);
            $("#newCommentBox").html(html)
        }
    })

    // nav  navBox
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function(res) {
            var navs = `
           {{each $data val}}
           <li><a href="list.html?id={{val._id}}"><i class="fa {{val.className}}"></i>{{val.title}}</a></li> 
           {{/each}}
           `
            var html = template.render(navs, res);
            $("#navBox").html(html)
        }
    })

    // 搜索 searchForm
    $('#searchForm').on('submit', function() {
        var key = $(this).find('.keys').val()
        location.href = '/search.html?key=' + key
        return false
    })