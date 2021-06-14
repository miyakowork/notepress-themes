/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */
layui.config({
    base: '/static/def/js/'
}).extend({
    clock: 'clock',
    timeago: 'timeago',
    affixside: 'style/tpl/affixside',
    toparea: 'style/tpl/toparea',
    toparea66: 'style/tpl/toparea66',
    col39: 'style/content/col39_new',
    col39list: 'style/content/col39_list_new',
    col93: 'style/content/col93_new',
    col93list: 'style/content/col93_list_new',
    col66: 'style/content/col66',
    colcard: 'style/content/colcard',
    notenbv5: 'style/note/note_noteblogv5',
    notenp: 'style/note/note_notepress',
    message: 'style/message/message',
    content: 'style/content_detail/content',
    search: 'style/content/search_col66'
});

layui.use(['util', 'clock'], function () {
    var util = layui.util;
    var clock = layui.clock;

    clock.now();
    util.fixbar({
        bar1: true,
        bar2: '&#xe770;'
        , click: function (type) {
            if (type === 'bar1') {
                location.href = "/message";
            } else if (type === 'bar2') {
                location.href = "/token/ubs"
            }
        }
        , css: {right: 10, bottom: 25}
        , bgcolor: '#9F9F9F'

    });

});

$(function ($) {
    var $body = $("body");

    $("#mobile-nav").click(function () {
        var $sideNav = $(".nav-header .layui-nav-side");
        if ($sideNav.css("width") !== "0px") {
            $sideNav.animate({
                width: "0"
            }, 200)
        } else {
            $sideNav.animate({
                width: "200px"
            }, 200);

            layer.open({
                type: 1
                , title: false
                , shade: [0.6, '#000000']
                , shadeClose: true
                , closeBtn: 0
            })

        }
    });

    $body.click(function () {
        var $sideNav = $(".nav-header .layui-nav-side");
        if ($sideNav.css("width") !== "0px") {
            $sideNav.animate({
                width: "0"
            }, 200)
        }
    });

});

