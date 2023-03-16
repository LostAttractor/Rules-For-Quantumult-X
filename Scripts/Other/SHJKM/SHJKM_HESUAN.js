/*
将核酸码下方最近核酸记录改为24～48小时内阴性 采样时间为 原本核酸采样时间但日期为当前时间前一天
***************************
Quantumult X:

[rewrite_local]
^https?:\/\/smartgate\.ywtbsupappw\.sh\.gov\.cn\/ebus\/suishenma\/epidemicPrevention\/getNucleicAcidTest url script-response-body https://raw.githubusercontent.com/LostAttractor/Rules-For-Quantumult-X/develop/Scripts/Other/SHJKM/SHJKM_HESUAN.js

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

Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}

let body = JSON.parse($response.body)
let data = body["data"];

let simple = new Date(data["sampleDate"]);
let simple_date = new Date(Date.now() - 3600 * 24 * 1000);

simple_date.setHours(simple.getHours());
simple_date.setMinutes(simple.getMinutes());
simple_date.setSeconds(simple.getSeconds());

data["sampleDate"] = simple_date.format("yyyy-MM-dd hh:mm:ss");
data["natResult"] = "1"; 

$done({
  body: JSON.stringify(body)
});
