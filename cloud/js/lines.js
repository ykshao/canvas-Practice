(function(){
    var Lines = function(ctx){

        
        var root        = this;
        var mouse       = {x:0,y:0};
        var stage       = WindowSize();
        var ctx         = ctx;

        var rad         = 1/180*Math.PI;
        this.camera     = {
            position    : { x:stage.width*0.5, y:stage.height*0.5, z:0 },
            rotation    : { x:90, y:0, z:0 },
            near        : 500,
            zoom        : 0.8,
            zoomLimit   : 2,
            focus       : 5000
        };      


        /* ************************************************************
            lines
        ************************************************************ */
        var lineNum     = 100,
            lines1      = [];

        var lineProgress1 = 0;
        var linePoints    = {
            start   : [-50,0],
            end     : [0,0]
        }
        
        /* ************************************************************
            init
        ************************************************************ */
        this.init = function(){
            // canvas = $('<canvas width="'+stage.width+'" height="'+stage.height+'">').appendTo(cloudContainer);
            // ctx     = canvas[0].getContext('2d');
            // canvas.css({position:'absolute'});

            for(var i=0; i<lineNum; i++){
                var marginX = Math.random()*200-100,
                    marginY = Math.random()*200-100,
                    marginZ = 1000;

                lines1[i] = {
                    id          : i,
                    start       : {x:linePoints.start[0]*(stage.width+marginX)/200,y:linePoints.start[1]*(stage.height+marginY)/200,z:1000},
                    end         : {x:linePoints.end[0]*(stage.width)/200,y:linePoints.end[1]*(stage.height)/200,z:0},
                    position    : {x:0,y:0,z:0},
                    oldPos      : {x:0,y:0,z:0},
                    opacity     : 1,
                    progress    : 0,
                    vx          : 0,
                    vy          : 0
                };

                lines1[i].spline = spline([lines1[i].start,lines1[i].end],500)[0];
                console.log(lines1[i].spline);


            }

            $(document).on('mousemove',onMouseMove);
        }

        /* ************************************************************
            event handler
        ************************************************************ */
        
        function onMouseMove( e ) {
            mouse.x = ( e.clientX - stage.width*0.5 ) * 0.5;
            mouse.y = ( e.clientY - stage.height*0.5 ) * 0.5;
        }

        
        var lineOffset1 = {p:0};
        this.lineMove1 = function(){
            var _this = this;
            lineOffset1.p = 0;
            TweenLite.to(lineOffset1,1,{ p:1, ease:Expo.easeOut,
                onUpdate:function(){
                    _this.lineUpdate(lines1,lineOffset1.p,{x:0,y:0,z:0});
                }
            });
        };

        this.lineUpdate = function(lines,progress,target){
            for(var o in lines){
                var line    = lines[o],
                    startP  = line.start,
                    endP    = line.end,
                    newP    = line.spline[(progress*500).toFixed(0)],
                    p       = line.position;

                line.vx += 0.01;
                var dx  = (endP.x - startP.x),
                    dy  = (endP.y - startP.y),
                    dz  = (endP.z - startP.z);

                ctx.save();
                ctx.lineCap     = 'round'
                ctx.strokeStyle = '#62e3d4';
                ctx.fillStyle   = '#62e3d4';
                ctx.beginPath();
                ctx.moveTo(p.x,p.y);


                p.x = startP.x+dx*progress;
                p.y = startP.y+dy*progress;
                p.z = startP.z+dz*progress;


                var ap  = applyRotation(p.x,  p.y,root.camera.rotation.z);// ab = xy
                var zp  = applyRotation(ap.b, p.z,root.camera.rotation.x);// ab = yz
                var bp  = applyRotation(zp.b, ap.a,root.camera.rotation.y);// ab = zx

                var persepective = root.camera.focus / ( root.camera.focus + bp.a ) * (root.camera.zoomLimit-root.camera.position.z/1000)+1;
                p.x      = bp.b * persepective + stage.centerX;
                p.y      = zp.a * persepective + stage.centerY;
                var weight  = persepective*100;

                ctx.globalAlpha = 1-progress;
                ctx.lineWidth   = weight;
                // ctx.fillRect(p.x, p.y, weight, weight);
                ctx.lineTo(p.x,p.y);
                ctx.stroke();
                ctx.fill();
                ctx.restore();


                ctx.save();
                ctx.lineCap     = 'round'
                ctx.strokeStyle = '#62f3ff';
                ctx.fillStyle   = '#62e3d4';
                ctx.beginPath();

                // var id = (progress*500).toFixed(0);
                // if(id>0){
                //     ctx.moveTo(line.spline[id-1].x,line.spline[id-1].y);
                // }else{
                //     ctx.moveTo(line.spline[id].x,line.spline[id].y);
                // }
                // console.log(line.spline[id].x,line.spline[id].y);
                // ctx.lineTo(line.spline[id].x,line.spline[id].y);
                // ctx.fillRect(line.spline[id].x,line.spline[id].y, weight, weight);
                // ctx.stroke();
                // ctx.restore();


                


            }
            // this.position.x = (progress*100);
            // this.position.z = (0+progress*100);

            // var p    = this.position;
            // var oldP = this.oldPos;
            // var ap  = applyRotation(p.x,  p.y,root.camera.rotation.z);// ab = xy
            // var zp  = applyRotation(ap.b,  p.z,root.camera.rotation.x);// ab = yz
            // var bp  = applyRotation(zp.b, ap.a,root.camera.rotation.y);// ab = zx
            
            // var persepective = root.camera.focus / ( root.camera.focus + bp.a ) * (root.camera.zoomLimit-root.camera.position.z/1000)+1;
            // if(persepective<0)persepective=0;

            // var dis     = (root.camera.position.z-p.z)/root.camera.near;
            // var px      = bp.b * persepective + stage.centerX;
            // var py      = zp.a * persepective + stage.centerY;
            // var weight  = persepective*3;
            // var alpha   = Math.max(dis,0);
            // if(alpha == 0)return;

            // // if( px < -100 || px > 565 || py < -100 || py > 565 ) continue;
            
            // var sx = cloudSize.width*weight+dis*0,
            //     sy = cloudSize.height*weight+dis*0;

            // console.log(px,py,weight);
            // ctx.save();
            // ctx.globalAlpha = this.opacity;
            // ctx.strokeStyle = '#ff0000';
            // // ctx.fillRect(px, py, weight, weight);
            // ctx.beginPath();
            // ctx.moveTo(this.oldP.x,this.oldP.y);
            // ctx.lineTo(px,py);
            // ctx.stroke();
            // ctx.fill();
            // ctx.restore();
        }



        function applyRotation(a,b,rot){
            return {
                a:( Math.cos(rot)*a - Math.sin(rot)*b ),
                b:( Math.sin(rot)*a + Math.cos(rot)*b )
            };
        }


        this.init();
        return this;

    } // end Lines Class

    Lines.prototype.constructor = Lines;
    this.Lines = Lines;


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

    function spline (p, interpolate) {
        var num = p.length;
        var l = [];
        var _A = [];
        var _B = [];
        var _C = [];

        for (i=0; i < num-1; i++) {
            var p0 = p[i];
            var p1 = p[i+1];
            l[i] = Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y));
        }

        _A[0] = [0, 1, 0.5];
        _B[0] = {
            x:(3 / (2 * l[0])) * (p[1].x - p[0].x),
            y:(3 / (2 * l[0])) * (p[1].y - p[0].y)
        };
        _A[num-1] = [1, 2, 0];
        _B[num-1] = {
            x:(3 / l[num - 2]) * (p[num - 1].x - p[num - 2].x),
            y:(3 / l[num - 2]) * (p[num - 1].y - p[num - 2].y)
        };

        for (i=1; i < num-1; i++) {
            var a = l[i-1];
            var b = l[i];
            _A[i] = [b, 2.0 * (b + a), a];
            _B[i] = {
                x:(3.0 * (a * a * (p[i + 1].x - p[i].x)) + 3.0 * b * b * (p[i].x - p[i - 1].x)) / (b * a),
                y:(3.0 * (a * a * (p[i + 1].y - p[i].y)) + 3.0 * b * b * (p[i].y - p[i - 1].y)) / (b * a)
            };
        }
        for (i=1; i < num; i++) {
            var d = _A[i-1][1] / _A[i][0];

            _A[i] = [0, _A[i][1]*d-_A[i-1][2], _A[i][2]*d];
            _B[i].x = _B[i].x * d - _B[i - 1].x;
            _B[i].y = _B[i].y * d - _B[i - 1].y;

            _A[i][2] /= _A[i][1];
            _B[i].x /= _A[i][1];
            _B[i].y /= _A[i][1];
            _A[i][1] = 1;
        }

        _C[num-1] = {x:_B[num-1].x, y:_B[num-1].y};
        for (j=num-1; j > 0; j--) {
            _C[j-1] = {
                x:_B[j - 1].x-_A[j - 1][2] * _C[j].x,
                y:_B[j - 1].y-_A[j - 1][2] * _C[j].y
            };
        }

        var out = [];
        count = 0;
        for (i=0; i < num-1; i++) {
            var a = l[i];
            var _00 = p[i].x;
            var _01 = _C[i].x;
            var _02 = (p[i + 1].x - p[i].x) * 3 / (a * a) - (_C[i + 1].x + 2 * _C[i].x) / a;
            var _03 = (p[i + 1].x - p[i].x) * (-2/(a * a * a)) + (_C[i + 1].x + _C[i].x) * (1 / (a * a));
            var _10 = p[i].y;
            var _11 = _C[i].y;
            var _12 = (p[i + 1].y - p[i].y) * 3 / (a * a) - (_C[i + 1].y + 2 * _C[i].y) / a;
            var _13 = (p[i + 1].y - p[i].y) * (-2/(a * a * a)) + (_C[i + 1].y + _C[i].y) * (1 / (a * a));

            var t = 0;
            for (j=0; j < interpolate; j++) {
                out[count] = {
                    x: ((_03 * t + _02) * t + _01) * t + _00,
                    y: ((_13 * t + _12) * t + _11) * t + _10
                };
                count++;
                t += a / interpolate;
            }
        }
        out[count] = {
            x: p[num-1].x,
            y: p[num-1].y
        };

        var result = [];
        for (i=0; i < num-1; i++) {
            result[i] = out.slice(i * interpolate, (i + 1) * interpolate+1)
        }
        result.push([out[out.length-1]]);

        return result;
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
