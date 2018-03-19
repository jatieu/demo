function autoFriends() {
    // Bạn có thể get token, check token, rip token tại http://atieu.xyz
    // Ngoại trừ trang Reactions bạn không sử dụng được
    var token = 'Token'; // Bỏ token full quyền vào đây
    var limit = '10'; // Giới hạn quét bài post cho mỗi lần duyệt feed
    var friends = atcurl('https://graph.facebook.com/me?fields=friends&access_token='+token);
    var afriends = JSON.parse(friends).friends.data;
    var feed = atcurl('https://graph.facebook.com/me/home?fields=id,from&access_token='+token+'&limit='+limit);
    var afeeds = JSON.parse(feed).data;
    for (var i=0; i<afeeds.length; i++) {
        var postid = afeeds[i].id;
        var userid = afeeds[i].from.id;
        for (var j=0; j<afriends.length; j++) {
            var friendid = afriends[j].id;
            if (userid == friendid) {
                var react = ['LIKE']; // Có thể dùng nhiều cảm xúc bằng lệnh var react = ['LIKE','LOVE','HAHA','WOW','SAD','ANGRY'];
                var type = react[Math.floor(Math.random() * react.length)];
                var reacted = atcurl('https://graph.facebook.com/'+postid+'/reactions?summary=true&access_token='+token);
                var check = JSON.parse(reacted).summary.viewer_reaction;
                if (check != react) {
                    atcurl('https://graph.facebook.com/'+postid+'/reactions?type='+type+'&method=post&access_token='+token);
                }
            }
        }
    }
}
function atcurl(url) {
    var response = UrlFetchApp.fetch(url); // Xóa dòng này và chọn 2 dòng dưới nếu muốn tắt thông báo lỗi (khá nhức mắt)
    //options = {muteHttpExceptions: true};
    //var response = UrlFetchApp.fetch(url, option);
    return response;
}