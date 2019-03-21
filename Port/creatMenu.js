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

async function DeleteMenu(){
    //获取accesstoken
    const {access_token} = await fetchAccessToken();
    //http请求方式：GET
    const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`;
    const result = rp({method:'GET',url,json:true,},);
    return result;
}

//1. 创建标签
async function creatTag(name){
    //获取accesstoken
    const {access_token} = await fetchAccessToken();
    const url = `https://api.weixin.qq.com/cgi-bin/tags/create?access_token=${access_token}`;
    return await rp({method:'POST',url,json:true,body:{tag:{name}}})
}
//2. 获取公众号已创建的标签
async function getcreatTag(){
    //获取accesstoken
    const {access_token} = await fetchAccessToken();
    const url = `https://api.weixin.qq.com/cgi-bin/tags/get?access_token=${access_token}`;
    return await rp({method:'GET',url,json:true,});
}
//5. 获取标签下粉丝列表
async function getTagList(tagid,next_openid=''){
    //获取accesstoken
    const {access_token} = await fetchAccessToken();
    const url = `https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token=${access_token}`;
    return await rp({method:'POST',url,json:true,body:{tagid,next_openid}});
}
//1. 批量为用户打标签
async function batchUserTag(openid_list,tagid){
    //获取accesstoken
    const {access_token} = await fetchAccessToken();
    const url = `https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token=${access_token}`;
    return await rp({method:'POST',url,json:true,body:{openid_list,tagid}});
}

//设置用户备注名
async function creatMark(openid,remark){
    const {access_token} = await fetchAccessToken();
    const url = `https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token=${access_token}`;
    return await rp({method:'POST',url,json:true,body:{openid,remark}})
}

//立即执行函数
(async()=>{
   // let result = await DeleteMenu();
   //  console.log(result);
   //  result = await creatMenu();
   //  console.log(result);
   //  let result1 = await creatTag('小佳1');
   //  console.log(result1); //{ tag: { id: 100, name: '小佳' } }
   // let result2 = await getcreatTag();
   //  console.log(result2);
   // let result3 = await getTagList(100);
   //  console.log(result3);
   //  let result4 =await batchUserTag(['oUkfA598b3bF1ILC1mL4wBwEQbnc'],100);
   //  console.log(result4);
    let result5 =await creatMark('oUkfA561fwrRZzLD16ixum0nGZi4','同桌');
    console.log(result5);
})();

