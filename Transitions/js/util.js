(function(){
    var Util = {};
    if(typeof Heo == 'undefined')Heo = {};
    Heo.Util = Util;

    /* ***************************************************************************************
        set transition
        require : jQuery
    *************************************************************************************** */
    Util.Css = {};
    Util.Css.setTransition = function(obj,duration,ease){
        var css = duration +'s '+ease;
        obj.css({"-webkit-transition" : css, "transition" : css});
    },

    Util.Css.setTransitionDuration = function(obj,duration){
        var css = duration +'s';
        obj.css({"-webkit-transition-duration" : css, "transition-duration" : css});
    }

    Util.Css.setTransitionDelay = function(obj,duration){
        var css = duration +'s';
        obj.css({"-webkit-transition-delay" : css, "transition-delay" : css});
    }

    /* ************************************************************
        favorite ease
    ************************************************************ */
    Heo.Ease = {

    };
    // 'easeInOutHeo0'     :   'cubic-bezier(.27,.14,.39,1)',
    // 'easeInOutHeo1'     :   'cubic-bezier(.25,0,.44,1)',
    // 'easeInOutHeo2'     :   'cubic-bezier(.44,.09,.29,1)',
    // 'easeInOutHeo3'     :   'cubic-bezier(.41,.1,.38,1)',
    // 'easeInOutHeo4'     :   'cubic-bezier(.32,.2,.38,1)',
    // 'easeInOutMove'     :   'cubic-bezier(.48,.06,.31,1)',
    // 'easeInOutZoom'     :   'cubic-bezier(.72,-0.21,.17,1)',
    // 'bgMove'            :   'cubic-bezier(.43,.05,.17,1)',
    // 'move1'             :   'cubic-bezier(.51,.24,.22,1)',
    // 'boxMove'           :   'cubic-bezier(.43,.05,.17,1)',
    // 'naviOpen'          :   'cubic-bezier(.47,.13,.26,1)',
    // 'findOut'           :   'cubic-bezier(.51,.3,.21,1)',
    // 'directionLine'     :   'cubic-bezier(.65,.15,.21,1)',
    // 'popupContentView'  :   'cubic-bezier(.28,.03,.57,1)',
    // 'sceneMove'         :   'cubic-bezier(.48,0,.28,.99)',
    // 'directionLinePush' :   'cubic-bezier(.48,0,.28,.99)',
    // 'directionLinePull' :   'cubic-bezier(.59,.01,.37,.99)',

    /* ************************************************************
        Math
    ************************************************************ */
    Util.Math = {};
    Util.Math.getRandom = function(max,min){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    Util.Math.getToRadian = function(degree){
        return Math.PI * degree / 180;
    }

    Util.Math.getToDegree = function(radian){
        return radian * 180 / Math.PI;
    }

    /* ************************************************************
        Touch
        require : jQuery
    ************************************************************ */
    Util.Touch = {};

    // Util.Touch.getInfo = function(target,callBack){
    //     var getPagePos = function(e){
    //         var pos, touch;
    //         pos = {x:0, y:0};
    //         if("ontouchstart" in window) {
    //             if (e.touches != null) {
    //                 touch = e.touches[0];
    //             } else {
    //                 touch = e.originalEvent.touches[0];
    //             }
    //             pos.x = touch.clientX;
    //             pos.y = touch.clientY;
    //         } else {
    //             pos.x = e.clientX;
    //             pos.y = e.clientY;
    //         }
    //         return pos;
    //     }

    //     var getTouchInfo = function(e){
    //         var info = { x : 0 , y : 0 , time: new Date().getTime()};
    //         $.extend(info,getPagePos(e));
    //         return info;
    //     }

    //     var touchMoveOffset = 0,
    //         touchStartPos = {},
    //         touchMovePos = {};

    //     $(target).bind("touchstart", function(e){
    //         touchMoveOffset = 0;
    //         touchStartPos = getTouchInfo(e);
    //         touchMovePos  = getTouchInfo(e);
    //     });

    //     $(target).bind("touchmove", function(e){
    //         e.preventDefault();
    //         touchMovePos = getTouchInfo(e);w
    //         var movedY = touchStartPos.y - touchMovePos.y,
    //             movedX = touchStartPos.x - touchMovePos.x;
    //         touchMoveOffset = Math.abs(movedX) < Math.abs(movedY)?0:movedX;
    //     });
    //     $(target).bind("touchend", function(e){
    //         callBack(touchMoveOffset);
    //     });
    // }
    


}).call(this);

// HEO_Util = function(){
//     this.init = function(){}

//     /* ***************************************************************************************
//         set transition
//     *************************************************************************************** */

//     this.setTransition = function(obj,duration,easing){
//         var css = duration +'s '+easing;
//         obj.css({"-webkit-transition" : css, "transition" : css});
//     }

//     this.setTransitionDuration = function(obj,duration){
//         var css = duration +'s';
//         obj.css({"-webkit-transition-duration" : css, "transition-duration" : css});
//     }

//     /* ***************************************************************************************
//         get touch info
//     *************************************************************************************** */
//     this.touchHandler = function(target,callBack){
//         var touchMoveOffset = 0,
//             touchStartPos = {},
//             touchMovePos = {};

//         // console.log(target);
//         $(target).bind("touchstart", function(e){
//             touchMoveOffset = 0;
//             touchStartPos = getTouchInfo(e);
//             touchMovePos  = getTouchInfo(e);
//         });

//         $(target).bind("touchmove", function(e){
//             e.preventDefault();
//             touchMovePos = getTouchInfo(e);w
//             var movedY = touchStartPos.y - touchMovePos.y,
//                 movedX = touchStartPos.x - touchMovePos.x;
//             touchMoveOffset = Math.abs(movedX) < Math.abs(movedY)?0:movedX;
//         });
//         $(target).bind("touchend", function(e){
//             callBack(touchMoveOffset);
//         });
//     }

//      ***************************************************************************************
//         get window size
//     *************************************************************************************** 
//     this.windowSize = function(){
//         var size = { width:0,height:0};
//         if (document.documentElement.clientHeight) {
//             size.width = document.documentElement.clientWidth;
//             size.height = document.documentElement.clientHeight;
//         } else if (document.body.clientHeight) {
//             size.width = document.body.clientWidth;
//             size.height = document.body.clientHeight;
//         } else if (stage.height) {
//             size.width = stage.width;
//             size.height = stage.height;
//         }

//         size.halfX = size.width * 0.5;
//         size.halfY = size.height * 0.5;
//         return size;
//     }
//     this.init();

//     /* ************************************************************
        
//     ************************************************************ */
//     this.Renderer = function{
//         renderID : null,
//         list : {},

//         addList : function(name,fn){
//             this.list[name] = {update:fn,freeze:false};
//             return this.list[name];
//         },
//         start : function(){
//             var _this = this;
//             this.render = _bind(this.render,this)
//             this.renderID = requestAnimationFrame(this.render);
//         },

//         stop    : function(){},
//         render  : function(){
//             for(var o in this.list){
//                 if(!this.list[o].freeze)this.list[o].update();
//             }
//             this.renderID = requestAnimationFrame(this.render);
//         }
//     }

//     /* ************************************************************
        
//     ************************************************************ */
    
    
// }
// HEO_Util.prototype.constructor = HEO_Util;
// this.HEO_Util = HEO_Util;