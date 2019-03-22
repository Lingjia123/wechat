const {parseString} = require('xml2js');
const {resolve} = require('path');
const {writeFile,readFile} = require('fs');

module.exports ={

    xmlMsg(req){

        return  new Promise((resolve,reject)=>{
            let xmlData = '';

            req.on('data',data=>{
                xmlData += data.toString();
            })
                .on('end',()=>{
                    resolve(xmlData)
                })
        });
    },
    //将xmlData 解析 jsData
    parseData(data){
        let jsData = null;
        parseString(data,{trim:true},(err, result)=>{
            if(!err){
                jsData = result;
            }else{
                jsData ={};
            }
        })
        return jsData;
    },
   // 格式化js对象的方法
    formatJsData(jsData){
        const {xml} = jsData;
        let userData = {};
        for(let key in xml){
            const value = xml[key];
            userData[key] = value[0];
        }
        return userData;
    },

    //写入文件保存
    writeFileAsync(filePath,data){
       filePath = resolve(__dirname,'../Port',filePath);
       return new Promise((resolve,reject)=>{
           writeFile(filePath,JSON.stringify(data), err=>{
               if(!err) resolve();
               else reject(err);
           })
       })
    },



    //读取文件
  readFileAsync(filePath){

    filePath = resolve(__dirname,'../Port',filePath);

      return new Promise((resolve,reject)=>{

          readFile (filePath,(err,data)=>{
              if(!err){ //有文件
                  resolve(JSON.parse(data.toString()))
              }else{ //没有文件
                  reject(err)
              }
          })

  })

}
}



