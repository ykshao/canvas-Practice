/**
 * 2013.10.
 * Scenes ver 0.01
 * Author : Heonwongeun
 * FaceBook : https://www.facebook.com/heo.wongeun
 */

(function(){
    function type(obj){return typeof obj};
    // function dispach(obj,handler,data){obj.trigger(handler,data)};
    var Canvas = function(canvasWrap,id,width,height){
        this.EVENT_CHANGE = 'canvas_handler';

        var root = this,
            id,wrap,$cvs,cvs,ctx,size,status,info,stopTimer,event_info = {};

        /* ************************************************************
            private function
        ************************************************************ */
        
        function init(){
            status  = 'loading';
            wrap    = $(canvasWrap);
            if( type(canvasWrap) == 'undefined' || type(wrap[0]) == 'undefined' || canvasWrap.indexOf('.') > -1 || !Modernizr.canvas){
                status = 'error';
                event_info.type = status;
                eventDispatch();
                return;
            }

            // size init
            size = {};
            size.width = typeof width == "undefined"?640:width;
            size.height = typeof height == "undefined"?480:height;

            // create cavas
            $cvs = $('<canvas id="'+id+'" width="'+size.width+'" height="'+size.height+'"></canvas>');
            $cvs.appendTo(wrap);
            cvs = $cvs[0];
            ctx = cvs.getContext("2d");

            //infomation
            info = {};
            info.$cvs = $cvs;
            info.cvs = cvs;
            info.ctx = ctx;
            infoUpadte();

            setTimeout(function(){
                status = "ready";
                event_info.type = status;
                eventDispatch();
            },0);
            
        };

        function eventDispatch(){
            $(root).trigger(root.EVENT_CHANGE,event_info);
        }
        function infoUpadte(){
            info.canvasWidth  = size.width;
            info.canvasHeight = size.height;
        }

        function rendering(){
            info.renderID = requestAnimationFrame(rendering);
            root.draw(ctx);

            for(var o in drawList){
                drawList[o].draw();
            }
        }


        /* ************************************************************
            public function
        ************************************************************ */
        this.start = function(){
            if(stopTimer){
                clearTimeout(stopTimer);
                stopTimer = null;
            }
            cancelAnimationFrame(info.renderID);
            info.renderID = requestAnimationFrame(rendering);
        };
        this.stop = function(delay){
            if(delay == 0 || !delay){
                cancelAnimationFrame(info.renderID);
            }else{
                stopTimer = setTimeout(function(){
                    cancelAnimationFrame(info.renderID);
                    stopTimer = null;    
                },delay);
            }
        };

        this.draw = function(){
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.01)';
            ctx.fillRect(0,0,size.width,size.height);
            ctx.restore();
        }

        /* ************************************************************
            add DrawList
        ************************************************************ */
        var drawList = {};
        this.addDrawList = function(name,effctClass){
            drawList[name] = effctClass;
        }

        /* ************************************************************
            
        ************************************************************ */

        this.getImageData = function(rect,original){
            var rectangle = {x:0,y:0,width:cvs.width,height:cvs.height};
            $.extend(rectangle,rect);
            var imgData = ctx.getImageData(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

            if(original){
                return imgData;
            }else{
                var length  = imgData.width * imgData.height,
                newData = {data:[],legnth:length};

                for(var i = 0 ;i < length; i++) {  
                    var r = imgData.data[i*4],
                        g = imgData.data[i*4+1],
                        b = imgData.data[i*4+2],
                        a = imgData.data[i*4+3];

                        var x = (i)%imgData.width+rectangle.x,
                            y = Math.floor(i/imgData.width)+rectangle.y;
                        if(typeof newData.data[x] == 'undefined')newData.data[x] = [];
                        newData.data[x][y] = {x:x,y:y,r:r,g:g,b:b,a:Number((a/255).toFixed(2))};
                        // newData.data.push({x:x,y:y,r:r,g:g,b:b,a:Number((a/255).toFixed(2))});

                    if(i==length-1){
                        return newData;
                    }
                };
            }
            

            // return imgData;
        }

        this.clear = function(){
            ctx.save();
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.restore();
        }

        this.drawImage = function(img,x,y){
            ctx.drawImage(img,x,y);
        }

        this.getColorPixel = function(imgData){
            var data    = imgData,
                length  = imgData.width * imgData.height,
                imgDatas = [];

            for (var i = 0 ;i < length; i++) {  
                var r = data.data[i*4],
                    g = data.data[i*4+1],
                    b = data.data[i*4+2],
                    a = data.data[i*4+3];

                // if(r != 0 && g != 0 && b != 0){
                    var x = parseInt((i-1)%imgData.width),
                        y = Math.floor((i-1)/imgData.height/(imgData.width/imgData.height));

                    if(typeof imgDatas[x] == 'undefined')imgDatas[x] = [];
                    // imgDatas[x][y] = {x:x,y:y,r:r,g:g,b:b,a:Number((a/255).toFixed(2))};
                    imgDatas.push({x:x,y:y,r:r,g:g,b:b,a:Number((a/255).toFixed(2))});
                // }

                if(i==length-1){
                    return imgDatas;
                }
            };
        };



        this.getCanvas  = function(){ return cvs };
        this.getContext = function(){ return ctx };
        this.getStatus  = function(){ return status };
        this.getInfo    = function(){ return info };
        this.getSize    = function(){ return size };

        this.setSize = function(){};

        init();

        return this;
    }
    

    /* ************************************************************
        Rendering Animation
    ************************************************************ */
    
    Canvas.prototype.constructor = Canvas;
    this.Canvas = Canvas;

    return this;
}).call();


// Modernizr.canvas
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-backgroundsize-cssanimations-csstransforms-csstransforms3d-csstransitions-canvas-touch-shiv-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.backgroundsize=function(){return F("backgroundSize")},q.cssanimations=function(){return F("animationName")},q.csstransforms=function(){return!!F("transform")},q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {var lastTime = 0; var vendors = ['ms', 'moz', 'webkit', 'o']; for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']; window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame']; } if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {var currTime = new Date().getTime(); var timeToCall = Math.max(0, 16 - (currTime - lastTime)); var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall); lastTime = currTime + timeToCall; return id; }; if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {clearTimeout(id); }; }());




    /*
     HTMLCanvasElement

        toDataURL()
        getContext()

     メソッド
        addColorStop()
        arc()
        arcTo()
        beginPath()
        bezierCurveTo()
        clearRect()
        clip()
        closePath()
        createImageData()
        createLinearGradient()
        createPattern()
        createRadialGradient()
        drawFocusRing()
        drawImage()
        fill()
        fillRect()
        fillText()
        getImageData()
        isPointInPath()
        lineTo()
        measureText()
        moveTo()
        putImageData()
        quadraticCurveTo()
        rect()
        restore()
        rotate()
        save()
        scale()
        setTransform()
        stroke()
        strokeRect()
        strokeText()
        translate()
        transform()

    プロパティ
        fillStyle
        font
        globalAlpha
        globalCompositeOperation
        lineCap
        lineJoin
        miterLimit
        lineWidth
        shadowBlur
        shadowColor
        shadowOffsetX
        shadowOffsetY
        strokeStyle
        textAlign
        textBaseline
     */

    
    
  
   






