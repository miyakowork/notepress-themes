/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */
layui.define(function (exports) {
    var obj = {
        tplStr: function () {
            return topArea;
        }
    };

    exports('toparea', obj);
});

var topArea =
    '{{#if(d.recommendPage.total > 0){}}' +

    '<div class="layui-row">' +

    '<div class="layui-card">' +

    '<div class="layui-card-body">' +
    '<div class="layui-carousel" id="top-carousel" lay-filter="top-carousel">' +
    '<div carousel-item>' +
    '{{# layui.each(d.recommendPage.records,function(index,item){ }}' +
    '<a href="/content/{{item.id}}">' +
    '<img src="{{item.cover}}" alt="{{item.title}}" style="width: 100%;" data-txt="{{item.title}}" data-cid="{{item.id}}"> ' +
    '</a>' +
    '{{#}); }}' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div class="layui-card-footer lunbo-text-div">' +
    '<div style="margin-top: -40px;"><p class="lunbo-text" id="carousel-text"><a href="/content/{{d.recommendPage.records[0].id}}">{{d.recommendPage.records[0].title}}</a></p></div>' +
    '</div>' +

    '</div>' +

    '</div>' +
    '{{#}}}' +


    '{{#if(d.hotPage.total >2&&d.hotPage.total<9 ){}}' +
    '<hr class="layui-mt20 layui-hide-xs layui-hide-sm layui-show-md-block">' +
    '<blockquote class="layui-elem-quote layui-hide-xs layui-hide-sm layui-show-md-block"><i class="fa fa-sun-o"></i>&nbsp;热门 - HOT</blockquote>' +
    '<div class="layui-row layui-col-space10 layui-mt20 layui-hide-xs layui-hide-sm layui-show-md-block">' +

    '{{# layui.each(d.hotPage.records,function(index,item){ }}' +
    '{{#if(index < 9 ){}}' +
    '{{#if(d.hotPage.total == 3 ){}}' +
    '<div class="layui-col-md4 layui-col-xs12 layui-col-sm6">' +
    '{{#}}}' +
    '{{#if(d.hotPage.total >= 4 ){}}' +
    '<div class="layui-col-md3 layui-col-xs12 layui-col-sm6">' +
    '{{#}}}' +
    '<div class="layui-card">' +
    '<div class="layui-card-body"  style="padding: 8px;">' +
    '<div class="card-img" style="background-image:url({{item.cover}})"></div>' +
    '</div>' +
    '<div class="layui-card-footer card-footer"><blockquote class="layui-elem-quote layui-elip card-footer-text" style="border-left: none;"><a href="/content/{{item.id}}">{{item.title}}</a></blockquote></div>' +
    '</div>' +
    '</div>' +
    '{{#}}}' +
    '{{#}); }}' +

    '</div>' +
    '{{#}}}';
