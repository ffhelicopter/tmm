$(function() {
    $(document).on('click', '.ajaxBtn', function() {
        var that = this;
        if ($(that).attr("todo") == 1) {
            return false;
        }
        contentIsLogin();

        var mmid = $(that).attr("mmid");
        var ajaxurl = $(that).attr("ajaxurl");

        $(that).attr("todo", 1);
        $.post(ajaxurl, {id : mmid}, function(json){
            if (json.status == "nol") {
                window.location.href = "http://www.umojia.cn/Login/index";
                return false;
            }
            //console.log(json);
            if (json.status == "y") {
                var type = $(that).attr("ajaxtype");

                if (type == "list_like") {//点赞操作 列表中的
                    var like_num = $(that).attr("likenum");
                    $(that).find("span").html(parseInt(like_num) + 1);
                    $(that).removeClass("item-like");
                    $(that).removeClass("ajaxBtn");
                    $(that).addClass("item-liked");
                } else if(type == "followuser") {
                    $(that).find("span").text("已关注");
                } else {
                    location.reload();
                }
            } else {
                $(that).attr("todo", 0);
                alert(json.info);
            }
        });
    });

    var todocomment = true;
    //提交评论
    $(".submit_comment").click(function(){
        if (todocomment == false) {
            return false;
        }
        contentIsLogin();
        var text = $.trim($(".comment_content").val());
        if (text == "") {
            return false;
        }
        todocomment = false;
        $.post( "/Comment/add", $(".comment_form").serialize(), function(json){
            if (json.status == "y") {
                location.reload();
            } else {
            }
            todocomment = true;
        }, 'json' );
        return false;
    });

    //点击回复按钮
    $(document).on('click', '.reply', function() {
        var fid = $(this).attr("fid"),
            rename = $.trim($(this).attr("rename"));
        $(".comment_fid").val(fid);
        $(".reply_user").html("回复 " + rename);
        //$(".comment_content").val("@" + rename + "：");
        $(".comment_content").focus();
    });

    //监测输入框
    $(document).on('focus','textarea', function() {
        contentIsLogin();
    });

});

//判断是否登录
function contentIsLogin(is_to_login) {
    var _umojia_ppt_id = $.cookie('_umojia_ppt_id');
    if (typeof(_umojia_ppt_id) == "null" || _umojia_ppt_id == '' || _umojia_ppt_id == null) {
        if (is_to_login != 2) {
            var backurl = top.window.location.href;
            window.location.href="http://www.umojia.cn/Login/index?backurl="+encodeURIComponent(backurl);
        }
        return 0;
    }
    return 1;
}
