/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */
var __np__article;
layui.define(['laytpl', 'timeago', 'laypage', 'affixside'], function (exports) {
    var tpl = layui.laytpl,
        timeago = layui.timeago,
        affixside = layui.affixside,
        laypage = layui.laypage;

    var _tpl = '' +
        '<div class="article-detail layui-row layui-col-space15">' +


        '       {{# if(d.articlePageStyle === "-1"){ }}' +
        '<div class="layui-col-md3">' +
        affixside.tplStrLess() +
        '</div>' +
        '       {{# } }}' +

        '<div class="top-title layui-container layui-row">' +
        '       {{# if(d.articlePageStyle === "-1"){ }}' +
        '<div class="layui-hide-xs layui-hide-sm layui-col-md4 layui-col-lg4 layui-show-md-inline-block layui-show-lg-inline-block">' +
        '<a class="layui-btn layui-btn-normal" href="#comment-list">写评论</a> ' +
        '<a class="layui-btn layui-btn-primary" onclick="emotion();"><i class="fa fa-thumbs-o-up"></i> 点个赞</a> ' +
        '</div>' +
        '<h2 class="layui-col-xs12 layui-col-sm12 layui-col-md8 layui-col-lg8 layui-elip">{{d.contentObj.title}}</h2>' +
        '       {{# } }}' +
        '       {{# if(d.articlePageStyle === "1"||d.articlePageStyle === "0"){ }}' +
        '<h2 class="layui-col-xs12 layui-col-sm12 layui-col-md8 layui-col-lg8 layui-elip">{{d.contentObj.title}}</h2>' +
        '<div class="layui-hide-xs layui-hide-sm layui-col-md4 layui-col-lg4 layui-show-md-inline-block layui-show-lg-inline-block">' +
        '<a class="layui-btn layui-btn-normal" href="#comment-list">写评论</a> ' +
        '<a class="layui-btn layui-btn-primary" onclick="emotion();"><i class="fa fa-thumbs-o-up"></i> 点个赞</a> ' +
        '</div>' +
        '       {{# } }}' +
        '</div>' +

        '       {{# if(d.articlePageStyle === "0"){ }}' +
        '<div class="layui-col-xs12 animated fadeInUp">' +
        '       {{# }else if(d.articlePageStyle === "-1"||d.articlePageStyle === "1"){ }}' +
        '<div class="layui-col-md9 animated fadeInUp">' +
        '       {{# } }}' +
        '<div class="layui-card">' +
        '<div class="layui-card-body article-content" style="max-height: 1400px;">' +
        '<div class="text-center"><h3 class="article-title">{{d.contentObj.title}} ' +
        '       {{# if(d.contentObj.reprinted){ }}' +
        '<span class="zhuanzai">转载</span>' +
        '       {{# } }}' +
        '       {{# if(!d.contentObj.reprinted){ }}' +
        '<span class="yuanchuang">原创发布</span>' +
        '       {{# } }}' +
        '</h3></div>' +
        '   <div class="layui-row">' +
        '       <div class="layui-col-md12 text-center article-meta">' +
        '             <span><i class="fa fa-clock-o"></i> {{d.contentObj.gmtCreate}} </span>' +
        '              <span><i class="fa fa-user-o"></i> <span style="color: #FF5722;margin-right: 5px;">{{d.author}}</span><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renzhengkaobei"></use></svg></span>' +
        '              <span><i class="fa fa-comment-o"></i> {{d.comments.total}}</span>' +
        '              <span><i class="fa fa-eye"></i> {{d.contentObj.views}}</span>' +
        '        </div>' +
        '      </div>' +
        '<hr>' +
        '       {{# if(!isRichTxt(d.contentObj)){ }}' +
        '<div id="doc-content" class="content layui-col-md12 markdown-body editormd-html-preview" style="margin-bottom: 20px;"></div>' +
        '       {{# } }}' +
        '       {{# if(isRichTxt(d.contentObj)){ }}' +
        '<div id="doc-content1" class="content layui-col-md12" style="margin-bottom: 20px;" >{{ d.contentObj.htmlContent}}</div>' +
        '       {{# } }}' +
        '<div id="custom-toc-container" style="margin-left: 15px;display: none;"></div>' +
        ' <div class="layui-row text-center layui-mt20">' +
        '       {{# if(d.contentObj.appreciable){ }}' +
        '     <div class="layui-btn layui-hide layui-show-md-inline-block" style="background-color: #FFB800;" onclick="money()"><i class="fa fa-rmb"></i> 打赏</div>' +
        '       {{# } }}' +
        '     <div class="layui-btn layui-btn-danger" onclick="emotion()"><i class="fa fa-thumbs-o-up"></i> 赞 (<span id="u-approve">{{d.contentObj.approveCnt}}</span>)</div>' +
        ' </div>' +
        ' <div class="layui-row layui-mt20">' +
        '     <blockquote class="layui-elem-quote text-center " style="border: none;">' +
        '         文章出处：<span class="layui-show-md-inline-block layui-hide nb-theme-color">{{ d.settings.website_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;' +
        '         文章地址：<span class="layui-show-md-inline-block layui-hide nb-theme-color">{{= window.location.href}}</span>&nbsp;&nbsp;&nbsp;&nbsp;' +
        '         <span>转载注明下哦！o(≧v≦)o~~</span>' +
        '     </blockquote>' +
        ' </div>' +
        ' <div class="layui-row layui-mt20">' +
        '     <p class="blog-tags">' +
        '     标签：' +
        '{{# layui.each(d.tags, function(index2, item2){ }}' +
        '<span><i class="fa fa-hashtag"></i> {{item2.dictValue}} </span>' +
        '{{# });  }}' +
        '     </p>' +
        ' </div>' +
        '</div>' +
        '<div class="hide-article-box hide-article-pos text-center">' +
        '<a href="javascript:openPanel();">展开阅读全文 <i class="fa fa-angle-down"></i> </a>' +
        ' </div>' +
        '</div>' +

        '<div class="layui-card" id="comment-panel">' +
        '<div class="layui-card-body" style="padding: 20px 15px !important;">' +
        '<div class="layui-row">' +
        '<blockquote class="layui-elem-quote">评论请遵守相关法律法规，请勿恶意抨击他人。{{d.settings.def_theme_conf.index_top_text}}</blockquote> ' +
        '</div>' +
        '<div class="layui-row layui-form layui-mt20">' +
        '<div class="layui-col-sm1 layui-hide-xs layui-show-sm-inline-block layui-user-avatar">' +
        '       {{# if(d.npsu != null){ }}' +
        '<a href="/token//ubs"><img src="{{d.npsu.avatar}}" class="layui-circle layui-avatar42"></a> ' +
        '       {{# }else{ }}' +
        '<a href="{{ loginUrl()}}" id="nologin"><img src="/static/assets/img/nologin.jpg" class="layui-circle layui-avatar42"></a>' +
        '       {{# } }}' +
        '</div>' +
        '<div class="layui-col-sm11 layui-col-xs12">' +
        '<input type="hidden" name="replyId">' +
        '<input type="hidden" name="userId" value="{{d.npsu!=null?d.npsu.id:""}}">' +
        '<input type="hidden" name="nickname" value="{{d.npsu!=null?d.npsu.nickname:""}}">' +
        '<input type="hidden" name="articleId" value="{{d.contentObj.id}}">' +
        '<textarea name="comment" required lay-verify="required" placeholder="{{d.contentObj.commented && d.settings.switch_comment == "1"?"输入你想说的话":"未开放评论功能"}}" ' +
        '       {{# if(!d.contentObj.commented || d.settings.switch_comment == "0"){ }}' +
        ' disabled="disabled"' +
        '       {{# } }}' +
        ' class="layui-textarea comment" onfocus="commentFocus(this);" onblur="commentBlur(this);"></textarea>' +
        '       {{# if(d.contentObj.commented && d.settings.switch_comment == "1"){ }}' +
        '<p class="layui-mt15"><button class="layui-btn layui-btn-normal layui-btn-sm" onclick="submitComment(this);">发表评论</button>' +
        '<button class="layui-btn layui-btn-primary layui-btn-sm" style="display: none;" id="cancelReply" onclick="cancelReply();">取消回复</button></p>' +
        '       {{# } }}' +
        '       {{# if(!d.contentObj.commented || d.settings.switch_comment == "0"){ }}' +
        '<p class="layui-mt15"><button class="layui-btn layui-btn-normal layui-btn-sm layui-btn-disabled">未开放评论</button>' +
        '       {{# } }}' +
        '</div>' +
        '</div>' +

        '<div id="comment-list">' +
        '{{# if(d.comments !==null && d.comments.total > 0){}}' +
        '{{# layui.each(d.comments.records, function(index2, item2){ }}' +
        '<div class="layui-row comment-html">' +
        '<div class="layui-col-xs1 layui-user-avatar" style="min-width: 45px;">' +
        '<img src="{{d.userCommentMap[item2.id].avatar}}" class="layui-circle">' +
        '</div>' +
        '<div class="layui-col-xs11 comment-content" style="color: #929292;">' +
        '<label>' +
        '{{# if(d.userCommentMap[item2.id].admin){ }}' +
        '<span style="color: #ff262e;margin-right: 5px;">{{d.userCommentMap[item2.id].nickname}}</span>' +
        '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-renzhengkaobei"></use></svg>' +
        '{{#}else{}}' +
        '<span>{{d.userCommentMap[item2.id].nickname}}</span>' +
        '{{#}}}' +
        ' (#{{item2.floor}}</label>,' +
        '<span class="timeago" datetime="{{ npfront.timeAgo(item2.gmtCreate) }}"></span>)：' +
        '<span class="comment-txt" style="color: #000;line-height: 24px;word-break: break-all;">{{item2.commentHtml}}</span>' +
        '<a class="reply" data-comment-id="{{item2.id}}" style="display: none;">回复</a> ' +
        '</div>' +
        '</div>' +
        '{{# });  }}' +
        '{{#}}}' +
        '</div>' +

        '</div>' +
        '<div class="row layui-container">' +
        '       {{# if(d.comments.total>0){ }}' +
        '     <p id="comment-page"></p>' +
        '       {{# } }}' +
        '</div>' +
        '</div>' +

        '</div>' +

        '       {{# if(d.articlePageStyle === "1"){ }}' +
        '<div class="layui-col-md3">' +
        affixside.tplStrLess() +
        '</div>' +
        '       {{# } }}' +
        '</div>';


    exports('content', function (obj) {

        __np__article = {
            npsu: obj.npsu,
            settings: obj.settings,
            contentObj: obj.contentObj
        };


        tpl(_tpl).render(obj, function (html) {
            $("#main-body").prepend(html);
            stickySideBar(null);
            if (!isRichTxt(obj.contentObj)) {
                resolveMd(obj.contentObj);
            } else {
                SyntaxHighlighter.highlight();
            }
            loginTips();
            hoverReply();
            replyOne(obj.npsu);
            timeago.render($(".timeago"));
            commentPage(laypage, obj.comments, obj.contentObj.id, tpl, timeago);
            imgView();
        });
        if (!isRichTxt(obj.contentObj)) {
            openPanel();
        }
    });

});

/**
 * 是否为富文本而不是md
 * @param article
 * @returns {boolean}
 */
function isRichTxt(article) {
    return article.mdContent == null || article.mdContent === "";
}

function openPanel() {
    $(".article-detail .layui-card-body.article-content").css("height", "auto");
    $(".article-detail .layui-card-body.article-content").css("max-height", '');
    $(".hide-article-box").hide();
}


function resolveMd(article) {
    editormd.markdownToHTML("doc-content", {
        markdown: article.mdContent,//+ "\r\n" + $("#append-test").text(),
        //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
        htmlDecode: "style,script,iframe",  // you can filter tags decode
        //gfm             : false,
        // toc: false,
        // tocDropdown: true,
        tocm: true,    // Using [TOCM]
        tocContainer: "#tocm", // 自定义 ToC 容器层
        markdownSourceCode: false, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
        emoji: false,
        taskList: true,
        tex: true,  // 默认不解析
        flowChart: true,  // 默认不解析
        sequenceDiagram: true// 默认不解析
    });
}

function money() {
    var alipay = __np__article.settings.admin_qrcode_alipay;
    var wechat = __np__article.settings.admin_qrcode_wechat;
    alipay = alipay === null || alipay === undefined || alipay === "" ? "/static/assets/img/noqrcode.jpg" : alipay;
    wechat = wechat === null || wechat === undefined || wechat === "" ? "/static/assets/img/noqrcode.jpg" : wechat;
    layer.open({
        id: 'moneyLayer',
        type: 1,
        title: false,
        closeBtn: 0,
        area: ['640px', '380px'],
        shadeClose: true,
        skin: 'text-center',
        content:
            '<div class="layui-fluid">' +
            '   <div class="layui-row">' +
            '       <div  class="layui-header-money" style="color: #414141;">感谢您的打赏</div>' +
            '   </div>' +
            '   <div class="layui-row layui-mt20 qrcode">' +
            '       <div class="layui-col-md6">' +
            '           <img src="' + wechat + '" style="height: 250px;width: 250px;">' +
            '           <p class="text-center layui-mt20" style="color: #44B54B"><i class="iconfont icon-changgewechat"></i> 微信</p>' +
            '       </div>' +
            '       <div class="layui-col-md6">' +
            '           <img src="' + alipay + '" style="height: 250px;width: 250px;">' +
            '           <p class="text-center layui-mt20" style="color: #00a0e9;"><i class="iconfont icon-ali-pay"></i> 支付宝</p>' +
            '       </div>' +
            '   </div> ' +
            '</div>'
    });
}

function emotion() {
    var su = __np__article.npsu;
    var articleId = __np__article.contentObj.id;
    var approve = __np__article.contentObj.approveCnt;
    var uid = su !== null ? su.id : "guest";
    if (npfront.getCookie("content::" + articleId + "::" + uid) != null) {
        layer.msg("近期您已经点过赞，感谢您的支持！");
    } else {
        $.post("/content/approve", {cId: articleId}, function (json) {
            if (json.code === 200) {
                npfront.setCookie("content::" + articleId + "::" + uid, "notepress blog sys");
                var acnt = approve + 1;
                $("#u-approve").text(acnt);
                layer.msg("谢谢您的支持！");
            }
        })
    }
}

function commentFocus(t) {
    $(t).css("height", "100px");
}

function commentBlur(t) {
    var txt = $(t).val();
    if (txt.length === 0) {
        $(t).css("height", "40px");
    }
}

function loginUrl() {
    return "/np-login?redirectUrl=" + btoa(encodeURIComponent(location.href));
}

function loginTips() {
    var __loginIndex;
    $("#nologin").hover(function () {
        __loginIndex = layer.tips('请先登录', this, {
            tips: [1, '#F44336']
        });
    }, function () {
        layer.close(__loginIndex);
    });
}

function hoverReply() {
    $(".comment-content").hover(function () {
        $(this).find(".reply").css("display", "inline-block");
    }, function () {
        $(this).find(".reply").css("display", "none");
    })
}

function replyOne(npsu) {
    $(".reply").on("click", function () {
        if (npsu === null) {
            layer.confirm('请先登录再操作，是否现在登录？', {icon: 4, title: '消息提示'}, function (index) {
                location.href = "/np-login?redirectUrl=" + btoa(encodeURIComponent(location.href));
            });
        }
        var userTxt = $(this).parent(".comment-content").find("label").text();
        var replyId = $(this).attr("data-comment-id");
        $("input[name=replyId]").val(replyId);
        $("input[name=nickname]").val(userTxt);
        $("textarea[name=comment]").attr("placeholder", "回复@" + userTxt + "): ");
        $("#cancelReply").css("display", "inline-block");
    });
}

function cancelReply() {
    $("textarea[name=comment]").attr("placeholder", "输入你想说的话");
    $("input[name=replyId]").val("");
    $("#cancelReply").css("display", "none");
}

var tempTimes = false;

function submitComment(e) {
    if (!tempTimes) {
        var userId = $("input[name=userId]").val();
        var articleId = $("input[name=articleId]").val();
        if (userId === "") {
            layer.confirm('请先登录再操作，是否现在登录？', {icon: 4, title: '消息提示'}, function (index) {
                location.href = "/np-login?redirectUrl=" + btoa(encodeURIComponent(location.href))
            });
        } else {
            var comment = $("textarea[name=comment]").val();
            var replyId = $("input[name=replyId]").val();
            var nickname = $("input[name=nickname]").val();
            comment = replyId !== null && replyId !== "" ? "回复@<span style='color: #00c4ff;'>" + nickname + ")</span>: " + comment : comment;
            if (comment === "") {
                layer.msg("请填写你想发表的内容！");
            } else {
                $.ajax({
                    url: "/message/token/sub",
                    type: "post",
                    dataType: "json",
                    data: {
                        contentId: articleId,
                        userId: userId,
                        replyId: replyId,
                        status: true,
                        commentHtml: comment,
                        pageType: "文章内容"
                    },
                    success: function (resp) {
                        layer.msg(resp.message || resp.msg);
                        setTimeout(function () {
                            if (resp.code === 200) {
                                location.reload();
                            }
                        }, 1000);
                    },
                    beforeSend: function () {
                        tempTimes = true;
                        $(e).text("发送中...")
                    },
                    complete: function () {
                        $(e).text("发表评论");
                        tempTimes = false;
                    }
                })

            }
        }
    } else {
        layer.msg("不要着急，请等待一会！");
    }
}

function commentPage(laypage, comments, articleId, tpl, timeago) {
    laypage.render({
        elem: "comment-page"
        , count: comments.total
        , layout: ['prev', 'next']
        , jump: function (obj, first) {
            if (!first) {
                layer.msg('第 ' + obj.curr + ' 页');
                $.post("/content/comments", {
                    cId: articleId
                    , current: obj.curr
                }, function (cs) {
                    if (cs.code === 200) {
                        if (cs.data.commentPage != null && cs.data.commentPage.total > 0) {
                            var pageTpl = '' +
                                '{{# layui.each(d.commentPage.records, function(index, item){ }}' +
                                '<div class="layui-row comment-html">' +
                                '<div class="layui-col-xs1 layui-user-avatar" style="min-width: 45px;">' +
                                '<img src="{{item.avatar}}" class="layui-circle">' +
                                '</div>' +
                                '<div class="layui-col-xs11 comment-content" style="color: #929292;">' +
                                '<label>' +
                                '{{# if(d.userCommentMap[item.id].admin){ }}' +
                                '<span style="color: #ff262e;margin-right: 5px;">{{d.userCommentMap[item.id].nickname}}</span>' +
                                '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-renzhengkaobei"></use></svg>' +
                                '{{#}else{}}' +
                                '<span>{{d.userCommentMap[item.id].nickname}}</span>' +
                                '{{#}}}' +
                                ' (#{{item.floor}}</label>,' +
                                '<span class="timeago" datetime="{{ npfront.timeAgo(item.gmtCreate) }}"></span>)：' +
                                '<span class="comment-txt" style="color: #000;line-height: 24px;word-break: break-all;">{{item.commentHtml}}</span>' +
                                '<a class="reply" data-comment-id="{{item.id}}" style="display: none;">回复</a> ' +
                                '</div>' +
                                '</div>' +
                                '{{# });  }}';
                            tpl(pageTpl).render(cs.data, function (html) {
                                $("#comment-list").html(html);
                                timeago.render($(".timeago"));
                            });
                        }
                    } else {
                        layer.msg(cs.message);
                    }
                })
            }
        }
    });
}

function purchaseContent(contentId, hideId) {
    layer.confirm('确定购买此内容吗？', {icon: 3, title: '提示'}, function (index) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/content/token/purchase",
            data: {
                contentId: contentId,
                hideId: hideId
            },
            success: function (resp) {
                if (resp.code === 200) {
                    layer.msg(resp.message);
                    setTimeout(function () {
                        location.reload();
                    }, 888);
                } else if (resp.code === -3) {
                    layer.confirm('请先登录再操作，是否现在登录？', {icon: 4, title: '消息提示'}, function (index) {
                        window.location.href = "/np-login?redirectUrl=" + btoa(encodeURIComponent(location.href));
                    });
                } else {
                    layer.msg(resp.message);
                }
            }, error: function () {
                layer.msg("请稍后再试！");
            }
        })
        layer.close(index);
    });
}

function imgView() {
    $("#main-body").on("click", ".article-detail .article-content img", function () {
        var src = $(this).attr("src");
        var url;
        if (src.startsWith("http")) {
            url = src;
        } else {
            url = location.protocol + "//" + location.host + src;
        }
        window.open(url, "_blank");
    })
}
