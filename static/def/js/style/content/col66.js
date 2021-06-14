/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */

layui.define(['laytpl', 'laypage', 'carousel', 'timeago', 'affixside', 'toparea66'], function (exports) {

    var tpl = layui.laytpl,
        laypage = layui.laypage,
        timeago = layui.timeago,
        carousel = layui.carousel,
        toparea66 = layui.toparea66;


    exports('col66', function (obj) {
        var $mainBody = $("#main-body");
        tpl(col_66).render(obj, function (html) {
            $mainBody.prepend(html);
            initCol66Page(laypage, tpl, timeago, obj.nonePage);
            timeago.render($('.timeago'));
            initCarousel2(carousel);
        });
    });


    var col_66 =
        '<div id="article-list-col66" class="layui-row layui-col-space20 col66" style="margin-bottom: 20px;">' +

        '<div class="layui-col-md12 animated fadeInUp">' +
        toparea66.tplStr() +
        '<hr>' +
        '<blockquote class="layui-elem-quote layui-mt20">' +
        '<i class="fa fa-calendar"></i>&nbsp;最近更新</blockquote> ' +
        '<div id="content-html" class="layui-row layui-col-space15">' +
        contentHtml66 +
        '</div>' +
        '</div>' +
        '    <div class="index-page-btn text-center">' +
        '        <div id="page-btns"></div>' +
        '    </div>' +


        '</div>';

});


function initCol66Page(laypage, laytpl, timeago, page) {
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
                        laytpl(contentHtml66).render(resp.data, function (r) {
                            $("#content-html").append(r);
                            timeago.render($('.timeago'));
                        });
                    }
                });
            }
        }
    });
}


function initCarousel2(carousel) {
    carousel.render({
        elem: '#top-carousel'
        , width: '100%'
        , arrow: 'always'
    });
    //监听轮播切换事件
    carousel.on('change(top-carousel)', function (obj) {
        $("#carousel-text>a").text($(obj.item).attr("data-txt"));
        $("#carousel-text>a").attr("href", "/content/" + $(obj.item).attr("data-cid"));
    });
}


// noinspection DuplicatedCode
var contentHtml66 =
    '{{#if(d.nonePage.total===0){}}' +
    '<p class="layui-mt20 text-center">暂无数据</p>' +
    '{{#}}}' +
    '{{# layui.each(d.nonePage.records, function(index, item){ }}' +
    '<div class="layui-col-md6">' +
    '<div class="layui-card animated fadeInUp" style="margin-bottom: 10px;">' +
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
    '       <a href="/content/u{{ item.urlSeq }}" title="{{item.title}}">{{ npfront.lenStat2(item.title)<20?item.title:npfront.substr(item.title,(item.top?16:20))+"..." }}</a>' +
    '       {{# }else{ }}' +
    '       <a href="/content/{{ item.id }}" title="{{item.title}}">{{ npfront.lenStat2(item.title)<20?item.title:npfront.substr(item.title,(item.top?16:20))+"..." }}</a>' +
    '       {{# } }}' +
    '</legend>' +
    '<blockquote class="layui-elem-quote" style="background-color: #f8f8f8;padding: 5px 5px 5px 10px;margin-top: 10px;">' +
    '{{# layui.each(d.categoriesMap[item.id], function(index, item){ }}' +
    '       <span class="layui-badge no-select" style="margin-right: 10px;padding: 5px; background-color: #e6e6e6;color: #0c0c0c;"><i class="fa fa-snowflake-o"></i> {{ item.nickname }} </span>' +
    '{{# });  }}' +
    '</blockquote>' +
    '</fieldset>' +
    '<div class="layui-fluid layui-row layui-col-space20">' +
    '<div class="layui-col-md9 layui-col-xs12">' +
    '   <div style="text-indent: 35px;line-height: 28px;color: #999 !important;word-break: break-all;">' +
    '{{ npfront.substr(item.textContent,98)}}<a href="/content/{{ item.id }}">...</a></div>' +
    '</div>' +
    '       {{# if(item.cover != null && item.cover !=""){ }}' +
    '<div class="layui-hide-xs layui-hide-sm layui-show-md-block layui-col-md3" style="text-align: center;">' +
    '<a href="/content/{{item.id}}"><img src="{{item.cover}}" alt="" ' +
    'style="width: 100%;height:100px;display: inline-block;padding: 7px;border: 1px solid #dedede;' +
    'box-shadow: 0 1px 3px rgba(0, 0, 0, .3);border-radius: 4px;margin-top: 5px;cursor: pointer;"/> ' +
    '</a> ' +
    '</div>' +
    '       {{# }else{ }}' +
    '<div class="layui-hide-xs layui-hide-sm layui-show-md-block layui-col-md3" style="text-align: center;">' +
    '<a href="/content/{{item.id}}"><img src="/static/assets/img/notepress-lg.png" alt="" ' +
    'style="width: 100%;height:100px;display: inline-block;padding: 7px;border: 1px solid #dedede;' +
    'box-shadow: 0 1px 3px rgba(0, 0, 0, .3);border-radius: 4px;margin-top: 5px;cursor: pointer;"/> ' +
    '</a> </div>' +
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
    '</div>' +
    '{{# });  }}';
