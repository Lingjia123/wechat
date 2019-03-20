
const express = require("express");

const reply = require('./models/reply');


 const app = express ();

app.use(reply());

//4, 监听端口号,启动服务器
app.listen("4000",(err)=>{

    if (!err) console.log("服务器启动了!");
    else console.log(err)
})
