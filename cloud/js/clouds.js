(function(){
    var Clouds = function(){
        var root = this;
        var container;
        var scene, renderer;
        var mesh, geometry, material;
        var mouseX = 0, mouseY = 0;
        var start_time = Date.now();
        var container;
        var mesh, geometry, material;

        var mouseX = 0, mouseY = 0;
        var start_time = Date.now();

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        this.camera;


        this.init = function(){
            // if ( ! Detector.webgl ) {
            //     Detector.addGetWebGLMessage();
            //     return;
            // }
            container = $('#cloudContainer');
            // console.log(container);
            // document.createElement( 'div' );
            // document.body.appendChild( container );

             // Bg gradient
            // var canvas = document.createElement( 'canvas' );
            // canvas.width = 32;
            // canvas.height = window.innerHeight;

            // var context = canvas.getContext( '2d' );

            // var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
            // gradient.addColorStop(0, "#1e4877");
            // gradient.addColorStop(0.5, "#4584b4");

            // context.fillStyle = gradient;
            // context.fillRect(0, 0, canvas.width, canvas.height);

            // container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
            // container.style.backgroundSize = '32px 100%';

            root.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
            // root.camera.position.z = 500;

            scene       = new THREE.Scene();
            geometry    = new THREE.Geometry();

            var texture = THREE.ImageUtils.loadTexture( 'images/cloud10.png', null, animate );
            texture.magFilter = THREE.LinearMipMapLinearFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;

            var fog = new THREE.Fog( 0xffffff, -100, 2000 );

            material = new THREE.ShaderMaterial( {

                uniforms: {

                    "map": { type: "t", value: texture },
                    "fogColor" : { type: "c", value: fog.color },
                    "fogNear" : { type: "f", value: fog.near },
                    "fogFar" : { type: "f", value: fog.far },

                },
                vertexShader: document.getElementById( 'vs' ).textContent,
                fragmentShader: document.getElementById( 'fs' ).textContent,
                depthWrite: false,
                depthTest: false,
                transparent: true

            } );

            var plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ) );

            for ( var i = 0; i < 500; i++ ) {

                plane.position.x = Math.random() * 600 - 300;
                plane.position.y = Math.random() * 200 - 100;
                plane.position.z = i*2;
                if(i < 100){
                    
                    if(i <50){
                        plane.position.x = Math.random()*-150;
                        plane.position.z = Math.random()*50;
                    }else{
                        plane.position.x = Math.random()*150;
                        plane.position.z = Math.random()*100+50;
                    }
                }
                plane.rotation.z = Math.random() * Math.PI;
                plane.scale.x = plane.scale.y = 1//Math.random() * Math.random() * 1.5 + 1.5;
                THREE.GeometryUtils.merge( geometry, plane );

            }

            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );

            mesh = new THREE.Mesh( geometry, material );
            mesh.position.z = 0;
            scene.add( mesh );

            renderer = new THREE.WebGLRenderer( { antialias: false } );
            renderer.setSize( window.innerWidth, window.innerHeight );
            // container.appendChild( renderer.domElement );
            container.append( renderer.domElement );
            // console.log(container,renderer.domElement);

            document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            window.addEventListener( 'resize', onWindowResize, false );
        }

        function onDocumentMouseMove( event ) {
            mouseX = ( event.clientX - windowHalfX ) * 0.5;
            mouseY = ( event.clientY - windowHalfY ) * 0.5;
        }

        function onWindowResize( event ) {

            root.camera.aspect = window.innerWidth / window.innerHeight;
            root.camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function animate() {
            requestAnimationFrame( animate );
            position = ( ( Date.now() - start_time ) * 0.03 ) % 8000;

            root.camera.position.x += ( mouseX*0.1 - root.camera.position.x ) * 0.01;
            // root.camera.position.y += ( - mouseY - root.camera.position.y ) * 0.01;
            // camera.position.z += (-1000-camera.position.z)*0.01;
            renderer.render( scene, root.camera );
        }



        this.init();
    }

    this.Clouds = Clouds;

}).call(this);
    
// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
    
    // init();

    // function init() {

    //     container = document.createElement( 'div' );
    //     document.body.appendChild( container );

    //     // Bg gradient

    //     var canvas = document.createElement( 'canvas' );
    //     canvas.width = 32;
    //     canvas.height = window.innerHeight;

    //     var context = canvas.getContext( '2d' );

    //     var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
    //     gradient.addColorStop(0, "#1e4877");
    //     gradient.addColorStop(0.5, "#4584b4");

    //     context.fillStyle = gradient;
    //     context.fillRect(0, 0, canvas.width, canvas.height);

    //     container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
    //     container.style.backgroundSize = '32px 100%';

    //     camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
    //     camera.position.z = 1000;

    //     scene       = new THREE.Scene();
    //     geometry    = new THREE.Geometry();

    //     var texture = THREE.ImageUtils.loadTexture( 'images/cloud10.png', null, animate );
    //     texture.magFilter = THREE.LinearMipMapLinearFilter;
    //     texture.minFilter = THREE.LinearMipMapLinearFilter;

    //     var fog = new THREE.Fog( 0xffffff, - 100, 3000 );

    //     material = new THREE.ShaderMaterial( {

    //         uniforms: {

    //             "map": { type: "t", value: texture },
    //             "fogColor" : { type: "f", value: fog.color },
    //             "fogNear" : { type: "f", value: fog.near },
    //             "fogFar" : { type: "f", value: fog.far },

    //         },
    //         vertexShader: document.getElementById( 'vs' ).textContent,
    //         fragmentShader: document.getElementById( 'fs' ).textContent,
    //         depthWrite: false,
    //         depthTest: false,
    //         transparent: true

    //     } );

    //     var plane = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ) );

    //     for ( var i = 0; i < 8000; i++ ) {

    //         plane.position.x = Math.random() * 1000 - 500;
    //         plane.position.y = - Math.random() * Math.random() * 200 - 15;
    //         plane.position.z = i;
    //         plane.rotation.z = Math.random() * Math.PI;
    //         plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
    //         THREE.GeometryUtils.merge( geometry, plane );

    //     }

    //     mesh = new THREE.Mesh( geometry, material );
    //     scene.add( mesh );

    //     mesh = new THREE.Mesh( geometry, material );
    //     mesh.position.z = -5000;
    //     scene.add( mesh );

    //     renderer = new THREE.WebGLRenderer( { antialias: false } );
    //     renderer.setSize( window.innerWidth, window.innerHeight );
    //     container.appendChild( renderer.domElement );

    //     document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    //     window.addEventListener( 'resize', onWindowResize, false );

    // }

    // function onDocumentMouseMove( event ) {
    //     mouseX = ( event.clientX - windowHalfX ) * 0.25;
    //     mouseY = ( event.clientY - windowHalfY ) * 0.15;
    // }

    // function onWindowResize( event ) {

    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();

    //     renderer.setSize( window.innerWidth, window.innerHeight );

    // }

    // function animate() {

    //     requestAnimationFrame( animate );

    //     position = ( ( Date.now() - start_time ) * 0.03 ) % 8000;

    //     camera.position.x += ( mouseX - camera.position.x ) * 0.01;
    //     camera.position.y += ( - mouseY - camera.position.y ) * 0.01;
    //     camera.position.z += (-1000-camera.position.z)*0.01;

    //     renderer.render( scene, camera );

    // }

// </script>