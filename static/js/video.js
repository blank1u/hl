// +----------------------------------------------------------------------
// | Desc:网站视频弹出层，一个整站复用度很高的公用功能
// | 用法:(1) 需要调用的页面引入“http://style.yuzhua.cn/public/library/videoSpace/video.js”
// |      (2) <button onclick="video.toggle(1,mp4)">点我弹出来</button>；
// |          mp4默认值：http://cdn.yuzhua.cn/yuzhua.mp4
// |      (3) 后台师傅调用步骤：只有上面2步，多了就是调用错了。  
// | 依赖:jquery
// | 注意点:初始化加载中，注意video.css的路径！
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | Desc:初始化执行
// +----------------------------------------------------------------------
$(function(){
      
});


// +----------------------------------------------------------------------
// | Desc:构造方法
// +----------------------------------------------------------------------
function Video() {

}


// +----------------------------------------------------------------------
// | Desc:初始化加载
// +----------------------------------------------------------------------
$(function () {
    var host =$("#oss_Domain").val();
    if(video.isblank($.trim(host))){
        host="https://style.yuzhua.cn/public/library/videoSpace/";
    }else{
        host=host+"/library/videoSpace/";
    };
    //var url = host+"video.css";
	var url = "./static/index/shouye/css/video.css";
    dynamicLoading.css(url);
});




// +----------------------------------------------------------------------
// | Desc:写入弹出层html 
// +----------------------------------------------------------------------
Video.prototype.createHtml = function (mp4) {
  if(video.isblank(mp4)){
    var mp4="https://cdn.yuzhua.cn/yuzhua.mp4";
  };
  var html='<div class="video_dialog" style="display:none;">';
      html+='<div class="video_content">';
      html+='  <div class="video-frame">';
      html+='    <a href="javascript:void(0);" class="video_close" onclick="video.toggle(2)"></a>';
      html+='    <video controls="controls" autoplay="autoplay">'; 
      html+='       <source src="'+mp4+'" type="video/mp4">'; 
      html+='       <object data="http://cdn.yuzhua.cn/yuzhua.mp4" width="100%"><embed src="'+mp4+'" width="100%"></object>';
      html+='   </video>';
      html+='  </div>';
      html+='</div>';
      html+='</div>';
    $("body").append(html);
    
};


// +----------------------------------------------------------------------
// | Desc:验证为空
// +----------------------------------------------------------------------
Video.prototype.isblank = function (chr) {
    if (chr == null || chr == '' || chr == undefined || chr == 'undefined' || chr == 'null' || chr.length == 0) {
        return true;
    }
    return false;
}



// +----------------------------------------------------------------------
// | Desc:关闭开启客户验证消息,type：1打开,2关闭
// +----------------------------------------------------------------------
Video.prototype.toggle = function (type,mp4,swf) {
    if (type == 1) {
         video.createHtml(mp4,swf);
        $(".video_dialog").css('display',"table");
    } else {
        $(".video_dialog").remove();
    }
};






// +----------------------------------------------------------------------
// | Desc:js引入css或者js
// +----------------------------------------------------------------------
var dynamicLoading = {
    css: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
};


// +----------------------------------------------------------------------
// | Desc:实例化   
// +----------------------------------------------------------------------
var video = new Video();

