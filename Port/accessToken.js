/*创建菜单

- 获取access_token
- 定义请求地址
  - POST请求需要携带body参数
- 发送请求
- 返回响应结果

https请求方式: GET
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
*/
const rp = require('request-promise-native');
const {writeFile,readFile} = require('fs');
const URL_PREFIX = 'https://api.weixin.qq.com/cgi-bin/';
const {appid,appsecret} = require('../config/config.js');

async function getAccessToken(){

//定义请求地址,模版字符串
const url = `${URL_PREFIX}token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`;
//发请求
  const result = await rp({method:'GET',url,json:true});
//设置过期时间,accesstoken 2小时过期,需更新,5分钟以前刷新
  result.expires_in = Date.now() + 7200000 -300000;

  //用一个文件保存起来
  writeFile('./accessToken',JSON.stringify(result), err=>{
      if(!err) console.log('文件保存成功');
      else console.log(err);
      })
}
/*
    一上来读取本地保存access_token，
        有：
          判断有没有过期
            - 没有过期， 直接使用
            - 过期了， 重新发送请求、获取access_token，保存起来，设置过期时间
        没有
          发送请求、获取access_token，保存起来，设置过期时间
   */
//getAccessToken()
function fetchAccessToken(){
    //读取文件
    return new Promise((resolve,reject)=>{
        readFile ('./accessToken',(err,data)=>{
            if(!err){ //有文件
                resolve(JSON.parse(data.toString()))
            }else{ //没有文件
                reject(err)
            }
        })
    })
        .then((res)=>{
            //判断有无过期
            if(res.expires_in < Date.now()){
                //过期
                return getAccessToken()
            }else{
                //没有过期
                return res;
            }
        })
        .catch((err)=>{
            return getAccessToken()
        })
}
/*(async()=>{
    const result = await fetchAccessToken();
    console.log(result);

})()*/
module.exports =fetchAccessToken;

