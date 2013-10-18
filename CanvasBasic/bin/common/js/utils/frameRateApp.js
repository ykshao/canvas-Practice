/**
 * @author PILSSALGI
 * 2012.02.24
 */


/**
 * FrameRate App
 * 
 * ###How To Use ############################
 *  var frame   = new FrameRateApp(10);
 *  frame.setFR(50);
 *  setInteval(function, frame.getInteval());
 */

function FrameRateApp(frameRate)
{
    this.frame         = frameRate;
    this.setFRAME      = function(frameRate){this.frame = frameRate};
    this.getFRAME      = function(){return this.frame};
    this.getInteval    = function(){return 1000/this.frame};
}