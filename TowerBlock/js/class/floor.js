(function(){
    Floor = function(towerBlock){
        this.name = "Floor"
        var root    = towerBlock;

        this.floor;

        this.init = function(){
            // floor
            var geometry = new THREE.PlaneGeometry( 1000, 1000, 50, 50 );
            geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

            var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
            // THREE.ColorUtils.adjustHSV( material.color, 0, 0, 0.9 );

            this.floor = new THREE.Mesh( geometry, material );
            this.floor.position.set(0,.5,0);
            this.floor.castShadow = true;
            this.floor.receiveShadow = true;
            root.scene.add( this.floor );
        }

        this.init();
        return this;
    }
    Floor.prototype = new TowerBlockObject();
    this.Floor = Floor;
}).call(this);
