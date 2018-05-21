var default_config = {
		link		: encodeURIComponent(window.location.href),
		title		: $('title').html() ? $('title').html() : '',
		before		: '',
		summary		: $('meta[name="description"]').attr('content') ? $('meta[name="description"]').attr('content') : '',
		imageUrl	: '',
		WeixinUrl	: encodeURIComponent(window.location.href).replace(document.location.host, 'm.jiemian.com'),
		WeixinSuccessUrl : '',
		SinaSource	: '111',
		SinaAppkey	: '2254771841'
	}

if ( typeof share_config == 'undefined' ) var share_config = {};
var cfg;

// sina分享
$(document).on('click','.to_sina', function() {
	GetConfig();
	var share_title = cfg.before +'【'+ cfg.title +'】'+ cfg.summary;
	// 拼接@用户
	if (typeof($(this).attr('data')) != 'undefined' && $(this).attr('data') != '')
	{
		share_title += '...'+$(this).attr('data');
	}

	var _sina_url = 'http://service.weibo.com/share/share.php?title='+ share_title +'&url='+ cfg.link +'&source='+ cfg.SinaSource +'&appkey='+ cfg.SinaAppkey +'&pic='+ cfg.imageUrl +'&searchPic=false&relateUid=';
	window.open(_sina_url);

	addShareNumber(this, $(this).attr('url'));
});

function GetConfig() {
	if ( share_config.imageUrl && navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger" )
	{
		share_config.imageUrl = share_config.imageUrl.replace(/_a([0-9]+x[a-zA-Z0-9]+)/, '_a300x300');
	}
	cfg = $.extend({}, default_config, share_config);
}

function addShareNumber(obj, url) {
	if ($(obj).attr('share') == 'true')
	{
		$.get(url, {}, function(data) {
			$(obj).attr('share', 'false');
		},'jsonp');
	}
}


/*function include_css(path)
{
    var fileref  = document.createElement("link")
    fileref.rel  = "stylesheet";
    fileref.type = "text/css";
    fileref.href = '//res.umojia.com/static/'+path;
    var headobj  = document.getElementsByTagName('head')[0];
    headobj.appendChild(fileref);
}*/

var ua = navigator.userAgent.toLowerCase();
if( ua.match(/MicroMessenger/i) == "micromessenger" ) {
	GetConfig();
	//var wconUrl = 'http://a.jiemian.com/mobile/index.php?m=article&a=wcon';

	$('body').prepend('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>');

	$.get(wconUrl, {url : encodeURIComponent(window.location.href)}, function(data) {
		wx.config({
			debug: false,
			appId: data.cfg.appId,
			timestamp: data.cfg.timestamp,
			nonceStr: data.cfg.nonceStr,
			signature: data.cfg.signature,
			jsApiList: [
			  // 所有要调用的 API 都要加到这个列表中
			  'onMenuShareAppMessage', 'onMenuShareTimeline'
			]
		});

		wx.ready(function () {
			// 分享给朋友
			wx.onMenuShareAppMessage({
				title	: cfg.title, // 分享标题
				desc	: cfg.summary, // 分享描述
				link	: window.location.href, // 分享链接
				imgUrl	: cfg.imageUrl, // 分享图标
				type	: '', // 分享类型,music、video或link，不填默认为link
				dataUrl	: '', // 如果type是music或video，则要提供数据链接，默认为空
				// 用户确认分享后执行的回调函数
				success	: function () {
					if ( cfg.WeixinSuccessUrl ) $.getJSON( cfg.WeixinSuccessUrl );
				},
				// 用户取消分享后执行的回调函数
				cancel	: function () {
					alert(window.location.href);
				}
			});

			// 分享到朋友圈
			wx.onMenuShareTimeline({
				title	: cfg.title, // 分享标题
				desc	: cfg.summary, // 分享描述
				link	: window.location.href, // 分享链接
				imgUrl	: cfg.imageUrl, // 分享图标
				// 用户确认分享后执行的回调函数
				success	: function () {
					if ( cfg.WeixinSuccessUrl ) $.getJSON( cfg.WeixinSuccessUrl );
				},
				// 用户取消分享后执行的回调函数
				cancel	: function () {}
			});
		});

	}, 'jsonp');
}
