/**
* MyToppedCylinder
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyToppedCylinder extends CGFobject
{
	constructor(scene, slices, stacks, sideTexture, topTexture)
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		this.scene = scene;
		this.sideTexture = sideTexture;
		this.topTexture = topTexture;

		this.cylinder = new MyCylinder(scene, slices, stacks);
		this.circle  = new MyCircle(scene, slices);

		this.initBuffers();
	};

	display(scene)
	{
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.topTexture.apply();
			this.circle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.sideTexture.apply();
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.topTexture.apply();
			this.circle.display();
		this.scene.popMatrix();
	};
};
