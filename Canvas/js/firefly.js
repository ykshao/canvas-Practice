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
        FireFly
    ************************************************************ */
    
    var Firefly = function(canvasClass){
        var canvas  = canvasClass,
            ctx     = canvas.getContext();

        this.init = function(){

        }
            

        var twinkles        = {},
            twinkleCount    = 0,
            drawCount       = 0;

        this.make = function(){
            // console.log(Twinkle)
            twinkles[twinkleCount] = new Twinkle(twinkleCount,twinkles,Math.random()*-600+1280,300+Math.random()*500);
            twinkleCount++;
        }
        this.draw = function(){
            for(var o in twinkles){
                twinkles[o].update(ctx);
            }

            if(drawCount % 5 == 0){
                this.make();
            }

            drawCount++;
        }

        

        /* ************************************************************
            class
        ************************************************************ */
        
        var Twinkle = function(id,twinkles,x,y,option){
            this.twinkles   = twinkles;
            this.id         = id;

            this.startT     = new Date().getTime();
            this.progress   = 0;
            this.progressR  = 1;

            this.x          = x;
            this.y          = y;
            this.size       = 0;
            this.t          = 0;
            this.circulation = 0;

            this.config = {
                vx         : Math.random()*.2-0.1,
                vy         : Math.random()*-.5,
                size       : Math.max(Math.random()*1,0.5),
                elastic    : Math.random(),
                friction   : 1,
                color      : {r:255,g:255,b:255,a:1},
                duration   : 5000+Math.random()*500,
                radian     : 360*Math.PI/180,
                stageRect  : {x:0,y:0,width:0,height:0}
            };

            $.extend(this.config,option);

            this.update = function(ctx){
                this.t += 0.05;
                this.circulation = Number(Math.abs(Math.sin(this.t)).toFixed(1));
                this.x += this.config.vx;
                this.y += this.config.vy;
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

                if(this.x < 0 || this.x > 1280 || this.y < 0 || this.y > 800 || this.progress > 1){
                    this.remove();
                }

                this.progress = (new Date().getTime() - this.startT)/this.config.duration;
                this.progressR = 1-this.progress;

            };
            this.remove = function(){
                delete this.twinkles[this.id];
            };

            return this;
        }

        Twinkle.prototype.constructor = Twinkle;

        /* ************************************************************
            class end
        ************************************************************ */
        

        this.make();
        return this;
    }

    Firefly.prototype = new EffectBase();
    this.Firefly = Firefly;


    /* ************************************************************
        RANDOM LINE
    ************************************************************ */

}).call(this);