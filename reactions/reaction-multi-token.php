<?php
// Bạn có thể get token, check token, rip token tại http://atieu.xyz
// Ngoại trừ trang Reactions bạn không sử dụng được
set_time_limit(0);
error_reporting(0);
$tokens = array('Token1','Token2','Token3'); // Bỏ token full quyền vào đây, có thể thêm hoặc bớt token
$limit = '10'; // Giới hạn quét bài post cho mỗi lần duyệt feed
foreach ($tokens as $token) {
    $friends = json_decode(atcurl('https://graph.facebook.com/me?fields=friends&access_token='.$token), true);
    $afriends = $friends[friends][data];
    $feed = json_decode(atcurl('https://graph.facebook.com/me/home?fields=id,from&access_token='.$token.'&limit='.$limit), true);
    $afeeds = $feed[data];
    for ($i=0; $i<count($afeeds); $i++) {
        $postid = $afeeds[$i][id];
        $userid = $afeeds[$i][from][id];
        for ($j=0; $j<count($afriends); $j++) {
            $friendid = $afriends[$j][id];
            if ($userid == $friendid) {
                $react = array('LIKE'); // Có thể dùng nhiều cảm xúc bằng lệnh $react = array('LIKE','LOVE','HAHA','WOW','SAD','ANGRY');
                $type = $react[rand(0,count($react)-1)];
                $reacted = json_decode(atcurl('https://graph.facebook.com/'.$postid.'/reactions?summary=true&access_token='.$token), true);
                $check = $reacted[summary][viewer_reaction];
                if ($check != $type) {
                    atcurl('https://graph.facebook.com/'.$postid.'/reactions?type='.$type.'&method=post&access_token='.$token);
                }
            }
        }
    }
}
function atcurl($url) {
    $data = curl_init();
    curl_setopt($data, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($data, CURLOPT_URL, $url);
    $send = curl_exec($data);
    curl_close($data);
    return $send;
}
?>