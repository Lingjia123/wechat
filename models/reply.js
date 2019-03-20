// 处理中间件
const sha1 = require('sha1');
const {xmlMsg,parseData,formatJsData} = require('./Data.js');
const template = require('./template');

module.exports =()=>{

    return   async(req,res)=>{

        const {signature,echostr,timestamp,nonce,}=req.query;
        const token = 'atguiguwechat721';

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

            //获取用户发过来的信息
            const xmlData = await xmlMsg(req);

            const jsData = parseData(xmlData);

            const userData =formatJsData(jsData);

            const options ={
                toUserName: userData.FromUserName,
                fromUserName: userData.ToUserName,
                createTime: Date.now(),
                type: 'text',
                content: '如果你是奇葩,你就扣1'
            };


            //创建自动回复内容
           // let content = '如果你是奇葩,你就扣1';

           if(userData.MsgType === 'text'){
               if(userData.Content === '1'){
                   options.content = '恭喜你';
                   //options.type = 'text';
               }else if (userData.Content.indexOf('2') !== -1) {
                   options.content = '你很棒!';
                  // options.type = 'text';
               }
           }else if(userData.MsgType === 'image'){

               options.mediaId = userData.MediaId;
               options.type = 'image';
           }

            const MsgData = template(options);

             console.log(MsgData);

            res.send(MsgData)

        }else{
            res.end('error')
        }
    }

}
