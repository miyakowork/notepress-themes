/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */
layui.define(['laytpl', 'laypage', 'timeago'], function (exports) {
    var tpl = layui.laytpl,
        laypage = layui.laypage,
        timeago = layui.timeago;


    var card_tpl_part =
        '{{#if(d.allPage.total===0){}}' +
        '<p class="layui-mt20 text-center">暂无数据</p>' +
        '{{#}}}' +
        '{{# layui.each(d.allPage.records, function(index, item){ }}' +
        '<div class="layui-col-xs12 layui-col-sm6 layui-col-md4 layui-col-lg3 animated fadeInUp">' +
        '<div class="layui-card nbv5-card">' +
        '<div class="layui-card-body">' +

        '<div class="layui-row">' +
        '<p class="layui-col-xs12 center-to-head card" style="display: inline-block;padding: 10px 0;">' +
        // '<fieldset class="layui-col-xs12 layui-elem-field layui-field-title">' +
        // '  <legend class="center-to-head" style="display: inline-block;">' +
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
        '       <a href="/content/u{{ item.urlSeq }}" title="{{item.title}}"><b>{{item.title}}</b></a>' +
        '       {{# }else{ }}' +
        '       <a href="/content/{{ item.id }}" title="{{item.title}}"><b>{{item.title}}</b></a>' +
        '       {{# } }}' +
        // '</legend>' +
        '</p>' +
        '<blockquote class="layui-elem-quote card-cates" style="background-color: #f8f8f8;padding: 5px 5px 5px 10px;margin-top: 10px;display: inline-block;width: 90%;">' +
        '{{# layui.each(d.categoriesMap[item.id], function(index1, item1){ }}' +
        '       <span class="layui-badge no-select" style="margin:4px 4px 4px 0;padding: 4px; background-color: #e6e6e6;color: #0c0c0c;border-radius: 4px;"><i class="fa fa-tag"></i> {{item1.nickname}} </span>' +
        '{{# });  }}' +
        '</blockquote>' +
        // '</fieldset>' +
        '</div>' +

        '<div class="layui-row">' +
        '       {{# if(item.cover == null || item.cover ==""){ }}' +
        '<div class="layui-col-xs12">' +
        '<div style="text-indent: 35px;line-height: 28px;color: #999 !important;word-break: break-all;">' +
        '{{ npfront.substr(item.textContent,98) }}' +
        '<a href="/content/{{ item.id }}">...</a>' +
        '</div>' +
        '</div>' +
        '       {{# } }}' +
        '       {{# if(item.cover != null && item.cover !=""){ }}' +
        '<div class="layui-col-xs12" style="text-align: center;overflow: hidden;border-radius: 4px;">' +
        '<a href="/content/{{item.id}}" style="display:block;padding: 7px;border: 1px solid #dedede;box-shadow: 0 1px 3px rgba(0, 0, 0, .3);border-radius: 4px;">' +
        '<figure  class="card-img" style="background-image:url({{item.cover}});' +
        'cursor: pointer;background-size: cover;margin:0;" ></figure>' +
        '<div class="card-content">{{npfront.substr(item.textContent,66)}}</div> ' +
        '</a> ' +
        '</div>' +
        '       {{# } }}' +
        '</div>' +

        '<hr class="card-line">' +


        '<div class="layui-row card-tags">' +
        '{{# layui.each(d.tagMap[item.id], function(index2, item2){ }}' +
        '       {{# if(index2<3){ }}' +
        '<span style="margin-right: 15px;display: inline-block;"><i class="fa fa-hashtag"></i>' +
        '{{ item2.dictValue }}</span>' +
        '       {{# } }}' +
        '{{# });  }}' +
        '</div>' +

        '<div class="layui-row card-meta">' +
        '       <p class="article-footer">' +
        '           <span class="layui-mr15"><i class="fa fa-thermometer-1"></i>&nbsp;<span style="font-weight: bold;font-style: italic;">{{ item.views }}℃</span></span>' +
        '           <span class="layui-mr15"><i class="fa fa-calendar"></i>&nbsp;<span style="font-weight: bold;font-style: italic;" class="timeago" datetime="{{ npfront.timeAgo(item.gmtCreate) }}"></span></span>' +
        '           <span class="layui-mr15"><i class="fa fa-comment-o"></i>&nbsp;<span style="font-weight: bold;font-style: italic;">{{d.commentCountsMap[item.id] === 0?"暂无":d.commentCountsMap[item.id] }}</span></span>' +
        '       </p>' +
        '</div>' +


        '</div>' +
        '</div>' +
        '</div>' +
        '{{# });  }}';

    var card_tpl =
        '<div id="article-list-col-card" class="layui-row layui-col-space20 card-media animated fadeInUp">' +
        // card_tpl_part +
        '</div>' +

        '<div class="layui-row">' +
        '    <div class="index-page-btn text-center">' +
        '        <div id="page-btns"></div>' +
        '    </div>' +
        '</div>';


    exports('colcard', function (obj) {
        // tpl(card_tpl).render(obj, function (html) {
        $("#main-body").prepend(card_tpl);
        initCardPage(laypage, tpl, card_tpl_part, obj.nextAjaxUrl, timeago, obj);
        timeago.render($('.timeago'));
        cardContent();
        // });
    });

});


function initCardPage(laypage, laytpl, tplHTML, nextAjaxUrl, timeago, page) {
    // noinspection DuplicatedCode
    laypage.render({
        elem: 'page-btns'
        , count: page.allPage.total
        , limit: page.allPage.size
        , curr: page.allPage.current
        , layout: ['next']
        , next: '加载更多'
        , jump: function (obj, first) {
            // if (!first) {
            $.get(nextAjaxUrl, {
                pn: obj.curr,
                ps: obj.limit,
                searchType: 'ALL',
                s: npfront.getQueryString("s"),
                cates: npfront.getQueryString("cates"),
                tags: npfront.getQueryString("tags"),
                search: npfront.getQueryString("search"),
                tp: npfront.getQueryString("tp"),
                style: npfront.getQueryString("style")
            }, function (resp) {
                if (resp.code === 200) {
                    var _data = resp.data;
                    _data.allPage = _data.nonePage;
                    _data.tagMap = _data.contentTagList;
                    laytpl(tplHTML).render(_data, function (r) {
                        $("#article-list-col-card").append(r);
                        timeago.render($('.timeago'));
                    });
                }
            });
        }
        // }
    });
}


function cardContent() {
    var $cardContents = $("div.card-content");
    for (var i = 0; i < $cardContents.length; i++) {
        // noinspection JSJQueryEfficiency
        if ($("div.card-content:eq(" + i + ")").prev("figure.card-img").width() - $("div.card-content:eq(" + i + ")").width() >= 50) {
            $("div.card-content:eq(" + i + ")").css("width", "100%");
        }
    }
}
