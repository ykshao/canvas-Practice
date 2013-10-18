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
    var frame   = new FrameRateApp(10); //bin/common/js/utils/frameRateApp.js
    var timer   = new Timer(); //bin/common/js/utils/timerApp.js
    
    //Debugger.log(frame.getInteval());
    //Debugger.log(frame.getFRAME());
    
    
    cvs     = document.getElementById(canvasID);
    ctx     = cvs.getContext("2d");
    resize  = false;
    canavsResize();
    
    // ---------------------------------------------------------------------------
    // canvas resize -------------------------------------------------------------
    // ## HOW TO USE ##
    // canavsResize()       --> window Size Setting
    // canavsResize(10,10)  --> width=10 height=10 customer size setting
    // ---------------------------------------------------------------------------
    
    window.addEventListener("resize",canavsResize, false);
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
    
// ***************************************************************************
// Code main ***********************************************************
    // ここから　変数と関数は　気に入るように変更してもいいです。
    
    function setup(){
       
    }
    
    function main(){
        update();
        draw();
    }
    
    function update()
    {
        
    }
    
    function draw()
    {
       
    }
    
// ---------------------------------------------------------------------------
// rendering Setting ---------------------------------------------------------
    setup();
    frame.setFRAME(30);    
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

    
    
  
   






