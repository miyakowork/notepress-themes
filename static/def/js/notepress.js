/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */
var npfront = {

    hideOpen: function () {
        $("#side-nav-open").hide();
        $("#side-nav-close").show();
    }

    , hideClose: function () {
        $("#side-nav-open").show();
        $("#side-nav-close").hide();
    }

    , searchDialog: function () {
        var width = layui.device().ios || layui.device().android ? (document.body.clientWidth * 0.8) : 500;
        layer.open({
            type: 1
            , id: 'search-dialog'
            , title: false
            , zIndex: 198910140
            , closeBtn: false
            , shadeClose: true
            , maxWidth: 100000
            , offset: '40%'
            , skin: 'fly-layer-search'
            , content: ['<form action="/index" method="get">'
                , '<input class="' + (!layui.device().ios && !layui.device().android ? "layui-icon" : "") + '" autocomplete="off" placeholder="' + (!layui.device().ios && !layui.device().android ? "&#xe615; " : " ") + '搜一搜你想要的内容" type="text" name="s" style="width: ' + width + 'px;" contenteditable="true">'
                , '<input type="hidden" name="search" value="1">'
                , '</form>'].join('')
        });
    }

    , headerScroll: function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.show = scrollTop > 175;
        if (this.st) {
            $("a.logo").removeClass("flipInX");
            var minWidth = $("#blog-info").find(".layui-article:eq(0)>.layui-colla-item").width();
            minWidth = minWidth <= 400 ? 280 : minWidth;
            $("#title").css("min-width", minWidth).css("font-weight", "500");
            if (this.show) {
                $(".logo").slideUp("fast", function () {
                    $("#title").slideDown("fast");
                })
            } else {
                $("#title").slideUp("fast", function () {
                    $(".logo").slideDown("fast");
                })
            }
        }
        if ($(".logo").is(":visible") && $("#title").is(":visible")) {
            $(".logo").hide();
        }
    }

    , miniHeaderNavBtn: function (layer) {
        var __navBtnAIndex;
        $(".simple .nav-btn a[data-title]").hover(function () {
            var that = this;
            __navBtnAIndex = layer.tips($(this).attr("data-title"), that, {
                tips: [3, '#F44336'],
                zIndex: 19930917
            });
        }, function () {
            layer.close(__navBtnAIndex);
        })
    }

    , miniHeader: function (bodyId) {
        var $body = $("#" + bodyId);
        window._justResult = $body.offset().top - $(window).scrollTop();
        npfront.animateNav($body);
        $(window).scroll(function () {
            window._justResult = npfront.animateNav($body);
        });
    }

    , animateNav: function ($body) {
        var result = $body.offset().top - $(window).scrollTop();
        if (!layui.device().ios && layui.device().os !== 'mac' && !layui.device().ie) {
            if (result >= -50) {
                if (result >= window._justResult) {
                    $("body.simple .header").removeClass("header-small");
                } else {
                    $("body.simple .header").addClass("header-small");
                }
            } else {
                if (result <= window._justResult) {
                    $("body.simple .header").addClass("header-small");
                } else {
                    $("body.simple .header").removeClass("header-small");
                }
            }
        }
        return result;
    }

    , miniTitle: function (bodyId) {
        var $body = $("#" + bodyId);
        window._justTitleResult = $body.offset().top - $(window).scrollTop();
        npfront.animateTitle($body);
        $(window).scroll(function () {
            window._justTitleResult = npfront.animateTitle($body);
        });
    }

    , animateTitle: function ($body) {
        var result = $body.offset().top - $(window).scrollTop();
        var scollHeight = $('body').scrollTop() + $('html').scrollTop();
        if (!layui.device().ios && layui.device().os !== 'mac' && !layui.device().ie) {
            if (result >= -50) {
                if (result >= window._justTitleResult) {
                    $("div.top-title").removeClass("top0");
                } else {
                    if (scollHeight >= 200) {
                        $("div.top-title").addClass("top0");
                    }
                }
            } else {
                if (result <= window._justTitleResult) {
                    if (scollHeight >= 200) {
                        $("div.top-title").addClass("top0");
                    }
                } else {
                    $("div.top-title").removeClass("top0");
                }
            }
        }
        return result;
    }

    , footerFixed: function ($element, height) {
        var device = layui.device();
        if (!device.android && !device.ios) {
            var h = window.innerHeight;
            if (h <= height) {
                $element.removeClass("fixed");
            } else {
                if (!$element.hasClass("fixed")) {
                    $element.addClass("fixed");
                }
            }
        }
    }

    , formatDate: function (date, format) {
        return new Date(date).format(format);
    }

    , wholeCnDate: function (date) {
        return new Date(date).format('yyyy年MM月dd日 HH:mm:ss');
    }

    , timeAgo: function (date) {
        date = date.replace(/\.\d+/, ' ');
        date = date.replace(/T/g, ' ');
        return date;
    }

    , simpleDate: function (date) {
        return new Date(date).format("MM/dd HH:mm");
    }

    , isChinese: function (str) {  //判断是不是中文
        var reCh = /[u00-uff]/;
        return !reCh.test(str) || str === ' ';
    }

    , lenStat: function (target) {
        var strlen = 0; //初始定义长度为0
        // var txtval = $.trim(target);
        var txtval = target;
        for (var i = 0; i < txtval.length; i++) {
            if (npfront.isChinese(txtval.charAt(i)) || txtval.charAt(i) === " ") {
                strlen = strlen + 0.5;//中文为2个字符
            } else {
                strlen = strlen + 1;//英文一个字符
            }
        }
        // strlen = Math.ceil(strlen / 2);//中英文相加除2取整数
        return strlen;
    }

    , lenStat2: function (target) {
        var strlen = 0; //初始定义长度为0
        // var txtval = $.trim(target);
        var txtval = target;
        for (var i = 0; i < txtval.length; i++) {
            if (npfront.isChinese(txtval.charAt(i)) || txtval.charAt(i) === " ") {
                strlen = strlen + 1;//中文为2个字符
            } else {
                strlen = strlen + 0.5;//英文一个字符
            }
        }
        // strlen = Math.ceil(strlen / 2);//中英文相加除2取整数
        return strlen;
    }

    , substr: function (originalStr, subLength) {
        // var txtval = $.trim(originalStr);
        var txtval = originalStr;
        var len = 0;
        var subIndex = 1;
        for (var i = 0; i < txtval.length; i++) {
            if (len <= subLength) {
                if (npfront.isChinese(txtval.charAt(i)) || txtval.charAt(i) === " ") {
                    len++;
                } else {
                    len = len + 0.5;
                }
                subIndex = i;
            } else {
                break;
            }
        }
        return originalStr.substring(0, subIndex);
    }

    , clearSticky: function () {
        var agent = navigator.userAgent;
        var isNotWebkit = (agent.indexOf("Edge/") > -1) || (agent.indexOf("Firefox/") > -1);
        if (isNotWebkit) {
            if ($("#main-body")) {
                $("#main-body").find("div.layui-row.layui-col-space10").removeClass("animated fadeInUp");
            }
            if ($("#note-body")) {
                $("#note-body").removeClass("animated fadeInUp");
            }
        }
    }

    , sticky: function () {
        var listHeight = $(".layui-container>.layui-row>.layui-col-md9").outerHeight(true);
        var stickHeight = $(".layui-container #affix-side").parents(".layui-col-md3").outerHeight(true);
        return stickHeight < listHeight;
    }

    , getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    }

    , toLoginPage: function () {
        location.href = "/np-login?redirectUrl=" + btoa(encodeURIComponent(location.href));
    }

    , setCookie: function (name, value) {
        // var Days = 30;
        var exp = new Date();
        // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        exp.setTime(exp.getTime() + 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    , getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (document.cookie.match(reg)) {
            arr = document.cookie.match(reg);
            return unescape(arr[2]);
        } else
            return null;
    }

    , delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }

    , bottomLogin: function () {
        location.href = "/np-login?redirectUrl=" + btoa(encodeURIComponent(location.href));
    }

    , tokenLogout: function () {
        $.get("/token/logout?redirectUrl=" + btoa(encodeURIComponent(location.href)), function (resp) {
            if (resp.code === 200) {
                location.reload();
            }
        });
    }

    , browser: {
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) === " qq" //是否QQ
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    ,
    /**
     * 获取文本字节长度
     * @param val
     * @returns {number}
     */
    getLength: function (val) {
        var bytesCount = 0;
        if (val && val.length > 0) {
            var str = new String(val);
            for (var i = 0, n = str.length; i < n; i++) {
                var c = str.charCodeAt(i);
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                    bytesCount += 1;
                } else {
                    bytesCount += 2;
                }
            }
        }
        return bytesCount;
    }
};

Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};