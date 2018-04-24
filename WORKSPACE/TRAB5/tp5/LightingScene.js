var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

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

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);
		this.enableTextures(true);

		// Scene elements
		//tables
		this.table = new MyTable(this);
		//wall
		this.FrontWall = new Plane(this);
		this.LeftWall = new MyQuad(this,-0.5, 1.5, -0.5, 1.5);
		//floor
		this.floor = new MyQuad(this, 0, 10, 0, 12);
		
		//left board A
		this.boardA = new Plane(this,0, 1, 0.1, 0.8, BOARD_A_DIVISIONS);
		//right board B
		this.boardB = new Plane(this,0, 1, 0, 1, BOARD_B_DIVISIONS);
		
		//prism
		this.prism = new MyPrism(this, 8, 20);		
		//cylinder
		this.cylinder = new MyCylinder(this, 8, 20);		
		//lamp
		this.lamp = new MyLamp(this, 8, 20);

		//clock
		this.clock =  new MyClock(this, 12);
		//paper plane
		this.paperPlane = new MyPaperPlane(this);

		//UPDATE TIME
		this.setUpdatePeriod(100);

		// Materials
		this.materialDefault = new CGFappearance(this);
		
		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);	
		this.materialB.setShininess(120);
		
//SLIDE LEFT
		this.slidesAppearance = new CGFappearance(this);
		this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
		this.slidesAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
		this.slidesAppearance.setShininess(10);
		this.slidesAppearance.loadTexture("../resources/images/slides.png");

//BOARD RIGHT
		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.setAmbient(0.25, 0.25, 0.25, 1);
		this.boardAppearance.setDiffuse(0.25, 0.25, 0.25, 1);
		this.boardAppearance.setSpecular(0.4,0.4,0.4,1);
		this.boardAppearance.setShininess(120);
		this.boardAppearance.loadTexture("../resources/images/board.png");
//FlOOR
		this.floorAppearance = new CGFappearance(this);
		this.floorAppearance.loadTexture("../resources/images/floor.png");

//WINDOW
		this.windowAppearance = new CGFappearance(this);
		this.windowAppearance.loadTexture("../resources/images/window.png");
		this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

//COLLUMNS PRISM AND CYLLINDER
		this.marbleAppearance = new CGFappearance(this);
		this.marbleAppearance.loadTexture("../resources/images/marble.png");
		this.marbleAppearance.setSpecular(0.8,0.8,0.8,1);
		this.marbleAppearance.setShininess(110);
		this.marbleAppearance.setDiffuse(0.5,0.5,0.5,1);

//PAPERPLANE
		this.planeAppearance = new CGFappearance(this);
		this.planeAppearance.setDiffuse(0.95,0.95,0.95,1);
		this.planeAppearance.setSpecular(0.05,0.05,0.05,1);
		this.planeAppearance.setShininess(20);
		

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
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(0.8,0.8,0,1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setSpecular(1,1,1,1);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1.0);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].enable();
		
		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[2].setSpecular(1,1,1,1);
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

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.floorAppearance.apply();
			this.floor.display();
		this.popMatrix();

		this.materialDefault.apply();
		
		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.windowAppearance.apply();
			this.LeftWall.display();
		this.popMatrix();

		this.materialDefault.apply();
		
		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.FrontWall.display();
		this.popMatrix();

		// First Table

		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.slidesAppearance.apply();
			this.boardA.display();
		this.popMatrix();

		this.materialDefault.apply();
		
		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.boardAppearance.apply();
			this.boardB.display();
		this.popMatrix();
		this.materialDefault.apply();
		
		//Prism
		this.pushMatrix();
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.scale(1, 1, 7);
			this.translate(5, -13, 0);
			this.marbleAppearance.apply();
			this.prism.display();
		this.popMatrix();
		
		//Cylinder
		this.pushMatrix();
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.scale(1, 1, 7);
			this.translate(12, -13, 0);
			this.marbleAppearance.apply();
			this.cylinder.display();
		this.popMatrix();

		//Lamp
		this.pushMatrix();
			this.rotate(Math.PI/2, 1, 0, 0);
			this.scale(1.5, 1.5, 1.5);
			this.translate(6, 6, -7);
			this.marbleAppearance.apply();
			this.lamp.display();
		this.popMatrix();
		
		//Clock
		this.pushMatrix();
			this.translate(7.25, 7.2, 0);
			this.scale(0.75, 0.75, 0.25);
			this.clock.display();
		this.popMatrix();

		//Paper Plane
		this.pushMatrix();
			this.translate(this.paperPlane.x, this.paperPlane.y, this.paperPlane.z);
			
			if(!this.paperPlane.isFalling){	
			this.rotate(3*Math.PI/2,0,1,0);
			this.rotate(Math.PI/2,1,0,0);
			}
			else if (this.paperPlane.isFalling){
					this.rotate(Math.PI,0,0,1);
					this.rotate(-Math.PI/2,0,1,0);
					}
					else if (this.paperPlane.isOnTheGround){
							this.rotate(3*Math.PI/2,0,1,0);
							this.rotate(Math.PI/2,1,0,0);
							}
							
			this.planeAppearance.apply();
			this.paperPlane.display();
		this.popMatrix();
		// ---- END Scene drawing section
	};

	update(currTime) {
		//this.clock.update(currTime);
		this.paperPlane.update();
	};

};
