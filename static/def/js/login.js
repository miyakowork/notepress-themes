/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */
var isIE = npfront.browser.versions.trident;
if (isIE) {
    alert("请使用【Chrome（或Chrome内核）／FireFox／Safari】等现代浏览器访问以获得最佳体验！");
}

function doQqLogin() {
    if (isOpenQqLogin) {
        location.href = "/api/login/qq";
    } else {
        layer.msg("未开放QQ登录！");
    }
}

function doGithubLogin() {
    if (isOpenGithubLogin) {
        location.href = "/api/login/github";
    } else {
        layer.msg("未开放Github登录！");
    }
}

function doGiteeLogin() {
    if (isOpenGiteeLogin) {
        location.href = "/api/login/gitee";
    } else {
        layer.msg("未开放Gitee登录！");
    }
}

layui.use(['form', 'jquery'], function () {
    var form = layui.form;
    window.$ = layui.$;
    form.verify({
        username: function (value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                slider.reset();
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                slider.reset();
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                slider.reset();
                return '用户名不能全为数字';
            }
            if (value.length < 4 || value.length > 12) {
                slider.reset();
                return "用户名必须4~12位，且不能包含空格";
            }
        }
        , pass: function (value) {
            if (!/^[\S]{6,12}$/.test(value)) {
                slider.reset();
                return '密码必须6到12位，且不能出现空格';
            }
        }
    });

    // var slider = sliderVerify.render({
    //     elem: '#slider',
    //     text: '向右拖动滑块登录',
    //     onOk: function () {//当验证通过回调
    //         layer.msg("登录中...");
    //         setTimeout(function () {
    //             $("#v5Login").trigger("click");
    //         }, 888);
    //     }
    // });

    form.on('submit(npLoginSubmit)', function (data) {
        data.field.password = md5(data.field.nppass);
        data.field.username = data.field.npname;
        data.field.code = data.field.npcode;
        // if (slider.isOk()) {
        $.post("/user/login", data.field, function (resp) {
            if (resp.code === 200) {
                layer.msg("登录成功！");
                setTimeout(function () {
                    location.href =
                        resp.url !== null && resp.url !== "" && resp.url !== undefined
                            ? resp.url : "/";
                }, 1000);
            } else {
                layer.msg("登录失败，" + resp.message);
                setTimeout(function () {
                    location.reload();
                }, 1000)
            }
        });
        // } else {
        //     layer.msg("请先通过滑块验证");
        // }
        return false;
    });
});

//验证码图片刷新
function captchaRefresh(img) {
    $(img).attr("src", "/image/code?t=" + Math.random());
}
