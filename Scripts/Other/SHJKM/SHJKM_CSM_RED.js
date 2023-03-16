/*
***************************
Quantumult X:

[rewrite_local]
^https?:\/\/suishenmafront1\.sh\.gov\.cn\/ssm_token\/ssm\/generation\/getSsmCode url script-response-body https://raw.githubusercontent.com/LostAttractor/Rules-For-Quantumult-X/develop/Scripts/Other/SHJKM/SHJKM_CSM_RED.js

[mitm]
hostname = suishenmafront1.sh.gov.cn

**************************/

/* Example https://suishenmafront1.sh.gov.cn/ssm_token/ssm/generation/getSsmCode
{
  "result" : 0,
  "tongVersion" : "1.0",
  "errorCode" : null,
  "message" : "SUCCESS",
  "errMsg" : null,
  "data" : {
    "phone" : "13916725263",
    "ssmurl" : "https:\/\/s.sh.gov.cn\/d9198c6243c8a55707caa16dd855081664572161358",
    "result" : "0",
    "code" : "0",
    "xm" : "**文",
    "date" : "1664572161358",
    "message" : null,
    "dzzz" : "1",
    "type" : "00",
    "ssmid" : "d9198c6243c8a55707caa16dd855081664572161358"
  }
}
*/

let body = JSON.parse($response.body)
let data = body["data"];

// 二维码内容
//data["ssmurl"] = "FUCKYOU";
// 00 = 绿码
// 01 = 黄码
// 10 = 红码
data["type"] = "10"; 
$done({
  body: JSON.stringify(body)
});
