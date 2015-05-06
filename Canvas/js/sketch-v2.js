/* ************************************************************
    title  : Sketch ver 0.02
    date   : 2015.03
    author : Heowongeun
************************************************************ */


(function(){
    var Sketch = function(wrap,id,width,height,brushImg,option){
        var _this = this;

        this.config = {
            brushSize   : 100,
            margin      : 10,
            roughSketch : null,
            drawSpeed   : 500,
            drawDelay   : 100,
            baseColor   : "#fffff"
        };

        $.extend(this.config,option);

        this.sketchPoints = [];

        var brush,canvas,ctx,isDraw = false;
        var roughSketch;

        var compositeTypes = [
          'source-over','source-in','source-out','source-atop',
          'destination-over','destination-in','destination-out','destination-atop',
          'lighter','darker','copy','xor'
        ];

        function init(){
            brush = new Image();
            brush.src = brushImg;

            canvas  = $('<canvas id="'+id+'" width="'+width+'" height="'+height+'"></canvas>').appendTo(wrap);
            ctx     = canvas[0].getContext("2d");

            if(_this.config.roughSketch){
                roughSketch = new Image();
                roughSketch.src = _this.config.roughSketch;
                roughSketch.onload = function(){
                    ctx.drawImage(roughSketch,0,0);
                }
            }else{
            }
        }


        function pointInit(){
            var points1 = [], bendPoint1 = {start:0,cnt:0,x:0,y:0},
                points2 = [], bendPoint2 = {start:0,cnt:0,x:0,y:0};

            var brushSize   = _this.config.brushSize,
                brushDis = (width+height)/brushSize,
                margin      = _this.config.margin;

            for(var i=0,n=brushDis; i<n; i++){
                var x1 = -brushSize*0.5,
                    y1 = i * brushSize;

                if(y1 > height){
                    bendPoint1.start = i-bendPoint1.cnt;
                    x1 = bendPoint1.cnt * brushSize;
                    y1 = bendPoint1.start * brushSize;
                    bendPoint1.cnt++;
                }

                points1.push({x:x1 - margin ,y: y1 + margin});

                var x2 = i * brushSize,
                    y2 = 0;

                if(x2 > width){
                    bendPoint2.start = i-bendPoint2.cnt;
                    x2 = bendPoint2.start * brushSize;
                    y2 = bendPoint2.cnt * brushSize;
                    bendPoint2.cnt++;
                }
                points2.push({x:x2 + margin ,y: y2 - margin});
                // drawPoint(points1[i].x,points1[i].y);
            }


            for(var i =0, n=points1.length; i<n; i++){
                _this.sketchPoints.push(points1[i]);
                _this.sketchPoints.push(points2[i]);
            }
        }

        this.drawStart = function(){
            for(var i=0,n=this.sketchPoints.length-1; i<n; i++){
                animateStep(i,_this.config.drawSpeed,_this.config.drawDelay);
            }
        }

        this.drawStop = function(){
            for(var o in animateObjects){
                $(animateObjects[o]).stop(true);
            }
        }

        this.clear = function(){
            ctx.clearRect(0,0,width,height);
        }

        this.reset = function(){
            // this.clear();
        }

        var animateObjects = [];
        function animateStep(i,duration,delay,detail){
            var now     = _this.sketchPoints[i],
                target  = _this.sketchPoints[i+1];

            if(!animateObjects[i]){
                animateObjects[i] = { x:now.x,y:now.y };
            }

            $(animateObjects[i]).stop(true).delay(i*delay).animate({x:target.x,y:target.y}, {    
                duration    : duration,
                step        : function(now,fx){
                    draw(fx.elem);
                },
                complete    : function(){},
                easing      : "easeOutQuint"
            });
        }

        var cnt = 14;
        function draw(pos){
            var brushSize   = _this.config.brushSize;

            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(brush, pos.x-brushSize*0.5, pos.y-brushSize,brushSize*1.5,brushSize*1.5);

            ctx.globalCompositeOperation = 'source-in';
            ctx.drawImage(roughSketch,0,0);

            

            

            // ctx.globalCompositeOperation = 'destination-out';
            // ctx.drawImage(roughSketch,0,0);

            // drawPoint(ctx,pos.x-brushSize*0.5,pos.y-brushSize*0.5,'0xff0000ff');
            // for(var o in drawStock){
            //     ctx.drawImage(brush, drawStock[o].x, drawStock[o].y, brushSize*1.5,brushSize*1.5);
            // }
            // drawStock.push({x:pos.x-brushSize*0.5, y:pos.y-brushSize});
            
            // ctx.save();
            // ctx.fillStyle = '#fff';
            // ctx.fillRect(0,0,1000,1000);
            // ctx.restore();

            // ctx.globalCompositeOperation = 'source-in';
            



            // ctx.globalCompositeOperation = 'source-atop';
            // ctx.drawImage(brush, pos.x-brushSize*0.5, pos.y-brushSize,brushSize*1.5,brushSize*1.5);
            // ctx.drawImage(roughSketch,0,0);

            

        }

        init();
        pointInit();

        return this;
    }


    function distanceBetween(point1, point2) {
      return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    function angleBetween(point1, point2) {
      return Math.atan2( point2.x - point1.x, point2.y - point1.y );
    }


    function drawPoint(ctx,x,y,color){
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 360*Math.PI/180, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function drawLine(ctx,start,last,color){
        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(start.x,start.y);
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
        ctx.restore();
    }

    function drawRect(x,y,ctx,width,height,color){
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.fillRect(x,y,width,height);
        ctx.beginPath();
        ctx.fill();
        ctx.restore();
    }


    Sketch.prototype.constructor = Sketch;
    this.Sketch = Sketch;
}).call(this)