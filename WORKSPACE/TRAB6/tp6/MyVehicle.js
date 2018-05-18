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
//VEHICLE POSITION
		this.x = 0;
		this.z = 0;

//VEHICLE LOGIC
		//angularspeed
		this.a = 0;
		//angle
		this.b = 0;
		this.h_speed = 0;
		this.h_angspeed = 0;

		this.time = 0;
		this.max_h_speed = .5;
		this.max_h_angspeed = .07;
		this.h_rotation_ang =0;

		this.wheelAngle = 0;

		this.lastUpdatedTime = -1;

 //STRUCTURE
    this.body = new MyUnitCubeQuad(this.scene, 0, 1, 0, 1);
    this.upperBody = new MyUpperBody(this.scene);
		this.test = new MyUnitCubeQuad(this.scene, 0, 1, 0, 1);
    this.wheel = new MyWheel(this.scene);
		this.extraWheel = new MySemiSphere(this.scene, 20, 6);
	};

	display(scene)
	{
	this.scene.pushMatrix();
	this.scene.translate(this.x,0,this.z);
	this.scene.rotate(this.b, 0, 1, 0);
		//MAIN BODY
	   this.scene.pushMatrix();
	       this.scene.scale(4, 1.5, 2);
	       this.body.display();
	   this.scene.popMatrix();

		//UPPER BODY
		this.scene.pushMatrix();
			this.upperBody.display();
		this.scene.popMatrix();

		//FRONT LEFT WHEEL
	   this.scene.pushMatrix();
	   		this.scene.translate(1.4, -0.7, 0.8);
				this.scene.rotate(this.wheelAngle,0,1,0);
	   		this.wheel.display();
	   	this.scene.popMatrix();

		//BACK LEFT WHEEL
	   	this.scene.pushMatrix();
	   		this.scene.translate(-1.4, -0.7, 0.8);
	   		this.wheel.display();
	   	this.scene.popMatrix();

		//FRONT RIGHT WHEEL
	   	this.scene.pushMatrix();
	   		this.scene.translate(1.4, -0.7, -1.3);
				this.scene.rotate(this.wheelAngle,0,1,0);
	   		this.wheel.display();
		this.scene.popMatrix();

		//BACK RIGHT WHEEL
		this.scene.pushMatrix();
			this.scene.translate(-1.4, -0.7, -1.3);
			this.wheel.display();
		this.scene.popMatrix();

		//FRONT WHEEL LEFT COVER
		this.scene.pushMatrix();
			this.scene.translate(1.4, -0.7, 1.3);
			this.scene.rotate(this.wheelAngle,0,1,0);
			this.scene.scale(0.45, 0.45, 0.25);
			this.extraWheel.display();
		this.scene.popMatrix();

		//BACK WHEEL LEFT COVER
		this.scene.pushMatrix();
			this.scene.translate(-1.4, -0.7, 1.3);
			this.scene.scale(0.45, 0.45, 0.25);
			this.extraWheel.display();
		this.scene.popMatrix();

		//FRONT WHEEL RIGHT COVER
		this.scene.pushMatrix();
			this.scene.translate(1.4, -0.7, -1.3);
			this.scene.rotate(this.wheelAngle,0,1,0);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.scale(0.45, 0.45, 0.25);
			this.extraWheel.display();
		this.scene.popMatrix();

		//BACK WHEEL RIGHT COVER
		this.scene.pushMatrix();
			this.scene.translate(-1.4, -0.7, -1.3);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.scale(0.45, 0.45, 0.25);
			this.extraWheel.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
	};


	update(currTime)
	{
		this.moveForward(this.h_speed);
  	this.rotateRight(this.h_angspeed);

  	this.h_speed *=.99;
		this.h_angspeed *=0.95;

		if(this.scene.car.h_rotation_ang >0) {
			this.scene.car.h_rotation_ang -= 1.5;
			this.scene.car.wheelAngle += 0.01;
		}
		if(this.scene.car.h_rotation_ang <0) {
			this.scene.car.h_rotation_ang += 1.5;
			this.scene.car.wheelAngle -= 0.01;
		}
		if(this.a<0)this.a+= 0.4;

		if(this.a>0) this.a-= 0.4;


	}


	moveForward(amount) {
		var xval = amount * Math.cos(this.b);
		var zval = amount * Math.sin(this.b);

		this.x+= xval;
		this.z-= zval;
	};

	pushForward(amount) {
		if(Math.abs(this.h_speed + amount) <= this.max_h_speed)
			this.h_speed += amount;

		else if (this.h_speed > 0) this.h_speed = this.max_h_speed;

		else this.h_speed = - this.max_h_speed;

	};

	pushBackwards(amount) {
		this.pushForward(-amount);
	};

	pushLeft(amount) {
		if(Math.abs(this.h_angspeed + amount) <= this.max_h_angspeed)
			this.h_angspeed+=amount;
		else if(this.h_angspeed > 0) this.h_angspeed = this.max_h_angspeed;
		else this.h_angspeed = -this.max_h_angspeed;

	};

	pushRight(amount){
		if(Math.abs(this.h_angspeed - amount) <= this.max_h_angspeed)
			this.h_angspeed-=amount;
		else if(this.h_angspeed > 0) this.h_angspeed = this.max_h_angspeed;
		else this.h_angspeed = -this.max_h_angspeed;

	};

	rotateRight(amount)
	{
	 	this.b -= amount;

 		 if(this.scene.car.h_rotation_ang < 45 && amount >0.01) { this.scene.car.h_rotation_ang += 5; this.scene.car.wheelAngle = -Math.PI/6 + 0.2; }
	 	 if(this.scene.car.h_rotation_ang > -45 && amount <-0.01){ this.scene.car.h_rotation_ang -= 5; this.scene.car.wheelAngle = Math.PI/6 - 0.2; }
	};

	get_x() {
		return this.x;
	}

	get_z() {
		return this.z;
	}

	get_h_angle() {
		return this.h_angspeed;s
	}
};
