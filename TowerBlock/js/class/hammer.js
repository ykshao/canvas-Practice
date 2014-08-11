(function(){
    Hammer = function(towerBlock,num){
        this.name = "Hammer"
        var root = towerBlock;

        this.hammer;
        this.hammerHead;
        this.hammerGrip;
        this.tower;

        this.linkHammerHead;

        var mass    = 10;
        var blocks  = [];
        var towerInfo = root.towerBlockInfo;
        this.init = function(){
            var height      = towerInfo.blockNum*towerInfo.blockHeight;
            var towerGeo    = new THREE.CylinderGeometry(50,50,height,20),
                towreMat    = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe:0 });
            this.tower      = new THREE.Mesh(towerGeo,towreMat);
            this.tower.position.set(towerInfo.blockRadius*3,height*0.5,0);
            root.world.add(this.tower);

            this.hammer     = new THREE.Object3D();
            var headGeo     = new THREE.BoxGeometry(towerInfo.blockRadius,towerInfo.blockHeight*0.8,towerInfo.blockRadius*2),
                headMat     = new THREE.MeshBasicMaterial( {color: 0xffff11, wireframe:0 });
            this.hammerHead = new THREE.Mesh(headGeo,headMat);
            this.hammerHead.position.set(-towerInfo.blockRadius*3,-towerInfo.blockHeight*0.5,0)

            var gripGeo = new THREE.CylinderGeometry(20,20,towerInfo.blockRadius*3,20),
                gripMat = new THREE.MeshBasicMaterial( {color: 0x333333, wireframe:0 });

            gripGeo.applyMatrix( new THREE.Matrix4().makeRotationFromEuler( new THREE.Euler( 0, 0, Math.PI/2 ) ) );
            this.hammerGrip = new THREE.Mesh(gripGeo,gripMat);
            this.hammerGrip.position.set(-towerInfo.blockRadius*2,-towerInfo.blockHeight*0.5,0)

            this.hammer.position.set(towerInfo.blockRadius*3,height,0);
            this.hammer.add(this.hammerHead);
            this.hammer.add(this.hammerGrip);

            root.world.add(this.hammer);
            this.hammer.rotation.y = Math.PI;

            //link
            var linkHeadGeo         = new CANNON.Box(new CANNON.Vec3(towerInfo.blockRadius,towerInfo.blockHeight*0.8,towerInfo.blockRadius*2));
            this.linkHammerHead     = new CANNON.RigidBody(mass,linkHeadGeo);
            
            
            // root.scene.updateMatrixWorld();
            // console.log(this.hammerHead.position.getPositionFromMatrix( this.hammer.matrixWorld ))
            // this.linkHammerHead.position.set(this.hammerHead.localToWorld(this.hammer.position));
            // this.linkHammerHead.position.copy(this.hammerHead.position);
            // this.hammerHead.parent.position.getPositionFromMatrix( this.hammerHead.matrixWorld );
            // root.world.add(this.linkHammerHead);
            root.addRenderObject(this.name,this);
        }
        this.update = function(){
            this.hammer.rotation.y += 0.1;

            // var headGlobal = this.hammerHead.parent.position.getPositionFromMatrix( this.hammerHead.matrixWorld )
            // console.log(headGlobal);
            // this.linkHammerHead.position.x = headGlobal.x;
            // this.linkHammerHead.position.y = headGlobal.y;
            // this.linkHammerHead.position.z = headGlobal.z;

            // this.linkHammerHead.position.copy(this.hammerHead.localToWorld(this.hammer.position));
            // this.linkHammerHead.quaternion.copy(this.hammerHead.localToWorld(this.hammer.position);
        }

        this.init();
        return this;
    }
    Hammer.prototype = new TowerBlockObject();
    this.Hammer = Hammer;
}).call(this);
