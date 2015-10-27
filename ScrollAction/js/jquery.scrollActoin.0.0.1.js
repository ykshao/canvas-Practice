(function(){
    if(!$.imgfitModernizr)$.imgfitModernizr=function(a,b,c){function y(a){i.cssText=a}function z(a,b){return y(l.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b){for(var d in a){var e=a[d];if(!B(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function D(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function E(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return A(b,"string")||A(b,"undefined")?C(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),D(e,b,c))}var d="2.8.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")};for(var F in p)x(p,F)&&(u=F.toLowerCase(),e[u]=p[F](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),h=j=null,e._version=d,e._prefixes=l,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return C([a])},e.testAllProps=E,e.testStyles=v,e}(this,this.document);
    var _bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
        if(!$.ScrollImgViewClass){
            $.ScrollImgViewClass = function(wrap,img,option){
                var root = this;
                this.parent = wrap.parent();
                this.wrap   = wrap;
                this.img    = img;

                this.config = {
                    showPoint : 0.2,
                    defaultClass : '',
                    activeClass  : '',
                    loop : true,
                    bgColor : ''
                };

                $.extend(this.config,option);
                $.extend(this.config,this.wrap.data());

                this.pointActors = [];

                this.stageSize = {};
                this.parentSize = {};
                this.wrapSize = {};

                this.progress = {crt:0,old:0};
                
                this.isInStage = false;
                this.isFirst = true;
                this.status = 'fadeOut';

                /* ************************************************************
                    Initialize
                ************************************************************ */

                function init(){
                    
                    this.wrap.addClass(this.config.defaultClass);
                    if(this.config.bgColor != '')this.wrap.css({backgroundColor:this.config.bgColor});

                    this.addPointActor(this.config.showPoint,function(p){
                        if(p)root.show();
                    });

                    this.addPointActor(1-this.config.showPoint,function(p){
                        if(!p)root.show();
                    });

                    this.onResize    = _bind(this.onResize,this);
                    this.onScroll    = _bind(this.onScroll,this);
                    addEvent.call(this);

                    return this;
                }

                function addEvent(){
                    $(window).bind('resize',this.onResize);
                    $(window).bind('scroll',$.throttle( 100, this.onScroll ));

                    setTimeout(function(){
                        root.sizeDefine();
                        root.checkStage();
                    },100)
                }

                this.reset = function(){

                }

                /* ************************************************************
                    Event Hnadler
                ************************************************************ */

                this.onResize = function(){
                    this.sizeDefine();
                    // this.wrap.css({width:this.img.width(),height:this.img.height()});
                    this.checkStage();
                }

                this.sizeDefine = function(){
                    this.parentSize.width = this.parent.width();
                    this.parentSize.height = this.parent.height();
                    this.wrapSize.width = this.wrap.width();
                    this.wrapSize.height = this.wrap.height();
                    this.wrapSize.innerHeight = this.wrap.innerHeight();
                    this.wrapSize.halfHeight = this.wrap.innerHeight()*0.5;
                    this.stageSize = WindowSize();
                }

                this.onScroll = function(){
                    this.checkStage();
                }


                /* ************************************************************
                    Check
                ************************************************************ */
                this.checkStage = function(){
                    if(!this.isFirst && !this.config.loop)return;

                    this.progress.crt = 1-(this.wrap.offset().top-$(window).scrollTop()+this.wrap.height())/(this.wrap.height()+this.stageSize.height);
                    this.pointActorCheck();   
                    if(this.progress.crt >= 0 && this.progress.crt <= 1){
                        this.isInStage = true;
                    }else{
                        this.isInStage = false;
                        this.hide();
                    } 

                    this.progress.old = this.progress.crt;
                }

                this.addPointActor = function(point,fn){
                    this.pointActors.push({point:point,passed:false,callBack:fn});
                }

                this.pointActorCheck = function(){
                    // if(this.progress.crt < 0 || this.progress.crt > 1)return;
                    if(!this.isInStage)return;
                    for(var o in this.pointActors){
                        var info = this.pointActors[o];

                        if(!info.passed && this.progress.crt >= info.point){
                            info.passed = true;
                            info.callBack(1);    
                        }

                        if(info.passed && this.progress.crt <= info.point){
                            info.passed = false;
                            info.callBack(0);
                        }
                    }
                }
                /* ************************************************************
                    Function
                ************************************************************ */

                this.show = function(){
                    if(this.status == 'fadeIn')return;
                    this.wrap.addClass(this.config.activeClass);
                    if(this.isFirst) this.isFirst = false;
                    this.status = 'fadeIn';
                    console.log(this.status);
                }

                this.hide = function(){
                    if(this.status == 'fadeOut')return;
                    this.wrap.removeClass(this.config.activeClass);
                    this.status = 'fadeOut';
                }

                init.call(this);
            };

            $.ScrollImgViewClass.prototype.constructor = $.ScrollImgViewClass;
        }

        function WindowSize(){
            var size = { width:0, height:0, halfX:0, halfY:0};
            if (document.documentElement.clientHeight) {
                size.width  = document.documentElement.clientWidth;
                size.height = document.documentElement.clientHeight;
            } else if (document.body.clientHeight) {
                size.width  = document.body.clientWidth;
                size.height = document.body.clientHeight;
            } else if (window.innerHeight) {
                size.width  = window.innerWidth;
                size.height = window.innerHeight;
            }
            size.halfX  = size.width * 0.5;
            size.halfY  = size.height * 0.5;
            return size;
        }

        jQuery.fn.scrollImgView = function(option){
            var selector = this.selector,
                classArr = [];
            $(selector).each(function(i){
                var wrap = $(this),
                    img  = wrap.find('img'),
                    data = $.data(img.get(0));

                if(!data.scrollImgView){
                    data.scrollImgView = new $.ScrollImgViewClass(wrap,img,option);
                }else{
                    data.scrollImgView.reset(option);
                }
                classArr[i] = data.scrollImgView;
            });

            if(classArr.length == 1){
                return classArr[0];
            }else{
                return classArr;
            }
        }
}).call(this);


/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);