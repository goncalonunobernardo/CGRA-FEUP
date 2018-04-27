/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperPlane extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

   		this.x = 12;
   		this.y = 3.75;
   		this.z = 8;

	    this.isFalling = false;
   		this.isOnTheGround = false;

		this.initBuffers();
	};


	initBuffers() 
	{
       	this.vertices = [
          	0, 1, 0,	//0
          0.5, 0, 0,	//1
         -0.5, 0, 0,	//2
          	0,0,0.25,   //3
          	0,0,0,     //4


            0, 1, 0,	//5
          0.5, 0, 0,	//6
         -0.5, 0, 0,	//7
           	0,0,0.25,   //8
            0,0,0     //9
			];

	this.indices = [
			2, 1, 0,
			5,6,7,
            3,4,0,
            5,9,8
     ];

     this.normals = [
            0,0,1,
            0,0,1,
            0,0,1,
            1,0,0,
            0,0,-1,

            0,0,-1,
            0,0,-1,
            0,0,-1,
           -1,0,0,
            0,0,0

            
     ];

        this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    };

    
    update(currTime){
    	if(!this.isOnTheGround)
    	{
    		if(!this.isFalling)
    		{
            	this.x -= 0.2;
            	this.y += 0.05;   
        	}
        	else {this.y -= 0.5;}

        	if(this.x <= 1.25) {this.isFalling = true;}
    	}

    	if(this.y <= 0.45)
    	{
            this.isOnTheGround = true;
            this.isFalling = false;
        }
 	}
};
