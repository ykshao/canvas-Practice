(function(){
    var _bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
    /* ************************************************************
        Plane
    ************************************************************ */
    var Plane = function(container){
        var root = this;

        this.cssPlane        = {
            position            : 'relative',
            width               : 82,
            height              : 82,
            color               : '#000',
            padding             : 6,
            left                : 0,
            top                 : 0,
            overflow            : 'hidden',
            float               : 'left',
            'min-width'         : 10,
            'min-height'        : 10
        }

        this.cssPlaneOutside = {
            width               : '100%',
            height              : '100%',
            'background-color'  : "#c7f2da",
            overflow            : 'hidden'
        }

        this.cssPlaneInside = {
            width               : '100%',
            height              : '100%'
        }

        this.minSize    = { width : 82, height:82 };
        this.ratio      = { width : 1, height: 1 };
        this.width      = this.minSize.width;
        this.height     = this.minSize.height;

        function init(){
            if(typeof container != 'null'){
                root.plane = $('<div class="plane"></div>').appendTo($(container));
                root.outside = $('<div class="plane-outside"></div>').appendTo(root.plane);
                root.inside = $('<div class="plane-inside"></div>').appendTo(root.outside);

                root.plane.css(root.cssPlane);
                root.outside.css(root.cssPlaneOutside);
                root.inside.css(root.cssPlaneInside);

                root.plane.addClass('box-sizing');
            }
        }


        init();
        return this;
    }

    Plane.prototype.position = function(left,top){
         if(typeof left != 'null'){
            this.cssPlane.left = left;
            this.applyCSS(this.plane,{left:this.cssPlane.left});
        }
        if(typeof top != 'null'){
            this.cssPlane.top = top;
            this.applyCSS(this.plane,{top:this.cssPlane.top});
        }
    }

    Plane.prototype.size = function(width,height){
        if(typeof width != 'null'){
            this.cssPlane.width = width;
            this.applyCSS(this.plane,{width:this.cssPlane.width});
        }
        if(typeof height != 'null'){
            this.cssPlane.height = height;
            this.applyCSS(this.plane,{height:this.cssPlane.height});
        }
    }

    Plane.prototype.applyCSS = function(tg,css){
        tg.css(css);
    }

    Plane.prototype.constructor = Plane;


    /* ************************************************************
        Grid
    ************************************************************ */

    var Grid = function(container,matrix){
        if(typeof container == "null")return;
        this.wrap           = $(container);
        this.matrix         = [
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                              ];
        if(matrix)$.extend(this.matrix,matrix);
        console.log(this.matrix);
        this.maxMatrix      = { row : 17,  col : 10 , total : function(){ return this.row*this.col }};
        this.planeSize      = { width : 82, height : 82, ratio_width: 100, ratio_height:100 };

        this.onResize = _bind(this.onResize,this);
        $(window).on('resize',this.onResize);
        $(window).trigger('resize');


        this.makePlane();
    }

    Grid.prototype.constructor = Grid;
    Grid.prototype.makePlane = function(){
        for(var i=0, n1 = this.maxMatrix.col; i<n1; i++){
            for(var j=0, n2 = this.maxMatrix.row; j<n2; j++){
                var plane   = new Plane(this.wrap),
                    left    = this.planeSize.width * j,
                    top     = this.planeSize.height * i,
                    width   = this.planeSize.ratio_width,
                    height  = this.planeSize.ratio_height;
                plane.size(width+'%',height+'%');
                plane.inside.text(this.matrix[i][j])
            }
        }
    };
    Grid.prototype.onResize = function(e){
        this.planeSize.width    = this.wrap.width()/this.maxMatrix.row;
        this.planeSize.height   = this.wrap.height()/this.maxMatrix.col;
        this.planeSize.ratio_width = this.planeSize.width/this.wrap.width()*100;
        this.planeSize.ratio_height = this.planeSize.height/this.wrap.height()*100;
    }


    this.Plane  = Plane;
    this.Grid   = Grid;
}).call();