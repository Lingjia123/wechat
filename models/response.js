//回复内容模块

module.exports =(userData)=>{

    const options ={
        toUserName: userData.FromUserName,
        fromUserName: userData.ToUserName,
        createTime: Date.now(),
        type: 'text',
        content: '如果你是奇葩,你就扣1'
    };

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
    return options;
}
