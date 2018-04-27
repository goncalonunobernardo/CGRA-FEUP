/**
 * MyLamp
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyLamp extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
		super(scene);

        this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();

	};

	initBuffers() 
	{
		this.vertices = [];
		this.normals = [];
        this.indices = [];

        var ang = 2 * Math.PI / this.slices;
        var angVert = (Math.PI/2) / this.stacks;

//VERTICES E NORMALS
	    for(var i = 0; i <= this.stacks; i++)
	    {
	    	for(var j = 0; j < this.slices; j++)
	    	{    		
	    	this.vertices.push(Math.cos(angVert*i)*Math.cos(ang*j),Math.cos(angVert*i)*Math.sin(ang*j),Math.sin(angVert*i));
			this.normals.push(Math.cos(angVert*i)*Math.cos(ang*j),Math.cos(angVert*i)*Math.sin(ang*j),Math.sin(angVert*i));
	    	}
	    }

//INDICES
	for(var i = 0; i < this.stacks; i++) {
		for(var j = 0; j < this.slices - 1; j++) {
			this.indices.push(i*this.slices + j, i*this.slices + j+1, (i+1)*this.slices + j);
			this.indices.push(i*this.slices + j+1, (i+1)*this.slices + j+1, (i+1)*this.slices + j);
		}

		this.indices.push(i*this.slices + this.slices - 1, i*this.slices, (i+1)*this.slices + this.slices - 1);
		this.indices.push(i*this.slices, i*this.slices + this.slices, (i+1)*this.slices + this.slices - 1);
	}



		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
