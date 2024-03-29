/**
* MyTrapezoid
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyTrapezoid extends CGFobject
{
	constructor(scene, b, B, h, oft)
	{
		super(scene);

		/**TRAPEZOID POSITIONS AND VARIABLES **/
		this.b = b;					//SMALL BASE
		this.B = B;					//BIG BASE
		this.h = h					//HEIGHT
		this.oft = oft;			//OFFSET FROM AXIS

		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
			-this.b/2, this.h/2, 0,
			this.b/2, this.h/2, 0,
			-this.B/2, -this.h/2, this.oft,
			this.B/2, -this.h/2, this.oft
		];

		this.indices = [
			0, 2, 1,
			1, 2, 3
		];

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1
		];

		this.texCoords = [
			0, 1,
			0, 0,
			1, 1,
			1, 0
		]

		this.initGLBuffers();
	};
};
