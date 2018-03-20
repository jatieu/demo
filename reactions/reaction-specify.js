function autoSpecify() {
    // Bạn có thể get token, check token, rip token tại http://atieu.xyz
    // Ngoại trừ trang Reactions bạn không sử dụng được
    var token ='Token'; // Bỏ token full quyền vào đây
    var ids = ['ID1','ID2','ID3']; // Bỏ ID bạn bè hoặc ID fanpage vào đây
    var limit = '10'; // Giới hạn cho mỗi lần quét status của ID chỉ định
    var react = ['LIKE']; // Có thể dùng nhiều cảm xúc bằng lệnh var react = ['LIKE','LOVE','HAHA','WOW','SAD','ANGRY'];
    var type = react[Math.floor(Math.random() * react.length)];
    for (var i=0; i<ids.length; i++) {
        var feed = atcurl('https://graph.facebook.com/'+ids[i]+'/feed?fields=id&limit='+limit'&access_token='+token);
        var post = JSON.parse(feed).data;
        for (var j=0; j<post.length; j++) {
            var postid = post[i].id;
            atcurl('https://graph.fb.me/'+postid+'/reactions?type='+type+'&method=post&access_token='+token);
        }
    }
}
function atcurl(url) {
    var response = UrlFetchApp.fetch(url); // Xóa dòng này và chọn 2 dòng dưới nếu muốn tắt thông báo lỗi (khá nhức mắt)
    //options = {muteHttpExceptions: true};
    //var response = UrlFetchApp.fetch(url, option);
    return response;
}