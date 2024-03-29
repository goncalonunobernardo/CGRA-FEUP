/**
* MyCircle
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyCircle extends CGFobject
{
	constructor(scene, slices)
	{
		super(scene);

		this.slices = slices;
		this.initBuffers();

	};

	initBuffers()
	{
		//VERTICES & NORMALS
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];

		var ang = 2 * Math.PI / this.slices;

		this.vertices.push(0, 0, 0);
		this.normals.push(0, 0, 1);
		this.texCoords.push(0.5, 0.5);

		for(var i = 0; i < this.slices; i++){
			this.vertices.push(Math.cos(i*ang), Math.sin(i*ang), 0);

			this.normals.push(0, 0, 1);

			this.texCoords.push(0.5 + Math.cos(i*ang)/2, 0.5 - Math.sin(i*ang)/2);
		}


		//INDICES
		this.indices = [];

		for(var i = 1; i < this.slices; i++){
			this.indices.push(0, i, i+1);
		}
		this.indices.push(0, this.slices, 1);

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
