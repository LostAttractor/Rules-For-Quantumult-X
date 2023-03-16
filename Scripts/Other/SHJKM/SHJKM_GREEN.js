/*
***************************
Quantumult X:

[rewrite_local]
^https?:\/\/smartgate\.ywtbsupappw\.sh\.gov\.cn\/ebus\/suishenma\/suishenma\/jiankangma\/create\/v19 url script-response-body https://raw.githubusercontent.com/LostAttractor/Rules-For-Quantumult-X/develop/Scripts/Other/SHJKM/SHJKM_GREEN.js

[mitm]
hostname = smartgate.ywtbsupappw.sh.gov.cn

**************************/

/* Example https://smartgate.ywtbsupappw.sh.gov.cn/ebus/suishenma/suishenma/jiankangma/create/v19
{
  "code" : "200",
  "data" : {
    "ssmurl" : "https://s.sh.gov.cn/1079d46143a3a80ffce673acb7c0071664562623597",
    "hasPetCode" : 0,
    "isDatabasePhoto" : 1,
    "kinsFolkCodeStatus" : "1",
    "signature" : "6391c6c1fa819e175d768e514ef8e425",
    "relativesCode" : "1",
    "type" : "00",
    "timestamp" : "1664562623585"
  },
  "timestamp" : 1664562623611,
  "desc" : "操作成功"
}
*/

let body = JSON.parse($response.body)
let data = body["data"];

// 二维码内容
//data["ssmurl"] = "FUCKYOU";
// 00 = 绿码
// 01 = 黄码
// 10 = 红码
data["type"] = "00"; 
$done({
  body: JSON.stringify(body)
});
