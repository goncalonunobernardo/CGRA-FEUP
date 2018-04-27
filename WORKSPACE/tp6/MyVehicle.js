/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyVehicle extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
        
        this.body = new MyUnitCubeQuad(this.scene, 0, 1, 0, 1);
        this.upperBody = new MyUnitCubeQuad(this.scene, 0, 1, 0, 1);

        this.wheel = new MyCylinder(this.scene, 20, 3);
        this.wheelTop = new MyCircle(this.scene, 20);

        this.extraWheel = new MyLamp(this.scene, 20, 6);
	};

	display(scene) 
	{  
	   this.scene.pushMatrix();
	       this.scene.scale(4, 1.5, 2);
	       this.body.display();
	   this.scene.popMatrix();

	   this.scene.pushMatrix();
	   		this.scene.translate(0, 1.25, 0);
	   		this.scene.scale(2, 1, 1.5);
	   		this.upperBody.display();
	   this.scene.popMatrix();

	   this.scene.pushMatrix();
	   		this.scene.translate(1.4, -0.7, 1);
	   		this.scene.scale(0.6, 0.6, 0.5);
	   		this.wheel.display();
	   	this.scene.popMatrix();

	   	this.scene.pushMatrix();
	   		this.scene.translate(-1.4, -0.7, 1);
	   		this.scene.scale(0.6, 0.6, 0.5);
	   		this.wheel.display();
	   	this.scene.popMatrix();

	   	this.scene.pushMatrix();
	   		this.scene.translate(1.4, -0.7, -1.5);
	   		this.scene.scale(0.6, 0.6, 0.5);
	   		this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.4, -0.7, -1.5);
			this.scene.scale(0.6, 0.6, 0.5);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.4, -0.7, 1.5);
			this.scene.scale(0.6, 0.6, 0.3);
			this.extraWheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.4, -0.7, 1.5);
			this.scene.scale(0.6, 0.6, 0.3);
			this.extraWheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.4, -0.7, -1.5);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.scale(0.6, 0.6, 0.3);
			this.extraWheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.4, -0.7, -1.5);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.scale(0.6, 0.6, 0.3);
			this.extraWheel.display();
		this.scene.popMatrix();
	};
};
