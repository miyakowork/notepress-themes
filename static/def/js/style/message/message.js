/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */

layui.define(['laytpl', 'timeago', 'laypage', 'affixside'], function (exports) {
    var tpl = layui.laytpl,
        timeago = layui.timeago,
        laypage = layui.laypage,
        affixside = layui.affixside;


    var commentHtmlListTpl =
        '{{# layui.each(d.messages.records, function(index, item){ }}' +
        '<div class="layui-row comment-html">' +
        '<div class="layui-col-xs1 layui-user-avatar" style="min-width: 45px;">' +
        '<img src="{{d.messageUserInfo[item.id].avatar}}" class="layui-circle" style="width: 45px;height: 45px;display: inline-block;">' +
        '</div>' +
        '<div class="layui-col-xs10 comment-content" style="color: #929292;margin-left: 5px;">' +
        '<label>' +
        '{{# if(d.messageUserInfo[item.id].admin){ }}' +
        '<span style="color: #ff262e;margin-right: 5px;">{{d.messageUserInfo[item.id].nickname}}</span>' +
        '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-renzhengkaobei"></use></svg>' +
        '{{#}else{}}' +
        '<span>{{d.messageUserInfo[item.id].nickname}}({{tuomin(d.messageUserInfo[item.id].email)}})</span>' +
        '{{#}}}' +
        ' (#{{item.id}}</label>,' +
        '<span class="timeago" datetime="{{ npfront.timeAgo(item.gmtCreate) }}"></span>)：' +
        '<span class="comment-txt" style="color: #000;line-height: 24px;word-break: break-all;">{{item.commentHtml}}</span>' +
        '<a class="reply" data-comment-id="{{item.userId}}" style="display: none;">回复</a> ' +
        '</div>' +
        '</div>' +
        '{{# });  }}';


    var _tpl = '' +
        '<div class="article-detail layui-row layui-col-space15">' +


        '<div class="layui-col-md9 animated fadeInUp">' +


        '<div class="layui-card">' +
        '<div class="layui-card-header">活跃周榜</div>' +
        '<div class="layui-card-body">' +
        '<div class="layui-row layui-col-space30">' +
        '  {{#  layui.each(d.messageRankList, function(index, item){ }}' +
        '  {{#  if(index<3){ }}' +
        '<div class="layui-col-xs12 layui-col-sm4">' +
        '<blockquote class="layui-elem-quote">' +
        '<div class="layui-row layui-col-space10">' +
        '<div class="layui-col-xs3"><img src="{{item.avatar}}" class="layui-circle" style="width: 55px;height:55px;border: 1px solid #8a8a8a;"></div>' +
        '<div class="layui-col-xs9">' +
        '<div class="layui-row">{{item.nickname}}</div>' +
        '<div class="layui-row layui-mt5">{{item.msg_cnt}} 次评论  ({{ npfront.timeAgo(item.gmt_create).substring(0,10) }})</div>' +
        '</div>' +
        '</div>' +
        '</blockquote>' +
        '</div>' +
        '  {{#  } }} ' +
        '  {{#  }); }}' +
        '</div>' +
        '<hr>' +
        '<div class="layui-row layui-col-space10 avatars">' +
        '  {{#  layui.each(d.messageRankList, function(index, item){ }}' +
        '  {{#  if(index>=3){ }}' +
        '<div class="layui-col-xs2 layui-col-sm1" data-tips="{{item.nickname}}"><img src="{{item.avatar}}" class="layui-circle" style="width: 55px;height:55px;border: 1px solid #8a8a8a;"></div>' +
        '  {{#  } }} ' +
        '  {{#  }); }}' +
        '</div>' +
        '</div>' +
        '</div>' +


        '<div class="layui-card" id="message-panel">' +
        '<div class="layui-card-body" style="padding: 20px 15px !important;">' +
        '<div class="layui-row">' +
        '<blockquote class="layui-elem-quote">留言请遵守相关法律法规，请勿恶意抨击他人。{{d.settings.def_theme_conf.index_top_text}}</blockquote> ' +
        '</div>' +
        '<div class="layui-row layui-form layui-mt20">' +
        '<div class="layui-col-sm1 layui-hide-xs layui-show-sm-inline-block layui-user-avatar">' +
        '       {{# if(d.npsu != null){ }}' +
        '<a href="/token/ubs"><img src="{{d.npsu.avatar}}" class="layui-circle layui-avatar42"></a> ' +
        '       {{# }else{ }}' +
        '<a href="{{ loginUrl()}}" id="nologin"><img src="/static/assets/img/nologin.jpg" class="layui-circle layui-avatar42"></a>' +
        '       {{# } }}' +
        '</div>' +
        '<div class="layui-col-sm11 layui-col-xs12">' +
        '<input type="hidden" name="replyId">' +
        '<input type="hidden" name="userId" value="{{d.npsu!=null?d.npsu.id:""}}">' +
        '<input type="hidden" name="nickname" value="{{d.npsu!=null?d.npsu.nickname:""}}">' +
        '<textarea id="message-reply" name="comment" required lay-verify="required" placeholder="{{d.settings.switch_comment === "1"?"输入你想说的话":"未开放留言功能"}}" ' +
        '       {{# if( d.settings.switch_comment === "0"){ }}' +
        ' disabled="disabled"' +
        '       {{# } }}' +
        ' class="layui-textarea comment" onfocus="commentFocus(this);" onblur="commentBlur(this);"></textarea>' +
        '       {{# if( d.settings.switch_comment === "1"){ }}' +
        '<p class="layui-mt15"><button class="layui-btn layui-btn-normal layui-btn-sm" onclick="submitComment(this);">发表留言</button>' +
        '<button class="layui-btn layui-btn-primary layui-btn-sm" style="display: none;" id="cancelReply" onclick="cancelReply();">取消回复</button></p>' +
        '       {{# } }}' +
        '       {{# if(d.settings.switch_comment === "0"){ }}' +
        '<p class="layui-mt15"><button class="layui-btn layui-btn-normal layui-btn-sm layui-btn-disabled">未开放留言</button>' +
        '       {{# } }}' +
        '</div>' +
        '</div>' +

        '<div id="message-list">' +
        commentHtmlListTpl +
        '</div>' +

        '</div>' +
        '<div class="row layui-container">' +
        '       {{# if(d.messages.total>0){ }}' +
        '     <p id="message-page"></p>' +
        '       {{# } }}' +
        '</div>' +
        '</div>' +

        '</div>' +

        '<div class="layui-col-md3">' +
        affixside.tplStr() +
        '</div>' +


        '</div>';


    exports('message', function (obj) {
        tpl(_tpl).render(obj, function (html) {
            $("#main-body").prepend(html);
            stickySideBar(obj.messages);
            loginTips();
            hoverReply();
            replyOne(obj.npsu);
            messagePage(laypage, obj.messages, tpl, commentHtmlListTpl, timeago);
            timeago.render($("span.timeago"));
            avatarHover();
        });

    });

});


function applyLink(txt) {
    layer.msg(txt, {time: 5000});
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

function replyOne(nbv5su) {
    $(".reply").on("click", function () {
        if (nbv5su === null) {
            layer.confirm('请先登录再操作，是否现在登录？', {icon: 4, title: '消息提示'}, function (index) {
                location.href = "/np-login?redirectUrl=" + btoa(encodeURIComponent(location.href));
            });
        }
        var userTxt = $(this).parent(".comment-content").find("label").text();
        var replyId = $(this).attr("data-comment-id");
        $("input[name=replyId]").val(replyId);
        $("input[name=nickname]").val(userTxt);
        $("textarea[name=comment]").attr("placeholder", "回复@" + userTxt + "): ");
        $("html,body").animate({
            scrollTop: 400
        }, 233);
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
        if (userId === "") {
            layer.confirm('请先登录再操作，是否现在登录？', {icon: 4, title: '消息提示'}, function (index) {
                location.href = "/np-login?redirectUrl=" + btoa(encodeURIComponent(location.href));
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
                        contentId: "-1",
                        pageType: "留言",
                        userId: userId,
                        replyId: replyId,
                        status: true,
                        commentHtml: comment
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
                        $(e).text("发送中...");
                        tempTimes = true;
                    },
                    complete: function () {
                        $(e).text("发表留言");
                        tempTimes = false;
                    }
                })

            }
        }
    } else {
        layer.msg("不要着急，请等待一会！");
    }
}

function messagePage(laypage, messages, tpl, tplHtml, timeago) {
    laypage.render({
        elem: "message-page"
        , count: messages.total
        , limit: 15
        , layout: ['prev', 'next']
        , jump: function (obj, first) {
            if (!first) {
                layer.msg('第 ' + obj.curr + ' 页');
                $.post("/message/lists", {
                    current: obj.curr
                }, function (cs) {
                    if (cs.code === 200) {
                        cs.data.messages = cs.data.messagePage;
                        tpl(tplHtml).render(cs.data, function (html) {
                            $("#message-list").html(html);
                            timeago.render($(".timeago"));
                            $("html,body").animate({
                                scrollTop: 400
                            }, 233);
                        });
                    } else {
                        layer.msg(cs.message)
                    }
                })
            }
        }
    });
}

function avatarHover() {
    var index;
    $(".avatars>div").hover(function () {
        index = layer.tips($(this).attr("data-tips"), this, {
            tips: [1, '#F44336'] //还可配置颜色
        });
    }, function () {
        layer.close(index);
    })
}

function tuomin(s) {
    return s.substr(1, 2).concat("***").concat(s.substr(s.indexOf("@"), s.length));
}