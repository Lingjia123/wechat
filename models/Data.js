const {parseString} = require('xml2js');

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
    }

}



