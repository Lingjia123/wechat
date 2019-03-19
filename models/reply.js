// 处理中间件
const sha1 = require('sha1');
const {xmlMsg,parseData,formatJsData} = require('./Data.js');

module.exports =()=>{
   // app.use();
    return   async(req,res)=>{

        const {signature,echostr,timestamp,nonce,}=req.query;
        const token = 'atguiguwechat721';

        /*const Arr = [token,timestamp,nonce];
        const Str = Arr.sort().join('');
        const sha1Str = sha1(Str);*/

        const sha1Str = sha1([token,timestamp,nonce].sort().join(''));


        if(req.method === 'GET'){

            if(sha1Str === signature){
                res.end(echostr);

            }else{
                res.end("error");
            }
        }else if(req.method === 'POST'){
            if(sha1Str !== signature){
                res.end('error');
                return;
            }

            /*const xmlData = await new Promise((resolve,reject)=>{
               let xmlData = '';

                req.on('data',data=>{
                    xmlData += data.toString();
                })
                    .on('end',()=>{
                        resolve(xmlData)
                    })
             });*/
            //获取用户发过来的信息
            const xmlData = await xmlMsg(req);

            /*  let jsData = null;
              parseString(xmlData,{trim:true},(err,result)=>{
                  if(!err){
                     jsData = result;
                  }else{
                      jsData ={};
                  }
              })*/
            //将xmlData 解析 jsData
            const jsData = parseData(xmlData);

            /* let userData = {};
             for(let key in xml){
                 const value = xml[key];
                 userData[key] = value[0];
             }*/
            //格式化jsData
            const userData =formatJsData(jsData);

            //创建自动回复内容
            let content = '如果你是奇葩,你就扣1';

            if(userData.Content === '1'){
                content = '恭喜你';
            }else if (userData.Content.indexOf('2') !== -1) {
                content = '你很棒!';
            }

            let MsgData = `<xml>
        <ToUserName><![CDATA[${userData.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${userData.ToUserName}]]></FromUserName>
        <CreateTime>${Date.now()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${content}]]></Content>
        </xml>`

            // console.log(MsgData);
            res.send(MsgData)

        }else{
            res.end('error')
        }
    }

}
