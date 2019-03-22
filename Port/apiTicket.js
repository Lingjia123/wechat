
const rp = require('request-promise-native');
const fetchAccessToken = require('./accessToken.js');
const {writeFileAsync,readFileAsync} = require('../models/Data.js');



async function getApiTicket(){
    //获取accesstoken
    const {access_token} = await fetchAccessToken();
//定义请求地址,模版字符串
    const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=wx_card`;
//发请求
    const result = await rp({method:'GET',url,json:true});

//设置过期时间,accesstoken 2小时过期,需更新,5分钟以前刷新
    result.expires_in = Date.now() + 7200000 -300000;

    const ticket ={
        ticket: result.ticket,
        expires_in:result.expires_in
    }
   /* //用一个文件保存起来
    writeFile('./apiticket',JSON.stringify(ticket), err=>{
        if(!err) console.log('文件保存成功');
        else console.log(err);
    })*/
    await writeFileAsync('./apiticket',ticket);

    return ticket;


}


function fetchApiTicket(){
    //读取文件
    return readFileAsync('./apiticket')
        .then((res)=>{
            //判断有无过期
            if(res.expires_in < Date.now()){
                //过期
                return getApiTicket()
            }else{
                //没有过期
                return res;
            }
        })
        .catch((err)=>{
            return getApiTicket()
        })
}
/*(async()=>{
    const result = await fetchApiTicket();
    console.log(result);

})()*/


module.exports = fetchApiTicket;

