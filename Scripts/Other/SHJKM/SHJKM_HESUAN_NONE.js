/*
将核酸码下方最近核酸记录改为3天内未采样 采样时间为 96小时+-2小时前
***************************
Quantumult X:

[rewrite_local]
^https?:\/\/smartgate\.ywtbsupappw\.sh\.gov\.cn\/ebus\/suishenma\/epidemicPrevention\/getNucleicAcidTest url script-response-body https://raw.githubusercontent.com/LostAttractor/Rules-For-Quantumult-X/develop/Scripts/Other/SHJKM/SHJKM_HESUAN_NONE.js

[mitm]
hostname = smartgate.ywtbsupappw.sh.gov.cn

**************************/

/* Example https://smartgate.ywtbsupappw.sh.gov.cn/ebus/suishenma/epidemicPrevention/getNucleicAcidTest
{
  "code" : "200",
  "data" : {
    "result" : null, //未知
    "natResultName" : "阴性", //阴性 | 阳性
    "collectMode" : "10", //核酸采集一管的人数
    "collectModeName" : "十合一混采（东软）", //采集名称
    "sampleDate" : "2022-09-25 00:33:05", //采样时间
    "name" : "**文", //姓名
    "natResult" : "1" //结果 1 = 通过 0 = 待复合
  },
  "timestamp" : 1664550399000,
  "desc" : "操作成功"
}
*/

let body = JSON.parse($response.body)
body["data"] = [];

$done({
  body: JSON.stringify(body)
});
