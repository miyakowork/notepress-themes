/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */
layui.define(function (exports) {
    var obj = {
        tplStr: function () {
            return affixSideBar;
        },
        tplStrLess: function () {
            return affixSideBarLess;
        }
    };

    exports('affixside', obj);
});

var affixSideBar =
    '<div id="affix-side">' +

    '<div class="layui-card" id="info-panel">' +
    '<div class="layui-card-body text-center" style="padding: 20px;">' +
    '<a class="no-hover cursor" href="/np-login?redirectUrl=' + btoa(encodeURIComponent(location.href)) + '" target="_blank">' +
    '<img src="{{d.settings.website_logo_small}}" class="layui-circle no-hover animated flipInX" style="width: 150px;height:150px;border: 1px solid #e6e5e5;" alt="{{d.settings.admin_global_nickname}}">' +
    '</a>' +
    '<hr>' +
    '<p class="layui-text nbv5-font" style="margin: 10px;color: #F44336;"><i class="fa fa-ravelry"></i>（站长）：<b>{{d.settings.admin_global_nickname}}</b></p>' +
    '<hr>' +
    '{{# if(d.npsu != null){}}' +
    '<p>个人中心：<a href="/token/ubs" class="no-hover"><img src="{{d.npsu.avatar}}" style="width: 30px;height: 30px;border: 1px solid #ccc;" class="layui-circle"></a>' +
    '<label style="color: #F44336;font-weight: bolder;margin-left: 10px;"><a href="/token/ubs">{{d.npsu.nickname}}</a></label>' +
    '</p>' +
    '{{#}else{}}' +
    '<p class="layui-text">游客您好！点我<a href="/np-login?redirectUrl=' + btoa(encodeURIComponent(location.href)) + '" class="no-hover" style="color: #F44336;">登录/注册</a></p>' +
    '{{#}}}' +
    '<div class="layui-mt10">{{d.settings.website_info_label}}</div>' +
    '</div>' +
    '</div>' +

    '<div class="layui-card" id="search-panel">' +
    '<div class="layui-card-body">' +
    ' <p class="title">搜索 <small style="float: right;">' +
    '   <a style="cursor: pointer;" onclick="aboutSearch();" target="_blank"><i>关于 <i class="fa fa-info-circle"></i></i></a></small> </p>' +
    '       <hr>' +
    '       <input name="words" onkeypress="searchAll(event);" value="{{ d.s}}"' +
    '           placeholder="键入Enter键以搜索" autocomplete="off" class="layui-input search-box">' +
    '</div>' +
    '</div>' +

    '<div class="layui-card" id="cate-panel">' +
    '<div class="layui-card-body">' +
    ' <p class="title">分类 </p>' +
    ' <hr>' +
    ' <div class="layui-btn-container">' +
    '{{# layui.each(d.cateList, function(index, item){ }}' +
    '<a href="/index?s={{d.s}}&cates={{item.id}}&searh=1" class="layui-btn layui-btn-primary layui-btn-sm"><i class="fa fa-hashtag"></i> {{item.nickname}}</a>' +
    '{{# });  }}' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div class="layui-card" id="article-random-panel">' +
    '<div class="layui-card-body">' +
    ' <p class="title">随便看看 </p>' +
    ' <hr>' +
    '{{# layui.each(d.randomContents, function(index, item){ }}' +
    '<blockquote class="layui-elem-quote" style="padding: 5px 10px;background: #f8f8f8;">' +
    '<p class="layui-text layui-elip">' +
    '<a href="/content/{{item.id}}" class="layui-word-aux">{{item.title}}</a>' +
    '</p>' +
    '</blockquote>' +
    '{{# });  }}' +
    '</div>' +
    '</div>' +


    '<div class="layui-card layui-tags" id="tag-panel">' +
    '<div class="layui-card-body">' +
    '<p class="title">热门标签</p>' +
    '<hr>' +
    '{{# layui.each(d.tagList, function(index, item){ }}' +
    '<span class="layui-badge-rim"><a href="/index?s={{d.s}}&tags={{item.id}}&search=1" target="_blank">{{item.dict_value}} ({{item.cnt}})</a></span>' +
    '{{# });  }}' +
    '</div>' +
    '</div>' +

    '<div class="layui-card layui-tags" id="link-panel">' +
    '<div class="layui-card-body">' +
    '<p class="title">友情链接<small style="float: right;">' +
    '   <a style="cursor: pointer;" onclick="applyLink(\'申请友链，请联系站长【{{= d.settings.admin_global_nickname}}】\')" target="_blank">' +
    '<i>申请 <i class="fa fa-info-circle"></i></i></a></small></p>' +
    '<hr>' +
    '{{# layui.each(d.linkList, function(index, item){ }}' +
    '<a href="{{linkSplit(item.dictValue,1)}}" target="_blank" class="layui-text" style="margin-right: 10px;">{{ linkSplit(item.dictValue,0) }}</a>' +
    '{{# });  }}' +
    '</div>' +
    '</div>' +


    '</div>';


var affixSideBarLess =
    '<div id="affix-side">' +

    '<div class="layui-card" id="info-panel">' +
    '<div class="layui-card-body text-center" style="padding: 20px;">' +
    '<p class="nb-theme-color">目录</p>' +
    '<hr>' +
    '       {{# if(!isRichTxt(d.contentObj)){ }}' +
    '<div id="tocm"></div>' +
    '       {{# } }}' +
    '       {{# if(isRichTxt(d.contentObj)){ }}' +
    '{{#  layui.each(d.headers, function(index, item){ }}' +
    '<div id="tocm">' +
    '<ul>' +
    '<li><a href="#{{item.id}}" class="toc-level-{{item.level}}">{{item.title}}</a></li>' +
    '</ul>' +
    '</div>' +
    '{{#  }); }}' +
    '       {{# } }}' +
    '<hr>' +
    '<p class="layui-text nbv5-font" style="margin: 10px;color: #F44336;"><i class="fa fa-ravelry"></i>（站长）：<b>{{d.settings.admin_global_nickname}}</b></p>' +
    '<hr>' +
    '{{# if(d.npsu != null){}}' +
    '<p>个人中心：<a href="/token/ubs" class="no-hover"><img src="{{d.npsu.avatar}}" style="width: 30px;height: 30px;border: 1px solid #ccc;" class="layui-circle"></a>' +
    '<label style="color: #F44336;font-weight: bolder;margin-left: 10px;"><a href="/token/ubs">{{d.npsu.nickname}}</a></label>' +
    '</p>' +
    '{{#}else{}}' +
    '<p class="layui-text">游客您好！点我<a href="/np-login?redirectUrl=' + btoa(encodeURIComponent(location.href)) + '" class="no-hover" style="color: #F44336;">登录/注册</a></p>' +
    '{{#}}}' +
    '<div class="layui-mt10">{{d.settings.website_info_label}}</div>' +
    '</div>' +
    '</div>' +

    '<div class="layui-card" id="article-random-panel">' +
    '<div class="layui-card-body">' +
    ' <p class="title">随便看看 </p>' +
    ' <hr>' +
    '{{# layui.each(d.randomContents, function(index, item){ }}' +
    '<blockquote class="layui-elem-quote" style="padding: 5px 10px;background: #f8f8f8;">' +
    '<p class="layui-text layui-elip">' +
    '<a href="/content/{{item.id}}" class="layui-word-aux">{{item.title}}</a>' +
    '</p>' +
    '</blockquote>' +
    '{{# });  }}' +
    '</div>' +
    '</div>' +


    '<div class="layui-card layui-tags" id="tag-panel">' +
    '<div class="layui-card-body">' +
    '<p class="title">热门标签</p>' +
    '<hr>' +
    '{{# layui.each(d.tagList, function(index, item){ }}' +
    '<span class="layui-badge-rim"><a href="/index?s={{d.s}}&tags={{item.id}}&search=1" target="_blank">{{item.dict_value}} ({{item.cnt}})</a></span>' +
    '{{# });  }}' +
    '</div>' +
    '</div>' +


    '</div>';


function aboutSearch() {
    layer.msg("此处仅做标题和文章原始内容粗略关键字匹配！");
}

function applyLink(txt) {
    layer.msg(txt, {time: 5000});
}

function linkSplit(link, index) {
    var links = link.split(",");
    if (index === 0 || index === 1) {
        return links[index];
    } else {
        return "";
    }
}


function searchAll(e) {
    var keyNum = window.event ? e.keyCode : e.which;
    if (keyNum === 13) {
        var words = $("input[name=words]").val();
        location.href = "/index?search=1&s=" + encodeURI(words);
    }
}

function stickySideBar(page) {
    if (page === null || page.total > 2) {
        npfront.clearSticky();
        new hcSticky("#affix-side", {
            stickTo: '#main-body'
            , innerSticker: '#info-panel'
            , queries: {992: {disable: true}}
            , top: 75
            , bottom: 15
        });
    }
}
