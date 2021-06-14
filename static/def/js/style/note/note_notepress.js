/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */

layui.define(['laytpl', 'laypage'], function (exports) {

    var noteHtmlNp =
        '<div class="layui-col-md6">' +
        '{{# layui.each(d.notePage.records, function(index, item){ }}' +
        '{{# if(index===0){}}' +
        '<div style="display: none;" data-nid="{{item.id}}">{{ contentValue(item.mdContent,item.htmlContent)}}</div>' +
        '<div class="layui-card animated fadeInUp" style="margin-bottom: 10px;">' +
        '<div class="layui-card-header text-center">' +
        '<p class="center-to-head card animated fadeInUp" id="note-header" left-note>' +
        '       {{# if(item.top){ }}' +
        '       <span class="zhiding">置顶</span>' +
        '       {{# } }}' +
        '       {{# if(!item.reprinted){ }}' +
        '       <span class="yuanchuang">原创发布</span>' +
        '       {{# } }}' +
        '       {{# if(item.reprinted){ }}' +
        '       <span class="zhuanzai">转载</span>' +
        '       {{# } }}' +
        '      <a href="javascript:void(0);" title-id="{{item.id}}">{{ item.title }}</a> ' +
        '</p>' +
        '</div>' +
        '<div class="layui-card-body">' +
        '<div class="layui-fluid layui-row layui-col-space20">' +
        '<div class="layui-col-xs12">' +
        '   <div id="noteMd" class="animated fadeInUp">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<hr>' +
        '<div class="layui-card-footer" style="text-align:right;">' +
        '<i class="fa fa-calendar"></i>&nbsp;<span class="datetime">{{npfront.timeAgo(item.gmtUpdate)}}</span>' +
        '</div>' +
        '' +
        '</div>' +
        '{{#}}}' +
        '{{# });  }}' +
        '</div>' +
        '<div class="layui-col-md6">' +
        '<div id="note-list-page">' +
        '{{# layui.each(d.notePage.records, function(index, item){ }}' +
        '<div class="layui-card animated fadeInUp">' +
        '<div class="layui-card">' +
        '<div class="layui-card-header">' +
        '<p class="center-to-head card">' +
        '       {{# if(item.top){ }}' +
        '       <span class="zhiding">置顶</span>' +
        '       {{# } }}' +
        '       {{# if(!item.reprinted){ }}' +
        '       <span class="yuanchuang">原创发布</span>' +
        '       {{# } }}' +
        '       {{# if(item.reprinted){ }}' +
        '       <span class="zhuanzai">转载</span>' +
        '       {{# } }}' +
        '      <a title-id="{{item.id}}" style="cursor: pointer;">{{ item.title }}</a> ' +
        '</p>' +
        '<div style="display: none;" data-nid="{{item.id}}">{{ contentValue(item.mdContent,item.htmlContent)}}</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '{{#});}}' +
        '</div>' +
        '    <div class="index-page-btn text-center layui-mt10">' +
        '        <div id="page-btns-note"></div>' +
        '    </div>' +
        '</div>';

    var note_np =
        '<div id="article-list-col66" class="layui-row layui-col-space20 col66" style="margin-bottom: 20px;">' +

        '<div class="layui-col-md12 animated fadeInUp">' +

        '<form action="/note" method="get">' +
        '<div class="layui-row layui-col-space20">' +
        '<div class="layui-col-md4 layui-col-xs9">' +
        '<input type="text" name="s" class="layui-input" value="{{d.s}}">' +
        '</div>' +
        '<div class="layui-col-md2 layui-col-sm3"><button type="submit" class="layui-btn">搜索</button></div>' +
        '</div>' +
        '</form>' +

        '<div class="layui-row layui-mt10">' +
        '{{# layui.each(d.noteTags,function(index,item){}}' +
        '<a href="/note?s={{item.dictValue}}" class="note-tag"><span class="layui-badge layui-bg-gray">{{item.dictValue}}</span></a>' +
        '{{#});}}' +
        '</div>' +

        '<hr>' +

        '<div id="note-html" class="layui-row layui-col-space15">' +
        noteHtmlNp +
        '</div>' +

        '</div>' +


        '</div>';


    var rightCard =
        '{{# layui.each(d.records, function(index, item){ }}' +
        '<div class="layui-card animated fadeInUp">' +
        '<div class="layui-card">' +
        '<div class="layui-card-header">' +
        '<p class="center-to-head card">' +
        '       {{# if(item.top){ }}' +
        '       <span class="zhiding">置顶</span>' +
        '       {{# } }}' +
        '       {{# if(!item.reprinted){ }}' +
        '       <span class="yuanchuang">原创发布</span>' +
        '       {{# } }}' +
        '       {{# if(item.reprinted){ }}' +
        '       <span class="zhuanzai">转载</span>' +
        '       {{# } }}' +
        '      <a title-id="{{item.id}}" style="cursor: pointer;">{{ item.title }}</a> ' +
        '</p>' +
        '<div style="display: none;" data-nid="{{item.id}}">{{ contentValue(item.mdContent,item.htmlContent)}}</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '{{#});}}';


    var tpl = layui.laytpl,
        laypage = layui.laypage;

    exports('notenp', function (obj) {
        var $noteBody = $("#note-body");
        tpl(note_np).render(obj, function (html) {
            $noteBody.append(html);
            initNoteNpPage(laypage, tpl, rightCard, obj.notePage);
            resolveShowMd(obj.notePage.records[0]);
            showNote();
            imgView();
        });
    });


});


function initNoteNpPage(laypage, laytpl, rightHtml, page) {
    // noinspection DuplicatedCode
    laypage.render({
        elem: 'page-btns-note'
        , count: page.total
        , limit: page.size
        , curr: page.current
        , layout: ['prev', 'page', 'next']
        , jump: function (obj, first) {
            if (!first) {
                var words = $("input[name=s]").val();
                $.post(
                    "/note/next",
                    {
                        pn: obj.curr,
                        s: encodeURI(words)
                    },
                    function (resp) {
                        if (resp.code === 200) {
                            laytpl(rightHtml).render(resp.data, function (rHtml) {
                                $("#note-list-page").html(rHtml);
                            });
                            $("html,body").animate({
                                scrollTop: 0
                            }, 233);
                        }
                    }
                );
            }
        }
    });
}

function resolveShowMd(noteMd) {
    if (noteMd.mdContent !== '' && noteMd.mdContent !== null) {
        editormd.markdownToHTML("noteMd", {
            markdown: noteMd.mdContent,//+ "\r\n" + $("#append-test").text(),
            //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
            htmlDecode: "style,script,iframe",  // you can filter tags decode
            tocContainer: "#custom-toc-container", // 自定义 ToC 容器层
            //gfm             : false,
            //tocDropdown     : true,
            pluginPath: '/static/def/plugins/editormd/plugins/',
            markdownSourceCode: false, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
            emoji: false,
            taskList: true,
            tex: true,  // 默认不解析
            flowChart: true,  // 默认不解析
            sequenceDiagram: true// 默认不解析
        });
    } else {
        $("#noteMd").html("<h2>请使用markdown文本编辑编辑笔记内容！</h2>");
    }
}


function showNote() {
    $("#note-body").on("click", "a[title-id]", function () {
        var id = $(this).attr("title-id");
        var leftNoteTitle = $("p[left-note]>a").parent("p").html();
        var leftNoteId = $("p[left-note]>a").attr("title-id");
        var _html = $("div[data-nid=" + id + "]").html();
        var _obj = {
            mdContent: _html
        };
        $("#noteMd").children().fadeOut(233).promise().then(function () {
            $("#noteMd").empty();
        }).then(function () {
            var _headerHtml = $("div[data-nid=" + id + "]").prev("p.center-to-head").html();
            $("#note-header").html(_headerHtml);
            $(this).attr("title-id", leftNoteId);
            $(this).parent("p").html(leftNoteTitle);
            resolveShowMd(_obj);
        });

        $("html,body").animate({
            scrollTop: 0
        }, 233);

    });
}

function contentValue(md, html) {
    if (md !== null && md !== "") {
        return md;
    } else {
        return html;
    }
}

function imgView() {
    $("#note-body").on("click", "img", function () {
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

