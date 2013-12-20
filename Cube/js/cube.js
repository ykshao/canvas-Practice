/**
 * 2013.12.16
 * css3 Cube
 * make by heowongeun
 */

(function(){
    CUBE = function(wrap,planes,size,option){
        this.wrap   = wrap;
        this.parent = $(wrap.parent());
        this.planes = {
            front   : undefined,
            back    : undefined,
            left    : undefined,
            right   : undefined,
            top     : undefined,
            bottom  : undefined
        }
        this.size = { width : 100 , height : 100, depth: 100 };
        this.info = {
            rotateX : 0,
            rotateY : 0,
            z : 0,
            x : 0,
            y : 0
        };


        this.option = {
            perspective : 1000
        }

        this.direction = ''

        $.extend(this.planes,planes);
        $.extend(this.size,size);


        this.init = function(){
            this.parent.css(cssPerspective(this.option.perspective));
            this.wrap.css(cubeInitCss());
            // for(var o in this.planes){
                // this.planes[o].css(css);
            // }

            this.sizeChange();
        }
/* ****************************************************************************************************************
    
**************************************************************************************************************** */
        this.getPlanes = function(){            
            return this.planes;
        }

        this.getInfo = function(){
            return this.info;
        }

        this.sizeChange = function(size){
            $.extend(this.size,size);
            if(this.size.width == this.size.depth)this.direction = 'horizon';
            if(this.size.height == this.size.depth)this.direction = 'vertical';
            for(var o in this.planes){
                var css     = { width : this.size.width, height : this.size.height, depth: this.size.depth, position:'absolute'},
                    side    = (this.size.width-this.size.depth)*0.5,
                    top     = (this.size.height-this.size.depth)*0.5;

                switch(o){
                    case 'front'    : $.extend(css,planCSS(0,0,this.size.depth*0.5)); break;
                    case 'back'     : if(this.direction == 'vertical')$.extend(css,planCSS(-180,0,this.size.depth*0.5));
                                      if(this.direction == 'horizon')$.extend(css,planCSS(0,180,this.size.depth*0.5));
                                      break;
                    case 'left'     : $.extend(css,planCSS(0,-90,this.size.width*0.5)); css.left=side; css.width=this.size.depth; break;
                    case 'right'    : $.extend(css,planCSS(0,90,this.size.width*0.5)); css.left=side; css.width=this.size.depth; break;
                    case 'top'      : $.extend(css,planCSS(90,0,this.size.height*0.5)); css.top=top; css.height=this.size.depth; break;
                    case 'bottom'   : $.extend(css,planCSS(-90,0,this.size.height*0.5)); css.top=top; css.height=this.size.depth; break;
                }
                this.planes[o].css(css);
            }

            this.info.z = -this.size.depth*0.5;
            var wrapCSS = $.extend({},this.size);
            //center
            wrapCSS['margin-left'] = -this.size.width*0.5;
            wrapCSS['margin-top'] = -this.size.height*0.5;
            this.wrap.css(wrapCSS);
            this.wrap.css(planCSS2(this.info.rotateX,this.info.rotateY,this.info.z));
        }

/* ****************************************************************************************************************
    CUBE ROTATE
**************************************************************************************************************** */

        this.rolling = function(x){
            var o = this.info;
            o.rotateX = x;
            this.wrap.css(planCSS2(o.rotateX,o.rotateY,o.z));
        }

        this.pitching = function(y){
            var o = this.info;
            o.rotateY = y;
            this.wrap.css(planCSS2(o.rotateX,o.rotateY,o.z));
        }


/* ****************************************************************************************************************
    CSS FUNCTION
**************************************************************************************************************** */

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

        function cubeInitCss(){
            var css = "preserve-3d"
            return {
                "-webkit-transform-style" : css,
                "-moz-transform-style"    : css,
                "-ms-transform-style"     : css,
                "transform-style"         : css
            }
        }

        function cssPerspective(value){
            var css = value+'px';
            return{
                "-webkit-perspective" : css,
                "-moz-perspective"    : css,
                "-ms-perspective"     : css,
                "perspective"         : css
            }
        }

        // -webkit-perspective  : 1000px;
        // -webkit-transform-origin : 50% 50%;

        this.init();
        return this;
    }

    CUBE.prototype.constructor = CUBE;
    this.CUBE = CUBE;
}).call(this);