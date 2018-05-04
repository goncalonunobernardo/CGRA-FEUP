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

		/*** SCENE ELEMENTS ***/
		this.car = new MyVehicle(this);
		this.terrain = new MyTerrain(this);
		
		// Materials
		this.materialDefault = new CGFappearance(this);

		//UPDATE TIME
		/*this.first = 1;
		this.setUpdatePeriod(100);*/

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

		/*this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
        this.lights[0].enable();
        this.lights[0].update();*/
	
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

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		//Car
		this.pushMatrix();
			this.translate(0, 1.3, 0);
			this.car.display();
		this.popMatrix();

		//Terrain
		this.pushMatrix();
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.scale(20, 20, 0.2);
			this.terrain.display();
		this.popMatrix();
	};

	/*update(currTime) {
		if(this.first == 1){
			this.lastTime = currTime;
			this.clock.update(currTime, 1);
			this.first = 0;
		}

		if(this.first == 0){
			this.varTime = currTime - this.lastTime;
			this.lastTime = currTime;
			this.clock.update(this.varTime, 0);
		}
		
		this.paperPlane.update();
	};*/
};
