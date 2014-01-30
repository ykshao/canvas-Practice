(function(){

    lexusMagazineOnLoad = function(){ // loading complete
    }

    lexusMagazineReady = function(){ // loading wrap animation complete
        // init();
    }

    $(document).ready(function(){
        init();
        addEvent();
    });


    var $plane_wrap;

    var grid_matrix1 = [
                        [1,1,1,1,1,1,2,2,2,2,6,6,8,8,8,8,8],
                        [1,1,1,1,1,1,2,2,2,2,6,6,8,8,8,8,8],
                        [1,1,1,1,1,1,2,2,2,2,6,6,8,8,8,8,8],
                        [1,1,1,1,1,1,2,2,2,2,7,7,8,8,8,8,8],
                        [1,1,1,1,1,1,2,2,2,2,7,7,8,8,8,8,8],
                        [1,1,1,1,1,1,2,2,2,2,7,7,8,8,8,8,8],
                        [3,3,3,4,4,4,5,5,5,5,5,5,8,8,8,8,8],
                        [3,3,3,4,4,4,5,5,5,5,5,5,9,9,9,9,9],
                        [3,3,3,4,4,4,5,5,5,5,5,5,9,9,9,9,9],
                        [3,3,3,4,4,4,5,5,5,5,5,5,9,9,9,9,9]
                       ];
    function init(){    
        $plane_wrap = $('#plane-wrap');
        var grid = new Grid('#plane-wrap-inside',grid_matrix1);
    }


    var windowSize = {}
    function addEvent(){
        $(window).on('resize',onResize);
        $(window).trigger('resize');
    }

    function onResize(){
        windowSize = WindowSize();
    }


    WindowSize = function(){
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
        return size;
    }

}).call(this);



