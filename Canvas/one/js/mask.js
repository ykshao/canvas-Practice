(function(){

/* ******************************************************************************************
    LOADING
****************************************************************************************** */

    var mod, modCSSAnimations, modCSSTransforms, modCSSTransitions, modTouch, modAnim;
    var stage = WindowSize();

    $(document).ready(function(){
        mod = window.Modernizr;
        modCSSAnimations  = mod && mod.cssanimations;
        modCSSTransforms  = mod && mod.csstransforms;
        modCSSTransitions = mod && mod.csstransitions;
        modTouch          = mod && mod.touch;
        modAnim           = modCSSTransforms && modCSSTransitions;

        // init();
        // setup();
        // addEvent();
        // scenes.gotoScene(1,{duration:500, ease:'easeInOutQuint'});
    });

    lexusMagazineOnLoad = function(){
        init();
        setup();
    };

    lexusMagazineReady = function(){
        addEvent();
    };


/* ******************************************************************************************
    INITIALIZE    
****************************************************************************************** */

    var $wrap, $contents, $bgWrap;

    function init(){
        $wrap           = $('#wrap');
        $contents       = $('#contents');
        $bgWrap         = $('#bgWrap');

        var canvas = $wrap.find('img').changeToCanvas();
        canvas1 = canvas[0];
        canvas1.css({position:'relative',width:'100%'});
        
        // $('.bgWrap').easymask({align:"C",width:'80%',height:'80%'},0);
        $contents.css(cssTransition(.8,$.cssEase.easeInOutHeo2));
        $bgWrap.css(cssTransition(.8,$.cssEase.easeInOutHeo2));
        // canvas1.css(cssTransition(.8,$.cssEase.easeInOutHeo2));

        $bgWrap.easymask({align:"C",width:'100%',height:'100%'},0);
        var easeObj = makeEasyObj(canvas1).autoResize(true);
        easeObj.setTransition(.7,$.cssEase.easeInOutHeo2);

        var flag = 0;

        $('#btnWrap').find('.btn').each(function(i){
            var btn = $(this);
            btn.click(function(){
                var flag = btn.hasClass('on');
                if(flag)btn.removeClass('on');
                else btn.addClass('on');

                switch($(this).text()){
                    case 'mask'     : 
                            if(flag){
                                $bgWrap.easymask({align:"C",width:'100%',height:'100%'},0);
                            }else{
                                $bgWrap.easymask({align:"C",width:'80%',height:'80%'},0);
                            }
                            break;
                    case 'border'   : 
                            if(flag){
                                easeObj.scaleChange(1);
                                $contents.css({border:'solid 0px #fff'});
                            }else{
                                $contents.css({border:'solid 100px #fff'});
                                easeObj.scaleChange(easeObj.getFitScale());
                                easeObj.moveVertical(-50);
                            }
                            break;
                    case 'imgMove'  : 
                            if(flag){
                                easeObj.moveVertical(0);
                            }else{
                                easeObj.moveVertical(-80);
                            }
                            break;
                    case 'allView'  : 
                            if(flag){
                                easeObj.scaleChange(easeObj.getFitScale());
                                easeObj.moveVertical(-50);
                            }else{
                                easeObj.scaleChange(1);
                                easeObj.moveVertical(-50);
                            }
                            break;
                };
            });
        });
        
    }

    function makeEasyObj(obj,option){
        var $obj = $(obj);
        var _bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
        var newObj = {
            obj         : $obj,
            parent      : $obj.parent(),
            element     : $obj[0],
            duration    : 0,
            easing      : 'cubic-bezier(.215,.61,.355,1)',
            width       : function(){return $obj.width()},
            height      : function(){return $obj.height()},
            getFitScale : function(){return this.parent.height()/this.height()},
            setTransition : function(duration,easing){
                this.duration   = duration;
                this.easing     = easing;

                var css = this.duration +'s '+this.easing;
                this.obj.css({"-webkit-transition" : css, "transition" : css});
            },
            originX     : 0,
            originY     : 0,
            x           : 0,
            y           : 0,
            scale       : 1,
            position    : {x:0,y:0,perX:0,perY:0},
            flags       : {resize:false},
            autoResize  : function(bool){
                // if(this.flags.resize == bool)return;
                this.flags.resize = bool;
                var scope = this;
                if(bool){
                    $(window).bind('resize',scope.resize);
                }else{
                    $(window).unbind('resize',scope.resize);
                }

                return this;
            },
            resize      : function(){
                this.moveVertical();
                if(this.scale != 1){
                    this.scaleChange(this.getFitScale());
                }
            },
            moveHorizon     : function(offset){

            },
            moveVertical    : function(offset){
                if(typeof offset != 'undefined'){
                    this.position.perY      = offset;
                }
                this.y = (this.height()-this.parent.height())*this.position.perY/100;
                TweenLite.set(this.element,{y:this.y});
            },
            scaleChange : function(offset){
                if(typeof offset != 'undefined'){
                    this.scale = offset;
                }
                TweenLite.set(this.element,{scale:this.scale});
            },
            init : function(){
                TweenLite.set(this.element,{y:this.y,transformOrigin:'50% 50%'});
                this.autoResize(this.flags.resize);
                this.resize = _bind(this.resize,this);
                return this;
            }
        };

        return newObj.init();
    }

/* ************************************************************
    RESET
************************************************************ */
    function reset(){
    }
/* ******************************************************************************************
    SETUP    
****************************************************************************************** */
    var openingTime = 2;
    function setup(){
    }


/* ******************************************************************************************
    FUNCTION
****************************************************************************************** */



/* ******************************************************************************************
    EVENT & EVENT HANDLER    
****************************************************************************************** */

    function onScroll(p){
        var mnsFlg = MagazineNaviStatus();
        if(mnsFlg || skipFlg) return;
        if(scenes)scenes.update(scroll.offset,'');
    }

    function onScrollDelete(){
        if(scroll) scroll.stopRender();
    }

    function addEvent(){
        $(window).on('keydown', onKeydown);
        $(window).on('resize', onResize);
        $(window).trigger('resize');
        // $('.repeat-hit').on('click',function(){
        //     repeatMotion();
        // });
    }

    function onResize(){
        stage = WindowSize();
        // $('.bgWrap').easymask({align:"C",width:'80%',height:'80%'},0);
    }

    function onKeydown(e){
        switch(e.keyCode){
            case 38 : onKeyScrollControl(1); break;
            case 40 : onKeyScrollControl(-1); break;
        }
    }

    var keybordValue = UA.isMac?10:1;
    function onKeyScrollControl(delta){
        for(var i=0; i<10; i++){
            var del = delta*keybordValue;
            if(scroll)scroll.onWheel({},del, del, del);
        }
    }

    function WindowSize(){
        var size = { width:0, height:0, halfX:0, halfY:0};
        if (document.documentElement.clientHeight) {
            size.width  = document.documentElement.clientWidth;
            size.height = document.documentElement.clientHeight;
            size.halfX  = document.documentElement.clientWidth * 0.5;
            size.halfY  = document.documentElement.clientHeight * 0.5;
        } else if (document.body.clientHeight) {
            size.width  = document.body.clientWidth;
            size.height = document.body.clientHeight;
            size.halfX  = document.body.clientWidth * 0.5;
            size.halfY  = document.body.clientHeight * 0.5;
        } else if (window.innerHeight) {
            size.width  = window.innerWidth;
            size.height = window.innerHeight;
            size.halfX  = window.innerWidth * 0.5;
            size.halfY  = window.innerHeight * 0.5;
        }
        return size;
    }


    function cssTransition(duration,easing){
        var css = duration +'s '+easing;
        return {
            "-webkit-transition" : css, "transition" : css
        }
    }

    function transitionDR(duration){
        return {
            "-webkit-transition-duration" : duration+'s',
            "-moz-transition-duration"    : duration+'s',
            "-o-transition-duration"      : duration+'s',
            "-ms-transition-duration"     : duration+'s',
            "transition-duration"         : duration+'s'
        }
    }


/* ******************************************************************************************
    UTIL
****************************************************************************************** */




}).call(this);
