/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{ //Vertices utilizados de 0 a 7
		this.vertices = [
           -0.5, -0.5, 0.5, 	//0
            0.5, -0.5, 0.5, 	//1
           -0.5, 0.5, 0.5,		//2
            0.5, 0.5, 0.5,		//3 //first 4 front vertices
            -0.5, -0.5, -0.5,	//4
           	0.5, -0.5, -0.5,	//5
           -0.5, 0.5, -0.5,		//6
          	0.5, 0.5, -0.5,		//7 //first 5 back vertices
		];

	this.indices = [
            0, 1, 2, //front
			3, 2, 1,
			4, 1, 0, //under
			5, 1, 4,
			1, 5, 7, //right
			7, 3, 1,
			3, 7, 6, //upper
			6, 2, 3,	
			2, 6, 4, //left
			4, 0, 2, 
			7, 5, 4, //back
			4, 6, 7,  
        ];

			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
