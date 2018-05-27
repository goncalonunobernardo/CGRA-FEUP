/**
* MyLamp
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyLamp extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		/** LAMP MATERIALS **/
		this.lampAppearance = new CGFappearance(this.scene);
		this.lampAppearance.setAmbient(0.8, 0.8, 0.8, 1);
		this.lampAppearance.setDiffuse(0.4, 0.4, 0.4, 1);
		this.lampAppearance.setSpecular(0.3, 0.3, 0.3, 1);
		this.lampAppearance.setShininess(20);
		this.lampAppearance.loadTexture("../resources/images/C_lamp.png");

		/** LAMP ELEMENTS **/
		//LAMP
		this.lamp = new MySemiSphere(this.scene, 40, 10);

		this.initBuffers();
	};

	display(scene)
	{
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.17, 0.17, 0.10);
			this.lampAppearance.apply();
			this.lamp.display();
		this.scene.popMatrix();
	};
};
