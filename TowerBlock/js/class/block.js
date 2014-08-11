(function(){
    Block = function(towerBlock){
        this.name = "Block"
        var root = towerBlock;

        this.mesh;
        this.geometry;
        this.material;

        this.linkBody;


        this.x = 0;
        this.y = 0;
        this.z = 0;

        var config = {
            blockNum    : root.towerBlockInfo.blockNum,
            raidus      : root.towerBlockInfo.blockRadius,
            height      : root.towerBlockInfo.blockHeight,
            segment     : 5
        }

        var mass    = 10;
        var blocks  = [];
        this.init = function(){
            for(var i=0; i<config.blockNum; i++){
                makeBlock(i);
            }
            root.addRenderObject(this.name,this);
        }
        this.update = function(){
            for(var o in blocks){
                var info = blocks[o];
                info.linkBody.position.copy(info.body.position);
                info.linkBody.quaternion.copy(info.body.quaternion);
            }
        }

        function makeBlock(i){
            console.log(i);
            setTimeout(function(){
                // var linkShape = new CANNON.Cylinder(config.raidus,config.raidus,config.height,config.segment);
                var linkShape   = new CANNON.Box(CANNON.Vec3(1,1,1));
                var linkBody    = new CANNON.RigidBody(5,linkShape);
                // var quat        = new CANNON.Quaternion();
                // var translation = new CANNON.Vec3(0,0,0);
                // quat.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
                // linkBody.shape.transformAllPoints(translation,quat);
                // linkBody.position.set(0,config.height*(i+1),0);

                linkBody.linearDamping = 0;
                linkBody.angularDamping = 0.01;
                linkBody.velocity.set(0,0,0);
                root.linkWorld.add(linkBody);

                // var geometry  = new THREE.CylinderGeometry(config.raidus,config.raidus,config.height,config.segment);
                var geometry  = new THREE.BoxGeometry(1,1,1);
                var body = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color: Math.random()*0xffffff, wireframe:1 }));
                // body.applyMatrix( new THREE.Matrix4().makeRotationFromEuler( new THREE.Euler( -Math.PI / 2, 0, 0 ) ) );
                // body.applyMatrix( new THREE.Matrix4().makeRotationFromEuler( new THREE.Euler( Math.PI/2, 0, 0 ) ) );

                body.castShadow     = true;
                body.receiveShadow  = true;
                body.position.set(0,config.height*(i+1),0);
                root.world.add(body);

                blocks.push({
                    linkBody:linkBody,
                    body : body
                })
            },i*100);
        }

        this.init();
        return this;
    }

    Block.prototype = new TowerBlockObject();
    this.Block = Block;
}).call(this);
