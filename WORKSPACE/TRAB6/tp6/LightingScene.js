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
		this.materialDefault = new CGFappearance(this);

		this.greenRustAppearance = new CGFappearance(this);
		this.greenRustAppearance.setAmbient(0.5, 0.5, 0.5, 1);
		this.greenRustAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.greenRustAppearance.setSpecular(1, 1, 1, 1);
		this.greenRustAppearance.setShininess(50);
		this.greenRustAppearance.loadTexture("../resources/images/B_greenRust.png");

		this.redRustAppearance = new CGFappearance(this);
		this.redRustAppearance.setAmbient(0.5, 0.5, 0.5, 1);
		this.redRustAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.redRustAppearance.setSpecular(1, 1, 1, 1);
		this.redRustAppearance.setShininess(50);
		this.redRustAppearance.loadTexture("../resources/images/B_redRust.png");

		this.signAppearance = new CGFappearance(this);
		this.signAppearance.setAmbient(0.5, 0.5, 0.5, 1);
		this.signAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.signAppearance.setSpecular(1, 1, 1, 1);
		this.signAppearance.setShininess(50);
		this.signAppearance.loadTexture("../resources/images/Pandora_Borderlands.png");

		/*** UPDATE TIME ***/
		this.speed= 1;
		this.updatePeriod=100;
		this.count1 = 0;
		this.count2 = 9;
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


		/*** ADJ CAR ON CRANE***/
		this.yAdjUp = [0, 0, 0.1, 0.2, 0, 0.1, 0.4, 0.1, 0.1, 0.1];
		this.xAdjUp = [-0.05, 0, 0, 0, 0, -0.1, 0, 0, 0, -0.05];
		this.ang = Math.PI/20;

		/*** SCENE ELEMENTS ***/
		this.car = new MyVehicle(this,);
		this.destroyed_cars = new MyVehicle(this);
		this.destroyed_wheels = new MyWheelL(this);
		this.destroyed_upperbody = new MyUpperBody(this);
		this.terrain = new MyTerrain(this, 8, this.altimetry);
		this.crane = new MyCrane(this);
		this.sign = new MyUnitCubeQuad(this, 0, 1, 0, 1);
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

		//Car
		this.pushMatrix();
			this.translate(0, 1.3, 0);
			this.rotate(-Math.PI/2, 0, 1, 0);
			this.vehicleAppearances[this.currVehicleAppearance].apply();
			this.car.display();
		this.popMatrix();

		//Crane
		this.pushMatrix();
			this.translate(-4.65, 0, 7);
			this.crane.display();
		this.popMatrix();

		//Terrain
		this.pushMatrix();
			this.translate(0, 0, 7);
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.scale(50, 50, 1.2);
			this.terrain.display();
		this.popMatrix();

		//POSTER
		this.pushMatrix();
			this.rotate(-Math.PI/2,0,1,0);
			this.translate(-13,5.3,-16);
			this.rotate(Math.PI/6, 2, -15, -15);
			this.rotate(Math.PI/4, 3, -2, 15);
			this.scale(0.02, 7, 10);
			this.signAppearance.apply();
			this.sign.display();
		this.popMatrix();

		//DESTROYED_CARS1
		this.pushMatrix();
			this.translate(20, 1.3, 10);
			this.rotate(Math.PI/3,1,0,0);
			this.redRustAppearance.apply();
			this.destroyed_cars.display();
		this.popMatrix();
		//DESTROYED_CARS2
		this.pushMatrix();
			this.translate(21, 1.3, 7);
			this.rotate(Math.PI/3,-1,0,0);
			this.greenRustAppearance.apply();
			this.destroyed_cars.display();
		this.popMatrix();
		//DESTROYED_CARS3
		this.pushMatrix();
			this.translate(20, 1.3, 13);
			this.rotate(Math.PI/3,1,1,0);
			this.greenRustAppearance.apply();
			this.destroyed_cars.display();
		this.popMatrix();
		//DESTROYED_WHEEL1
		this.pushMatrix();
			this.translate(10, 1.3, 13);
			this.rotate(Math.PI/3,1,1,0);
			this.scale(1,2,1);
			this.destroyed_wheels.display();
		this.popMatrix();
		//DESTROYED_WHEEL2
		this.pushMatrix();
			this.translate(22, 1.3, 17);
			this.rotate(Math.PI/3,1,1,0);
			this.destroyed_wheels.display();
		this.popMatrix();
		//DESTROYED_UPPERBODY
		this.pushMatrix();
			this.translate(20, 1.3, 8);
			this.rotate(Math.PI/3,1,1,0);
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
			this.car.update(currTime);

			if (this.gui.isKeyPressed("KeyW")) {
				text+=" W ";
				keysPressed=true;

				this.car.pushForward(0.03*this.speed);

			}

			if (this.gui.isKeyPressed("KeyS")) {
				text+=" S ";
				keysPressed=true;

				this.car.pushBackwards(0.03*this.speed);
			}

			if (this.gui.isKeyPressed("KeyA")) {
				text+=" A ";
				keysPressed=true;

				this.car.pushLeft(-.003*this.speed);
			}

			if (this.gui.isKeyPressed("KeyD")) {
				text+=" D ";
				keysPressed=true;

				this.car.pushRight(-.003*this.speed);
			}

			if (keysPressed) {
				console.log(text);
			}
		}
	};

	update(currTime)
	{
		this.currVehicleAppearance = this.vehicleAppearancesList[this.Texture_Options];

		if(this.car.getPos() == 'R'){
			if(this.crane.pos() == 'D'){
				if( !this.crane.getRot() && !this.crane.getTrans() ) this.crane.update(currTime, 0);  //Crane esta no D ainda nao rodou para R
				if( this.crane.getRot() ) this.crane.update(currTime, 1);  														//Crane ja rodou para D agora descer o braco
				if( this.crane.getTrans() ) {																													//Crane ja desceu o braco agora o carro tem que 'subir'
				this.crane.reset();
				this.car.inc_y(0.05);
			}
		}

		if(this.crane.pos() == 'R'){
			if( !this.crane.getRot() && !this.crane.getTrans() ){
				this.crane.update(currTime, 1);
				if(this.count1 < 10){ this.car.inc_y(this.yAdjUp[this.count1]); this.car.inc_z(this.xAdjUp[this.count1++]); };
			}
			if( this.crane.getTrans() ){
				this.crane.update(currTime, 0);
				if(this.ang < Math.PI){
					var x = Math.cos(this.ang);
					var z = Math.sin(this.ang);
					this.car.inc_x(x);
					this.car.inc_z(z-0.14);
					this.ang += Math.PI/20;
				}
			}
			if( this.crane.getRot() ){
				if(this.count2 > 0) this.car.inc_y(-this.yAdjUp[this.count2--]);
				if(this.count2 == 0) { this.car.set_y(0); /*this.count2 = 9; */ this.car.resetMov(); }
			}
		}
	}
}
};
