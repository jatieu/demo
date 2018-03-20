function autoSingle() {
    // Bạn có thể get token, check token, rip token tại http://atieu.xyz
    // Ngoại trừ trang Reactions bạn không sử dụng được
    var token ='Token'; // Bỏ token full quyền vào đây
    var userid = 'ID'; // Bỏ ID của bạn bè hoặc fanpage vào đây
    var limit = '10'; // Giới hạn cho mỗi lần quét status của ID chỉ định
    var react = ['LIKE']; // Có thể dùng nhiều cảm xúc bằng lệnh var react = ['LIKE','LOVE','HAHA','WOW','SAD','ANGRY'];
    var type = react[Math.floor(Math.random() * react.length)];
    var feed = atcurl('https://graph.facebook.com/'+userid+'/feed?fields=id&limit='+limit+'&access_token='+token);
    var post = JSON.parse(feed).data;
    for (var i=0; i<post.length; i++) {
        var postid = post[i].id;
        atcurl('https://graph.fb.me/'+postid+'/reactions?type='+type+'&method=post&access_token='+token);
    }
}
function atcurl(url) {
    var response = UrlFetchApp.fetch(url); // Xóa dòng này và chọn 2 dòng dưới nếu muốn tắt thông báo lỗi (khá nhức mắt)
    //options = {muteHttpExceptions: true};
    //var response = UrlFetchApp.fetch(url, option);
    return response;
}