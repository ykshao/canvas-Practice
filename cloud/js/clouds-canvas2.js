(function(){
    var Clouds3 = function(){
        var root        = this;
        var cloudNum    = 80,
            cloudSize   = { width : 256, height : 256 },
            oneSize     = { width : 41, height : 100 },
            clouds      = [];

        var mouseX = 0, mouseY = 0;
        var cloudContainer  = $('#cloudContainer');
        var cloudContainerZ = 500;
        // TweenLite.set(cloudContainer,{transformPerspective:1000});

        var sw = window.innerWidth;
        var sh = window.innerHeight;
        var center = { x:sw*0.5, y:sh*0.5 };

        this.camera = {
            position    : { x:sw*0.5, y:sh*0.5, z:0 },
            rotation    : { x:90, y:0, z:0 },
            near        : 500,
            zoom        : 0.8,
            zoomLimit   : 2,
            focus       : 5000
        };

        var cloudImg = new Image();
            cloudImg.onload = function(){root.init();};
        cloudImg.src = 'images/cloud10.png';

        var oneImg = new Image();
        oneImg.src = 'images/shape-one.png';
        
        var cloudCanvas,context;
        this.init = function(){
            cloudCanvas = $('<canvas width="'+sw+'" height="'+sh+'">').appendTo(cloudContainer);
            context     = cloudCanvas[0].getContext( '2d' );
            cloudCanvas.css({position:'absolute'});

            for(var i=0; i<cloudNum; i++){
                var opacity = 1,
                    x       = sw*Math.random()-sw*0.5,
                    y       = sh*0.8*Math.random()-sh*1.2*0.5,
                    z       = i*(this.camera.zoomLimit*1000/cloudNum)+Math.random()*10;

                if(i == 0){
                    x = -oneSize.width*0.5;
                    y = -oneSize.height*0.5;
                }

                clouds[i] = { 
                    id          : i,
                    position    : {x:x, y:y, z:z, w:Math.random()*3+1},
                    opacity     : 1,
                    update      : cloudUpdata
                };

            };

            document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        }

        function onDocumentMouseMove( event ) {
            mouseX = ( event.clientX - sw*0.5 ) * 0.5;
            mouseY = ( event.clientY - sh*0.5 ) * 0.5;
        }

        var DIGREE_TO_RADIAN = 1/180*Math.PI;
        this.update = function(){
            this.camera.rotation.x = -(this.camera.position.z/1000)*0.5;
            this.camera.rotation.y += (-mouseX/sw*0.5-this.camera.rotation.y)*0.03;
            this.camera.rotation.x += (mouseY/sh*0.5-this.camera.rotation.x)*0.03;

            if(context){
                context.save();
                context.clearRect(0, 0, sw, sh);
                context.restore();
            }
            var rotX = this.camera.rotation.x*DIGREE_TO_RADIAN;
            var rotY = this.camera.rotation.y*DIGREE_TO_RADIAN;
            var rotZ = this.camera.rotation.z*DIGREE_TO_RADIAN;
                
            for(var o in clouds){
                clouds[o].update();
            }
        }

  
        function cloudUpdata(){
            var p   = this.position;
            var ap  = applyRotation( p.x,  p.y,root.camera.rotation.z);// ab = xy
            var zp  = applyRotation(ap.b,  p.z,root.camera.rotation.x);// ab = yz
            var bp  = applyRotation(zp.b, ap.a,root.camera.rotation.y);// ab = zx
            
            var persepective = root.camera.focus / ( root.camera.focus + bp.a ) * (root.camera.zoomLimit-root.camera.position.z/1000)+1;
            if(persepective<0)persepective=0;

            // console.log(persepective);
            var dis     = (root.camera.position.z-p.z)/root.camera.near;
            var px      = bp.b * persepective + center.x;
            var py      = zp.a * persepective + center.y;
            var weight  = persepective*p.w;
            var alpha   = Math.max(dis,0);
            if(alpha == 0)return;

            // if( px < -100 || px > 565 || py < -100 || py > 565 ) continue;
            
            var sx = cloudSize.width*weight+dis*0,
                sy = cloudSize.height*weight+dis*0;
            context.save();
            context.globalAlpha = alpha;
            context.drawImage(cloudImg,px-sx*0.5,py-sy*0.5,sx,sy);
            context.restore();
        }
          
        function applyRotation(a,b,rot){
          return {
            a:( Math.cos(rot)*a - Math.sin(rot)*b ),
            b:( Math.sin(rot)*a + Math.cos(rot)*b )
          };
        }


        return this;
    }

    Clouds3.prototype.constructor = Clouds3;
    this.Clouds3 = Clouds3;
}).call(this);


// function Particle(x,y,z){
//   this.x = x;
//   this.y = y;
//   this.z = z;
// }

// var center = { x:232, y:232 };
// var camera = { rotationX:0, rotationY:0, rotationZ:0, zoom:0.8, forcus:300 };

// var points = [];
// for(var i=0;i<1000;++i){
//   points.push(
//     new Particle(
//       Math.random()*400-200,
//       Math.random()*400-200,
//       Math.random()*400-200
//     )
//   );
// }

// var speedAngle = 0;
// var DIGREE_TO_RADIAN = 1/180*Math.PI;
// function draw(evt){
//   speedAngle++;
//   var speed = Math.sin(speedAngle*DIGREE_TO_RADIAN);
//   //camera.rotationX +=2;
//   camera.rotationY -=0.4*speed;
//   camera.rotationZ +=0.8*speed;
  
//   var rotX = camera.rotationX*DIGREE_TO_RADIAN;
//   var rotY = camera.rotationY*DIGREE_TO_RADIAN;
//   var rotZ = camera.rotationZ*DIGREE_TO_RADIAN;
//   ctx.fillStyle = 'rgba(0,0,0,0.1)';
//   ctx.fillRect(0,0,465,465);
//   for( var i=0; i<points.length; ++i ) {
//     /*
    
//     */
//     var p = points[i];
//     var ap = applyRotation( p.x,  p.y,rotZ);// ab = xy
//     var zp = applyRotation(ap.b,  p.z,rotX);// ab = yz
//     var bp = applyRotation(zp.b, ap.a,rotY);// ab = zx
    
//     var persepective = camera.forcus / ( camera.forcus + bp.a )* camera.zoom;
    
//     var px = bp.b * persepective + center.x;
//     var py = zp.a * persepective + center.y;
    
//     if( px < -100 || px > 565 || py < -100 || py > 565 ) continue;
//     ctx.fillStyle = "rgba(255,153,51,"+persepective/2+")";
//     var weight = persepective*3;
//     ctx.fillRect(px, py, weight, weight);
//   }
// }
  
// function applyRotation(a,b,rot){
//   return {
//     a:( Math.cos(rot)*a - Math.sin(rot)*b ),
//     b:( Math.sin(rot)*a + Math.cos(rot)*b )
//   };
// }
