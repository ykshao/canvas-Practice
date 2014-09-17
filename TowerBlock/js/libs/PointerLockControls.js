/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera, cannonBody ) {

	var scope = this;

	camera.rotation.set( 0, 0, 0 );

    var eyeYPos = 2; // eyes are 2 meters above the ground
    var velocityFactor = 0.2;
    var jumpVelocity = 120;
    var scope = this;

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 10;
	yawObject.add( pitchObject );

	var isOnObject 		= false;
	var moveForward 	= false;
	var moveBackward 	= false;
	var moveLeft 		= false;
	var moveRight 		= false;
	var canJump 		= false;

	var prevTime = performance.now();
	// var velocity = new THREE.Vector3();
	var velocity = cannonBody.velocity;
	var PI_2 = Math.PI / 2;

	// Normal in the contact, pointing *out* of whatever the player touched
	var contactNormal = new CANNON.Vec3(); 
    var upAxis = new CANNON.Vec3(0,1,0);
    cannonBody.addEventListener("collide",function(e){
        var contact = e.contact;

        // contact.bi and contact.bj are the colliding bodies, and contact.ni is the collision normal.
        // We do not yet know which one is which! Let's check.
        if(contact.bi.id == cannonBody.id)  // bi is the player body, flip the contact normal
            contact.ni.negate(contactNormal);
        else
            contact.ni.copy(contactNormal); // bi is something else. Keep the normal as it is

        // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
        if(contactNormal.dot(upAxis) > 0.5) // Use a "good" threshold value between 0 and 1 here!
            canJump = true;
    });


	var onMouseMove = function ( event ) {

		if ( scope.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

	};

	var onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = true;
				break;

			case 37: // left
			case 65: // a
				moveLeft = true; break;

			case 40: // down
			case 83: // s
				moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				moveRight = true;
				break;

			case 32: // space
				if ( canJump === true ) velocity.y = jumpVelocity;
				canJump = false;
				break;

		}

	};

	var onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // s
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;

		}

	};

	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

	this.enabled = false;

	this.getObject = function () {

		return yawObject;

	};

	this.isOnObject = function ( boolean ) {
		isOnObject = boolean;
		canJump = boolean;
	};

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, -1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		}

	}();

	var quat = new THREE.Quaternion();
	var inputVelocity = new THREE.Vector3();
	this.update = function () {

		if ( scope.enabled === false ) return;

		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		inputVelocity.x -= inputVelocity.x * 10.0 * delta;
		inputVelocity.z -= inputVelocity.z * 10.0 * delta;

		// inputVelocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		if ( moveForward ) inputVelocity.z -= 400.0 * delta;
		if ( moveBackward ) inputVelocity.z += 400.0 * delta;

		if ( moveLeft ) inputVelocity.x -= 400.0 * delta;
		if ( moveRight ) inputVelocity.x += 400.0 * delta;

		// if ( isOnObject === true ) {
		// 	inputVelocity.y = Math.max( 0, inputVelocity.y );
		// }

		// inputVelocity.position.y = 
		// yawObject.position.y = velocity.y;

		// yawObject.translateX( inputVelocity.x * delta );
		// yawObject.translateY( inputVelocity.y * delta ); 
		// yawObject.translateZ( inputVelocity.z * delta );

		// pitchObject.position.x = inputVelocity.x;
		// pitchObject.position.y = inputVelocity.y;

		var euls = new THREE.Euler(pitchObject.rotation.x, yawObject.rotation.y, 0);
		// quat.setFromAxisAngle(vector3,"XYZ");
		// quat.multiplyVector3(inputVelocity);
		// quat.setFromEuler(euls,"XYZ");
		//vector.applyQuaternion( quaternion )
		// inputVelocity.applyQuaternion(quat);
		// inputVelocity.applyQuaternion( quat )
		// inputVelocity.applyQuaternion(quat);
		// console.log(quat.setFromEuler);
		// 
        yawObject.translateX( inputVelocity.x * delta );
		// yawObject.translateY( inputVelocity.y * delta ); 
		yawObject.translateZ( inputVelocity.z * delta );

		// yawObject.position.copy(cannonBody.position);
        // velocity.x += inputVelocity.x;
        // velocity.z += inputVelocity.z;

		// cannonBody.position.copy(yawObject.position);


		// if ( yawObject.position.y < 10 ) {

		// 	velocity.y = 0;
		// 	yawObject.position.y = 10;

		// 	canJump = true;

		// }


		prevTime = time;

	};

};
