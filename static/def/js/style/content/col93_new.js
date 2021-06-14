/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */

layui.define(['laytpl', 'laypage', 'carousel', 'timeago', 'affixside', 'toparea', 'col93list'], function (exports) {

    var tpl = layui.laytpl,
        laypage = layui.laypage,
        timeago = layui.timeago,
        carousel = layui.carousel,
        toparea = layui.toparea,
        col93list = layui.col93list,
        affixside = layui.affixside;


    var col_l9r3 =
        '<div id="article-list-col93" class="layui-row layui-col-space20 col93" style="margin-bottom: 20px;">' +

        '<div class="layui-col-md9 animated fadeInUp">' +
        toparea.tplStr() +
        '<hr>' +
        '<blockquote class="layui-elem-quote layui-mt20">' +
        '<i class="fa fa-calendar"></i>&nbsp;最近更新' +
        '<label style="float: right;cursor:pointer;color: #f44336;" id="more93">更多<i class="fa fa-angle-double-right"></i></label></blockquote> ' +
        '<div id="content-html">' +
        contentHtml +
        '</div>' +
        '    <div class="index-page-btn text-center">' +
        '        <div id="page-btns"></div>' +
        '    </div>' +
        '</div>' +

        '<div class="layui-col-md3">' +
        affixside.tplStr() +
        '</div>' +


        '</div>';


    // noinspection DuplicatedCode
    exports('col93', function (obj) {
        var $mainBody = $("#main-body");
        tpl(col_l9r3).render(obj, function (html) {
            $mainBody.prepend(html);
            initCol93Page(laypage, tpl, timeago, obj.nonePage);
            timeago.render($('.timeago'));
            stickySideBar(obj.nonePage);
            initCarousel(carousel);

            $mainBody.on("click", "#more93", function () {
                $.ajax({
                    url: "/index/next",
                    data: {
                        pn: 1,
                        s: npfront.getQueryString("s"),
                        cates: npfront.getQueryString("cates"),
                        tags: npfront.getQueryString("tags")
                    },
                    beforeSend: function () {
                        window.loadIndex = layer.msg('加载中...', {
                            icon: 16,
                            shade: [0.3, '#000000']
                        });
                    },
                    success: function (re) {
                        if (re.code === 200) {
                            more93(col93list, re.data);
                        }
                    }
                    , complete: function () {
                        layer.close(window.loadIndex);
                    }
                });
            });
        });
    });

});


function initCol93Page(laypage, laytpl, timeago, page) {
    // noinspection DuplicatedCode
    laypage.render({
        elem: 'page-btns'
        , count: page.total
        , limit: page.size
        , curr: page.current
        , layout: ['next']
        , next: '加载更多'
        , jump: function (obj, first) {
            if (!first) {
                $.get("/index/next", {
                    pn: obj.curr,
                    ps: obj.limit,
                    s: npfront.getQueryString("s"),
                    cates: npfront.getQueryString("cates"),
                    tags: npfront.getQueryString("tags"),
                    search: npfront.getQueryString("search"),
                    tp: npfront.getQueryString("tp"),
                    style: npfront.getQueryString("style")
                }, function (resp) {
                    if (resp.code === 200) {
                        laytpl(contentHtml).render(resp.data, function (r) {
                            var _hr =
                                "<fieldset class='layui-elem-field layui-field-title'>" +
                                "<legend align='center'  style='margin-bottom: 20px;color:#dddddd;'> 第" + obj.curr + "页 </legend>" +
                                "</fieldset>";
                            $("#content-html").append(_hr + r);
                            timeago.render($('.timeago'));
                        });
                    }
                });
            }
        }
    });
}


function initCarousel(carousel) {
    carousel.render({
        elem: '#top-carousel'
        , width: '100%'
        , arrow: 'always'
    });
    //监听轮播切换事件
    carousel.on('change(top-carousel)', function (obj) {
        $("#carousel-text>a").text($(obj.item).find("img").attr("data-txt"));
        $("#carousel-text>a").attr("href", "/content/" +$(obj.item).find("img").attr("data-cid"));
    });
}


function more93(col93list, objParam) {
    $("#article-list-col93>.layui-col-md9").remove();
    col93list(objParam);
}


// noinspection DuplicatedCode
var contentHtml =
    '{{#if(d.nonePage.total===0){}}' +
    '<p class="layui-mt20 text-center">暂无数据</p>'+
    '{{#}}}' +
    '{{# layui.each(d.nonePage.records, function(index, item){ }}' +
    '<div class="layui-card animated fadeInUp" style="margin-bottom: 30px;">' +
    '<div class="layui-card-body">' +
    '<fieldset class="layui-elem-field layui-field-title">' +
    '  <legend class="center-to-head">' +
    '       {{# if(item.top){ }}' +
    '       <span class="zhiding">置顶</span>' +
    '       {{# } }}' +
    '       {{# if(!item.reprinted){ }}' +
    '       <span class="yuanchuang">原创发布</span>' +
    '       {{# } }}' +
    '       {{# if(item.reprinted){ }}' +
    '       <span class="zhuanzai">转载</span>' +
    '       {{# } }}' +
    '       {{# if(item.urlSeq != null && item.urlSeq !=""){ }}' +
    '       <a href="/content/u{{ item.urlSeq }}" title="{{item.title}}">{{ npfront.lenStat2(item.title)<=32?item.title:npfront.substr(item.title,32)+"..."}}</a>' +
    '       {{# }else{ }}' +
    '       <a href="/content/{{ item.id }}" title="{{item.title}}">{{ npfront.lenStat2(item.title)<=32?item.title:npfront.substr(item.title,32)+"..."}}</a>' +
    '       {{# } }}' +
    '</legend>' +
    '<blockquote class="layui-elem-quote" style="background-color: #f8f8f8;padding: 5px 5px 5px 10px;margin-top: 10px;">' +
    '{{# layui.each(d.categoriesMap[item.id], function(index, item){ }}' +
    '       <span class="layui-badge no-select" style="margin-right: 10px;padding: 5px; background-color: #e6e6e6;color: #0c0c0c;"><i class="fa fa-snowflake-o"></i> {{ item.nickname }} </span>' +
    '{{# });  }}' +
    '</blockquote>' +
    '</fieldset>' +
    '<div class="layui-fluid layui-row layui-col-space20">' +
    '       {{# if(item.cover != null && item.cover !=""){ }}' +
    '<div class="layui-col-md9 layui-col-xs12">' +
    '       {{# }else{ }}' +
    '<div class="layui-col-xs12">' +
    '       {{# } }}' +
    '   <div style="text-indent: 35px;line-height: 28px;color: #999 !important;word-break: break-all;">' +
    '{{ npfront.substr(item.textContent,150) }}<a href="/content/{{ item.id }}">...</a></div>' +
    '</div>' +
    '       {{# if(item.cover != null && item.cover !=""){ }}' +
    '<div class="layui-hide-xs layui-hide-sm layui-show-md-block layui-col-md3" style="text-align: center;">' +
    '<a href="/content/{{item.id}}"><img src="{{item.cover}}" alt="" ' +
    'style="width: 100%;height:125px;display: inline-block;padding: 7px;border: 1px solid #dedede;' +
    'box-shadow: 0 1px 3px rgba(0, 0, 0, .3);border-radius: 4px;margin-top: 5px;cursor: pointer;"/> ' +
    '</a> ' +
    '</div>' +
    '       {{# } }}' +
    '</div>' +
    '<div class="layui-fluid layui-row">' +
    '       <p class="article-footer">' +
    '           <span class="layui-mr15"><i class="fa fa-thermometer-1"></i> 热度：<span style="font-weight: bold;font-style: italic;">{{ item.views }}℃</span></span>' +
    // '           {{# if(d.commentCountsMap[item.id] > 0){ }}' +
    '           <span class="layui-mr15"><i class="fa fa-commenting-o"></i> 评论: <span style="font-weight: bold;font-style: italic;">{{ d.commentCountsMap[item.id] === 0 ?  " - " : d.commentCountsMap[item.id] }}</span>条</span>' +
    // '           {{# } }}' +
    '           <span class="layui-mr15"><i class="fa fa-user-o"></i> 作者：<span style="font-weight: bold;color: #986b0d;font-style: italic;">{{ d.authorsMap[item.id] }}</span></span>' +
    '           <span><i class="fa fa-calendar"></i> 更新：<span style="font-weight: bold;font-style: italic;" class="timeago" datetime="{{ npfront.timeAgo(item.gmtUpdate) }}"></span></span>' +
    '       </p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '{{# });  }}';