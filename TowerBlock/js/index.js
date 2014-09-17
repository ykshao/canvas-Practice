(function(){
    $(document).ready(function(){
        init();
    });


    var tb,towerBlockObject,land,chr,lights,hammer,block;

    function init(){
        tb      = new TowerBlock();
        new Lights(tb);
        new Land(tb);
        new Floor(tb);
        new Block(tb);
        // new Hammer(tb);

        $('body').on('click',function(){
            if(isFullScreen()){
                // $('#instructions').fadeIn();
            }else{
                $('#instructions').fadeOut();
                requestFullScreen(document.documentElement);
                tb.controls.enabled = true;
            }
        })


        var bird = new Bird(tb,new THREE.Vector3(0,100,0),100);
            bird.load();

        var gui = new dat.GUI();

        // var gData   = gui.addFolder('gravity');
        //     gData.add(tb, 'gx', -100, 100);
        //     gData.add(tb, 'gy', -100, 100);
        //     gData.add(tb, 'gz', -100, 100);

        // var cameraDat   = gui.addFolder('camera');
        //     cameraDat.add(tb, 'cameraPosX', -1000, 1000);
        //     cameraDat.add(tb, 'cameraPosY', -1000, height*2);
        //     cameraDat.add(tb, 'cameraPosZ', -1000, 1000);
        //     cameraDat.add(tb, 'cameraRotX', 0, 360);
        //     cameraDat.add(tb, 'cameraRotY', 0, 360);
        //     cameraDat.add(tb, 'cameraRotZ', 0, 360);

        // var worldDat     = gui.addFolder('world');
        //     worldDat.add(tb, 'posX', -1000, 1000);
        //     worldDat.add(tb, 'posY', -1000, 1000);
        //     worldDat.add(tb, 'posZ', -1000, 1000);
        //     worldDat.add(tb, 'rotX', -360, 360);
        //     worldDat.add(tb, 'rotY', -360, 360);
        //     worldDat.add(tb, 'rotZ', -360, 360);


        // var landDat     = gui.addFolder('land');
        //     landDat.add(land, 'posX', -10000, 10000);
        //     landDat.add(land, 'posY', -10000, 10000);
        //     landDat.add(land, 'posZ', -10000, 10000);
        //     landDat.add(land, 'rotX', -360, 360);
        //     landDat.add(land, 'rotY', -360, 360);
        //     landDat.add(land, 'rotZ', -360, 360);

    }

    // skybox
    var sbMaterials = [],
        sbPath      = "asset/img/texture/NiagaraFalls3/",                       
        sbFNames    = ["posx", "negx", "posy", "negy", "posz", "negz"];
    
    var bullet_geo;     
    
    //UI    
    var title, startBtn, timeLine;
    var loadCnt = 0, loadedCnt = 0;

    //CONTENTS LOAD
    function contentLoad(){
    }
    
    function loadedUpdate(){
        //content Loaded
        if(loadCnt == loadedCnt){
            setup();
            // addEvent();
            // requestAnimationFrame(rendering);
            
            // UI 
            // $("#startBtn").find("img").attr("src","asset/img/start_btn_over.png");
            // $("#startBtn").css("cursor" , "pointer").click(gameStart);
            
        }
    }

}).call(this);

function isFullScreen()
{
    return (document.fullScreenElement && document.fullScreenElement !== null)
         || document.mozFullScreen
         || document.webkitIsFullScreen;
}


function requestFullScreen(element)
{
    if (element.requestFullscreen)
        element.requestFullscreen();
    else if (element.msRequestFullscreen)
        element.msRequestFullscreen();
    else if (element.mozRequestFullScreen)
        element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
}

function exitFullScreen()
{
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();
    else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();

}

function toggleFullScreen(element)
{   
    if (isFullScreen())cancelFullScreen();
    else requestFullScreen(element || document.documentElement);
}

            