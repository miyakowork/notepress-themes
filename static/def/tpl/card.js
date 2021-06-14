var card = '\
   {{#  layui.each(d.wel_card, function(index, item){ }}\
   {{# if(item.show){ }}\
   {{# if(d.__cnt__ == 1 && index == 0){ }}\
   <div class="layui-col-md3 layui-col-md-offset4-5">\
   {{#} }}\
   {{# if(d.__cnt__ == 1 && index != 0){ }}\
   <div class="layui-col-md3">\
   {{#} }}\
     {{# if(d.__cnt__ == 2 && index == 0){ }}\
   <div class="layui-col-md3 layui-col-md-offset3">\
   {{#} }}\
   {{# if(d.__cnt__ == 2 && index != 0){ }}\
   <div class="layui-col-md3">\
   {{#} }}\
     {{# if(d.__cnt__ == 3 && index == 0){ }}\
   <div class="layui-col-md3" style="margin-left: 15%;">\
   {{#} }}\
    {{# if(d.__cnt__ == 3 && index != 0){ }}\
   <div class="layui-col-md3">\
   {{#} }}\
    {{# if(d.__cnt__ == 4){ }}\
   <div class="layui-col-md3">\
   {{#} }}\
          <div class="layui-card">\
            <div class="layui-card-header">{{item.headerHtml}}</div>\
            <div class="layui-card-body">\
                <a href="{{item.url}}">\
                    <div class="wel-card-logo">\
                      {{#  if(item.shape === "1"){ }}\
                        <img src="{{item.logoImgSrc}}" alt="{{item.cardTitle}}" class="layui-square">\
                      {{#  }else{ }} \
                        <img src="{{item.logoImgSrc}}" alt="{{item.cardTitle}}" class="layui-circle">\
                      {{#  } }} \
                    </div>\
                    <div class="wel-card-title">\
                        <fieldset class="layui-elem-field layui-field-title">\
                            <legend align="center" class="nbv5-font" style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">{{item.cardTitle}}</legend>\
                        </fieldset>\
                        <div class="layui-field-box">\
                            <blockquote class="layui-elem-quote">{{item.cardDesc}}</blockquote>\
                        </div>\
                    </div>\
                    <div class="wel-card-content">\
                            {{#  layui.each(str2Array(item.itemTexts), function(index1, item1){ }}\
                        <p>\
                            <i class="fa fa-check-square-o"></i> {{item1}}\
                        </p>\
                            {{#  }); }}\
                    </div>\
                </a>\
            </div>\
            <div class="layui-card-footer">\
                <div class="layui-text">{{item.footerText}}</div>\
            </div>\
        </div>\
    </div>\
{{#} }}\
   {{#  }); }}';

function renderCard(data, laytpl, elemSelector, callback) {
    laytpl(card).render(data, function (respHtml) {
        elemSelector.html(respHtml);
        if (callback && typeof callback === 'function') {
            callback();
        }
        $(".layui-card").hover(function () {
            $(this).find("i.fa-check-square-o").removeClass("fa-check-square-o").addClass("fa-check-square");
        }, function () {
            $(this).find("i.fa-check-square").removeClass("fa-check-square").addClass("fa-check-square-o");
        });
    });
}

function str2Array(str) {
    return str.split("\n");
}
