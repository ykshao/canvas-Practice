/**
 * @author PILSSALGI
 * 2012.01.30
 */

var Debugger = function(){};
Debugger.log = function(message){
    try{
        console.log(message);
    }catch(exception){
        return;
    }
}
