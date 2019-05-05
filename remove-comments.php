<?php
set_time_limit(0);
error_reporting(0);

$token = 'TOKEN'; //Token full quyền
$friend = 'FRIEND_ID'; //ID của bạn bè

$feeds = json_decode(atcurl('https://graph.facebook.com/'.$friend.'/feed?fields=id,comments&access_token='.$token), true);
$findid = json_decode(atcurl('https://graph.facebook.com/me?fields=id&access_token='.$token), true);
$selfid = $findid[id];

fetch:
for ($i=0; $i<count($feeds[data]); $i++) {
    $posid = $feeds[data][$i][id];
    $comments = json_decode(atcurl('https://graph.facebook.com/'.$posid.'/comments?access_token='.$token), true);
    for ($j=0; $j<count($comments[data]); $j++) {
        $cmtid = $comments[data][$j][id];
        $ownid = $comments[data][$j][from][id];
        $msgid = $comments[data][$j][message];
        if ($ownid == $selfid) {
            atcurl('https://graph.facebook.com/'.$cmtid.'?method=delete&access_token='.$token);
        }
    }
}
if (!empty($feeds[paging][next])) {
    $feeds = json_decode(atcurl($feeds[paging][next]), true);
    goto fetch;
}

curl:
function atcurl($url) {
    $data = curl_init();
    curl_setopt($data, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($data, CURLOPT_URL, $url);
    $send = curl_exec($data);
    curl_close($data);
    return $send;
}
?>
