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

    var $wrap, $contents, $cover, $coverIn;

    var $bgs, bgs = [], $bgBlackPlane, $sentences,$sentBlackPlane,$sent1,$sent1In,$sent1Img;

    function init(){
        $wrap           = $('#wrap');
        $contents       = makeEasyObj($('#contents'));

        $bgs            = makeEasyObj($('#bgs'));
        $sentences      = makeEasyObj($('#sentences'));
        $sent1          = makeEasyObj($('#sent1'));
        $sent1In        = makeEasyObj($('#sent1-in'));
        $sent1Img       = makeEasyObj($('#sent1-img'));

        $cover          = makeEasyObj($('#cover-wrap'));
        $coverIn        = makeEasyObj($('#cover-wrap-in'));
        $bgBlackPlane   = makeEasyObj($('#bgs .black-bg'));
        $sentBlackPlane = makeEasyObj($('#sentences .black-bg'));

        $cover.obj.easymask({align:'T',width:'100%', height:'100%'},0);


        $contents.setTransition(.7,$.cssEase.easeInOutHeo2);
        $sentences.setTransition(.7,$.cssEase.easeInOutHeo2);
        $sent1.setTransition(.75,$.cssEase.easeInOutHeo2);
        $sentBlackPlane.setTransition(.7,$.cssEase.easeInOutHeo2);
        $bgs.setTransition(.7,$.cssEase.easeInOutHeo2);
        $bgBlackPlane.setTransition(.7,$.cssEase.easeInOutHeo2);
        $cover.setTransition(.7,$.cssEase.easeInOutHeo2);
        $coverIn.setTransition(1,$.cssEase.easeInOutHeo2);

        bgs = $bgs.obj.find('img').changeToCanvas();
        bgWraps = [];
        for(var o in bgs){
            bgs[o] = makeEasyObj(bgs[o]).autoResize(true);
            bgs[o].setTransition(.8,$.cssEase.easeInOutHeo2);
            // $bgs.obj.prepend(bgs[o].obj);
            bgWraps[o] = makeEasyObj(bgs[o].parent);
            bgWraps[o].setTransition(.7,$.cssEase.easeInOutHeo2);

            if(o==0){
                // bgWraps[o].obj.easymask({align:'B',width:'100%', height:'100%'},0);
            }else{
                bgs[o].hidden(true);
                // bgWraps[o].obj.easymask({align:'B',width:'100%', height:'0%'},0);
            }
        }
        reset();
    }


/* ************************************************************
    RESET
************************************************************ */
    function reset(){
        bgs[0].scaleChange(1.3);
        $sentBlackPlane.obj.css({right:'-50%'});
        $sent1.obj.css({right:'-50%'});
    }
/* ******************************************************************************************
    SETUP    
****************************************************************************************** */
    var scenes,skipFlg = false;
    function setup(){
        scroll = new Scroll({
            target      : '#wrap',
            speed       : 0.6,
            friction    : 0.94,
            touchSpeed  : 5,
            scrollLimit : 50,
            type        : 'wheel',
            screenFix   : true,
            stats       : false,
            step        : onScroll
        });


        scenes = new Scenes({stats:1});
        $(scenes).bind(scenes.EVENT_DELETE_SCROLL, onScrollDelete);

        scenes.addScene( 0,1000,'quick', {ease:'swing', duration:1000});
        scenes.addScene( 1,1000,'quick', {ease:'swing', duration:1000});
        scenes.addScene( 2,1000,'quick', {ease:'swing', duration:1000});
        scenes.addScene( 3,1000,'quick', {ease:'swing', duration:1000});
        scenes.addScene( 4,1000,'quick', {ease:'swing', duration:1000});
        scenes.addScene( 5,1000,'quick', {ease:'swing', duration:1000});
        scenes.addScene( 6,1000,'quick', {ease:'swing', duration:1000});
        scenes.addScene( 7,1000,'normal');
        scenes.addScene( 8,1000,'quick', {ease:'swing', duration:1000});
        scenes.addScene( 9,1000,'quick', {ease:'swing', duration:1000});


        scenes.addSceneFrameStartActor(1,function(direct){
            if(skipFlg)return;
            if(direct){
                var del = 0.1;
                bgs[0].moveVertical(-75,del);
                bgs[0].scaleChange(1,del);

                $cover.obj.easymask({align:'T',width:'100%',height:'0%'},0);
                $coverIn.moveVertical(100);
                $coverIn.scaleChange(1.1);

                TweenLite.set($bgBlackPlane.element,{height:0,delay:0});//,background:'rgba(255,255,0,0.8);'

                // $bgBlackPlane.obj.easymask({align:'T',width:'100%',height:'0%'},0).css({opacity:0.9});
                // $bgBlackPlane.moveVertical(-100);
            }
        });

        scenes.addSceneFrameEndActor(1,function(direct){
            if(skipFlg)return;
            if(!direct){
                var del = 0.1;
                bgs[0].moveVertical(0,del);
                bgs[0].scaleChange(1.3,del);

                $cover.obj.easymask({align:'T',width:'100%',height:'100%'},0);
                $coverIn.moveVertical(0);
                $coverIn.scaleChange(1);

                TweenLite.set($bgBlackPlane.element,{height:'100%',delay:0});//,background:'rgba(0,0,0,.8);'

                // $bgBlackPlane.obj.easymask({align:'T',width:'100%',height:'100%'},0);
                // TweenLite.to($bgBlackPlane,1,{height:'100%',ease:Power4.easeInOut});
                // $bgBlackPlane.moveVertical(0);
            }
        });

        scenes.addSceneFrameStartActor(2,function(direct){
            if(skipFlg)return;
            if(direct){
                borderToggle($contents.obj,true);
                bgs[0].scaleChange(1);
            }
        });

        scenes.addSceneFrameEndActor(2,function(direct){
            if(skipFlg)return;
            if(!direct){
                borderToggle($contents.obj,false);
            }
        });

        scenes.addSceneFrameStartActor(3,function(direct){
            if(skipFlg)return;
            if(direct){
                bgs[0].moveVertical(-50);
                bgs[1].moveVertical(-50);
                bgs[0].scaleChange(bgs[0].getFitScale());
                bgs[1].scaleChange(bgs[1].getFitScale());
            }
        });

        scenes.addSceneFrameEndActor(3,function(direct){
            if(skipFlg)return;
            if(!direct){
                bgs[0].moveVertical(-75);
                bgs[0].scaleChange(1);
            }
        });

        scenes.addSceneFrameStartActor(4,function(direct){
            if(skipFlg)return;
            if(direct){
                // bgWraps[1].obj.easymask({align:'B',width:'100%', height:'100%'},0);
                bgs[1].hidden(false);
            }else{
                // bgs[1].hidden(true);
            }
        });

        scenes.addSceneFrameEndActor(4,function(direct){
            if(skipFlg)return;
            if(!direct){
                // bgWraps[1].obj.easymask({align:'B',width:'100%', height:0},0);
            }
        });

        scenes.addSceneFrameStartActor(5,function(direct){
            if(skipFlg)return;
            if(direct){
                bgs[1].moveVertical(-80);
                bgs[1].scaleChange(1);
                borderToggle($contents.obj,false);
            }
        });

        scenes.addSceneFrameEndActor(5,function(direct){
            if(skipFlg)return;
            if(!direct){
                borderToggle($contents.obj,true);
                bgs[0].moveVertical(-50);
                bgs[1].moveVertical(-50);
                bgs[0].scaleChange(bgs[0].getFitScale());
                bgs[1].scaleChange(bgs[1].getFitScale());
            }
        });

        scenes.addSceneFrameStartActor(6,function(direct){
            if(skipFlg)return;
            if(direct){
                bgs[1].moveVertical(-140);
                bgs[1].scaleChange(2.5);
                borderToggle($contents.obj,true);
                borderToggle($contents.obj,true);

                TweenLite.set($sentBlackPlane.obj,{delay:0.2,right:0});
                TweenLite.set($sent1.obj,{delay:0.4,right:0});
            }
        });

        scenes.addSceneFrameEndActor(6,function(direct){
            if(skipFlg)return;
            if(!direct){
                var del = .25;
                bgs[1].moveVertical(-80,del);
                bgs[1].scaleChange(1,del);
                borderToggle($contents.obj,false,del);
                borderToggle($contents.obj,false,del);
                TweenLite.set($sentBlackPlane.obj,{delay:.1,right:'-50%'});
                TweenLite.set($sent1.obj,{delay:0,right:'-60%'});
            }
        });

        

        $('.sent1-area').each(function(i){
            sent1s.push({obj:$(this),paddingTop:0,paddingBottom:0});
        });

        scenes.addSceneFrameStartActor(7,function(direct){ isYoYo = direct?true:false; });
        scenes.addSceneActor(7,function(p){
            var obj = $sent1In.obj;
            var newP = this.timeRevision(0,this.frame.total,'jswing');

            scrollOffset += (scroll.offset-scrollOffset)*0.05;//Number(scroll.offset.toFixed(1));
            TweenLite.set(obj,{marginTop:-(obj.height()+$sent1Img.height()+140-$sent1.height())*newP}); 
            TweenLite.set($sent1Img.obj,{y:300-300*newP*newP*newP*newP});
        });

        scenes.addSceneFrameActor(7,300,0,function(p){
            if(p){
                bgs[1].scaleChange(3);
                bgs[1].paddingHorizon(-35);
                bgs[1].paddingVertical(-70);

                bgs[2].moveVertical(-80);
            }else{
                bgs[1].scaleChange(2.5);
                bgs[1].paddingHorizon(0);
                bgs[1].paddingVertical(0);
                bgs[2].hidden(true);
            }
        });

        scenes.addSceneFrameActor(7,800,0,function(p){
            if(p){
                TweenLite.set(bgs[2].obj,{opacity:1});
                bgs[2].hidden(false);
            }else{
                // bgs[2].hidden(true);
                TweenLite.set(bgs[1].obj,{opacity:1});
            }
        });

        scenes.addSceneFrameStartActor(8,function(direct){ 
            isYoYo = !direct?true:false; 
            if(direct){
                var del = .25;
                borderToggle($contents.obj,false,del);
                borderToggle($contents.obj,false,del);
                TweenLite.set($sentBlackPlane.obj,{delay:.1,right:'-50%'});
                TweenLite.set($sent1.obj,{delay:0,right:'-60%'})
                bgs[2].moveVertical(-100);
            }
        });

        scenes.addSceneFrameEndActor(8,function(direct){ 
            if(!direct){
                borderToggle($contents.obj,true);
                borderToggle($contents.obj,true);

                TweenLite.set($sentBlackPlane.obj,{delay:0.2,right:0});
                TweenLite.set($sent1.obj,{delay:0.4,right:0});

                bgs[2].moveVertical(-80,0.2);
            }
        });

        scenes.addSceneFrameStartActor(9,function(direct){ 
            if(direct){
                bgs[2].moveVertical(0);
                // bgs[2].scaleChange(1.5);
            }
        });

        scenes.addSceneFrameEndActor(9,function(direct){ 
            if(!direct){
                bgs[2].moveVertical(-100);
                // bgs[2].scaleChange(1);
            }
        });

    }
    var sent1s = [];
    function scene7SectYoYo(){
        for(var o in sent1s){
            var objs = sent1s[o];
            if(scrollOffset<0){
                objs.paddingBottom-=scrollOffset*50;
            }else if(scrollOffset>0){
                objs.paddingTop+=scrollOffset*50;
            }

            objs.paddingTop*=0.03;
            objs.paddingBottom*=0.03;
            
            objs.paddingTop = Number(objs.paddingTop.toFixed(2));
            objs.paddingBottom = Number(objs.paddingBottom.toFixed(2));

            objs.obj.css({paddingTop:objs.paddingBottom,paddingBottom:objs.paddingTop});
        }
    }



/* ******************************************************************************************
    CLASS
****************************************************************************************** */
    function borderToggle(obj,bool,delay){
        TweenLite.set(obj,{border:'solid '+ (bool?80:0) +'px transparent',delay:typeof delay != 'undefined'?delay:0});
        // console.log($bgs.obj);

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
            paddingX    : 0,
            paddingY    : 0,
            scale       : 1,
            position    : {perX:0,perY:0,padPerX:0,padPerY:0},
            flags       : {resize:false},
            hidden      : function(bool){
                bool?obj.hide():obj.show();
            },
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
                this.paddingHorizon();
                this.paddingVertical();

                var scale = this.scale;
                if(this.scale == this.getFitScale()){
                    scale = this.getFitScale();
                }
                this.scaleChange(scale); 
                
            },
            paddingHorizon : function(offset){
                if(typeof offset != 'undefined'){
                    this.position.padPerX = offset;
                }
                this.paddingX = this.position.padPerX*this.parent.width()*0.01;
                this.moveHorizon();
                
            },
            paddingVertical : function(offset){
                if(typeof offset != 'undefined'){
                    this.position.padPerY = offset;
                }
                this.paddingY = this.position.padPerY*this.parent.height()*0.01;
                this.moveVertical();
            },
            moveHorizon     : function(offset){
                if(typeof offset != 'undefined'){
                    this.position.perX = offset;
                }
                // var ratio = this.width()/this.parent.width(),
                //     w = (this.width()*this.position.perX/100)
                // this.x = w-w/ratio;
                // console.log(this.x);
                this.x = (this.width()-this.parent.width())*this.position.perX/100;
                this.x += this.paddingX;
                TweenLite.set(this.element,{x:this.x,delay:typeof delay != 'undefined'?delay:0});
            },
            moveVertical    : function(offset,delay){
                if(typeof offset != 'undefined'){
                    this.position.perY = offset;
                }
                // var ratio = this.height()/this.parent.height(),
                //     h = (this.height()*this.position.perY/100)
                // this.y = h-h/ratio;
                this.y = (this.height()-this.parent.height())*this.position.perY/100;
                this.y += this.paddingY;
                TweenLite.set(this.element,{y:this.y,delay:typeof delay != 'undefined'?delay:0});
            },
            scaleChange : function(offset,delay){
                if(typeof offset != 'undefined'){
                    this.scale = offset;
                }
                TweenLite.set(this.element,{scale:this.scale,delay:typeof delay != 'undefined'?delay:0});
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


/* ******************************************************************************************
    EVENT & EVENT HANDLER    
****************************************************************************************** */
    
    var scrollOffset = 0,isYoYo = false;
    function onScroll(p){
        var mnsFlg = MagazineNaviStatus();
        if(mnsFlg || skipFlg) return;
        if(scenes)scenes.update(scroll.offset,'');
        if(isYoYo){
            // scene7SectYoYo();
        }
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
            "-webkit-transition" : css,
            // "-moz-transition"    : css,
            // "-o-transition"      : css,
            // "-ms-transition"     : css,
            "transition"         : css
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
