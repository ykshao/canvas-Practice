(function(){
    /*
     *  BIRD 
     */
    var Bird = function(towerBlock,pos,speed){
        // var root = towerBlock;
        this.root = towerBlock;
        this.name = "Bird"
        this.id         = 0;
        this.life       = 100;
        this.hitRad     = 10;
        
        this.rotationY  = Math.random()*360;
        this.radianY    = this.rotationY * Math.PI / 180;
        
        this.speed =　speed//100 + Math.random() * 100;
        
        this.x = pos.x// + worldWidth;
        this.y = pos.y;
        this.z = pos.z// + worldHeight;
        
        this.bird                   = new ShiftBird();
        this.bird.animationFPS      = 30;
        this.bird.scale             = 10;
        
        this.baseCharacter          = new ShiftBird();
        this.baseCharacter.root.position    = pos;
        
        
        this.config = {
            
          baseUrl   : "/models/bird/",
          body      : "body.js",
          skins     : ["skin.png"],
          
          animations: {
            fly     : "fly",
            hit     : "hit",
            death   : "death",
            gone    : "gone"
          },
        }
        
        this.controls = {
            fly     : true,
            hit     : false,
            death   : false,
            gone    : false
        }
        this.interval = 0;
        this.bird.controls = this.controls;
    }
    
    Bird.prototype.load = function(){
        var scope = this;
        this.baseCharacter.loadParts( scope.config );
        this.baseCharacter.onLoadComplete = function(){
            scope.bird.shareParts(scope.baseCharacter);
            
            scope.bird.setSkin( 0 );
            
            scope.bird.root.position.x = scope.x;
            scope.bird.root.position.y = scope.y;
            scope.bird.root.position.z = scope.z;
            // scope.bird.setWireframe(true);
            scope.bird.bodyOrientation += (scope.radianY);
            
            scope.mesh          = scope.bird.meshBody;
            scope.mesh.bird     = scope.bird;
            scope.mesh.scope    = scope;
            scope.id            = scope.root.birds.length;
            
            scope.root.birds.push(scope.mesh);
            
            scope.root.scene.add(scope.bird.root);
            console.log("load");
        }
    };

    var worldWidth = 100,
        worldDepth = 100,
        worldScale = 3;
    
    Bird.prototype.update = function(delta){
        this.bird.update(delta);
        this.bird.root.position.x += Math.sin(this.radianY) * this.speed * delta;
        this.bird.root.position.z += Math.cos(this.radianY) * this.speed * delta;
        
        if(this.bird.root.position.x > worldWidth * (worldScale-1))this.bird.root.position.x = -worldWidth;
        if(this.bird.root.position.x < -worldWidth * (worldScale-1))this.bird.root.position.x = worldWidth;
        
        if(this.bird.root.position.z > worldDepth * (worldScale-1))this.bird.root.position.z = -worldDepth;
        if(this.bird.root.position.z < -worldDepth * (worldScale-1))this.bird.root.position.z = worldDepth;
        
        // console.log(delta)
    }
    
    Bird.prototype.remove = function(){
        scene.remove(this.bird.root);
    }
    
    Bird.prototype.animation = function(type){
        if(this.controls[type] === undefined)return;
        this.controls[type] = true;
        var scope   = this;
        var oldType = type;
        switch(type){
            case "fly"      : break;
            case "hit"      : this.interval = 130; break;
            case "death"    : this.interval = 710; break;
            case "gone"     : this.interval = 0; break;
        }
        
        setTimeout(function(){
                        scope.controls[oldType] = false;
                        if(oldType == "death"){
                            scope.controls.gone = true;
                        }
                    }
        ,(this.interval));
    }
    
    Bird.prototype.constructor = Bird;  
    this.Bird = Bird;
}).call(this);
