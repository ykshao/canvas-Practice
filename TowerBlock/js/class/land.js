(function(){
    Land = function(towerBlock){
        this.name = "Land"
        var root    = towerBlock;
        var chr;

        this.mesh;
        this.geometry;
        this.material;
        this.size = {
            width       : 10000,
            height      : 10000,
            depth       : 10
        }

        this.dangersHeight = 10;
        this.container;
        this.dangers = [];
        this.dangerRow = 0;
        
        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.rotX = 0;
        this.rotY = 0;
        this.rotZ = 0;

        this.init = function(){
            this.geometry   = new THREE.PlaneGeometry( this.size.width, this.size.height ,1,1);
            this.material   = new THREE.MeshLambertMaterial( { color: 0xffffff} );
            this.mesh       = new THREE.Mesh(this.geometry,this.material);
            this.mesh.castShadow    = true;
            this.mesh.useQuaternion = true;
            this.mesh.receiveShadow = true;

            this.container = new THREE.Object3D();
            root.world.add(this.mesh);
            this.mesh.position.set(0,0,0)

            this.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

            // var radiusTop=0, radiusBottom=1, height=this.dangersHeight,numSegment=3;
            // var dangerGeometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height , numSegment ); // (radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
            // var dangerMaterial = new THREE.MeshNormalMaterial({ wireframe: 0});
            // var dangerGeometry2 = new CANNON.Cylinder( radiusTop, radiusBottom, height , numSegment )
            // dangerGeometry.applyMatrix( new THREE.Matrix4().makeRotationFromEuler( new THREE.Euler( Math.PI / 2, Math.PI, 0 ) ) );

            
            this.shape = new CANNON.Sphere(3);

            root.world.add( this.container );

            chr = towerBlock.getObject('Character');

            // console.log(this.dangers)
        }

        this.update = function(){
        }

        this.init();
        return this;
    }
    Land.prototype = new TowerBlockObject();
    this.Land = Land;
}).call(this);
