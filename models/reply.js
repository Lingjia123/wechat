// 处理中间件
const sha1 = require('sha1');
const {xmlMsg,parseData,formatJsData} = require('./Data.js');
const template = require('./template');
const response = require('./response');

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

            const options = response(userData);

            const MsgData = template(options);

             console.log(MsgData);

            res.send(MsgData)

        }else{
            res.end('error')
        }
    }

}
