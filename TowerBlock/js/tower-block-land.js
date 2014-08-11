(function(){
    $(document).ready(function(){
        init();
    });

    var tb,towerBlockObject,land,chr,lights;

    function init(){
        tb          = new TowerBlock();
        chr         = new Character(tb);
        land        = new Land(tb);
        lights      = new Lights(tb);

        var gui = new dat.GUI();

        var cameraDat   = gui.addFolder('camera');
            cameraDat.add(tb, 'cameraPosX', -1000, 1000);
            cameraDat.add(tb, 'cameraPosY', -1000, 1000);
            cameraDat.add(tb, 'cameraPosZ', -1000, 1000);
            cameraDat.add(tb, 'cameraRotX', 0, 360);
            cameraDat.add(tb, 'cameraRotY', 0, 360);
            cameraDat.add(tb, 'cameraRotZ', 0, 360);

        var worldDat     = gui.addFolder('world');
            worldDat.add(tb, 'posX', -1000, 1000);
            worldDat.add(tb, 'posY', -1000, 1000);
            worldDat.add(tb, 'posZ', -1000, 1000);
            worldDat.add(tb, 'rotX', -360, 360);
            worldDat.add(tb, 'rotY', -360, 360);
            worldDat.add(tb, 'rotZ', -360, 360);


        var landDat     = gui.addFolder('land');
            landDat.add(land, 'posX', -10000, 10000);
            landDat.add(land, 'posY', -10000, 10000);
            landDat.add(land, 'posZ', -10000, 10000);
            landDat.add(land, 'rotX', -360, 360);
            landDat.add(land, 'rotY', -360, 360);
            landDat.add(land, 'rotZ', -360, 360);

        // var blocker = document.getElementById( 'blocker' );
        //     var instructions = document.getElementById( 'instructions' );

        //     var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        //     if ( havePointerLock ) {

        //         var element = document.body;

        //         var pointerlockchange = function ( event ) {

        //             if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

        //                 controls.enabled = true;

        //                 blocker.style.display = 'none';

        //             } else {

        //                 controls.enabled = false;

        //                 blocker.style.display = '-webkit-box';
        //                 blocker.style.display = '-moz-box';
        //                 blocker.style.display = 'box';

        //                 instructions.style.display = '';

        //             }

        //         }

        //         var pointerlockerror = function ( event ) {
        //             instructions.style.display = '';
        //         }

        //         // Hook pointer lock state change events
        //         document.addEventListener( 'pointerlockchange', pointerlockchange, false );
        //         document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
        //         document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

        //         document.addEventListener( 'pointerlockerror', pointerlockerror, false );
        //         document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
        //         document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

        //         instructions.addEventListener( 'click', function ( event ) {
        //             instructions.style.display = 'none';

        //             // Ask the browser to lock the pointer
        //             element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        //             if ( /Firefox/i.test( navigator.userAgent ) ) {

        //                 var fullscreenchange = function ( event ) {

        //                     if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

        //                         document.removeEventListener( 'fullscreenchange', fullscreenchange );
        //                         document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

        //                         element.requestPointerLock();
        //                     }

        //                 }

        //                 document.addEventListener( 'fullscreenchange', fullscreenchange, false );
        //                 document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

        //                 element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

        //                 element.requestFullscreen();

        //             } else {

        //                 element.requestPointerLock();

        //             }

        //         }, false );

        //     } else {

        //         instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

        //     }

    }
}).call(this);

            