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
        
        this.b = b;
        this.B = B;
        this.h = h
        this.oft = oft;

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
        
        var dif = this.B - this.b;

        this.texCoords = [
                dif, 0,
                dif+this.b, 0,
                0, this.h,
                this.B, this.h
                ]

		this.initGLBuffers();
	};
};
