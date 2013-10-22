(function(){
    var Spark = function(id,container,imgURL){
        var root        = this;

        this.name       = 'spark'+id;
        this.imgURL     = imgURL;
        this.imgData    = {};
        this.container  = $(container);
        this.status     = 'loading';
        this.cvs;
        this.ctx;

        this.renderingID;

        this.sparks     = {}; // embers 
        this.sparkLengh = 0;
        this.makeAmount = 10;

        /* ************************************************************
            init
        ************************************************************ */
        
        this.make = function(){
            if(this.status != 'ready')return; 
            var p = this.imgData.makePositions[Math.floor(Math.random()*(this.imgData.makePositions.length-1))];
            // conainter,ctx,id,startP,option
            var embers = new Embers( this.sparks,this.ctx,this.sparkLengh,p,{ 
                color : {r:p.r,g:p.g,b:p.b,a:p.a},
                stageRect : {x:0,y:0,width:this.imgData.width,height:this.imgData.height}} );
            this.sparks[this.sparkLengh] = embers;
            this.sparkLengh++;
        }

        this.draw = function(){
            //canvas clear
            // root.ctx.fillStyle = "rgba(0,0,0,1)"
            // root.ctx.fillRect(0, 0,root.cvs.width,root.cvs.height);
            
            root.ctx.clearRect(0,0,root.cvs.width,root.cvs.height);
            // if(this.status != 'ready')return; 
            for(var i=0; i<root.makeAmount; i++){
                root.make();
            }

            // root.ctx.drawImage(root.img,0,0);

            //update
            for(s in root.sparks)root.sparks[s].update();
            root.renderingID = requestAnimationFrame(root.draw);
        }

        this.start = function(){
            root.renderingID = requestAnimationFrame(root.draw);
        }
        this.stop = function(){
            cancelAnimationFrame(this.renderingID);
        }


        /* ************************************************************
            init
        ************************************************************ */

        this.init = function(){
            this.img        = new Image();
            this.img.onload = function(){
                root.imgData.width  = this.width;
                root.imgData.height = this.height;

                root.container.append('<canvas id="'+root.name+'" width="'+this.width+'" height="'+this.height+'"></canvas>');

                root.cvs = document.getElementById(root.name);
                root.ctx = root.cvs.getContext("2d");
                root.ctx.drawImage(this,0,0);
                root.imgData = root.ctx.getImageData(0, 0, root.cvs.width, root.cvs.height);
                root.getColorPixel();
            }

            this.img.src = this.imgURL;
        }


        this.getColorPixel = function(){
            var data    = root.imgData,
                length  = data.width * data.height;
                data.makePositions = [];

            for (var i = 0 ;i < length; i++) {  
                var r = data.data[i*4],
                    g = data.data[i*4+1],
                    b = data.data[i*4+2],
                    a = data.data[i*4+3];

                if(r != 0 && g != 0 && b != 0){
                    var x = parseInt((i-1)%data.width),
                        y = Math.floor((i-1)/data.height/(data.width/data.height));
                    data.makePositions.push({x:x,y:y,r:r,g:g,b:b,a:Number((a/255).toFixed(2))});
                }

                // console.log(info.colorPosition[0].alpha)


                if(i==length-1){
                    this.status = 'ready';
                    $(this).trigger(this.status);
                }
            };
        };

        this.init();
        return this;
    };

    Spark.prototype.constructor = Spark;
    this.Spark = Spark;

    
    /* ************************************************************
        Embers
    ************************************************************ */
    var Embers = function(conainter,ctx,id,startP,option){
        this.conainter  = conainter;
        this.root       = this;
        this.ctx        = ctx;
        this.id         = id;
        this.startT     = new Date().getTime();
        this.progress   = 0;
        this.progressR  = 1;

        this.x          = startP.x;
        this.y          = startP.y;
        this.oldX       = startP.x;
        this.oldY       = startP.y;

        this.config = {
            vx         : Math.random()*2-1,
            vy         : Math.random()*-1,
            friction   : 1,
            color      : {r:0,g:211,b:255,a:1},
            duration   : 500+Math.random()*500,
            radian     : 360*Math.PI/180,
            stageRect  : {x:0,y:0,width:0,height:0}
        };

        $.extend(this.config,option);
        
        this.update = function(){
            this.calculate();
            this.drawLine();

            this.oldX = this.x;
            this.oldY = this.y;
            if(this.x<0 || this.y<0 || this.x > this.config.stageRect.width || this.y > this.config.stageRect.height || this.progress >= 1){
                this.remove(this.id);
            };

            this.progress = (new Date().getTime() - this.startT)/this.config.duration;
            this.progressR = 1-this.progress;
        }

        this.remove = function(id){
            delete this.conainter[id]
        }


        /* ************************************************************
            calculates
        ************************************************************ */

        this.calculate = function(){
            this.x += this.config.vx+Math.cos(this.config.radian)*this.config.vx*this.progressR;
            this.y += this.config.vy;//+Math.sin(this.config.radian)*this.config.vy*this.progressR;
        }

        /* ************************************************************
            drawing
        ************************************************************ */

        this.drawLine = function(){
            if(this.oldX && this.oldY){
                this.config.color.a = this.progressR;
                this.ctx.strokeStyle = 'rgba('+this.config.color.r+','+this.config.color.g+','+this.config.color.b+','+this.config.color.a+')';
                this.ctx.beginPath();
                this.ctx.moveTo(this.oldX,this.oldY);
                this.ctx.lineTo(this.x, this.y);
                this.ctx.stroke();
            }
        }

        return this;
    }

    Embers.prototype.constructor = Embers;

}).call(this);