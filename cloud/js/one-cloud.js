(function(){
/* ******************************************************************************************
    LOADING
****************************************************************************************** */

    lexusMagazineOnLoad = function(){ // loading complete
        // console.log('1');
        init();
    };

    lexusMagazineReady = function(){ // loading complete after stage view
        // console.log('2');
        setup();
        addEvent();
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
    var cloud,cloudMode = 3;
    var limitZ          = {min:0,max:2000},
        introOffset     = {
                            p:0,
                            worldZ : limitZ.max,
                            scene1Alpha : 0,
                            scene1Top : 0,
                            scene1RotX : 50,
                           };
    var scene1Offset = {top:-20,rotX:50}
    var scroll,scrollPossible = false;
    var $contents,$wrap,
        $scene1,
        $coverWrap,$coverAsset,$coverShape,$coverShapeWrap;

        var coverShapeWrapScale = 1.5,coverShapeWrapScaleMotion = true;

    function init(){
        $contents   = $('#contents');
        $wrap       = $('#wrap');
        $scene1     = $('#scene1');
        $coverWrap  = $('#cover-wrap');
        $coverAsset = $('.cover-assets').css({opacity:0});
        $coverShape = $('#cover-shape').css({opacity:0});
        $coverShapeWrap = $('#cover-shape-wrap');
        

        switch(cloudMode){
            case 1 :    cloud = new Clouds();
                        cloud.camera.position.z = introOffset.worldZ;    
                        break;
            case 2 :    cloud = new Clouds2();
                        cloud.camera.position.z = introOffset.worldZ;
                        cloud.update();
                        break;
            case 3 :    cloud = new Clouds3();
                        cloud.camera.position.z = introOffset.worldZ;
                        cloud.camera.zoomLimit = limitZ.max/1000;
                        cloud.update();
                        break;
        }

        renderID = requestAnimationFrame(render);
        TweenLite.to($coverShapeWrap,0,{scale:1});
        TweenLite.set($contents,{transformOrigin:"50% 0%",transformPerspective:1000});
        TweenLite.set($scene1,{transformOrigin:"50% 0%",transformPerspective:1000});
        // TweenLite.to($contents,0,{z:-worldOffset.z});
        onScroll(0)
        cloudMove(0);
    }

/* ******************************************************************************************
    SETUP    
****************************************************************************************** */
    var renderID;
    var gui = new dat.GUI();
    function setup(){
        scroll = new Scroll({
            target      : 'body',
            speed       : UA.isIE8?2:2,
            stats       : 0,
            friction    : 0.94,
            touchSpeed  : 5,
            scrollLimit : 10,
            type        : 'wheel',
            screenFix   : true,
            step        : onScroll
        });


        $('#scene1 .bg').imgfit({canvasMode:true,align:'t',maxWidth:1920});
        // $scene1.append($coverWrap);

        TweenLite.to($coverShapeWrap,1,{scale:coverShapeWrapScale,onComplete:function(){
            coverShapeWrapScaleMotion = false;
        }});
        TweenLite.to($coverShape,2,{opacity:1});
        TweenLite.to(introOffset,5,{ delay:1, p:1,worldZ:0,scene1Alpha:1,scene1Top:scene1Offset.top, scene1RotX:0,
                                    ease:Back.easeInOut,onComplete:onComplete,onUpdate:onUpdate});

        function onComplete(){
            scrollPossible = true;
            if(gui){
                // gData = gui.addFolder('camera');
                // gData.add(introOffset, 'z', limitZ.min, limitZ.max);
            }
            onScroll(0);
            // cloudMove();
        }

        function onUpdate(){
            // cloudMove();
            onScroll(0);
        }


    }

    
    var render = function(){
        renderID = requestAnimationFrame(render);
        cloudMove();
    }

    function onScroll(offset){
        if(!scrollPossible)offset = 0;

        if(scrollPossible)introOffset.worldZ = valueAdjust(introOffset.worldZ,offset*5,limitZ.min,limitZ.max,0.2);

        introOffset.p           = introOffset.worldZ/limitZ.max;
        introOffset.scene1Top   = (scene1Offset.top-scene1Offset.top*(introOffset.p*4));//valueAdjust(introOffset.scene1Top,offset*0.3,-30,0,1);
        introOffset.scene1Alpha = 1-introOffset.p;

        cloudMove(offset);
    }

    function cloudMove(offset){
        cloud.camera.position.z = introOffset.worldZ;
        if(cloudMode == 2 || cloudMode == 3)cloud.update();
        $coverWrap.css({top:(35-(1-introOffset.p)*25)+'%'});

        // TweenLite.to($coverShape,0,{scale:1.5-(1-introOffset.p)*0.5});
        if(!coverShapeWrapScaleMotion)TweenLite.to($coverShapeWrap,0,{scale:coverShapeWrapScale-(1-introOffset.p)*0.5});
        TweenLite.to($contents,0,{z:-introOffset.worldZ*0.3,top:(introOffset.scene1Top)+'%',opacity:introOffset.scene1Alpha});

        var newP;
        if(introOffset.p <= 0.2){
            newP = introOffset.p/0.2;
        }else{
            newP = 1;
        }

        $coverAsset.each(function(i){
            $(this).css({opacity:1-newP});
        })    
        
        // $scene1.css({top:introOffset.scene1Top+'%',opacity:introOffset.scene1Alpha, rotationX:introOffset.scene1RotX});
        // TweenLite.to($scene1,0,{rotationX:introOffset.scene1RotX})
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

/* ******************************************************************************************
    EVENT & EVENT HANDLER    
****************************************************************************************** */
    function addEvent(){
    }

/* ******************************************************************************************
    ETC
****************************************************************************************** */

}).call(this);
