// ulTemplate   ulBox  热门推荐
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(res) {
        var resHtml = `
        {{each $data val}}
        <li>
          <a href="detail.html?id={{val._id}}">
            <img src="{{val.thumbnail}}" alt="">
            <span>{{val.title}}</span>
          </a>
        </li>
        {{/each}}
    `
        var html = template.render(resHtml, res)
        $("#ulBox").html(html)
    }
})