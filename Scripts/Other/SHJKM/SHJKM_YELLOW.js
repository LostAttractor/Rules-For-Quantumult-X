/*
***************************
Quantumult X:

[rewrite_local]
^https?:\/\/smartgate\.ywtbsupappw\.sh\.gov\.cn\/ebus\/suishenma\/suishenma\/jiankangma\/create\/v19 url script-response-body https://raw.githubusercontent.com/LostAttractor/Rules-For-Quantumult-X/develop/Scripts/Other/SHJKM/SHJKM_YELLOW.js

[mitm]
hostname = smartgate.ywtbsupappw.sh.gov.cn

**************************/

let body = JSON.parse($response.body)
let data = body["data"];

// 00 = 绿码
// 01 = 黄码
// 10 = 红码
data["type"] = "01"; 
$done({
  body: JSON.stringify(body)
});
