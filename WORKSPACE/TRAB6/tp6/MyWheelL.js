/**
* MyWheelL
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyWheelL extends CGFobject
{
	constructor(scene) //ROTATION ARGS
	{
		super(scene);

		//MATERIAL AND TEXTURE
		this.wheelAppearance = new CGFappearance(this.scene);
		this.wheelAppearance.setAmbient(0.15, 0.15, 0.15, 1);
		this.wheelAppearance.setDiffuse(0.30, 0.30, 0.30, 1);
		this.wheelAppearance.setSpecular(0.25, 0.25, 0.25, 1);
		this.wheelAppearance.setShininess(50);
		this.wheelAppearance.loadTexture("../resources/images/W_wheel.png");

		this.coverAppearance = new CGFappearance(this.scene);
		this.coverAppearance.setAmbient(0.8, 0.8, 0.8, 1);
		this.coverAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
		this.coverAppearance.setSpecular(0.5, 0.5, 0.5, 1);
		this.coverAppearance.setShininess(25);
		this.coverAppearance.loadTexture("../resources/images/W_cover.png");

		this.cylinder = new MyToppedCylinder(this.scene, 40, 3, this.wheelAppearance, this.wheelAppearance);
		this.cover = new MySemiSphere(this.scene, 40, 10);

		this.initBuffers();
	};


	display(scene)
	{
		//ROTATION
		this.scene.pushMatrix();
			this.scene.scale(0.6, 0.6, 0.5);
			this.cylinder.display();
		this.scene.popMatrix();

		//COVER
		this.scene.pushMatrix();
			this.scene.translate(0, 0, 0.5);
			this.scene.scale(0.45, 0.45, 0.15);
			this.coverAppearance.apply();
			this.cover.display();
		this.scene.popMatrix();

	};
};
