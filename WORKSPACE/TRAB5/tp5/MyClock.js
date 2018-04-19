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

		this.sPointer =  new MyClockHand(this.scene);
		this.mPointer =  new MyClockHand(this.scene);
		this.hPointer =  new MyClockHand(this.scene);
		
		this.clockAppearance =  new CGFappearance(this.scene);
		this.clockAppearance.loadTexture("../resources/images/clock.png");

		this.materialDefault =  new CGFappearance(this.scene);

		this.initBuffers();
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

		/*this.scene.pushMatrix();
			this.materialDefault.apply();
			this.scene.translate(0, 0, 1);
			this.sPointer.display();
		this.scene.popMatrix();*/
	};
};
