/*创建菜单*/
//实现微信公众号提供的各个接口
const fetchAccessToken = require('./accessToken.js');
const rp = require('request-promise-native');

const menu ={
    "button":[
        {
            "name":"菜单☀",
            "sub_button":[
                {
                    "type":"view",
                    "name":"搜索☁",
                    "url":"http://www.soso.com/"
                },
                {
                    "type":"miniprogram",
                    "name":"wxa",
                    "url":"http://mp.weixin.qq.com",
                    "appid":"wx286b93c14bbf93aa",
                    "pagepath":"pages/lunar/index"
                },
                {
                    "type":"click",
                    "name":"赞一下我们☀",
                    "key":"V1001_GOOD"
                }]
        },
        {
            "name": "扫码☔",
            "sub_button": [
                {
                    "type": "scancode_waitmsg",
                    "name": "扫码带提示⌛",
                    "key": "rselfmenu_0_0",

                },
                {
                    "type": "scancode_push",
                    "name": "扫码推事件☀",
                    "key": "rselfmenu_0_1",

                }
            ]
        },
        {
            "name": "发图☀",
            "sub_button": [
                {
                    "type": "pic_sysphoto",
                    "name": "系统拍照发图☀",
                    "key": "rselfmenu_1_0",

                },
                {
                    "type": "pic_photo_or_album",
                    "name": "拍照或者相册发图☀",
                    "key": "rselfmenu_1_1",

                },
                {
                    "type": "pic_weixin",
                    "name": "微信相册发图☀",
                    "key": "rselfmenu_1_2",

                }
            ]
        },
    ]
}
async function creatMenu(){
    //获取accesstoken
    const {access_token} = await fetchAccessToken();
    //定义请求
    /*http请求方式：POST（请使用https协议） https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN*/
    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`;
    //发请求
    const result = rp({method:'POST',url,json:true,body:menu},);
    //函数要return 才会有输出
    return result;
}
//creatMenu()
async function DeleteMenu(){
    //获取accesstoken
    const {access_token} = await fetchAccessToken();
    //http请求方式：GET
    const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`;
    const result = rp({method:'GET',url,json:true,},);
    return result;
}
//立即执行函数
(async()=>{
   let result = await DeleteMenu();
    console.log(result);
    result = await creatMenu();
    console.log(result);
})()


/*{ errcode: 0, errmsg: 'ok' }
{ errcode: 0, errmsg: 'ok' }*/
