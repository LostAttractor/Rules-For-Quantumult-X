/*
将场所码下方最近核酸记录改为24～48小时内阴性 采样时间为 原本核酸采样时间但日期为当前时间前一天
***************************
Quantumult X:

[rewrite_local]
^https?:\/\/suishenmafront1.sh.gov.cn\/hesuan\/api\/hs\/getByTokenV2\?token=.+ url script-response-body https://raw.githubusercontent.com/LostAttractor/Rules-For-Quantumult-X/develop/Scripts/Other/SHJKM/SHJKM_CSM_HESUAN.js

[mitm]
hostname = suishenmafront1.sh.gov.cn

**************************/

/* Example https://suishenmafront1.sh.gov.cn/hesuan/api/hs/getByTokenV2?token=f950f7d89f7a4bb8855a072f36b321ea
{
  "code" : "200",
  "data" : [
    {
      "collect_mode" : "1",
      "nat_result_name" : "阴性",
      "nat_result" : "1",
      "sample_date" : "2022-10-01 00:03:10"
    }
  ],
  "sysTime" : "2022\/10\/01 05:35:29",
  "sessionId" : "62e87fe886bc4e9cae54fe42d00cabef",
  "message" : "success",
  "userInfo" : "**文,**************2158"
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
let data = body["data"][0];

//let offset = 3600 * 1000 * 12 + Math.round(Math.random() * 3600 * 1000 * 2 * 2) - 3600 * 1000 * 2; //12小时+-2小时 转为毫秒
//let date = new Date(Date.now() - offset);
let simple = new Date(data["sample_date"]);
let simple_date = new Date(Date.now() - 3600 * 24 * 1000);

simple_date.setHours(simple.getHours());
simple_date.setMinutes(simple.getMinutes());
simple_date.setSeconds(simple.getSeconds());

data["sample_date"] = simple_date.format("yyyy-MM-dd hh:mm:ss");
data["nat_result"] = "1"; 

$done({
  body: JSON.stringify(body)
});
