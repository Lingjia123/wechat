

//1,引入express 模块
const express = require("express");

//引入sha1
const sha1 = require('sha1');

const {parseString} = require('xml2js');

//2, 创建对应对象
 const app = express ();

// 3, 用app.use()接收微信发过来的所有请求
// 验证服务器的有效性：
app.use(async(req,res)=>{
  //获取微信服务器发送过来的请求参数
    const {signature,echostr,timestamp,nonce,}=req.query
    const token = 'atguiguwechat721';
    //1,将token、timestamp、nonce三个参数进行字典序排序
    //先排序再转为字符串
    //2,将三个参数字符串拼接成一个字符串进行sha1加密
    const Arr = [token,timestamp,nonce];
    const Str = Arr.sort().join('');
  //  console.log(Str);
    const sha1Str = sha1(Str);

//处理用户发过来的消息,首先要判断请求方式
    //get 请求, 服务器发送的
    //post 请求,处理客户发送的
    if(req.method === 'GET'){
        // 3,开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
        if(sha1Str === signature){
            //证明微信服务器发送过来的
            res.end(echostr);

        }else{

            res.end("error");
        }
    }else if(req.method === 'POST'){
        if(sha1Str !== signature){
            res.end('error');
            return;
        }
     //获取用户发送的消息
       const xmlData = await new Promise((resolve,reject)=>{
          let xmlData = '';

           req.on('data',data=>{

               xmlData += data.toString();

           })
               .on('end',()=>{
                   //请求数据接收完毕
                   resolve(xmlData)
               })
        });
       //处理用户信息
       // 将xml数据转换成js对象
        let jsData = null;
        parseString(xmlData,{trim:true},(err,result)=>{
            if(!err){
               jsData = result;
            }else{
                jsData ={};
            }
        })
        //在拆解jsData 里面的数据, 去掉xml, 把属性值的数组变成字符串
        const {xml} = jsData;
        let userData = {};
        for(let key in xml){
            const value = xml[key];
            //去掉数组
           // useData.key =value[0]
            userData[key] = value[0];
        }
        //创建自动回复内容
        let content = '如果你是奇葩,你就扣1';

        if(userData.Content === '1'){

            content = '恭喜你';

        }else if (userData.Content.indexOf('2') !== -1) {

            content = '你很棒!';
        }
        //创建模板字符串,发送的格式是xml, 返回的数据也是xml格式
        //获取的属性名一定要跟请求的数据对应上
        let MsgData = `<xml>
        <ToUserName><![CDATA[${userData.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${userData.ToUserName}]]></FromUserName>
        <CreateTime>${Date.now()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${content}]]></Content>
        </xml>`
        console.log(MsgData);
        //响应数据

       res.send(MsgData)
    }else{
        res.end('error')
    }
});


//4, 监听端口号,启动服务器
app.listen("3000",(err)=>{

    if (!err) console.log("服务器启动了!");
    else console.log(err)
})
