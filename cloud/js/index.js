// (function(){
// /* ******************************************************************************************
//     LOADING
// ****************************************************************************************** */
//     var mod,modCSSAnimations,modCSSTransforms,modCSSTransitions,modTouch,modAnim;

//     $(document).ready(function(){
//         mod = window.Modernizr;
//         modCSSAnimations  = mod && mod.cssanimations;
//         modCSSTransforms  = mod && mod.csstransforms;
//         modCSSTransitions = mod && mod.csstransitions;
//         modTouch          = mod && mod.touch;
//         modAnim           = modCSSTransforms && modCSSTransitions;

//         setup();
//         addEvent();
//     });

// /* ******************************************************************************************
//     Initialize    
// ****************************************************************************************** */
//     var stage = WindowSize();
//     var cloud,line;
//     var cloudeOffset = { z: 100000 };
// /* ******************************************************************************************
//     SETUP    
// ****************************************************************************************** */
//     var renderID;
//     var scroll,scrollPossible = false;
//     var sceneM;
//     function setup(){
//         console.log('asd')
//         var canvas  = $('<canvas width="'+stage.width+'" height="'+stage.height+'">').css({position:'absolute'}).appendTo(cloudContainer);
//         var ctx     = canvas[0].getContext( '2d' );

//         cloud = new Cloud(ctx);
//         cloud.camera.position.z = cloudeOffset.z;
//         // cloud.camera.zoomLimit = limitZ.max/1000;
//         cloud.update();

//         sceneM = new Scenes({stats:1});
//         $(sceneM).bind(sceneM.EVENT_DELETE_SCROLL, scrollDel);
//         sceneSetup();

//         scroll = new Scroll({
//             target      : 'body',
//             speed       : 2,
//             stats       : 0,
//             friction    : 0.94,
//             touchSpeed  : 5,
//             scrollLimit : 10,
//             type        : 'wheel',
//             screenFix   : true,
//             step        : onScroll
//         });

//         // TweenLite.to(cloudeOffset,5,{p:1,ease:Expo.easeInOut,onUpdate:onUpdate,onComplete:onComplete});

//         renderID = requestAnimationFrame(render);
//     }

//     function onComplete(){
//         scrollPossible = true;
//         sceneM.gotoScene(1,{duration:0});
//     }

//     function onUpdate(){
//         cloudMove(cloudeOffset.p);
//     }

    
//     var render = function(){
//         renderID = requestAnimationFrame(render);
//         cloud.update();
//         // if(line)line.update();
//     }

//     function cloudMove(progress){
//         // cloudeOffset.scene1Alpha    = progress*progress*progress;
//         // cloudeOffset.z              = (1-progress)*limitZ.max;
//         // cloud.camera.position.z     = cloudeOffset.z;
//     }

//     function valueAdjust(value,offset,min,max,sp){
//         value += offset;
//         if(value < min)value += (min-value)*sp;
//         if(value > max)value += (max-value)*sp;
//         return value;
//     }
//  ******************************************************************************************
//     FUNCTION
// ****************************************************************************************** 
//     var sceneMoveDuration = 2;
//     function sceneSetup(){
//         sceneM.addScene(0,1000,'normal',{ease:'easeInOutBack',duration:5000});//intro
        

//         sceneM.addSceneActor(0,function(p){
//             // cloudeOffset.z = 3000-p*10000;
//             // cloud.camera.position.z = cloudeOffset.z;
//         })
//     }
// /* ******************************************************************************************
//     EVENT & EVENT HANDLER    
// ****************************************************************************************** */
//     function addEvent(){
//         $(window).bind("resize",onResize);
//         $(window).bind("keydown", onKeydown);
//         $(window).trigger("resize");
//     }

//     function onResize(){
//         stage = WindowSize();
//     }

//     function onKeydown(e){
//         switch(e.keyCode){
//             case 38 : e.preventDefault(); onKeyScrollControl(1); break;
//             case 40 : e.preventDefault(); onKeyScrollControl(-1); break;
//         }
//     }

//     function onKeyScrollControl(delta){
//         for(var i=0; i<10; i++){
//             if(scroll)scroll.onWheel({},delta);
//         }
//     }

//     function onScroll(offset){
//         sceneM.update(offset);

//         cloudeOffset.z += offset*10;
//         cloud.camera.position.z = cloudeOffset.z;

//         console.log(cloudeOffset.z)
//         // cloudeOffset.scene1Alpha    = progress*progress*progress;
//         // cloudeOffset.z              = offset//(1-progress)*limitZ.max;
//         // cloud.camera.position.z     = offset//cloudeOffset.z;
//     }

//     function scrollDel(){
//         if(scroll)scroll.stopRender();
//     }


// /* ******************************************************************************************
//     ETC
// ****************************************************************************************** */
//     function WindowSize(){
//         var size = { width:0,height:0};
//         if (document.documentElement.clientHeight) {
//             size.width = document.documentElement.clientWidth;
//             size.height = document.documentElement.clientHeight;
//         } else if (document.body.clientHeight) {
//             size.width = document.body.clientWidth;
//             size.height = document.body.clientHeight;
//         } else if (window.innerHeight) {
//             size.width = window.innerWidth;
//             size.height = window.innerHeight;
//         }
//         return size;
//     }

//     function cssTransition(duration,easing){
//         var css = duration +'s '+easing;
//         return {
//             "-webkit-transition" : css,
//             // "-moz-transition"    : css,
//             // "-o-transition"      : css,
//             // "-ms-transition"     : css,
//             "transition"         : css
//         }
//     }

//     function transitionDR(duration){
//         return {
//             "-webkit-transition-duration" : duration+'s',
//             "-moz-transition-duration"    : duration+'s',
//             "-o-transition-duration"      : duration+'s',
//             "-ms-transition-duration"     : duration+'s',
//             "transition-duration"         : duration+'s'
//         }
//     }

// }).call(this);


if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;
var camera, scene, renderer;
var mesh, geometry, material;

var clouds = 1;
var mouseX = 0, mouseY = 0;
var start_time = Date.now();

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
setup();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // Bg gradient

    var canvas = document.createElement( 'canvas' );
    canvas.width = 32;
    canvas.height = window.innerHeight;

    var context = canvas.getContext( '2d' );

    var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
    gradient.addColorStop(0, "#1e4877");
    gradient.addColorStop(0.5, "#4584b4");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
    container.style.backgroundSize = '32px 100%';

    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
    camera.position.z = clouds;

    scene       = new THREE.Scene();
    geometry    = new THREE.Geometry();

    var texture = THREE.ImageUtils.loadTexture( 'images/cloud10.png', null, animate );
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;


    var fog = new THREE.Fog( 0xffffff, 0, clouds );

    material = new THREE.ShaderMaterial( {

        uniforms: {
            "map": { type: "t", value: texture },
            "fogColor" : { type: "f", value: fog.color },
            "fogNear" : { type: "f", value: fog.near },
            "fogFar" : { type: "f", value: fog.far },
        },
        vertexShader: document.getElementById( 'vs' ).textContent,
        fragmentShader: document.getElementById( 'fs' ).textContent,
        depthWrite: false,
        depthTest: false,
        transparent: true

    } );

    var plane = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ) );


    var textTexture1    = THREE.ImageUtils.loadTexture( 'images/text1.png');
    var material1       = new THREE.MeshPhongMaterial( { color: 0xffffff, map: textTexture1 } );
    var geometry1       = new THREE.PlaneGeometry( 1, 1 );
    var mesh1           = new THREE.Mesh( geometry1, material1 );
    
    // textTexture1.anisotropy = maxAnisotropy;
    // textTexture1.wrapS = textTexture1.wrapT = THREE.RepeatWrapping;
    // textTexture1.repeat.set( 512, 512 );
    // mesh1.rotation.x = - Math.PI / 2;
    // mesh1.scale.x = mesh1.scale.y = 10;

    // mesh1.position.z = 8000+100;
    // scene.add(mesh1)
// 

    for ( var i = 0; i < clouds; i++ ) {

        plane.position.x = Math.random() * 1000 - 500;
        plane.position.y = -Math.random() * Math.random() * 200 - 15;
        plane.position.z = i;
        plane.rotation.z = Math.random() * Math.PI;
        plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 1;
        THREE.GeometryUtils.merge( geometry, plane );
    }


    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    mesh = new THREE.Mesh( geometry, material );
    mesh.position.z = -clouds;
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );

}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) * 0.25;
    mouseY = ( event.clientY - windowHalfY ) * 0.15;
}

function onWindowResize( event ) {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function setup(){
    sceneM = new Scenes({stats:1});
    $(sceneM).bind(sceneM.EVENT_DELETE_SCROLL, scrollDel);
    // sceneSetup();

    scroll = new Scroll({
        target      : 'body',
        speed       : 2,
        stats       : 0,
        friction    : 0.94,
        touchSpeed  : 5,
        scrollLimit : 10,
        type        : 'wheel',
        screenFix   : true,
        step        : onScroll
    });

    // TweenLite.to(cloudeOffset,5,{p:1,ease:Expo.easeInOut,onUpdate:onUpdate,onComplete:onComplete});
}


function onScroll(offset){
    camera.position.z += offset;
    console.log('asd')
}

function scrollDel(){
    if(scroll)scroll.stopRender();
}

function animate() {

    requestAnimationFrame( animate );

    position = ( ( Date.now() - start_time ) * 0.03 ) % 8000;

    camera.position.x += ( mouseX - camera.position.x ) * 0.01;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.01;
    // camera.position.z += (-1000-camera.position.z)*0.01;

    renderer.render( scene, camera );

}
