(function(){
/* ******************************************************************************************
    LOADING
****************************************************************************************** */

    lexusMagazineOnLoad = function(){ // loading complete
        init();
    };

    lexusMagazineReady = function(){ // loading complete after stage view
        setup();
        addEvent();
        display($scene1Content,0);
        display($scene2Content,0);
        display($scene3Content,0);
    };

    var mod,modCSSAnimations,modCSSTransforms,modCSSTransitions,modTouch,modAnim;

    $(document).ready(function(){
        mod = window.Modernizr;
        modCSSAnimations  = mod && mod.cssanimations;
        modCSSTransforms  = mod && mod.csstransforms;
        modCSSTransitions = mod && mod.csstransitions;
        modTouch          = mod && mod.touch;
        modAnim           = modCSSTransforms && modCSSTransitions;
    });

/* ******************************************************************************************
    Initialize    
****************************************************************************************** */
    var cloud,line;
    var limitZ          = {min:0,max:3000},
        cloudeOffset    = { p:0, z : limitZ.max};
    
    var $contents,$wrap,
        $coverWrap,$coverAsset,$coverShape,$coverShapeWrap,$creditWrap

    var $scene1,$scene2;

    var stage       = WindowSize();
    var scenes      = {};

    var coverShapeWrapScale = 1.5
    var $scene1Content,
        scene1Contents          = [],
        scene1ContentsZoom      = 300;
        scene1ContentsZoomDur   = 0.5;
        scene1ContentsZoomRotY  = -30;

    var $scene2Content,
        scene2Contents          = [],
        scene2ContentsZoom      = 300;
        scene2ContentsZoomDur   = 0.6;
        scene2ContentsZoomRotY  = -30;

    var $scene3Content,
        scene3Contents          = [],
        scene3ContentsZoom      = 300;
        scene3ContentsZoomDur   = 0.6;
        scene3ContentsZoomRotY  = -30;





    function init(){
        $contents   = $('#contents');
        $wrap       = $('#wrap');
        $coverWrap  = $('#cover-wrap');
        $coverAsset = $('.cover-assets').css({opacity:0});
        $coverShape = $('#cover-shape').css({opacity:0});
        $coverShapeWrap = $('#cover-shape-wrap');
        $scene1     = $('#scene1');
        $scene2     = $('#scene2');
        $scene3     = $('#scene3');
        $creditWrap = $('#credit-wrap');
        display($creditWrap,0);
        
        $scene1.find('.bg').imgfit({canvasMode:true,align:'t',lockTop:true});
        // $scene1.find('.bg-blur-y').imgfit({canvasMode:true,align:'t',lockTop:true});
        // $scene1.find('.bg-blur-z').imgfit({canvasMode:true,align:'t',lockTop:true});

        $scene2.find('.bg').imgfit({canvasMode:true,align:'t',lockTop:true});
        // $scene2.find('.bg-blur-y').imgfit({canvasMode:true,align:'t',lockTop:true});
        // $scene2.find('.bg-blur-z').imgfit({canvasMode:true,align:'t',lockTop:true});

        $scene3.find('.bg').imgfit({canvasMode:true,align:'t',lockTop:true});
        // $scene3.find('.bg-blur-y').imgfit({canvasMode:true,align:'t',lockTop:true});
        // $scene3.find('.bg-blur-z').imgfit({canvasMode:true,align:'t',lockTop:true});

        $scene1Content = $('#scene1-content').css({opacity:1});
        $scene2Content = $('#scene2-content').css({opacity:1});
        $scene3Content = $('#scene3-content').css({opacity:1});
        $scene1Content.find('.grid-box').each(function(i){
            scene1Contents[i] = $(this);
        });

        $scene2Content.find('.grid-box').each(function(i){
            scene2Contents[i] = $(this);
        });

        $scene3Content.find('.grid-box').each(function(i){
            scene3Contents[i] = $(this);
        });

        visibility($scene2,0);
        visibility($scene3,0);

        scenes.s1 = { 
            scene           : $scene1,
            content         : $scene1Content,
            obj             : $scene1.find('canvas').eq(0),
            obj2            : $scene1.find('canvas').eq(1).css({opacity:0}), 
            blurZ           : $scene1.find('canvas').eq(2).css({opacity:0}),
            // blurY           : $scene1.find('canvas').eq(1).css({opacity:0}), 
            // blurZ           : $scene1.find('canvas').eq(2).css({opacity:0}), 
            contents        : scene1Contents,
            zoom            : 300,
            zoomDur         : 0.4,
            rotY            : -30,
            blurOn          : blurOn, 
            duration        : setDuration, 
            ease            : setEase, 
            top             : 0, 
            originY         : 10, 
            perWidth        : 130,
            width           : 2490, 
            height          : 2678, 
            ratio           : getRatio, 
            reset           : resetPos, 
            update          : function(){this.reset(0,this.originY)} 
        };

        scenes.s2 = { 
            scene       : $scene2,
            content     : $scene2Content,
            obj         : $scene2.find('canvas').eq(0), 
            obj2        : $scene2.find('canvas').eq(1).css({opacity:0}),
            // blurY       : $scene2.find('canvas').eq(1).css({opacity:0}), 
            // blurZ       : $scene2.find('canvas').eq(2).css({opacity:0}), 
            zoom        : 300,
            zoomDur     : 0.4,
            rotY        : -30,
            contents    : scene2Contents,
            blurOn      : blurOn, 
            duration    : setDuration, 
            ease        : setEase, 
            top         : 0, 
            originY     : 100, 
            perWidth    : 130,
            width       : 2490, 
            height      : 2678, 
            ratio       : getRatio, 
            reset       : resetPos, 
            update      : function(){this.reset(0,this.originY)} 
        };

        scenes.s3 = { 
            scene       : $scene3,
            content     : $scene3Content,
            obj         : $scene3.find('canvas').eq(0),
            obj2        : $scene3.find('canvas').eq(1).css({opacity:0}),
            // blurY       : $scene3.find('canvas').eq(1).css({opacity:0}), 
            // blurZ       : $scene3.find('canvas').eq(2).css({opacity:0}), 
            zoom        : 300,
            zoomDur     : 0.4,
            rotY        : -30,
            contents    : scene3Contents,
            blurOn      : blurOn, 
            duration    : setDuration, 
            ease        : setEase, 
            top         : 0, 
            originY     : 100, 
            perWidth    : 110,
            width       : 2490, 
            height      : 2529, 
            ratio       : getRatio, 
            reset       : resetPos, 
            update      : function(){this.reset(0,this.originY)} 
        };


        scenes.s1.update();
        scenes.s2.update();
        scenes.s3.update();

        // scenes.s1.reset(0,-85);

        // visibility(scenes.s1.blurY,0);
        // visibility(scenes.s1.blurZ,0);


        var canvas  = $('<canvas width="'+stage.width+'" height="'+stage.height+'">').css({position:'absolute'}).appendTo(cloudContainer);
        var ctx     = canvas[0].getContext( '2d' );

        cloud = new Cloud(ctx);
        cloud.camera.position.z = cloudeOffset.z;
        cloud.camera.zoomLimit = limitZ.max/1000;
        cloud.update();

        // line = new Lines(ctx);


        renderID = requestAnimationFrame(render);
        TweenLite.to($coverShapeWrap,0,{scale:1});
        TweenLite.set($contents,{transformOrigin:"50% 50%",transformPerspective:1000});
        TweenLite.set($contents,{transformOrigin:"50% 50%",perspective:1000});

        scenes.s1.reset(0,-10);
        scenes.s1.duration(0);
        scenes.s1.ease(0,$.cssEase.easeInOutMove);

        scenes.s2.reset(0,0);
        scenes.s2.duration(0);
        scenes.s2.ease(0,$.cssEase.bgMove);

        scenes.s3.reset(0,0);
        scenes.s3.duration(0);
        scenes.s3.ease(0,$.cssEase.bgMove);

        $scene1.css(cssTransition(scene1ContentsZoomDur,$.cssEase.easeInOutZoom));
        $scene2.css(cssTransition(scene2ContentsZoomDur,$.cssEase.easeInOutZoom));
        $scene3.css(cssTransition(scene3ContentsZoomDur,$.cssEase.easeInOutZoom));
        
        $('.grid-box').each(function(i){
            var box = $(this).css({opacity:1}),
                data = box.data();
                // w       = (data.width*stage.width)*0.01,
                // h       = (data.height*stage.height)*0.01;

            // box.css({
            //     left    : data.left+'%',
            //     top     : data.top+'%',
            //     // width   : data.width+'%',
            //     // height  : data.height+'%'

            //     width   : w+'px',
            //     height  : h+'px'
            // });

            // var p = box.find('p');
            // if(p[0])p.css({ top:(h-p.height())*0.5 });

            var css = { left:-data.width+'%', top : data.top+'%',rotationY:scene1ContentsZoomRotY, z:scene1ContentsZoom};
            if(data.left>=50){
                css.left=100+'%';
                css.rotationY=-scene1ContentsZoomRotY;
            }

            TweenLite.set(box,{transformOrigin:data.left>=50?50:100+"% 50%"});
            TweenLite.to(box,0,css);

            box.css(cssTransition(scene1ContentsZoomDur,$.cssEase.easeInOutZoom));
        });

        
        $scene1Content.find('.fitimg').each(function(){
            $(this).imgfit({canvasMode:true,align:$(this).data.align});
        });

        $scene2Content.find('.fitimg').each(function(){
            $(this).imgfit({canvasMode:true,align:$(this).data.align});
        });

        
        $scene3Content.find('.fitimg').each(function(i){
            $(this).imgfit({canvasMode:true,align:$(this).data.align});
        });


        gridboxResize();
        transitionSet();

        onScroll(0);
        cloudMove(0);
    }

    function getRatio(){
        return (this.height/this.width).toFixed(2);
    }

    function resetPos(orignX,originY){
        var parent          = this.obj.parent().parent();
        this.originY        = originY;
        this.crtWidth       = parent.width() * this.perWidth / 100;
        this.crtHeight      = this.crtWidth * this.ratio();
        this.spareHeight    = parent.height()-this.crtHeight;
        this.top            = -(this.spareHeight*originY/100).toFixed(0);
        this.obj.css({top:this.top});
        
        if(this.obj2)this.obj2.css({top:this.top});
        if(this.blurZ)this.blurZ.css({top:this.top});
    }

    function setEase(dur,ease){
        this.obj.css(cssTransition(dur,ease));
        if(this.obj2)this.obj2.css(cssTransition(dur,ease));
        if(this.blurZ)this.blurZ.css(cssTransition(dur,ease));
        // this.blurY.css(cssTransition(dur,ease));
        // this.blurZ.css(cssTransition(dur,ease));
    }
    function setDuration(duration){
        this.obj.css(transitionDR(duration));
        if(this.obj2)this.obj2.css(transitionDR(duration));
        if(this.blurZ)this.blurZ.css(transitionDR(duration));
        // this.blurY.css(transitionDR(duration));
        // this.blurZ.css(transitionDR(duration));
    }

    function blurOn(type){
        var blurs = {x:this.blurX,y:this.blurY,z:this.blurZ};
        for(var o in blurs){
            if(o == type){
                if(blurs[o]){
                    var blur = blurs[o];
                    // visibility(blur,1);
                    TweenLite.to(blur,0.6,{opacity:1,onComplete:function(){
                        TweenLite.to(blur,0.2,{opacity:0,delay:0,ease:Quint.Out,onComplete:function(){
                            // visibility(blur,0);
                        }});
                    }});
                }
            }else{
            }
        }
    }
    function transitionSet(){
    }

/* ******************************************************************************************
    SETUP    
****************************************************************************************** */
    var renderID;
    var scroll,scrollPossible = false;
    var sceneM;
    function setup(){
        sceneM = new Scenes({stats:1});
        $(sceneM).bind(sceneM.EVENT_DELETE_SCROLL, scrollDel);
        sceneSetup();

        scroll = new Scroll({
            target      : 'body',
            speed       : 2,
            stats       : 0,
            friction    : 0.94,
            touchSpeed  : 5,
            scrollLimit : 10,
            type        : 'wheel',
            screenFix   : true,
            step        : onScroll
        });

        TweenLite.to($coverShape,2,{opacity:1});
        TweenLite.to($coverShapeWrap,1,{scale:coverShapeWrapScale});
        TweenLite.to(cloudeOffset,5,{p:1,ease:Expo.easeInOut,onUpdate:onUpdate,onComplete:onComplete});
        // sceneM.gotoScene(1,{duration:5000,ease:'easeOutBack'});
    }

    function onComplete(){
        scrollPossible = true;
        sceneM.gotoScene(1,{duration:0});
    }

    function onUpdate(){
        cloudMove(cloudeOffset.p);
    }

    
    var render = function(){
        renderID = requestAnimationFrame(render);
        cloud.update();
        // if(line)line.update();
    }

    function cloudMove(progress){
        cloudeOffset.z              = (1-progress)*limitZ.max;
        // cloudeOffset.scene1Top      = 40-60*progress*progress;
        cloudeOffset.scene1Alpha    = progress*progress*progress;
        cloud.camera.position.z     = cloudeOffset.z;
        TweenLite.to($contents,0,{top:50-50*progress+'%',z:-cloudeOffset.z*0.2,opacity:progress*progress*progress});

        var newP;
        if(progress >= 0.9)newP = (1-progress)/0.1;
        else newP = 1;

        TweenLite.to($coverShapeWrap,0,{scale:coverShapeWrapScale+(-progress)*0.5});
        $coverWrap.css({top:(35-progress*25)+'%'});
        $coverAsset.each(function(i){
            $(this).css({opacity:1-newP});
        });
    }

    function cloudMove2(progress){
        cloudeOffset.z              = progress*limitZ.max;
        cloud.camera.position.z     = cloudeOffset.z;
        TweenLite.to($contents,0,{top:100*progress+'%',z:-cloudeOffset.z*0.2,opacity:1-progress});
    }

    function cloudMove3(type,duration){
        var offset = {p:type=="up"?0:1};
        TweenLite.to(offset,duration,{p:1-offset.p,ease:Expo.easeInOut,onUpdate:function(){
            cloudeOffset.z              = offset.p*limitZ.max;
            cloud.camera.position.z     = cloudeOffset.z;
            // cloud.camera.position.x     += offset.p*100;
            cloudeOffset.z              = offset.p*limitZ.max;
            TweenLite.to($contents,0,{top:100*offset.p+'%',z:-cloudeOffset.z*0.2,opacity:1-offset.p});
        }});

        
    }


    function valueAdjust(value,offset,min,max,sp){
        value += offset;
        if(value < min)value += (min-value)*sp;
        if(value > max)value += (max-value)*sp;
        return value;
    }
/* ******************************************************************************************
    FUNCTION
****************************************************************************************** */
    var sceneMoveDuration = 2;
    function sceneSetup(){
        sceneM.addScene(0,1000,'normal',{ease:'easeInOutBack',duration:5000});//intro
        sceneM.addScene(1,1000,'quick',{ease:'swing',duration:1300});

        sceneM.addScene(2,1000,'quick',{ease:'swing',duration:1300});
        sceneM.addScene(3,1000,'quick',{ease:'swing',duration:sceneMoveDuration*1000});
        sceneM.addScene(4,1000,'quick',{ease:'swing',duration:sceneMoveDuration*1000,jump:{next:5,prev:3}});
        sceneM.addScene(5,1000,'quick',{ease:'swing',duration:1300});
        sceneM.addScene(6,1000,'quick',{ease:'swing',duration:sceneMoveDuration*1000});
        sceneM.addScene(7,1000,'quick',{ease:'swing',duration:sceneMoveDuration*1000,jump:{next:8,prev:6}});
        sceneM.addScene(8,1000,'quick',{ease:'swing',duration:1300});
        sceneM.addScene(9,1000,'quick',{ease:'swing',duration:sceneMoveDuration*1000});
        sceneM.addScene(10,1000,'quick',{ease:'swing',duration:sceneMoveDuration*1000,jump:{next:11,prev:9}});
        sceneM.addScene(11,1000,'quick',{ease:'swing',duration:1300});

        // sceneM.addScene(3,1000,'normal',{ease:'easeInOutBack',duration:1200});

        sceneM.addSceneActor(0,function(p){
            cloudMove(this.timeRevision(p,1000,'easeInOutQuart'));
        });

        sceneM.addSceneFrameStartActor(1,function(p){

        });

        sceneM.addSceneFrameStartActor(1,function(p){
            if(p){
                scenes.s1.duration(.5);
                scenes.s1.reset(0,-85);
                TweenLite.to($coverWrap,.5,{scale:1.5, opacity:0, ease:Quint.easeInOut,onComplete:function(){
                    // display($coverWrap,0);
                }});
                // TweenLite.to(scenes.s1.obj2,0,{opacity:1});
                setTimeout(function(){
                    scenes.s1.obj2.css({opacity:1});
                    // scenes.s1.blurOn('z');
                },800);
            }else{

            }
        });

        sceneM.addSceneFrameEndActor(1,function(p){
            if(!p){
                scenes.s1.duration(.5);
                scenes.s1.reset(0,-10);
                // display($coverWrap,1);
                TweenLite.to($coverWrap,.5,{scale:1, opacity:1, ease:Quint.easeInOut,onComplete:function(){

                }});

                setTimeout(function(){
                    scenes.s1.obj2.css({opacity:0});
                },600);
            }else{
                // line.lineMove1();
                // console.log(scenes.s1.obj2);
                
            }
        });

        // contents view
        sceneM.addSceneFrameStartActor(2,function(p){
            if(p)contentViewToggle(scenes.s1,true);
        });

        sceneM.addSceneFrameEndActor(2,function(p){
            if(!p)contentViewToggle(scenes.s1,false);
        });

        // scene Move
        sceneM.addSceneFrameStartActor(3,function(p){
            if(p){
                contentViewToggle(scenes.s1,false);
                cloudMove3('up',sceneMoveDuration);
                sceneFade(scenes.s1,100,1,　600);
            }
        });


        sceneM.addSceneFrameEndActor(3,function(p){
            if(!p){
                visibility($scene1,1);
                visibility($scene2,0);
                cloudMove3('down',sceneMoveDuration);

                setTimeout(function(){contentViewToggle(scenes.s1,true)},sceneMoveDuration*1000-500);
                sceneFade(scenes.s1,-80,1,　600);
            }else{
                visibility($scene1,0);
                visibility($scene2,1);
                setTimeout(function(){scenes.s2.duration(.5);scenes.s2.reset(0,-90)},1000);

                // setTimeout(function(){
                scenes.s2.obj2.css({opacity:0});
                // },1500);
            }
        });

        sceneM.addSceneFrameStartActor(4,function(p){
            if(p){
                cloudMove3('down',sceneMoveDuration);
                setTimeout(function(){
                    scenes.s2.obj2.css({opacity:1});
                },1500);
            }
        });

        sceneM.addSceneFrameEndActor(4,function(p){
            if(!p){
                var dur = 1;
                cloudMove3('up',sceneMoveDuration);
                sceneFade(scenes.s2,100,1,　600);
            }
        });


        // contents view
        sceneM.addSceneFrameStartActor(5,function(p){
            if(p)contentViewToggle(scenes.s2,true);
        });

        sceneM.addSceneFrameEndActor(5,function(p){
            if(!p)contentViewToggle(scenes.s2,false);
        });


        // scene move
        sceneM.addSceneFrameStartActor(6,function(p){
            if(p){
                contentViewToggle(scenes.s2,false);
                cloudMove3('up',sceneMoveDuration);
                sceneFade(scenes.s2,100,1,　600);
            }
        });

        sceneM.addSceneFrameEndActor(6,function(p){
            if(!p){
                visibility($scene2,1);
                visibility($scene3,0);
                cloudMove3('down',sceneMoveDuration);
                setTimeout(function(){contentViewToggle(scenes.s2,true)},sceneMoveDuration*1000-500);
                sceneFade(scenes.s2,-90,1,　600);
            }else{
                visibility($scene2,0);
                visibility($scene3,1);
                sceneFade(scenes.s3,-95,1,　600);
                scenes.s3.obj2.css({opacity:0});
            }
        });

        sceneM.addSceneFrameStartActor(7,function(p){
            if(p){
                cloudMove3('down',sceneMoveDuration);
                setTimeout(function(){
                    scenes.s3.obj2.css({opacity:1});
                },1500);
            }
        });

        sceneM.addSceneFrameEndActor(7,function(p){
            if(!p){
                var dur = 1;
                cloudMove3('up',sceneMoveDuration);
                sceneFade(scenes.s3,100,1,　600);
            }
        });

        // contents view
        sceneM.addSceneFrameStartActor(8,function(p){
            if(p)contentViewToggle(scenes.s3,true);
        });

        sceneM.addSceneFrameEndActor(8,function(p){
            if(!p)contentViewToggle(scenes.s3,false);
        });

        // scene move
        sceneM.addSceneFrameStartActor(9,function(p){
            if(p){
                contentViewToggle(scenes.s3,false);
                cloudMove3('up',sceneMoveDuration);
                sceneFade(scenes.s3,0,1,　600);
            }
        });

        sceneM.addSceneFrameEndActor(9,function(p){
            if(!p){
                setTimeout(function(){contentViewToggle(scenes.s3,true)},sceneMoveDuration*1000-500);
                cloudMove3('down',sceneMoveDuration);
                sceneFade(scenes.s3,-95,1,　600);
            }else{
                sceneFade(scenes.s3,-95,1,　600);
            }
        });

        sceneM.addSceneFrameStartActor(10,function(p){
            if(p){
                cloudMove3('down',sceneMoveDuration);
                display($creditWrap,1);                
                sceneFade(scenes.s3,0,1,　600);
            }else{
                display($creditWrap,0);
            }
        });

        sceneM.addSceneFrameEndActor(10,function(p){
            if(!p){
                cloudMove3('up',sceneMoveDuration);
                sceneFade(scenes.s3,-50,1,　600);
            }
        });


    }

    function sceneFade(scene,y,dur,delay){
        setTimeout(function(){
            scene.duration(dur);
            scene.reset(0,y);
        },delay);
    }


    var TRANSITION_END = 'transitionend'// msTransitionEnd webkitTransitionEnd';
    function contentViewToggle(contentsInfo,view){
        display(contentsInfo.content,1);
        TweenLite.to(contentsInfo.scene,0,{z:view?-contentsInfo.zoom:0,delay:view?0:0});

        setTimeout(function(){
            for(var o in contentsInfo.contents){
                var box     = contentsInfo.contents[o],
                    data    = box.data(),
                    css     = {left:data.left+'%',rotationY:0,z:0};

                if(!view){
                    css = {left:-data.width+'%',rotationY:contentsInfo.rotY,z:contentsInfo.zoom};
                    if(data.left >= 50){
                        css.left        = 100+'%';
                        css.rotationY   = -contentsInfo.rotY;
                    }
                }
                TweenLite.to(box,0,css);
            }

        },10)
        
        if(!view){
            setTimeout(function(){
                display(contentsInfo.content,0);
            },1000);
        }
    }
/* ******************************************************************************************
    EVENT & EVENT HANDLER    
****************************************************************************************** */
    function addEvent(){
        $(window).bind("resize",onResize);
        $(window).bind("keydown", onKeydown);
        $(window).trigger("resize");
    }

    function onResize(){
        stage = WindowSize();
        gridboxResize();   

        // $('.text-box p').each(function(){
        //     var parent = $(this).parent();
        // });

        scenes.s1.update();
        scenes.s2.update();
        scenes.s3.update();

    }

    function gridboxResize(){
        $('.grid-box').each(function(i){
            var box     = $(this),
                data    = box.data(),
                w       = (data.width*stage.width)*0.01,
                h       = (data.height*stage.height)*0.01;
            box.css({
                width   : w+'px',
                height  : h+'px'
            });

            var p = box.find('p');
            if(p[0]){
                p.css({ top:(h-p.height())*0.5 });
            }
        });
    }

    function onKeydown(e){
        switch(e.keyCode){
            case 38 : e.preventDefault(); onKeyScrollControl(1); break;
            case 40 : e.preventDefault(); onKeyScrollControl(-1); break;
        }
    }

    function onKeyScrollControl(delta){
        for(var i=0; i<10; i++){
            if(scroll)scroll.onWheel({},delta);
        }
    }

    function onScroll(offset){
        var mns = MagazineNaviStatus();
        if(mns)scrollDel();
        if(!mns && sceneM && scrollPossible)sceneM.update(offset);
    }

    function scrollDel(){
        if(scroll)scroll.stopRender();
    }


/* ******************************************************************************************
    ETC
****************************************************************************************** */
    function visibility(obj,visible){
        obj.css({visibility:visible?'visible':'hidden'});
        // obj.css({display:visible?'block':'none'});
        // obj.css({opacity:visible?1:0});
    }

    function display(obj,visible){
        obj.css({display:visible?'block':'none'});
        // obj.css({opacity:visible?1:0});
    }

    function WindowSize(){
        var size = { width:0,height:0};
        if (document.documentElement.clientHeight) {
            size.width = document.documentElement.clientWidth;
            size.height = document.documentElement.clientHeight;
        } else if (document.body.clientHeight) {
            size.width = document.body.clientWidth;
            size.height = document.body.clientHeight;
        } else if (window.innerHeight) {
            size.width = window.innerWidth;
            size.height = window.innerHeight;
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

}).call(this);