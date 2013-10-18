/**
 * @author PILSSALGI
 * 2012.02.24
 */


/**
 * FrameRate App
 * 
 * ###How To Use ############################
 *  var timer   = new intervarApp();
 *  timer.start(function,interval);
 *  timer.stop();
 */

function Timer(){
    var timer;
    this.start  = function(func,interval){
        timer   = setInterval(func,interval);
        Debugger.log("intervalStart");
    }
    this.stop   = function(){
        clearInterval(timer);
        Debugger.log("intervalStop");
    }
}
