/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.circle =  new MyCircle(this.scene, 12);
		this.cyclinder =  new MyCylinder(this.scene, 12, 1);

		this.sPointer =  new MyClockHand(this.scene, 0.010, 0.80);
		this.mPointer =  new MyClockHand(this.scene, 0.020, 0.75);
		this.hPointer =  new MyClockHand(this.scene, 0.025, 0.60);
		
		this.clockAppearance =  new CGFappearance(this.scene);
		this.clockAppearance.loadTexture("../resources/images/clock.png");

		this.materialDefault =  new CGFappearance(this.scene);

		this.hPointer.setAngle(90);
		this.mPointer.setAngle(180);
		this.sPointer.setAngle(270);
	};

	display(scene) 
	{
		this.scene.pushMatrix();
			this.materialDefault.apply();
			this.cyclinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
			this.clockAppearance.apply();
			this.circle.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.materialDefault.apply();
			this.scene.translate(0, 0, 1);
			this.hPointer.display();
			this.mPointer.display();
			this.sPointer.display();
		this.scene.popMatrix();
	};

	update(currTime, flag){
		var time = currTime/1000;
	
		if(flag == 1){
			var Hang = (time * 360/60/60/12);
			var Mang = (time * 360/60/60);
			var Sang = (time * 360/60);
		}
		
		if(flag == 0){
			var Hang = (this.hPointer.angle + time * 360/60/60/12);
			var Mang = (this.mPointer.angle + time * 360/60/60);
			var Sang = (this.sPointer.angle + time * 360/60);
		}

		this.hPointer.setAngle(Hang);
		this.mPointer.setAngle(Mang);
		this.sPointer.setAngle(Sang);
		
	};
};
