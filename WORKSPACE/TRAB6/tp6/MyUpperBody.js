/**
* MyUpperBody
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyUpperBody extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.top = new MyQuad(this.scene, 0, 1, 0, 1);
		this.windowF = new MyTrapezoid(this.scene, 1.5, 2, 1, 0.5);
		this.windowB = new MyTrapezoid(this.scene, 1.5, 2, 1, 0.5);
		this.windowL = new MyTrapezoid(this.scene, 1.75, 2.75, 1, 0.25);
		this.windowR = new MyTrapezoid(this.scene, 1.75, 2.75, 1, 0.25);

		//MATERIAL AND TEXTURE
		this.topAppearance = new CGFappearance(this.scene);
		this.topAppearance.setAmbient(0.5, 0.5, 0.5, 1);
		this.topAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.topAppearance.setSpecular(1, 1, 1, 1);
		this.topAppearance.setShininess(25);
		this.topAppearance.loadTexture("../resources/images/UB_top.png");

		this.windowAppearance = new CGFappearance(this.scene);
		this.windowAppearance.setAmbient(0.5, 0.5, 0.5, 1);
		this.windowAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.windowAppearance.setSpecular(1, 1, 1, 1);
		this.windowAppearance.setShininess(75);
		this.windowAppearance.loadTexture("../resources/images/UB_window.png");

		this.initBuffers();
	};

	display(scene)
	{
		//TOP
		this.scene.pushMatrix();
			this.scene.translate(0, 1.75, 0);
			this.scene.scale(1.75, 2, 1.5);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.topAppearance.apply();
			this.top.display();
		this.scene.popMatrix();

		//WINDOWB
		this.scene.pushMatrix();
			this.scene.translate(-0.875, 1.25, 0);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.topAppearance.apply();
			this.windowB.display();
		this.scene.popMatrix();

		//WINDOWF
		this.scene.pushMatrix();
			this.scene.translate(0.875, 1.25, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.windowAppearance.apply();
			this.windowF.display();
		this.scene.popMatrix();

		//WINDOWL
		this.scene.pushMatrix();
			this.scene.translate(0, 1.25, 0.75);
			this.windowAppearance.apply();
			this.windowL.display();
		this.scene.popMatrix();

		//WINDOWR
		this.scene.pushMatrix();
			this.scene.translate(0, 1.25, -0.75);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.windowAppearance.apply();
			this.windowR.display();
		this.scene.popMatrix();
	};
};
