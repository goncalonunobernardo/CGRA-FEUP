var degToRad = Math.PI / 180.0;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.529, 0.808, 0.922, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);
		this.enableTextures(true);

		/*** MATERIALS ***/
		//GREEN RUST
		this.greenRustAppearance = new CGFappearance(this);
		this.greenRustAppearance.setAmbient(0.5, 0.5, 0.5, 1);
		this.greenRustAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.greenRustAppearance.setSpecular(1, 1, 1, 1);
		this.greenRustAppearance.setShininess(50);
		this.greenRustAppearance.loadTexture("../resources/images/B_greenRust.png");

		//RED RUST
		this.redRustAppearance = new CGFappearance(this);
		this.redRustAppearance.setAmbient(0.5, 0.5, 0.5, 1);
		this.redRustAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.redRustAppearance.setSpecular(1, 1, 1, 1);
		this.redRustAppearance.setShininess(50);
		this.redRustAppearance.loadTexture("../resources/images/B_redRust.png");

		//BORDERLANDS_BASED SIGN
		this.signAppearance = new CGFappearance(this);
		this.signAppearance.setAmbient(0.5, 0.5, 0.5, 1);
		this.signAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.signAppearance.setSpecular(1, 1, 1, 1);
		this.signAppearance.setShininess(50);
		this.signAppearance.loadTexture("../resources/images/Pandora_Borderlands.png");

		//DARK SAND FOR UNITCUBEQUAD BELOW TERRAIN
		this.below_terrainAppearance = new CGFappearance(this);
		this.below_terrainAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.below_terrainAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.below_terrainAppearance.setSpecular(0.5, 0.5, 0.5, 1);
		this.below_terrainAppearance.setShininess(50);
		this.below_terrainAppearance.loadTexture("../resources/images/W_cover.png");

		this.carDummyAppearance = new CGFappearance(this);

		/** CRANE MOVEMENT LOGIC **/
		this.enableDummy = false;
		this.xDummy = 0;
		this.xCrane = 7.3*Math.cos(3*Math.PI/8) + 0.35*Math.cos(Math.PI/8) +
									Math.sqrt(0.25*0.25 + 2.3*2.3) * Math.sin(Math.atan(2.3/0.25) - Math.PI/5);
		this.yCarMax = 7.3*Math.sin(3*Math.PI/8) - 0.35*Math.sin(Math.PI/8) -
									 Math.sqrt(0.25*0.25 + 2.3*2.3) * Math.cos(Math.atan(2.3/0.25) - Math.PI/5) -1.7 -2.75;
		this.yAdj = [];
		this.count1 = 0;
		this.carLastZ = 0;
		this.radius = 7.3*Math.cos(3*Math.PI/8) + 0.35*Math.cos(Math.PI/8) +
									Math.sqrt(0.25*0.25 + 2.3*2.3) * Math.sin(Math.atan(2.3/0.25) - Math.PI/40);
		this.ang = 0;
		this.r1 = 7.3*Math.cos(3*Math.PI/8) + 0.35*Math.cos(Math.PI/8);
		this.r2 =	Math.sqrt(0.25*0.25 + 2.3*2.3) * Math.sin(Math.atan(2.3/0.25) - Math.PI/40);
		this.count2 = 0;

		/*** UPDATE TIME ***/
		this.speed= 1;
		this.updatePeriod=100;
		this.setUpdatePeriod(this.updatePeriod);

		/*** LIGHT GROUP ***/
		this.Light1=true;
		this.Light2=true;
		this.Light3=true;
		this.Light4=true;

		/*** TEXTURE GROUP ***/
		this.vehicleAppearances = [this.greenRustAppearance, this.redRustAppearance];
		this.vehicleAppearancesList = {'Green' : 0, 'Red' : 1};
		this.Texture_Options = 'Green';
		this.currVehicleAppearance = this.vehicleAppearancesList[this.Texture_Options];

		this.altimetry = [[ 2.0 , 5.0 , 8.0, 2.0, 5.0, 10.0, 8.0, 2.0 ],
											[ 2.0 , 4.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 2.0 ],
											[ 2.0 , 3.0 , 7.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
											[ 8.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
											[ 2.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
											[ 7.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
											[ 6.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
											[ 2.0 , 3.0 , 0.0, 0.0, 0.0, 0.0, 8.0, 2.0 ],
											[ 2.0 , 5.0 , 2.0, 4.0, 4.0, 2.0, 2.0, 9.0 ]];

		/*** SCENE ELEMENTS ***/
		//USER_VEHICLE
		this.car = new MyVehicle(this,);
		//DESTROYED CARS THROUGH SCENE
		this.destroyed_cars = new MyVehicle(this);
		//DESTROYED WHEELS THROUGH SCENE
		this.destroyed_wheels = new MyWheelL(this);
		//DESTROYED UPPERBODIES THROUGH SCENE
		this.destroyed_upperbody = new MyUpperBody(this);
		//DUMMY CAR USED IN D POSITION OF CRANE
		this.carDummy = new MyVehicle(this);
		//TERRAIN
		this.terrain = new MyTerrain(this, 8, this.altimetry);
		//CRANE
		this.crane = new MyCrane(this);
		//SIGN BETWEEN MOUNTAINS
		this.sign = new MyUnitCubeQuad(this, 0, 1, 0, 1);
		//VOLUME BELOW TERRAIN
		this.below_terrain = new MyUnitCubeQuad(this, 0, 1, 0, 1);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0,0,0, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		//this.lights[0].setVisible(true); // show marker on light position (different from enabled)

		this.lights[1].setPosition(-10, -6.0, -1.0, -1.0);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		//this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		//this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		//this.lights[0].setSpecular(0.8,0.8,0,1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		//this.lights[1].setSpecular(0.8,0.8,0,1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		//this.lights[2].setSpecular(0.8,0.8,0,1.0);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1.0);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].enable();

		this.lights[3].setAmbient(0, 0, 0, 1);
		//this.lights[3].setSpecular(0.8,0.8,0,1.0);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(0.2);
		this.lights[3].enable();
	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
		this.lights[i].update();
	}

	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		this.axis.display();

		//KEYS
		this.checkKeys();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		//CAR
		this.pushMatrix();
			this.translate(0, 1.3, 0);
			this.rotate(-Math.PI/2, 0, 1, 0);
			this.vehicleAppearances[this.currVehicleAppearance].apply();
			this.car.display();
		this.popMatrix();

		//CAR DUMMY
		this.pushMatrix();
			this.translate(-this.xDummy, 1.3, 0);
			this.rotate(-Math.PI/2, 0, 1, 0);
			if(this.enableDummy){
				this.carDummyAppearance.apply();
				this.carDummy.display();
			}
		this.popMatrix();

		//CRANE
		this.pushMatrix();
			this.translate(-this.xCrane, 0, 0);
			this.crane.display();
		this.popMatrix();

		//TERRAIN
		this.pushMatrix();
			this.translate(-2, 0, 7);
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.scale(50, 50, 1.2);
			this.terrain.display();
		this.popMatrix();

		//POSTER
		this.pushMatrix();
			this.rotate(-Math.PI/2, 0, 1, 0);
			this.translate(-11, 5.3, -16);
			this.rotate(Math.PI/6, 2, -15, -15);
			this.rotate(Math.PI/4, 3, -2, 15);
			this.scale(0.02, 7, 10);
			this.signAppearance.apply();
			this.sign.display();
		this.popMatrix();

		//BELLOW_PLANE
		this.pushMatrix();
			this.rotate(Math.PI/2, 1, 0, 0);
			this.translate(-2, 3.5, 2.6);
			this.scale(50, 44, 5);
			this.below_terrainAppearance.apply();
			this.below_terrain.display();
		this.popMatrix();

		//DESTROYED_CARS1
		this.pushMatrix();
			this.translate(18, 1.3, 10);
			this.rotate(Math.PI/3, 1, 0, 0);
			this.redRustAppearance.apply();
			this.destroyed_cars.display();
		this.popMatrix();

		//DESTROYED_CARS2
		this.pushMatrix();
			this.translate(19, 1.3, 7);
			this.rotate(Math.PI/3, -1, 0, 0);
			this.greenRustAppearance.apply();
			this.destroyed_cars.display();
		this.popMatrix();

		//DESTROYED_CARS3
		this.pushMatrix();
			this.translate(18, 1.3, 13);
			this.rotate(Math.PI/3, 1, 1, 0);
			this.greenRustAppearance.apply();
			this.destroyed_cars.display();
		this.popMatrix();

		//DESTROYED_WHEEL1
		this.pushMatrix();
			this.translate(17, 0.3, 3);
			this.rotate(Math.PI/3, 1, 0, 0);
			this.scale(1, 2, 1);
			this.destroyed_wheels.display();
		this.popMatrix();

		//DESTROYED_WHEEL2
		this.pushMatrix();
			this.translate(12, 1.3, 17);
			this.rotate(Math.PI/3, 1, 0, 0);
			this.destroyed_wheels.display();
		this.popMatrix();

		//DESTROYED_UPPERBODY1
		this.pushMatrix();
			this.translate(18, 1, 8);
			this.rotate(Math.PI/3, 1, 1, 0);
			this.destroyed_upperbody.display();
		this.popMatrix();

		//DESTROYED_UPPERBODY2
		this.pushMatrix();
			this.translate(15, -1.3, 8);
			this.destroyed_upperbody.display();
		this.popMatrix();
	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++){
			this.lights[i].update();
		}

		if(this.Light1){
			this.lights[0].enable();
		} else {
			this.lights[0].disable();
		}

		if(this.Light2){
			this.lights[1].enable();
		} else {
			this.lights[1].disable();
		}

		if(this.Light3){
			this.lights[2].enable();
		} else {
			this.lights[2].disable();
		}

		if(this.Light4){
			this.lights[3].enable();
		} else {
			this.lights[3].disable();
		}
	}

	activate_axis()
	{
		this.axis = new CGFaxis(this);
		this.axis.display();
		console.log("Axis DRAWN");
	}

	deactivate_axis()
	{
		this.axis = new CGFaxis(this, 0, 0);
		console.log("Axis ERASED...");
	};

	checkKeys(currTime)
	{
		var text="Key pressed: ";
		var keysPressed=false;
		if(!this.pause) {
		this.car.update(currTime);													//update function on car

			if (this.gui.isKeyPressed("KeyW")) {							/** - - - - - --  - **/
				text+=" W ";
				keysPressed=true;

				this.car.pushForward(0.03*this.speed);
			}

			if (this.gui.isKeyPressed("KeyS")) {
				text+=" S ";
				keysPressed=true;

				this.car.pushBackwards(0.03*this.speed);				/** KEYPRESS EVENTS	**/
			}

			if (this.gui.isKeyPressed("KeyA")) {
				text+=" A ";
				keysPressed=true;

				this.car.pushLeft(-.003*this.speed);
			}

			if (this.gui.isKeyPressed("KeyD")) {
				text+=" D ";
				keysPressed=true;

				this.car.pushRight(-.003*this.speed);						/** - - - - - --  - **/
			}

			if (keysPressed) {
				console.log(text);
			}
		}
	};

	update(currTime)
	{
		//update car active texture
		this.currVehicleAppearance = this.vehicleAppearancesList[this.Texture_Options];

		// -Crane Pos D
		// -Car Pos   R						CRANE HAS TO ROTATE FROM D -> R
		// -Arm Pos   I
		if(this.crane.getPos() == 'D' && this.car.getPos() == 'R' && this.crane.getArmPos() == 'I'){
			this.crane.update(currTime, 0);
		}

		// -Crane Pos R
		// -Car Pos   R						CRANE ARM HAS TO LOWER I -> F
		// -Arm Pos   I
		// -yCar			0		(car is on the ground)
		if(this.crane.getPos() == 'R' && this.car.getPos() == 'R' && this.crane.getArmPos() == 'I' && this.car.get_y() == 0){
			this.crane.update(currTime, 1);
		}

		// -Crane Pos R																						  ^
		// -Car Pos   R						CAR IS 'ATTRACTED' TO MAGNET yCAr |
		// -Arm Pos   F
		// -yCar			0		(car is on the ground)
		if(this.crane.getPos() == 'R' && this.car.getPos() == 'R' && this.crane.getArmPos() == 'F' && this.car.get_y() == 0){
			if(this.car.get_y() < this.yCarMax){
				this.car.inc_y(this.yCarMax/3);
			}
		}

		// -Crane Pos R
		// -Car Pos   R						CRANE ARM HAS TO RISE F -> I  CAR HAS TO GO WITH IT
		// -Arm Pos   F
		// -yCar			!= 0 	(car is on the magnet)
		if(this.crane.getPos() == 'R' && this.car.getPos() == 'R' && this.crane.getArmPos() == 'F' && this.car.get_y() != 0){
			this.crane.update(currTime, 2);
			this.car.set_z(-this.crane.getArmX() + 1.7);
			this.carLastZ = -this.crane.getArmX()+1.7;
			var y = 7.3*Math.sin(3*Math.PI/8) - 0.35*Math.sin(Math.PI/8) + this.crane.getArmY() -2.75 -0.3;
			this.car.set_y(y);
			this.yAdj.push(y);
			this.count1++;
		}

		// -Crane Pos R
		// -Car Pos   R						CRANE HAS TO ROTATE FROM R -> D CAR ALSO ROTATES
		// -Arm Pos   I
		// -yCar			!= 0 	(car is on the magnet)
		if(this.crane.getPos() == 'R' && this.car.getPos() == 'R' && this.crane.getArmPos() == 'I' && this.car.get_y() != 0){
			this.crane.update(currTime, 3);
			if(-Math.PI <= this.ang){
				var z = this.radius * Math.cos(this.ang) -this.r2 -this.r1 -this.carLastZ -0.3;
				var x = this.radius * Math.sin(-this.ang);

				this.car.set_z(-z);
				this.car.set_x(x);
				this.ang -= Math.PI/20;
			}else{
				this.car.resetMov();
			}
		}

		// -Crane Pos D
		// -Car Pos   M						CRANE IS ON D CAR HAS TO LOWER yCAR
		// -Arm Pos   I
		// -yCar			!= 0 	(car is on the magnet)
		if(this.crane.getPos() == 'D' && this.car.getPos() == 'M' && this.crane.getArmPos() == 'I' && this.car.get_y() != 0){
			if(this.count1 >= 0){
				this.car.set_y(this.yAdj[this.count1--]);
			}else{
				if(this.count2 < 3){
					this.car.set_y(this.yCarMax/3);
					this.count2++;
				}else{
					this.car.set_y(0);					//Security measure to make sure yCar is 0
					this.enableDummy = true;		//Enables Dummy Car on D position
					this.carDummyAppearance = this.vehicleAppearances[this.currVehicleAppearance];			//Appearance of user vehicle
					this.xDummy = this.car.get_z();			//Postion of user vehicle
				}
			}
		}
	};
};
