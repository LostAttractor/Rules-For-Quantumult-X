/*
将核酸码下方最近核酸记录改为3天内未采样
***************************
Quantumult X:

[rewrite_local]
^https?:\/\/suishenmafront1.sh.gov.cn\/hesuan\/api\/hs\/getByTokenV2\?token=.+ url script-response-body https://raw.githubusercontent.com/LostAttractor/Rules-For-Quantumult-X/develop/Scripts/Other/SHJKM/SHJKM_CSM_HESUAN_NONE.js

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

let body = JSON.parse($response.body)
body["data"] = [];

$done({
  body: JSON.stringify(body)
});
