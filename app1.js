
const express = require("express");
const reply = require('./models/reply');
const fetchApiTicket = require('./Port/apiTicket.js');
const sha1 = require('sha1');
const {url,appid} = require('./config/config.js');

 const app = express ();

 app.set('views','view');
 app.set('view engine','ejs');

 app.get('/search',async(req,res)=>{
/*1,参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分） 。
2,对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，
3,使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。
4,这里需要注意的是所有参数名均为小写字符。对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。*/
  const {ticket} = await  fetchApiTicket();
  const timestamp = Math.round(Date.now()/1000);
  const noncestr = Math.random().toString().slice(2);

  const arr =[`jsapi_ticket=${ticket}`,`timestamp=${timestamp}`,`url=${url}/search`,`noncestr=${noncestr}`];
  console.log(arr);
     /*[ 'jsapi_ticket=VUkHJgW2SFNG4xhs6ZntSB9XuF1noVvDIDHHvw0NbJc9zbZ6GW6YKUFH-eLNub1lNkuTGwk3Y4DXplp4VZA7vg',
  'timestamp=1553266251',
  'url=http://30f0d63a.ngrok.io/search',
  'noncestr=18481036762124292' ]
*/

  const signature = sha1(arr.sort().join('&'));

     res.render('search',{timestamp,noncestr,signature,appid,url})
 })

app.use(reply());

//4, 监听端口号,启动服务器
app.listen("3000",(err)=>{

    if (!err) console.log("服务器启动了!");
    else console.log(err)
})
