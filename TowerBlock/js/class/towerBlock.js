(function(){
    var _bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
    TowerBlock = function (){
        var _this = this;
        this.status = 'ready';

        this.world;
        this.linkWorld;

        this.scene;
        this.camera;
        this.renderer;

        this.mouse = {x:0,y:0,z:0};
        this.gx = 0;
        this.gy = -19.8;
        this.gz = 0;//

        this.light
        this.controls

        this.cameraPosX = 0;
        this.cameraPosY = 10;
        this.cameraPosZ = 1000;

        this.cameraRotX = 0;
        this.cameraRotY = 0;
        this.cameraRotZ = 0;

        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.rotX = 0;
        this.rotY = 0;
        this.rotZ = 0;

        this.towerBlockInfo = {
            blockNum    : 10,
            blockHeight : 5,
            blockRadius : 5
        }

        this.stageSize = WindowSize();
        this.rendererObjects = {};

        var worldSize = {
            width   : 10000,
            height  : 10000,
            depth   : 10000
        }

        var physicsMaterial,controls,
            time = Date.now();

        var sphereShape,sphereBody;

        this.cannonInit = function(){

            this.linkWorld = new CANNON.World();
            this.linkWorld.quatNormalizeSkip = 0;
            this.linkWorld.quatNormalizeFast = false;

            var solver = new CANNON.GSSolver();
            this.linkWorld.defaultContactMaterial.contactEquationStiffness = 1e9;
            this.linkWorld.defaultContactMaterial.contactEquationRegularizationTime = 4;

            solver.iterations = 71;
            solver.tolerance = 0.1;

            this.linkWorld.solver = new CANNON.SplitSolver(solver);
            this.linkWorld.gravity.set(this.gx,this.gy,this.gz);
            this.linkWorld.broadphase = new CANNON.NaiveBroadphase();

            // We must add the contact materials to the world
            physicsMaterial = new CANNON.Material("slipperyMaterial");
            var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,physicsMaterial,0.0,0.3);
            this.linkWorld.addContactMaterial(physicsContactMaterial);

            // Create a sphere
            var mass = 100, radius = 1;
            sphereShape = new CANNON.Sphere(radius);
            sphereBody = new CANNON.RigidBody(mass,sphereShape,physicsMaterial);
            sphereBody.position.set(0,this.towerBlockInfo.blockNum*this.towerBlockInfo.blockHeight,0);
            sphereBody.position.set(0,10,100);
            sphereBody.linearDamping = 0.5;

            // sphereBody.velocity.set(0,-100,0)
            this.linkWorld.add(sphereBody);

            var groundShape = new CANNON.Plane();
            var groundBody = new CANNON.RigidBody(0,groundShape,physicsMaterial);
            groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
            this.linkWorld.add(groundBody);

            // var groundShape = new CANNON.Plane("slipperyMaterial");
            // var groundBody = new CANNON.RigidBody(0,groundShape,physicsMaterial);
            // groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
            // this.linkWorld.add(groundBody);
        }
        this.init = function(){
            this.onResize();
            this.camera      = new THREE.PerspectiveCamera(75,this.stageSize.aspect,0.1,1000);

            this.scene       = new THREE.Scene();
            this.scene.fog = new THREE.Fog( 0x000000, 0, 500 );

            this.renderer    = new THREE.WebGLRenderer();//{ antialias: 0 }
            this.renderer.setSize(this.stageSize.width,this.stageSize.height);
            this.renderer.shadowMapEnabled = true;
            this.renderer.shadowMapSoft = true;
            this.renderer.setClearColor( this.scene.fog.color, 1 );

            document.body.appendChild(this.renderer.domElement);

            this.world       = new THREE.Object3D();
            this.scene.add(this.world);

            // floor
            var geometry = new THREE.PlaneGeometry( 300, 300, 50, 50 );
            geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

            var material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
            // new THREE.ColorUtils.adjustHSV( material.color, 0, 0, 0.9 );
            
            var mesh = new THREE.Mesh( geometry, material );
            mesh.castShadow     = true;
            mesh.receiveShadow  = true;
            this.scene.add( mesh );

            this.controls = new THREE.PointerLockControls( this.camera , sphereBody );
            this.world.add( this.controls.getObject()); 
            // controls.enabled = true;

            this.addEvent();
        }

        this.addEvent = function(){
            this.onResize = _bind(this.onResize,this);
            this.onMouseMove = _bind(this.onMouseMove,this);

            $(window).bind('resize', this.onResize );
            $(window).bind('mousemove', this.onMouseMove);
        }

        this.addRenderObject = function(name,object){
            this.rendererObjects[name] = object;
        }

        this.getObject = function(name){
            console.log('get < '+name+' >> '+this.rendererObjects[name])
            return this.rendererObjects[name];
        }

        this.removeRenderObject = function(name){
            delete this.rendererObjects[name];
        }

        var render = function(){
            requestAnimationFrame(render);
            updatePhysics();
            for(var o in _this.rendererObjects){
                _this.rendererObjects[o].update();
            }
            _this.update();
            
        }
        var timeStep=1/60
        this.update = function(){
            this.renderer.shadowMapEnabled = true;
            this.renderer.setClearColor( this.scene.fog.color );
            this.renderer.render(this.scene, this.camera);

           if(this.controls.enabled){
                _this.linkWorld.step(timeStep);
            }

            this.controls.update( Date.now() - time );
            time = Date.now();
        }


        function updatePhysics() {
          // _this.linkWorld.step(timeStep);
          // _this.linkWorld.gravity.set(_this.gx,_this.gy,_this.gz);
      }

        /* ************************************************************
            Event Handler            
        ************************************************************ */
        this.onResize = function(){
            this.stageSize = WindowSize();
            this.stageSize.aspect = this.stageSize.width / this.stageSize.height;
            this.stageSize.halfX = this.stageSize.width*0.5;
            this.stageSize.halfY = this.stageSize.height*0.5;

            if(this.camera){
                this.camera.aspect = this.stageSize.aspect;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize( this.stageSize.width, this.stageSize.height );
            }
        }

        this.onMouseMove = function(e){
            this.mouse.x = e.clientX - this.stageSize.halfX;
            this.mouse.y = e.clientY - this.stageSize.halfY;
        }

        this.cannonInit();
        this.init();
        render();
        return this;
    }
    TowerBlock.prototype.constructor = TowerBlock;
    this.TowerBlock = TowerBlock;
}).call(window);

WindowSize = function(){
    var size = { width:0,height:0};
    if (document.documentElement.clientHeight) {
        size.width  = document.documentElement.clientWidth;
        size.height = document.documentElement.clientHeight;
    } else if (document.body.clientHeight) {
        size.width  = document.body.clientWidth;
        size.height = document.body.clientHeight;
    } else if (window.innerHeight) {
        size.width  = window.innerWidth;
        size.height = window.innerHeight;
    }

    return size;
}