/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClockHand extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		
		this.pointer =  new MyCylinder(this.scene, 12, 6);
		
		this.initBuffers();
	};

	display(scene) 
	{
		this.scene.pushMatrix();
			this.pointer.display();
		this.scene.popMatrix();
	};
};
