/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClockHand extends CGFobject
{
	constructor(scene, radius, length) 
	{
		super(scene);

		this.pointer =  new MyCylinder(this.scene, 12, 6);
		
		this.angle = 0;
		this.radius = radius;
		this.length = length;
	};

	setAngle(ang){
		this.angle = ang;
	}

	display(scene) 
	{
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.rotate(this.angle * Math.PI/180, 0, 1, 0);
			this.scene.scale(this.radius, this.radius, this.length);
			this.pointer.display();
		this.scene.popMatrix();
	};
};
