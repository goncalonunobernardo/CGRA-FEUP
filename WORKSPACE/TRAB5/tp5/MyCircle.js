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
        
        var ang = 2 * Math.PI / this.slices;
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);
        for(var i = 0; i < this.slices; i++){
            this.vertices.push(Math.cos(i*ang), Math.sin(i*ang), 0);

            this.normals.push(Math.cos(i*ang), Math.sin(i*ang), 0);
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

		