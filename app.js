
/*
1,引入express 模块
2, 创建对应对象
3, 设置路由
4, 监听端口号,启动服务器
*/

//1,引入express 模块
const express = require("express");

//2, 创建对应对象
 const app = express ();

// 3, 用app.use()接收微信发过来的所有请求

app.use((req,res)=>{


});

//4, 监听端口号,启动服务器
app.listen("3000",(err)=>{

    if (!err) console.log("服务器启动了!");
    else console.log(err)
})
