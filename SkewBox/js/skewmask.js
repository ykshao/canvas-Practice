/**
 * 2014.04.
 * SkewMask ver 0.01
 * Author : Heonwongeun
 * FaceBook : https://www.facebook.com/heo.wongeun
 */

(function(){
    var SkewMask = function(target,maskId,option){
        var _this = this;
        
        this.svg        = '',
        this.svgCon     = '',
        this.clippath   = '',
        this.polygon    = '';

        this.target = $(target);
        this.parent = this.target.parent();
        this.point  = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
        this.center = {x:0,y:0};
        this.config = {
            align       : 'L',
            width       : '100%',
            height      : '100%',
            minWidth    : '100%',
            minHeight   : '100%',
            skewX       : 30,
            skewY       : 0,
            x           : 0,
            y           : 0
        };

        this.width  = 0;
        this.height = 0;

        $.extend(this.config,option);

        function init(){
            if(typeof $('body').find('svg')[0] === 'undefined'){
                _this.svg        = $('<svg><defs></<defs></svg>').appendTo($('body'));
                _this.svgCon     = _this.svg.find('defs');
            }else{
                _this.svgCon = $('body').find('defs');
            }

            _this.clippath   = $('<clipPath id="mask-'+maskId+'"></clipPath>').appendTo(_this.svgCon);
            _this.polygon    = $('<polygon points="0"></polygon>').appendTo(_this.clippath);


            _this.target.css({
                "-webkit-clip-path" : "url(#mask-"+maskId+")",
                "clip-path" : "url(#mask-"+maskId+")"
            });


            _this.sizeCalculate();
            _this.applyMask();

            $(window).on('resize',function(){
                _this.sizeCalculate();
                _this.applyMask();             
            });
        }

        init();
        return this;
    };

    SkewMask.prototype.skew = function(x,y){
        if(x){
            this.config.skewX += x;
        }

        if(y){
            this.config.skewY += y;
        }

        this.sizeCalculate();
        this.applyMask();
    }

    SkewMask.prototype.changeProperty = function(option){
        $.extend(this.config,option);
        this.sizeCalculate();
        this.applyMask();
    }

    SkewMask.prototype.translate = function(x,y){
        if(x){
            var newX = changeSize(this.config.x,this.target.width())+x;
            this.config.x = newX;//((newX/this.target.width())*100).toFixed(3)+'%';
        }

        if(y){
            var newY = changeSize(this.config.y,this.target.height())+y;
            this.config.y = newY;//((newY/this.target.height())*100).toFixed(3)+'%';
        }

        this.sizeCalculate();
        this.applyMask();
    }

    SkewMask.prototype.sizeCalculate = function(){
        this.width  = changeSize(this.config.width,this.target.width());
        this.height = changeSize(this.config.height,this.target.height());

        var rx  = this.config.skewX*Math.PI / 180,
            ry  = this.config.skewY*Math.PI / 180,
            x   = changeSize(this.config.x,this.target.width()),
            y   = changeSize(this.config.y,this.target.height()),
            skx = Math.atan(rx)*this.height,
            sky = Math.atan(ry)*this.width;

        if(this.config.align == "R"){
            x = this.target.width()-(x+this.width);
        }
        
        this.point[0] = {x:x,y:y};
        this.point[1] = {x:x+this.width,y:y+sky};
        this.point[2] = {x:x+this.width+skx,y:y+this.height+sky};
        this.point[3] = {x:x+skx,y:y+this.height};
        // $.extend(this.point,positionConvert(this.point,this.target));
    }


    SkewMask.prototype.getPointCss = function(p){
        var pointPath = "";
        for(var o in p){
            var x = p[o].x,
                y = p[o].y;
            pointPath   += x+' '+y+''+( o == p.length-1?"":"," );

        };

        return pointPath;

        // this.maskId.attr('points',pointPath2);

        // return{
        //     'clip-path'         : 'polygon('+pointPath+')',
        //     '-webkit-clip-path' : 'polygon('+pointPath+')'
        // }
    }

    SkewMask.prototype.applyMask = function(){
        this.polygon.attr('points',this.getPointCss(this.point));
        // this.target.css(this.getPointCss(this.point));
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