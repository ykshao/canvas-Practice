(function(){
    var Cloud = function(ctx){

        /* ************************************************************
            global var
        ************************************************************ */
        
        var root        = this;
        var mouse       = {x:0,y:0};
        var stage       = WindowSize();
        // var canvas,ctx;

        this.getContext = function(){ return ctx };
        /* ************************************************************
            cloud vars
        ************************************************************ */

        var cloudNum    = 100,
            cloudSize   = { width : 256, height : 256 },
            clouds      = [];

        var cloudContainer  = $('#cloudContainer');
        var cloudImg = new Image();
            cloudImg.onload = function(){root.init();};
        cloudImg.src = 'images/cloud10.png';

        /* ************************************************************
            camera
        ************************************************************ */
        var rad             = 1/180*Math.PI;
        this.camera = {
            position    : { x:stage.width*0.5, y:stage.height*0.5, z:0 },
            rotation    : { x:0, y:0, z:0 },
            near        : 500,
            zoom        : 0.8,
            zoomLimit   : 100,
            focus       : 5000
        };        


        /* ************************************************************
            init
        ************************************************************ */
        this.init = function(){
            // canvas = $('<canvas width="'+stage.width+'" height="'+stage.height+'">').appendTo(cloudContainer);
            // ctx     = canvas[0].getContext( '2d' );
            // canvas.css({position:'absolute'});
            for(var i=0; i<cloudNum; i++){
                var opacity = 1,
                    x       = stage.width*5*Math.random()-stage.width*2.5,
                    y       = stage.height*2*Math.random()-stage.height*.5,
                    z       = i*100/10000//;(this.camera.zoomLimit*1000/cloudNum)+Math.random()*100;

                clouds[i] = { 
                    id          : i,
                    position    : {x:x, y:y, z:z, w:Math.random()*1+3},
                    original    : {x:x, y:y, z:z, w:Math.random()*1+3},
                    opacity     : 1,
                    update      : cloudUpdate
                };
            };

            $(document).on('mousemove',onMouseMove);
        }

        /* ************************************************************
            event handler
        ************************************************************ */
        
        function onMouseMove( e ) {
            mouse.x = ( e.clientX - stage.width*0.5 ) * 0.5;
            mouse.y = ( e.clientY - stage.height*0.5 ) * 0.5;
        }

        /* ************************************************************
            rendering
        ************************************************************ */
        this.update = function(){
            // this.camera.rotation.x = -(this.camera.position.z/1000)*0.5;
            // this.camera.rotation.y += (-mouse.x/stage.width*0.5-this.camera.rotation.y)*0.03;
            // this.camera.rotation.x += (mouse.y/stage.height*0.5-this.camera.rotation.x)*0.03;

            if(ctx){
                ctx.save();
                ctx.clearRect(0, 0, stage.width, stage.height);
                ctx.restore();
            }
            var rotX = this.camera.rotation.x*rad;
            var rotY = this.camera.rotation.y*rad;
            var rotZ = this.camera.rotation.z*rad;
                
            for(var o in clouds){
                clouds[o].update();
            }
        }
  
        function cloudUpdate(){
            var p   = this.position;

            p.x += ((this.original.x + mouse.x)-p.x)*0.03;
            p.y += ((this.original.y + mouse.y)-p.y)*0.03;
            // p.y = //(-mouse.y/stage.height*0.5-p.y)*0.03;

            var ap  = applyRotation(p.x,  p.y,root.camera.rotation.z);// ab = xy
            var zp  = applyRotation(ap.b,  p.z,root.camera.rotation.x);// ab = yz
            var bp  = applyRotation(zp.b, ap.a,root.camera.rotation.y);// ab = zx

            // this.camera.rotation.y += (-mouse.x/stage.width*0.5-this.camera.rotation.y)*0.03;
            // this.camera.rotation.x += (mouse.y/stage.height*0.5-this.camera.rotation.x)*0.03;

            
            var persepective = root.camera.focus / ( root.camera.focus + bp.a ) * (root.camera.zoomLimit-root.camera.position.z/1000)+1;
            if(persepective<0)persepective=0;

            var dis     = (root.camera.position.z-p.z)/root.camera.near;
            var px      = bp.b * persepective + stage.centerX;
            var py      = zp.a * persepective + stage.centerY;
            var weight  = persepective*p.w;
            var alpha   = Math.max(dis,0);

            // console.log(alpha,(root.camera.position.z-p.z)/(root.camera.near))
            if(alpha <= 0){
                // this.position.z = -5000;
                // console.log('z',this.position.z);
                return;
            }

            // if( px < -100 || px > 565 || py < -100 || py > 565 ) continue;
            
            var sx = cloudSize.width*weight+dis*0,
                sy = cloudSize.height*weight+dis*0;

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.drawImage(cloudImg,px-sx*0.5,py-sy*0.5,sx,sy);
            ctx.restore();
        }
         
        function applyRotation(a,b,rot){
            return {
                a:( Math.cos(rot)*a - Math.sin(rot)*b ),
                b:( Math.sin(rot)*a + Math.cos(rot)*b )
            };
        }


        return this;

    } // end Cloud Class

    Cloud.prototype.constructor = Cloud;
    this.Cloud = Cloud;


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

        size.centerX = size.width*0.5;
        size.centerY = size.height*0.5;

        return size;
    }

}).call(this);



/*
     HTMLCanvasElement

        toDataURL()
        getContext()

     メソッド
        addColorStop()
        arc()
        arcTo()
        beginPath()
        bezierCurveTo()
        clearRect()
        clip()
        closePath()
        createImageData()
        createLinearGradient()
        createPattern()
        createRadialGradient()
        drawFocusRing()
        drawImage()
        fill()
        fillRect(x, y, w, h)
        fillText()
        getImageData()
        isPointInPath()
        lineTo()
        measureText()
        moveTo()
        putImageData()
        quadraticCurveTo()
        rect()
        restore()
        rotate()
        save()
        scale()
        setTransform()
        stroke()
        strokeRect()
        strokeText()
        translate()
        transform()

    プロパティ
        fillStyle
        font
        globalAlpha
        globalCompositeOperation
        lineCap
        lineJoin
        miterLimit
        lineWidth
        shadowBlur
        shadowColor
        shadowOffsetX
        shadowOffsetY
        strokeStyle
        textAlign
        textBaseline
     */
