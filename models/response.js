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

        }else if (userData.Content.indexOf('2') !== -1) {
            options.content = '你很棒!';

        }
    }else if(userData.MsgType === 'image'){

        options.mediaId = userData.MediaId;
        options.type = 'image';

    }else if (userData.MsgType === 'voice') {
        // 将用户发送的语音消息， 返回语音识别结果给用户（需要开通才能生效）
        options.content = userData.Recognition;

    } else if (userData.MsgType === 'location') {
        // 用户发送的是地理位置消息
        options.content = `地理位置纬度：${userData.Location_X}
                          \n地理位置经度: ${userData.Location_Y}
                          \n地图缩放大小: ${userData.Scale}
                          \n地理位置信息: ${userData.Label}`;
    } else if (userData.MsgType === 'event') {
        if (userData.Event === 'subscribe') {
            // 用户订阅事件
            options.content = '感谢关注~';
            if (userData.EventKey) {

                options.content = '扫描二维码关注公众号~';
            }
        } else if (userData.Event === 'unsubscribe') {
            console.log('取关~');

        } else if (userData.Event === 'CLICK') {

            options.content = '用户点击了菜单~';
        }
    }
    return options;
}
