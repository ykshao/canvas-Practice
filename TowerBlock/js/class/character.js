(function(){
    Character = function(towerBlock){
        this.name = "Character"
        var root = towerBlock;

        this.container;
        this.mesh;
        this.geometry;
        this.material;

        this.linkBody;


        this.posX = 0;
        this.posY = 0;
        this.posZ = 1000;
        this.rotX = 0;
        this.rotY = 0;
        this.rotZ = 0;

        this.radius = 20;
        
        this.init = function(){
            var height = root.towerBlockInfo.blockNum*root.towerBlockInfo.blockHeight;
            this.shape      = new CANNON.Sphere(this.radius);
            this.linkBody   = new CANNON.RigidBody(1,this.shape);
            // this.linkBody.angularVelocity.set(0,10,0);
            // this.linkBody.angularDamping = 0.5;
            root.cWorld.add(this.linkBody);

            this.container  = new THREE.Object3D();
            this.geometry   = new THREE.SphereGeometry(this.shape.radius);
            this.material   = new THREE.MeshBasicMaterial( {color: 0xff0000});
            this.mesh       = new THREE.Mesh(this.geometry,this.material);

            // this.mesh.position.y        = height+this.radius*3;
            this.linkBody.position.y    = height+this.radius*3;
            this.mesh.castShadow = true;

            this.container.add(this.mesh);
            root.world.add(this.container);

            root.addRenderObject(this.name,this);

        }
        this.t = 0;
        this.update = function(){
            // this.linkBody.position.copy(this.mesh.position);
            // this.linkBody.quaternion.copy(this.mesh.quaternion);
            time = Date.now();
        }

        this.init();
        return this;
    }
    Character.prototype = new TowerBlockObject();
    this.Character = Character;
}).call(this);
