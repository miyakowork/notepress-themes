/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */
layui.define(function (exports) {
    var obj = {
        tplStr: function () {
            return topArea66;
        }
    };

    exports('toparea66', obj);
});

var topArea66 =
    '{{#if(d.recommendPage.total > 0){}}' +

    '<div class="layui-row layui-col-space8">' +

    '<div class="layui-col-md8">' +
    '<div class="layui-card">' +

    '<div class="layui-card-body" style="min-height: 315px;padding: 8px;">' +
    '<div class="layui-carousel" id="top-carousel" lay-filter="top-carousel" style="height: 330px;">' +
    '<div carousel-item style="height: 315px;">' +
    '{{# layui.each(d.recommendPage.records,function(index,item){ }}' +
    // '<div>' +
    '<img src="{{item.cover}}" alt="{{item.title}}" style="width: 100%;" data-txt="{{item.title}}" data-cid="{{item.id}}">' +
    // '</div>' +
    '{{#}); }}' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div class="layui-card-footer lunbo-text-div">' +
    '<div style="margin-top: -40px;"><p class="lunbo-text layui-elip" id="carousel-text"><a href="/content/{{d.recommendPage.records[0].id}}">{{d.recommendPage.records[0].title}}</a></p></div>' +
    '</div>' +

    '</div>' +
    '</div>' +

    '<div class="layui-col-md4">' +

    '{{#if(d.hotPage.total >0 ){}}' +
    '<div class="layui-row layui-col-space3">' +

    '{{# layui.each(d.hotPage.records,function(index,item){ }}' +
    '{{#if(index < 4 ){}}' +
    '<div class="layui-col-md6 layui-hide-xs layui-hide-sm layui-show-md-block">' +
    '<div class="layui-card">' +
    '<div class="layui-card-body" style="padding: 8px;">' +
    '<div class="card-img-66" style="background-image:url({{item.cover}})"></div>' +
    '</div>' +
    '<div class="layui-card-footer card-footer"><blockquote class="layui-elem-quote layui-elip card-footer-text"><a href="/content/{{item.id}}">{{item.title}}</a></blockquote></div>' +
    '</div>' +
    '</div>' +
    '{{#}}}' +
    '{{#}); }}' +

    '</div>' +
    '{{#}}}' +
    '</div>' +


    '</div>' +
    '{{#}}}';


