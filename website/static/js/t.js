$(function() { 
 $(".heart").on("click", function() { 
  $(this).toggleClass("is-active"); 
 }); 
}); 



$(function ($) {
    var $body = $(document.body),
        limit = 3,
        xhr;
    $body.on('click', '.like-row', function (ev) {
            var $this = $(this),
                parent = $this.parent(),
                uid = $CONF['oid'],
                row_id = $this.attr('data-row-id'),
                like = $this.attr('data-is-like') < 1 ? 1 : 0,
                box = $this.closest('.supportBox'),
                personBox = $('.headbox', box);
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
            var doLike = function () {
                    $.post('/proxy/doLike', {
                        id: row_id,
                        like: like,
                        type: 13
                    }, function (result) {
                        if (result.code != 1000) {
                            $.notify($L('网络错误'), 'error');
                        } else {
                            $elem = $('<div class="post_animated_heart post_poof"><span class="heart_left"></span><span class="heart_right"></span></div>');
                            if (!like) {
                                $this.html('<i class="heart"></i><span>' + $L('赞') + '</span>').attr('data-is-like', 0);;
                                parent.removeClass('on');
                                $this.append($elem.addClass('unliked'));
                                $('.head_' + $CONF['uid'], personBox).remove();
                            } else {
                                $this.html('<i class="heart"></i><span>' + result.num_liked + '</span>').attr('data-is-like', 1);
                                parent.addClass('on');
                                $this.append($elem);
                                $CONF['time'] = Math.random();
                                $(juicer('<a href="/${domain}" title="${uname}" class="btn head_p_btn head_${uid}"><img src="${head}" alter="${uname}"></a>', $.extend($CONF, result))).prependTo(personBox);
                            }
                            $this.trigger('like', [like, result.head]);
                            setTimeout(function () {
                                $elem.removeClass('unliked').remove();
                            }, 600);
                        }
                        $this.removeClass('lock');
                        person.trigger('adjust');
                    }, 'json');
                }
            if (like < 1) {
                    $.tinyConfirm($this, {
                        title: '不喜欢该简介了？',
                        callback: doLike
                    });
                } else {
                    doLike();
                }
            return false;
        }).on('click', '.like-comment', function (ev) {
            var $this = $(this),
                row_id = $this.attr('data-row-id'),
                is_liked = $this.attr('data-is-liked'),
                action = is_liked < 1 ? 1 : 0;
            if (!$CONF['is_login']) {
                    $.login(function () {
                        $this.trigger('click');
                        location.reload();
                    });
                    return false;
                }
            $.post('/comment/doLike', {
                    row_id: row_id,
                    action: action
                }, function (result) {
                    if (result.code != 1000) {
                        $.notify(result.msg || $L('网络错误'));
                    }
                }, 'json');
            if (action == 1) {
                    $this.addClass('heart_a_on').removeClass('heart_a').attr('data-is-liked', 1).find('em').text(function (i, text) {
                        return (parseInt(text) || 0) + 1;
                    });
                } else {
                    $this.removeClass('heart_a_on').addClass('heart_a').attr('data-is-liked', 0).find('em').text(function (i, text) {
                        var num = (parseInt(text) || 0) - 1;
                        return num <= 0 ? $L('赞') : num;
                    });
                }
            return false;
        }).on('click', '.delete-comment', function (ev) {
            var $this = $(this),
                comment_id = $this.attr('data-comment-id');
            $.tinyConfirm($this, {
                    title: $L('确定要删除这条评论吗？'),
                    callback: function () {
                        $(this).trigger('close');
                        $.post('/comment/doDelete', {
                            comment_id: comment_id
                        }, function (result) {
                            if (result.code == 1000) {
                                $this.closest('li').fadeOut(function () {
                                    $(this).remove();
                                });
                                $('.num_comment').text(function (i, num) {
                                    return (parseInt(num) || 0) - 1;
                                });
                            } else {
                                $.notify(result.msg, 'error');
                            }
                        }, 'json');
                    }
                });
            return false;
        }).on('click', '#comment_form .submit', function () {
            $(this).closest('form').trigger('submit');
            return false;
        }).on('keydown', 'textarea', function (ev) {
            if (ev.keyCode == 13 && (ev.ctrlKey || ev.metaKey)) {
                $(this).closest('form').trigger('submit');
                return false;
            }
        }).on('submit', '.comment_form', function (ev) {
            var $this = $(this),
                textarea = $('textarea', $this),
                val = $.trim(textarea.val()),
                comment_list = $('#comment_list');
            if (!$CONF['is_login']) {
                    $.login(function () {
                        location.reload();
                    });
                    return false;
                }
            if (!val.length) {
                    textarea.shine(function () {
                        $(this).css({
                            background: 'none'
                        })
                    });
                    return false;
                }
            if ($this.hasClass('lock')) {
                    return false;
                } else {
                    $this.addClass('lock');
                }
            $.post('/comment/doComment', $this.serialize(), function (result) {
                    if (result.code == 1000) {
                        $('.reply_uid', $this).val(0);
                        $('.reply_comment_id', $this).val(0);
                        $this.trigger('reset');
                        var li = $(result.html).prependTo($('ul', comment_list)),
                            height = li.outerHeight();
                        if (!$CONF['isMobile']) {
                                li.css({
                                    height: 0
                                }).animate({
                                    height: height
                                }, 'normal', 'swing', function () {
                                    li.css('height', 'auto');
                                });
                            }
                        $('html,body').animate({
                                scrollTop: li.offset().top
                            }, 'fast', 'swing');
                        $('.num_comment').text(function (i, num) {
                                return (parseInt(num) || 0) + 1;
                            });
                    } else {
                        $.notify(result.msg, 'error');
                    }
                    $this.removeClass('lock');
                }, 'json');
            return false;
        }).on('click', '.report', function () {
            var $this = $(this),
                report = $this.attr('data-report');
            $.report($.parseJSON(report));
            return false;
        }).on('mouseenter mouseleave', '#comment_list li', function (ev) {
            $(this).toggleClass('hover', ev.type == 'mouseenter');
        }).on('click', '.reply', function (ev) {
            var $this = $(this),
                dash = '：',
                comment_id = $this.attr('data-comment-id'),
                uname = $this.attr('data-reply-uname'),
                uid = $this.attr('data-reply-uid'),
                length = 0;
            $('input.reply_uid', $('#comment_form')).val(uid);
            $('input.reply_comment_id', $('#comment_form')).val(comment_id);
            var textarea = $('textarea', $('#comment_form')).val(function (i, text) {
                    text = text.replace(/回复@[^\s]+?(：)/, '');
                    text = '回复@' + uname + dash + text;
                    length = text.length
                    return text;
                });
            $.setCursor(textarea[0], length);
        }).on('focusin', '#comment_form textarea', function () {
            checkLogin();
            lazyForm(false);
        }).on('click', '.phiz_btn', function () {
            checkLogin();
            lazyForm(true);
        }).on('click', '.unfold_btn', function (ev) {
            person.closest('.supportBox').toggleClass('on');
            person.trigger('adjust');
            return false;
        });
    var person = $('.headbox'),
        outerWidth = person.outerWidth(),
        children = $('> a', person),
        w = children.outerWidth(true),
        mx = Math.floor(outerWidth / w),
        unfold = $('<a href="javascript:;" class="btn unfold_btn head_p_btn"><span><img src=""></span></a>');
    person.on('adjust', function () {
            var support = $(this).closest('.supportBox'),
                children = $('> a', person).not(unfold);
            if (support.hasClass('on')) {
                    children.show().find('img[data-src]').trigger('appear');
                } else if (children.length > mx) {
                    children.each(function (i) {
                        $(this).toggle(i <= mx - 2 ? true : false);
                    })
                }
            if (children.length > mx) {
                    person.append(unfold);
                } else {
                    unfold.detach();
                }
        }).trigger('adjust');
    var checkLogin = function () {
            if (!$CONF['is_login']) {
                if ($CONF['isMobile'] || $CONF['isIpad']) {
                    location.href = "/login?callback=" + location.href;
                } else {
                    $.login(function () {
                        location.reload();
                    });
                }
                return false;
            }
        }
    var lazyForm = function (trigger_click) {
            var textarea = $('textarea', $('#comment_form'));
            var emotions_btn = $('.phiz_btn');
            if ($CONF['is_login'] && !emotions_btn.data('emotions')) {
                var emotions = new $.emotions({
                    $body: $('body'),
                    $btn: emotions_btn,
                    $text: textarea
                });
                emotions_btn.after(emotions.$el)
                textarea.closest('form').on('submit', function () {
                    emotions.$el.hide();
                })
                if (!$CONF['isMobile']) {
                    $('#comment_text').atwho(at_config)
                }
                trigger_click && emotions_btn.trigger('click');
                emotions_btn.data('emotions', 1);
            }
        }
    if ($.card) {
            $.card(document.body);
        }
    if ($.reward) {
            $(document.body).on('click', '.btn_reward', function () {
                $.reward({
                    type: 13
                });
            })
        }
    $.extend({
            report: function (params) {
                var params = params || {},
                    dialog = $(juicer(document.getElementById('report_tmpl').innerHTML, params)).appendTo(document.body).easyModal({
                        autoOpen: true,
                        onClose: function () {
                            $(this).parent().remove();
                        },
                        updateZIndexOnOpen: false,
                        onOpen: function () {
                            var $this = $(this);
                            $this.on('click', '.x-close', function () {
                                $this.trigger('closeModal');
                                return false;
                            }).on('checked', 'input', function (ev) {
                                var val = this.value,
                                    form = $('.report-other', dialog);
                                form.toggleClass('hide', val != 4 && val != 3);
                                $this.trigger('reposition');
                            }).on('click', '.submit', function (ev) {
                                $('form', $this).trigger('submit');
                                return false;
                            }).on('submit', 'form', function () {
                                var input = $('input:checked', $this),
                                    textarea = $('textarea', $this),
                                    val = $.trim(textarea.val());
                                if (input.val() == 4 && !val.length) {
                                        textarea.shine();
                                        return false;
                                    }
                                $.post('/proxy/doReport', $(this).serialize(), function (result) {
                                        if (result.code == 1000) {
                                            $.notify($L('举报成功'));
                                            $this.trigger('closeModal');
                                        } else {
                                            $.notify(result.msg, 'error');
                                        }
                                    }, 'json');
                                return false;
                            }).find('textarea').trigger('blur');
                        }
                    });
                return false;
            },
            setCursor: function (ctrl, pos) {
                if (ctrl.setSelectionRange) {
                    ctrl.focus();
                    ctrl.setSelectionRange(pos, pos);
                }
                else if (ctrl.createTextRange) {
                    var range = ctrl.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            }
        });
});