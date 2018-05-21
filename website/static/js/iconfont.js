;(function(window) {

    var svgSprite = '<svg>' +
        ''+
        '<symbol id="icon-avatar" viewBox="0 0 1024 1024">'+
        ''+
        '<path d="M511.616 42.666667c-259.2 0-469.333333 210.133333-469.333333 469.333333 0 259.2 210.133333 469.333333 469.333333 469.333333s469.333333-210.176 469.333333-469.333333C980.949333 252.757333 770.816 42.666667 511.616 42.666667zM84.949333 512c0-235.648 191.018667-426.666667 426.666667-426.666667 235.648 0 426.666667 191.018667 426.666667 426.666667 0 108.544-40.874667 207.274667-107.562667 282.624-38.954667-104.405333-126.293333-184.96-235.904-212.309333 57.386667-32.554667 96.682667-97.92 96.682667-173.397333C691.456 300.928 611.157333 213.333333 512.170667 213.333333 413.141333 213.333333 332.842667 300.928 332.842667 408.917333c0 75.477333 39.253333 140.842667 96.682667 173.397333-109.909333 27.434667-197.418667 108.288-236.16 213.12C126.165333 720.085333 84.949333 620.970667 84.949333 512zM512.170667 566.058667c-81.024 0-146.730667-71.68-146.730667-160.042667 0-88.405333 65.706667-160.042667 146.730667-160.042667 80.981333 0 146.688 71.637333 146.688 160.042667C658.858667 494.336 593.152 566.058667 512.170667 566.058667zM218.666667 821.632c39.424-125.482667 154.965333-217.130667 293.504-217.130667 138.24 0 253.568 91.306667 293.290667 216.362667C728.917333 893.696 625.621333 938.666667 511.616 938.666667 398.037333 938.666667 295.125333 893.994667 218.666667 821.632z"  ></path>'+
        ''+
        '</symbol>'+
        ''+
        '<symbol id="icon-close" viewBox="0 0 1024 1024">'+
        ''+
        '<path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"  ></path>'+
        ''+
        '</symbol>'+
        ''+
        '<symbol id="icon-back" viewBox="0 0 1024 1024">'+
        ''+
        '<path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z"  ></path>'+
        ''+
        '</symbol>'+
        ''+
        '</svg>'
    var script = function() {
        var scripts = document.getElementsByTagName('script')
        return scripts[scripts.length - 1]
    }()
    var shouldInjectCss = script.getAttribute("data-injectcss")

    /**
     * document ready
     */
    var ready = function(fn){
        if(document.addEventListener){
            document.addEventListener("DOMContentLoaded",function(){
                document.removeEventListener("DOMContentLoaded",arguments.callee,false)
                fn()
            },false)
        }else if(document.attachEvent){
            IEContentLoaded (window, fn)
        }

        function IEContentLoaded (w, fn) {
            var d = w.document, done = false,
                // only fire once
                init = function () {
                    if (!done) {
                        done = true
                        fn()
                    }
                }
                // polling for no errors
                ;(function () {
                try {
                    // throws errors until after ondocumentready
                    d.documentElement.doScroll('left')
                } catch (e) {
                    setTimeout(arguments.callee, 50)
                    return
                }
                // no errors, fire

                init()
            })()
            // trying to always fire before onload
            d.onreadystatechange = function() {
                if (d.readyState == 'complete') {
                    d.onreadystatechange = null
                    init()
                }
            }
        }
    }

    /**
     * Insert el before target
     *
     * @param {Element} el
     * @param {Element} target
     */

    var before = function (el, target) {
        target.parentNode.insertBefore(el, target)
    }

    /**
     * Prepend el to target
     *
     * @param {Element} el
     * @param {Element} target
     */

    var prepend = function (el, target) {
        if (target.firstChild) {
            before(el, target.firstChild)
        } else {
            target.appendChild(el)
        }
    }

    function appendSvg(){
        var div,svg

        div = document.createElement('div')
        div.innerHTML = svgSprite
        svg = div.getElementsByTagName('svg')[0]
        if (svg) {
            svg.setAttribute('aria-hidden', 'true')
            svg.style.position = 'absolute'
            svg.style.width = 0
            svg.style.height = 0
            svg.style.overflow = 'hidden'
            prepend(svg,document.body)
        }
    }

    if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
        window.__iconfont__svg__cssinject__ = true
        try{
            document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
        }catch(e){
            console && console.log(e)
        }
    }

    ready(appendSvg)


})(window)
