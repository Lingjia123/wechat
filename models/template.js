//定义回复用户消息的6种模板模块

module.exports =(options)=>{
    let MsgData = `<xml>
        <ToUserName><![CDATA[${options.toUserName}]]></ToUserName>
        <FromUserName><![CDATA[${options.fromUserName}]]></FromUserName>
        <CreateTime>${options.createTime}</CreateTime>
         <MsgType><![CDATA[${options.type}]]></MsgType>`

    if(options.type === 'text'){
        MsgData += `<Content><![CDATA[${options.content}]]></Content>`

    }else if(options.type === 'image'){

        MsgData +=`<Image>
        <MediaId><![CDATA[${options.mediaId}]]></MediaId>
        </Image>`
    }else if(options.type === 'voice'){
        MsgData +=`<Voice>
    <MediaId><![CDATA[${options.mediaId}]]></MediaId>
  </Voice>`
    }else if(options.type === 'video'){
        MsgData +=`<Video>
    <MediaId><![CDATA[${options.mediaId}]]></MediaId>
    <Title><![CDATA[${options.title}]]></Title>
    <Description><![CDATA[${options.description}]]></Description>
  </Video>`
    }else if(options.type === 'music'){
        MsgData +=`<Music>
    <Title><![CDATA[${options.title}]]></Title>
    <Description><![CDATA[${options.description}]]></Description>
    <MusicUrl><![CDATA[${options.musicUrl}]]></MusicUrl>
    <HQMusicUrl><![CDATA[${options.hqMusicUrl}]]></HQMusicUrl>
    <ThumbMediaId><![CDATA[${options.mediaId}]]></ThumbMediaId>
  </Music>`
    }else if(options.type === 'news'){

        MsgData +=` <ArticleCount>${options.content.length}</ArticleCount>
<Articles>`

        MsgData += options.content.reduce((pre,curr)=> {
            return pre +` <item>
           <Title><![CDATA[${curr.title}]]></Title>
           <Description><![CDATA[${curr.description}]]></Description>
           <PicUrl><![CDATA[${curr.picUrl}]]></PicUrl>
           <Url><![CDATA[${curr.Url}]]></Url>
           </item>`
        },'')
        MsgData += `</Articles>`;
    }
    MsgData +=`</xml>`;
return MsgData;
}
