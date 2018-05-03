/**
 * MyToppedCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyToppedCylinder extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
		super(scene);

        this.slices = slices;
		this.stacks = stacks;
        this.scene = scene;
        
        this.cylinder = new MyCylinder(scene, slices, stacks);
		this.circle  = new MyCircle(scene, slices);

		this.initBuffers();

	};

	display(scene) 
	{
	    this.scene.pushMatrix();
	    	this.scene.rotate(Math.PI, 0, 1, 0);
	    	this.circle.display();
	    this.scene.popMatrix();

	    this.cylinder.display();

	    this.circle.display();

	    this.scene.pushMatrix();
	    	this.scene.translate(0, 0, 1);
	    	this.scene.rotate(Math.PI, 0, 0, 1);
	    	this.circle.display();
	    this.scene.popMatrix();
	};
};