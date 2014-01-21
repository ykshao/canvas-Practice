(function(){
    /* ************************************************************
        Effect Base Class
    ************************************************************ */
    
    EffectBase = function(){
        this.draw   = function(){

        }

    };
    EffectBase.prototype.constructor = EffectBase;

    /* ************************************************************
        SketchPowder
    ************************************************************ */
    var SketchPowder = function(canvasClass){
        var canvas  = canvasClass,
            ctx     = canvas.getContext();

        this.mouse = { 
                       crt              : {x:0, y:0},
                       distance         : {x:0, y:0, direct:0},
                       old              : {x:0, y:0},
                       oldDistance      : {x:0, y:0, direct:0},
                       speed            : 0
                    };

        this.init = function(){

        }

        var powders     = {},
            maskCounter = 0;
            // drawCount   = 0;
        var brush = new Image();
        brush.src = 'img/brush2.png';
        brush.onload = function(){
        }

        this.make = function(x,y,option){
            $.extend(option,{ x:x,y:y, sx : Math.random()*this.mouse.speedX, sy : Math.random()*this.mouse.speedY });
            powders[maskCounter] = new Powder(maskCounter,powders,x,y,option,brush);
            maskCounter++;
        }

        this.draw = function(){

            this.mouse.distance.x       = this.mouse.crt.x - this.mouse.old.x;
            this.mouse.distance.y       = this.mouse.crt.y - this.mouse.old.y;
            this.mouse.distance.direct  = Math.sqrt(this.mouse.distance.x*this.mouse.distance.x+this.mouse.distance.y*this.mouse.distance.y);
            this.mouse.speedX           = this.mouse.distance.x*100;
            this.mouse.speedY           = this.mouse.distance.y*100;

            for(var o in powders){

                powders[o].update(ctx);
            }

            // if(drawCount % 5 == 0){
            //     this.make();
            // }

            // drawCount++;

            this.mouse.old = this.mouse.crt;
            this.mouse.oldDistance = this.mouse.distance;
        }

        

        /* ************************************************************
            class
        ************************************************************ */
        
        var Powder = function(id,powders,x,y,option,brush){
            this.powders    = powders;
            this.id         = id;
            this.brush      = brush;

            this.startT     = new Date().getTime();
            this.progress   = 0;
            this.progressR  = 1;

            this.x          = x;
            this.y          = y;
            this.size       = 0;
            this.t          = 0;
            this.circulation = 0;

            this.config = {
                vx         : Math.random()*100,
                vy         : Math.random()*-100,
                size       : Math.random()*2,//Math.min(Math.random()*2,.5),
                elastic    : Math.random(),
                friction   : 2,
                color      : {r:255,g:255,b:255,a:1},
                duration   : Math.random()*1000,
                radian     : Math.random()*360*Math.PI/180,
                stageRect  : {x:0,y:0,width:0,height:0}
            };

            $.extend(this.config,option);


            this.update = function(ctx){    
                this.t += 0.1;
                this.circulation = Number(Math.abs(Math.sin(this.t)).toFixed(1));

                this.config.sx *= 0.8;
                this.config.sy *= 0.8;

                this.config.vx *= 0.8;
                this.config.vy *= 0.8;

                this.x = this.config.x;
                this.y = this.config.y;//this.config.sy + this.config.vy 

                this.x += this.config.sx;
                this.y += this.config.sy;

                this.calculate();
                this.drawLine(ctx);
                
                // this.x += Math.cos(this.config.radian)*this.config.vx*this.progressR;
                // this.y += Math.sin(this.config.radian)*this.config.vy*this.progressR;

                // this.x += Math.cos(radian)
                // this.x += Math.sin(radian)
                this.size += ((this.config.size)-this.size)*0.1;

                var color = this.config.color
                color.a = Math.max(this.circulation,0.9);
                color.a *= this.progressR;

                ctx.save();
                ctx.fillStyle = 'rgba('+color.r+','+color.g+','+color.b+','+color.a+')';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, 360*Math.PI/180, true);
                ctx.closePath();
                ctx.fill();
                ctx.restore();

                this.oldX = this.x;
                this.oldY = this.y;

                if(this.x < 0 || this.x > 1280 || this.y < 0 || this.y > 800 || this.progress > 1){
                    this.remove();
                }

                this.progress = (new Date().getTime() - this.startT)/this.config.duration;
                this.progressR = 1-this.progress;

            };

            this.calculate = function(){
                // this.x += this.config.vx+Math.cos(this.config.radian)*this.config.vx*this.progressR;
                // this.y += this.config.vy+Math.sin(this.config.radian)*this.config.vy*this.progressR;
            }

            this.drawLine = function(ctx){
                if(this.oldX && this.oldY){
                    this.config.color.a = this.progressR;
                    ctx.save();
                    ctx.strokeStyle = 'rgba('+this.config.color.r+','+this.config.color.g+','+this.config.color.b+','+this.config.color.a+')';
                    ctx.beginPath();
                    ctx.moveTo(this.oldX,this.oldY);
                    ctx.lineTo(this.x, this.y);
                    ctx.stroke();
                    ctx.restore();
                }
            }

            this.remove = function(){
                delete this.powders[this.id];
            };


            return this;
        }

        Powder.prototype.constructor = Powder;

        /* ************************************************************
            class end
        ************************************************************ */
        

        this.make();
        return this;
    }

    SketchPowder.prototype = new EffectBase();
    this.SketchPowder = SketchPowder;


    /* ************************************************************
        RANDOM LINE
    ************************************************************ */

}).call(this);