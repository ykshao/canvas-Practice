/**
 * 2014.04.
 * SkewMask ver 0.01
 * Author : Heonwongeun
 * FaceBook : https://www.facebook.com/heo.wongeun
 */

(function(){
    var SkewMask = function(target,option){
        var _this = this;
        
        this.target = $(target);
        this.point  = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
        this.center = {x:0,y:0};
        this.config = {
            width       : '100%',
            height      : '100%',
            minWidth    : '100%',
            minHeight   : '100%',
            skewX       : 30,
            skewY       : 0,
            translateX  : 0,
            translateY  : 0
        };

        this.position = {
            lt : 0,
            rt : 0,
            lb : 0,
            rb : 0
        }
        
        

        this.width  = 0;
        this.height = 0;

        $.extend(this.config,option);

        function init(){
            // _this.centerDot = $('<div></div>').appendTo(_this.target);
            // _this.centerDot.css({
            //     position : 'absolute',
            //     width : 10, height : 10,
            //     'background-color' : '#ff00ff'
            // })
            _this.sizeCalculate();
            _this.applyMask();

            $(window).on('resize',function(){
                _this.sizeCalculate();
                _this.applyMask();             
            })
        }

        init();
        return this;
    };

    SkewMask.prototype.sizeCalculate = function(){
        this.width  = changeSize(this.config.width,this.target.width());
        this.height = changeSize(this.config.height,this.target.height());

        var rx  = this.config.skewX*Math.PI / 180,
            ry  = this.config.skewY*Math.PI / 180,
            tx  = changeSize(this.config.translateX,this.target.width),
            ty  = changeSize(this.config.translateY,this.target.height),
            skx = Math.atan(rx)*this.target.height(),
            sky = Math.atan(ry)*this.target.width();
            
        this.point[0] = {x:tx+0,y:ty+0};
        this.point[1] = {x:tx+this.width,y:ty};
        this.point[2] = {x:tx+this.width+skx,y:ty+this.height+sky};
        this.point[3] = {x:tx+0+skx,y:ty+this.height};

        // this.center.x = tx+(skx+this.width)*0.5;
        // this.center.y = ty+(sky+this.height)*0.5;
        
        // this.centerDot.css({
        //     left : this.center.x-this.centerDot.width(),
        //     top  : this.center.y-this.centerDot.height()
        // });


        // $.extend(this.point,positionConvert(this.point,this.target));
    }


    SkewMask.prototype.getPointCss = function(p){
        var pointPath = "";
        for(var o in p){
            var x = p[o].x,
                y = p[o].y;
            pointPath += x+'px '+y+'px'+( o == p.length-1?"":"," );
        };

        return{
            'clip-path'         : 'polygon('+pointPath+')',
            '-webkit-clip-path' : 'polygon('+pointPath+')'
        }
    }

    SkewMask.prototype.applyMask = function(){
        this.target.css(this.getPointCss(this.point));
    }


    SkewMask.prototype.constructor = SkewMask;
    this.SkewMask = SkewMask;


    function changeSize(percent,size){
        var s;
        if(typeof percent === 'string' || String(percent).indexOf('%') != -1){
            s = Number(percent.replace('%','')) * size * 0.01;
        }else{
            s = percent;
        }

        return s;
    }

    function positionConvert(point,target){
        for(var o in point){
            var p = point[o];
            if(p.x < 0) p.x = 0;
            if(p.x > target.width())p.x = target.width();

            if(p.y < 0) p.y = 0;
            if(p.y > target.height())p.y = target.height();
        }
    }
}).call(this);