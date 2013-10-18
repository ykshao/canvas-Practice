/**
 * @author shiftBrain DevJam
 * canvas groung ver1 
 * 2012.02.23
 */

//--------------------------------------------------------------------------------
// window loaded
//--------------------------------------------------------------------------------
function canvasStart(canvasID)
{
   if(canvasSupport){
       canvasApp(canvasID);
   }
}

//--------------------------------------------------------------------------------
// canvas support ture ? false
//--------------------------------------------------------------------------------
function canvasSupport(){
    return Modernizr.canvas
}

function canvasApp(canvasID)
{
    // ---------------------------------------------------------------------------
    // Common Variables ----------------------------------------------------------
    
    var sw;     // window Width
    var sh;     // window height 
    
    var cvs;    // canvas
    var ctx;    // canvas context
    var resize  = false; // canvas resize function true / false
    var frame   = new FrameRateApp(30); //bin/common/js/utils/frameRateApp.js
    var timer   = new Timer(); //bin/common/js/utils/timerApp.js
    
    //Debugger.log(frame.getInteval());
    //Debugger.log(frame.getFRAME());
    
    
    cvs     = document.getElementById(canvasID);
    ctx     = cvs.getContext("2d");
    resize  = true;
    canavsResize(800,600);
    
    // ---------------------------------------------------------------------------
    // canvas resize -------------------------------------------------------------
    // ## HOW TO USE ##
    // canavsResize()       --> window Size Setting
    // canavsResize(10,10)  --> width=10 height=10 canvas size setting
    // ---------------------------------------------------------------------------
    
    //window.addEventListener("resize",canavsResize, false);
    function canavsResize(w,h){
        sw = WindowSize.width();  //bin/common/js/utils/getSize.js
        sh = WindowSize.height();       
        Debugger.log("resizeEvent="+sw+"x"+sh);
        if(!w || !h){
            if(cvs && resize){
                cvs.width  = sw;
                cvs.height = sh;
            }
        }else{
            if(cvs){
                cvs.width  = w;
                cvs.height = h;
            }
        }
        Debugger.log("canvasSize="+cvs.width+"x"+cvs.height);
    }
    
    //cvs.onmousedown = mouseDownEvent;
    cvs.onmousemove = mouseDownEvent;
// ***************************************************************************
// Code main ***********************************************************
// ここから　変数と関数は　気に入るように変更してもいいです。
    
    var tx = 0;
    var ty = 0;
    var g;
    var n;
    var flys = [];
    var fly;
    var spring = 1;
    var friction = 0.5;
    
    var FlyObj = function(){
        this.x      = 0;
        this.y      = 0;
        this.color = "rgba(255, 255, 255, 1)";
    };
    
    FlyObj.prototype = {
        update : function(){
            
        }
        ,
        draw : function(){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,1,1);
        }
    }
    
    function mouseDownEvent(e){
        tx = e.layerX;
        ty = e.layerY;
    }
    
    function setup()
    {
        ctx.fillStyle = "rgba(0, 0, 0, .1)";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        
        n = 1//cvs.width * 3;
        
        for(var i=0; i<n; i++){
            fly     = new FlyObj();
            fly.id  = i;
            fly.x   = i%cvs.width;
            fly.y   = Math.floor(i/cvs.width);
            flys.push(fly);
            //Debugger.log(flys);
        }
    }
    
    function main()
    {
       update();
       draw();
    }
    
    function update()
    {
        for(var i=0; i<n; i++){
            fly = flys[i];
            fly.update()
       }
    }
    
    function draw()
    {
       ctx.fillStyle = "rgba(0, 0, 0, .4)";
       ctx.fillRect(0,0,cvs.width,cvs.height);
       
       for(var i=0; i<n; i++){
           fly = flys[i];
           fly.draw();
       }
    }
    
   
   
   
   
   
    //---------------------------------------------------------------------------
    // rendering Setting ---------------------------------------------------------
    setup();
    frame.setFRAME(60);    
    timer.start(main,frame.getInteval());
    //setTimeout(timer.stop,3000)
    
    
}






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
    fillRect()
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
    lineWidth
    miterLimit
    shadowBlur
    shadowColor
    shadowOffsetX
    shadowOffsetY
    strokeStyle
    textAlign
    textBaseline
 */

    
    
  
   






