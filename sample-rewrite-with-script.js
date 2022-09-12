/**
 * @fileoverview Example of HTTP rewrite.
 *
 * @supported Quantumult X (v1.0.5-build173)
 */

// $request, $response, $notify(title, subtitle, message), console.log(message)
// $request.scheme, $request.method, $request.url, $request.path, $request.headers
// $response.statusCode, $response.headers, $response.body
//
// $prefs is for persistent store and the data of $prefs will be cleared when Quantumult X is deleted.
// $prefs.setValueForKey(value, key), $prefs.removeValueForKey(key), $prefs.removeAllValues(). Returns true or false, value and key should be string.
// $prefs.valueForKey(key) returns value.
//
// setTimeout(function() { console.log("abc"); }, 1000);
//
// You can optional change the response headers at the same time by using $done({body: modifiedBody, headers: modifiedHeaders}); only change the response headers is not allowed for script-response-body. The modifiedHeaders can be copied and modified from $response.headers, please do not change the content length, type and encoding field.
// Response status can also be optional changed by using $done({body: modifiedBody, headers: modifiedHeaders, status: modifiedStatus}), the modifiedStatus should be like "HTTP/1.1 200 OK"
Date.prototype.format = function(fmt){
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };

  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
        
  for(var k in o){
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
    }       
  }

  return fmt;
}




var body = $response.body;
var obj = JSON.parse(body);

var now = new Date();
now.setDate(now.getDate()-1);
var fakeTimeStr = now.format("yyyy-MM-ddThh:mm:ss");


obj.data.hourDesc = "小时以内";
obj.data.color = "#53A96A";
obj.data.collectTime = fakeTimeStr;

body = JSON.stringify(obj);

console.log(body);

$done(body);
