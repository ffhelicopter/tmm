(function($) {
		$.fn.limitTextarea = function(opts) {
			var defaults = {
				maxNumber: 140, //允许输入的最大字数
				position: 'top', //提示文字的位置，top：文本框上方，bottom：文本框下方
				onOk: function() {}, //输入后，字数未超出时调用的函数
				onOver: function() {} //输入后，字数超出时调用的函数   
			}
			var option = $.extend(defaults, opts);
			this.each(function() {
				var _this = $(this);
				var info = '<div id="info">还可以输入<b>' + (option.maxNumber - _this.val().length) + '</b>字</div>';
				var fn = function() {
					var $info = $('#info');

					var extraNumber = option.maxNumber - strlen(_this.val());
					
					if (extraNumber >= 0) {
						$info.html('还可以输入<b>' + extraNumber + '</b>个字');
						option.onOk();
					} else {
						$info.html('已经超出<b style="color:red;">' + (-extraNumber) + '</b>个字');
						option.onOver();						
						return false;
					}
				};
				switch (option.position) {
					case 'top':
						_this.before(info);
						break;
					case 'bottom':
					default:
						_this.after(info);
				}
				_this.get(0).addEventListener("input", fn, false);
				//绑定输入事件监听器
				/*
				if (window.addEventListener) { //先执行W3C
					_this.get(0).addEventListener("input", fn, false);
				} else {
					_this.get(0).attachEvent("onpropertychange", fn);
				}
				if (window.VBArray && window.addEventListener) { //IE9
					_this.get(0).attachEvent("onkeydown", function() {
						var key = window.event.keyCode;
						(key == 8 || key == 46) && fn(); //处理回退与删除
					});
					_this.get(0).attachEvent("oncut", fn); //处理粘贴
				}*/
			});
		}
	})(jQuery)

	function trim(str) {
		return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
	}

	function strlen(str) {
		var str = trim(str);
		var len = 0;
		for (var i = 0; i < str.length; i++) {
			len += str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255 ? 1 : 1;
		}
		return len;
	}







/*
一种是一个函数：$.fn.函数名 = function([options]){}
另外一种自然是可以多个函数：$.fn.extend({函数名:function(){}});
第一种真能一次搞一个函数，而第二个可以一次声明多个函数
接下来讲解$.extend()的用法
一种$.extend(defaults, options);
其中defaults为默认设置，options为传入的参数
这个函数的作用是用后面的参数与第一个参数进行合并然后返回它的值

$.extend(defaults, options)返回值是被覆盖的值
这就造成了一般的插件不会用$.extend(defaults, options)原因就是他改变了默认的值
接下来就是另外一种方法
$.extend({},defaults, options);


一般的插件代码，如果没有加一个return 回到一个问题：那就是只能用一次
$(".afters").color().css({})这就会报错，因为没有返回本身这个对象，所以使用完color()是没有返回值得话，那么css调用时是undefined，所以会报错，因此当我们写完插件代码时，最后要返回jQuery对象本身，否则就只能调用一次就不能调用了。
*/
(function ($) {
    $.fn.extend({
        //插件名称 - paddingList
        paddingList: function (options) {

            //参数和默认值
            var defaults = {
                animatePadding: 10,
                hoverColor: "Black"
            };

            var options = $.extend(defaults, options);

            return this.each(function () {
                var o = options;

                //将元素集合赋给变量 本例中是 ul对象 
                var obj = $(this);

                //得到ul中的a对象
                var items = $("li a", obj);

                //添加hover()事件到a
                items.hover(function () {
                    $(this).css("color", o.hoverColor);
                    //queue false表示不添加到动画队列中
                    $(this).animate({ paddingLeft: o.animatePadding }, { queue: false, duration: 300 });

                }, function () {
                    $(this).css("color", "");
                    $(this).animate({ paddingLeft: "0" }, { queue: true, duration: 300 });
                });

            });
        }
    });
})(jQuery);
//使用插件
$(document).ready(function() {
    $("#catagory").paddingList({ animatePadding: 30, hoverColor: "Red" });
});



//插件调用；
$(function() {
	$('#saytxt').limitTextarea({
		maxNumber: 140, //最大字数
		position: 'bottom', //提示文字的位置，top：文本框上方，bottom：文本框下方

		onOk: function() {
			$('#saytxt').css('background-color', 'white');
		}, //输入后，字数未超出时调用的函数
		onOver: function() {
			$('#saytxt').css('background-color', 'lightpink');
			var num = $("#saytxt").val().substr(0,140);
			$("#saytxt").val(num); 
		} //输入后，字数超出时调用的函数，这里把文本区域的背景变为粉红色   
	});
});


$(function ($) {
    var $body = $('body');
    $body.on('click', '.row-like', function () {
        var $this = $(this),
            msg = $this.attr('data-msg'),
            row_id = $this.attr('data-row-id'),
            row_type = $this.attr('data-row-type'),
            like = $this.attr('data-is-like') < 1 ? 1 : 0;
        if (!$CONF['is_login']) {
                $.login(function () {
                    location.reload();
                });
                return false;
            }
        if ($this.hasClass('lock')) {
                return false;
            } else {
                $this.addClass('lock');
            }
        var post = {
                id: row_id,
                like: like
            };
        if (row_type) {
                post['type'] = row_type
            }
        var doLike = function () {
                $.post('/proxy/doLike', post, function (result) {
                    if (result.code != 1000) {
                        $.notify(result.msg || $L('网络错误'), 'error');
                    }
                    $this.removeClass('lock');
                }, 'json');
                var num_liked = $this.attr('data-num-liked');
                if (!like) {
                    --num_liked;
                    $this.attr('data-num-liked', num_liked).html('<span></span><i>' + $L('赞一下') + '</i>').attr('data-is-like', 0).removeClass('heart_a_on').addClass('heart_a');
                } else {
                    ++num_liked;
                    $this.attr('data-num-liked', num_liked).html('<span></span><i>' + num_liked + '</i>').attr('data-is-like', 1).addClass('heart_a_on');
                }
                $this.trigger('like', [like, $CONF['head']]);
            }
        if (like < 1) {
                $.tinyConfirm($this, {
                    title: msg || '不喜欢这件作品了',
                    callback: doLike
                }).on('close', function () {
                    $this.removeClass('lock');
                });
            } else {
                doLike();
            }
        return false;
    })
});