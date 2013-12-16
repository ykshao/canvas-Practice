/**
 * 2013.12.16
 * css3 Cube
 * make by heowongeun
 */

(function(){
    CUBE = function(wrap,planes,size){
        this.wrap   = wrap;
        this.planes = {
            front   : undefined,
            back    : undefined,
            left    : undefined,
            right   : undefined,
            top     : undefined,
            bottom  : undefined
        }
        this.size = { width : 100 , height : 100 };
        this.info = {
            rotateX : 0,
            rotateY : 0,
            z : 0,
            x : 0,
            y : 0
        }

        $.extend(this.planes,planes);
        $.extend(this.size,size);

        this.init = function(){
            this.sizeChange();
        }

        this.sizeChange = function(size){
            $.extend(this.size,size);

            for(var o in this.planes){
                var css     = { width : this.size.width, height : this.size.height},
                    side    = Math.abs(this.size.width-this.size.height)*0.5,
                    diagonal = Math.sqrt( Math.pow(this.size.width, 2) + Math.pow(this.size.height, 2) );
                switch(o){
                    case 'front'    : $.extend(css,planCSS(0,0,this.size.width*0.5)); break;
                    case 'back'     : $.extend(css,planCSS(-180,0,this.size.width*0.5)); break;
                    case 'left'     : $.extend(css,planCSS(0,-90,this.size.width*0.5)); css.width = css.height; css.left = side; break;
                    case 'right'    : $.extend(css,planCSS(0,90,this.size.width*0.5)); css.width = css.height; css.left = side; break;
                    case 'top'      : $.extend(css,planCSS(90,0,this.size.width*0.5)); break;
                    case 'bottom'   : $.extend(css,planCSS(-90,0,this.size.width*0.5)); break;
                }
                console.log(o,css);
                this.planes[o].css(css);
            }

            this.info.z = -this.size.width;

            var wrapCSS = $.extend({},this.size);
            //center
            wrapCSS['margin-left'] = -this.size.width*0.5;
            wrapCSS['margin-top'] = -this.size.height*0.5;
            this.wrap.css(wrapCSS);
            this.wrap.css(planCSS2(this.info.rotateX,this.info.rotateY,this.info.z));
        }

        this.rolling = function(x){
            var o = this.info;
            o.rotateX = x;
            this.wrap.css(planCSS2(o.rotateX,o.rotateY,o.z));
        }

        this.pitching = function(y){
            var o = this.info;
            this.wrap.css(planCSS);
        }


        function planCSS(rx,ry,tz){
            var css3 = "rotateX("+rx+"deg) rotateY("+ry+"deg) translateZ("+tz+"px)";
            return {
                "-webkit-transform" : css3,
                "-moz-transform"    : css3,
                "-o-transform"      : css3,
                "-ms-transform"     : css3,
                "transform"         : css3
            }
        }

        function planCSS2(rx,ry,tz){
            var css3 = "translateZ("+tz+"px) rotateX("+rx+"deg) rotateY("+ry+"deg)";
            return {
                "-webkit-transform" : css3,
                "-moz-transform"    : css3,
                "-o-transform"      : css3,
                "-ms-transform"     : css3,
                "transform"         : css3
            }
        }

        this.init();
        return this;
    }

    CUBE.prototype.constructor = CUBE;
    this.CUBE = CUBE;
}).call(this);