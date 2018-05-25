/**
* MyUnitCubeQuad
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene, minS, maxS, minT, maxT)
	{
		super(scene);
		this.quad = new MyQuad(this.scene, minS, maxS, minT, maxT);
		this.quad.initBuffers();
	};

	display(scene)
	{
		this.scene.pushMatrix();
			this.scene.translate(0,0,0.5);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI,1,0,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2,1,0,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,1,0,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2,0,1,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
		this.scene.popMatrix();
	};
};
