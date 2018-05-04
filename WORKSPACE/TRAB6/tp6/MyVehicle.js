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

        this.wheel = new MyWheel(this.scene);
       
        this.extraWheel = new MySemiSphere(this.scene, 20, 6);
	};

	display(scene) 
	{  
		//MAIN BODY
	   this.scene.pushMatrix();
	       this.scene.scale(4, 1.5, 2);
	       this.body.display();
	   this.scene.popMatrix();
		
		//UPPER BODY
	   this.scene.pushMatrix();
	   		this.scene.translate(0, 1.25, 0);
	   		this.scene.scale(2, 1, 1.5);
	   		this.upperBody.display();
	   this.scene.popMatrix();
		
		//BACK LEFT WHEEL
	   this.scene.pushMatrix();
	   		this.scene.translate(1.4, -0.7, 1);
	   		this.wheel.display();
	   	this.scene.popMatrix();
		
		//FRONT LEFT WHEEL
	   	this.scene.pushMatrix();
	   		this.scene.translate(-1.4, -0.7, 1);
	   		this.wheel.display();
	   	this.scene.popMatrix();

		//BACK RIGHT WHEEL
	   	this.scene.pushMatrix();
	   		this.scene.translate(1.4, -0.7, -1.5);
	   		this.wheel.display();
		this.scene.popMatrix();

		//FRONT RIGHT WHEEL
		this.scene.pushMatrix();
			this.scene.translate(-1.4, -0.7, -1.5);
			this.wheel.display();
		this.scene.popMatrix();
		
		//BACK WHEEL LEFT COVER
		this.scene.pushMatrix();
			this.scene.translate(1.4, -0.7, 1.5);
			this.scene.scale(0.45, 0.45, 0.25);
			this.extraWheel.display();
		this.scene.popMatrix();
		
		//FRONT WHEEL LEFT COVER
		this.scene.pushMatrix();
			this.scene.translate(-1.4, -0.7, 1.5);
			this.scene.scale(0.45, 0.45, 0.25);
			this.extraWheel.display();
		this.scene.popMatrix();
		
		//BACK WHEEL RIGHT COVER
		this.scene.pushMatrix();
			this.scene.translate(1.4, -0.7, -1.5);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.scale(0.45, 0.45, 0.25);
			this.extraWheel.display();
		this.scene.popMatrix();

		//FRONT WHEEL RIGHT COVER
		this.scene.pushMatrix();
			this.scene.translate(-1.4, -0.7, -1.5);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.scale(0.45, 0.45, 0.25);
			this.extraWheel.display();
		this.scene.popMatrix();
	};
};
