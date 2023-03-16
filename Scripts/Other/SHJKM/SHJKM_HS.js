/*
将核酸记录采样时间改为 原本核酸采样时间但日期为当前时间前一/二/三天
***************************
Quantumult X:

[rewrite_local]
^https?:\/\/suishenmaback2\.sh\.gov\.cn\/smzy\/shspace\/hs\/getByMwV3\?_t=.+ url script-response-body https://raw.githubusercontent.com/LostAttractor/Rules-For-Quantumult-X/develop/Scripts/Other/SHJKM/SHJKM_HS.js

[mitm]
hostname = suishenmaback2.sh.gov.cn

**************************/

/* Example https://suishenmaback2.sh.gov.cn/smzy/shspace/hs/getByMwV3?_t=1664623050573
{
  "code" : "200",
  "data" : [
    {
      "nat_result_name" : "阴性",
      "check_project" : "核酸",
      "sample_type_name" : "咽拭子",
      "sample_date" : "2022-09-30 17:29:16",
      "nat_result" : "1",
      "test_orgname" : "上海世和医学检验实验室",
      "collect_date" : "2022-09-30 20:52:01",
      "card_type_name" : "身份证",
      "collect_mode" : "1",
      "sample_orgname" : "",
      "name" : "**文",
      "report_date" : "2022-10-01 00:03:10"
    },
    {
      "nat_result_name" : "阴性",
      "check_project" : "核酸",
      "sample_type_name" : "咽拭子",
      "sample_date" : "2022-09-24 19:01:56",
      "nat_result" : "1",
      "test_orgname" : "上海世和医学检验实验室",
      "collect_date" : "2022-09-24 22:19:55",
      "card_type_name" : "身份证",
      "collect_mode" : "10",
      "sample_orgname" : "",
      "name" : "**文",
      "report_date" : "2022-09-25 00:33:05"
    },
    {
      "nat_result_name" : "阴性",
      "check_project" : "核酸",
      "sample_type_name" : "咽拭子",
      "sample_date" : "2022-09-20 14:08:37",
      "nat_result" : "1",
      "test_orgname" : "上海世和医学检验实验室",
      "collect_date" : "2022-09-20 16:03:12",
      "card_type_name" : "身份证",
      "collect_mode" : "1",
      "sample_orgname" : "",
      "name" : "**文",
      "report_date" : "2022-09-20 20:06:57"
    },
    {
      "nat_result_name" : "阴性",
      "check_project" : "核酸",
      "sample_type_name" : "咽拭子",
      "sample_date" : "2022-09-16 18:19:48",
      "nat_result" : "1",
      "test_orgname" : "上海捷诺医学检验实验室（气膜）",
      "collect_date" : "2022-09-16 21:20:52",
      "card_type_name" : "身份证",
      "collect_mode" : "10",
      "sample_orgname" : "",
      "name" : "**文",
      "report_date" : "2022-09-17 03:37:34"
    }
  ],
  "sysTime" : "2022\/10\/01 19:17:30",
  "sessionId" : "40e941d4cf6c4a1fa5faf9931abd5a86",
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
let data = body["data"];

for (i = 0; i < data.length; i++) {
    let simple = new Date(data[i]["sample_date"]);
    let collect = new Date(data[i]["collect_date"]);
    let report = new Date(data[i]["report_date"]);

    let collect_offset = collect.getTime() - simple.getTime();
    let report_offset = report.getTime() - simple.getTime();

    let simple_date = new Date(Date.now() - 3600 * 24 * 1000 * (i + 1));
    simple_date.setHours(simple.getHours());
    simple_date.setMinutes(simple.getMinutes());
    simple_date.setSeconds(simple.getSeconds());
    
    let collect_date = new Date(simple_date.getTime() + collect_offset);
    let report_date = new Date(simple_date.getTime() + report_offset);

    data[i]["sample_date"] = simple_date.format("yyyy-MM-dd hh:mm:ss");
    data[i]["collect_date"] = collect_date.format("yyyy-MM-dd hh:mm:ss");
    data[i]["report_date"] = report_date.format("yyyy-MM-dd hh:mm:ss");

    data[i]["nat_result_name"] = "阴性";
    data[i]["nat_result"] = "1";
}

$done({
  body: JSON.stringify(body)
});
