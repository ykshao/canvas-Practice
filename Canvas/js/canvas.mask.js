(function(){
    /**
     * 2014.12
     * imgfit ver 0.0.1
     *
     * Author   : Heonwongeun
     * FaceBook : https://www.facebook.com/heo.wongeun
     * mail     : heowongeun@gmail.com
     */

     /* Modernizr 2.8.2 (Custom Build) | MIT & BSD
     * Build: http://modernizr.com/download/#-canvas-teststyles-testprop-testallprops-prefixes-domprefixes
     */

    // var canvasM = new CanvasMask($('#img'),{x:150,y:150});
    // canvasM.mask({x:50,y:50});

    
    function CanvasMask(img,position,initComplete){
        var _this = this;
        var centerP,points = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],percentage = {x:0,y:0};
        var status = {
            imgLoaded : false,
            canvasLoad : false
        }
        if(position){
            $.extend(percentage,position);
        }

        this.image  = new Image();
        this.width  = 0;
        this.height = 0;
        this.canvas = $('<canvas></canvas>');
        this.ctx;

        this.init = function(){
            this.imageLoad();
            return this;
        }

        this.imageLoad = function(){
            this.image.src = $(img).attr('src');
            this.image.onload = function(){
                _this.imageLoaded();
            }
        }
        this.imageLoaded = function(){
            status.imgLoaded = true;

            this.width  = this.image.width;
            this.height = this.image.height;
            this.changeToCanvas();
        }

        this.changeToCanvas = function(){
            this.canvas[0].width    = this.width;
            this.canvas[0].height   = this.height;

            this.ctx = this.canvas[0].getContext("2d");

            this.canvas.addClass(img[0].className).css({display:'block'});
            this.ctx.drawImage(img[0], 0, 0, this.width, this.height);
            img.before(this.canvas);
            if(img[0].id)this.canvas.attr('id',img[0].id);
            img.remove();
            this.setMask();

            if(initComplete)initComplete(this);
        }

        this.cangeToCanvasComplete = function(){
            return this.canvas;
        }

        this.getCanvas = function(){
            return this.canvas;   
        }

        this.mask = function(position,duration,delay,complete){
            TweenLite.to(percentage,duration,
            {
                x:position.x,
                y:position.y,
                ease:Power3.easeInOut,
                delay:typeof delay == 'undefined'?0:delay,
                onUpdate:function(){
                    _this.setMask();
                },
                onComplete:function(){
                    if(complete)complete();
                }
            });
        }

        this.setMask = function(){
            centerP = { x : (percentage.x)*this.width*0.01, y:(percentage.y)*this.height*0.01 };
            points[0].x = centerP.x-this.width;
            points[0].y = centerP.y;
            points[1].x = centerP.x+this.width;
            points[1].y = centerP.y-this.height*2;
            points[2].x = centerP.x+this.width;
            points[2].y = centerP.y;
            points[3].x = centerP.x-this.width;
            points[3].y = centerP.y+this.height*2;

            this.ctx.clearRect(0,0,this.width,this.height);
            this.ctx.save();
            for(var i=0,n=points.length; i<n; i++){
                var p = points[i];
                if(i==0){
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x,p.y);
                }else{
                    this.ctx.lineTo(p.x,p.y);
                }

                if(i == n-1 ){
                    this.ctx.closePath();
                    this.ctx.clip();  
                    this.ctx.drawImage(img[0], 0, 0, this.width, this.height);
                    this.ctx.restore(); 
                }
            }

        }

        
        return this.init();
    };

    CanvasMask.prototype.consttuctor = CanvasMask;
    this.CanvasMask = CanvasMask;
}).call(this);