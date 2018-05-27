/**
* MyExhaust
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyExhaust extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		/** EXHAUST MATERIALS **/
		//EXHAUST SIDE
		this.exhaustSide = new CGFappearance(this.scene);
		this.exhaustSide.setAmbient(0.3, 0.3, 0.3, 1);
		this.exhaustSide.setDiffuse(0.3, 0.3, 0.3, 1);
		this.exhaustSide.setSpecular(0.3, 0.3, 0.3, 1);
		this.exhaustSide.setShininess(25);
		this.exhaustSide.loadTexture("../resources/images/E_side.png");

		//EXHAUST TOP
		this.exhaustTop = new CGFappearance(this.scene);
		this.exhaustTop.setAmbient(0.8, 0.8, 0.8, 1);
		this.exhaustTop.setDiffuse(0.5, 0.5, 0.5, 1);
		this.exhaustTop.setSpecular(0.5, 0.5, 0.5, 1);
		this.exhaustTop.setShininess(25);
		this.exhaustTop.loadTexture("../resources/images/W_wheel.png");

		/** EXHAUST ELEMENTS **/
		//CYLINDER
		this.exhaust = new MyToppedCylinder(this.scene, 25, 3, this.exhaustSide, this.exhaustTop);

		this.initBuffers();
	};

	display(scene)
	{
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.08, 0.08, 1);
			this.exhaust.display();
		this.scene.popMatrix();
	};
};
