(function(){
    Lights = function(towerBlock){
        this.name = "Lights"
        var root = towerBlock;

        this.light;

        this.init = function(){
            var ambient = new THREE.AmbientLight( 0x111111 );
                scene.add( ambient );

            this.light = new THREE.SpotLight( 0xffffff );
            this.light.position.set( 0, 30, 20 );
            this.light.target.position.set( 0, 0, 0 );
            if(true){
                this.light.castShadow = true;

                this.light.shadowCameraNear = 20;
                this.light.shadowCameraFar = 50;//camera.far;
                this.light.shadowCameraFov = 40;

                this.light.shadowMapBias = 0.1;
                this.light.shadowMapDarkness = 0.7;
                this.light.shadowMapWidth = 2*512;
                this.light.shadowMapHeight = 2*512;
                this.light.shadowCameraVisible = true;
            }

            root.scene.add(this.light);




            // root.addRenderObject(this.name,this);
            // var height = root.towerBlockInfo.blockNum*root.towerBlockInfo.blockHeight;
            // var d = 100;
            // this.light = new THREE.DirectionalLight( 0xffffff, 1.75 );
            // this.light.position.set( height*0.5, height, height*0.5 );

            
            // this.light.castShadow = true;
            // // this.light.shadowCameraVisible = true;

            // this.light.shadowMapWidth = height;
            // this.light.shadowMapHeight = height;

            // this.light.shadowCameraLeft = -height*2;
            // this.light.shadowCameraRight = height*2;
            // this.light.shadowCameraTop = height*2;
            // this.light.shadowCameraBottom = -height*2;

            // this.light.shadowCameraFar = height*2;
            // this.light.shadowCameraNear = 100;
            // this.light.shadowDarkness = .6;

            // this.light.rotation.x = -90;

            // root.world.add( this.light );
        }
        this.update = function(){
        }

        this.init();
        return this;
    }
    Lights.prototype = new TowerBlockObject();
    this.Lights = Lights;
}).call(this);
