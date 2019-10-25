var key = location.search.substr(5);
// console.log(key)
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function(res) {
        var html = template('searchTXT', { data: res });
        // console.log(res)
        $("#searchBox").html(html)
    }
})